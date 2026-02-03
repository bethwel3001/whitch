'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
} from 'react';
import { type Movie } from '@/lib/placeholder-data';
import { getRecommendationsForMood } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

interface RecommendationsContextType {
  recommendations: Movie[];
  filteredServices: string[];
  isLoading: boolean;
  selectedMood: string | null;
  error: string | null;
  resultsRef: React.RefObject<HTMLDivElement>;
  handleMoodSelect: (mood: string) => Promise<void>;
  handleFilterChange: (service: string, checked: boolean) => void;
}

const RecommendationsContext = createContext<
  RecommendationsContextType | undefined
>(undefined);

export function RecommendationsProvider({ children }: { children: ReactNode }) {
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [filteredServices, setFilteredServices] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleMoodSelect = async (mood: string) => {
    setIsLoading(true);
    setSelectedMood(mood);
    setRecommendations([]);
    setError(null);

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);

    const viewingHistory =
      'Loves science fiction movies with complex plots, quirky comedies, and enjoys strong visual styles. Not a fan of horror or romantic comedies.';
    const result = await getRecommendationsForMood(mood, viewingHistory);

    if (result.success && result.movies) {
      setRecommendations(result.movies);
    } else {
      const errorMessage =
        result.error || 'Could not get recommendations. Please try again later.';
      setError(errorMessage);
      toast({
        variant: 'destructive',
        title: 'AI Error',
        description: errorMessage,
      });
    }
    setIsLoading(false);
  };

  const handleFilterChange = (service: string, checked: boolean) => {
    setFilteredServices(prev =>
      checked ? [...prev, service] : prev.filter(s => s !== service)
    );
  };

  const value = {
    recommendations,
    filteredServices,
    isLoading,
    selectedMood,
    error,
    resultsRef,
    handleMoodSelect,
    handleFilterChange,
  };

  return (
    <RecommendationsContext.Provider value={value}>
      {children}
    </RecommendationsContext.Provider>
  );
}

export function useRecommendationsContext() {
  const context = useContext(RecommendationsContext);
  if (context === undefined) {
    throw new Error(
      'useRecommendationsContext must be used within a RecommendationsProvider'
    );
  }
  return context;
}
