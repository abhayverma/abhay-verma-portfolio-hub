import React, { useState } from 'react';
import { Globe, CheckCircle2, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@portfolio/shared-ui";
import { DomainResult } from '../lib/domainLogic';
import { WhoIsDetails } from './WhoIsDetails';

interface ResultCardProps {
  result: DomainResult;
  highlight?: boolean;
}

export const ResultCard = ({ result, highlight = false }: ResultCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isTaken = !result.available;

  const handleToggle = () => {
    // Only allow expansion if the domain is taken
    if (isTaken) setIsExpanded(!isExpanded);
  };

  return (
    <div className={`rounded-xl border overflow-hidden transition-all duration-300 ${highlight ? 'shadow-sm border-portfolio-accent/30' : 'border-border hover:border-portfolio-accent/40'} ${isExpanded ? 'ring-1 ring-portfolio-accent/20' : ''}`}>
      
      {/* Clickable Header */}
      <button 
        onClick={handleToggle}
        disabled={!isTaken}
        className={`w-full p-4 flex items-center justify-between text-left transition-colors ${highlight ? 'bg-card' : 'bg-muted/40 hover:bg-muted/60'} ${isTaken ? 'cursor-pointer' : 'cursor-default'}`}
      >
        <div className="flex items-center gap-3">
          <Globe className={`w-5 h-5 ${result.available ? 'text-green-500' : 'text-slate-400'}`} />
          <span className={`font-mono font-medium ${highlight ? 'text-lg' : 'text-md'} text-foreground`}>
            {result.domain}
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant={result.available ? "default" : "secondary"} className={result.available ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" : ""}>
            {result.available ? (
              <span className="flex items-center gap-1"><CheckCircle2 size={14}/> Available</span>
            ) : (
              <span className="flex items-center gap-1"><XCircle size={14}/> Taken</span>
            )}
          </Badge>
          
          {/* Chevron indicator for taken domains */}
          {isTaken && (
            <div className="text-muted-foreground bg-background rounded-full p-1 border border-border">
              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </div>
          )}
        </div>
      </button>

      {/* Expandable WHOIS Intel Drawer */}
      {isExpanded && isTaken && (
        <WhoIsDetails domain={result.domain} />
      )}
    </div>
  );
};