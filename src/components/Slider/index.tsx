'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { Button, ButtonVariant, IconType } from '@/components';
import { ICharacter } from '@/types';
import { getImageURL } from '@/utils';

export interface ISlider {
  cast: ICharacter[];
  title?: string;
  orientation?: 'horizontal' | 'vertical';
}

export const Slider = ({ title, cast, orientation = 'vertical' }: ISlider) => {
  const scrollRef: React.RefObject<HTMLDivElement> = useRef(null);
  const normalizedCast = cast.reduce(
    (
      list: {
        image: string;
        name: string;
      }[],
      character: ICharacter
    ) => {
      if (character.profile_path) {
        list = [
          ...list,
          {
            name: character.name,
            image: getImageURL(character.profile_path),
          },
        ];
      }
      return list;
    },
    []
  );

  const previousSlide = () => {
    if (scrollRef.current) {
      if (orientation === 'horizontal') {
        scrollRef.current.scrollBy({
          left: -scrollRef.current.clientWidth,
          behavior: 'smooth',
        });
      } else {
        scrollRef.current.scrollBy({
          top: -scrollRef.current.clientHeight,
          behavior: 'smooth',
        });
      }
    }
  };

  const nextSlide = () => {
    if (scrollRef.current) {
      if (orientation === 'horizontal') {
        scrollRef.current.scrollBy({
          left: scrollRef.current.clientWidth,
          behavior: 'smooth',
        });
      } else {
        scrollRef.current.scrollBy({
          top: scrollRef.current.clientHeight,
          behavior: 'smooth',
        });
      }
    }
  };

  const isHorizontal = orientation === 'horizontal';
  const containerClass = isHorizontal ? '!w-full' : 'flex-col';

  return (
    <div
      className={`
        bg-gradient-to-b from-neutral-gray to-neutral-gray-dark 
        rounded-3xl px-4 py-8 lg:px-8 flex flex-wrap ${containerClass}
      `}
    >
      {title && <h3 className="text-center w-full mb-6 lg:mb-0">{title}</h3>}
      <div
        className={`flex items-center gap-4 w-full ${
          !isHorizontal && 'flex-col'
        }`}
      >
        <Button
          handleClick={previousSlide}
          iconType={isHorizontal ? IconType.CHEVRON_LEFT : IconType.CHEVRON_UP}
          variant={ButtonVariant.ICON}
          className="mx-auto my-4"
        />

        <div
          className={`w-full max-h-96 overflow-auto flex gap-6 ${containerClass}`}
          ref={scrollRef}
        >
          {normalizedCast.map((character, index) => (
            <div key={index} className="relative w-32 h-32 flex-shrink-0">
              <Image
                className="w-full h-full object-cover rounded-xl"
                src={character.image}
                alt=""
                width={256}
                height={256}
                priority
              />
              <div
                className={
                  'bg-black-transparent text-center absolute left-0 right-0' +
                  ' flex items-center justify-center w-11/12 p-1 ml-auto mr-auto rounded-lg bottom-1'
                }
              >
                {character.name}
              </div>
            </div>
          ))}
        </div>
        <Button
          handleClick={nextSlide}
          iconType={
            isHorizontal ? IconType.CHEVRON_RIGHT : IconType.CHEVRON_DOWN
          }
          variant={ButtonVariant.ICON}
          className="mx-auto mt-4"
        />
      </div>
    </div>
  );
};
