import React from 'react';

/**
 * Reusable Header for page sections with a red underline accent
 */
const SectionHeader = ({ title, subtitle, centered = false }) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e293b] tracking-wider uppercase mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-400 text-lg mb-4">
          {subtitle}
        </p>
      )}
      <div className={`w-16 h-1 bg-[#7c3aed] ${centered ? 'mx-auto' : ''}`}></div>
    </div>
  );
};

export default SectionHeader;

