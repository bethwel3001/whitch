'use server';

import { getMoodBasedRecommendations } from '@/ai/flows/mood-based-recommendations';
import { moviePool, type Movie } from '@/lib/placeholder-data';

// Helper function to find a movie in the pool, ignoring case and some punctuation.
const findMovieInPool = (title: string) => {
  const normalizedTitle = title.toLowerCase().replace(/[^a-z0-9\s]/g, '');
  return moviePool.find(movie =>
    movie.title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .includes(normalizedTitle)
  );
};

export async function getRecommendationsForMood(
  mood: string,
  pastViewingHistory: string
) {
  try {
    const result = await getMoodBasedRecommendations({
      mood,
      pastViewingHistory,
    });
    const recommendationsText = result.recommendations;

    // A simple parser for a numbered or bulleted list format.
    const movieLines = recommendationsText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0 && /^\d+\.?\s*|^\*\s*|^\-\s*/.test(line));

    if (movieLines.length === 0) {
      return { success: false, error: 'Could not parse AI recommendations.' };
    }

    const recommendedMovies: Movie[] = movieLines
      .map(line => {
        const titleMatch = line.match(
          /^\d+\.?\s*|^\*\s*|^\-\s*(.*?)(?:\s*\((\d{4})\))?:\s*(.*)/
        );
        const title = titleMatch ? titleMatch[1].trim() : line.split(':')[0].trim().replace(/^\d+\.?\s*/, '');
        const reason = titleMatch ? titleMatch[3].trim() : line.split(':')[1]?.trim();

        const foundMovie = findMovieInPool(title);

        if (foundMovie) {
          return { ...foundMovie, reason };
        }
        
        // If not found in our pool, create a generic entry
        return {
          title,
          year: new Date().getFullYear(),
          description: 'A new recommendation from CineMatch AI.',
          posterUrl: `https://picsum.photos/seed/${title
            .replace(/\s+/g, '')
            .toLowerCase()}/400/600`,
          posterHint: 'movie poster',
          services: [],
          genre: 'Unknown',
          reason,
        };
      })
      .slice(0, 8); // Limit to 8 movies for display

    return { success: true, movies: recommendedMovies };
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return {
      success: false,
      error: 'Failed to get recommendations from AI.',
    };
  }
}
