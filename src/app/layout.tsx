import '../styles/globals.css';
import { Lato } from 'next/font/google';

const lato = Lato({
  weight: ['400', '700'],
  variable: '--font-lato',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={lato.variable} lang="en">
      <body>{children}</body>
    </html>
  );
}
