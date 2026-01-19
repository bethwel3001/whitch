'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { MovieCard } from './movie-card';
import { getRecommendationsForMood } from '@/app/actions';
import { type Movie, streamingServices, user } from '@/lib/placeholder-data';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const moods = [
  { name: 'Happy', emoji: '😄' },
  { name: 'Sad', emoji: '😢' },
  { name: 'Thrilled', emoji: '😱' },
  { name: 'Relaxed', emoji: '😌' },
  { name: 'Curious', emoji: '🤔' },
];

export function Recommendations() {
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [filteredServices, setFilteredServices] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const { toast } = useToast();

  const handleMoodSelect = async (mood: string) => {
    setIsLoading(true);
    setSelectedMood(mood);
    setRecommendations([]);
    const result = await getRecommendationsForMood(mood, user.viewingHistory);
    if (result.success && result.movies) {
      setRecommendations(result.movies);
    } else {
      toast({
        variant: 'destructive',
        title: 'AI Error',
        description:
          result.error ||
          'Could not get recommendations. Please try again later.',
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
    <div className="space-y-8">
      <Card className="bg-secondary/50 border-dashed">
        <CardContent className="p-6 text-center space-y-4">
          <h2 className="text-3xl font-headline font-bold text-primary">
            How are you feeling, {user.name}?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select a mood and our AI will conjure a list of movies and shows
            perfectly matched to your vibe.
          </p>
          <div className="flex justify-center items-center flex-wrap gap-3 pt-4">
            {moods.map(mood => (
              <Button
                key={mood.name}
                variant={selectedMood === mood.name ? 'default' : 'secondary'}
                size="lg"
                className="transform transition-transform hover:scale-105"
                onClick={() => handleMoodSelect(mood.name)}
                disabled={isLoading}
              >
                <span className="text-2xl mr-2">{mood.emoji}</span> {mood.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {(isLoading || recommendations.length > 0) && (
        <section className="space-y-6 animate-in fade-in duration-500">
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <h3 className="text-2xl font-headline font-semibold flex-shrink-0 flex items-center gap-2">
              <Sparkles className="text-primary" />
              {selectedMood && `For your ${selectedMood.toLowerCase()} mood...`}
            </h3>
            <div className="flex-1 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg bg-card p-3 border">
              <span className="font-semibold text-sm">Filter by Service:</span>
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

          {isLoading && (
            <div className="flex justify-center items-center p-24 flex-col gap-4">
              <Loader2 className="h-16 w-16 animate-spin text-primary" />
              <p className="text-muted-foreground font-medium text-lg">
                Our AI is finding your perfect match...
              </p>
            </div>
          )}

          {!isLoading && displayedMovies.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedMovies.map(movie => (
                <MovieCard key={movie.title} movie={movie} />
              ))}
            </div>
          )}

          {!isLoading && recommendations.length > 0 && displayedMovies.length === 0 && (
            <div className="text-center py-24 rounded-lg bg-card border">
              <h3 className="text-xl font-semibold text-muted-foreground">
                No Results Found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your streaming service filters.
              </p>
            </div>
          )}
        </section>
      )}

      {!isLoading && recommendations.length === 0 && (
        <div className="text-center py-24 border-2 border-dashed border-muted rounded-lg animate-in fade-in duration-500">
          <Wand2 className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-xl font-semibold text-muted-foreground">
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
