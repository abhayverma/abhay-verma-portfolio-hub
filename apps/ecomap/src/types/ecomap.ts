export interface FloraRecord {
  id: string;
  scientificName: string;
  commonName: string;
  type: 'Tree' | 'Shrub' | 'Herb' | 'Fern';
  status: 'Abundant' | 'Vulnerable' | 'Locally Extinct' | 'Newly Recorded';
  verifiedSourceLineage: string;
  lat: number; 
  lng: number;
  
  // New Extended Details
  imageUrl?: string;
  wikiUrl?: string;
  observationDate?: string;
  observerName?: string;
}