import { FloraRecord } from '../types/ecomap';

// 1. Define Strict Types for the iNaturalist API Response
interface INaturalistPhoto {
  url: string;
}

interface INaturalistTaxon {
  name?: string;
  preferred_common_name?: string;
  iconic_taxon_name?: string;
  threatened?: boolean;
  wikipedia_url?: string;
  default_photo?: {
    url: string;
    medium_url?: string;
  };
}

interface INaturalistObservation {
  id: number;
  observed_on?: string;
  taxon?: INaturalistTaxon;
  user?: {
    login?: string;
  };
  photos?: INaturalistPhoto[];
  geojson: {
    coordinates: [number, number]; // [longitude, latitude]
  };
}

export interface RegionalMetrics {
  total: number;
  threatened: number;
  recent: number;
}

export const fetchRegionalBiodiversity = async (
  lat: number, 
  lng: number, 
  page: number = 1, 
  limit: number = 20,
  filter: 'all' | 'threatened' | 'recent' = 'all',
): Promise<FloraRecord[]> => {
  try {
    // Calculate the date for the "recent" filter
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    const d1 = ninetyDaysAgo.toISOString().split('T')[0];

    // Inject the specific API flags based on the user's selected filter
    let filterParam = '';
    if (filter === 'threatened') filterParam = '&threatened=true';
    if (filter === 'recent') filterParam = `&d1=${d1}`;

    const response = await fetch(
      `https://api.inaturalist.org/v1/observations?lat=${lat}&lng=${lng}&radius=5&iconic_taxa=Plantae&quality_grade=research&per_page=${limit}&page=${page}&order_by=observed_on${filterParam}`
    );
    
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      return [];
    }

    return data.results.map((obs: INaturalistObservation): FloraRecord => {
      const taxon = obs.taxon || {};
      
      // Determine a realistic UI status based on the live data's temporal and conservation flags
      let status: FloraRecord['status'] = 'Abundant';
      if (taxon.threatened) {
        status = 'Vulnerable';
      } else {
        // If it was observed very recently, flag it as a new record
        const obsDate = new Date(obs.observed_on || Date.now());
        const isRecent = (Date.now() - obsDate.getTime()) < (90 * 24 * 60 * 60 * 1000); // 90 days
        if (isRecent) status = 'Newly Recorded';
      }

      // Fallback classification if iNat doesn't specify exact plant type
      const typeKey = taxon.iconic_taxon_name || 'default';
      const typeMap: Record<string, FloraRecord['type']> = {
        'Plantae': 'Herb',
        'Tracheophyta': 'Tree',
        'Polypodiopsida': 'Fern'
      };

      // 1. Better Photo Extraction: Grab the actual observation photo and upsize it from 'square' to 'medium'
      let bestPhoto: string | undefined = undefined;
      if (obs.photos && obs.photos.length > 0) {
        bestPhoto = obs.photos[0].url.replace('square', 'medium'); 
      } else if (taxon.default_photo) {
        bestPhoto = taxon.default_photo.medium_url || taxon.default_photo.url;
      }

      // 2. Safe Date Parsing
      const formattedDate = obs.observed_on 
        ? new Date(obs.observed_on).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        : 'Unknown Date';

      return {
        id: String(obs.id),
        scientificName: taxon.name || "Unknown Flora",
        commonName: taxon.preferred_common_name || taxon.name || "Unclassified Native Plant",
        type: typeMap[typeKey] || 'Shrub',
        status: status,
        verifiedSourceLineage: `iNaturalist Civic Ledger (User: ${obs.user?.login || 'Anon'})`,
        lat: obs.geojson.coordinates[1], // iNat returns GeoJSON [lng, lat]
        lng: obs.geojson.coordinates[0],
        
        // 3. The Missing Extended Details injected here
        imageUrl: bestPhoto,
        wikiUrl: taxon.wikipedia_url || undefined,
        observationDate: formattedDate,
        observerName: obs.user?.login || 'Anonymous Citizen'
      };
    });
  } catch (error) {
    console.error("Failed to fetch biodiversity data:", error);
    return [];
  }
};

export const fetchRegionalMetrics = async (lat: number, lng: number): Promise<RegionalMetrics> => {
  // Calculate exactly 90 days ago for our "Recent" metric
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  const d1 = ninetyDaysAgo.toISOString().split('T')[0];

  try {
    // We fire both requests simultaneously for maximum speed using Promise.all
    // Notice per_page=0: We don't want the heavy data, JUST the total_results metadata
    const [totalRes, threatenedRes, recentRes] = await Promise.all([
      fetch(`https://api.inaturalist.org/v1/observations?lat=${lat}&lng=${lng}&radius=15&iconic_taxa=Plantae&quality_grade=research&per_page=0`),
      fetch(`https://api.inaturalist.org/v1/observations?lat=${lat}&lng=${lng}&radius=15&iconic_taxa=Plantae&quality_grade=research&threatened=true&per_page=0`),
      fetch(`https://api.inaturalist.org/v1/observations?lat=${lat}&lng=${lng}&radius=15&iconic_taxa=Plantae&quality_grade=research&d1=${d1}&per_page=0`)
    ]);

    const totalData = await totalRes.json();
    const threatenedData = await threatenedRes.json();
    const recentData = await recentRes.json();

    return {
      total: totalData.total_results || 0,
      threatened: threatenedData.total_results || 0,
      recent: recentData.total_results || 0
    };
  } catch (error) {
    console.error("Failed to fetch absolute metrics:", error);
    return { total: 0, threatened: 0, recent: 0 };
  }
};