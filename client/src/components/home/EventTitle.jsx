import React from 'react';
import { Link } from 'react-router-dom';

const EventTitle = ({ title, location, showSeeAll = true, seeAllPath }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          {title}{' '}
          {location && (
            <>
              <span className="text-[#7c3aed]">{location}</span>
              <button className="text-[#7c3aed] hover:bg-purple-50 p-1.5 rounded-full transition-colors inline-flex align-middle ml-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            </>
          )}
        </h2>
      </div>
      {showSeeAll && seeAllPath && (
        <Link
          to={seeAllPath}
          className="hidden md:block text-[#7c3aed] font-medium hover:underline text-base whitespace-nowrap"
        >
          See all events
        </Link>
      )}
    </div>
  );
};

export default EventTitle;
