import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Bot, Sparkles } from 'lucide-react';

const greetings = [
  { text: "Hello", lang: "English", proc: "Initializing Neural Links..." },
  { text: "Sawubona", lang: "isiZulu", proc: "ngiyalungiselela..." },
  { text: "Molo", lang: "isiXhosa", proc: "Ndiyalungiselela..." },
  { text: "Dumela", lang: "Sesotho", proc: "kea itokisetsa..." },
  { text: "Goeie dag", lang: "Afrikaans", proc: "ek maak gereed..." },
  { text: "Thobela", lang: "Sepedi", proc: "ke a itokišetša..." },
  { text: "Lotjhani", lang: "isiNdebele", proc: "Ngiyazilungiselela..." },
  { text: "Nndaa", lang: "Tshivenda", proc: "ndi khou di lugisa..." },
  { text: "Avuxeni", lang: "Xitsonga", proc: "U thoma..." },
  { text: "Lidumele", lang: "siSwati", proc: "ndzi le ku lunghiseleleni..." },
  { text: "Dumelang", lang: "Setswana", proc: "Ke a ipaakanya..." },
];

export default function LandingPage() {
  const [index, setIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedLang, setSelectedLang] = useState<any>(null);
  const { setLanguage } = useLanguage();
  const navigate = useNavigate();

  // Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const saucerX = useSpring(mouseX, { stiffness: 100, damping: 25 });
  const saucerY = useSpring(mouseY, { stiffness: 100, damping: 25 });

  useEffect(() => {
    if (isProcessing) return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX + 20);
      mouseY.set(e.clientY - 20);
    };
    window.addEventListener("mousemove", handleMouseMove);
    const timer = setInterval(() => setIndex((p) => (p + 1) % greetings.length), 2500);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(timer);
    };
  }, [isProcessing]);

  const handleLanguageSelect = (item: typeof greetings[0]) => {
    // 1. Lock the UI
    setIsProcessing(true);
    setSelectedLang(item);

    // 2. Fly saucer to Garry's head
    mouseX.set(window.innerWidth / 2 - 12);
    mouseY.set(window.innerHeight / 2 - 160);

    // 3. ACTUAL DELAY: Wait 2.5 seconds so user sees the "Thinking" state
    setTimeout(() => {
      setLanguage(item.lang.toLowerCase() as any);
      navigate('/onboarding');
    }, 2500); 
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-between py-12 px-6 overflow-hidden relative bg-[#050505]">
      
      {/* THE SAUCER */}
      <motion.div style={{ x: saucerX, y: saucerY, position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 100 }}>
        <Sparkles size={24} className="text-gold-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl gap-12">
        
        {/* BOT ICON - More space around it */}
        <motion.div animate={isProcessing ? { y: [0, -10, 0], scale: 1.1 } : { scale: 1 }}>
          <div className="relative bg-gradient-to-b from-gold-500/20 to-transparent p-[2px] rounded-3xl border border-gold-500/10">
            <div className="bg-[#080808] p-6 rounded-[calc(1.5rem-2px)] shadow-2xl">
              <Bot size={48} className="text-gold-500" />
            </div>
          </div>
        </motion.div>

        {/* TEXT AREA - Added more height for better vertical rhythm */}
        <div className="h-32 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {!isProcessing ? (
              <motion.div
                key="greeting"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                className="text-center"
              >
                <h1 className="text-6xl md:text-7xl font-black text-white tracking-tighter mb-2">
                  {greetings[index].text}<span className="text-gold-500">.</span>
                </h1>
                <p className="text-gold-500 font-bold tracking-[0.5em] uppercase text-[10px]">
                  {greetings[index].lang}
                </p>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-4"
              >
                <h2 className="text-2xl font-light text-gold-400 tracking-[0.3em] uppercase italic animate-pulse">
                  {selectedLang?.proc}
                </h2>
                <div className="flex gap-2">
                  {[0, 1, 2].map(i => (
                    <motion.div 
                      key={i}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                      className="w-2 h-2 bg-gold-500 rounded-full"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* GRID - Responsive columns with balanced bottom row */}
            <motion.div 
              animate={isProcessing ? { opacity: 0, y: 40 } : { opacity: 1, y: 0 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full max-w-3xl px-2"
            >
          {greetings.map((g, i) => (
          <button
            key={g.lang}
            onClick={() => handleLanguageSelect(g)}
            className={`
            group relative p-4 md:p-5 bg-white/[0.03] border border-white/10 rounded-2xl 
            hover:border-gold-500/50 hover:bg-gold-500/10 transition-all duration-300
            ${g.lang === "Setswana" ? "col-span-2 md:col-span-1 md:col-start-3" : ""} 
            `}
          >
          <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-white/40 group-hover:text-gold-400 transition-colors">
            {g.lang}
          </span>
      
          {/* Corner Accent */}
            <div className="absolute top-3 left-3 w-1.5 h-1.5 border-t border-l border-white/10 group-hover:border-gold-500 transition-colors" />
        </button>
      ))}
    </motion.div>
      </div>

      {/* FOOTER - Moved purely to bottom with justify-between on main container */}
      <footer className="flex items-center gap-6 opacity-30 mt-auto">
        <div className="h-[1px] w-12 bg-gold-500/20" />
        <p className="text-[10px] uppercase tracking-[0.6em]">Garry 2026</p>
        <div className="h-[1px] w-12 bg-gold-500/20" />
      </footer>
    </div>
  );
}