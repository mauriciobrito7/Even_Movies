/** @type {import('tailwindcss').Config} */
import { theme } from './src/app/styles/tailwind.theme';
module.exports = {
  content: [
    './src/app/pages/**/*.{js,ts,jsx,tsx}',
    './src/app/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme,
  plugins: [],
};
