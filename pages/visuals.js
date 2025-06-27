import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Visuals.module.css';

export default function Visuals() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Visuals - DTS x TINA</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <a href="https://deathtostock.com" target="_blank" rel="noopener noreferrer" className={styles.logo}>
        <Image src="/DTSlogo.svg" alt="DTS Logo" width={51} height={16} />
      </a>

      <div className={styles.header}>
          <Link href="/" className={styles.backButton}>
              BACK
          </Link>
      </div>

      <main className={styles.main}>
        <h1 className={styles.title}>STAY LOST</h1>
        <p className={styles.subtitle}>It's the only way to discover something new</p>
        
        <a href="https://deathtostock.s3.us-east-1.amazonaws.com/2025/ARE+YOU+STILL+LOST%3F+.zip" target="_blank" rel="noopener noreferrer" className={styles.downloadButton}>
          DOWNLOAD FREE VISUALS
        </a>
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
        <div className={styles.blurb}>
          <p>🔍 Psst! Find them in your Files (downloads folder)</p>
        </div>
    </div>
  );
} 