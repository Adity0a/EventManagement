import React from 'react';
import { useFetchData } from '../../hooks/useFetchData';
import { useAppContext } from '../../context/AppContext';

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
  const { events: backendEvents, searchQuery, searchLocation } = useAppContext();
  const { data, loading, error } = useFetchData('/carddata.json');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7c3aed]"></div>
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

  // Destructure static data
  const { services, destinations, gallery, clients, faqs } = data;

  // Filter events based on search
  const filteredEvents = backendEvents.filter(event => {
    const safeQuery = (searchQuery || "").trim().toLowerCase();
    const safeLocation = (searchLocation || "").trim().toLowerCase();

    const matchesQuery = !safeQuery ||
      (event.title || "").toLowerCase().includes(safeQuery) ||
      (event.host || "").toLowerCase().includes(safeQuery) ||
      (event.category || "").toLowerCase().includes(safeQuery);

    const matchesLocation = !safeLocation ||
      (event.location || "").toLowerCase().includes(safeLocation);

    return matchesQuery && matchesLocation && event.isPublished;
  });

  // Split filtered events into local and online
  const localEvents = filteredEvents.filter(e => !e.isOnline);
  const onlineEvents = filteredEvents.filter(e => e.isOnline);

  const isSearching = (searchQuery || "").trim() !== "" || (searchLocation || "").trim() !== "";

  return (
    <div className="min-h-screen bg-white selection:bg-purple-100 selection:text-[#7c3aed]">
      <Navbar />

      {/* Hero Section - Outside main container to expand left/right */}
      <Hero />

      <main className="pb-12 px-4 md:px-8 max-w-7xl mx-auto overflow-x-hidden">
        <hr className="border-gray-100 mb-16 mx-4" />

        {isSearching && (
          <div className="mb-12">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              {filteredEvents.length > 0
                ? `Found ${filteredEvents.length} events matching your search`
                : "No events found matching your search"}
            </h2>
            <div className="w-24 h-1 bg-[#7c3aed] mt-4 rounded-full"></div>
          </div>
        )}

        {/* Dynamic Content Sections */}
        {(localEvents.length > 0 || !isSearching) && (
          <EventGrid
            title={isSearching ? "Matching Local Events" : "Events near"}
            location={isSearching ? "" : "Mumbai, IN"}
            events={localEvents}
            seeAllPath={isSearching ? "" : "/events/local"}
            limit={isSearching ? 100 : 4}
          />
        )}

        {(onlineEvents.length > 0 || !isSearching) && (
          <EventGrid
            title={isSearching ? "Matching Online Events" : "Upcoming online events"}
            events={onlineEvents}
            seeAllPath={isSearching ? "" : "/events/online"}
            limit={isSearching ? 100 : 4}
          />
        )}

        {!isSearching && (
          <>
            <ServicesGrid services={services} />
            <DestinationsGrid destinations={destinations} />
            <GallerySection images={gallery} />
            <ClientsSection clients={clients} />
            <FAQSection faqs={faqs} />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;

