import { IMovie, IMovieOptions } from '@/types';
export const getMoviesInfoURL = () => `
  ${process.env.NEXT_PUBLIC_BASE_MOVIE_URL}discover/movie?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}
`;

export const getMovieInfoURL = (id: string) =>
  `${process.env.NEXT_PUBLIC_BASE_MOVIE_URL}movie/${id}?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`;

export const getImageURL = (imagePath: string) =>
  `${process.env.NEXT_PUBLIC_IMAGE_URL}${imagePath}`;

export const getMovieCreditsURL = (id: string) =>
  `${process.env.NEXT_PUBLIC_BASE_MOVIE_URL}movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`;

export async function getMovies(options?: IMovieOptions): Promise<IMovie[]> {
  try {
    const { language, sortBy, releaseDate, minVoteCount } = options || {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any = {};
    if (language) params.language = language;
    if (releaseDate) {
      params['primary_release_date.gte'] = releaseDate.from;
      params['primary_release_date.lte'] = releaseDate.to;
    }

    if (sortBy) {
      params.sort_by = sortBy
        .reduce((acc, filter) => {
          acc.push(`${filter.key}.${filter.order}`);
          return acc;
        }, [] as string[])
        .join('&');
    }

    if (minVoteCount) {
      params['vote_count.gte'] = minVoteCount;
    }

    const query = Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${value as string}`)
      .join('&');
    const res = await fetch(`${getMoviesInfoURL()}&${query}`, {
      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok) {
      throw new Error('Could not fetch the data for that resource');
    }

    const data = await res.json();
    return data.results;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching movies:', error);
    throw error;
  }
}

export const getMovieById = async (id: string): Promise<IMovie> => {
  try {
    const res = await fetch(getMovieInfoURL(id));

    if (!res.ok) {
      throw new Error('Could not fetch the data for that resource');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error fetching movie with ID: ${id}`, error);
    throw error;
  }
};

export async function getMovieCast(id: string): Promise<any> {
  const res = await fetch(getMovieCreditsURL(id));

  if (!res.ok) {
    throw new Error('Could not fetch the data for that resource');
  }

  const data = await res.json();
  return data.cast;
}
