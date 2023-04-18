'use client';
import BrandSvg from '../../../public/brand.png';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ROUTES, CURRENCIES } from '@/constants';
import { formatCurrency } from '@/utils';
import { useCart } from '@/hooks';
import { Button, ButtonVariant, IconType } from '@/components';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { locale, currency } = CURRENCIES.unitedStates;
  const { state: cart, addItem, removeItem } = useCart();
  const numberOfItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price,
    0
  );
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (dropdownVisible) {
        setDropdownVisible(false);
      }
      const offset = window.scrollY;
      if (offset > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dropdownVisible]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div
      className={`flex justify-between items-center w-full h-20 fixed z-20 top-0 px-8 ${
        scrolled ? 'bg-black-transparent backdrop-blur' : 'bg-transparent'
      }`}
    >
      <Link href={ROUTES.home}>
        <Image
          className=""
          width={128}
          height={128}
          src={BrandSvg}
          alt="brand"
        />
      </Link>
      <div className="relative flex items-center">
        <Button
          className="bg-transparent !opacity-100"
          iconType={IconType.CART}
          iconClassName="scale-200"
          variant={ButtonVariant.ICON}
          handleClick={toggleDropdown}
        />
        {numberOfItems > 0 && (
          <div
            className={
              'absolute flex items-center justify-center -top-3 -right-2 w-4 h-4 ' +
              ' bg-primary rounded-full p-3 text-white'
            }
          >
            {numberOfItems}
          </div>
        )}
        {dropdownVisible && (
          <div
            ref={dropdownRef}
            tabIndex={0}
            role="button"
            aria-label="Close dropdown"
            className={
              'absolute p-8 top-16 w-screen -translate-y-1 -right-8 sm:-right-2 sm:w-80 bg-gradient-to-b ' +
              ' from-neutral-gray-dark to-neutral-gray  border border-neutral-gray shadow-lg shadow-black rounded'
            }
          >
            <div className="overflow-y-auto max-h-96">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className={
                    'flex flex-wrap gap-2 px-4 py-2 border-b border-neutral-gray' +
                    ' text-white capitalize'
                  }
                >
                  {item.type} {item.name} ({item.quantity}) -{' '}
                  {formatCurrency(
                    locale,
                    currency,
                    item.price,
                    2
                  )}
                  <div className="flex ml-auto gap-2">
                    <Button
                      className="!w-24 !h-10"
                      handleClick={() => removeItem({ ...item, quantity: 1 })}
                      label="Remove"
                      variant={ButtonVariant.SECONDARY}
                    />
                    <Button
                      className="!w-24 !h-10"
                      handleClick={() => addItem({ ...item, quantity: 1 })}
                      variant={ButtonVariant.PRIMARY}
                      label="Add"
                    />
                  </div>
                </div>
              ))}
              <div className="px-4 py-2 text-xl text-neutral-gray-light font-bold">
                {totalPrice === 0
                  ? 'Cart is empty'
                  : `Total: ${formatCurrency(locale, currency, totalPrice, 2)}`}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
