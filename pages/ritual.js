import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as Tone from 'tone';
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

  useEffect(() => {
    // Ensure Tone.js is started on user interaction
    const startAudio = async () => {
      await Tone.start();
      console.log('Audio context started');
    };
    document.body.addEventListener('click', startAudio, { once: true });

    if (selected) {
        const selectedItems = Array.isArray(selected) ? selected : [selected];
        setSelections(selectedItems);
    }

    return () => {
        document.body.removeEventListener('click', startAudio);
    }
  }, [selected]);

  useEffect(() => {
    if (selections.length > 0) {
      const players = selections.map(item => {
        const audioPath = `/audio/${item}`;
        if (audioPath) {
            return new Tone.Player(audioPath).toDestination();
        }
        return null;
      }).filter(Boolean);

      Tone.loaded().then(() => {
        players.forEach(player => player.start());
      });

      return () => {
        players.forEach(player => {
            if (player) {
                player.stop();
                player.dispose();
            }
        });
      };
    }
  }, [selections]);

  const handleDownload = () => {
    console.log('Downloading ritual...');
    alert('Downloading ritual MP4...');
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