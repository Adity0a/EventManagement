import React from 'react';

/**
 * Brand Logo Component with animated hover effects
 */
const Logo = ({ light = false }) => {
  const brandColor = "#f64060";
  const textColor = light ? "text-white" : "text-[#f64060]";

  return (
    <div className="flex items-center gap-2.5 cursor-pointer group transition-all duration-700 ease-out hover:opacity-90">
      {/* Dynamic Icon Container */}
      <div className="bg-[#f64060] p-2 rounded-xl flex items-center justify-center transition-all duration-700 group-hover:shadow-[0_0_20px_rgba(246,64,96,0.4)] group-hover:rotate-[8deg] group-hover:scale-110 relative overflow-hidden">
        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white fill-current drop-shadow-sm"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v10h-2V7z" />
          <circle cx="12" cy="12" r="3" className="animate-pulse" />
        </svg>
      </div>

      {/* Brand Identity */}
      <div className="flex flex-col -space-y-1">
        <span className={`${textColor} text-2xl font-black tracking-tighter transition-all duration-700 group-hover:tracking-normal`}>
          evently
        </span>
        <div className={`h-0.5 w-0 ${light ? 'bg-white' : 'bg-[#f64060]'} group-hover:w-full transition-all duration-700 rounded-full`}></div>
      </div>
    </div>
  );
};


export default Logo;
