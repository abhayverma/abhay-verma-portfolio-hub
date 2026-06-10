import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from "@portfolio/shared-ui";
import { CheckCircle, XCircle, Wallet, Scale, LineChart, Layers, Users, ShieldAlert } from 'lucide-react';
import { useMobilityEngine } from '../hooks/useMobilityEngine';
import { visaRegistry } from '../data/visaRegistry';

export const InspectorDashboard = () => {
  const { profile, setProfile, evaluation } = useMobilityEngine();
  const sym = evaluation.config.currencySymbol;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 items-start">
      {/* Configuration Control Panel */}
      <div className="xl:col-span-1 space-y-5">
        <Card className="border-border bg-card shadow-sm">
          <CardHeader><CardTitle className="text-md font-bold">Candidate Profile</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Destination</label>
              <select 
                value={profile.countryKey} 
                onChange={(e) => setProfile(p => ({ ...p, countryKey: e.target.value }))}
                className="w-full p-2 rounded-md border border-border bg-background text-sm"
              >
                {Object.keys(visaRegistry).map(k => <option key={k} value={k}>{visaRegistry[k].name}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Annual Base Salary Offer</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-sm">{sym}</span>
                <input 
                  type="number" 
                  value={profile.offeredSalary} 
                  onChange={(e) => setProfile(p => ({ ...p, offeredSalary: Number(e.target.value) }))}
                  className="w-full pl-8 pr-3 py-1.5 rounded-md border border-border bg-background text-sm font-mono font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Experience (Yrs)</label>
                <input 
                  type="number" 
                  value={profile.yearsExperience} 
                  onChange={(e) => setProfile(p => ({ ...p, yearsExperience: Number(e.target.value) }))}
                  className="w-full p-1.5 rounded-md border border-border bg-background text-sm font-mono"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Lifestyle Profile</label>
                <select 
                  value={profile.lifestyleTier} 
                  onChange={(e) => setProfile(p => ({ ...p, lifestyleTier: e.target.value as any }))}
                  className="w-full p-1.5 rounded-md border border-border bg-background text-sm"
                >
                  <option value="frugal">Frugal</option>
                  <option value="balanced">Balanced</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
            </div>

            <hr className="border-border/50" />

            <div className="space-y-3 pt-1">
              <label className="flex items-center justify-between text-sm cursor-pointer">
                <span className="text-muted-foreground">Holds Tech Degree</span>
                <input type="checkbox" checked={profile.hasDegree} onChange={(e) => setProfile(p => ({ ...p, hasDegree: e.target.checked }))} className="rounded border-border text-portfolio-accent w-4 h-4" />
              </label>
              <label className="flex items-center justify-between text-sm cursor-pointer">
                <span className="text-muted-foreground">Shortage Occupation Role</span>
                <input type="checkbox" checked={profile.isShortageProfession} onChange={(e) => setProfile(p => ({ ...p, isShortageProfession: e.target.checked }))} className="rounded border-border text-portfolio-accent w-4 h-4" />
              </label>
              <label className="flex items-center justify-between text-sm cursor-pointer">
                <span className="text-muted-foreground">Relocating with Dependents</span>
                <input type="checkbox" checked={profile.isDependentMoving} onChange={(e) => setProfile(p => ({ ...p, isDependentMoving: e.target.checked }))} className="rounded border-border text-portfolio-accent w-4 h-4" />
              </label>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analysis Engine Visuals */}
      <div className="xl:col-span-3 space-y-6">
        {/* Visa Tracks Multi-Matrix */}
        <div className="space-y-3">
          <h3 className="text-md font-bold text-foreground flex items-center gap-2"><Layers size={18} className="text-portfolio-accent"/> Structural Path Eligibility Matrix</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {evaluation.tracks.map((track, i) => (
              <div key={i} className={`p-4 rounded-xl border flex flex-col justify-between bg-card/60 transition-all ${track.isEligible ? 'border-green-500/20 shadow-sm' : 'border-border'}`}>
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{track.trackName}</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-normal">{track.reason}</p>
                  </div>
                  <Badge variant={track.isEligible ? "default" : "secondary"} className={track.isEligible ? "bg-green-500/10 text-green-500 border-none" : "bg-muted text-muted-foreground"}>
                    {track.isEligible ? <span className="flex items-center gap-1"><CheckCircle size={12}/> Cleared</span> : <span className="flex items-center gap-1"><XCircle size={12}/> Blocked</span>}
                  </Badge>
                </div>

                <div className="flex justify-between items-center pt-4 mt-3 border-t border-border/40 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">⏱️ Processing: <strong>{track.processingTimeWeeks}w</strong></span>
                  {!track.isEligible && track.thresholdGap > 0 && (
                    <span className="text-red-400 font-mono font-medium">Gap: +{sym}{track.thresholdGap.toLocaleString()}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Metrics Split */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-border bg-card">
            <CardContent className="pt-5 flex items-start gap-3">
              <div className="p-2 rounded-md bg-portfolio-accent/10 text-portfolio-accent"><Wallet size={16}/></div>
              <div>
                <p className="text-xs text-muted-foreground font-semibold">Net Take-Home Pay</p>
                <p className="text-xl font-bold font-mono text-foreground mt-1">{sym}{Math.round(evaluation.monthlyNet).toLocaleString()}<span className="text-xs font-normal text-muted-foreground">/mo</span></p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Progressive tax + health surcharges</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="pt-5 flex items-start gap-3">
              <div className="p-2 rounded-md bg-red-500/10 text-red-400"><Users size={16}/></div>
              <div>
                <p className="text-xs text-muted-foreground font-semibold">Estimated Living Cost</p>
                <p className="text-xl font-bold font-mono text-foreground mt-1">{sym}{Math.round(evaluation.totalMonthlyOutflow).toLocaleString()}<span className="text-xs font-normal text-muted-foreground">/mo</span></p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Rent index + lifestyle profile metrics</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="pt-5 flex items-start gap-3">
              <div className="p-2 rounded-md bg-green-500/10 text-green-500"><LineChart size={16}/></div>
              <div>
                <p className="text-xs text-muted-foreground font-semibold">Net Liquid Savings</p>
                <p className={`text-xl font-bold font-mono mt-1 ${evaluation.monthlySavings > 0 ? 'text-green-500' : 'text-red-400'}`}>
                  {evaluation.monthlySavings < 0 ? '-' : ''}{sym}{Math.round(Math.abs(evaluation.monthlySavings)).toLocaleString()}<span className="text-xs font-normal text-muted-foreground">/mo</span>
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Liquid runway projection layer</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Real-Feel Purchasing Power Conversion */}
        <Card className="border-portfolio-accent/20 bg-gradient-to-br from-background via-card to-portfolio-accent/5 overflow-hidden">
          <CardContent className="pt-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex gap-3 items-start">
              <div className="p-3 rounded-xl bg-portfolio-accent/10 text-portfolio-accent mt-0.5"><Scale size={22}/></div>
              <div>
                <h4 className="text-base font-bold text-foreground">Real-Feel Purchasing Power Index</h4>
                <p className="text-xs text-muted-foreground mt-1 max-w-xl leading-normal">
                  Due to localized economic density, structural flat tax differentials, and local service markets, an annual salary of <strong>{sym}{profile.offeredSalary.toLocaleString()}</strong> in {evaluation.config.name} commands an approximate operational domestic lifestyle value of:
                </p>
              </div>
            </div>
            <div className="text-right bg-background/80 border border-border/80 px-5 py-3 rounded-xl shadow-inner w-full md:w-auto shrink-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-portfolio-accent">Normalized Value (INR)</p>
              <p className="text-2xl font-mono font-black text-foreground mt-0.5">₹{Math.round(evaluation.pppRealValueINR).toLocaleString()}</p>
              <p className="text-[9px] text-muted-foreground mt-1 font-medium">{evaluation.loadingRates ? "Using basic fallbacks..." : "⚡️ Live currency rates integrated"}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};