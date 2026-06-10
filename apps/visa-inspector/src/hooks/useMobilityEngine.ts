import { useState, useEffect, useMemo } from 'react';
import { visaRegistry, CountryManifest, VisaTrack } from '../data/visaRegistry';

export interface MobilityProfile {
  countryKey: string;
  offeredSalary: number;
  yearsExperience: number;
  hasDegree: boolean;
  isShortageProfession: boolean;
  lifestyleTier: 'frugal' | 'balanced' | 'premium';
  isDependentMoving: boolean;
}

export interface TrackEvaluation {
  trackName: string;
  isEligible: boolean;
  reason: string;
  processingTimeWeeks: number;
  thresholdGap: number;
}

export const useMobilityEngine = () => {
  const [profile, setProfile] = useState<MobilityProfile>({
    countryKey: 'united_kingdom',
    offeredSalary: 55000,
    yearsExperience: 6,
    hasDegree: true,
    isShortageProfession: true,
    lifestyleTier: 'balanced',
    isDependentMoving: false,
  });

  const [rates, setRates] = useState<Record<string, number>>({ GBP: 0.0093, EUR: 0.011, INR: 1 });
  const [loadingRates, setLoadingRates] = useState(true);

  // Fetch real-time fallback exchange rates client-side (Base INR comparison)
  useEffect(() => {
    fetch('https://api.frankfurter.app/latest?from=INR&to=GBP,EUR')
      .then(res => res.json())
      .then(data => {
        setRates({ ...data.rates, INR: 1 });
        setLoadingRates(false);
      })
      .catch(() => setLoadingRates(false)); // Graceful fallback to default state
  }, []);

  const evaluation = useMemo(() => {
    const config = visaRegistry[profile.countryKey];
    
    // 1. Parallel Visa Track Check
    const trackEvaluations: TrackEvaluation[] = config.tracks.map((track: VisaTrack) => {
      const requiredThreshold = profile.isShortageProfession ? track.shortageThreshold : track.baseThreshold;
      const salaryEligible = profile.offeredSalary >= requiredThreshold;
      const degreeEligible = !track.requiresDegree || profile.hasDegree;
      const expEligible = profile.yearsExperience >= track.yearsExpRequired;
      
      let reason = "All criteria satisfied.";
      if (!salaryEligible) reason = `Salary falls short of track minimum.`;
      else if (!degreeEligible) reason = `Requires a recognized university degree.`;
      else if (!expEligible) reason = `Requires minimum ${track.yearsExpRequired} years experience.`;

      return {
        trackName: track.name,
        isEligible: salaryEligible && degreeEligible && expEligible,
        reason,
        processingTimeWeeks: track.processingTimeWeeks,
        thresholdGap: requiredThreshold > profile.offeredSalary ? requiredThreshold - profile.offeredSalary : 0
      };
    });

    // 2. Progressive Tax Engine Calculation
    let remainingSalary = profile.offeredSalary;
    let totalTax = 0;
    let previousLimit = 0;

    for (const bracket of config.taxBrackets) {
      if (profile.offeredSalary > bracket.limit) {
        totalTax += (bracket.limit - previousLimit) * bracket.rate;
        previousLimit = bracket.limit;
      } else {
        totalTax += (remainingSalary - previousLimit) * bracket.rate;
        break;
      }
    }
    
    // Blended social security surcharge estimation (approx 10% for UK/DE health/pension ceilings)
    const socialSecuritySurcharge = profile.offeredSalary * 0.09;
    const monthlyNet = (profile.offeredSalary - totalTax - socialSecuritySurcharge) / 12;

    // 3. Dynamic Cost of Living & Runway Simulation
    const multiplier = profile.lifestyleTier === 'frugal' ? 0.8 : profile.lifestyleTier === 'premium' ? 1.6 : 1.2;
    const dependentWeight = profile.isDependentMoving ? 1.45 : 1.0;

    const monthlyRent = config.monthlyExpensesBase.rentStudio * (profile.isDependentMoving ? 1.35 : 1.0);
    const monthlyOperationalCosts = (config.monthlyExpensesBase.groceries + config.monthlyExpensesBase.utilities) * multiplier * dependentWeight;
    const totalMonthlyOutflow = monthlyRent + monthlyOperationalCosts;
    const monthlySavings = monthlyNet - totalMonthlyOutflow;

    // 4. Normalized Purchasing Power Parity (PPP) Calculation (Indexed to a baseline comparison asset)
    const rateToINR = rates[config.currency] ? 1 / rates[config.currency] : 100;
    const salaryInINR = profile.offeredSalary * rateToINR;
    const pppRealValueINR = salaryInINR * config.pppConversionFactor;

    return {
      config,
      tracks: trackEvaluations,
      isGloballyEligible: trackEvaluations.some(t => t.isEligible),
      monthlyGross: profile.offeredSalary / 12,
      monthlyNet,
      totalMonthlyOutflow,
      monthlySavings,
      pppRealValueINR,
      loadingRates
    };
  }, [profile, rates]);

  return { profile, setProfile, evaluation };
};