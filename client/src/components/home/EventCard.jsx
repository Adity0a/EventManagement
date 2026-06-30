import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  const {
    id,
    title,
    image,
    date,
    time,
    host,
    isFree = true,
    isOnline = false,
  } = event;

  return (
    <Link to={`/event/${id}`} className="group cursor-pointer block transition-all duration-700 ease-out">
      {/* Image Container */}
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-3 shadow-sm transition-all duration-700 group-hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-105 group-hover:brightness-105"
        />
        {isFree && (
          <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-gray-900 shadow-sm flex items-center gap-1.5 transition-all duration-700 group-hover:bg-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600 transition-transform duration-700 group-hover:scale-125" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            Free
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-1 transition-transform duration-700 group-hover:translate-x-1">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight transition-colors duration-700 group-hover:text-[#f64060]">
          {title}
        </h3>
        <div className="flex items-center flex-wrap gap-2 text-sm font-medium text-gray-500">
          <span>{date} · {time}</span>
          {isOnline && (
            <div className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider text-gray-600 font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Online
            </div>
          )}
        </div>
        <p className="text-sm text-gray-400">
          by {host}
        </p>
      </div>
    </Link>
  );
};


export default EventCard;
