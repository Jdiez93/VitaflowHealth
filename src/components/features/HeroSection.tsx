import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Activity, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center overflow-hidden">
    {/* Background decoration */}
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/40 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
    </div>

    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4" />
          Nutrición inteligente impulsada por IA
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 text-balance"
        >
          Tu bienestar,{' '}
          <span className="bio-gradient-text">potenciado por IA</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Registra tu alimentación, hidratación y actividad. Recibe recomendaciones personalizadas 
          y alcanza tus objetivos de salud con inteligencia artificial.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/register">
            <Button size="lg" className="rounded-2xl bio-gradient border-0 text-primary-foreground hover:opacity-90 px-8 h-12 text-base gap-2">
              Empezar Gratis <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/calculator">
            <Button variant="outline" size="lg" className="rounded-2xl px-8 h-12 text-base">
              Calculadora TMB
            </Button>
          </Link>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-16"
        >
          {[
            { icon: Activity, label: 'Tracking de calorías' },
            { icon: Droplets, label: 'Hidratación' },
            { icon: Sparkles, label: 'Chat con IA' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 px-4 py-2 glass-card text-sm text-muted-foreground">
              <item.icon className="w-4 h-4 text-primary" />
              {item.label}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
