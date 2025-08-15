import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useAudio } from "../context/AudioContext";
import { saasco } from "../lib/saasco";

export default function Home() {
  const { playAudio } = useAudio();
  const [rotClickCount, setRotClickCount] = useState(0);
  const router = useRouter();

  const buttonTexts = [
    "ROT IN THE UNKNOWN",
    "REALLY?",
    "TOO LATE TO TURN BACK",
    "DON'T SAY I DIDN'T WARN YOU",
    "ONE MORE CLICK...",
  ];

  const handleRotClick = (e) => {
    e.preventDefault();
    if (rotClickCount < 4) {
      setRotClickCount(rotClickCount + 1);
      saasco.track("ROT Button Clicked", {
        clickCount: rotClickCount + 1,
        buttonText:
          buttonTexts[rotClickCount + 1] || buttonTexts[rotClickCount],
      });
    } else {
      saasco.track("ROT Button Final Click", {
        clickCount: rotClickCount + 1,
        destination: "visuals",
        buttonText: buttonTexts[rotClickCount],
      });
      router.push("/visuals");
    }
  };

  const handleClick = () => {
    saasco.track("Audio Activated", {
      source: "homepage",
      action: "background_audio_start",
    });
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
          <Image src="/DTSlogo.svg" alt="DTS Logo" width={51} height={16} />
          <p>X</p>
          <p>
            <a
              href="https://www.tina.zone"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                saasco.track("External Link Clicked", {
                  source: "homepage",
                  destination: "tina.zone",
                  location: "header",
                })
              }
            >
              TINA TARIGHIAN
            </a>
          </p>
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>STOP! ARE YOU LOST?</h1>

          <div className={styles.buttons} onClick={handleClick}>
            <Link
              href="/manifest"
              className={`${styles.button} ${styles.controlButton}`}
              onClick={() =>
                saasco.track("Take Control Clicked", {
                  source: "homepage",
                  destination: "manifest",
                  action: "navigation",
                })
              }
            >
              TAKE CONTROL
            </Link>
            <div
              className={`${styles.button} ${styles.rotButton}`}
              onClick={handleRotClick}
              style={{ cursor: "pointer" }}
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
          onClick={() =>
            saasco.track("External Link Clicked", {
              source: "homepage",
              destination: "deathtostock.com",
              location: "footer",
            })
          }
        >
          deathtostock.com
        </a>
      </footer>
    </div>
  );
}
