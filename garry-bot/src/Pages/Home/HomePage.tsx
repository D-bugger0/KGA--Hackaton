import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, MessageSquare, Send, Download, Mail, Shield, Volume2, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [userName] = useState(() => localStorage.getItem("garry_user_name") || "");
  const [userEmail] = useState(() => localStorage.getItem("garry_user_email") || "");

  const [messages, setMessages] = useState<{ role: string; content: string; audio?: string }[]>([
    { role: 'assistant', content: t('content') }
  ]);

  const playBase64Audio = (base64Data: string) => {
    try {
      const sampleRate = 24000; 
      const binaryString = window.atob(base64Data);
      const pcmData = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        pcmData[i] = binaryString.charCodeAt(i);
      }

      const header = new ArrayBuffer(44);
      const view = new DataView(header);
      const writeString = (offset: number, string: string) => {
        for (let i = 0; i < string.length; i++) view.setUint8(offset + i, string.charCodeAt(i));
      };

      writeString(0, 'RIFF');
      view.setUint32(4, 36 + pcmData.length, true);
      writeString(8, 'WAVE');
      writeString(12, 'fmt ');
      view.setUint32(16, 16, true);
      view.setUint16(20, 1, true); 
      view.setUint16(22, 1, true); 
      view.setUint32(24, sampleRate, true);
      view.setUint32(28, sampleRate * 2, true);
      view.setUint16(32, 2, true);
      view.setUint16(34, 16, true);
      writeString(36, 'data');
      view.setUint32(40, pcmData.length, true);

      const blob = new Blob([header, pcmData], { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.play();
    } catch (e) {
      console.error("Audio Playback Error:", e);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userQuery = inputText;
    setInputText(""); 
    setIsLoading(true);

    setMessages(prev => [...prev, { role: 'user', content: userQuery }]);

    try {
      const response = await fetch("http://localhost:5678/webhook-test/52ff878f-162d-429e-8537-5b27a22ad4b5", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userQuery: userQuery,
          language: i18n.language,
          userName: userName,
          userEmail: userEmail,
        }),
      });

      const data = await response.json();

      const botMessage = { 
        role: 'assistant', 
        content: data.output || data.message || "Garry is temporarily unavailable.",
        audio: data.audioData 
      };

      setMessages(prev => [...prev, botMessage]);

      if (data.audioData) {
        playBase64Audio(data.audioData);
      }

    } catch (error) {
      console.error("Connection Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Connection lost. Please check your n8n instance." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-[#050505] text-white flex flex-col overflow-hidden">
      <nav className="p-6 border-b border-white/5 flex justify-between items-center backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Shield size={18} className="text-gold-500" />
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-50">{t('The Crown Room')}</span>
        </div>
        <div className="flex bg-white/5 p-1 rounded-full border border-white/10">
          <button onClick={() => setIsVoiceMode(false)} className={`px-4 py-1.5 rounded-full text-[9px] uppercase tracking-widest transition-all flex items-center gap-2 ${!isVoiceMode ? 'bg-gold-500 text-black font-bold' : 'text-white/40'}`}>
            <MessageSquare size={12} /> {t('chat')}
          </button>
          <button onClick={() => setIsVoiceMode(true)} className={`px-4 py-1.5 rounded-full text-[9px] uppercase tracking-widest transition-all flex items-center gap-2 ${isVoiceMode ? 'bg-gold-500 text-black font-bold' : 'text-white/40'}`}>
            <Volume2 size={12} /> {t('voice')}
          </button>
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto px-6 py-10">
        <div className="max-w-2xl mx-auto space-y-10">
          {!isVoiceMode ? (
            <>
              {messages.map((msg, i) => (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] relative group ${msg.role === 'user' ? 'bg-gold-500/10 p-4 rounded-2xl border border-gold-500/20' : ''}`}>
                    <p className="text-lg font-light leading-relaxed">{msg.content}</p>
                    
                    {/* RESTORED: Audio Call to Action specifically for Garry's messages */}
                    {msg.role === 'assistant' && msg.audio && (
                      <button 
                        onClick={() => playBase64Audio(msg.audio!)}
                        className="mt-4 flex items-center gap-2 px-3 py-1.5 bg-gold-500/5 border border-gold-500/20 rounded-full text-[10px] uppercase tracking-widest text-gold-500 hover:bg-gold-500 hover:text-black transition-all"
                      >
                        <Volume2 size={12} /> {t('Listen to Garry')}
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }} className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-gold-500/50 italic text-sm">Garry is analyzing...</div>
                </motion.div>
              )}
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-20 text-center">
               <motion.div animate={{ scale: isListening ? [1, 1.2, 1] : 1 }} transition={{ repeat: Infinity, duration: 1.5 }} onClick={() => setIsListening(!isListening)} className="w-32 h-32 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center mb-8 cursor-pointer">
                 <Mic size={40} className="text-gold-500" />
               </motion.div>
               <h2 className="text-xl font-light tracking-widest uppercase italic">{isListening ? t('listening') : t('tap_to_speak')}</h2>
               <p className="text-white/30 text-[10px] mt-4 tracking-[0.4em] text-center">{t('ready_to_assist')}</p>
            </div>
          )}
        </div>
      </main>

      <footer className="p-8 border-t border-white/5 bg-[#080808]/50">
        <div className="max-w-2xl mx-auto flex flex-col gap-6">
          <div className="flex justify-center gap-4">
            <button className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-white/30 hover:text-gold-500"><Download size={14} /> {t('download')}</button>
            <span className="text-white/10">|</span>
            <button className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-white/30 hover:text-gold-500"><Mail size={14} /> {t('email')}</button>
          </div>

          {!isVoiceMode && (
            <div className="relative group">
              <input 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                type="text" 
                placeholder={t('input_field')}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-5 pr-16 focus:border-gold-500/50 outline-none placeholder:text-white/20"
              />
              <button onClick={handleSend} disabled={isLoading} className="absolute right-3 top-3 p-2 bg-gold-500 rounded-xl text-black hover:scale-105 active:scale-95 disabled:opacity-50">
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
              </button>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}