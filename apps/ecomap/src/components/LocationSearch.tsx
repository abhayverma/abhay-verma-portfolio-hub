import React, { useState, useEffect } from 'react';
import { Search, LocateFixed } from "lucide-react";
import { nominatimLimiter } from '../hooks/rateLimiter';

interface LocationSearchProps {
  onLocationSelect: (lat: number, lng: number, label?: string) => void;
}

interface SuggestionItem {
  display_name: string;
  lat: string;
  lon: string;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Array<{ label: string; lat: number; lng: number }>>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  // Explicit Location Trigger Action
  const triggerGeolocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          onLocationSelect(pos.coords.latitude, pos.coords.longitude, "My Current Location");
          setQuery("My Current Location");
          setIsLocating(false);
        },
        (err) => {
          console.warn("Geolocation failed or denied.", err);
          setIsLocating(false);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }
  };

  useEffect(() => {
    if (query.length < 3 || query === "My Current Location") {
      setSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      if (!nominatimLimiter.canMakeRequest()) {
        setIsRateLimited(true);
        return;
      }
      setIsRateLimited(false);

      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=4`);
        const data = await res.json();
        
        setSuggestions(data.map((item: SuggestionItem) => ({
          label: item.display_name,
          lat: Number.parseFloat(item.lat),
          lng: Number.parseFloat(item.lon)
        })));
      } catch (err) {
        console.error("Address lookup failed", err);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="relative">
      <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
      <input 
        type="text"
        value={query}
        onChange={(e) => { setQuery(e.target.value); setShowDropdown(true); }}
        placeholder={isRateLimited ? "Slow down... fetching..." : "Search global coordinates..."}
        className="w-full pl-9 pr-10 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-portfolio-accent/50 transition-all shadow-sm"
      />
      
      {/* The New Locate Me Button */}
      <button 
        onClick={triggerGeolocation}
        title="Find My Location"
        className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md transition-all ${
          isLocating ? 'text-portfolio-accent animate-pulse' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
        }`}
      >
        <LocateFixed size={16} />
      </button>

      {showDropdown && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-xl overflow-hidden max-h-60 overflow-y-auto z-[1100]">
          {suggestions.map((place, idx) => (
            <button
              key={idx}
              onClick={() => {
                onLocationSelect(place.lat, place.lng, place.label);
                setQuery(place.label);
                setShowDropdown(false);
              }}
              className="w-full text-left px-4 py-2.5 text-xs border-b border-border/40 hover:bg-muted/60 text-muted-foreground transition-colors line-clamp-2"
            >
              {place.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};