import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Star,
  ChevronRight,
  Share2,
  Heart,
  Users,
  Clock,
  Map,
  ArrowLeft
} from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch('/carddata.json');
        const data = await response.json();
        const allEvents = [...data.events, ...data.onlineEvents];
        const foundEvent = allEvents.find(e => e.id === parseInt(id));
        setEvent(foundEvent);
      } catch (error) {
        console.error('Error fetching event details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f64060]"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Event not found</h1>
        <Link to="/" className="text-[#f64060] font-semibold flex items-center gap-2">
          <ArrowLeft size={20} /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-pink-100 selection:text-[#f64060]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 mt-16">
        {/* Breadcrumbs / Back Navigation */}
        <div className="mb-8">
          <Link to="/" className="text-gray-500 hover:text-[#f64060] transition-colors flex items-center gap-2 text-sm font-medium">
            <ArrowLeft size={16} /> Back to Events
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">

          {/* Main Content Column */}
          <div className="space-y-10">
            {/* Header Section */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight">
                {event.title}
              </h1>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                   <Users className="text-gray-400" size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">Hosted by <span className="hover:underline cursor-pointer">{event.host}</span></span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium">{event.host} is a <span className="text-[#f64060]">Super Organizer</span></p>
                </div>
              </div>

              {/* Host Group Info */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                 <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center text-white font-bold text-xs uppercase shadow-sm">
                    MEETUP
                 </div>
                 <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1">
                      {event.host} <ChevronRight size={14} className="text-gray-400" />
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-700">{event.hostRating || '4.5'}</span>
                      <div className="flex text-pink-500">
                        {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                      </div>
                      <span className="text-xs text-gray-400">{event.hostReviews || '50 reviews'}</span>
                    </div>
                 </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-6 pt-6 border-t border-gray-100">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Details</h2>
              <div className="prose prose-pink max-w-none text-gray-600 leading-relaxed space-y-4">
                <p className="font-medium">{event.description}</p>
                <p className="text-sm opacity-90 whitespace-pre-line">{event.longDescription || event.description}</p>
              </div>
            </div>

            {/* Agenda Section */}
            {event.agenda && (
              <div className="space-y-6 pt-6 border-t border-gray-100">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                  <Clock size={24} className="text-[#f64060]" /> Agenda
                </h2>
                <div className="space-y-4">
                  {event.agenda.map((item, idx) => (
                    <div key={idx} className="flex gap-6 group">
                      <div className="text-sm font-bold text-gray-900 whitespace-nowrap pt-1 w-20">
                        {item.time}
                      </div>
                      <div className="relative pb-6 pl-4 border-l-2 border-gray-100 group-last:border-transparent">
                        <div className="absolute top-2 -left-[9px] w-4 h-4 rounded-full bg-white border-2 border-gray-200 group-hover:border-[#f64060] transition-colors"></div>
                        <p className="text-sm text-gray-700 font-medium leading-relaxed">
                          {item.task}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6 sticky top-28 h-fit">
            {/* Action Card */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl overflow-hidden">
              <div className="aspect-[4/3] relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-700 hover:text-[#f64060] shadow-lg transition-all active:scale-95">
                    <Share2 size={20} />
                  </button>
                  <button className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-700 hover:text-[#f64060] shadow-lg transition-all active:scale-95">
                    <Heart size={20} />
                  </button>
                </div>
              </div>

              <div className="p-8 space-y-8">
                {/* Date & Time */}
                <div className="flex gap-4 group cursor-default">
                  <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-[#f64060] group-hover:bg-[#f64060] group-hover:text-white transition-all duration-300">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-gray-900">{event.fullDate || event.date}</h3>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Add to calendar</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex gap-4 group cursor-default">
                  <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-[#f64060] group-hover:bg-[#f64060] group-hover:text-white transition-all duration-300">
                    <MapPin size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-black text-gray-900">{event.isOnline ? "Online Event" : (event.fullLocation || event.location)}</h3>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">View on Map</p>
                  </div>
                </div>

                <button className="w-full bg-[#f64060] text-white py-5 rounded-3xl text-lg font-black hover:bg-[#e63956] transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-xl shadow-pink-500/30">
                  {event.isFree ? "Register for Free" : "Get Tickets"}
                </button>
              </div>
            </div>

            {/* Refund Policy */}
            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex items-center gap-4">
               <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400">
                 <Clock size={20} />
               </div>
               <div>
                  <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Refund Policy</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Contact the organizer to request a refund.</p>
               </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EventDetail;
