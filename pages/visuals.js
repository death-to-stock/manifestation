import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Visuals.module.css';

export default function Visuals() {
  const handleDownload = async () => {
    try {
      const response = await fetch('/api/download-free-assets');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'free-visuals.zip';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
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
        <div className={styles.blurb}>
          <p>🔍 Psst! Find them in your Files (downloads folder)</p>
        </div>
    </div>
  );
} 