import '../styles/globals.css';
import { Lato } from 'next/font/google';
import { Navbar } from '@/components/Navbar';

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
      <body className="relative">
        <Navbar />
        <main className="flex justify-center w-full mx-auto max-w-screen-2xl">
          <div className="flex w-full mt-20">{children}</div>
        </main>
      </body>
    </html>
  );
}
