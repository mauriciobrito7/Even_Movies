export interface IButtonProps {
  label: string;
  handleClick?: () => void;
  labelClassName?: string;
  className?: string;
}

export const Button = ({
  label,
  labelClassName,
  handleClick,
  className,
}: IButtonProps) => {
  return (
    <button
      className={`
        bg-gradient-to-r from-primary to-primary-dark drop-shadow-lg inline-flex items-center justify-center
        text-white rounded-2xl h-14 w-full px-2 hover:bg-primary-dark transition duration-300 ${
          className ?? ''
        }`}
      onClick={handleClick}
    >
      {label ? (
        <span className={`font-bold ${labelClassName ?? ''}`}>{label}</span>
      ) : null}
    </button>
  );
};
