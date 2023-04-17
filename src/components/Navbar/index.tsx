'use client';
import BrandSvg from '../../../public/brand.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ROUTES } from '@/constants';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex items-center w-full h-20 fixed z-50 top-0 px-8 ${
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
    </div>
  );
};
