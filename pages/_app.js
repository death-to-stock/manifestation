import '../styles/globals.css';
import { Work_Sans } from 'next/font/google'

const work_sans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
})

function MyApp({ Component, pageProps }) {
  return (
    <main className={`${work_sans.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
