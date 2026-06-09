export interface DomainResult {
  domain: string;
  available: boolean;
  isSuggestion?: boolean;
}

export interface WhoIsIntel {
  expirationDate?: string;
  registrationDate?: string;
  registrarName?: string;
  statuses?: string[];
}

// 1. Define strict types for the RDAP JSON response
interface RdapEvent {
  eventAction: string;
  eventDate: string;
}

// vCard arrays are complex nested tuples in the RDAP spec
interface RdapVCardProperty {
  [index: number]: unknown;
}

interface RdapEntity {
  roles?: string[];
  vcardArray?: [string, RdapVCardProperty[]];
}

interface RdapResponse {
  events?: RdapEvent[];
  status?: string[];
  entities?: RdapEntity[];
}

// 1. Check if domain exists via Google DNS (Status 3 = NXDOMAIN / Likely Available)
export const checkDomainAvailability = async (domain: string): Promise<boolean> => {
  try {
    const response = await fetch(`https://dns.google/resolve?name=${domain}&type=A`);
    const data = await response.json();
    return data.Status === 3; 
  } catch (error) {
    console.error("DNS Check failed", error);
    return false;
  }
};

// 2. "AI" Engine: Semantic word generation using Datamuse
export const generateSuggestions = async (baseWord: string): Promise<DomainResult[]> => {
  const cleanWord = baseWord.split('.')[0].replace(/[^a-zA-Z0-9]/g, '');
  
  try {
    const response = await fetch(`https://api.datamuse.com/words?ml=${cleanWord}&max=5`);
    const words = await response.json();
    
    const semanticWords = words.map((w: { word: string }) => w.word.replace(/[^a-zA-Z0-9]/g, ''));
    
    const tlds = ['.io', '.dev', '.co', '.app'];
    const prefixes = ['get', 'my', 'try'];
    
    // Generate an array of potential domains
    const candidates: string[] = [];
    
    // Exact word with cool TLDs
    tlds.forEach(tld => candidates.push(`${cleanWord}${tld}`));
    // Prefixes
    prefixes.forEach(p => candidates.push(`${p}${cleanWord}.com`));
    // Semantic variations
    semanticWords.slice(0, 3).forEach(w => candidates.push(`${w}.com`));

    // Dedup and slice top 6
    const uniqueCandidates = Array.from(new Set(candidates)).slice(0, 6);

    // Resolve availability in parallel
    const results = await Promise.all(
      uniqueCandidates.map(async (domain) => ({
        domain,
        available: await checkDomainAvailability(domain),
        isSuggestion: true
      }))
    );

    return results;
  } catch (error) {
    console.error("Suggestion generation failed", error);
    return [];
  }
};

// New RDAP Fetcher function
export const fetchDomainIntel = async (domain: string): Promise<WhoIsIntel | null> => {
  try {
    const response = await fetch(`https://rdap.org/domain/${domain}`);
    if (!response.ok) return null;
    
    // Cast the JSON response to our strict interface
    const data = (await response.json()) as RdapResponse;
    
    const expirationDate = data.events?.find((e: RdapEvent) => e.eventAction === 'expiration')?.eventDate;
    const registrationDate = data.events?.find((e: RdapEvent) => e.eventAction === 'registration')?.eventDate;
    const statuses = data.status || [];
    
    let registrarName = "Unknown";
    const registrarEntity = data.entities?.find((e: RdapEntity) => e.roles?.includes('registrar'));
    
    if (registrarEntity?.vcardArray?.[1]) {
      const properties = registrarEntity.vcardArray[1];
      // Find the "fn" (Formatted Name) array node
      const fnNode = properties.find((v: RdapVCardProperty) => v[0] === 'fn');
      // The 4th item (index 3) is the actual string value
      if (fnNode && typeof fnNode[3] === 'string') {
        registrarName = fnNode[3];
      }
    }

    return {
      expirationDate: expirationDate ? new Date(expirationDate).toLocaleDateString() : undefined,
      registrationDate: registrationDate ? new Date(registrationDate).toLocaleDateString() : undefined,
      registrarName,
      statuses: statuses.map((s: string) => s.replace(/([A-Z])/g, ' $1').trim())
    };
  } catch (error) {
    console.error("Failed to fetch domain intel", error);
    return null;
  }
};