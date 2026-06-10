import { useState, useMemo } from 'react';
import { visaRegistry, CountryRule } from '../data/visaRegistry';

export interface UserProfile {
  countryKey: string;
  offeredSalary: number;
  isShortageProfession: boolean;
  isYoungProfessional: boolean;
  hasNoDegree: boolean;
}

export interface CalculationResult {
  selectedCountry: CountryRule;
  targetThreshold: number;
  isEligible: boolean;
  salaryGap: number;
  monthlyGross: number;
  monthlyNet: number;
  rentCost: number;
  disposableIncome: number;
  hasFastTrackViolation: boolean;
}

export const useVisaCalculator = () => {
  const [profile, setProfile] = useState<UserProfile>({
    countryKey: 'united_kingdom',
    offeredSalary: 45000,
    isShortageProfession: true,
    isYoungProfessional: false,
    hasNoDegree: false,
  });

  const result = useMemo((): CalculationResult => {
    const country = visaRegistry[profile.countryKey];
    
    // 1. Determine target salary threshold dynamically based on profile modifiers
    let targetThreshold = country.standardThreshold;
    
    if (profile.isYoungProfessional && country.youngProfessionalThreshold) {
      targetThreshold = country.youngProfessionalThreshold;
    } else if (profile.isShortageProfession) {
      targetThreshold = country.shortageThreshold;
    }

    // 2. Evaluate fast-track legal guardrails (e.g., Germany degree bypass)
    let hasFastTrackViolation = false;
    if (profile.hasNoDegree && !country.noDegreeFastTrack) {
      hasFastTrackViolation = true;
    }

    // 3. Compute structural eligibility
    const salaryGap = targetThreshold - profile.offeredSalary;
    const isEligible = salaryGap <= 0 && !hasFastTrackViolation;

    // 4. Financial projections
    const monthlyGross = profile.offeredSalary / 12;
    const monthlyNet = monthlyGross * (1 - country.estimatedTaxRate);
    const rentCost = country.avgMonthlyRentStudio;
    const disposableIncome = monthlyNet - rentCost;

    return {
      selectedCountry: country,
      targetThreshold,
      isEligible,
      salaryGap: salaryGap > 0 ? salaryGap : 0,
      monthlyGross,
      monthlyNet,
      rentCost,
      disposableIncome,
      hasFastTrackViolation
    };
  }, [profile]);

  return { profile, setProfile, result };
};