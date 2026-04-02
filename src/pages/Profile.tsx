import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import { User, Mail, Ruler, Weight, Calendar, Target, Venus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { calculateCalories } from '@/lib/calories';

const goalOptions = [
  { value: 'lose_fat', label: 'Perder grasa', emoji: '🔥' },
  { value: 'gain_muscle', label: 'Ganar músculo', emoji: '💪' },
  { value: 'maintain', label: 'Mantenerme', emoji: '⚖️' },
];

const sexOptions = [
  { value: 'male', label: 'Masculino' },
  { value: 'female', label: 'Femenino' },
  { value: 'other', label: 'Otro' },
];

const Profile = () => {
  const { user, profile, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [sex, setSex] = useState('');
  const [goal, setGoal] = useState('');

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setAge(profile.age?.toString() || '');
      setWeight(profile.weight?.toString() || '');
      setHeight(profile.height?.toString() || '');
      setSex(profile.sex || '');
      setGoal(profile.goal || '');
    }
  }, [profile]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from('profiles').update({
      full_name: fullName,
      age: age ? Number(age) : null,
      weight: weight ? Number(weight) : null,
      height: height ? Number(height) : null,
      sex: sex || null,
      goal: goal || null,
    }).eq('user_id', user.id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      await refreshProfile();
      toast({ title: 'Perfil actualizado ✅' });
    }
    setSaving(false);
  };

  const calorieData = calculateCalories({
    weight: weight ? Number(weight) : null,
    height: height ? Number(height) : null,
    age: age ? Number(age) : null,
    sex,
    goal,
  });

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-10 container mx-auto px-4 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display font-bold text-2xl mb-6">Mi Perfil</h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bio-gradient flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-foreground">{(profile.full_name || 'U')[0].toUpperCase()}</span>
            </div>
            <div>
              <h2 className="font-display font-semibold text-lg">{profile.full_name || 'Usuario'}</h2>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm flex items-center gap-1"><User className="w-3 h-3" /> Nombre</Label>
              <Input value={fullName} onChange={e => setFullName(e.target.value)} className="rounded-xl mt-1" />
            </div>
            <div>
              <Label className="text-sm flex items-center gap-1"><Mail className="w-3 h-3" /> Email</Label>
              <Input value={profile.email || ''} className="rounded-xl mt-1" disabled />
            </div>
            <div>
              <Label className="text-sm flex items-center gap-1"><Calendar className="w-3 h-3" /> Edad</Label>
              <Input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Ej: 25" className="rounded-xl mt-1" />
            </div>
            <div>
              <Label className="text-sm flex items-center gap-1"><Weight className="w-3 h-3" /> Peso (kg)</Label>
              <Input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="Ej: 70" className="rounded-xl mt-1" />
            </div>
            <div>
              <Label className="text-sm flex items-center gap-1"><Ruler className="w-3 h-3" /> Altura (cm)</Label>
              <Input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="Ej: 175" className="rounded-xl mt-1" />
            </div>
            <div>
              <Label className="text-sm flex items-center gap-1 mb-1"><Venus className="w-3 h-3" /> Sexo</Label>
              <div className="flex gap-2 mt-1">
                {sexOptions.map(s => (
                  <button
                    key={s.value}
                    onClick={() => setSex(s.value)}
                    className={`flex-1 px-3 py-2 rounded-xl text-sm font-medium border-2 transition-all ${sex === s.value ? 'border-primary bg-accent text-accent-foreground' : 'border-border hover:border-primary/30'}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Goal selector */}
          <div className="mt-6">
            <Label className="text-sm flex items-center gap-1 mb-2"><Target className="w-3 h-3" /> Objetivo</Label>
            <div className="grid grid-cols-3 gap-3">
              {goalOptions.map(g => (
                <button
                  key={g.value}
                  onClick={() => setGoal(g.value)}
                  className={`p-3 rounded-2xl border-2 transition-all text-center ${goal === g.value ? 'border-primary bg-accent' : 'border-border hover:border-primary/30'}`}
                >
                  <span className="text-xl block mb-1">{g.emoji}</span>
                  <span className="text-xs font-medium">{g.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Calorie summary */}
          {calorieData.complete && (
            <div className="mt-6 p-4 rounded-2xl bg-muted/50">
              <p className="text-sm font-medium mb-1">Tu cálculo personalizado</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                <div>
                  <div className="font-display font-bold text-lg text-primary">{calorieData.tmb}</div>
                  <div className="text-[10px] text-muted-foreground">TMB (kcal)</div>
                </div>
                <div>
                  <div className="font-display font-bold text-lg text-primary">{calorieData.dailyCalories}</div>
                  <div className="text-[10px] text-muted-foreground">Objetivo diario</div>
                </div>
                <div>
                  <div className="font-display font-bold text-lg">{calorieData.protein}g</div>
                  <div className="text-[10px] text-muted-foreground">Proteínas</div>
                </div>
                <div>
                  <div className="font-display font-bold text-lg">{calorieData.fats}g</div>
                  <div className="text-[10px] text-muted-foreground">Grasas</div>
                </div>
              </div>
            </div>
          )}

          <Button onClick={handleSave} disabled={saving} className="mt-6 rounded-xl bio-gradient border-0 text-primary-foreground">
            {saving ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Guardando...</> : 'Guardar cambios'}
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;
