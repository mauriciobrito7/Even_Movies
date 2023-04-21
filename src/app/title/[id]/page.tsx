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

interface MovieTitle {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: MovieTitle) {
  const { id } = params;
  const movie = await getMovieById(id);
  const titleImage = `${getImageURL(
    movie.backdrop_path || movie.poster_path || ''
  )}`;

  return {
    title: movie.title,
    description: movie.overview,
    image: titleImage,
    openGraph: {
      title: movie.title,
      description: movie.overview,
      images: [{ url: titleImage }],
    },
  };
}

const price = 10;

export default async function MovieTitle({ params }: MovieTitle) {
  const { id } = params;
  const { locale, currency } = CURRENCIES.unitedStates;
  const movie = await getMovieById(id);
  const cast = await getMovieCast(id);

  const titleImage = `${getImageURL(
    movie.backdrop_path || movie.poster_path || ''
  )}`;

  const Background = () =>
    titleImage.length > 0 ? (
      <>
        <Image
          className="absolute inset-0 -z-20 w-full h-full min-w-full min-h-screen object-cover"
          fill
          src={titleImage}
          alt={`movie ${movie.title}`}
        />
        <div
          className={
            'absolute inset-0 -z-10 w-full h-full bg-gradient-to-b ' +
            'from-[#050607B3] from-10% via-[#070605] via-55% to-[#000000fd] to-100%'
          }
        />
      </>
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
                <p className="md:basis-4/12 text-xl">
                  <span className="text-neutral-gray-light">From </span>
                  {formatCurrency(
                    locale,
                    currency,
                    TICKET_OPTIONS.child.price || price,
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
