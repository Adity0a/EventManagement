import React from 'react';
import { Link } from 'react-router-dom';
import EventTitle from './EventTitle';
import EventCard from './EventCard';

/**
 * Responsive grid for displaying events with "See All" navigation
 */
const EventGrid = ({ title, location, events, seeAllPath, className = "" }) => {
  if (!events || events.length === 0) return null;

  // Show only 4 events on the home page
  const displayedEvents = events.slice(0, 4);
  const showButton = !!seeAllPath; // Always show if path is provided

  return (
    <section className={`mb-16 ${className}`}>
      <EventTitle
        title={title}
        location={location}
        showSeeAll={showButton}
        seeAllPath={seeAllPath}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
        {displayedEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Mobile-only "See All" button at bottom */}
      {showButton && (
        <div className="mt-8 flex justify-center md:hidden">
          <Link
            to={seeAllPath}
            className="w-full bg-white text-[#7c3aed] border-2 border-[#7c3aed]/20 py-3 rounded-xl font-bold hover:bg-purple-50 transition-all active:scale-95 text-center"
          >
            See all events
          </Link>
        </div>
      )}
    </section>
  );
};


export default EventGrid;
