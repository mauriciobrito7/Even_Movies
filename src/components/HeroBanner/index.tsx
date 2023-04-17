'use client';
import React from 'react';
import { useWindowWidth } from '@/hooks';
import { breakpoints } from '@/styles/breakpoints';
export interface IHeroBanner {
  card?: JSX.Element;
  image?: JSX.Element;
  slider?: JSX.Element;
}

export const HeroBanner = ({ card, image, slider }: IHeroBanner) => {
  const { windowWidth = 0 } = useWindowWidth();
  const isTablet = windowWidth <= breakpoints.desktop;
  return (
    <div
      className={`w-full p-8 mt-10 z-10 flex justify-between items-center ${
        !isTablet ? '' : 'flex-wrap'
      }`}
    >
      <div className="flex items-center">
        {card && card}
        {image && image}
      </div>
      <div className={`flex ${isTablet ? 'w-full mt-8' : ''}`}>
        {slider &&
          React.cloneElement(slider, {
            orientation: isTablet ? 'horizontal' : 'vertical',
          })}
      </div>
    </div>
  );
};
