import React from 'react';
import { motion } from 'framer-motion';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-gold-500/30 relative overflow-hidden flex flex-col">
      
      {/* 1. FUTURISTIC OVERLAYS */}
      {/* Scanline Effect - Gives it that AI monitor feel */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      
      {/* Dynamic Gold Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-gold-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* 2. MAIN CONTENT CONTAINER */}
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 flex-1 flex flex-col w-full max-w-5xl mx-auto px-4 md:px-6"
      >
        {children}
      </motion.main>

      {/* 3. MINIMALIST CENTERED FOOTER */}
      <footer className="relative z-10 py-10">
        <div className="flex items-center justify-center gap-6">
          {/* Decorative side lines */}
          <div className="h-[1px] w-12 bg-gold-500/10" />
          
          <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-white/20">
            Garry 2026
          </p>
          
          <div className="h-[1px] w-12 bg-gold-500/10" />
        </div>
      </footer>
    </div>
  );
}