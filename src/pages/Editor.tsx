import { useState, useRef } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { ArrowLeft, Download, Plus, Sparkles, Type, LayoutTemplate, Palette, Sticker as StickerIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import * as htmlToImage from 'html-to-image';

interface EditorState {
  images: string[];
}

interface Sticker {
  id: string;
  type: 'text' | 'shape';
  content: string;
  x: number;
  y: number;
  color: string;
}

type Tab = 'layout' | 'theme' | 'sticker';
type LayoutType = 'strip' | 'grid';
type ThemeType = 'white' | 'yellow' | 'dark' | 'teal';

export default function Editor() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as EditorState;
  const canvasRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<Tab>('sticker');
  const [layout, setLayout] = useState<LayoutType>('strip');
  const [theme, setTheme] = useState<ThemeType>('white');
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  if (!state?.images || state.images.length === 0) {
    return <Navigate to="/" replace />;
  }

  const addSticker = (content: string, type: 'text' | 'shape', color: string) => {
    setStickers([
      ...stickers,
      {
        id: Math.random().toString(36).substr(2, 9),
        type,
        content,
        x: 50,
        y: 100 + stickers.length * 20,
        color
      }
    ]);
  };

  const exportImage = async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);
    
    try {
      const dataUrl = await htmlToImage.toJpeg(canvasRef.current, { quality: 0.95 });
      navigate('/result', { state: { resultImage: dataUrl } });
    } catch (err) {
      console.error('Failed to export image', err);
    } finally {
      setIsExporting(false);
    }
  };

  const themeClasses = {
    white: 'bg-white text-retro-dark',
    yellow: 'bg-retro-yellow text-retro-dark',
    dark: 'bg-retro-dark text-white border-white',
    teal: 'bg-retro-teal text-white border-white'
  };

  return (
    <div className="flex flex-col h-screen bg-retro-cream overflow-hidden">
      
      {/* Header */}
      <header className="flex justify-between items-center p-6 shrink-0 z-10 border-b-4 border-retro-dark bg-white">
        <button 
          onClick={() => navigate('/booth')}
          className="flex items-center gap-2 text-retro-dark font-bold hover:bg-retro-yellow transition-colors bg-white border-2 border-retro-dark px-4 py-2 shadow-retro-active"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={3} />
          <span className="uppercase">BACK</span>
        </button>
        <div className="font-bold text-2xl tracking-widest text-retro-dark uppercase bg-retro-teal text-white px-6 py-2 border-2 border-retro-dark shadow-retro-sm">
          EDITOR
        </div>
        <button 
          onClick={exportImage}
          disabled={isExporting}
          className={`flex items-center gap-2 font-bold px-6 py-2 border-2 border-retro-dark transition-all uppercase ${isExporting ? 'bg-gray-400 text-gray-700' : 'bg-retro-orange text-retro-dark hover:translate-y-1 hover:shadow-none shadow-retro-active'}`}
        >
          <Download className="w-5 h-5" strokeWidth={3} />
          {isExporting ? 'SAVING...' : 'SAVE'}
        </button>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex overflow-hidden bg-[radial-gradient(#1c1a17_1px,transparent_1px)] [background-size:20px_20px]">
        
        {/* Left: Sidebar Tabs */}
        <div className="w-20 bg-white border-r-4 border-retro-dark flex flex-col items-center py-6 gap-6 z-20 shadow-retro">
          <TabBtn icon={<StickerIcon />} label="STICKER" active={activeTab === 'sticker'} onClick={() => setActiveTab('sticker')} />
          <TabBtn icon={<LayoutTemplate />} label="LAYOUT" active={activeTab === 'layout'} onClick={() => setActiveTab('layout')} />
          <TabBtn icon={<Palette />} label="THEME" active={activeTab === 'theme'} onClick={() => setActiveTab('theme')} />
        </div>

        {/* Left: Content Panel */}
        <aside className="w-72 bg-white border-r-4 border-retro-dark p-6 overflow-y-auto z-10">
          {activeTab === 'sticker' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-left-4">
              <h3 className="text-xl font-bold text-retro-dark uppercase border-b-4 border-retro-dark pb-2 mb-4">
                STICKERS
              </h3>
              <div>
                <p className="text-sm font-bold text-retro-dark mb-3 uppercase flex items-center gap-2">
                  <Type className="w-4 h-4" /> Word Art
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <StickerBtn onClick={() => addSticker('RAD', 'text', 'bg-retro-yellow text-retro-dark')} content="RAD" color="bg-retro-yellow text-retro-dark" />
                  <StickerBtn onClick={() => addSticker('COOL', 'text', 'bg-retro-blue text-white')} content="COOL" color="bg-retro-blue text-white" />
                  <StickerBtn onClick={() => addSticker('OMG', 'text', 'bg-retro-orange text-retro-dark')} content="OMG" color="bg-retro-orange text-retro-dark" />
                  <StickerBtn onClick={() => addSticker('199X', 'text', 'bg-retro-dark text-white')} content="199X" color="bg-retro-dark text-white" />
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-retro-dark mb-3 uppercase flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Shapes
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <StickerBtn onClick={() => addSticker('★', 'shape', 'bg-retro-yellow text-retro-dark')} content="★" color="bg-retro-yellow text-xl text-retro-dark" />
                  <StickerBtn onClick={() => addSticker('⚡', 'shape', 'bg-retro-orange text-retro-dark')} content="⚡" color="bg-retro-orange text-xl text-retro-dark" />
                  <StickerBtn onClick={() => addSticker('❤', 'shape', 'bg-retro-teal text-white')} content="❤" color="bg-retro-teal text-xl text-white" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'layout' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-left-4">
              <h3 className="text-xl font-bold text-retro-dark uppercase border-b-4 border-retro-dark pb-2 mb-4">
                LAYOUT
              </h3>
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => setLayout('strip')}
                  className={`border-4 border-retro-dark p-4 flex flex-col items-center gap-2 transition-all ${layout === 'strip' ? 'bg-retro-dark text-white' : 'bg-white hover:bg-gray-100'}`}
                >
                  <div className="w-8 h-24 border-2 border-current flex flex-col gap-1 p-1">
                    <div className="w-full h-full bg-current opacity-50" />
                    <div className="w-full h-full bg-current opacity-50" />
                    <div className="w-full h-full bg-current opacity-50" />
                    <div className="w-full h-full bg-current opacity-50" />
                  </div>
                  <span className="font-bold">CLASSIC STRIP</span>
                </button>

                <button 
                  onClick={() => setLayout('grid')}
                  className={`border-4 border-retro-dark p-4 flex flex-col items-center gap-2 transition-all ${layout === 'grid' ? 'bg-retro-dark text-white' : 'bg-white hover:bg-gray-100'}`}
                >
                  <div className="w-16 h-16 border-2 border-current grid grid-cols-2 gap-1 p-1">
                    <div className="w-full h-full bg-current opacity-50" />
                    <div className="w-full h-full bg-current opacity-50" />
                    <div className="w-full h-full bg-current opacity-50" />
                    <div className="w-full h-full bg-current opacity-50" />
                  </div>
                  <span className="font-bold">2x2 GRID</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'theme' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-left-4">
              <h3 className="text-xl font-bold text-retro-dark uppercase border-b-4 border-retro-dark pb-2 mb-4">
                THEME
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <ThemeBtn color="bg-white" name="CLASSIC" active={theme === 'white'} onClick={() => setTheme('white')} />
                <ThemeBtn color="bg-retro-yellow" name="SUNSET" active={theme === 'yellow'} onClick={() => setTheme('yellow')} />
                <ThemeBtn color="bg-retro-teal" name="OCEAN" active={theme === 'teal'} onClick={() => setTheme('teal')} />
                <ThemeBtn color="bg-retro-dark" name="MIDNIGHT" active={theme === 'dark'} onClick={() => setTheme('dark')} />
              </div>
            </div>
          )}
        </aside>

        {/* Right/Center: Canvas */}
        <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
          
          {/* Canvas Container */}
          <div 
            ref={canvasRef}
            className={`transition-all duration-300 ${layout === 'strip' ? 'w-[360px] min-h-[900px]' : 'w-[600px] min-h-[600px]'} border-8 border-retro-dark shadow-retro p-6 relative flex flex-col items-center ${themeClasses[theme]}`}
            style={{ transformOrigin: 'top center' }}
          >
            {/* Header Strip */}
            <div className={`w-full text-center mb-6 border-b-4 pb-2 ${theme === 'dark' || theme === 'teal' ? 'border-white' : 'border-retro-dark'}`}>
              <h2 className="text-3xl font-black tracking-tighter">MINI BOOTH</h2>
              <p className="text-sm font-bold mt-1">VOL. 01</p>
            </div>

            {/* Photos Container */}
            <div className={`w-full z-0 ${layout === 'strip' ? 'flex flex-col gap-4' : 'grid grid-cols-2 gap-4'}`}>
              {state.images.map((src, i) => (
                <div key={i} className={`w-full aspect-[4/3] border-4 p-2 shadow-retro-sm ${theme === 'dark' || theme === 'teal' ? 'bg-black border-white' : 'bg-retro-cream border-retro-dark'}`}>
                  <img src={src} alt={`Capture ${i}`} className="w-full h-full object-cover grayscale contrast-125 brightness-110 sepia-[.3]" />
                </div>
              ))}
            </div>

            {/* Footer Strip */}
            <div className={`w-full text-center mt-6 pt-4 border-t-4 ${theme === 'dark' || theme === 'teal' ? 'border-white' : 'border-retro-dark'}`}>
              <p className="font-bold">NUSANTARA PACK</p>
              <p className="text-xs font-bold mt-1 tracking-widest">{new Date().getFullYear()} / JAKARTA</p>
            </div>

            {/* Draggable Stickers Layer */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {stickers.map((sticker) => (
                <motion.div
                  key={sticker.id}
                  drag
                  dragMomentum={false}
                  className={`absolute pointer-events-auto cursor-move font-black border-4 px-3 py-1 shadow-retro-sm ${sticker.color} ${theme === 'dark' || theme === 'teal' ? 'border-white' : 'border-retro-dark'}`}
                  initial={{ x: 100, y: 100, scale: 0 }}
                  animate={{ scale: 1 }}
                  whileDrag={{ scale: 1.1, zIndex: 50, shadow: '8px 8px 0px 0px rgba(28,26,23,1)' }}
                >
                  {sticker.content}
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}

function TabBtn({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 group w-full`}
    >
      <div className={`p-3 border-4 border-retro-dark transition-all ${active ? 'bg-retro-orange shadow-[2px_2px_0px_rgba(28,26,23,1)] translate-x-1 translate-y-1' : 'bg-white shadow-retro-sm group-hover:bg-gray-100'}`}>
        {icon}
      </div>
      <span className="text-[10px] font-bold text-retro-dark mt-1">{label}</span>
    </button>
  );
}

function StickerBtn({ onClick, content, color }: { onClick: () => void, content: string, color: string }) {
  return (
    <button 
      onClick={onClick}
      className={`border-4 border-retro-dark py-2 font-bold flex items-center justify-center shadow-retro-active hover:translate-y-1 hover:shadow-none transition-all ${color}`}
    >
      {content}
    </button>
  );
}

function ThemeBtn({ name, color, active, onClick }: { name: string, color: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-2 border-4 border-retro-dark transition-all ${active ? 'bg-gray-100 shadow-[2px_2px_0px_rgba(28,26,23,1)] translate-y-1' : 'bg-white shadow-retro-sm hover:bg-gray-50'}`}
    >
      <div className={`w-full h-12 border-2 border-retro-dark ${color}`} />
      <span className="text-xs font-bold text-retro-dark">{name}</span>
    </button>
  );
}
