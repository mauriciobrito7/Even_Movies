import { ChevronUp } from './icons/chevron-up';
import { ChevronDown } from './icons/chevron-down';
import { ChevronRight } from './icons/chevron-right';
import { ChevronLeft } from './icons/chevron-left';
import { Plus } from './icons/plus';
import { Minus } from './icons/minus';

export enum IconSize {
  XSMALL = 'xsmall',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export enum IconType {
  CHEVRON_UP = 'chevronUp',
  CHEVRON_DOWN = 'chevronDown',
  CHEVRON_LEFT = 'chevronLeft',
  CHEVRON_RIGHT = 'chevronRight',
  MINUS = 'minus',
  PLUS = 'plus',
}

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  type: IconType;
  size?: IconSize;
}

const iconSizeValues: Record<IconSize, number> = {
  xsmall: 16,
  small: 20,
  medium: 24,
  large: 32,
};

export const icons: Record<
  IconType,
  (props: React.SVGProps<SVGSVGElement>) => JSX.Element
> = {
  chevronUp: (props) => <ChevronUp role="img" {...props} />,
  chevronDown: (props) => <ChevronDown role="img" {...props} />,
  chevronLeft: (props) => <ChevronLeft role="img" {...props} />,
  chevronRight: (props) => <ChevronRight role="img" {...props} />,
  plus: (props) => <Plus role="img" {...props} />,
  minus: (props) => <Minus role="img" {...props} />,
};

export const Icon = ({
  type,
  size = IconSize.MEDIUM,
  ...restProps
}: IconProps) => {
  const icon = icons[type];
  const sizeValue = iconSizeValues[size];

  if (icon) {
    return icon({ width: sizeValue, height: sizeValue, ...restProps });
  }
  return null;
};
