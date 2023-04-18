import '../styles/globals.css';
import { Lato } from 'next/font/google';
import { GlobalContextProvider } from '@/components';
import { Navbar } from '@/components/Navbar';
import Head from 'next/head';

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
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/public/favicon.png" />
      </Head>
      <body className="relative">
        <GlobalContextProvider>
          <Navbar />
          <main className="flex justify-center w-full mx-auto max-w-screen-2xl">
            <div className="flex w-full mt-20">{children}</div>
          </main>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
