import { IMovie } from '@/types/movie';
import { Card } from '../Card';

interface ICardProps {
  items: IMovie[];
  title: string;
  limit?: number;
}

export const CardList = ({ title, items }: ICardProps) => {
  return (
    <div className="flex flex-wrap gap-4 my-10">
      <h2 className="font-bold">{title}</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        {items.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
