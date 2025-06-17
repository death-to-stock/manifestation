import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>DTS x TINA</title>
        <meta name="description" content="Manifestation Optimizer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
          <p><b>(DTS)</b></p>
          <p>x</p>
          <p>TINA TARIGHIAN</p>
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>
            STOP! ARE YOU LOST?
          </h1>

          <div className={styles.buttons}>
            <Link href="/manifest" className={`${styles.button} ${styles.controlButton}`}>
              TAKE CONTROL
            </Link>
            <Link href="/visuals" className={`${styles.button} ${styles.rotButton}`}>
              ROT IN THE UNKNOWN
            </Link>
          </div>
        </div>

        <footer className={styles.footer}>
          <a
            href="https://deathtostock.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            deathtostock.com
          </a>
        </footer>
      </main>
    </div>
  );
}
