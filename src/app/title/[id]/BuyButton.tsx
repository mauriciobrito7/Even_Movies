'use client';
import { Button } from '@/components';

export interface IBuyButtonProps {
  itemId: string;
}

export const BuyButton = ({ itemId }: IBuyButtonProps) => {
  // eslint-disable-next-line no-console
  console.log(itemId);
  return (
    <Button
      label="Buy Now"
      className="sm:basis-7/12"
      labelClassName="text-lg"
      handleClick={() => console.log('click')}
    />
  );
};
