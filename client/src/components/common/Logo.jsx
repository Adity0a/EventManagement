import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Brand Logo Component with animated hover effects
 */
const Logo = ({ light = false }) => {
  const navigate = useNavigate();
  const brandColor = "#7c3aed";
  const textColor = light ? "text-white" : "text-[#7c3aed]";

  return (
    <div
      onClick={() => navigate('/')}
      className="flex items-center gap-2.5 cursor-pointer group transition-all duration-700 ease-out hover:opacity-90"
    >
      {/* Dynamic Icon Container */}
      <div className="bg-[#7c3aed] w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-700 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] group-hover:rotate-[8deg] group-hover:scale-110 relative overflow-hidden shrink-0">
        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

        <span className="text-white text-lg font-black tracking-tighter italic">ET</span>
      </div>

      {/* Brand Identity */}
      <div className="flex flex-col -space-y-1">
        <span className={`${textColor} text-2xl font-black tracking-tighter transition-all duration-700 group-hover:tracking-normal`}>
          Evently
        </span>
        <div className={`h-0.5 w-0 ${light ? 'bg-white' : 'bg-[#7c3aed]'} group-hover:w-full transition-all duration-700 rounded-full`}></div>
      </div>
    </div>
  );
};


export default Logo;


