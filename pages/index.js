import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import { useAudio } from '../context/AudioContext';

export default function Home() {
  const { playAudio } = useAudio();
  const [rotClickCount, setRotClickCount] = useState(0);
  const router = useRouter();

  const buttonTexts = [
    "ROT IN THE UNKNOWN",
    "REALLY?",
    "TOO LATE TO TURN BACK",
    "DON'T SAY I DIDN'T WARN YOU",
    "ONE MORE CLICK..."
  ];

  const handleRotClick = (e) => {
    e.preventDefault();
    if (rotClickCount < 4) {
      setRotClickCount(rotClickCount + 1);
    } else {
      router.push('/visuals');
    }
  };

  const handleClick = () => {
    playAudio();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>DTS x TINA</title>
        <meta name="description" content="Manifestation Optimizer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
          <p>(<b>DTS</b>)</p>
          <p>X</p>
          <p>TINA TARIGHIAN</p>
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>
            STOP! ARE YOU LOST?
          </h1>

          <div className={styles.buttons} onClick={handleClick}>
            <Link href="/manifest" className={`${styles.button} ${styles.controlButton}`}>
              TAKE CONTROL
            </Link>
            <div
              className={`${styles.button} ${styles.rotButton}`}
              onClick={handleRotClick}
              style={{ cursor: 'pointer' }}
            >
              {buttonTexts[rotClickCount]}
            </div>
          </div>
        </div>
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
