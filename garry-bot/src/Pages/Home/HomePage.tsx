import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MessageSquare, Send, Mail, Shield, Volume2, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastGarryResponse, setLastGarryResponse] = useState("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const [userName] = useState(() => localStorage.getItem("garry_user_name") || "Guest");
  const [userEmail] = useState(() => localStorage.getItem("garry_user_email") || "");

  // Updated Greeting and Role Description only
  const [messages, setMessages] = useState<{ role: string; content: string; audio?: string }[]>([
    { 
      role: 'assistant', 
      content: `Hello ${userName}! I'm Garry, your dedicated chatbot assistant. I'm here to help you easily navigate and understand the Terms and Conditions of KGA. What can I clarify for you today?` 
    }
  ]);

  // Audio Playback Engine
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

  const handleEmailDispatch = async () => {
    const lastGarryResponse = [...messages].reverse().find(m => m.role === 'assistant')?.content;
    if (!lastGarryResponse) return;

    setIsLoading(true);
    try {
      await fetch("http://localhost:5678/webhook/9a7e1bda-f561-4583-b8ca-6c8747d72dae", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName,
          userEmail,
          userQuery: inputText,
          emailBody: lastGarryResponse, 
        }),
      });
      alert("I just sent the summary to your email, check it out!");
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;
    const userQuery = inputText;
    setInputText(""); 
    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'user', content: userQuery }]);

    try {
      const response = await fetch("http://localhost:5678/webhook/eef99f51-2d57-46a4-89ce-25e10187c93a", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userQuery,
          language: i18n.language,
          userName,
          userEmail,
        }),
      });

      const data = await response.json();
      const botMessage = { 
        role: 'assistant', 
        content: data.output || data.message || "Garry is temporarily unavailable.",
        audio: data.audioData 
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Connection Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeech = async () => {
    if (isListening) {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
        setIsListening(false);
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        
        mediaRecorderRef.current = recorder;
        audioChunksRef.current = [];

        recorder.ondataavailable = (event) => {
          if (event.data && event.data.size > 0) audioChunksRef.current.push(event.data);
        };

        recorder.onstop = async () => {
          if (audioChunksRef.current.length === 0) return;

          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const userVoiceUrl = URL.createObjectURL(audioBlob);

          setIsLoading(true);
          setLastGarryResponse(""); 

          const formData = new FormData();
          formData.append('file', audioBlob, 'recording.webm'); 
          formData.append('userName', userName);
          formData.append('userEmail', userEmail);
          formData.append('userLanguage', i18n.language);

          try {
            const response = await fetch("http://localhost:5678/webhook/758f3876-6c90-4210-8a64-c65f4c155916", {
              method: "POST",
              body: formData, 
            });

            if (!response.ok) throw new Error("n8n failed to process file");

            const data = await response.json();
            const responseText = data.output || "I've processed your request.";

            setMessages(prev => [
              ...prev,
              { role: 'user', content: "Voice Message", audio: userVoiceUrl },
              { role: 'assistant', content: responseText, audio: data.audioData }
            ]);

            setLastGarryResponse(responseText);
            
            if (data.audioData) playBase64Audio(data.audioData);

          } catch (error) {
            console.error("Speech Error:", error);
            setLastGarryResponse("Sorry, I couldn't process that. Check your connection.");
          } finally {
            setIsLoading(false);
          }
        };

        recorder.start(100); 
        setIsListening(true);
      } catch (err) {
        console.error("Mic Error:", err);
      }
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
            <div className="h-full flex flex-col items-center justify-center py-10 text-center">
                <div className="min-h-[120px] mb-8 px-4">
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-2">
                        <Loader2 size={24} className="text-gold-500 animate-spin" />
                        <p className="text-gold-500/50 uppercase tracking-[0.3em] text-[10px]">Processing Voice...</p>
                      </motion.div>
                    ) : (
                      <motion.p key="response" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-xl font-light text-white italic max-w-md leading-relaxed">
                        {lastGarryResponse}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <motion.div 
                  animate={{ 
                    scale: isListening ? [1, 1.1, 1] : 1,
                    boxShadow: isListening ? ["0px 0px 0px rgba(212,175,55,0)", "0px 0px 50px rgba(212,175,55,0.3)", "0px 0px 0px rgba(212,175,55,0)"] : "none"
                  }} 
                  transition={{ repeat: Infinity, duration: 2 }} 
                  onClick={handleSpeech} 
                  className={`w-40 h-40 rounded-full flex items-center justify-center mb-8 cursor-pointer transition-all border-2 ${isListening ? 'bg-gold-500/20 border-gold-500' : 'bg-white/5 border-white/10 hover:border-gold-500/50'}`}
                >
                  <Mic size={48} className={isListening ? "text-gold-500" : "text-white/20"} />
                </motion.div>

                <h2 className="text-xl font-light tracking-[0.2em] uppercase">{isListening ? "I'm Listening..." : t('tap_to_speak')}</h2>
                <p className="text-white/20 text-[10px] mt-4 tracking-[0.4em] uppercase">{t('ready_to_assist')}</p>
            </div>
          )}
        </div>
      </main>

      <footer className="p-8 border-t border-white/5 bg-[#080808]/50">
        <div className="max-w-2xl mx-auto flex flex-col gap-6 text-center">
          {/* Footer Disclaimer */}
          <div className="flex justify-center gap-4">
            <button onClick={handleEmailDispatch} className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-white/30 hover:text-gold-500 transition-colors">
              <Mail size={14} /> {t('email')}
            </button>
          </div>

          {!isVoiceMode && (
            <div className="relative group">
              <input 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                type="text" 
                placeholder="Ask Garry about KGA Terms..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-5 pr-16 focus:border-gold-500/50 outline-none placeholder:text-white/20 transition-all"
              />
              <button onClick={handleSend} disabled={isLoading} className="absolute right-3 top-3 p-2 bg-gold-500 rounded-xl text-black hover:scale-105 active:scale-95 disabled:opacity-50 transition-transform">
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
              </button>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}