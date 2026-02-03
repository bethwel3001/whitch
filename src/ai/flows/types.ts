import { z } from 'zod';

// from initial-recommendation-prompt.ts
export const InitialRecommendationInputSchema = z.object({
  preferences: z
    .string()
    .describe(
      'A detailed description of the user’s preferred movies and TV shows. Include specific genres, actors, directors, and themes that the user enjoys. Also mention any specific movies or shows that the user likes as examples.'
    ),
});
export type InitialRecommendationInput = z.infer<
  typeof InitialRecommendationInputSchema
>;
export const InitialRecommendationOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'A list of movie and TV show recommendations based on the user’s preferences. Provide a brief explanation for each recommendation, highlighting why it aligns with the user’s stated tastes.'
    ),
});
export type InitialRecommendationOutput = z.infer<
  typeof InitialRecommendationOutputSchema
>;


// from mood-based-recommendations.ts
export const MoodBasedRecommendationsInputSchema = z.object({
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
  type: z
    .enum(['Movie', 'Series', 'Anime'])
    .describe('The type of content.'),
});
export const MoodBasedRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(RecommendationSchema)
    .describe('A list of movie/show recommendations based on the mood.'),
});
export type MoodBasedRecommendationsOutput = z.infer<
  typeof MoodBasedRecommendationsOutputSchema
>;

// from movie-chat-flow.ts
const partSchema = z.object({
  text: z.string(),
});
const messageSchema = z.object({
  role: z.enum(['user', 'model']),
  parts: z.array(partSchema),
});
export const MovieChatInputSchema = z.object({
  movieTitle: z.string().describe('The title of the movie being discussed.'),
  history: z.array(messageSchema).describe('The conversation history.'),
});
export type MovieChatInput = z.infer<typeof MovieChatInputSchema>;
export const MovieChatOutputSchema = z.object({
  response: z.string().describe('The AI response in the conversation.'),
});
export type MovieChatOutput = z.infer<typeof MovieChatOutputSchema>;
