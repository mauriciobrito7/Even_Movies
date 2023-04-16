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

const price = 10;

export default async function MovieTitle({ params }: IMovieTitle) {
  const { id } = params;
  const { locale, currency } = CURRENCIES.argentina;
  const movie = await getMovieById(id);
  const cast = await getMovieCast(id);

  const imagesCast = cast.reduce((list: string[], character: any) => {
    if (character.profile_path) {
      list = [...list, `${getImageURL(character.profile_path)}`];
    }
    return list;
  }, []);

  const titleImage = `${getImageURL(
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
            className="sm:pr-24"
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
          <div>
            <Image
              src={titleImage}
              width={750}
              height={750}
              alt={movie.title}
              className="rounded-3xl object-cover sm:-ml-10 sm:scale-110"
              priority
            />
          </div>
        }
        slider={<Slider imagesURL={imagesCast} title="Top Cast" />}
      />
    </>
  );
}
