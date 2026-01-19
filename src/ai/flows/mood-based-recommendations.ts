'use server';

/**
 * @fileOverview Provides movie recommendations based on the user's mood.
 *
 * - getMoodBasedRecommendations - A function that returns movie recommendations based on the user's mood.
 */

import {ai} from '@/ai/genkit';
import {
  type MoodBasedRecommendationsInput,
  MoodBasedRecommendationsInputSchema,
  type MoodBasedRecommendationsOutput,
  MoodBasedRecommendationsOutputSchema,
} from './types';

export async function getMoodBasedRecommendations(
  input: MoodBasedRecommendationsInput
): Promise<MoodBasedRecommendationsOutput> {
  return moodBasedRecommendationsFlow(input);
}

const moodBasedRecommendationsPrompt = ai.definePrompt({
  name: 'moodBasedRecommendationsPrompt',
  input: {schema: MoodBasedRecommendationsInputSchema},
  output: {schema: MoodBasedRecommendationsOutputSchema},
  prompt: `You are a movie recommendation expert. Given a user's current mood and past viewing history, you will provide a list of movie or show recommendations. Provide a title, year, and a brief reason for each recommendation.

Mood: {{{mood}}}
Past Viewing History: {{{pastViewingHistory}}}

Recommendations:`,
});

const moodBasedRecommendationsFlow = ai.defineFlow(
  {
    name: 'moodBasedRecommendationsFlow',
    inputSchema: MoodBasedRecommendationsInputSchema,
    outputSchema: MoodBasedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await moodBasedRecommendationsPrompt(input);
    return output!;
  }
);
