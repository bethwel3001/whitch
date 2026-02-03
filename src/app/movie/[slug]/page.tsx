import { MovieChat } from '@/components/movie-chat';
import { moviePool, type Movie } from '@/lib/placeholder-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Buffer } from 'buffer';

function findMovieBySlug(slug: string): Movie | undefined {
  return moviePool.find(movie => movie.slug === slug);
}

// Generate static paths for all movies for performance
export async function generateStaticParams() {
  return moviePool.map(movie => ({
    slug: movie.slug,
  }));
}

export default function MovieDetailsPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  let movie: Movie | undefined = findMovieBySlug(params.slug);

  if (!movie && searchParams?.data) {
    try {
      const movieData = Buffer.from(
        searchParams.data as string,
        'base64'
      ).toString('utf-8');
      movie = JSON.parse(movieData);
    } catch (e) {
      console.error('Failed to parse movie data from search params', e);
      // Let it fall through to notFound()
    }
  }

  if (!movie) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <Button asChild variant="outline" size="sm">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Recommendations
          </Link>
        </Button>
      </div>

      {/* Top section for details */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
        {/* Image Column */}
        <div className="relative w-full lg:col-span-1">
          <Image
            src={movie.posterUrl}
            alt={`Poster for ${movie.title}`}
            width={400}
            height={400}
            className="w-full rounded-lg object-cover shadow-lg"
            data-ai-hint={movie.posterHint}
          />
          <div className="absolute bottom-0 left-0 w-full rounded-b-lg bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 pt-12 lg:hidden">
            <h1 className="font-headline text-3xl font-bold text-white drop-shadow-md">
              {movie.title}
            </h1>
            <p className="mt-1 text-lg text-white/80 drop-shadow-sm">
              {movie.year}
            </p>
          </div>
        </div>

        {/* Info Column */}
        <div className="flex flex-col justify-center lg:col-span-2">
          <div className="hidden lg:block">
            <h1 className="font-headline text-3xl font-bold md:text-4xl">
              {movie.title}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">{movie.year}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {(movie.services || []).map(service => (
              <Badge key={service} variant="secondary">
                {service}
              </Badge>
            ))}
            <Badge variant="outline">{movie.genre}</Badge>
          </div>
          <p className="mt-6 text-base leading-relaxed text-foreground/90 md:text-lg">
            {movie.description}
          </p>
          {movie.reason && (
            <blockquote className="mt-6 rounded-r-md border-l-4 border-primary bg-muted/20 p-4 italic text-accent-foreground/90">
              "{movie.reason}"
              <footer className="mt-2 text-sm not-italic">
                - w!tch's recommendation
              </footer>
            </blockquote>
          )}
        </div>
      </div>

      {/* Chat Section */}
      <div className="mt-12 lg:mt-16">
        <MovieChat movie={movie} />
      </div>
    </div>
  );
}
