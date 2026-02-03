'use client';

import { useState, useRef, useEffect } from 'react';
import { type Movie } from '@/lib/placeholder-data';
import { getMovieChatResponse } from '@/app/actions';
import { Send, User, Loader2 } from 'lucide-react';
import { type MovieChatInput } from '@/ai/flows/types';
import { Avatar, AvatarFallback } from './ui/avatar';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

type Message = {
  role: 'user' | 'model';
  parts: { text: string }[];
};

export function MovieChat({ movie }: { movie: Movie }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (movie) {
      setMessages([
        {
          role: 'model',
          parts: [
            {
              text: `Hi! I'm w!tch, your movie expert. What would you like to know about "${movie.title}"? Feel free to ask about the plot, actors, fun facts, or anything else!`,
            },
          ],
        },
      ]);
    }
  }, [movie]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector(
        'div[data-radix-scroll-area-viewport]'
      );
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newUserMessage: Message = {
      role: 'user',
      parts: [{ text: userInput }],
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setUserInput('');
    setIsLoading(true);

    const chatInput: MovieChatInput = {
      movieTitle: movie.title,
      history: updatedMessages,
    };

    try {
      const result = await getMovieChatResponse(chatInput);

      if (result.success && result.response) {
        const aiMessage: Message = {
          role: 'model',
          parts: [{ text: result.response }],
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        const errorMessage: Message = {
          role: 'model',
          parts: [
            {
              text:
                result.error ||
                "Sorry, I'm having trouble connecting. Please try again.",
            },
          ],
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        role: 'model',
        parts: [
          { text: 'An unexpected error occurred. Please try again later.' },
        ],
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[80vh] w-full flex-col rounded-lg border bg-card shadow">
      <div className="flex items-center gap-3 border-b p-4">
        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-primary" />
        <div>
          <h3 className="text-lg font-semibold">Chat with w!tch</h3>
          <p className="text-sm text-muted-foreground">
            Your AI movie expert
          </p>
        </div>
      </div>

      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start gap-3',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'model' && (
                 <div className="h-8 w-8 flex-shrink-0 rounded-full bg-primary" />
              )}
              <div
                className={cn(
                  'max-w-[80%] rounded-lg p-3 text-sm shadow-sm',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                {message.parts[0].text}
              </div>
              {message.role === 'user' && (
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback>
                    <User size={18} />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3 justify-start">
               <div className="h-8 w-8 flex-shrink-0 rounded-full bg-primary" />
              <div className="bg-muted rounded-lg p-3">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <form onSubmit={handleSendMessage} className="flex gap-2 border-t p-4">
        <Input
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          placeholder="Ask anything about the movie..."
          disabled={isLoading}
          className="text-base"
        />
        <Button
          type="submit"
          size="icon"
          disabled={isLoading || !userInput.trim()}
        >
          <Send />
        </Button>
      </form>
    </div>
  );
}
