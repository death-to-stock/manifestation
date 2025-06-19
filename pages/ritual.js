import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/Ritual.module.css';
import { formatDisplayName } from '../utils/format';

// We'll create these placeholder audio files later
const aúdioManifestations = {
    'Bigger Butt': '/audio/sound1.mp3',
    'More Money': '/audio/sound2.mp3',
    'Change Eye Color: Blue': '/audio/sound3.mp3',
    'Dream Body': '/audio/sound4.mp3',
    'Make Crush\'s S.O. Disappear': '/audio/sound5.mp3',
    'Example Of A Really Long Button': '/audio/sound6.mp3',
  };

export default function Ritual() {
  const router = useRouter();
  const { selected } = router.query;
  const [selections, setSelections] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    const url = sessionStorage.getItem('generatedVideoUrl');
    if (url) {
        setVideoUrl(url);
    }
    if (selected) {
        const selectedItems = Array.isArray(selected) ? selected : [selected];
        setSelections(selectedItems);
    }
  }, [selected]);

  const handleDownload = () => {
    if(videoUrl) {
      const a = document.createElement('a');
      a.href = videoUrl;
      a.download = 'dtsxtina.mp4';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      setTimeout(() => {
        router.push('/share');
      }, 1000);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Your Ritual - DTS x TINA</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.floatingContainer}>
          {selections.map((item, index) => (
            <div key={index} className={styles.floatingText} style={{'--i': index}}>
              {formatDisplayName(item)}
            </div>
          ))}
        </div>
        
        <div className={styles.content}>
            <h1 className={styles.title}>YOUR CUSTOM MANIFESTATION FREQUENCY IS READY TO USE</h1>
            <p className={styles.subtitle}>Ritual: 1x listen per day</p>
            <button className={styles.downloadButton} onClick={handleDownload}>
                DOWNLOAD
            </button>
        </div>
      </main>
    </div>
  );
} 