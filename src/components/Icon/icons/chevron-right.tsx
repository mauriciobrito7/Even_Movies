export const ChevronRight = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    data-icon="chevron-right"
    viewBox="0 0 448 512"
    {...props}
    style={{ transform: 'rotate(90deg)' }}
    fill="currentColor"
  >
    <path
      fill="currentColor"
      d="m15.41 302.7 191.1-183.1c5.49-5.4 11.49-8.5 17.49-8.5s11.97 2.219 16.59 6.688l191.1 183.1c9.594 9.152 9.906 24.34.719 33.9-9.125 9.625-24.38 9.938-33.91.719L224 169.2l-175.4 168c-9.5 9.219-24.78 8.906-33.91-.719C5.502 327 5.814 311.8 15.41 302.7z"
    />
  </svg>
);
