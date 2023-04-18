import Link from 'next/link';

export enum CardVariant {
  ITEM = 'ITEM',
  HERO_BANNER = 'HERO_BANNER',
}

export interface CardProps {
  variant?: CardVariant;
  className?: string;
  header?: JSX.Element;
  main?: JSX.Element;
  footer?: JSX.Element;
  href?: string;
}

type VariantCssClasses = {
  wrapper?: string;
  container?: string;
  header?: string;
  main?: string;
  footer?: string;
};

const CardCssClasses: Record<CardVariant, VariantCssClasses> = {
  [CardVariant.ITEM]: {
    container:
      'flex flex-col bg-gradient-to-b from-neutral-gray to-neutral-gray-dark border border-neutral-gray' +
      ' shadow-neutral-gray p-1 sm:p-2 rounded-lg',
    main: 'w-full h-60 relative',
    footer: 'flex flex-col mt-4',
  },
  [CardVariant.HERO_BANNER]: {
    container:
      'flex flex-col justify-between bg-gradient-to-b from-neutral-gray to-neutral-gray-dark' +
      ' p-8 border border-neutral-gray shadow-neutral-gray rounded-lg w-full lg:p-12 lg:max-w-xl min-h-108 ',
    main: 'flex flex-col gap-4 w-full mt-8 mb-8',
    footer:
      'flex flex-wrap md:flex-nowrap gap-4 justify-center md:justify-between items-center' +
      ' p-4 md:py-6 md:px-10 bg-neutral-gray rounded-2xl border border-neutral-gray',
  },
};

const getCardCssClasses = (
  variant: CardVariant,
  key: keyof VariantCssClasses
): string => CardCssClasses[variant][key] ?? '';

const Wrapper = ({
  children,
  url,
}: {
  children: React.ReactNode;
  url?: string;
}): JSX.Element => {
  if (!url) return <>{children}</>;

  return <Link href={url}>{children}</Link>;
};

export const Card = ({
  className,
  header,
  main,
  href,
  variant = CardVariant.ITEM,
  footer,
}: CardProps) => {
  return (
    <Wrapper url={href}>
      <article
        className={`${getCardCssClasses(variant, 'container')} ${
          className ?? ''
        }`}
      >
        {header && (
          <section className={`${getCardCssClasses(variant, 'header')}`}>
            {header}
          </section>
        )}
        {main && (
          <section className={`${getCardCssClasses(variant, 'main')}`}>
            {main}
          </section>
        )}
        {footer && (
          <footer className={`${getCardCssClasses(variant, 'footer')}`}>
            {footer}
          </footer>
        )}
      </article>
    </Wrapper>
  );
};
