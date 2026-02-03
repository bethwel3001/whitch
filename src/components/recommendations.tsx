'use client';

import {
  Sparkles,
  Smile,
  Frown,
  Zap,
  Wind,
  HelpCircle,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { MovieCard } from './movie-card';
import { streamingServices } from '@/lib/placeholder-data';
import { Card } from './ui/card';
import { LoadingSpinner } from './loading-spinner';
import { useRecommendationsContext } from '@/context/recommendations-context';

const moods = [
  { name: 'Happy', icon: Smile },
  { name: 'Sad', icon: Frown },
  { name: 'Thrilled', icon: Zap },
  { name: 'Relaxed', icon: Wind },
  { name: 'Curious', icon: HelpCircle },
];

export function Recommendations() {
  const {
    recommendations,
    filteredServices,
    isLoading,
    selectedMood,
    error,
    resultsRef,
    handleMoodSelect,
    handleFilterChange,
  } = useRecommendationsContext();

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
          className="animate-in fade-in-50 duration-500 space-y-6 scroll-mt-20"
        >
          <div className="flex flex-col items-center gap-4 text-center">
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
              <p className="my-2 text-muted-foreground">{error}</p>
              <Button
                onClick={() => selectedMood && handleMoodSelect(selectedMood)}
              >
                <RefreshCw className="mr-2" />
                Retry
              </Button>
            </Card>
          )}

          {!isLoading && !error && displayedMovies.length > 0 && (
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8">
              {displayedMovies.map((movie, index) => (
                <MovieCard key={`${movie.slug}-${index}`} movie={movie} />
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
        <div className="animate-in fade-in-50 duration-500 rounded-lg border-2 border-dashed border-muted py-24 text-center">
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
