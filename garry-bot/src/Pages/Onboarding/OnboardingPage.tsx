import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next"; 
import { Mail, ArrowRight, Heart } from "lucide-react";

// --- Animated UFO Component ---
const UFOIcon = ({ size = 40 }: { size?: number }) => (
  <motion.div
    animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    className="relative flex items-center justify-center"
  >
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="text-gold-500 drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">
      <path d="M12 4C9 4 7 6 7 8H17C17 6 15 4 12 4Z" fill="currentColor" fillOpacity="0.8"/>
      <path d="M2 12C2 9.5 6.5 8 12 8C17.5 8 22 9.5 22 12C22 14.5 17.5 16 12 16C6.5 16 2 14.5 2 12Z" fill="currentColor" />
      <circle cx="7" cy="12" r="0.8" fill="black" />
      <circle cx="12" cy="12" r="0.8" fill="black" />
      <circle cx="17" cy="12" r="0.8" fill="black" />
      <motion.path animate={{ opacity: [0.2, 0.7, 0.2] }} transition={{ duration: 2, repeat: Infinity }} d="M9 16L7 22H17L15 16H9Z" fill="url(#beamOnboarding)" />
      <defs><linearGradient id="beamOnboarding" x1="12" y1="16" x2="12" y2="22" gradientUnits="userSpaceOnUse"><stop stopColor="currentColor" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></linearGradient></defs>
    </svg>
  </motion.div>
);

export default function OnboardingPage() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleComplete = () => {
    if (!name || !email) return;
    localStorage.setItem("garry_user_name", name);
    localStorage.setItem("garry_user_email", email);
    navigate('/homepage');
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-6 overflow-hidden relative bg-[#050505]">
      <div className="w-full max-w-lg">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8 text-center">
              <div className="flex justify-center mb-6">
                <UFOIcon />
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-white leading-tight">
                {t('welcome')} <br />
                <span className="text-white/60 text-2xl">{t('identity_ask')}</span>
              </h2>
              <div className="relative max-w-sm mx-auto">
                <input autoFocus type="text" placeholder={t('placeholder_name')} value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && name && setStep(2)} className="w-full bg-transparent border-b border-white/10 py-4 text-2xl text-center outline-none focus:border-gold-500 transition-all text-white placeholder:text-white/5" />
                <motion.button whileHover={{ x: 5 }} onClick={() => setStep(2)} disabled={!name} className="absolute right-0 bottom-4 text-gold-500 disabled:opacity-0 transition-opacity">
                  <ArrowRight size={24} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8 text-center">
              <div className="flex justify-center mb-6">
                <Heart size={32} className="text-gold-500/40" />
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-white leading-tight">
                <Trans i18nKey="greeting_peekaboo" values={{ name: name }} components={{ spanName: <span className="text-gold-500" /> }} />
              </h2>
              <p className="text-white/50 text-lg font-light max-w-xs mx-auto">{t('email_ask')}</p>
              <div className="relative max-w-sm mx-auto">
                <div className="absolute left-0 bottom-5 text-white/20"><Mail size={20} /></div>
                <input autoFocus type="email" placeholder="Email address..." value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === "Enter" && email && handleComplete()} className="w-full bg-transparent border-b border-white/10 py-4 pl-10 text-xl text-center outline-none focus:border-gold-500 transition-all text-white placeholder:text-white/5" />
                <button onClick={handleComplete} disabled={!email} className="mt-12 w-full py-4 bg-gold-500 text-black font-bold tracking-[0.3em] rounded-full hover:bg-gold-400 transition-all disabled:opacity-20 uppercase text-[10px]">
                  {t('Lets get everything ready')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}