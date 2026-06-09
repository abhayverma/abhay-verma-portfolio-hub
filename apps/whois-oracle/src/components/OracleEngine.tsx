import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from "@portfolio/shared-ui";
import { Search, History, Sparkles, Loader2, Trash2 } from "lucide-react";
import { checkDomainAvailability, generateSuggestions, DomainResult } from '../lib/domainLogic';
import { useSearchHistory } from '../hooks/useSearchHistory';
import { ResultCard } from './ResultCard'; // Import the newly extracted component

export const OracleEngine = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [primaryResult, setPrimaryResult] = useState<DomainResult | null>(null);
  const [suggestions, setSuggestions] = useState<DomainResult[]>([]);
  const { history, addSearch, removeSearch, clearHistory } = useSearchHistory();

  const handleSearch = async (termToSearch: string) => {
    if (!termToSearch.trim()) return;
    
    const term = termToSearch.trim().toLowerCase();
    setSearchTerm(term);
    setIsSearching(true);
    
    const searchDomain = term.includes('.') ? term : `${term}.com`;

    try {
      const isAvail = await checkDomainAvailability(searchDomain);
      setPrimaryResult({ domain: searchDomain, available: isAvail });      
      addSearch(searchDomain, isAvail);

      const aiSuggestions = await generateSuggestions(searchDomain);
      setSuggestions(aiSuggestions);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
      {/* Left Column: Search & Results */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="border-border bg-card shadow-sm">
          <CardContent className="pt-6">
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
                  placeholder="Enter keyword or domain (e.g., techhub.com)"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-portfolio-accent/50 transition-all font-mono"
                />
              </div>
              <Button onClick={() => handleSearch(searchTerm)} disabled={isSearching} className="py-3 px-6 h-auto bg-portfolio-accent hover:bg-portfolio-accent/90 text-white">
                {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : "Lookup"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {primaryResult && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-lg font-medium text-foreground flex items-center justify-between">
              Target Domain
              {!primaryResult.available && <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-1 rounded-md border border-border">Click card for intel</span>}
            </h3>
            {/* Using the new component */}
            <ResultCard result={primaryResult} highlight />
          </div>
        )}

        {suggestions.length > 0 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-portfolio-accent" /> Semantic Suggestions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
               {/* Using the new component */}
              {suggestions.map((sug) => (
                <ResultCard key={sug.domain} result={sug} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column: History Cache */}
      <div className="lg:col-span-2">
        <Card className="border-border bg-card h-full shadow-sm flex flex-col max-h-[600px]">
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border/50">
            <CardTitle className="text-lg flex items-center gap-2">
              <History className="w-5 h-5 text-muted-foreground" /> 
              Search Cache
              {/* Added the total count badge here */}
              {history.length > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs px-1.5 py-0 bg-muted text-muted-foreground border-border/50">
                  {history.length}
                </Badge>
              )}
            </CardTitle>
            {history.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearHistory} className="text-xs text-muted-foreground hover:text-red-500 h-8 px-2">
                Clear
              </Button>
            )}
          </CardHeader>
          
          {/* Added overflow-y-auto and custom scrollbar styling classes */}
          <CardContent className="flex-grow overflow-y-auto pt-4 pb-2 pr-4 custom-scrollbar">
            {history.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No search history yet.</p>
            ) : (
              <ul className="space-y-2">
                {history.map((item) => (
                  <li key={item.id} className="group flex items-center justify-between p-3 rounded-md hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
                    <button 
                      onClick={() => handleSearch(item.term)}
                      className="flex-grow flex items-center gap-3 text-left transition-colors truncate pr-4"
                    >
                      <span className="font-mono text-sm text-foreground group-hover:text-portfolio-accent">
                        {item.term}
                      </span>
                      
                      {/* Availability Badge */}
                      <Badge 
                        variant={item.available ? "default" : "secondary"} 
                        className={`text-[10px] px-1.5 py-0 h-4 ${item.available ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" : ""}`}
                      >
                        {item.available ? 'Available' : 'Taken'}
                      </Badge>
                      
                      {/* Timestamp Tag */}
                      <span className="text-[10px] text-muted-foreground hidden sm:inline-block border border-border/50 px-1.5 py-0.5 rounded-sm bg-background">
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </button>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeSearch(item.id)} 
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/10 hover:text-red-500 shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};