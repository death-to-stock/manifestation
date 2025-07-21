import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import fateStyles from '../styles/Fate.module.css';
import ritualStyles from '../styles/Ritual.module.css';
import { formatDisplayName } from '../utils/format';

const imageFiles = [
    'DTS_manifest_Daniel_Farò_Photos_ID12058.jpg',
    'DTS_manifest_Daniel_Farò_Photos_ID12042.jpg',
    'DTS_hang_in_there_Cecilia__DI_PAOLO_Photos_ID11950.jpg',
    'DTS_hang_in_there_Cecilia__DI_PAOLO_Photos_ID11917.jpg',
    'DTS_WANDER_Jessica_MADAVO_Photos_ID12138.jpg',
    'DTS_WANDER_Jessica_MADAVO_Photos_ID12123.jpg',
    'DTS_The_Scientist_Fanette_Guilloud_Photos_ID11891.jpg',
    'DTS_The_Scientist_Fanette_Guilloud_Photos_ID11859.jpg',
    'DTS_THE_INTERN_Shauna_Summers_Photos_ID11402.jpg',
    'DTS_THE_INTERN_Shauna_Summers_Photos_ID11372.jpg',
    'DTS_SNOWBOUND_Daniel_Farò_Photos_ID12391.jpg',
    'DTS_SNOWBOUND_Daniel_Farò_Photos_ID12389.jpg',
    'DTS_RUN_CLUB_Shauna_Summers_Photos_ID10911.jpg',
    'DTS_RUN_CLUB_Shauna_Summers_Photos_ID10908.jpg',
    'DTS_RAW_ELEMENT_Daniel_Farò_Photos_ID12893.jpg',
    'DTS_RAW_ELEMENT_Daniel_Farò_Photos_ID12863.jpg',
    'DTS_ONE_ROOF_Chris_Abatzis_Photos_ID11354.jpg',
    'DTS_ONE_ROOF_Chris_Abatzis_Photos_ID11300.jpg',
    'DTS_Liquid_Influence_Shauna_Summers_Photos_ID11540.jpg',
    'DTS_Liquid_Influence_Shauna_Summers_Photos_ID11516.jpg',
    'DTS_LUNAR_Daniel_Farò_Photos_ID11296.jpg',
    'DTS_LUNAR_Daniel_Farò_Photos_ID11293.jpg',
    'DTS_LAST_PERIOD__Agustín_Farías_Photos_ID11110.jpg',
    'DTS_LAST_PERIOD__Agustín_Farías_Photos_ID11083.jpg',
    'DTS_HI-TREK_Fanette_Guilloud_Photos_ID11231.jpg',
    'DTS_HI-TREK_Fanette_Guilloud_Photos_ID11189.jpg',
    'DTS_HEIRLOOM_Daniel_Farò_Photos_ID11453.jpg',
    'DTS_HAIR_JALISCO_gabriela_&_henrik_Photos_ID12662.jpg',
    'DTS_HAIR_JALISCO_gabriela_&_henrik_Photos_ID12626.jpg',
    'DTS_GREASY__Franco_Dupuy_Photos_ID12266.jpg',
    'DTS_GREASY__Franco_Dupuy_Photos_ID12241.jpg',
    'DTS_Forager__Daniel_Farò_Photos_ID11640.jpg',
    'DTS_Forager__Daniel_Farò_Photos_ID11577.jpg',
    'DTS_FLASHBACK_Agustín_Farías_Photos_ID12590.jpg',
    'DTS_FLASHBACK_Agustín_Farías_Photos_ID12569.jpg',
    'DTS_DECADENT_Debora_Spanhol_Photos_ID12485.jpg',
    'DTS_DECADENT_Debora_Spanhol_Photos_ID12479.jpg',
    'DTS_CORNERSTORE_Franco_Dupuy_Photos_ID12221.jpg',
    'DTS_CORNERSTORE_Franco_Dupuy_Photos_ID12182.jpg',
    'DTS_COPY_CATS_Shauna_Summers_Photos_ID12691.jpg',
    'DTS_COPY_CATS_Shauna_Summers_Photos_ID12676.jpg',
    'DTS_CHERISH_Shauna_Summers_Photos_ID11797.jpg',
    'DTS_CHERISH_Shauna_Summers_Photos_ID11796.jpg',
    'DTS_CHERISH_Shauna_Summers_Photos_ID11794.jpg',
    'DTS_BESTIES_Agustín_Farías_Photos_ID12756.jpg',
    'DTS_BESTIES_Agustín_Farías_Photos_ID12721.jpg',
    'DTS_BEDROOM_DJ_Agustín_Farías_Photos_ID11705.jpg',
    'DTS_BEDROOM_DJ_Agustín_Farías_Photos_ID11658.jpg',
    'DTS_AURA_Fanette_Guilloud_Photos_ID12989.jpg',
    'DTS_AURA_Fanette_Guilloud_Photos_ID12957.jpg',
  ];

