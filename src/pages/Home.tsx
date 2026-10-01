import { useNavigate } from 'react-router-dom';
import { Camera, Ticket, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden bg-retro-cream p-6">
      
      {/* Decorative retro shapes instead of gradients */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-retro-orange border-4 border-retro-dark rounded-full shadow-retro z-0" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-retro-teal border-4 border-retro-dark shadow-retro z-0" />
      <div className="absolute top-40 right-40 w-16 h-16 bg-retro-yellow border-4 border-retro-dark rotate-12 z-0" />

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="z-10 flex flex-col items-center p-12 bg-white border-4 border-retro-dark shadow-retro text-center max-w-lg w-full relative"
      >
        {/* Corner decorations */}
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-retro-dark" />
        <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-retro-dark" />
        
        <div className="w-24 h-24 bg-retro-yellow border-4 border-retro-dark flex items-center justify-center mb-8 shadow-retro-sm transform -rotate-3">
          <Camera className="w-12 h-12 text-retro-dark" strokeWidth={3} />
        </div>
        
        <h1 className="text-5xl font-bold text-retro-dark mb-4 uppercase tracking-tighter">
          MINI BOOTH
        </h1>
        <p className="text-lg text-retro-dark mb-10 font-bold uppercase border-t-4 border-b-4 border-retro-dark py-2 w-full">
          BUKAN CUMA FOTO. BIKIN DUNIAMU SENDIRI.
        </p>

        <motion.button
          whileHover={{ scale: 1.05, x: -4, y: -4, boxShadow: '12px 12px 0px 0px rgba(28,26,23,1)' }}
          whileTap={{ scale: 0.95, x: 4, y: 4, boxShadow: '0px 0px 0px 0px rgba(28,26,23,1)' }}
          onClick={() => navigate('/booth')}
          className="bg-retro-orange text-retro-dark border-4 border-retro-dark font-bold text-2xl py-4 px-12 shadow-retro flex items-center gap-4 transition-all duration-200"
        >
          <Ticket className="w-8 h-8" strokeWidth={3} />
          START NOW
        </motion.button>
        
        <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm font-bold text-retro-dark uppercase">
          <span className="bg-retro-teal text-white border-2 border-retro-dark px-4 py-2 shadow-retro-sm flex items-center gap-2">
            <Star className="w-4 h-4" /> NUSANTARA THEME
          </span>
          <span className="bg-retro-blue text-white border-2 border-retro-dark px-4 py-2 shadow-retro-sm flex items-center gap-2">
            <Star className="w-4 h-4" /> MAGIC FILTERS
          </span>
        </div>
      </motion.div>
    </div>
  );
}
