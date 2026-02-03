'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { type Movie } from '@/lib/placeholder-data';
import { getMovieChatResponse } from '@/app/actions';
import { Send, User, Loader2 } from 'lucide-react';
import { type MovieChatInput } from '@/ai/flows/types';
import { Avatar, AvatarFallback } from './ui/avatar';
import { cn } from '@/lib/utils';

type Message = {
  role: 'user' | 'model';
  parts: { text: string }[];
};

export function MovieChatDialog({
  movie,
  isOpen,
  onClose,
}: {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (movie) {
      setMessages([
        {
          role: 'model',
          parts: [{ text: `Hi! I'm w!tch, your movie expert. What would you like to know about "${movie.title}"?` }],
        },
      ]);
    } else {
      setMessages([]);
    }
  }, [movie]);

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
          viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages, isLoading]);


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || !movie) return;

    const newUserMessage: Message = {
      role: 'user',
      parts: [{ text: userInput }],
    };

    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    const chatInput: MovieChatInput = {
      movieTitle: movie.title,
      history: [...messages, newUserMessage],
    };

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
        parts: [{ text: "Sorry, I'm having trouble connecting. Please try again." }],
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px] h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Chat about {movie?.title}</DialogTitle>
          <DialogDescription>
            Ask me anything about the plot, actors, fun facts, and more!
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow pr-4 -mr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
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
                    'max-w-[75%] rounded-lg p-3 text-sm',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  {message.parts[0].text}
                </div>
                 {message.role === 'user' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>
                      <User size={20}/>
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 justify-start">
                 <div className="h-8 w-8 flex-shrink-0 rounded-full bg-primary" />
                <div className="bg-muted rounded-lg p-3">
                   <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <form onSubmit={handleSendMessage} className="flex gap-2 pt-4">
          <Input
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            placeholder="Ask a question..."
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
