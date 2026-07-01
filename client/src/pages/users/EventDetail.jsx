import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Star,
  ChevronRight,
  Share2,
  Heart,
  Users,
  Clock,
  ArrowLeft,
  Download,
  ShieldCheck,
  Info,
  CheckCircle2,
  Globe
} from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import RegistrationModal from '../../components/common/RegistrationModal';
import MapContainer from '../../components/common/MapContainer';
import { useAppContext } from '../../context/AppContext';
import jsPDF from 'jspdf';
import toast from 'react-hot-toast';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { axios, backendUrl } = useAppContext();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await axios.post(`${backendUrl}/api/event/detail`, { id });
        if (data.success) {
          setEvent(data.event);
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
    window.scrollTo(0, 0);
  }, [id, axios, backendUrl]);

  const exportToPDF = async () => {
    try {
      setIsExporting(true);
      const doc = new jsPDF();

      doc.setFontSize(22);
      doc.setTextColor(246, 64, 96);
      doc.text(event.title, 20, 30, { maxWidth: 170 });

      doc.setFontSize(12);
      doc.setTextColor(100);
      doc.text(`Hosted by ${event.host}`, 20, 45);

      doc.setFontSize(14);
      doc.setTextColor(0);
      doc.text("Event Details", 20, 60);

      doc.setFontSize(10);
      doc.text(`Date: ${event.fullDate || event.date}`, 20, 70);
      doc.text(`Time: ${event.time}`, 20, 77);
      doc.text(`Location: ${event.isOnline ? "Online Event" : (event.fullLocation || event.location)}`, 20, 84);

      if (event.image) {
        try {
          const img = new Image();
          img.crossOrigin = "Anonymous";
          img.src = event.image;
          await new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });

          if (img.complete && img.naturalWidth > 0) {
            const imgWidth = 170;
            const imgHeight = (img.naturalHeight * imgWidth) / img.naturalWidth;
            const finalHeight = Math.min(imgHeight, 80);
            doc.addImage(img, 'JPEG', 20, 95, imgWidth, finalHeight);
          }
        } catch (e) { console.error(e); }
      }

      doc.addPage();
      doc.setFontSize(18);
      doc.setTextColor(246, 64, 96);
      doc.text("Event Description", 20, 25);

      doc.setFontSize(11);
      doc.setTextColor(60);

      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = event.description;
      const plainText = tempDiv.innerText || tempDiv.textContent || "";
      const splitDescription = doc.splitTextToSize(plainText, 170);
      doc.text(splitDescription, 20, 40);

      if (event.agenda && event.agenda.length > 0) {
        doc.addPage();
        doc.setFontSize(18);
        doc.setTextColor(246, 64, 96);
        doc.text("Event Agenda", 20, 25);

        let yPos = 40;
        event.agenda.forEach((item) => {
          if (yPos > 270) { doc.addPage(); yPos = 25; }
          doc.setFontSize(10);
          doc.setTextColor(0);
          doc.setFont(undefined, 'bold');
          doc.text(`${item.time}`, 20, yPos);
          doc.setFont(undefined, 'normal');
          doc.setTextColor(80);
          const taskLines = doc.splitTextToSize(item.task, 130);
          doc.text(taskLines, 50, yPos);
          yPos += (taskLines.length * 5) + 5;
        });
      }

      doc.save(`${event.title.replace(/\s+/g, '_')}_details.pdf`);
      toast.success("PDF Downloaded!");
    } catch (error) {
      toast.error("Failed to generate PDF");
    } finally {
      setIsExporting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f64060]"></div>
    </div>
  );

  if (!event) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
      <h1 className="text-2xl font-bold text-gray-800">Event not found</h1>
      <button onClick={() => navigate('/')} className="text-[#f64060] font-semibold flex items-center gap-2">
        <ArrowLeft size={20} /> Back to Home
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-pink-100 selection:text-[#f64060]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 mt-16">
        {/* Navigation Bar */}
        <div className="mb-10 flex items-center justify-between border-b border-gray-100 pb-6">
          <Link to="/" className="group text-gray-500 hover:text-[#f64060] transition-all flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
            <div className="p-2 rounded-full bg-gray-50 group-hover:bg-pink-50 transition-colors">
              <ArrowLeft size={16} />
            </div>
            Back to Events
          </Link>

          <button
            onClick={exportToPDF}
            disabled={isExporting}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-600 hover:text-[#f64060] transition-all border border-gray-200 px-5 py-2.5 rounded-2xl hover:bg-white hover:shadow-lg disabled:opacity-50"
          >
            <Download size={14} />
            {isExporting ? "Processing..." : "Export PDF"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16">

          {/* Left Content Area */}
          <div className="space-y-12">
            {/* Header Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <span className="bg-pink-100 text-[#f64060] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] shadow-sm">
                      {event.category}
                   </span>
                   {event.isOnline && (
                     <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] shadow-sm flex items-center gap-1.5">
                       <Globe size={10} /> Online
                     </span>
                   )}
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight">
                  {event.title}
                </h1>
              </div>

              {/* Host Section */}
              <div className="flex flex-wrap items-center gap-6 p-1">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center overflow-hidden shadow-inner border-2 border-white ring-1 ring-gray-100">
                     <Users className="text-gray-400" size={24} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                      Hosted by <span className="hover:text-[#f64060] cursor-pointer transition-colors">{event.host}</span>
                      <CheckCircle2 size={14} className="text-blue-500 fill-blue-50" />
                    </p>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
                       <ShieldCheck size={12} className="text-green-500" /> Super Organizer
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 h-10 px-4 bg-gray-50 rounded-xl border border-gray-100 ml-auto md:ml-0">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                    </div>
                    <span className="text-xs font-black text-gray-700">{event.hostRating || '4.9'}</span>
                    <span className="text-xs text-gray-400 font-bold border-l border-gray-200 pl-3">82 Reviews</span>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-1 h-8 bg-[#f64060] rounded-full"></div>
                 <h2 className="text-2xl font-black text-gray-900 tracking-tight">About this Event</h2>
              </div>
              <div
                className="prose prose-pink max-w-none text-gray-600 leading-[1.8] text-lg font-medium tracking-normal"
                dangerouslySetInnerHTML={{ __html: event.description }}
              ></div>
            </div>

            {/* Agenda Section */}
            {event.agenda && event.agenda.length > 0 && (
              <div className="space-y-8 pt-6">
                <div className="flex items-center justify-between">
                   <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                     <Clock size={28} className="text-[#f64060]" /> Event Agenda
                   </h2>
                </div>
                <div className="grid gap-4">
                  {event.agenda.map((item, idx) => (
                    <div key={idx} className="group flex gap-8 p-6 rounded-[2rem] bg-gray-50/50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
                      <div className="text-sm font-black text-[#f64060] uppercase tracking-widest whitespace-nowrap pt-0.5">
                        {item.time}
                      </div>
                      <div className="space-y-1">
                        <p className="text-lg font-bold text-gray-800 group-hover:text-black transition-colors">
                          {item.task}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Map/Location Preview */}
            {!event.isOnline && (
              <div className="space-y-6 pt-6">
                 <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                   <MapPin size={28} className="text-[#f64060]" /> Venue Information
                 </h2>
                 <div className="space-y-4">
                    <MapContainer locationName={event.location} />
                    <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 flex items-start gap-4">
                       <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#f64060] shadow-sm shrink-0">
                          <MapPin size={20} />
                       </div>
                       <div>
                          <p className="text-sm font-black text-gray-900 leading-tight">{event.location}</p>
                          <p className="text-xs text-gray-500 font-bold mt-1 uppercase tracking-widest">{event.fullLocation || "Exact address provided after registration"}</p>
                       </div>
                    </div>
                 </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar */}
          <div className="space-y-8">
            <div className="sticky top-28 space-y-8">
              {/* Main Booking Card */}
              <div className="bg-white rounded-[3rem] border border-gray-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden">
                <div className="aspect-[4/3] relative group overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    crossOrigin="anonymous"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-6 right-6 flex flex-col gap-3">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-90 ${isLiked ? 'bg-[#f64060] text-white' : 'bg-white/90 backdrop-blur-md text-gray-700 hover:text-[#f64060]'}`}
                    >
                      <Heart size={22} fill={isLiked ? "currentColor" : "none"} />
                    </button>
                    <button className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-700 hover:text-[#f64060] shadow-2xl transition-all active:scale-90">
                      <Share2 size={22} />
                    </button>
                  </div>
                </div>

                <div className="p-10 space-y-10">
                  {/* Info Grid */}
                  <div className="grid gap-8">
                    <div className="flex gap-5 group cursor-default">
                      <div className="w-14 h-14 bg-pink-50 rounded-[1.25rem] flex items-center justify-center text-[#f64060] group-hover:bg-[#f64060] group-hover:text-white transition-all duration-500 shadow-sm">
                        <Calendar size={28} />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-black text-gray-900">{event.fullDate || event.date}</h3>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-[0.15em]">{event.time}</p>
                      </div>
                    </div>

                    <div className="flex gap-5 group cursor-default">
                      <div className="w-14 h-14 bg-pink-50 rounded-[1.25rem] flex items-center justify-center text-[#f64060] group-hover:bg-[#f64060] group-hover:text-white transition-all duration-500 shadow-sm">
                        <MapPin size={28} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="text-base font-black text-gray-900 leading-tight">
                          {event.isOnline ? "Virtual Event" : event.location}
                        </h3>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-[0.15em]">Get Directions</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="w-full bg-[#f64060] text-white py-6 rounded-[2rem] text-xl font-black hover:bg-[#e63956] transition-all duration-500 hover:scale-[1.02] active:scale-95 shadow-2xl shadow-pink-500/40"
                    >
                      {event.isFree ? "Register for Free" : "Buy Tickets"}
                    </button>
                    <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                       <Info size={10} /> Secure Checkout by EventKeepers
                    </p>
                  </div>
                </div>
              </div>

              {/* Refund Info */}
              <div className="bg-gray-50/80 backdrop-blur-sm p-8 rounded-[2.5rem] border border-gray-100 flex items-start gap-5 shadow-sm group hover:shadow-md transition-all">
                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-[#f64060] transition-colors shadow-sm">
                   <Clock size={24} />
                 </div>
                 <div className="space-y-1">
                    <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Refund Policy</h4>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">No refunds available for this event. Contact the host for exceptions.</p>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={event}
        axios={axios}
        backendUrl={backendUrl}
      />
      <Footer />
    </div>
  );
};

export default EventDetail;
