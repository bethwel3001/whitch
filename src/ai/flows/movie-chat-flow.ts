'use server';
/**
 * @fileOverview A movie chat AI agent.
 *
 * - movieChat - A function that handles the movie chat conversation.
 */

import {ai} from '@/ai/genkit';
import {Message} from 'genkit';
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

Answer questions about the movie's plot, characters, actors (including other movies they've been in), plot twists, fun facts, etc.`;

    const genkitHistory = history.map(m =>
      new Message(m.role, m.parts.map(p => p.text))
    );
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
