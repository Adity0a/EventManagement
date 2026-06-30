import React from 'react';

const DestinationCard = ({ city, image }) => {
  return (
    <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-out">
      {/* Background Image */}
      <img
        src={image}
        alt={city}
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-90"></div>

      {/* City Name */}
      <div className="absolute bottom-4 left-6">
        <h3 className="text-white text-2xl font-bold tracking-tight transition-transform duration-700 group-hover:-translate-y-1">
          {city}
        </h3>
      </div>

      {/* Orange Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#f64060] transform scale-x-0 transition-transform duration-700 origin-left group-hover:scale-x-100"></div>
    </div>
  );
};

export default DestinationCard;
