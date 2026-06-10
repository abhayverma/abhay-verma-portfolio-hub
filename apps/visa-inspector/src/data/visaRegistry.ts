export interface VisaTrack {
  id: string;
  name: string;
  baseThreshold: number;
  shortageThreshold: number;
  requiresDegree: boolean;
  yearsExpRequired: number;
  processingTimeWeeks: number;
}

export interface CountryManifest {
  name: string;
  currency: string;
  currencySymbol: string;
  pppConversionFactor: number; // Comparative cost index vs. India baseline
  tracks: VisaTrack[];
  taxBrackets: { limit: number; rate: number }[];
  monthlyExpensesBase: {
    rentStudio: number;
    utilities: number;
    groceries: number;
  };
}

export const visaRegistry: Record<string, CountryManifest> = {
  united_kingdom: {
    name: "United Kingdom",
    currency: "GBP",
    currencySymbol: "£",
    pppConversionFactor: 0.38, 
    tracks: [
      { id: "skilled_worker", name: "Skilled Worker Visa", baseThreshold: 41700, shortageThreshold: 33400, requiresDegree: false, yearsExpRequired: 0, processingTimeWeeks: 3 },
      { id: "global_talent", name: "Global Talent (Tech Nation)", baseThreshold: 0, shortageThreshold: 0, requiresDegree: false, yearsExpRequired: 5, processingTimeWeeks: 8 }
    ],
    taxBrackets: [
      { limit: 12570, rate: 0.0 },
      { limit: 50270, rate: 0.20 },
      { limit: 125140, rate: 0.40 },
      { limit: Infinity, rate: 0.45 }
    ],
    monthlyExpensesBase: { rentStudio: 1500, utilities: 250, groceries: 300 }
  },
  germany: {
    name: "Germany",
    currency: "EUR",
    currencySymbol: "€",
    pppConversionFactor: 0.42,
    tracks: [
      { id: "blue_card", name: "EU Blue Card (Standard)", baseThreshold: 50700, shortageThreshold: 41000, requiresDegree: true, yearsExpRequired: 0, processingTimeWeeks: 4 },
      { id: "it_specialist", name: "IT Specialist Route", baseThreshold: 41000, shortageThreshold: 41000, requiresDegree: false, yearsExpRequired: 3, processingTimeWeeks: 6 }
    ],
    taxBrackets: [
      { limit: 11784, rate: 0.0 },
      { limit: 66760, rate: 0.14 },
      { limit: 277825, rate: 0.42 },
      { limit: Infinity, rate: 0.45 }
    ],
    monthlyExpensesBase: { rentStudio: 1050, utilities: 200, groceries: 280 }
  }
};