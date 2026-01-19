import { Sparkle, Wand2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-24 overflow-hidden">
      <div className="relative h-24 w-24">
        {/* Main Wand Icon */}
        <Wand2 className="absolute inset-0 h-full w-full animate-float text-primary" />
        
        {/* Sparkles */}
        <Sparkle className="absolute top-0 left-0 h-4 w-4 animate-sparkle-1 text-accent" />
        <Sparkle className="absolute bottom-4 right-0 h-5 w-5 animate-sparkle-2 text-accent" />
        <Sparkle className="absolute top-8 right-8 h-3 w-3 animate-sparkle-3 text-accent" />
        <Sparkle className="absolute bottom-8 left-4 h-4 w-4 animate-sparkle-4 text-accent" />
      </div>
      <p className="text-lg font-medium text-muted-foreground">
        w!tch is conjuring your recommendations...
      </p>
    </div>
  );
}
