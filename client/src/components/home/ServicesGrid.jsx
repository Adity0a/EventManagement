import React from 'react';
import SectionHeader from '../common/SectionHeader';
import ServiceCard from './ServiceCard';

/**
 * Grid component for displaying services on the home page
 */
const ServicesGrid = ({ services }) => {
  if (!services || services.length === 0) return null;

  return (
    <section className="mb-24 px-4">
      <SectionHeader
        title="Evently Services"
        subtitle="Best & Easy booking Services we offer"
        centered
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            image={service.image}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesGrid;
