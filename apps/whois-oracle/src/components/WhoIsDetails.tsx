import React, { useEffect, useState } from 'react';
import { Loader2, Calendar, Shield, Building2 } from 'lucide-react';
import { fetchDomainIntel, WhoIsIntel } from '../lib/domainLogic';
import { Badge } from "@portfolio/shared-ui";

export const WhoIsDetails = ({ domain }: { domain: string }) => {
  const [intel, setIntel] = useState<WhoIsIntel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    
    fetchDomainIntel(domain).then(data => {
      if (isMounted) {
        setIntel(data);
        setLoading(false);
      }
    });

    return () => { isMounted = false; };
  }, [domain]);

  if (loading) {
    return (
      <div className="p-6 bg-muted/30 border-t border-border flex items-center justify-center text-muted-foreground animate-pulse">
        <Loader2 className="w-5 h-5 animate-spin mr-2" /> Pulling registry data...
      </div>
    );
  }

  if (!intel) {
    return (
      <div className="p-4 bg-muted/30 border-t border-border text-sm text-muted-foreground text-center">
        Extended registry data is blocked or unavailable for this TLD.
      </div>
    );
  }

  return (
    <div className="p-5 bg-muted/20 border-t border-border space-y-4 text-sm animate-in slide-in-from-top-2 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Dates */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-foreground">
            <Building2 className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium text-muted-foreground">Registrar:</span> {intel.registrarName}
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium text-muted-foreground">Registered:</span> {intel.registrationDate || 'Redacted'}
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium text-muted-foreground">Expires:</span> {intel.expirationDate || 'Redacted'}
          </div>
        </div>

        {/* Lock Statuses */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium text-muted-foreground">Domain Status:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {intel.statuses && intel.statuses.length > 0 ? (
              intel.statuses.map((status, idx) => {
                const isLocked = status.toLowerCase().includes('prohibited');
                return (
                  <Badge key={idx} variant="secondary" className={`text-xs ${isLocked ? 'border-amber-500/30 text-amber-500 bg-amber-500/10' : ''}`}>
                    {status}
                  </Badge>
                );
              })
            ) : (
              <span className="text-muted-foreground italic">No status flags published.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};