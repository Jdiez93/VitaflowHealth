import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import { User, Mail, Ruler, Weight, Calendar, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { user, profile, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [age, setAge] = useState(profile?.age?.toString() || '');
  const [weight, setWeight] = useState(profile?.weight?.toString() || '');
  const [height, setHeight] = useState(profile?.height?.toString() || '');

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from('profiles').update({
      full_name: fullName,
      age: age ? Number(age) : null,
      weight: weight ? Number(weight) : null,
      height: height ? Number(height) : null,
    }).eq('user_id', user.id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      await refreshProfile();
      toast({ title: 'Perfil actualizado' });
    }
    setSaving(false);
  };

  const goalLabels: Record<string, string> = { lose_fat: 'Perder grasa', gain_muscle: 'Ganar músculo', maintain: 'Mantenerme' };

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
              <span className="text-2xl font-bold text-primary-foreground">{(profile?.full_name || 'U')[0].toUpperCase()}</span>
            </div>
            <div>
              <h2 className="font-display font-semibold text-lg">{profile?.full_name || 'Usuario'}</h2>
              <p className="text-sm text-muted-foreground">{profile?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm flex items-center gap-1"><User className="w-3 h-3" /> Nombre</Label>
              <Input value={fullName} onChange={e => setFullName(e.target.value)} className="rounded-xl mt-1" />
            </div>
            <div>
              <Label className="text-sm flex items-center gap-1"><Mail className="w-3 h-3" /> Email</Label>
              <Input value={profile?.email || ''} className="rounded-xl mt-1" disabled />
            </div>
            <div>
              <Label className="text-sm flex items-center gap-1"><Calendar className="w-3 h-3" /> Edad</Label>
              <Input type="number" value={age} onChange={e => setAge(e.target.value)} className="rounded-xl mt-1" />
            </div>
            <div>
              <Label className="text-sm flex items-center gap-1"><Weight className="w-3 h-3" /> Peso (kg)</Label>
              <Input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="rounded-xl mt-1" />
            </div>
            <div>
              <Label className="text-sm flex items-center gap-1"><Ruler className="w-3 h-3" /> Altura (cm)</Label>
              <Input type="number" value={height} onChange={e => setHeight(e.target.value)} className="rounded-xl mt-1" />
            </div>
            <div>
              <Label className="text-sm flex items-center gap-1"><Target className="w-3 h-3" /> Objetivo</Label>
              <Input value={goalLabels[profile?.goal || ''] || 'No definido'} className="rounded-xl mt-1" disabled />
            </div>
          </div>

          <Button onClick={handleSave} disabled={saving} className="mt-6 rounded-xl bio-gradient border-0 text-primary-foreground">
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;
