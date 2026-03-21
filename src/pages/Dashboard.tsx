import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import { mockTodayLog, calorieGoal, waterGoal, stepsGoal, proteinGoal, carbsGoal, fatsGoal, mockChatMessages } from '@/data/mock';
import { Flame, Droplets, Footprints, Target, Plus, Send, MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { ChatMessage } from '@/types';
import { useAuth } from '@/hooks/useAuth';

const Dashboard = () => {
  const [waterMl, setWaterMl] = useState(mockTodayLog.water_ml);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [chatInput, setChatInput] = useState('');
  const [mealInput, setMealInput] = useState('');

  const calPercent = Math.round((mockTodayLog.calories / calorieGoal) * 100);
  const waterPercent = Math.round((waterMl / waterGoal) * 100);

  const addWater = (ml: number) => setWaterMl(prev => Math.min(prev + ml, waterGoal));

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: chatInput, timestamp: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setTimeout(() => {
      const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: 'Gracias por tu pregunta. Estoy procesando tu consulta para darte la mejor recomendación nutricional. 🌿', timestamp: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' }) };
      setChatMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  const summaryCards = [
    { icon: Flame, label: 'Calorías', value: `${mockTodayLog.calories}`, sub: `/ ${calorieGoal} kcal`, color: 'text-primary' },
    { icon: Droplets, label: 'Agua', value: `${waterMl}`, sub: `/ ${waterGoal} ml`, color: 'text-blue-500' },
    { icon: Footprints, label: 'Pasos', value: `${mockTodayLog.steps.toLocaleString()}`, sub: `/ ${stepsGoal.toLocaleString()}`, color: 'text-orange-500' },
    { icon: Target, label: 'Objetivo', value: 'Perder grasa', sub: 'En progreso', color: 'text-primary' },
  ];

  const macros = [
    { label: 'Proteínas', value: mockTodayLog.protein, goal: proteinGoal, color: 'bg-primary' },
    { label: 'Carbos', value: mockTodayLog.carbs, goal: carbsGoal, color: 'bg-secondary' },
    { label: 'Grasas', value: mockTodayLog.fats, goal: fatsGoal, color: 'bg-amber-500' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated userName="Carlos" />
      <main className="pt-20 pb-10 container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display font-bold text-2xl md:text-3xl mb-1">Buenos días, Carlos 👋</h1>
          <p className="text-muted-foreground text-sm mb-8">Aquí tienes tu resumen del día</p>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {summaryCards.map((card, i) => (
            <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-5">
              <card.icon className={`w-5 h-5 ${card.color} mb-3`} />
              <p className="text-xs text-muted-foreground">{card.label}</p>
              <p className="font-display font-bold text-xl">{card.value}</p>
              <p className="text-xs text-muted-foreground">{card.sub}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calorie Tracker */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 glass-card p-6">
            <h2 className="font-display font-semibold text-lg mb-4">AI Calorie Tracker</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative w-40 h-40 mx-auto md:mx-0 flex-shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(140, 15%, 90%)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="url(#gradD)" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${calPercent * 2.51} ${251 - calPercent * 2.51}`} />
                  <defs><linearGradient id="gradD" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="hsl(160, 84%, 30%)" /><stop offset="100%" stopColor="hsl(143, 64%, 24%)" /></linearGradient></defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display font-bold text-lg">{calorieGoal - mockTodayLog.calories}</span>
                  <span className="text-[10px] text-muted-foreground">restantes</span>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {macros.map((m) => (
                    <div key={m.label} className="text-center p-3 rounded-2xl bg-muted/50">
                      <div className="text-xs text-muted-foreground">{m.label}</div>
                      <div className="font-display font-bold">{m.value}g</div>
                      <div className="w-full h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
                        <div className={`h-full rounded-full ${m.color}`} style={{ width: `${Math.min((m.value / m.goal) * 100, 100)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Ej: Ensalada de pollo con arroz" value={mealInput} onChange={e => setMealInput(e.target.value)} className="rounded-xl flex-1" />
                  <Button size="sm" className="rounded-xl bio-gradient border-0 text-primary-foreground gap-1"><Plus className="w-4 h-4" /> Añadir</Button>
                </div>
                {/* Meals list */}
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {mockTodayLog.meals_json.map((meal, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 text-sm">
                      <div>
                        <span className="font-medium">{meal.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">{meal.time}</span>
                      </div>
                      <span className="text-xs font-medium text-primary">{meal.calories} kcal</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Hydration */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
            <h2 className="font-display font-semibold text-lg mb-4">Hydration Wave 💧</h2>
            <div className="relative w-32 h-48 mx-auto mb-4 rounded-3xl border-2 border-blue-200 overflow-hidden bg-blue-50/30">
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-400 to-blue-300 rounded-b-3xl"
                initial={{ height: 0 }}
                animate={{ height: `${waterPercent}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <span className="font-display font-bold text-lg">{waterPercent}%</span>
                <span className="text-[10px] text-muted-foreground">{waterMl} ml</span>
              </div>
            </div>
            <div className="flex gap-2 justify-center">
              {[250, 500].map((ml) => (
                <Button key={ml} variant="outline" size="sm" onClick={() => addWater(ml)} className="rounded-xl text-xs gap-1">
                  <Plus className="w-3 h-3" /> {ml} ml
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      {/* AI Chat Floating */}
      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-80 h-[28rem] glass-card flex flex-col shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bio-gradient flex items-center justify-center"><MessageCircle className="w-4 h-4 text-primary-foreground" /></div>
                <div>
                  <p className="text-sm font-display font-semibold">VitaFlow AI</p>
                  <p className="text-[10px] text-muted-foreground">Asistente de nutrición</p>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="p-1 hover:bg-muted rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm ${msg.role === 'user' ? 'bio-gradient text-primary-foreground' : 'bg-muted'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-border">
              <div className="flex gap-2">
                <Input placeholder="Pregunta algo..." value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleChatSend()} className="rounded-xl text-sm" />
                <Button size="sm" onClick={handleChatSend} className="rounded-xl bio-gradient border-0 text-primary-foreground"><Send className="w-4 h-4" /></Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setChatOpen(true)} className="w-14 h-14 rounded-2xl bio-gradient flex items-center justify-center shadow-lg">
            <MessageCircle className="w-6 h-6 text-primary-foreground" />
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
