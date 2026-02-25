import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { Bot } from 'lucide-react';

// --- Animated UFO Component (The Saucer) ---
const UFOIcon = ({ size = 24 }: { size?: number }) => (
  <motion.div
    animate={{ y: [0, -4, 0], rotate: [-2, 2, -2] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  >
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="text-gold-500 drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]">
      <path d="M12 4C9 4 7 6 7 8H17C17 6 15 4 12 4Z" fill="currentColor" fillOpacity="0.8"/>
      <path d="M2 12C2 9.5 6.5 8 12 8C17.5 8 22 9.5 22 12C22 14.5 17.5 16 12 16C6.5 16 2 14.5 2 12Z" fill="currentColor" />
      <circle cx="7" cy="12" r="0.8" fill="black" />
      <circle cx="12" cy="12" r="0.8" fill="black" />
      <circle cx="17" cy="12" r="0.8" fill="black" />
      <motion.path animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 2, repeat: Infinity }} d="M9 16L7 22H17L15 16H9Z" fill="currentColor" fillOpacity="0.4" />
    </svg>
  </motion.div>
);

const langCodeMap: Record<string, string> = {
  "English": "en", "isiZulu": "zu", "isiXhosa": "xh", "Sesotho": "st",
  "Afrikaans": "af", "Sepedi": "nso", "isiNdebele": "nd", "Tshivenda": "ve",
  "Xitsonga": "xs", "siSwati": "sw", "Setswana": "tsn"
};

const greetings = [
  { text: "Hello", lang: "English" },
  { text: "Sawubona", lang: "isiZulu" },
  { text: "Molo", lang: "isiXhosa" },
  { text: "Dumela", lang: "Sesotho" },
  { text: "Goeie dag", lang: "Afrikaans" },
  { text: "Thobela", lang: "Sepedi" },
  { text: "Lotjhani", lang: "isiNdebele" },
  { text: "Nndaa", lang: "Tshivenda" },
  { text: "Avuxeni", lang: "Xitsonga" },
  { text: "Lidumele", lang: "siSwati" },
  { text: "Dumelang", lang: "Setswana" },
];

export default function LandingPage() {
  const { i18n } = useTranslation();
  const [index, setIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const { setLanguage } = useLanguage();
  const navigate = useNavigate();

  // Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const saucerX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const saucerY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    if (isProcessing) return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 15); // Centering the UFO on cursor
      mouseY.set(e.clientY - 15);
    };
    window.addEventListener("mousemove", handleMouseMove);
    const timer = setInterval(() => setIndex((p) => (p + 1) % greetings.length), 2500);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(timer);
    };
  }, [isProcessing, mouseX, mouseY]);

  const handleLanguageSelect = (item: typeof greetings[0]) => {
    setIsProcessing(true);
    const code = langCodeMap[item.lang] || 'en';
    setLanguage(code as any);
    i18n.changeLanguage(code);

    // Visual feedback: Move saucer to the center bot icon
    mouseX.set(window.innerWidth / 2 - 15);
    mouseY.set(window.innerHeight / 2 - 80);

    setTimeout(() => {
      navigate('/onboarding');
    }, 2500); 
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-between py-12 px-6 overflow-hidden relative bg-[#050505] cursor-none">
      
      {/* THE SAUCER (CURSOR) */}
      <motion.div style={{ x: saucerX, y: saucerY, position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 200 }}>
        <UFOIcon size={32} />
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl gap-12">
        
        {/* BOT ICON */}
        <motion.div animate={isProcessing ? { y: [0, -10, 0], scale: 1.1 } : { scale: 1 }}>
          <div className="relative bg-gradient-to-b from-gold-500/20 to-transparent p-[2px] rounded-3xl border border-gold-500/10">
            <div className="bg-[#080808] p-6 rounded-[calc(1.5rem-2px)] shadow-2xl">
              <Bot size={48} className="text-gold-500" />
            </div>
          </div>
        </motion.div>

        {/* TEXT AREA */}
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
                  Lets get everything ready......
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

        {/* LANGUAGE GRID */}
        <motion.div 
          animate={isProcessing ? { opacity: 0, y: 40 } : { opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full max-w-3xl px-2"
        >
          {greetings.map((g) => (
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
              <div className="absolute top-3 left-3 w-1.5 h-1.5 border-t border-l border-white/10 group-hover:border-gold-500 transition-colors" />
            </button>
          ))}
        </motion.div>
      </div>

      <footer className="flex items-center gap-6 opacity-30 mt-auto">
        <div className="h-[1px] w-12 bg-gold-500/20" />
        <p className="text-[10px] uppercase tracking-[0.6em]">Garry 2026</p>
        <div className="h-[1px] w-12 bg-gold-500/20" />
      </footer>
    </div>
  );
}