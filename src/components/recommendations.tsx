'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { MovieCard } from './movie-card';
import { getRecommendationsForMood } from '@/app/actions';
import { type Movie, streamingServices, user } from '@/lib/placeholder-data';
import { useToast } from '@/hooks/use-toast';
import {
  Sparkles,
  Wand2,
  Smile,
  Frown,
  Zap,
  Wind,
  HelpCircle,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from './ui/card';
import { LoadingSpinner } from './loading-spinner';
import { MovieChatDialog } from './movie-chat-dialog';

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
  const [chatMovie, setChatMovie] = useState<Movie | null>(null);
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

  const handleChatClick = (movie: Movie) => {
    setChatMovie(movie);
  };
  
  const closeChat = () => {
    setChatMovie(null);
  };

  const displayedMovies = recommendations.filter(
    movie =>
      filteredServices.length === 0 ||
      movie.services.some(s => filteredServices.includes(s))
  );

  return (
    <div className="space-y-8">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-headline font-bold sm:text-4xl">
          How are you feeling, <span className="text-primary">{user.name}</span>?
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Select a mood and our AI will conjure a list of movies and shows
          perfectly matched to your vibe.
        </p>

        {/* Mood selector for mobile */}
        <div className="pt-2 md:hidden">
          <Select
            onValueChange={handleMoodSelect}
            disabled={isLoading}
            value={selectedMood ?? ''}
          >
            <SelectTrigger className="w-full py-5 text-base">
              <SelectValue placeholder="Select a mood..." />
            </SelectTrigger>
            <SelectContent>
              {moods.map(mood => (
                <SelectItem key={mood.name} value={mood.name}>
                  <div className="flex items-center gap-2">
                    <mood.icon className="h-5 w-5" />
                    <span>{mood.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Mood selector for desktop */}
        <div className="hidden items-center justify-center pt-4 md:flex flex-wrap gap-3">
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

      {(isLoading || recommendations.length > 0) && (
        <section className="animate-in fade-in duration-500 space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <h3 className="flex flex-shrink-0 items-center gap-2 text-2xl font-headline font-semibold">
              <Sparkles className="text-primary" />
              {selectedMood && `For your ${selectedMood.toLowerCase()} mood...`}
            </h3>
            <div className="flex-1 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border bg-card p-3">
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

          {!isLoading && displayedMovies.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {displayedMovies.map((movie, index) => (
                <MovieCard
                  key={`${movie.title}-${index}`}
                  movie={movie}
                  onChatClick={handleChatClick}
                />
              ))}
            </div>
          )}

          {!isLoading &&
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

      {!isLoading && recommendations.length === 0 && (
        <div className="animate-in fade-in duration-500 rounded-lg border-2 border-dashed border-muted py-24 text-center">
          <Wand2 className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-xl font-semibold text-muted-foreground">
            Your movie journey starts here
          </h3>
          <p className="mt-1 text-muted-foreground">
            Select a mood above to get your first AI-powered recommendations!
          </p>
        </div>
      )}
      <MovieChatDialog
        movie={chatMovie}
        isOpen={!!chatMovie}
        onClose={closeChat}
      />
    </div>
  );
}
