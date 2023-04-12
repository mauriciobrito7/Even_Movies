import { IMovie } from '@/types';
import { getMoviePosterURL } from '@/utils/movieInfo';
import Image from 'next/image';

export interface ICardProps {
  item: IMovie;
}

export const Card = ({ item }: ICardProps) => {
  return (
    <article
      className={
        'flex flex-col bg-neutral-gray-dark border border-neutral-gray' +
        ' shadow-neutral-gray p-1 sm:p-2 rounded-lg'
      }
    >
      <div className="w-full h-60 relative">
        <Image
          src={`${getMoviePosterURL(
            item.backdrop_path || item.poster_path || ''
          )}`}
          fill
          alt=""
          className="rounded-lg object-cover"
          decoding="async"
          loading="lazy"
        />
      </div>
      <footer className="flex flex-wrap mt-4">
        <h3 className="w-full mb-2 overflow-ellipsis whitespace-nowrap overflow-hidden">{item.title}</h3>
        <p className="text-neutral-gray-light">
          Release date: {item.release_date}
        </p>
        <p className="text-neutral-gray-light">Rating: {item.vote_average}</p>
      </footer>
    </article>
  );
};
