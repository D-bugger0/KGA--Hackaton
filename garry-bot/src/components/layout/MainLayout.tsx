import React from 'react';
import { motion } from 'framer-motion';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-amber-500/30 relative overflow-hidden flex flex-col">
      
      {/* 1. FUTURISTIC OVERLAYS */}
      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      
      {/* Dynamic Gold Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* 2. MAIN CONTENT CONTAINER */}
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 flex-1 flex flex-col w-full max-w-5xl mx-auto px-4 md:px-6"
      >
        {children}
      </motion.main>

      {/* 3. MINIMALIST GOLD BORDER FOOTER */}
      <footer className="relative z-10 border-t border-amber-500/10 py-6 bg-black/40 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center text-[10px] uppercase tracking-[0.2em] font-bold text-white/20">
          <span>Encrypted Connection</span>
          <div className="flex items-center gap-2 text-amber-500/40">
            <span className="w-1 h-1 bg-amber-500 rounded-full animate-ping" />
            Garry Protocol v1.0
          </div>
        </div>
      </footer>
    </div>
  );
}