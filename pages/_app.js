import '../styles/globals.css';
import { Work_Sans } from 'next/font/google'
import { AudioProvider } from '../context/AudioContext';
import { useEffect } from 'react';
import { saasco } from '../lib/saasco';

const work_sans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
})

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    saasco.init();
  }, []);

  return (
    <AudioProvider>
      <main className={`${work_sans.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </AudioProvider>
  );
}

export default MyApp;
