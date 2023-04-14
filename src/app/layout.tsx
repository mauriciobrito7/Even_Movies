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
      <body>
      <main className="flex justify-center w-full mx-auto max-w-screen-xl">
        {children}
      </main>
      </body>
    </html>
  );
}
