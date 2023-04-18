'use client';
import React from 'react';
import { useWindowWidth } from '@/hooks';
import { breakpoints } from '@/styles/breakpoints';
export interface HeroBanner {
  card?: JSX.Element;
  image?: JSX.Element;
  slider?: JSX.Element;
  className?: string;
}

export const HeroBanner = ({ className, card, image, slider }: HeroBanner) => {
  const { windowWidth = 0 } = useWindowWidth();
  const isTablet = windowWidth <= breakpoints.desktop;
  return (
    <div
      className={`w-full p-8 mt-10 flex justify-between items-center flex-wrap gap-8 lg:!flex-nowrap lg:!gap-0
        ${className ?? ''}
      `}
    >
      <div
        className={
          'flex justify-center items-center flex-wrap flex-col-reverse ' +
          ' gap-8 lg:!flex-nowrap lg:!flex-row lg:!gap-0'
        }
      >
        {card && card}
        {image && image}
      </div>
      <div className={`flex ${isTablet ? 'w-full' : ''}`}>
        {slider &&
          React.cloneElement(slider, {
            orientation: isTablet ? 'horizontal' : 'vertical',
          })}
      </div>
    </div>
  );
};
