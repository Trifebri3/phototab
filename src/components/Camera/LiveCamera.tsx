import { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Camera, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LiveCameraProps {
  onCapture: (imageSrc: string) => void;
  maxPhotos?: number;
  onFinish?: () => void;
}

export default function LiveCamera({ onCapture, maxPhotos = 4, onFinish }: LiveCameraProps) {
  const webcamRef = useRef<Webcam>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);
  const [photosTaken, setPhotosTaken] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 200);
      onCapture(imageSrc);
      setPhotosTaken((prev) => prev + 1);
    }
  }, [onCapture]);

  useEffect(() => {
    if (!isSessionActive) return;

    if (photosTaken >= maxPhotos) {
      setIsSessionActive(false);
      setCountdown(null);
      if (onFinish) onFinish();
      return;
    }

    setCountdown(3);
    let count = 3;
    const interval = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(interval);
        setCountdown(null);
        capture();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isSessionActive, photosTaken, maxPhotos, capture, onFinish]);

  const startSession = () => {
    if (isSessionActive) return;
    setPhotosTaken(0);
    setIsSessionActive(true);
  };

  const resetSession = () => {
    setIsSessionActive(false);
    setPhotosTaken(0);
    setCountdown(null);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-video bg-retro-dark border-8 border-retro-dark shadow-retro overflow-hidden z-10">
      {/* Retro scanline effect overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-20" />
      
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          width: 1280,
          height: 720,
          facingMode: "user"
        }}
        className="w-full h-full object-cover transform scale-x-[-1] contrast-125 saturate-150"
      />
      
      {/* Camera UI Overlay */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none z-30">
        
        {/* Top Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4 bg-white border-4 border-retro-dark px-4 py-2 shadow-retro-sm">
            <div className={`w-4 h-4 rounded-none border-2 border-retro-dark ${isSessionActive ? 'bg-retro-orange animate-pulse' : 'bg-gray-300'}`} />
            <span className="text-xl font-bold tracking-widest text-retro-dark uppercase">
              {isSessionActive ? `REC (${photosTaken}/${maxPhotos})` : 'READY'}
            </span>
          </div>
          <button 
            onClick={resetSession}
            className="pointer-events-auto p-3 bg-white border-4 border-retro-dark shadow-retro-sm hover:translate-y-1 hover:shadow-[0px_0px_0px_0px_rgba(28,26,23,1)] transition-all"
          >
            <RefreshCcw className="w-6 h-6 text-retro-dark" strokeWidth={3} />
          </button>
        </div>

        {/* Countdown */}
        <AnimatePresence>
          {countdown !== null && (
            <motion.div
              key={countdown}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center text-[12rem] font-bold text-retro-orange drop-shadow-[8px_8px_0px_rgba(28,26,23,1)] stroke-black"
              style={{ WebkitTextStroke: '6px #1c1a17' }}
            >
              {countdown}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Capture Button */}
        {!isSessionActive && (
          <div className="flex justify-center pb-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startSession}
              className="pointer-events-auto w-24 h-24 bg-retro-orange border-4 border-retro-dark flex items-center justify-center shadow-retro group hover:bg-white transition-colors"
            >
              <Camera className="w-12 h-12 text-retro-dark group-hover:text-retro-orange transition-colors" strokeWidth={2.5} />
            </motion.button>
          </div>
        )}
      </div>

      {/* Flash Effect */}
      <AnimatePresence>
        {isFlashing && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-white z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
