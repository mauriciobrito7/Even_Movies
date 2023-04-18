import { Icon, IconType, IconSize } from '@/components';
import { AssetPosition } from '@/types';

export enum ButtonVariant {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  ICON = 'ICON',
}

export interface ButtonProps {
  label?: string;
  handleClick?: () => void;
  labelClassName?: string;
  className?: string;
  ariaLabel?: string;
  iconType?: IconType;
  iconSize?: IconSize;
  iconPosition?: AssetPosition;
  iconClassName?: string;
  variant?: ButtonVariant;
}

type VariantCssClasses = {
  container?: string;
  label?: string;
};

const ButtonCssClasses: Record<ButtonVariant, VariantCssClasses> = {
  [ButtonVariant.PRIMARY]: {
    container:
      'w-full bg-gradient-to-r from-primary to-primary-dark drop-shadow-lg inline-flex items-center' +
      ' justify-center text-white rounded-2xl h-14 px-2 hover:bg-primary-dark transition duration-300',
    label: 'font-bold ',
  },
  [ButtonVariant.SECONDARY]: {
    container:
      'bg-white border text-black border-neutral-gray rounded-2xl h-14 w-full px-2',
    label: 'font-bold',
  },
  [ButtonVariant.ICON]: {
    container:
      'flex items-center justify-center w-10 h-10 bg-black opacity-50 ' +
      'p-2 rounded-full transition duration-300 hover:opacity-100',
  },
};

const getButtonCssClasses = (
  variant: ButtonVariant,
  key: keyof VariantCssClasses
): string => ButtonCssClasses[variant][key] ?? '';

export const iconPositionClasses: Record<AssetPosition, string> = {
  [AssetPosition.LEFT]: '-order-1 mr-3',
  [AssetPosition.RIGHT]: 'ml-3',
  [AssetPosition.CENTER]: 'm-0',
};

export const Button = ({
  label,
  labelClassName,
  handleClick,
  className,
  ariaLabel,
  iconType,
  iconSize,
  iconClassName,
  iconPosition,
  variant = ButtonVariant.PRIMARY,
}: ButtonProps) => {
  return (
    <button
      className={`
        cursor-pointer
        ${getButtonCssClasses(variant, 'container')}
        ${iconType && iconPosition ? iconPositionClasses[iconPosition] : ''} 
        ${className ?? ''}
      `}
      onClick={handleClick}
      aria-label={ariaLabel ?? ''}
    >
      {label && (
        <span
          className={`${getButtonCssClasses(variant, 'label')}  ${
            labelClassName ?? ''
          }`}
        >
          {label}
        </span>
      )}
      {iconType && (
        <Icon className={iconClassName ?? ''} type={iconType} size={iconSize} />
      )}
    </button>
  );
};
