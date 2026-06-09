import { useState, useEffect } from 'react';

// 1. Add 'available' to the interface
export interface HistoryItem {
  id: string;
  term: string;
  available: boolean;
  timestamp: number;
}

export const useSearchHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('whois-history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  // 2. Update function signature to accept the availability status
  const addSearch = (term: string, available: boolean) => {
    setHistory(prev => {
      const filtered = prev.filter(item => item.term !== term);
      const newHistory = [
        { id: crypto.randomUUID(), term, available, timestamp: Date.now() }, 
        ...filtered
      ].slice(0, 30);
      
      localStorage.setItem('whois-history', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const removeSearch = (id: string) => {
    setHistory(prev => {
      const newHistory = prev.filter(item => item.id !== id);
      localStorage.setItem('whois-history', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('whois-history');
  };

  return { history, addSearch, removeSearch, clearHistory };
};