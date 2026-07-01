import React, { useState } from 'react';
import SectionHeader from '../common/SectionHeader';

/**
 * Individual Client Logo Card with fallback
 */
const ClientItem = ({ client }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="flex items-center justify-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-700 hover:shadow-xl hover:-translate-y-2 group cursor-pointer">
      {!hasError ? (
        <img
          src={client.logo}
          alt={client.name}
          className="max-h-16 w-auto opacity-90 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105 object-contain"
          onError={() => setHasError(true)}
        />
      ) : (
        <span className="text-2xl font-black text-gray-400 transition-all duration-700 group-hover:text-[#7c3aed] group-hover:scale-105 tracking-tighter uppercase italic">
          {client.name}
        </span>
      )}
    </div>
  );
};

/**
 * Section displaying client logos in a responsive grid
 */
const ClientsSection = ({ clients }) => {
  if (!clients || clients.length === 0) return null;

  return (
    <section className="mb-24 px-4">
      <SectionHeader title="Clients" centered />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {clients.map((client, index) => (
          <ClientItem key={index} client={client} />
        ))}
      </div>
    </section>
  );
};

export default ClientsSection;

