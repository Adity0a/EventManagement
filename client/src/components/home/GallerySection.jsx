import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../common/SectionHeader';

/**
 * Enhanced Gallery Section with Bento Grid and Category Filtering
 */
const GallerySection = ({ images }) => {
  const [filter, setFilter] = useState('All');

  if (!images || images.length === 0) return null;

  // Get unique categories
  const categories = ['All', ...new Set(images.map(img => img.category))];

  // Filter images
  const filteredImages = filter === 'All'
    ? images
    : images.filter(img => img.category === filter);

  // Helper to determine grid span classes based on index to create a "Bento" look
  const getGridSpan = (index) => {
    const patterns = [
      "md:col-span-2 md:row-span-2", // Large
      "md:col-span-1 md:row-span-1", // Square
      "md:col-span-1 md:row-span-2", // Tall
      "md:col-span-1 md:row-span-1", // Square
      "md:col-span-2 md:row-span-1", // Wide
      "md:col-span-1 md:row-span-1", // Square
      "md:col-span-1 md:row-span-1", // Square
      "md:col-span-1 md:row-span-1", // Square
    ];
    return patterns[index % patterns.length];
  };

  return (
    <section className="mb-32 px-4 max-w-7xl mx-auto">
      <SectionHeader title="Our Work" subtitle="A showcase of our most memorable experiences" centered />

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full text-sm font-black transition-all duration-500 uppercase tracking-widest ${
              filter === cat
                ? "bg-[#7c3aed] text-white shadow-[0_10px_20px_rgba(124,58,237,0.3)]"
                : "bg-gray-50 text-gray-500 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
        {filteredImages.map((img, index) => (
          <div
            key={index}
            className={`group relative overflow-hidden rounded-[2rem] bg-gray-100 ${getGridSpan(index)} animate-in fade-in zoom-in duration-700`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <img
              src={img.url}
              alt={img.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-8">
              <span className="text-[#7c3aed] text-[10px] font-black uppercase tracking-[0.3em] mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-75">
                {img.category}
              </span>
              <h3 className="text-white text-xl font-black leading-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-150">
                {img.title}
              </h3>
            </div>

            {/* Corner Accent */}
            <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 rotate-45 group-hover:rotate-0">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
               </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GallerySection;
