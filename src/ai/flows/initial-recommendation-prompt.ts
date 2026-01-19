'use server';
/**
 * @fileOverview Initial movie/show recommendation flow for new users.
 *
 * - initialRecommendation - A function that takes user preferences as input and returns movie/show recommendations.
 * - InitialRecommendationInput - The input type for the initialRecommendation function.
 * - InitialRecommendationOutput - The return type for the initialRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InitialRecommendationInputSchema = z.object({
  preferences: z
    .string()
    .describe(
      'A detailed description of the user\u2019s preferred movies and TV shows. Include specific genres, actors, directors, and themes that the user enjoys. Also mention any specific movies or shows that the user likes as examples.'
    ),
});

export type InitialRecommendationInput = z.infer<
  typeof InitialRecommendationInputSchema
>;

const InitialRecommendationOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'A list of movie and TV show recommendations based on the user\u2019s preferences. Provide a brief explanation for each recommendation, highlighting why it aligns with the user\u2019s stated tastes.'
    ),
});

export type InitialRecommendationOutput = z.infer<
  typeof InitialRecommendationOutputSchema
>;

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
