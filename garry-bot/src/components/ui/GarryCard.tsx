import { motion } from 'framer-motion';

interface GarryCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function GarryCard({ children, className = "", delay = 0 }: GarryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={`relative group ${className}`}
    >
      {/* Subtle outer gold glow on hover */}
      <div className="absolute -inset-px bg-gradient-to-r from-amber-500/0 via-amber-500/20 to-amber-500/0 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* The actual card */}
      <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-500/30 rounded-tr-2xl" />
        
        {children}
      </div>
    </motion.div>
  );
}