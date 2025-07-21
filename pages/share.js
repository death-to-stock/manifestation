import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Share.module.css';
import { useRouter } from 'next/router';

export default function Share() {
  const router = useRouter();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'DTS x TINA',
          text: 'I found my frequency.',
          url: window.location.origin,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>DTS x TINA - Share</title>
        <meta name="description" content="Manifestation Optimizer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Image
        src="/screens/share.webp"
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className={styles.backgroundImage}
      />

      <main className={styles.main}>
        <div className={styles.content}>
          <p className={styles.heading}>
            THE MORE ENERGY YOU SUMMON, THE STRONGER THE MANIFESTATION.
          </p>
          <p className={styles.subheading}>
            BRING OTHERS INTO THE FIELD.
          </p>

          <div className={styles.buttons}>
            <button onClick={handleShare} className={`${styles.button} ${styles.sacrificeButton}`}>
              RECRUIT FRIENDS
            </button>
            <Link href="/" className={`${styles.button} ${styles.manifestButton}`}>
              MANIFEST AGAIN
            </Link>
          </div>
        </div>
        <div className={styles.toast}>
            <p>🔍 Psst! Find your frequency in your Files (downloads folder), and share to stories</p>
        </div>
      </main>
    </div>
  );
} 