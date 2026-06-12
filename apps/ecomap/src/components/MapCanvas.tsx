import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { Badge } from "@portfolio/shared-ui";
import L from 'leaflet';
import { FloraRecord } from '../types/ecomap';

interface MapOptions {
  center: [number, number];
  zoom: number;
  scrollWheelZoom: boolean;
  zoomControl: boolean;
}

interface TileOptions {
  attribution: string;
  url: string;
}

interface MarkerOptions {
  position: [number, number];
  icon: L.Icon;
  zIndexOffset: number;
}

// 1. Custom HTML Marker Generator
const getCustomIcon = (isActive: boolean, status: string) => {
  let bgColor = 'bg-blue-500';
  if (status === 'Locally Extinct') bgColor = 'bg-red-500';
  else if (status === 'Newly Recorded') bgColor = 'bg-green-500';
  else if (status === 'Vulnerable') bgColor = 'bg-amber-500';

  const activeStyles = isActive 
    ? 'bg-red-600 ring-4 ring-red-500/50 scale-150 z-[1000] shadow-xl' 
    : `${bgColor} ring-2 ring-white shadow-md hover:scale-110 opacity-90`;

  return L.divIcon({
    className: 'bg-transparent border-none',
    html: `<div class="w-4 h-4 rounded-full transition-all duration-500 ${activeStyles}"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -12]
  });
};

// 2. Drag & Drop Listener
const MapEventListener = ({ onMapMoveEnd }: { onMapMoveEnd: (lat: number, lng: number) => void }) => {
  useMapEvents({
    dragend: (e) => {
      const newCenter = e.target.getCenter();
      onMapMoveEnd(newCenter.lat, newCenter.lng);
    }
  });
  return null;
};

// 3. Cinematic Flight Controller
const MapController = ({ center, activeRecord, records }: { center: [number, number], activeRecord: string | null, records: FloraRecord[] }) => {
  const map = useMap();

  useEffect(() => {
    if (!activeRecord) {
      map.flyTo(center, 13, { animate: true, duration: 1.5 });
    }
  }, [center, map, activeRecord]);

  useEffect(() => {
    if (activeRecord) {
      const record = records.find(r => r.id === activeRecord);
      if (record) {
        map.flyTo([record.lat, record.lng], 16, { animate: true, duration: 1.2 });
      }
    }
  }, [activeRecord, records, map]);

  return null;
};

interface MapCanvasProps {
  center: [number, number];
  records: FloraRecord[];
  isFetching: boolean;
  activeRecord: string | null;
  onRecordSelect: (id: string) => void;
  onCenterUpdate: (lat: number, lng: number) => void;
}

export const MapCanvas: React.FC<MapCanvasProps> = ({ 
  center, records, isFetching, activeRecord, onRecordSelect, onCenterUpdate 
}) => {

  // 👇 TYPE BYPASSES: Safely packaging the broken inherited Leaflet props
  const mapOptions: MapOptions = { center, zoom: 13, scrollWheelZoom: false, zoomControl: false };
  const tileOptions: TileOptions = { 
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  };

  return (
    <div className="w-full aspect-square rounded-xl border border-border/80 overflow-hidden shadow-sm relative z-10 bg-neutral-900">
      
      {/* Spreading mapOptions bypasses the TS error while preserving functionality */}
      <MapContainer {...mapOptions} className="w-full h-full z-0">
        <TileLayer {...tileOptions} />
        
        <MapEventListener onMapMoveEnd={onCenterUpdate} />
        <MapController center={center} activeRecord={activeRecord} records={records} />
        
        {records.map((record) => {
          const isActive = record.id === activeRecord;
          
          // 👇 TYPE BYPASS for Marker Options
          const markerOptions: MarkerOptions = {
            position: [record.lat, record.lng],
            icon: getCustomIcon(isActive, record.status),
            zIndexOffset: isActive ? 1000 : 0
          };

          return (
            <Marker 
              key={record.id} 
              {...markerOptions}
              eventHandlers={{ click: () => onRecordSelect(record.id) }}
            >
              <Popup>
                <div className="text-neutral-900 font-sans p-1">
                  <h5 className="font-bold m-0 text-xs">{record.commonName}</h5>
                  <p className="italic text-[10px] m-0 text-neutral-500">{record.scientificName}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      
      {isFetching && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-[400]">
          <Badge variant="outline" className="bg-background text-foreground animate-pulse px-3 py-1.5 shadow-lg">
            Syncing live iNaturalist data...
          </Badge>
        </div>
      )}
    </div>
  );
};