'use server';
/**
 * @fileOverview A movie chat AI agent.
 *
 * - movieChat - A function that handles the movie chat conversation.
 */

import {ai} from '@/ai/genkit';
import {
  type MovieChatInput,
  MovieChatInputSchema,
  type MovieChatOutput,
  MovieChatOutputSchema,
} from './types';

export async function movieChat(
  input: MovieChatInput
): Promise<MovieChatOutput> {
  return movieChatFlow(input);
}

const movieChatFlow = ai.defineFlow(
  {
    name: 'movieChatFlow',
    inputSchema: MovieChatInputSchema,
    outputSchema: MovieChatOutputSchema,
  },
  async ({movieTitle, history}) => {
    const systemPrompt = `You are a movie expert called w!tch. You are having a conversation about the movie "${movieTitle}".

Your personality is witty, insightful, and you love sharing fun facts and behind-the-scenes trivia.

When providing answers, structure your response for clarity and professionalism. Use formatting like bullet points (using '-') or numbered lists where appropriate to break down information. Use bolding for emphasis by wrapping text in **double asterisks**. Use italics by wrapping text in *single asterisks*.

Ensure your output is clean, well-formatted, and easy to read. For example, instead of just listing facts, introduce them and present them clearly in a list. Always summarize key points when possible.`;

    const genkitHistory = history.map(m => ({
      role: m.role,
      content: m.parts,
    }));
    const latestUserMessage = genkitHistory.pop();

    if (!latestUserMessage || latestUserMessage.role !== 'user') {
      throw new Error('Last message must be from the user.');
    }

    const response = await ai.generate({
      system: systemPrompt,
      history: genkitHistory,
      prompt: latestUserMessage.content,
    });

    return {
      response: response.text,
    };
  }
);
