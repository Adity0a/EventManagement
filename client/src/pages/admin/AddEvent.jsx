import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Plus } from "lucide-react";

const AddEvent = () => {
  const { axios, backendUrl, fetchEvents } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [image, setImage] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "Tech",
    date: "",
    time: "",
    location: "",
    host: "",
    isFree: true,
    isOnline: false,
    isPublished: true
  });

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const today = new Date().toISOString().split('T')[0];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const generateAIContent = async () => {
    if (!formData.title) {
      return toast.error("Please enter an event title first");
    }

    try {
      setIsGenerating(true);
      const prompt = `Write a professional description for an event titled "${formData.title}" in the "${formData.category}" category.`;

      const { data } = await axios.post(`${backendUrl}/api/admin/generate-description`, { prompt });

      if (data.success) {
        if (quillRef.current) {
          quillRef.current.root.innerHTML = data.content;
        }
        toast.success("Description generated!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!image) return toast.error("Please upload an image");

    try {
      setIsAdding(true);
      const eventPayload = {
        ...formData,
        description: quillRef.current ? quillRef.current.root.innerHTML : ""
      };

      const submitData = new FormData();
      submitData.append("event", JSON.stringify(eventPayload));
      submitData.append("image", image);

      const { data } = await axios.post(`${backendUrl}/api/event/add`, submitData);

      if (data.success) {
        toast.success(data.message);
        await fetchEvents();
        // Reset form
        setFormData({
            title: "",
            category: "Tech",
            date: "",
            time: "",
            location: "",
            host: "",
            isFree: true,
            isOnline: false,
            isPublished: true
        });
        setImage(false);
        if (quillRef.current) {
          quillRef.current.root.innerHTML = "";
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <form onSubmit={onSubmitHandler} className="flex-1 bg-gray-50 p-4 md:p-10 overflow-y-auto">
      <div className="bg-white max-w-4xl mx-auto p-6 md:p-10 shadow-sm rounded-2xl border border-gray-100">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Add New Event</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold mb-2">Event Image</p>
              <label htmlFor="image" className="cursor-pointer block">
                <div className="border-2 border-dashed border-gray-200 rounded-xl h-48 flex items-center justify-center overflow-hidden hover:border-[#7c3aed] transition-colors">
                  {image ? (
                    <img src={URL.createObjectURL(image)} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                       <Plus className="mx-auto text-gray-400 mb-2" />
                       <p className="text-xs text-gray-400">Click to upload banner</p>
                    </div>
                  )}
                </div>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold mb-2">Event Title</p>
                <input
                  type="text" name="title" value={formData.title} onChange={handleInputChange} required
                  placeholder="e.g. React Conference 2026"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#7c3aed]/20 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold mb-2">Date</p>
                  <input
                    type="date" name="date" value={formData.date} onChange={handleInputChange} required
                    min={today}
                    className="w-full p-3 border border-gray-200 rounded-xl outline-none"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-2">Time</p>
                  <input
                    type="time" name="time" value={formData.time} onChange={handleInputChange} required
                    className="w-full p-3 border border-gray-200 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">Location</p>
                <input
                  type="text" name="location" value={formData.location} onChange={handleInputChange} required
                  placeholder="City, State"
                  className="w-full p-3 border border-gray-200 rounded-xl outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold mb-2">Host Name</p>
              <input
                type="text" name="host" value={formData.host} onChange={handleInputChange} required
                placeholder="Organization or Individual"
                className="w-full p-3 border border-gray-200 rounded-xl outline-none"
              />
            </div>

            <div>
              <p className="text-sm font-semibold mb-2">Category</p>
              <select
                name="category" value={formData.category} onChange={handleInputChange}
                className="w-full p-3 border border-gray-200 rounded-xl outline-none"
              >
                <option value="Tech">Tech</option>
                <option value="Business">Business</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Education">Education</option>
              </select>
            </div>

            <div className="space-y-4 pt-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" name="isFree" checked={formData.isFree} onChange={handleInputChange} className="w-5 h-5 accent-[#7c3aed]" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-black">Is this a free event?</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" name="isOnline" checked={formData.isOnline} onChange={handleInputChange} className="w-5 h-5 accent-[#7c3aed]" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-black">Is this an online event?</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleInputChange} className="w-5 h-5 accent-[#7c3aed]" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-black">Publish immediately?</span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-gray-700 uppercase tracking-wider pl-1">Event Description</p>
            <button
              type="button"
              onClick={generateAIContent}
              disabled={isGenerating}
              className="text-xs bg-[#7c3aed]/10 text-[#7c3aed] px-4 py-2 rounded-xl font-bold hover:bg-[#7c3aed]/20 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isGenerating ? "Generating..." : "✨ Generate with AI"}
            </button>
          </div>
          <div className="quill-editor-wrapper bg-white rounded-2xl overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-[#7c3aed]/20 transition-all">
            <div ref={editorRef} className="min-h-[400px]"></div>
          </div>
        </div>

        <button
          disabled={isAdding} type="submit"
          className="mt-12 w-full md:w-64 bg-[#7c3aed] text-white py-4 rounded-xl font-bold hover:bg-[#6d28d9] transition-all disabled:opacity-50"
        >
          {isAdding ? "Saving Event..." : "Create Event"}
        </button>
      </div>
    </form>
  );
};

export default AddEvent;

