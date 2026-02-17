import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Bot, Sparkles } from 'lucide-react';

const greetings = [
  { text: "Hello", lang: "English" },
  { text: "Sawubona", lang: "isiZulu" },
  { text: "Molo", lang: "isiXhosa" },
  { text: "Dumela", lang: "Sesotho" },
  { text: "Goeie dag", lang: "Afrikaans" },
  { text: "Thobela", lang: "Sepedi" },
  { text: "Lotjhani", lang: "isiNdebele" },
  { text: "Nndaa", lang: "Tshivenda" },
  { text: "Avuxeni", lang: "Xitswana" },
  { text: "Lidumele", lang: "siSwati" },
  { text: "Dumelang", lang: "Setswana" },
];

export default function LandingPage() {
  const [index, setIndex] = useState(0);
  const { setLanguage } = useLanguage();
  const navigate = useNavigate();

  // 1. Mouse Tracking Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 60, damping: 25, mass: 0.5 };
  const saucerX = useSpring(mouseX, springConfig);
  const saucerY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX + 25); // Offset to the right
      mouseY.set(e.clientY - 25); // Offset upwards
    };
    window.addEventListener("mousemove", handleMouseMove);
    
    // Greeting Cycle Timer
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % greetings.length);
    }, 2500);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(timer);
    };
  }, [mouseX, mouseY]);

  const handleLanguageSelect = (langCode: string) => {
    setLanguage(langCode as any);
    navigate('/onboarding');
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6">
      
      {/* --- FLOATING ESCORT SAUCER --- */}
      <motion.div
        style={{ x: saucerX, y: saucerY, position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 50 }}
        className="flex flex-col items-center"
      >
        <motion.div 
          animate={{ y: [0, -6, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles size={28} className="text-gold-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]" />
        </motion.div>
        <div className="w-[1px] h-10 bg-gradient-to-b from-gold-500/40 to-transparent blur-[1px] mt-1" />
      </motion.div>

      {/* --- BACKGROUND GLOWS --- */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gold-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl w-full text-center space-y-12 relative z-10">
        
        {/* --- GARRY LOGO --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative inline-block group"
        >
          <div className="absolute -inset-1 bg-gold-500/20 rounded-full blur-xl group-hover:bg-gold-500/40 transition duration-1000" />
          <div className="relative bg-gradient-to-b from-gold-500/20 to-transparent p-[1px] rounded-[2.5rem] border border-gold-500/10">
            <div className="bg-[#080808] p-8 rounded-[2.4rem]">
              <Bot size={50} className="text-gold-500" strokeWidth={1.5} />
            </div>
          </div>
          <p className="mt-4 text-[10px] text-gold-500/40 uppercase tracking-[0.3em] font-bold">System Online</p>
        </motion.div>

        {/* --- DYNAMIC GREETINGS --- */}
        <div className="h-40 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0, filter: "blur(8px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -20, opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease: "circOut" }}
              className="text-center"
            >
              <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4">
                {greetings[index].text}<span className="text-gold-500">.</span>
              </h1>
              <div className="flex items-center justify-center gap-4">
                <div className="h-[1px] w-12 bg-gold-500/20" />
                <span className="text-gold-500 font-bold tracking-[0.3em] uppercase text-[10px]">
                  {greetings[index].lang}
                </span >
                <div className="h-[1px] w-12 bg-gold-500/20" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- LANGUAGE SELECTION --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto pt-4">
          {greetings.map((g, i) => (
            <motion.button
              key={g.lang}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + (i * 0.05) }}
              onClick={() => handleLanguageSelect(g.lang.toLowerCase())}
              className="group relative overflow-hidden p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-gold-500/40 hover:bg-gold-500/5 transition-all duration-300"
            >
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-gold-500/5 to-transparent" />
              <span className="relative z-10 text-sm font-bold text-white/50 group-hover:text-gold-400 transition-colors">
                {g.lang}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}