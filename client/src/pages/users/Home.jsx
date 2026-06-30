import React from 'react';
import { useFetchData } from '../../hooks/useFetchData';

// Layout & Common Components
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

// Page Specific Components
import Hero from '../../components/home/Hero';
import EventGrid from '../../components/home/EventGrid';
import ServicesGrid from '../../components/home/ServicesGrid';
import DestinationsGrid from '../../components/home/DestinationsGrid';
import GallerySection from '../../components/home/GallerySection';
import ClientsSection from '../../components/home/ClientsSection';
import FAQSection from '../../components/home/FAQSection';

/**
 * Home Page Component
 * Main landing page for the application
 */
const Home = () => {
  // Use custom hook for cleaner data fetching logic
  const { data, loading, error } = useFetchData('/carddata.json');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f64060]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-red-500 font-medium">
        Failed to load content. Please refresh the page.
      </div>
    );
  }

  // Destructure for cleaner access
  const { events, onlineEvents, services, destinations, gallery, clients, faqs } = data;

  return (
    <div className="min-h-screen bg-white selection:bg-pink-100 selection:text-[#f64060]">
      <Navbar />

      {/* Hero Section - Outside main container to expand left/right */}
      <Hero />

      <main className="pb-12 px-4 md:px-8 max-w-7xl mx-auto overflow-x-hidden">
        <hr className="border-gray-100 mb-16 mx-4" />

        {/* Dynamic Content Sections */}
        <EventGrid
          title="Events near"
          location="Mumbai, IN"
          events={events}
          seeAllPath="/events/local"
        />

        <EventGrid
          title="Upcoming online events"
          events={onlineEvents}
          seeAllPath="/events/online"
        />

        <ServicesGrid services={services} />

        <DestinationsGrid destinations={destinations} />

        <GallerySection images={gallery} />

        <ClientsSection clients={clients} />

        <FAQSection faqs={faqs} />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
