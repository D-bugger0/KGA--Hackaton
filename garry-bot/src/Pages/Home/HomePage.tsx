import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, MessageSquare, Send, Download, Mail, Shield, Volume2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation();
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Initial greeting from Garry
  const [messages] = useState([
    { 
      role: 'assistant', 
      content: t('content') 
    }
  ]);

  return (
    <div className="h-screen w-full bg-[#050505] text-white flex flex-col overflow-hidden">
      
      {/* 1. STATUS HEADER */}
      <nav className="p-6 border-b border-white/5 flex justify-between items-center backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Shield size={18} className="text-gold-500" />
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-50">
            {t('top_text')}
          </span>
        </div>
        
        {/* VOICE/CHAT TOGGLE */}
        <div className="flex bg-white/5 p-1 rounded-full border border-white/10">
          <button 
            onClick={() => setIsVoiceMode(false)}
            className={`px-4 py-1.5 rounded-full text-[9px] uppercase tracking-widest transition-all flex items-center gap-2 ${!isVoiceMode ? 'bg-gold-500 text-black font-bold' : 'text-white/40'}`}
          >
            <MessageSquare size={12} /> {t('chat')}
          </button>
          <button 
            onClick={() => setIsVoiceMode(true)}
            className={`px-4 py-1.5 rounded-full text-[9px] uppercase tracking-widest transition-all flex items-center gap-2 ${isVoiceMode ? 'bg-gold-500 text-black font-bold' : 'text-white/40'}`}
          >
            <Volume2 size={12} /> {t('voice')}
          </button>
        </div>
      </nav>

      {/* 2. DYNAMIC INTERACTION AREA */}
      <main className="flex-1 overflow-y-auto px-6 py-10">
        <div className="max-w-2xl mx-auto space-y-10">
          {!isVoiceMode ? (
            /* CHAT VIEW */
            messages.map((msg, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                key={i} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] ${msg.role === 'user' ? 'bg-gold-500/10 p-4 rounded-2xl border border-gold-500/20' : ''}`}>
                  <p className="text-lg font-light leading-relaxed">{msg.content}</p>
                </div>
              </motion.div>
            ))
          ) : (
            /* VOICE MODE VIEW */
            <div className="h-full flex flex-col items-center justify-center py-20">
               <motion.div 
                animate={{ scale: isListening ? [1, 1.2, 1] : 1 }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                onClick={() => setIsListening(!isListening)}
                className="w-32 h-32 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center mb-8 cursor-pointer hover:bg-gold-500/30 transition-colors"
               >
                 <Mic size={40} className="text-gold-500" />
               </motion.div>
               
               {/* Updated: Swaps between 'listening' and 'tap_to_speak' keys */}
               <h2 className="text-xl font-light tracking-widest uppercase italic text-center px-4">
                 {isListening ? t('listening') : t('tap_to_speak')}
               </h2>
               
               {/* Updated: Uses 'ready_to_assist' key */}
               <p className="text-white/30 text-[10px] mt-4 tracking-[0.4em] text-center px-4">
                 {t('ready_to_assist')}
               </p>
            </div>
          )}
        </div>
      </main>

      {/* 3. MULTI-ACTION FOOTER */}
      <footer className="p-8 border-t border-white/5 bg-[#080808]/50">
        <div className="max-w-2xl mx-auto flex flex-col gap-6">
          
          {/* EXPORT OPTIONS */}
          <div className="flex justify-center gap-4">
            <button className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-white/30 hover:text-gold-500 transition-colors">
              <Download size={14} /> {t('download')}
            </button>
            <span className="text-white/10">|</span>
            <button className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-white/30 hover:text-gold-500 transition-colors">
              <Mail size={14} /> {t('email')}
            </button>
          </div>

          {/* INPUT BAR */}
          {!isVoiceMode && (
            <div className="relative group">
              <input 
                type="text" 
                placeholder={t('input_field')}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-5 pr-16 focus:border-gold-500/50 outline-none transition-all placeholder:text-white/20"
              />
              <button className="absolute right-3 top-3 p-2 bg-gold-500 rounded-xl text-black hover:scale-105 transition-transform active:scale-95">
                <Send size={20} />
              </button>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}