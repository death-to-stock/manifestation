import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '../styles/Fate.module.css';

export default function Fate() {
  const router = useRouter();
  const { selected } = router.query;

  useEffect(() => {
    if (selected) {
      const selectedItems = Array.isArray(selected) ? selected : [selected];
      
      const generateVideo = async () => {
        const response = await fetch('/api/generate-video', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ selected: selectedItems }),
        });
        
        if (response.ok) {
          const { videoId } = await response.json();
          router.push({
            pathname: '/ritual',
            query: { videoId: videoId, selected: selectedItems },
          });
        } else {
          console.error('Failed to generate video');
          // Handle error, maybe redirect to an error page or back to the start
          router.push('/');
        }
      };

      generateVideo();
    }
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
        <div className={styles.logo}>
          <Image src="/DTSloading.gif" alt="Loading..." width={150} height={150} />
        </div>
      </main>
    </div>
  );
} 