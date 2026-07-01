import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Trash2, Edit2, ExternalLink, MapPin, Calendar } from "lucide-react";

const ListEvents = () => {
  const { axios, backendUrl, events, fetchEvents } = useAppContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const deleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const { data } = await axios.post(`${backendUrl}/api/event/delete`, { id });
      if (data.success) {
        toast.success(data.message);
        await fetchEvents();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="flex-1 bg-gray-50 p-4 md:p-10 overflow-y-auto">
      <div className="bg-white max-w-6xl mx-auto p-6 md:p-10 shadow-sm rounded-2xl border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Manage Events</h2>
          <p className="text-sm text-gray-500 font-medium">{events.length} Events Total</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs uppercase tracking-widest text-gray-400 font-bold">
                <th className="pb-4 pl-4">Event</th>
                <th className="pb-4">Category</th>
                <th className="pb-4">Date & Location</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {events.map((event) => (
                <tr key={event._id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 pl-4">
                    <div className="flex items-center gap-4">
                      <img src={event.image} className="w-16 h-10 object-cover rounded-lg shadow-sm" alt="" />
                      <div>
                        <p className="text-sm font-bold text-gray-900 line-clamp-1">{event.title}</p>
                        <p className="text-xs text-gray-400">by {event.host}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-[10px] font-bold uppercase text-gray-600">
                      {event.category}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-gray-600">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-[#f64060]" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <MapPin size={12} />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    {event.isPublished ? (
                      <span className="flex items-center gap-1.5 text-green-600 text-xs font-bold uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div> Published
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-gray-400 text-xs font-bold uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div> Draft
                      </span>
                    )}
                  </td>
                  <td className="py-4 pr-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/event/${event._id}`}
                        target="_blank"
                        className="p-2 hover:bg-white hover:text-[#f64060] rounded-lg transition-all border border-transparent hover:border-gray-200"
                      >
                        <ExternalLink size={16} />
                      </Link>
                      <Link
                        to={`/admin/edit-event/${event._id}`}
                        className="p-2 hover:bg-white hover:text-blue-500 rounded-lg transition-all border border-transparent hover:border-gray-200"
                      >
                        <Edit2 size={16} />
                      </Link>
                      <button onClick={() => deleteEvent(event._id)} className="p-2 hover:bg-white hover:text-red-500 rounded-lg transition-all border border-transparent hover:border-gray-200">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {events.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-gray-400 font-medium">No events found. Start by adding one!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListEvents;
