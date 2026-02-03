
'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { MovieCard } from './movie-card';
import { getRecommendationsForMood } from '@/app/actions';
import { type Movie, streamingServices } from '@/lib/placeholder-data';
import { useToast } from '@/hooks/use-toast';
import {
  Sparkles,
  Smile,
  Frown,
  Zap,
  Wind,
  HelpCircle,
  RefreshCw,
} from 'lucide-react';
import { Card } from './ui/card';
import { LoadingSpinner } from './loading-spinner';

const moods = [
  { name: 'Happy', icon: Smile },
  { name: 'Sad', icon: Frown },
  { name: 'Thrilled', icon: Zap },
  { name: 'Relaxed', icon: Wind },
  { name: 'Curious', icon: HelpCircle },
];

export function Recommendations() {
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

    // Scroll down after a short delay to allow the loading spinner to render
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    const viewingHistory = 'Loves science fiction movies with complex plots, quirky comedies, and enjoys strong visual styles. Not a fan of horror or romantic comedies.';
    const result = await getRecommendationsForMood(mood, viewingHistory);

    if (result.success && result.movies) {
      setRecommendations(result.movies);
    } else {
      const errorMessage = result.error || 'Could not get recommendations. Please try again later.';
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

  const displayedMovies = recommendations.filter(
    movie =>
      filteredServices.length === 0 ||
      movie.services.some(s => filteredServices.includes(s))
  );

  return (
    <div className="space-y-12 md:space-y-16">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-headline font-bold sm:text-4xl">
          How are you feeling today?
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Select a mood and our AI will conjure a list of movies and shows
          perfectly matched to your vibe.
        </p>

        {/* Unified mood selector for all screens */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          {moods.map(mood => (
            <Button
              key={mood.name}
              variant={selectedMood === mood.name ? 'default' : 'outline'}
              size="lg"
              className="transition-transform hover:scale-105"
              onClick={() => handleMoodSelect(mood.name)}
              disabled={isLoading}
            >
              <mood.icon className="mr-2 h-5 w-5" /> {mood.name}
            </Button>
          ))}
        </div>
      </div>

      {(isLoading || recommendations.length > 0 || error) && (
        <section
          ref={resultsRef}
          className="animate-in fade-in duration-500 space-y-6 scroll-mt-20"
        >
          <div className="flex flex-col items-center gap-4">
            <h3 className="flex items-center gap-2 text-2xl font-headline font-semibold">
              <Sparkles className="text-primary" />
              {selectedMood && `For your ${selectedMood.toLowerCase()} mood...`}
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-lg border bg-card p-3">
              <span className="text-sm font-semibold">Filter by Service:</span>
              {streamingServices.map(service => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
                    onCheckedChange={checked =>
                      handleFilterChange(service, !!checked)
                    }
                  />
                  <Label htmlFor={service} className="text-sm font-medium">
                    {service}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {isLoading && <LoadingSpinner />}
          
          {!isLoading && error && (
            <Card className="py-24 text-center">
               <h3 className="text-xl font-semibold text-destructive">
                Failed to Conjure Recommendations
              </h3>
              <p className="my-2 text-muted-foreground">
                {error}
              </p>
              <Button onClick={() => selectedMood && handleMoodSelect(selectedMood)}>
                <RefreshCw className="mr-2" />
                Retry
              </Button>
            </Card>
          )}

          {!isLoading && !error && displayedMovies.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {displayedMovies.map((movie, index) => (
                <MovieCard
                  key={`${movie.title}-${index}`}
                  movie={movie}
                />
              ))}
            </div>
          )}

          {!isLoading &&
            !error &&
            recommendations.length > 0 &&
            displayedMovies.length === 0 && (
              <Card className="py-24 text-center">
                <h3 className="text-xl font-semibold text-muted-foreground">
                  No Results Found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your streaming service filters.
                </p>
              </Card>
            )}
        </section>
      )}

      {!isLoading && recommendations.length === 0 && !error && (
        <div className="animate-in fade-in duration-500 rounded-lg border-2 border-dashed border-muted py-24 text-center">
          <h3 className="text-xl font-semibold text-muted-foreground">
            Your movie journey starts here
          </h3>
          <p className="mt-1 text-muted-foreground">
            Select a mood above to get your first AI-powered recommendations!
          </p>
        </div>
      )}
    </div>
  );
}
