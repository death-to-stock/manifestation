import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Visuals.module.css';

export default function Visuals() {
  const handleDownload = () => {
    // For now, we'll just log a message.
    // Later, this will trigger a download of visual assets.
    console.log('Downloading visuals...');
    alert('Downloading visuals...');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Visuals - DTS x TINA</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
            <Link href="/" className={styles.backButton}>
                BACK
            </Link>
        </div>

        <h1 className={styles.title}>STAY LOST</h1>
        <p className={styles.subtitle}>It's the only way to discover something new</p>
        
        <button className={styles.downloadButton} onClick={handleDownload}>
          DOWNLOAD FREE VISUALS
        </button>
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