import React from 'react';

const ServiceCard = ({ title, description, image }) => {
  return (
    <div className="group relative aspect-[4/3] rounded-sm overflow-hidden cursor-pointer shadow-md transition-all duration-700 ease-out">
      {/* Background Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />

      {/* Dark Overlay at Bottom */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-slate-900/80 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center transition-all duration-700 group-hover:h-1/2 group-hover:bg-[#7c3aed]/90">
        <h3 className="text-white text-xl font-bold mb-1 tracking-wide uppercase transition-transform duration-700 group-hover:-translate-y-1">
          {title}
        </h3>
        <p className="text-gray-300 text-sm italic transition-all duration-700 group-hover:text-white group-hover:not-italic">
          {description}
        </p>
      </div>

      {/* Border Effect on Hover */}
      <div className="absolute inset-0 border-0 border-white/20 transition-all duration-700 group-hover:border-[12px]"></div>
    </div>
  );
};

export default ServiceCard;

