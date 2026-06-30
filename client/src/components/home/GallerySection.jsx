import React from 'react';
import SectionHeader from '../common/SectionHeader';

/**
 * Visual gallery section displaying past event work
 */
const GallerySection = ({ images }) => {
  if (!images || images.length === 0) return null;

  return (
    <section className="mb-24 px-4">
      <SectionHeader title="Our Work" subtitle="Event gallery" centered />

      <div className="grid grid-cols-2 md:grid-cols-4 border-2 border-white bg-white rounded-xl overflow-hidden shadow-sm">
        {images.map((img, index) => (
          <div key={index} className="relative aspect-square overflow-hidden group">
            <img
              src={img}
              alt={`Gallery event ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-700"></div>
            <div className="absolute inset-0 border-[1px] border-white pointer-events-none"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GallerySection;
