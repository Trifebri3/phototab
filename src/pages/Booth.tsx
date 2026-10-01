import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Wand2, Paintbrush, Zap, SmilePlus, Image as ImageIcon, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import LiveCamera from '../components/Camera/LiveCamera';

export default function Booth() {
  const navigate = useNavigate();
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleCapture = (imageSrc: string) => {
    setCapturedImages(prev => [...prev, imageSrc]);
  };

  const handleFinish = () => {
    setIsFinished(true);
  };

  const resetBooth = () => {
    setCapturedImages([]);
    setIsFinished(false);
  };

  return (
    <div className="flex flex-col h-screen bg-retro-cream overflow-hidden">
      
      {/* Top Navigation */}
      <header className="flex justify-between items-center p-6 shrink-0 z-10 border-b-4 border-retro-dark bg-white">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-retro-dark font-bold hover:bg-retro-yellow transition-colors bg-white border-2 border-retro-dark px-4 py-2 shadow-retro-active"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={3} />
          <span className="uppercase">BACK</span>
        </button>
        <div className="font-bold text-2xl tracking-widest text-retro-dark uppercase bg-retro-yellow px-6 py-2 border-2 border-retro-dark shadow-retro-sm">
          MINI BOOTH
        </div>
        <div className="w-24 flex justify-end">
          {capturedImages.length > 0 && (
            <button 
              onClick={resetBooth}
              className="p-2 bg-retro-orange border-2 border-retro-dark shadow-retro-sm hover:translate-y-1 hover:shadow-none transition-all"
            >
              <Trash2 className="w-5 h-5 text-retro-dark" strokeWidth={3} />
            </button>
          )}
        </div>
      </header>

      {/* Main Content (Camera / Result) */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 bg-[radial-gradient(#1c1a17_1px,transparent_1px)] [background-size:20px_20px] bg-retro-cream relative">
        
        {!isFinished ? (
          <LiveCamera onCapture={handleCapture} maxPhotos={4} onFinish={handleFinish} />
        ) : (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center z-10"
          >
            <h2 className="text-4xl font-bold text-retro-dark uppercase mb-8 bg-white border-4 border-retro-dark px-8 py-4 shadow-retro">
              PHOTO STRIP READY
            </h2>
            
            <div className="flex gap-4 p-6 bg-white border-4 border-retro-dark shadow-retro">
              {capturedImages.map((src, i) => (
                <div key={i} className="w-40 h-56 bg-retro-cream border-2 border-retro-dark p-2 flex flex-col shadow-retro-sm">
                  <img src={src} alt={`Capture ${i}`} className="w-full h-full object-cover grayscale contrast-125 brightness-110 sepia-[.3]" />
                </div>
              ))}
            </div>

            <div className="mt-12 flex gap-6">
              <button onClick={resetBooth} className="bg-retro-orange text-retro-dark font-bold text-xl px-8 py-4 border-4 border-retro-dark shadow-retro hover:translate-y-1 hover:shadow-none transition-all uppercase">
                RETAKE
              </button>
              <button 
                onClick={() => navigate('/editor', { state: { images: capturedImages } })}
                className="bg-retro-teal text-white font-bold text-xl px-8 py-4 border-4 border-retro-dark shadow-retro hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2 uppercase"
              >
                <ImageIcon className="w-6 h-6" /> TO EDITOR
              </button>
            </div>
          </motion.div>
        )}

        {/* Live Gallery Preview (during capture) */}
        {!isFinished && capturedImages.length > 0 && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute bottom-40 flex gap-4 bg-white border-4 border-retro-dark p-4 shadow-retro z-20"
          >
            {capturedImages.map((src, i) => (
              <div key={i} className="w-16 h-24 bg-white overflow-hidden border-2 border-retro-dark shadow-retro-sm transform -rotate-2 hover:rotate-0 transition-transform">
                <img src={src} alt={`Capture ${i}`} className="w-full h-full object-cover transform scale-x-[-1] grayscale contrast-125 brightness-110 sepia-[.3]" />
              </div>
            ))}
          </motion.div>
        )}
      </main>

      {/* Bottom Mode Selector */}
      <footer className="h-32 shrink-0 bg-white border-t-4 border-retro-dark flex justify-center items-center gap-6 px-6 z-10">
        
        <ModeButton icon={<SmilePlus strokeWidth={2.5} />} label="FUNNY" color="bg-retro-yellow" disabled={isFinished} />
        <ModeButton icon={<Paintbrush strokeWidth={2.5} />} label="CARTOON" color="bg-retro-teal" disabled={isFinished} />
        <ModeButton icon={<Wand2 strokeWidth={2.5} />} label="MAGIC" color="bg-retro-blue" isActive disabled={isFinished} />
        <ModeButton icon={<Zap strokeWidth={2.5} />} label="CUTE" color="bg-retro-orange" disabled={isFinished} />

      </footer>
    </div>
  );
}

function ModeButton({ icon, label, color, isActive = false, disabled = false }: { icon: React.ReactNode, label: string, color: string, isActive?: boolean, disabled?: boolean }) {
  return (
    <motion.button 
      whileHover={disabled ? {} : { scale: 1.05, y: -4 }}
      whileTap={disabled ? {} : { scale: 0.95, y: 0 }}
      disabled={disabled}
      className={`flex flex-col items-center gap-3 w-28 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <div className={`w-16 h-16 flex items-center justify-center border-4 border-retro-dark ${color} ${isActive ? 'shadow-[0px_0px_0px_0px_rgba(28,26,23,1)] translate-y-2' : 'shadow-retro'} transition-all text-white`}>
        {icon}
      </div>
      <span className="text-sm font-bold text-retro-dark tracking-widest uppercase">{label}</span>
    </motion.button>
  );
}
