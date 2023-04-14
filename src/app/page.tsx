import { CardList } from '@/components/';
import { getPeriodOfTime, getMovies } from '@/utils';
import { Times } from '@/types';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Even Movies',
  description: 'Find popular movies and tv shows',
};

export default async function Home() {
  const { from, to = '' } = getPeriodOfTime(Times.LAST_MONTH);

  const movies = await getMovies({
    language: 'en-US',
    releaseDate: {
      from,
      to,
    },
    sortBy: [
      {
        key: 'popularity',
        order: 'desc',
      },
    ],
  });

  movies.sort(
    (a, b) =>
      new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
  );

  return <CardList title="Last Month Movies" items={movies} />;
}
