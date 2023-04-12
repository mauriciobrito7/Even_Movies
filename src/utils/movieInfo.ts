import { IMovie, IMovieOptions } from '@/types';
export const getMoviesInfoURL = () => `
  ${process.env.NEXT_PUBLIC_BASE_MOVIE_URL}discover/movie?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}
`;

export const getMoviePosterURL = (posterPath: string) =>
  `${process.env.NEXT_PUBLIC_MOVIE_POSTER_URL}${posterPath}`;

export async function getMovies( options?: IMovieOptions): Promise<IMovie[]> {
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
  const res = await fetch(`${getMoviesInfoURL()}&${query}`);

  if (!res.ok) {
    throw new Error('Could not fetch the data for that resource');
  }

  const data = await res.json();
  return data.results;
}
