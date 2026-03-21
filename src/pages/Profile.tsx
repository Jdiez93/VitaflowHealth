import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import { User, Mail, Ruler, Weight, Calendar, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Profile = () => {
  const profile = {
    full_name: 'Carlos Martínez',
    email: 'carlos@vitaflow.com',
    age: 28,
    weight: 75,
    height: 178,
    sex: 'Masculino',
    goal: 'Perder grasa',
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated userName={profile.full_name} />
      <main className="pt-20 pb-10 container mx-auto px-4 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display font-bold text-2xl mb-6">Mi Perfil</h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-8">
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bio-gradient flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-foreground">{profile.full_name[0]}</span>
            </div>
            <div>
              <h2 className="font-display font-semibold text-lg">{profile.full_name}</h2>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm flex items-center gap-1"><User className="w-3 h-3" /> Nombre</Label>
              <Input defaultValue={profile.full_name} className="rounded-xl mt-1" />
            </div>
            <div>
              <Label className="text-sm flex items-center gap-1"><Mail className="w-3 h-3" /> Email</Label>
              <Input defaultValue={profile.email} className="rounded-xl mt-1" disabled />
            </div>
            <div>
              <Label className="text-sm flex items-center gap-1"><Calendar className="w-3 h-3" /> Edad</Label>
              <Input type="number" defaultValue={profile.age} className="rounded-xl mt-1" />
            </div>
            <div>
              <Label className="text-sm flex items-center gap-1"><Weight className="w-3 h-3" /> Peso (kg)</Label>
              <Input type="number" defaultValue={profile.weight} className="rounded-xl mt-1" />
            </div>
            <div>
              <Label className="text-sm flex items-center gap-1"><Ruler className="w-3 h-3" /> Altura (cm)</Label>
              <Input type="number" defaultValue={profile.height} className="rounded-xl mt-1" />
            </div>
            <div>
              <Label className="text-sm flex items-center gap-1"><Target className="w-3 h-3" /> Objetivo</Label>
              <Input defaultValue={profile.goal} className="rounded-xl mt-1" />
            </div>
          </div>

          <Button className="mt-6 rounded-xl bio-gradient border-0 text-primary-foreground">Guardar cambios</Button>
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;
