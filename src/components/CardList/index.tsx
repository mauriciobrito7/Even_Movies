import { Movie } from '@/types/movie';
import { Card } from '../Card';
import { ROUTES } from '@/constants';
import { getImageURL } from '@/utils';
import Image from 'next/image';

interface CardProps {
  items: Movie[];
  title: string;
  limit?: number;
  className?: string;
}

export const CardList = ({ title, items, className }: CardProps) => {
  return (
    <div className={`flex flex-wrap gap-4 my-10 px-8 ${className ?? ''}`}>
      <h2 className="font-bold">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map((item) => (
          <Card
            main={
              <Image
                src={`${getImageURL(
                  item.backdrop_path || item.poster_path || ''
                )}`}
                alt={item.title}
                className="rounded-lg object-cover w-full h-full"
                priority
                width={480}
                height={480}
              />
            }
            footer={
              <>
                <h4 className="w-full mb-2 overflow-ellipsis whitespace-nowrap overflow-hidden">
                  {item.title}
                </h4>
                <p className="text-neutral-gray-light">
                  Release date: {item.release_date}
                </p>
                <p className="text-neutral-gray-light">
                  Rating: {item.vote_average}
                </p>
              </>
            }
            key={item.id}
            href={`${ROUTES.title}/${item.id}`}
          />
        ))}
      </div>
    </div>
  );
};
