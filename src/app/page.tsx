import { CardList } from '@/components/';
import { getPeriodOfTime, getMovies } from '@/utils';
import { Time } from '@/types';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Even Movies',
  description: 'Find popular movies and tv shows',
};

export default async function Home() {
  const { from, to = '' } = getPeriodOfTime(Time.LAST_MONTH);

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
