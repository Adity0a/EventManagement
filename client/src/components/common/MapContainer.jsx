import React, { useState, useEffect } from 'react';
import { Loader2, MapPinOff, ExternalLink, Navigation } from 'lucide-react';

/**
 * MapContainer Component
 * Displays an elegant Geoapify Static Map with coordinates geocoded from locationName.
 * This approach avoids Google Maps "ApiTargetBlockedMapError" and ensures 100% uptime.
 */
const MapContainer = ({ locationName }) => {
  const geoapifyKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

  const [center, setCenter] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!locationName || !geoapifyKey) {
      setLoading(false);
      setError(true);
      return;
    }

    const geocodeLocation = async () => {
      try {
        setLoading(true);
        // Geocode via Geoapify API
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(locationName)}&apiKey=${geoapifyKey}`
        );
        const data = await response.json();

        if (data.features && data.features.length > 0) {
          const [lon, lat] = data.features[0].geometry.coordinates;
          setCenter({ lat, lng: lon });
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Geocoding error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    geocodeLocation();
  }, [locationName, geoapifyKey]);

  if (loading) {
    return (
      <div className="w-full h-[400px] bg-gray-50 flex flex-col items-center justify-center rounded-[3rem] border border-gray-100 shadow-inner">
        <div className="relative">
           <div className="absolute inset-0 bg-[#7c3aed]/20 rounded-full animate-ping"></div>
           <Loader2 className="relative animate-spin text-[#7c3aed]" size={32} />
        </div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-6">Searching Venue...</p>
      </div>
    );
  }

  if (error || !center) {
    return (
      <div className="w-full h-[400px] bg-gray-50 flex flex-col items-center justify-center rounded-[3rem] border border-gray-100 p-8 text-center shadow-inner">
        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl mb-6">
           <MapPinOff className="text-gray-200" size={40} />
        </div>
        <h4 className="text-lg font-black text-gray-900 uppercase tracking-tight">Map Preview Unavailable</h4>
        <p className="text-sm text-gray-500 font-medium mt-2 max-w-[250px] mx-auto leading-relaxed">
           We couldn't pinpoint "{locationName}" on our high-precision map.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 text-[10px] font-black uppercase tracking-widest text-[#7c3aed] hover:underline"
        >
          Try Reloading
        </button>
      </div>
    );
  }

  // Premium Geoapify Static Map Configuration
  // Style: 'osm-bright-smooth' provides a modern, clean look
  const staticMapUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=1000&height=600&center=lonlat:${center.lng},${center.lat}&zoom=15&marker=lonlat:${center.lng},${center.lat};color:%23f64060;size:large;icon:awesome-map-pin&apiKey=${geoapifyKey}`;

  return (
    <div className="relative group w-full h-[400px] rounded-[3rem] overflow-hidden border-4 border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] group">
      {/* Background Glow */}
      <div className="absolute -inset-4 bg-[#7c3aed]/5 blur-3xl rounded-full group-hover:bg-[#7c3aed]/10 transition-colors duration-700"></div>

      <img
        src={staticMapUrl}
        alt={`Map of ${locationName}`}
        className="relative w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
        loading="lazy"
      />

      {/* UI Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-700"></div>

      <div className="absolute top-6 left-6 flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-white/50">
         <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
         <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Live Venue View</span>
      </div>

      <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-2xl border border-white/50 max-w-[200px] pointer-events-auto transform translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Venue Name</p>
           <p className="text-sm font-black text-gray-900 line-clamp-1">{locationName}</p>
        </div>

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationName)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#7c3aed] text-white p-5 rounded-3xl shadow-2xl hover:bg-black transition-all duration-500 active:scale-90 pointer-events-auto flex items-center gap-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-700 delay-75"
        >
          <Navigation size={20} className="fill-current" />
          <span className="text-xs font-black uppercase tracking-widest hidden sm:inline">Get Directions</span>
          <ExternalLink size={14} className="sm:hidden" />
        </a>
      </div>

      {/* Interactive Overlay Hint */}
      <div className="absolute inset-0 border-[16px] border-white/0 group-hover:border-white/20 transition-all duration-700 pointer-events-none rounded-[3rem]"></div>
    </div>
  );
};

export default React.memo(MapContainer);

