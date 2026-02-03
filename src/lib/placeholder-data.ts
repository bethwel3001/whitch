export const streamingServices = [
  'Netflix',
  'Disney+',
  'Hulu',
  'Amazon Prime',
  'Max',
  'Apple TV+',
];

export type Movie = {
  title: string;
  slug: string;
  year: number;
  description: string;
  posterUrl: string;
  posterHint: string;
  services: string[];
  genre: string;
  reason?: string;
  type?: 'Movie' | 'Series' | 'Anime';
};

export const moviePool: Movie[] = [
  {
    title: 'Inception',
    slug: 'inception',
    year: 2010,
    description:
      'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    posterUrl: 'https://picsum.photos/seed/inception/400/400',
    posterHint: 'cityscape architecture',
    services: ['Netflix', 'Max'],
    genre: 'Sci-Fi',
    type: 'Movie',
  },
  {
    title: 'Interstellar',
    slug: 'interstellar',
    year: 2014,
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    posterUrl: 'https://picsum.photos/seed/interstellar/400/400',
    posterHint: 'space stars',
    services: ['Amazon Prime'],
    genre: 'Sci-Fi',
    type: 'Movie',
  },
  {
    title: 'Blade Runner 2049',
    slug: 'blade-runner-2049',
    year: 2017,
    description:
      "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.",
    posterUrl: 'https://picsum.photos/seed/bladerunner/400/400',
    posterHint: 'futuristic city',
    services: ['Netflix'],
    genre: 'Sci-Fi',
    type: 'Movie',
  },
  {
    title: 'The Matrix',
    slug: 'the-matrix',
    year: 1999,
    description:
      'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    posterUrl: 'https://picsum.photos/seed/matrix/400/400',
    posterHint: 'digital code',
    services: ['Max'],
    genre: 'Sci-Fi',
    type: 'Movie',
  },
  {
    title: 'The Grand Budapest Hotel',
    slug: 'the-grand-budapest-hotel',
    year: 2014,
    description:
      'The adventures of Gustave H, a legendary concierge at a famous hotel from the fictional Republic of Zubrowka between the first and second World Wars, and Zero Moustafa, the lobby boy who becomes his most trusted friend.',
    posterUrl: 'https://picsum.photos/seed/budapest/400/400',
    posterHint: 'vintage hotel',
    services: ['Disney+'],
    genre: 'Comedy',
    type: 'Movie',
  },
  {
    title: 'Booksmart',
    slug: 'booksmart',
    year: 2019,
    description:
      'On the eve of their high school graduation, two academic superstars and best friends realize they should have worked less and played more. Determined not to fall short of their peers, the girls try to cram four years of fun into one night.',
    posterUrl: 'https://picsum.photos/seed/booksmart/400/400',
    posterHint: 'graduation party',
    services: ['Hulu'],
    genre: 'Comedy',
    type: 'Movie',
  },
  {
    title: 'Parasite',
    slug: 'parasite',
    year: 2019,
    description:
      'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    posterUrl: 'https://picsum.photos/seed/parasite/400/400',
    posterHint: 'modern house',
    services: ['Hulu'],
    genre: 'Drama',
    type: 'Movie',
  },
  {
    title: 'Mad Max: Fury Road',
    slug: 'mad-max-fury-road',
    year: 2015,
    description:
      'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the help of a group of female prisoners, a psychotic worshiper, and a drifter named Max.',
    posterUrl: 'https://picsum.photos/seed/madmax/400/400',
    posterHint: 'desert car',
    services: ['Max'],
    genre: 'Action',
    type: 'Movie',
  },
  {
    title: 'Paddington 2',
    slug: 'paddington-2',
    year: 2017,
    description:
      'Paddington, now happily settled with the Brown family and a popular member of the local community, picks up a series of odd jobs to buy the perfect present for his Aunt Lucy.',
    posterUrl: 'https://picsum.photos/seed/paddington/400/400',
    posterHint: 'cute bear',
    services: ['Netflix'],
    genre: 'Family',
    type: 'Movie',
  },
  {
    title: 'School of Rock',
    slug: 'school-of-rock',
    year: 2003,
    description:
      "After being kicked out of his rock band, Dewey Finn becomes a substitute teacher of an uptight elementary private school, only to try and turn his class into a rock band.",
    posterUrl: 'https://picsum.photos/seed/schoolofrock/400/400',
    posterHint: 'electric guitar',
    services: ['Amazon Prime'],
    genre: 'Comedy',
    type: 'Movie',
  },
  {
    title: 'A Quiet Place',
    slug: 'a-quiet-place',
    year: 2018,
    description:
      'In a post-apocalyptic world, a family is forced to live in silence while hiding from monsters with ultra-sensitive hearing.',
    posterUrl: 'https://picsum.photos/seed/quietplace/400/400',
    posterHint: 'dark forest',
    services: ['Amazon Prime'],
    genre: 'Thriller',
    type: 'Movie',
  },
  {
    title: 'Get Out',
    slug: 'get-out',
    year: 2017,
    description:
      "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception eventually reaches a boiling point.",
    posterUrl: 'https://picsum.photos/seed/getout/400/400',
    posterHint: 'eerie face',
    services: ['Netflix'],
    genre: 'Thriller',
    type: 'Movie',
  },
];
