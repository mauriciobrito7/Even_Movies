import { getMovieById, getMoviePosterURL, formatCurrency } from '@/utils';
import { HeroBanner, Card, CardVariant } from '@/components';
import { BuyButton } from './BuyButton';
import Image from 'next/image';
import { CURRENCIES } from '@/constants';

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

export default async function MovieTitle({ params }: IMovieTitle) {
  const { id } = params;
  const { locale, currency } = CURRENCIES.argentina;
  const price = 10;
  const movie = await getMovieById(id);

  const titleImage = `${getMoviePosterURL(
    movie.backdrop_path || movie.poster_path || ''
  )}`;

  const Background = () =>
    titleImage.length > 0 ? (
      <div className="-z-20 absolute inset-0 ">
        <div
          className={
            'w-full h-full bg-gradient-to-b ' +
            'from-[#050607B3] from-10% via-[#050607D4] via-45% to-[#050607F2] to-60%'
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
                  {formatCurrency(locale, currency, price, 2)}
                </p>
                <BuyButton itemId={id} />
              </>
            }
          />
        }
        image={
          <div className="relative w-100	h-100">
            <Image
              src={titleImage}
              fill
              alt={movie.title}
              className="object-cover rounded-3xl"
              priority
            />
          </div>
        }
      />
    </>
  );
}
