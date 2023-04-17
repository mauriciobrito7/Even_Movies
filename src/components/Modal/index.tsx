/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';
import { useEffect } from 'react';

export enum ModalSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  XLARGE = 'xlarge',
  XXLARGE = '2xlarge',
  FULL = 'full',
}

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: ModalSize;
  className?: string;
}

const ModalSizeCss: Record<ModalSize, string> = {
  [ModalSize.SMALL]: ' max-w-sm',
  [ModalSize.MEDIUM]: ' max-w-md',
  [ModalSize.LARGE]: ' max-w-lg',
  [ModalSize.XLARGE]: 'max-w-xl',
  [ModalSize.XXLARGE]: 'max-w-2xl',
  [ModalSize.FULL]: ' w-full',
};

export const Modal = ({
  isOpen,
  onClose,
  children,
  size = ModalSize.XXLARGE,
  className,
}: IModalProps) => {
  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleClickOutside = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed z-50 inset-0 flex items-center justify-center p-4 bg-black-transparent backdrop-blur"
      onClick={handleClickOutside}
      tabIndex={0}
      role="button"
      aria-label="Close modal"
    >
      <div
        className={`
          p-6 bg-gradient-to-b from-neutral-gray to-neutral-gray-dark
          rounded-lg border border-neutral-gray shadow-lg ${className ?? ''}
          ${ModalSizeCss[size]}
        `}
      >
        {children}
      </div>
    </div>
  );
};
