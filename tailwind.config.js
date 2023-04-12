/** @type {import('tailwindcss').Config} */
import { theme } from './src/app/styles/tailwind.theme';
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme,
  plugins: [],
};
