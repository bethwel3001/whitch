'use server';

import {getMoodBasedRecommendations} from '@/ai/flows/mood-based-recommendations';
import {movieChat} from '@/ai/flows/movie-chat-flow';
import {type MovieChatInput} from '@/ai/flows/types';
import {moviePool, type Movie} from '@/lib/placeholder-data';

// Helper function to find a movie in the pool, ignoring case and some punctuation.
const findMovieInPool = (title: string) => {
  if (!title) return undefined;
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

    if (!result.recommendations || result.recommendations.length === 0) {
      return {success: false, error: 'AI did not return any recommendations.'};
    }

    const recommendedMovies: Movie[] = result.recommendations
      .map(rec => {
        const foundMovie = findMovieInPool(rec.title);

        if (foundMovie) {
          return {...foundMovie, reason: rec.reason};
        }

        const slug = rec.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-');

        // If not found in our pool, create a generic entry
        return {
          title: rec.title,
          slug: slug,
          year: rec.year || new Date().getFullYear(),
          description: 'A new recommendation from w!tch AI.',
          posterUrl: `https://picsum.photos/seed/${rec.title
            .replace(/\s+/g, '')
            .toLowerCase()}/400/600`,
          posterHint: 'movie poster',
          services: [],
          genre: 'Unknown',
          reason: rec.reason,
        };
      })
      .slice(0, 8); // Limit to 8 movies for display

    return {success: true, movies: recommendedMovies};
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return {
      success: false,
      error: 'Failed to get recommendations from AI. Please try again.',
    };
  }
}

export async function getMovieChatResponse(input: MovieChatInput) {
  try {
    const result = await movieChat(input);
    return {success: true, response: result.response};
  } catch (error) {
    console.error('Error getting chat response:', error);
    return {
      success: false,
      error: 'Failed to get chat response from AI. Please try again.',
    };
  }
}
