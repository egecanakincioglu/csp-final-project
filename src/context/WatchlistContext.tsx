import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface WatchlistContextType {
  watchlist: string[];
  addToWatchlist: (id: string) => void;
  removeFromWatchlist: (id: string) => void;
  isInWatchlist: (id: string) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('crypto_watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('crypto_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (id: string) => {
    if (!watchlist.includes(id)) {
      setWatchlist([...watchlist, id]);
    }
  };

  const removeFromWatchlist = (id: string) => {
    setWatchlist(watchlist.filter((coinId) => coinId !== id));
  };

  const isInWatchlist = (id: string) => watchlist.includes(id);

  return (
    <WatchlistContext value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};