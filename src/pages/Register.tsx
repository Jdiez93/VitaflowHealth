import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast({ title: 'Demo', description: 'Conecta Supabase para habilitar el registro.' });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4">
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md glass-card p-8">
        <Link to="/" className="flex items-center gap-2 justify-center mb-8">
          <div className="w-10 h-10 rounded-xl bio-gradient flex items-center justify-center">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl">VitaFlow AI</span>
        </Link>

        <h1 className="font-display font-bold text-2xl text-center mb-2">Crea tu cuenta</h1>
        <p className="text-sm text-muted-foreground text-center mb-8">Comienza tu viaje hacia un estilo de vida más saludable</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm">Nombre completo</Label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="name" placeholder="Tu nombre" value={name} onChange={e => setName(e.target.value)} className="pl-10 rounded-xl" required />
            </div>
          </div>
          <div>
            <Label htmlFor="email" className="text-sm">Email</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="email" type="email" placeholder="tu@email.com" value={email} onChange={e => setEmail(e.target.value)} className="pl-10 rounded-xl" required />
            </div>
          </div>
          <div>
            <Label htmlFor="password" className="text-sm">Contraseña</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="password" type="password" placeholder="Mínimo 6 caracteres" value={password} onChange={e => setPassword(e.target.value)} className="pl-10 rounded-xl" required />
            </div>
          </div>
          <Button type="submit" disabled={loading} className="w-full rounded-xl bio-gradient border-0 text-primary-foreground h-11 gap-2">
            {loading ? 'Creando cuenta...' : <>Registrarse <ArrowRight className="w-4 h-4" /></>}
          </Button>
        </form>

        <p className="text-sm text-muted-foreground text-center mt-6">
          ¿Ya tienes cuenta? <Link to="/login" className="text-primary font-medium hover:underline">Inicia sesión</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
