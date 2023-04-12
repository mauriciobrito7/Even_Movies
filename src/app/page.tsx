import { CardList } from '@/components/';
import { getPeriodOfTime, getMovies } from '@/utils';
import { Times } from '@/types';

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
      }
    ],
  });

  movies.sort(
    (a, b) =>
      new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
  );

  return (
    <main className="flex justify-center w-full mx-auto max-w-screen-xl">
      <CardList title="Last Month Movies" items={movies} />
    </main>
  );
}
