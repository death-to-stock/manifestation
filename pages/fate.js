import Head from 'next/head';
import Image from 'next/image';
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

export default function Fate() {
  const router = useRouter();
  const { selected } = router.query;
  const [selections, setSelections] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    if (selected) {
        const selectedItems = Array.isArray(selected) ? selected : [selected];
        setSelections(selectedItems);

        const generateVideo = async () => {
        try {
            console.log('🎬 Video generation started');
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            console.log('🎧 AudioContext created');

            const audioSources = await Promise.all(
              selectedItems.map(async (audioFile) => {
                console.log(`🎵 Fetching and decoding: ${audioFile}`);
                const response = await fetch(`/audio/${audioFile}`);
                const arrayBuffer = await response.arrayBuffer();
                const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
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
    
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0);
            console.log('🎨 Image drawn to canvas');
    
            const videoStream = canvas.captureStream(30);
            const [videoTrack] = videoStream.getVideoTracks();
            const [audioTrack] = audioDestination.stream.getAudioTracks();
            console.log('🎥 Video and 🎤 Audio tracks obtained');
    
            const combinedStream = new MediaStream([videoTrack, audioTrack]);
            const recorder = new MediaRecorder(combinedStream, { mimeType: 'video/webm' });
            console.log('📼 MediaRecorder initialized');
            const chunks = [];
    
            recorder.ondataavailable = (event) => {
              if (event.data.size > 0) {
                console.log(`📦 Received data chunk: ${event.data.size} bytes`);
                chunks.push(event.data);
              }
            };
    
            recorder.onstop = () => {
              console.log('🛑 Recording stopped');
              const videoBlob = new Blob(chunks, { type: 'video/webm' });
              console.log(`💾 Video blob created: ${videoBlob.size} bytes`);
              const url = URL.createObjectURL(videoBlob);
              console.log(`🔗 Created object URL: ${url}`);
              setVideoUrl(url);
              setIsReady(true);
              console.log('✅ UI updated to ready state');
            };
    
            recorder.start();
            console.log('🔴 Recording started');
            setTimeout(() => {
              recorder.stop();
              audioContext.close();
            }, 15000); // Record for 15 seconds
  
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
      a.download = 'dtsxtina.webm';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      setTimeout(() => {
        router.push('/share');
      }, 1000);
    }
  };

  if (!isReady) {
    return (
        <div className={fateStyles.container}>
            <Head>
            <title>Creating Fate - DTS x TINA</title>
            <link rel="icon" href="/favicon.ico" />
            </Head>
    
            <main className={fateStyles.main}>
            <h1 className={fateStyles.title}>YOUR FATE IS BEING CREATED!</h1>
            <p className={fateStyles.subtitle}>PLEASE HOLD...</p>
            <div className={fateStyles.logo}>
                <Image src="/DTSloading.gif" alt="Loading..." width={150} height={150} />
            </div>
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
            <button className={ritualStyles.downloadButton} onClick={handleDownload}>
                DOWNLOAD
            </button>
        </div>
      </main>
    </div>
  );
} 