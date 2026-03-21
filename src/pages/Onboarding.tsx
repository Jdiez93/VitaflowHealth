import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

const goals = [
  { value: 'lose_fat' as const, label: 'Perder grasa', emoji: '🔥' },
  { value: 'gain_muscle' as const, label: 'Ganar músculo', emoji: '💪' },
  { value: 'maintain' as const, label: 'Mantenerme', emoji: '⚖️' },
];

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [sex, setSex] = useState<'male' | 'female' | 'other' | ''>('');
  const [goal, setGoal] = useState<'lose_fat' | 'gain_muscle' | 'maintain' | ''>('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, refreshProfile } = useAuth();

  const steps = [
    {
      title: 'Cuéntanos sobre ti',
      subtitle: 'Necesitamos algunos datos básicos para personalizar tu experiencia.',
      content: (
        <div className="space-y-4">
          <div>
            <Label className="text-sm">Edad</Label>
            <Input type="number" placeholder="25" value={age} onChange={e => setAge(e.target.value)} className="rounded-xl mt-1" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm">Peso (kg)</Label>
              <Input type="number" placeholder="70" value={weight} onChange={e => setWeight(e.target.value)} className="rounded-xl mt-1" />
            </div>
            <div>
              <Label className="text-sm">Altura (cm)</Label>
              <Input type="number" placeholder="175" value={height} onChange={e => setHeight(e.target.value)} className="rounded-xl mt-1" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '¿Cuál es tu sexo biológico?',
      subtitle: 'Esto nos ayuda a calcular tu metabolismo basal con precisión.',
      content: (
        <div className="grid grid-cols-3 gap-3">
          {([
            { value: 'male' as const, label: 'Masculino', emoji: '👨' },
            { value: 'female' as const, label: 'Femenino', emoji: '👩' },
            { value: 'other' as const, label: 'Otro', emoji: '🧑' },
          ]).map((s) => (
            <button
              key={s.value}
              onClick={() => setSex(s.value)}
              className={`p-4 rounded-2xl border-2 transition-all text-center ${sex === s.value ? 'border-primary bg-accent' : 'border-border hover:border-primary/30'}`}
            >
              <span className="text-2xl block mb-1">{s.emoji}</span>
              <span className="text-sm font-medium">{s.label}</span>
            </button>
          ))}
        </div>
      ),
    },
    {
      title: '¿Cuál es tu objetivo?',
      subtitle: 'Adaptaremos las recomendaciones a tus metas.',
      content: (
        <div className="space-y-3">
          {goals.map((g) => (
            <button
              key={g.value}
              onClick={() => setGoal(g.value)}
              className={`w-full p-4 rounded-2xl border-2 transition-all text-left flex items-center gap-3 ${goal === g.value ? 'border-primary bg-accent' : 'border-border hover:border-primary/30'}`}
            >
              <span className="text-2xl">{g.emoji}</span>
              <span className="font-medium">{g.label}</span>
            </button>
          ))}
        </div>
      ),
    },
  ];

  const handleFinish = async () => {
    if (!user) return;
    setLoading(true);
    const { error } = await supabase.from('profiles').update({
      age: age ? Number(age) : null,
      weight: weight ? Number(weight) : null,
      height: height ? Number(height) : null,
      sex: sex || null,
      goal: goal || null,
      onboarding_completed: true,
    }).eq('user_id', user.id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      await refreshProfile();
      toast({ title: '¡Perfil completado!', description: 'Tu experiencia personalizada te espera.' });
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4">
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />

      <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md glass-card p-8">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-xl bio-gradient flex items-center justify-center">
            <Leaf className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold">VitaFlow AI</span>
        </div>

        <div className="flex gap-2 mb-8">
          {steps.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? 'bio-gradient' : 'bg-muted'}`} />
          ))}
        </div>

        <h1 className="font-display font-bold text-xl mb-1">{steps[step].title}</h1>
        <p className="text-sm text-muted-foreground mb-6">{steps[step].subtitle}</p>

        {steps[step].content}

        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <Button variant="outline" onClick={() => setStep(step - 1)} className="rounded-xl gap-1">
              <ArrowLeft className="w-4 h-4" /> Atrás
            </Button>
          )}
          <Button
            onClick={step < steps.length - 1 ? () => setStep(step + 1) : handleFinish}
            disabled={loading}
            className="flex-1 rounded-xl bio-gradient border-0 text-primary-foreground gap-1"
          >
            {step < steps.length - 1 ? <>Siguiente <ArrowRight className="w-4 h-4" /></> : loading ? 'Guardando...' : 'Completar'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Onboarding;
