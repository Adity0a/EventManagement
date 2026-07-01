import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import EventCard from '../../components/home/EventCard';

const EventsPage = () => {
  const { type } = useParams(); // 'local' or 'online'
  const { events: allEvents, loading } = useAppContext();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f64060]"></div>
      </div>
    );
  }

  const events = type === 'online'
    ? allEvents.filter(e => e.isOnline && e.isPublished)
    : allEvents.filter(e => !e.isOnline && e.isPublished);

  const title = type === 'online' ? "Upcoming Online Events" : "Events near Mumbai, IN";

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mb-12">
          <Link to="/" className="text-[#f64060] font-medium hover:underline flex items-center gap-2 mb-4 transition-all duration-300 hover:-translate-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
            {title}
          </h1>
          <div className="w-24 h-1 bg-[#f64060] mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {events?.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>

        {events?.length === 0 && (
          <div className="text-center py-20">
             <p className="text-gray-500 text-lg">No events found in this category.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default EventsPage;