function drawRoundedRect(ctx, x, y, width, height, radius) {
  if (width < 2 * radius) radius = width / 2;
  if (height < 2 * radius) radius = height / 2;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
  ctx.fill();
}

export default function Fate() {
  const router = useRouter();
  const { selected } = router.query;
  const [selections, setSelections] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [fileExtension, setFileExtension] = useState('');
  const [progress, setProgress] = useState(0);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    if (selected) {
        const selectedItems = Array.isArray(selected) ? selected : [selected];
        setSelections(selectedItems);

        const generateVideo = async () => {
        try {
            console.log('🎬 Video generation started');
            setProgress(5);
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            console.log('🎧 AudioContext created');

            const totalFiles = selectedItems.length;
            const audioDecodingProgress = 35;
            let filesLoaded = 0;

            const audioSources = await Promise.all(
              selectedItems.map(async (audioFile) => {
                console.log(`🎵 Fetching and decoding: ${audioFile}`);
                const response = await fetch(`/audio/${audioFile}`);
                const arrayBuffer = await response.arrayBuffer();
                const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                filesLoaded++;
                setProgress(5 + Math.round((filesLoaded / totalFiles) * audioDecodingProgress));
                const source = audioContext.createBufferSource();
                source.buffer = audioBuffer;
                source.loop = true;
                return source;
              })
            );
            console.log('✅ All audio decoded');
    
            const audioDestination = audioContext.createMediaStreamDestination();
            audioSources.forEach(source => source.connect(audioDestination));
            console.log('🔗 Audio sources connected to destination');
            audioSources.forEach(source => source.start());
            console.log('▶️ Audio sources started');
    
            setProgress(45);
            const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
            const imageUrl = `/random/${randomImage}`;
            console.log(`🖼️ Selected random image: ${imageUrl}`);
            
            const image = await new Promise((resolve, reject) => {
                const img = new window.Image();
                img.crossOrigin = "anonymous";
                img.onload = () => {
                    console.log('🖼️ Image loaded successfully');
                    resolve(img);
                };
                img.onerror = (err) => {
                    console.error('🖼️ Image failed to load:', err);
                    reject(err);
                };
                img.src = imageUrl;
            });

            const logo = await new Promise((resolve, reject) => {
              const img = new window.Image();
              img.crossOrigin = "anonymous";
              img.onload = () => {
                  console.log('🖼️ Logo loaded successfully');
                  resolve(img);
              };
              img.onerror = (err) => {
                  console.error('🖼️ Logo failed to load:', err);
                  reject(err);
              };
              img.src = '/DTSlogo.svg';
          });
    
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext('2d');
            
            setProgress(50);
            
            const fontSize = canvas.width * 0.03;
            const padding = fontSize * 0.5;
            ctx.font = `${fontSize}px sans-serif`;

            const floatingTexts = selectedItems.map((item) => {
              const text = formatDisplayName(item)
              const metrics = ctx.measureText(text);
              const textWidth = metrics.width;
              const textHeight = fontSize;
              const boxWidth = textWidth + padding * 2;
              const boxHeight = textHeight + padding * 2;
              return {
                text: text,
                x: Math.random() * (canvas.width - boxWidth),
                y: Math.random() * (canvas.height - boxHeight),
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                width: boxWidth,
                height: boxHeight,
                fontSize: textHeight,
              };
            });
    
            const videoStream = canvas.captureStream(30);
            const [videoTrack] = videoStream.getVideoTracks();
            const [audioTrack] = audioDestination.stream.getAudioTracks();
            console.log('🎥 Video and 🎤 Audio tracks obtained');
    
            const combinedStream = new MediaStream([videoTrack, audioTrack]);

            const getSupportedMimeType = () => {
                const types = [
                    { mimeType: 'video/mp4;codecs="avc1, mp4a.40.2"', extension: 'mp4' },
                    { mimeType: 'video/mp4', extension: 'mp4' },
                    { mimeType: 'video/webm;codecs=vp9,opus', extension: 'webm' },
                    { mimeType: 'video/webm;codecs=vp8,opus', extension: 'webm' },
                    { mimeType: 'video/webm', extension: 'webm' }
                ];
                for (const type of types) {
                    if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(type.mimeType)) {
                        return type;
                    }
                }
                return { mimeType: 'video/webm', extension: 'webm' }; // Fallback
            };

            const { mimeType, extension } = getSupportedMimeType();
            setFileExtension(extension);

            const recorder = new MediaRecorder(combinedStream, { mimeType });
            console.log(`📼 MediaRecorder initialized with ${mimeType}`);
            const chunks = [];
            let animationFrameId;
    
            recorder.ondataavailable = (event) => {
              if (event.data.size > 0) {
                console.log(`📦 Received data chunk: ${event.data.size} bytes`);
                chunks.push(event.data);
              }
            };
    
            recorder.onstop = () => {
              console.log('🛑 Recording stopped');
              cancelAnimationFrame(animationFrameId);
              setProgress(95);
              const videoBlob = new Blob(chunks, { type: mimeType });
              console.log(`💾 Video blob created: ${videoBlob.size} bytes, type: ${mimeType}`);
              const url = URL.createObjectURL(videoBlob);
              console.log(`🔗 Created object URL: ${url}`);
              setVideoUrl(url);
              setIsReady(true);
              setProgress(100);
              console.log('✅ UI updated to ready state');
            };

            const animate = () => {
              ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
              
              const logoWidth = canvas.width * 0.15;
              const logoHeight = (logo.height / logo.width) * logoWidth;
              const logoMargin = 20;
              ctx.drawImage(logo, canvas.width - logoWidth - logoMargin, logoMargin, logoWidth, logoHeight);

              floatingTexts.forEach((text) => {
                text.x += text.vx;
                text.y += text.vy;
    
                if (text.x <= 0 || text.x + text.width >= canvas.width) {
                  text.vx *= -1;
                }
                if (text.y <= 0 || text.y + text.height >= canvas.height) {
                  text.vy *= -1;
                }

                text.x = Math.max(0, Math.min(text.x, canvas.width - text.width));
                text.y = Math.max(0, Math.min(text.y, canvas.height - text.height));

                ctx.fillStyle = 'white';
                drawRoundedRect(ctx, text.x, text.y, text.width, text.height, text.height / 2);
                
                ctx.fillStyle = 'black';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font = `${text.fontSize}px sans-serif`;
                ctx.fillText(text.text, text.x + text.width / 2, text.y + text.height / 2);
              });
    
              animationFrameId = requestAnimationFrame(animate);
            };
    
            recorder.start();
            animate();
            console.log('🔴 Recording started');
            
            const recordingDuration = 15000;
            const recordingProgress = 40;
            const progressInterval = 100;
            const totalIntervals = recordingDuration / progressInterval;
            let currentInterval = 0;

            const progressTimer = setInterval(() => {
                currentInterval++;
                if (currentInterval <= totalIntervals) {
                    const newProgress = 50 + Math.round((currentInterval / totalIntervals) * recordingProgress);
                    setProgress(newProgress);
                } else {
                    clearInterval(progressTimer);
                }
            }, progressInterval);

            setTimeout(() => {
              clearInterval(progressTimer);
              recorder.stop();
              audioContext.close();
            }, recordingDuration); // Record for 15 seconds
  
          } catch (error) {
            console.error('❌ Failed to generate video:', error);
            router.push('/');
          }
      };

      generateVideo();
    }
  }, [router, selected]);

  const handleDownload = () => {
    if(videoUrl) {
      const a = document.createElement('a');
      a.href = videoUrl;
      a.download = `dtsxtina.${fileExtension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setDownloaded(true);
    }
  };

  if (!isReady) {
    return (
        <div className={fateStyles.container}>
            <div className={fateStyles.backgroundImageWrapper} />
            <Head>
            <title>Creating Fate - DTS x TINA</title>
            <link rel="icon" href="/favicon.ico" />
            </Head>
    
            <main className={fateStyles.main}>
            <h1 className={fateStyles.title}>YOUR FATE IS BEING CREATED!</h1>
            <p className={fateStyles.subtitle}>PLEASE HOLD...</p>
            <div className={fateStyles.logo}>
                <Image src="/DTSloading.webp" alt="Loading..." width={150} height={150} style={{ objectFit: 'contain' }} />
            </div>
            <div className={fateStyles.progressContainer}>
                <div className={fateStyles.progressBar} style={{ width: `${progress}%` }}></div>
            </div>
            <p className={fateStyles.progressText}>{progress}%</p>
            </main>
        </div>
    );
  }

  return (
    <div className={ritualStyles.container}>
      <Head>
        <title>Your Ritual - DTS x TINA</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={ritualStyles.header}>
        <Link href="/manifest" className={ritualStyles.backButton}>
            BACK
        </Link>
      </div>

      <main className={ritualStyles.main}>
        <div className={ritualStyles.floatingContainer}>
          {selections.map((item, index) => (
            <div key={index} className={ritualStyles.floatingText} style={{'--i': index}}>
              {formatDisplayName(item)}
            </div>
          ))}
        </div>
        
        <div className={ritualStyles.content}>
            <h1 className={ritualStyles.title}>YOUR CUSTOM MANIFESTATION FREQUENCY IS READY TO USE</h1>
            <p className={ritualStyles.subtitle}>Ritual: 1x listen per day</p>
            {downloaded ? (
              <button className={ritualStyles.downloadButton} onClick={() => router.push('/share')}>
                  CONTINUE
              </button>
            ) : (
              <button className={ritualStyles.downloadButton} onClick={handleDownload}>
                  DOWNLOAD
              </button>
            )}
        </div>
      </main>
    </div>
  );
} 