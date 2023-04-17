import {
  getMovieById,
  getImageURL,
  formatCurrency,
  getMovieCast,
} from '@/utils';
import { Card, CardVariant, HeroBanner } from '@/components';
import { Slider } from '@/components/Slider';
import { BuyButton } from './BuyButton';
import Image from 'next/image';
import { CURRENCIES, TICKET_OPTIONS } from '@/constants';

interface IMovieTitle {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: IMovieTitle) {
  const { id } = params;
  const movie = await getMovieById(id);

  return {
    title: movie.title,
  };
}

const price = 10;

export default async function MovieTitle({ params }: IMovieTitle) {
  const { id } = params;
  const { locale, currency } = CURRENCIES.argentina;
  const movie = await getMovieById(id);
  const cast = await getMovieCast(id);

  const titleImage = `${getImageURL(
    movie.backdrop_path || movie.poster_path || ''
  )}`;

  const Background = () =>
    titleImage.length > 0 ? (
      <div className="-z-20 absolute inset-0 ">
        <div
          className={
            'w-full h-full bg-gradient-to-b ' +
            'from-[#050607B3] from-10% via-[#050607D4] via-60% to-[#000000f8] to-80%'
          }
        >
          <Image
            className="opacity-50 -z-10 object-cover"
            fill
            src={titleImage}
            alt=""
          />
        </div>
      </div>
    ) : null;

  return (
    <>
      {Background && <Background />}
      <HeroBanner
        card={
          <Card
            className="!w-full lg:w-auto lg:pr-24 "
            variant={CardVariant.HERO_BANNER}
            main={
              <>
                <h1>{movie.title}</h1>
                <p className="text-neutral-gray-light">{movie.overview}</p>
              </>
            }
            footer={
              <>
                <p className="sm:basis-4/12 text-xl">
                  From{' '}
                  {formatCurrency(
                    locale,
                    currency,
                    TICKET_OPTIONS[0].price || price,
                    2
                  )}
                </p>
                <BuyButton item={movie} />
              </>
            }
          />
        }
        image={
          <div className="w-full">
            <Image
              src={titleImage}
              width={750}
              height={750}
              alt={movie.title}
              className="rounded-3xl object-cover w-full lg:-ml-10 lg:scale-110"
              priority
            />
          </div>
        }
        slider={<Slider cast={cast} title="Top Cast" />}
      />
    </>
  );
}
