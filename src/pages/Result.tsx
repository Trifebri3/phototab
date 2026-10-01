import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Home, Download, Share2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';

interface ResultState {
  resultImage: string;
}

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ResultState;

  // If no image, redirect back
  if (!state?.resultImage) {
    return <Navigate to="/" replace />;
  }

  const downloadImage = () => {
    const link = document.createElement('a');
    link.download = 'retro-booth-strip.jpg';
    link.href = state.resultImage;
    link.click();
  };

  // Dummy URL for the QR code
  const downloadUrl = "https://miniphotobooth.app/download/demo-12345";

  return (
    <div className="flex flex-col h-screen bg-retro-cream overflow-hidden">
      
      {/* Header */}
      <header className="flex justify-between items-center p-6 shrink-0 z-10 border-b-4 border-retro-dark bg-white">
        <div className="font-bold text-2xl tracking-widest text-retro-dark uppercase bg-retro-teal text-white px-6 py-2 border-2 border-retro-dark shadow-retro-sm">
          RESULT
        </div>
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 font-bold px-6 py-2 border-2 border-retro-dark transition-all uppercase bg-retro-orange text-retro-dark hover:translate-y-1 hover:shadow-none shadow-retro-active"
        >
          <Home className="w-5 h-5" strokeWidth={3} />
          DONE
        </button>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center gap-12 p-8 overflow-y-auto bg-[radial-gradient(#1c1a17_1px,transparent_1px)] [background-size:20px_20px]">
        
        {/* Left: Final Image Preview */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-64 md:w-80 border-8 border-retro-dark shadow-retro bg-white rotate-[-2deg] hover:rotate-0 transition-transform duration-300"
        >
          <img src={state.resultImage} alt="Final Strip" className="w-full h-auto" />
        </motion.div>

        {/* Right: Actions & QR */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-8 bg-white border-4 border-retro-dark p-8 shadow-retro max-w-sm text-center"
        >
          <div>
            <h2 className="text-3xl font-black text-retro-dark uppercase tracking-tighter mb-2">
              IT'S READY!
            </h2>
            <p className="text-sm font-bold uppercase border-t-2 border-b-2 border-retro-dark py-2">
              SCAN TO DOWNLOAD
            </p>
          </div>

          {/* QR Code */}
          <div className="bg-retro-cream p-4 border-4 border-retro-dark shadow-retro-sm">
            <QRCodeSVG 
              value={downloadUrl} 
              size={180} 
              fgColor="#1C1A17" 
              bgColor="#F4ECD8" 
              level="H" 
            />
          </div>

          <div className="flex flex-col gap-4 w-full">
            <button 
              onClick={downloadImage}
              className="bg-retro-blue text-white font-bold text-xl px-6 py-4 border-4 border-retro-dark shadow-retro-sm hover:translate-y-1 hover:shadow-none transition-all flex justify-center items-center gap-3 uppercase"
            >
              <Download className="w-6 h-6" strokeWidth={3} /> DIRECT SAVE
            </button>
            <button 
              onClick={() => alert('Fitur Share akan terhubung dengan backend!')}
              className="bg-retro-yellow text-retro-dark font-bold text-xl px-6 py-4 border-4 border-retro-dark shadow-retro-sm hover:translate-y-1 hover:shadow-none transition-all flex justify-center items-center gap-3 uppercase"
            >
              <Share2 className="w-6 h-6" strokeWidth={3} /> SHARE
            </button>
          </div>

        </motion.div>

      </main>
    </div>
  );
}
