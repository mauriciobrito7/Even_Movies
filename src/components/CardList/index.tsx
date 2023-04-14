import { IMovie } from '@/types/movie';
import { Card } from '../Card';
import { ROUTES } from '@/constants';
import { getMoviePosterURL } from '@/utils/titleInfo';
import Image from 'next/image';
interface ICardProps {
  items: IMovie[];
  title: string;
  limit?: number;
}

export const CardList = ({ title, items }: ICardProps) => {
  return (
    <div className="flex flex-wrap gap-4 my-10">
      <h2 className="font-bold">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map((item) => (
          <Card
            main={
              <Image
                src={`${getMoviePosterURL(
                  item.backdrop_path || item.poster_path || ''
                )}`}
                fill
                alt={item.title}
                className="rounded-lg object-cover"
                priority
                sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              />
            }
            footer={
              <>
                <h3 className="w-full mb-2 overflow-ellipsis whitespace-nowrap overflow-hidden">
                  {item.title}
                </h3>
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
