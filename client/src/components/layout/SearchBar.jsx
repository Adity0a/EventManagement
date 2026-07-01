import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { searchQuery, setSearchQuery, searchLocation, setSearchLocation, events } = useAppContext();
  const [query, setQuery] = useState(searchQuery);
  const [location, setLocation] = useState(searchLocation);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef(null);
  const navigate = useNavigate();
  const locationPath = useLocation();

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    setLocation(searchLocation);
  }, [searchLocation]);

  const filteredSuggestions = events
    ? events
        .filter(e => e.title.toLowerCase().includes(query.toLowerCase()) && e.isPublished)
        .slice(0, 6)
        .map(e => e.title)
    : [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e, selectedQuery = query) => {
    e?.preventDefault();
    setSearchQuery(selectedQuery);
    setSearchLocation(location);
    setShowSuggestions(false);

    if (locationPath.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <div className="relative flex-1 max-w-2xl px-4">
      <form onSubmit={handleSearch} className="flex items-center bg-white border border-gray-200 rounded-full shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] focus-within:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300">

        {/* Search Events Section */}
        <div className="flex-1 flex items-center pl-6 py-3">
          <input
            type="text"
            placeholder="Search events..."
            className="w-full outline-none text-[15px] text-gray-700 bg-transparent placeholder-gray-400"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
          />
        </div>

        {/* Vertical Separator */}
        <div className="h-8 w-[1px] bg-gray-200"></div>

        {/* Location Picker Section */}
        <div className="flex-[0.7] flex items-center px-6 py-3">
          <input
            type="text"
            placeholder="Location"
            className="w-full outline-none text-[15px] text-[#334155] bg-transparent placeholder-gray-400 font-semibold text-right md:text-left"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Search Button */}
        <button type="submit" className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white w-11 h-11 flex items-center justify-center rounded-full mr-1.5 transition-all duration-300 active:scale-95 group">
          <Search size={20} className="group-hover:scale-110 transition-transform duration-300" strokeWidth={3} />
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && query.length > 0 && (
        <div
          ref={suggestionRef}
          className="absolute left-4 right-4 mt-3 bg-white border border-gray-100 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] z-50 overflow-hidden"
        >
          {filteredSuggestions.length > 0 ? (
            <ul className="py-2">
              {filteredSuggestions.map((item, index) => (
                <li
                  key={index}
                  className="px-6 py-3.5 hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-[14px] text-gray-600 transition-colors"
                  onClick={() => {
                    setQuery(item);
                    handleSearch(null, item);
                  }}
                >
                  <Search size={14} className="text-gray-400" />
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-6 py-4 text-sm text-gray-400 italic">No events found matching your search</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

