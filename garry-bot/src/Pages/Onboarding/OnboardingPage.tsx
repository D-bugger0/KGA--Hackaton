import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next"; 
import { Mail, Sparkles, ArrowRight, Heart } from "lucide-react";

export default function OnboardingPage() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const nextStep = () => setStep(step + 1);

  // --- NEW: Save data to localStorage before navigating ---
  const handleComplete = () => {
    if (!name || !email) return;
    
    // Storing data so HomePage can access it
    localStorage.setItem("garry_user_name", name);
    localStorage.setItem("garry_user_email", email);
    
    // Proceed to Garry's lounge
    navigate('/homepage');
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-6 overflow-hidden relative bg-[#050505]">
      <div className="w-full max-w-lg">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8 text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gold-500/5 rounded-full border border-gold-500/10">
                  <Sparkles size={32} className="text-gold-500 animate-pulse" />
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-light text-white leading-tight">
                {t('welcome')} <br />
                <span className="text-white/80">{t('identity_ask')}</span>
              </h2>

              <div className="relative max-w-sm mx-auto">
                <input
                  autoFocus
                  type="text"
                  placeholder={t('placeholder_name')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && name && nextStep()}
                  className="w-full bg-transparent border-b border-white/20 py-4 text-2xl text-center outline-none focus:border-gold-500 transition-all text-white placeholder:text-white/10"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={nextStep}
                  disabled={!name}
                  className="absolute right-0 bottom-4 text-gold-500 disabled:opacity-0 transition-opacity"
                >
                  <ArrowRight size={24} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8 text-center"
            >
              <div className="flex justify-center mb-6">
                <Heart size={32} className="text-gold-500/40" />
              </div>

              <h2 className="text-3xl md:text-4xl font-light text-white leading-tight">
                <Trans 
                  i18nKey="greeting_peekaboo" 
                  values={{ name: name }}
                  components={{ spanName: <span className="text-gold-500" /> }}
                />
              </h2>
              
              <p className="text-white/50 text-lg font-light max-w-xs mx-auto">
                {t('email_ask')}
              </p>

              <div className="relative max-w-sm mx-auto">
                <div className="absolute left-0 bottom-5 text-white/20">
                  <Mail size={20} />
                </div>
                <input
                  autoFocus
                  type="email"
                  placeholder="Email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && email && handleComplete()}
                  className="w-full bg-transparent border-b border-white/20 py-4 pl-10 text-xl text-center outline-none focus:border-gold-500 transition-all text-white placeholder:text-white/10"
                />
                <button
                  onClick={handleComplete}
                  disabled={!email}
                  className="mt-12 w-full py-4 bg-gold-500 text-black font-bold tracking-[0.3em] rounded-full hover:bg-gold-400 transition-all disabled:opacity-20"
                >
                  {t('btn_initialize')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}