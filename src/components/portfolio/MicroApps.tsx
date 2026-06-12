import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Button } from "@portfolio/shared-ui";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Calculator, Globe, BookOpen, ExternalLink, Wrench, Sprout } from "lucide-react";

const PHASES = {
  COMPLETED: 'completed',
  CURRENT: 'current',
  PLANNED: 'planned',
} as const;

type AppPhase = typeof PHASES[keyof typeof PHASES];

const microAppsData = [
  {
    id: "finance",
    title: "Wealth & Tax Simulator",
    description: "Advanced financial projection engine calculating real-world inflation erosion and LTCG tax drag.",
    icon: <Calculator className="w-10 h-10 text-portfolio-accent" />,
    url: "https://finance.abhayverma.com",
    phase: PHASES.COMPLETED,
  },
  {
    id: "whois",
    title: "Global Domain Oracle",
    description: "WHOIS availability engine featuring AI-driven name suggestions, re-triggerable history cache, and granular delete controls.",
    icon: <Globe className="w-10 h-10 text-slate-400" />,
    url: "https://whois.abhayverma.com",
    phase: PHASES.COMPLETED,
  },
  {
    id: "visa",
    title: "Global Tech Visa Inspector",
    description: "Client-side threshold calculator mapping current immigration salary limits for major EU/UK tech hubs.",
    icon: <Globe className="w-10 h-10 text-slate-400" />,
    url: "https://visa.abhayverma.com",
    phase: PHASES.COMPLETED,
  },
  {
    id: "wisdom",
    title: "Semantic Wisdom Explorer",
    description: "NLP matrix matching engine cross-referencing modern dilemmas with classical philosophical texts.",
    icon: <BookOpen className="w-10 h-10 text-slate-400" />,
    url: "https://wisdom.abhayverma.com",
    phase: PHASES.COMPLETED,
  },
  {
    id: "eco-oracle",
    title: "EcoMap: Native Flora & Conservation Oracle",
    description: "Geospatial engine integrating OpenStreetMap and open biodiversity APIs to map native regional vegetation, tracking localized plant extinctions versus newly recorded species with verified public source lineages.",
    icon: <Sprout className="w-10 h-10 text-emerald-500" />,
    url: "https://ecomap.abhayverma.com",
    phase: PHASES.COMPLETED,
  },
];

const MicroApps = () => {
  return (
    <section id="microapps" className="py-24 relative border-t border-border bg-background transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-12 md:flex md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-portfolio-accent/10 text-portfolio-accent text-sm font-medium mb-4 border border-portfolio-accent/20">
              <Wrench size={16} /> Client-Side Engineering
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 transition-colors">
              Standalone Micro-Tools
            </h2>
            <p className="text-muted-foreground text-lg transition-colors">
              A collection of isolated, zero-latency utility applications running entirely in the browser. Built as an interconnected monorepo and deployed across subdomains.
            </p>
          </div>
        </div>

        <div className="relative px-12">
          <Carousel opts={{ align: "start", loop: false }} className="w-full">
            <CarouselContent className="-ml-4">
              {microAppsData.map((app) => {
                // Derive semantic booleans for straightforward UI styling
                const isCompleted = app.phase === PHASES.COMPLETED;
                const isCurrent = app.phase === PHASES.CURRENT;
                const isPlanned = app.phase === PHASES.PLANNED;

                return (
                  <CarouselItem key={app.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <Card 
                        className={`h-full bg-card transition-all duration-300 flex flex-col relative overflow-hidden group border-border
                          ${isCurrent ? 'border-portfolio-accent/60 shadow-lg shadow-portfolio-accent/5 ring-1 ring-portfolio-accent/20' : 'hover:border-portfolio-accent/50'}`}
                      >
                        {/* Dynamic Badge Rendering */}
                        <div className="absolute top-4 right-4 z-10">
                          <Badge 
                            variant={isCurrent ? "default" : "secondary"} 
                            className={`font-medium tracking-wide
                              ${isCurrent ? "bg-portfolio-accent text-white hover:bg-portfolio-accent/90 animate-pulse" : "bg-secondary text-secondary-foreground border-transparent"}
                              ${isPlanned ? "opacity-60" : ""}`}
                          >
                            {isCompleted && "Completed"}
                            {isCurrent && "Building Now"}
                            {isPlanned && "Planned"}
                          </Badge>
                        </div>

                        <CardHeader>
                          <div className={`mb-4 p-3 rounded-xl inline-block w-fit border transition-transform duration-300 group-hover:scale-105
                            ${isCurrent ? "bg-portfolio-accent/10 border-portfolio-accent/20" : "bg-muted border-border"}`}
                          >
                            {/* Dynamically tint icon if current app */}
                            {React.cloneElement(app.icon as React.ReactElement, {
                              className: `w-10 h-10 ${isCurrent ? "text-portfolio-accent" : "text-slate-400"}`
                            })}
                          </div>
                          <CardTitle className="text-xl text-foreground">{app.title}</CardTitle>
                        </CardHeader>
                        
                        <CardContent className="flex-grow flex flex-col justify-between">
                          <CardDescription className="text-muted-foreground text-sm mb-6 leading-relaxed">
                            {app.description}
                          </CardDescription>
                          
                          {/* Intelligently swap Button properties based on project timeline status */}
                          <Button 
                            asChild={!isPlanned} 
                            variant="outline" 
                            className="w-full transition-all border-border text-foreground hover:bg-portfolio-accent hover:text-white hover:border-portfolio-accent"
                            disabled={isPlanned}
                          >
                            {isPlanned ? (
                              <span className="opacity-50">Coming Soon</span>
                            ) : (
                              <a href={app.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                Launch App <ExternalLink size={16} />
                              </a>
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 bg-background border-border text-muted-foreground hover:text-white hover:bg-portfolio-accent transition-colors" />
            <CarouselNext className="hidden md:flex -right-12 bg-background border-border text-muted-foreground hover:text-white hover:bg-portfolio-accent transition-colors" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default MicroApps;