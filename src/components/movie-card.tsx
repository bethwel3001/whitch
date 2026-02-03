import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { moviePool, type Movie } from '@/lib/placeholder-data';
import { Buffer } from 'buffer';

export function MovieCard({ movie }: { movie: Movie }) {
  const isFromPool = moviePool.some(poolMovie => poolMovie.slug === movie.slug);

  let href = `/movie/${movie.slug}`;

  if (!isFromPool) {
    const movieData = Buffer.from(JSON.stringify(movie)).toString('base64');
    href = `/movie/${movie.slug}?data=${movieData}`;
  }

  return (
    <Link href={href} className="group block h-full outline-none">
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_20px_0px_hsl(var(--primary))] group-focus-visible:ring-2 group-focus-visible:ring-primary group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background">
        <CardHeader className="relative p-0">
          <Image
            src={movie.posterUrl}
            alt={`Poster for ${movie.title}`}
            width={400}
            height={400}
            className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={movie.posterHint}
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 pt-12">
            <h3 className="font-headline text-2xl font-bold text-white drop-shadow-md">
              {movie.title}
            </h3>
            <p className="text-sm text-white/80 drop-shadow-sm">
              {movie.year}
            </p>
          </div>
        </CardHeader>
        <CardContent className="flex-grow space-y-2 p-4">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {movie.description}
          </p>
          {movie.reason && (
            <p className="border-l-2 border-primary pl-3 text-sm italic text-accent-foreground/80 line-clamp-2">
              "{movie.reason}"
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
