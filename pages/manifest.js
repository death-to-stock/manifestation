import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Manifest.module.css';
import { formatDisplayName } from '../utils/format';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export async function getStaticProps() {
  const audioDir = path.join(process.cwd(), 'public', 'audio');
  const filenames = fs.readdirSync(audioDir);
  const filteredFilenames = filenames.filter(file => file.endsWith('.m4a') || file.endsWith('.mp3'));

  const shuffledFilenames = shuffle(filteredFilenames);

  return {
    props: {
      manifestations: shuffledFilenames,
    },
  };
}

export default function Manifest({ manifestations }) {
  const [selected, setSelected] = useState([]);
  const router = useRouter();

  const toggleSelection = (item) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  const handleClaimFate = () => {
    router.push({
      pathname: '/fate',
      query: { selected: selected },
    });
  };

  const isClaimFateActive = selected.length > 0;

  return (
    <div className={styles.container}>
      <div className={styles.backgroundImageWrapper}>
        <Image
          src="/screens/menu.webp"
          alt="background"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <Head>
        <title>Manifest - DTS x TINA</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.header}>
          <Link href="/" className={styles.backButton}>
              BACK
          </Link>
      </div>

      <main className={styles.main}>
        <h1 className={styles.title}>
          YOU'VE ENTERED <br></br> THE <br></br> SUPERMANIFESTATION PORTAL
        </h1>
        <p className={styles.subtitle}>!!! SELECT WISELY !!!</p>
        <div style={{color: '#ff4500', fontSize: '2rem'}}>
        ↓
        </div>

        <div className={styles.options}>
          {manifestations.map((item) => (
            <button
              key={item}
              className={`${styles.optionButton} ${selected.includes(item) ? styles.selected : ''}`}
              onClick={() => toggleSelection(item)}
            >
              {formatDisplayName(item)}
            </button>
          ))}
        </div>
      </main>

      <div className={styles.stickyFooter}>
        <div className={styles.claimButtonContainer}>
            <button 
                className={styles.claimButton} 
                disabled={!isClaimFateActive}
                onClick={handleClaimFate}
            >
                CLAIM FATE
            </button>
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
    </div>
  );
} 