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
    <main className="p-4 md:p-8">
      <div className="mb-8">
        <Button asChild variant="outline" size="sm">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Recommendations
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="sticky top-24">
            <Image
              src={movie.posterUrl}
              alt={`Poster for ${movie.title}`}
              width={400}
              height={600}
              className="mx-auto w-full max-w-sm rounded-xl object-cover shadow-2xl"
              data-ai-hint={movie.posterHint}
            />
            <div className="mx-auto mt-6 max-w-sm space-y-2">
              <h1 className="font-headline text-3xl font-bold md:text-4xl">
                {movie.title}
              </h1>
              <p className="text-md text-muted-foreground">{movie.year}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {(movie.services || []).map(service => (
                  <Badge key={service} variant="secondary">
                    {service}
                  </Badge>
                ))}
                <Badge variant="outline">{movie.genre}</Badge>
              </div>
              <p className="pt-4 text-base leading-relaxed text-foreground/90">
                {movie.description}
              </p>
              {movie.reason && (
                <blockquote className="rounded-r-lg border-l-4 border-primary bg-muted/30 p-4 italic text-accent-foreground/90">
                  "{movie.reason}"
                  <footer className="mt-2 text-sm not-italic">
                    - w!tch's recommendation
                  </footer>
                </blockquote>
              )}
            </div>
          </div>
        </div>
        <div className="lg:col-span-3">
          <MovieChat movie={movie} />
        </div>
      </div>
    </main>
  );
}
