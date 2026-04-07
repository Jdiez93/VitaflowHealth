import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf } from 'lucide-react';

interface SplashScreenProps {
  onFinished: () => void;
}

const SplashScreen = ({ onFinished }: SplashScreenProps) => {
  const [phase, setPhase] = useState<'logo' | 'text' | 'exit'>('logo');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('text'), 600);
    const t2 = setTimeout(() => setPhase('exit'), 2200);
    const t3 = setTimeout(onFinished, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onFinished]);

  return (
    <AnimatePresence>
      {phase !== 'exit' ? null : null}
      <motion.div
        key="splash"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'exit' ? 0 : 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background overflow-hidden"
      >
        {/* Background orbs */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl"
          animate={{ scale: [1, 1.3, 1], x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-accent/20 blur-3xl translate-x-32 translate-y-20"
          animate={{ scale: [1.2, 1, 1.2], x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
          className="relative"
        >
          <motion.div
            className="w-20 h-20 rounded-2xl bio-gradient flex items-center justify-center shadow-lg"
            animate={{ boxShadow: ['0 0 0px hsl(160 84% 30% / 0)', '0 0 40px hsl(160 84% 30% / 0.3)', '0 0 0px hsl(160 84% 30% / 0)'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Leaf className="w-10 h-10 text-primary-foreground" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase === 'logo' ? 0 : 1, y: phase === 'logo' ? 20 : 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mt-8 text-center"
        >
          <h1 className="font-display font-bold text-3xl tracking-tight">
            <span className="bio-gradient-text">VitaFlow</span>{' '}
            <span className="text-foreground">AI</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'logo' ? 0 : 0.7 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-sm text-muted-foreground mt-2"
          >
            Tu bienestar, potenciado por IA
          </motion.p>
        </motion.div>

        {/* Loading bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'logo' ? 0 : 1 }}
          transition={{ delay: 0.2 }}
          className="mt-10 w-48 h-1 rounded-full bg-muted overflow-hidden"
        >
          <motion.div
            className="h-full bio-gradient rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
