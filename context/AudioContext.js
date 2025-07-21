import { createContext, useContext, useRef } from 'react';

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const audioRef = useRef(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        // Autoplay was prevented.
        console.error("Audio play failed:", error);
      });
    }
  };

  return (
    <AudioContext.Provider value={{ playAudio }}>
      <audio ref={audioRef} src="/background_optimized.mp3" loop preload="none" />
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
} 