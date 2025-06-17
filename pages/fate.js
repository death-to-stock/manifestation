import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '../styles/Fate.module.css';

export default function Fate() {
  const router = useRouter();
  const { selected } = router.query;

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push({
        pathname: '/ritual',
        query: { selected: selected },
      });
    }, 3000); // 3-second delay to simulate creation

    return () => clearTimeout(timer);
  }, [router, selected]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Creating Fate - DTS x TINA</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>YOUR FATE IS BEING CREATED!</h1>
        <p className={styles.subtitle}>PLEASE HOLD...</p>
        <div className={styles.logo}>(DTS)</div>
      </main>

      <footer className={styles.footer}>
          <a
            href="https://deathtostock.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            deathtostock.com
          </a>
        </footer>
    </div>
  );
} 