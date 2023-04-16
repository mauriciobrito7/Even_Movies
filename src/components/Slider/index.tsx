'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { Button, ButtonVariant, IconType } from '@/components';

export interface ISlider {
  imagesURL: string[];
  title?: string;
  orientation?: 'horizontal' | 'vertical';
}

export const Slider = ({
  title,
  imagesURL,
  orientation = 'vertical',
}: ISlider) => {
  const scrollRef: React.RefObject<HTMLDivElement> = useRef(null);

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

  const containerClass =
    orientation === 'horizontal' ? 'flex !w-full' : 'flex flex-col';
  // const buttonPosition = orientation === 'horizontal' ? 'top-1/2' : 'left-1/2';
  // const transformPosition =
  //   orientation === 'horizontal' ? '-translate-y-1/2' : '-translate-x-1/2';

  return (
    <div
      className={`
        bg-gradient-to-b from-neutral-gray to-neutral-gray-dark rounded-3xl max-w-xs p-8 ${containerClass}
      `}
    >
      {title && <h3 className="text-center w-full">{title}</h3>}

      <Button
        handleClick={previousSlide}
        iconType={IconType.CHEVRON_UP}
        variant={ButtonVariant.ICON}
        className='mx-auto my-4'
      />

      <div
        className={`w-full max-h-96 overflow-auto gap-6 ${containerClass}`}
        ref={scrollRef}
      >
        {imagesURL.map((image, index) => (
          <div key={index} className="w-28 h-28">
            <Image
              className="w-full h-full object-cover rounded-xl"
              src={image}
              alt=""
              width={256}
              height={256}
              priority
            />
          </div>
        ))}
      </div>
      <Button
        handleClick={nextSlide}
        iconType={IconType.CHEVRON_DOWN}
        variant={ButtonVariant.ICON}
        className='mx-auto mt-4'
      />
    </div>
  );
};
