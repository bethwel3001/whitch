import { Wand2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-24">
      <div className="relative h-24 w-24">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
        <div className="absolute inset-0 animate-spin rounded-full border-t-4 border-primary" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Wand2 className="h-12 w-12 animate-pulse text-primary" />
        </div>
      </div>
      <p className="text-lg font-medium text-muted-foreground">
        w!tch is conjuring your recommendations...
      </p>
    </div>
  );
}
