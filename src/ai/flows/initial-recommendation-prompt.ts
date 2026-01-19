'use server';
/**
 * @fileOverview Initial movie/show recommendation flow for new users.
 *
 * - initialRecommendation - A function that takes user preferences as input and returns movie/show recommendations.
 */

import {ai} from '@/ai/genkit';
import {
  type InitialRecommendationInput,
  InitialRecommendationInputSchema,
  type InitialRecommendationOutput,
  InitialRecommendationOutputSchema,
} from './types';

export async function initialRecommendation(
  input: InitialRecommendationInput
): Promise<InitialRecommendationOutput> {
  return initialRecommendationFlow(input);
}

const initialRecommendationPrompt = ai.definePrompt({
  name: 'initialRecommendationPrompt',
  input: {schema: InitialRecommendationInputSchema},
  output: {schema: InitialRecommendationOutputSchema},
  prompt: `You are a movie and TV show recommendation expert. A new user has provided the following preferences:

  {{preferences}}

  Based on these preferences, provide a list of movie and TV show recommendations. Include a brief explanation for each recommendation, highlighting why it aligns with the user\u2019s stated tastes.`,
});

const initialRecommendationFlow = ai.defineFlow(
  {
    name: 'initialRecommendationFlow',
    inputSchema: InitialRecommendationInputSchema,
    outputSchema: InitialRecommendationOutputSchema,
  },
  async input => {
    const {output} = await initialRecommendationPrompt(input);
    return output!;
  }
);
