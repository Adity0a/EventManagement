import React from 'react';
import DestinationCard from './DestinationCard';

/**
 * Grid for featured destinations with navigation and scroll indicator
 */
const DestinationsGrid = ({ destinations }) => {
  if (!destinations || destinations.length === 0) return null;

  return (
    <section className="mb-24 px-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight text-center md:text-left">
          Top destinations in <span className="text-[#7c3aed]">United States</span>
        </h2>
        <div className="flex gap-3">
          <button className="p-2 rounded-full border border-gray-200 text-gray-400 hover:text-gray-900 hover:border-gray-900 transition-all duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="p-2 rounded-full border border-gray-900 text-gray-900 hover:bg-gray-50 transition-all duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((dest) => (
          <DestinationCard key={dest.id} city={dest.city} image={dest.image} />
        ))}
      </div>

      <div className="mt-6 w-full h-1 bg-gray-100 rounded-full overflow-hidden hidden md:block">
        <div className="w-1/4 h-full bg-gray-400 rounded-full"></div>
      </div>
    </section>
  );
};

export default DestinationsGrid;

