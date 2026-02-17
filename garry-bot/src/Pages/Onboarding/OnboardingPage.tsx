import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { Send, User, Bot as BotIcon, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OnboardingPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  
  // For the UI setup, we'll use local state to simulate the chat flow
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: `Welcome! You've selected ${language}.` },
    { id: 2, type: 'bot', text: "I'm Garry. What should I call you?" }
  ]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMsg = { id: Date.now(), type: 'user', text: inputValue };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    // Simulate bot thinking/typing
    setTimeout(() => {
      setMessages((prev) => [...prev, { 
        id: Date.now() + 1, 
        type: 'bot', 
        text: "Thanks! Now, what is your email address?" 
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 p-4 flex items-center gap-4 sticky top-0 z-10">
        <button onClick={() => navigate('/')} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-slate-600" />
        </button>
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl shadow-md shadow-blue-200">
            <BotIcon size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900">Garry AI</h1>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] text-slate-500 uppercase font-medium tracking-wider">Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                msg.type === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </main>

      {/* Input Area */}
      <footer className="p-4 bg-white border-t border-slate-200 pb-8 md:pb-4">
        <div className="max-w-4xl mx-auto relative flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your answer..."
            className="w-full p-4 pr-12 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder-slate-400 transition-all outline-none"
          />
          <button 
            onClick={handleSend}
            className="absolute right-2 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
          >
            <Send size={20} />
          </button>
        </div>
      </footer>
    </div>
  );
}