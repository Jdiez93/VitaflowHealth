import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator as CalcIcon, Flame } from 'lucide-react';

const Calculator = () => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const a = Number(age), w = Number(weight), h = Number(height);
    if (!a || !w || !h) return;
    // Mifflin-St Jeor
    const tmb = sex === 'male'
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;
    setResult(Math.round(tmb));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-10 container mx-auto px-4 max-w-xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bio-gradient flex items-center justify-center">
              <CalcIcon className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="font-display font-bold text-3xl">Calculadora TMB</h1>
          </div>
          <p className="text-muted-foreground mb-8">Calcula tu Tasa Metabólica Basal usando la fórmula Mifflin-St Jeor.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-8">
          <div className="space-y-4">
            {/* Sex selector */}
            <div className="grid grid-cols-2 gap-3">
              {(['male', 'female'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSex(s)}
                  className={`p-3 rounded-2xl border-2 text-sm font-medium transition-all ${sex === s ? 'border-primary bg-accent text-accent-foreground' : 'border-border hover:border-primary/30'}`}
                >
                  {s === 'male' ? '👨 Masculino' : '👩 Femenino'}
                </button>
              ))}
            </div>

            <div>
              <Label className="text-sm">Edad (años)</Label>
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
            <Button onClick={calculate} className="w-full rounded-xl bio-gradient border-0 text-primary-foreground h-11 gap-2">
              <CalcIcon className="w-4 h-4" /> Calcular TMB
            </Button>
          </div>

          {result !== null && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 p-6 rounded-2xl bg-accent text-center">
              <Flame className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-1">Tu Tasa Metabólica Basal es</p>
              <p className="font-display font-bold text-4xl text-primary">{result}</p>
              <p className="text-sm text-muted-foreground mt-1">kcal / día</p>
              <p className="text-xs text-muted-foreground mt-4 max-w-xs mx-auto">
                Estas son las calorías que tu cuerpo necesita en reposo absoluto. Para tu gasto total, multiplica por tu nivel de actividad.
              </p>
            </motion.div>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Calculator;
