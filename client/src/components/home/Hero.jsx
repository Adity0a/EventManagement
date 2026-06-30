import React from 'react';
import heroVideo from '../../assets/41823-431406517_medium.mp4';

/**
 * Hero Component with background video and brand messaging
 */
const Hero = () => {
  return (
    <section className="relative h-[85vh] w-full md:w-[98%] mx-auto overflow-hidden rounded-[3rem] md:rounded-[4rem] mt-24 mb-20 shadow-2xl">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-105"
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Cinematic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-8 md:px-20 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl">
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8 drop-shadow-2xl">
            Experience <br />
            <span className="text-[#f64060]">Everything.</span>
          </h1>

          <p className="text-xl md:text-3xl text-gray-200 leading-tight mb-12 opacity-90 font-medium max-w-2xl">
            The world's most immersive events, local communities, and shared interests—all in one place.
          </p>

          <div className="flex flex-wrap gap-6">
            <button className="bg-[#f64060] text-white px-10 py-5 rounded-full text-xl font-black hover:bg-[#e63956] transition-all duration-700 hover:scale-110 active:scale-95 shadow-[0_20px_50px_rgba(246,64,96,0.3)] hover:shadow-pink-500/50">
              Start Exploring
            </button>
            <button className="bg-white/10 backdrop-blur-xl text-white border-2 border-white/30 px-10 py-5 rounded-full text-xl font-bold hover:bg-white/20 transition-all duration-700">
              See How It Works
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/50 text-xs font-bold uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-0.5 h-12 bg-gradient-to-b from-white/80 to-transparent rounded-full"></div>
      </div>
    </section>
  );
};


export default Hero;
