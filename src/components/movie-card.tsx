import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { type Movie } from '@/lib/placeholder-data';

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link
      href={`/movie/${movie.slug}`}
      className="group block h-full outline-none"
    >
      <Card className="flex h-full flex-col overflow-hidden border-2 border-card shadow-lg ring-primary ring-offset-2 ring-offset-background transition-all duration-300 group-hover:shadow-primary/20 group-focus-visible:ring-2">
        <CardHeader className="relative p-0">
          <Image
            src={movie.posterUrl}
            alt={`Poster for ${movie.title}`}
            width={400}
            height={600}
            className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={movie.posterHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4">
            <h3 className="font-headline text-2xl font-bold text-white drop-shadow-lg">
              {movie.title}
            </h3>
            <p className="text-sm text-white/80 text-muted-foreground">
              {movie.year}
            </p>
          </div>
        </CardHeader>
        <CardContent className="flex-grow space-y-2 p-4">
          <p className="text-sm text-muted-foreground">{movie.description}</p>
          {movie.reason && (
            <p className="border-l-2 border-primary pl-3 text-sm italic text-accent-foreground/80">
              {movie.reason}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-start p-4 pt-0">
          <div className="flex flex-wrap gap-2">
            {movie.services.map(service => (
              <Badge key={service} variant="secondary">
                {service}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
