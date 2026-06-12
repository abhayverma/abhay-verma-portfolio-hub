import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@portfolio/shared-ui";
import { ShieldAlert, Sparkles, MapPin, Leaf } from "lucide-react";
import { FloraRecord } from '../types/ecomap';
import { fetchRegionalBiodiversity, fetchRegionalMetrics, RegionalMetrics } from '../hooks/geoEngine';

// Import our sub-components
import { LocationSearch } from './LocationSearch';
import { MapCanvas } from './MapCanvas';
import { FloraLedger } from './FloraLedger';

// Set fallback baseline to Mumbai (Bandra Kurla Complex / Coastal area)
const DEFAULT_CENTER: [number, number] = [19.0760, 72.8777];

export const EcoMapDashboard = () => {
  const [center, setCenter] = useState<[number, number]>(DEFAULT_CENTER);
  const [floraRecords, setFloraRecords] = useState<FloraRecord[]>([]);
  const [activeRecord, setActiveRecord] = useState<string | null>(null);

  // Filter State
  const [activeFilter, setActiveFilter] = useState<'all' | 'threatened' | 'recent'>('all');
  
  // Independent Metrics State
  const [metrics, setMetrics] = useState<RegionalMetrics>({ total: 0, threatened: 0, recent: 0 });

  // Pagination States
  const [isFetching, setIsFetching] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback((node: HTMLDivElement | null) => {
    if (isFetching) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [isFetching, hasMore]);

  const handleLocationChange = (lat: number, lng: number) => {
    setCenter([lat, lng]);
    setPage(1); 
    setFloraRecords([]); 
    setHasMore(true);
    setActiveFilter('all');
  };

  // Handle Filter Card Clicks
  const handleFilterClick = (filter: 'all' | 'threatened' | 'recent') => {
    if (filter === activeFilter) return; // Ignore if clicking the already active filter
    setActiveFilter(filter);
    setPage(1); // Reset pagination for the new filter
    setFloraRecords([]); // Clear out the old list
    setHasMore(true);
    setActiveRecord(null); // Deselect active map marker
  };

  // 1. Resolve Native Geolocation on Mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => handleLocationChange(pos.coords.latitude, pos.coords.longitude),
        () => console.warn("Geolocation permission restricted. Falling back to Mumbai.")
      );
    }
  }, []);

  // 2. Fetch iNaturalist Data (With built-in Strict-Mode bypass & Pan Debounce)
  useEffect(() => {
    let isMounted = true;
    setIsFetching(true);
    
    const fetchDebounce = setTimeout(async () => {
      try {
        // Only fetch absolute metrics if we are on page 1 (a new location search)
        if (page === 1) {
          fetchRegionalMetrics(center[0], center[1]).then(newMetrics => {
            if (isMounted) setMetrics(newMetrics);
          });
        }

        // Fetch the paginated list data
        const newRecords = await fetchRegionalBiodiversity(center[0], center[1], page, 20, activeFilter);        

        if (isMounted) {
          setFloraRecords(prev => {
            const combined = page === 1 ? newRecords : [...prev, ...newRecords];
            return Array.from(new Map(combined.map(item => [item.id, item])).values());
          });
          
          setHasMore(newRecords.length === 20);
          setIsFetching(false);
        }
      } catch (err) {
        console.error("Failed to load ecosystem data", err);
        if (isMounted) setIsFetching(false);
      }
    }, 400);

    return () => {
      isMounted = false;
      clearTimeout(fetchDebounce);
    };
  }, [center, page, activeFilter]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      
      {/* Left Panel - Map & Search */}
      <div className="lg:col-span-1 space-y-6">
        <Card className="border-border bg-card shadow-sm relative z-[1000]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <MapPin size={16} className="text-portfolio-accent"/> Target Vector
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 relative">
            <LocationSearch onLocationSelect={handleLocationChange} />
            <div className="text-xs p-2.5 rounded-lg bg-muted/40 border border-border/60 flex justify-between font-mono text-muted-foreground">
              <span>Lat: {center[0].toFixed(4)}</span>
              <span>Lng: {center[1].toFixed(4)}</span>
            </div>
          </CardContent>
        </Card>

        <MapCanvas 
          center={center} 
          records={floraRecords} 
          isFetching={isFetching} 
          activeRecord={activeRecord} 
          onRecordSelect={setActiveRecord}
          onCenterUpdate={handleLocationChange}
        />
      </div>

      {/* Right Panel - Stats & Ledger */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* NEW 3-CARD FILTER LAYOUT */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* 1. All Flora Filter Card */}
          <button 
            onClick={() => handleFilterClick('all')}
            className={`p-4 rounded-xl border flex flex-col items-start gap-1 transition-all text-left w-full
              ${activeFilter === 'all' ? 'bg-blue-500/10 border-blue-500/50 ring-2 ring-blue-500/20' : 'bg-card hover:bg-muted border-border'}
            `}
          >
            <div className="flex items-center gap-2">
              <Leaf className={`w-4 h-4 ${activeFilter === 'all' ? 'text-blue-500' : 'text-muted-foreground'}`} />
              <h4 className="font-bold text-xs text-foreground uppercase tracking-wider">Total Flora</h4>
            </div>
            <p className={`text-2xl font-mono font-black mt-1 ${activeFilter === 'all' ? 'text-blue-400' : 'text-foreground'}`}>
              {metrics.total}
            </p>
          </button>

          {/* 2. Threatened Filter Card */}
          <button 
            onClick={() => handleFilterClick('threatened')}
            className={`p-4 rounded-xl border flex flex-col items-start gap-1 transition-all text-left w-full
              ${activeFilter === 'threatened' ? 'bg-red-500/10 border-red-500/50 ring-2 ring-red-500/20' : 'bg-card hover:bg-muted border-border'}
            `}
          >
            <div className="flex items-center gap-2">
              <ShieldAlert className={`w-4 h-4 ${activeFilter === 'threatened' ? 'text-red-500' : 'text-muted-foreground'}`} />
              <h4 className="font-bold text-xs text-foreground uppercase tracking-wider">Threatened</h4>
            </div>
            <p className={`text-2xl font-mono font-black mt-1 ${activeFilter === 'threatened' ? 'text-red-400' : 'text-foreground'}`}>
              {metrics.threatened}
            </p>
          </button>

          {/* 3. Recent Discoveries Filter Card */}
          <button 
            onClick={() => handleFilterClick('recent')}
            className={`p-4 rounded-xl border flex flex-col items-start gap-1 transition-all text-left w-full
              ${activeFilter === 'recent' ? 'bg-green-500/10 border-green-500/50 ring-2 ring-green-500/20' : 'bg-card hover:bg-muted border-border'}
            `}
          >
            <div className="flex items-center gap-2">
              <Sparkles className={`w-4 h-4 ${activeFilter === 'recent' ? 'text-green-500' : 'text-muted-foreground'}`} />
              <h4 className="font-bold text-xs text-foreground uppercase tracking-wider">Recent</h4>
            </div>
            <p className={`text-2xl font-mono font-black mt-1 ${activeFilter === 'recent' ? 'text-green-400' : 'text-foreground'}`}>
              {metrics.recent}
            </p>
          </button>

        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              {activeFilter === 'all' ? 'Complete' : activeFilter === 'threatened' ? 'Threatened' : 'Recent'} Biological Ledger
            </h3>
          </div>
          
          {/* Scrollable Ledger Wrapper */}
          <div className="max-h-[500px] overflow-y-auto pr-2 pb-4 space-y-3 scrollbar-thin scrollbar-thumb-border/50 scrollbar-track-transparent">
            <FloraLedger 
              records={floraRecords} 
              activeRecord={activeRecord} 
              onRecordSelect={setActiveRecord} 
              isFetching={isFetching} 
              lastElementRef={lastElementRef} 
              hasMore={hasMore} 
            />
          </div>
          
        </div>
      </div>

    </div>
  );
};