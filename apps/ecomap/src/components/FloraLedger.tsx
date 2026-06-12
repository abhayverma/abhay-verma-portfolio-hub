import React from 'react';
import { Badge } from "@portfolio/shared-ui";
import { ExternalLink, Calendar, User, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { FloraRecord } from '../types/ecomap';

interface FloraLedgerProps {
  records: FloraRecord[];
  activeRecord: string | null;
  onRecordSelect: (id: string) => void;
  isFetching: boolean;
  // New props for infinite scrolling
  lastElementRef?: (node: HTMLDivElement | null) => void;
  hasMore?: boolean;
}

export const FloraLedger: React.FC<FloraLedgerProps> = ({ 
  records, activeRecord, onRecordSelect, isFetching, lastElementRef, hasMore 
}) => {
  if (records.length === 0 && !isFetching) {
    return (
      <div className="p-8 text-center border border-dashed border-border rounded-xl text-muted-foreground text-sm">
        No research-grade plant data logged within 5km. Try searching an urban or forestry core.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {records.map((species, index) => {
        const isActive = activeRecord === species.id;
        // Identify the last element in the array
        const isLastElement = index === records.length - 1;

        return (
          <div 
            key={species.id} 
            ref={isLastElement ? lastElementRef : null} // Attach the observer to the final card
            className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden
              ${isActive ? 'ring-2 ring-portfolio-accent/50 bg-card shadow-md' : 'bg-card/60 hover:bg-card'}
              ${species.status === 'Vulnerable' ? 'border-amber-500/20 bg-amber-500/5' : 'border-border'}
            `}
            onClick={() => onRecordSelect(isActive ? '' : species.id)}
          >
            {/* Top Row: Core Info */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-grow">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-foreground font-serif italic">{species.scientificName}</h4>
                  <span className="text-xs text-muted-foreground">({species.commonName})</span>
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 border-none bg-muted text-muted-foreground hidden sm:inline-flex">{species.type}</Badge>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-[11px] text-muted-foreground mt-2 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-portfolio-accent/70"/>
                    {species.observationDate}
                  </span>
                  <span className="flex items-center gap-1.5 truncate max-w-[150px] sm:max-w-none">
                    <User size={13} className="text-portfolio-accent/70"/>
                    {species.observerName}
                  </span>
                </div>
              </div>
              
              <div className="shrink-0 flex items-center gap-3 md:mt-0 mt-1">
                <Badge 
                  className={`text-[10px] font-semibold border-none rounded-lg px-2.5 py-1 ${
                    species.status === 'Abundant' ? 'bg-blue-500/10 text-blue-500' :
                    species.status === 'Vulnerable' ? 'bg-amber-500/10 text-amber-500' :
                    'bg-green-500/10 text-green-500'
                  }`}
                >
                  {species.status}
                </Badge>
                {isActive ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
              </div>
            </div>

            {/* Expanded Details Area */}
            {isActive && (
              <div className="mt-4 pt-4 border-t border-border/50 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="sm:w-32 shrink-0">
                    {species.imageUrl ? (
                      <img src={species.imageUrl} alt={species.commonName} className="w-full h-24 object-cover rounded-lg border border-border/50 bg-neutral-800 shadow-sm" loading="lazy" />
                    ) : (
                      <div className="w-full h-24 rounded-lg border border-dashed border-border/50 bg-muted/30 flex items-center justify-center text-xs text-muted-foreground italic text-center p-2">
                        No photograph captured
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    {species.wikiUrl ? (
                      <a href={species.wikiUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-portfolio-accent hover:text-portfolio-accent/80 hover:underline w-fit transition-colors" onClick={(e) => e.stopPropagation()}>
                        <ExternalLink size={14} /> Read Wikipedia Taxonomy
                      </a>
                    ) : (
                      <span className="text-xs text-muted-foreground italic">No verified Wikipedia taxonomy linked.</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Infinite Scroll Loading Indicator */}
      {isFetching && records.length > 0 && (
        <div className="py-4 flex justify-center items-center text-muted-foreground">
          <Loader2 size={20} className="animate-spin text-portfolio-accent" />
        </div>
      )}
    </div>
  );
};