'use server';

/**
 * @fileOverview Provides movie recommendations based on the user's mood.
 *
 * - getMoodBasedRecommendations - A function that returns movie recommendations based on the user's mood.
 * - MoodBasedRecommendationsInput - The input type for the getMoodBasedRecommendations function.
 * - MoodBasedRecommendationsOutput - The return type for the getMoodBasedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MoodBasedRecommendationsInputSchema = z.object({
  mood: z
    .string()
    .describe("The user's current mood (e.g., happy, sad, excited, relaxed)."),
  pastViewingHistory: z
    .string()
    .describe("A summary of the user's past viewing history."),
});
export type MoodBasedRecommendationsInput = z.infer<
  typeof MoodBasedRecommendationsInputSchema
>;

const RecommendationSchema = z.object({
  title: z.string().describe('The title of the movie or show.'),
  year: z.number().optional().describe('The release year of the movie or show.'),
  reason: z.string().describe('A brief explanation for the recommendation.'),
});

const MoodBasedRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(RecommendationSchema)
    .describe('A list of movie/show recommendations based on the mood.'),
});
export type MoodBasedRecommendationsOutput = z.infer<
  typeof MoodBasedRecommendationsOutputSchema
>;

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
