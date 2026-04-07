import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import { Flame, Droplets, Target, Plus, CalendarDays, AlertCircle, ChevronLeft, ChevronRight, Loader2, Activity, Trash2, Footprints, Timer, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Meal } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { useDailyLog } from '@/hooks/useDailyLog';
import { useActivityLog, ACTIVITY_TYPES } from '@/hooks/useActivityLog';
import { calculateCalories } from '@/lib/calories';
import { useToast } from '@/hooks/use-toast';

// Nutrition per 100g database
interface NutritionPer100g {
  calories: number; protein: number; carbs: number; fats: number;
}

const FOOD_DB: Record<string, NutritionPer100g> = {
  'ensalada': { calories: 65, protein: 3, carbs: 5, fats: 4 },
  'pollo': { calories: 165, protein: 31, carbs: 0, fats: 4 },
  'arroz': { calories: 130, protein: 2.7, carbs: 28, fats: 0.3 },
  'huevos': { calories: 155, protein: 13, carbs: 1, fats: 11 },
  'avena': { calories: 389, protein: 17, carbs: 66, fats: 7 },
  'yogur': { calories: 59, protein: 10, carbs: 4, fats: 0.7 },
  'fruta': { calories: 52, protein: 0.3, carbs: 14, fats: 0.2 },
  'salmón': { calories: 208, protein: 20, carbs: 0, fats: 13 },
  'pasta': { calories: 131, protein: 5, carbs: 25, fats: 1 },
  'tostada': { calories: 265, protein: 9, carbs: 49, fats: 3 },
  'batido': { calories: 80, protein: 5, carbs: 12, fats: 2 },
  'sandwich': { calories: 250, protein: 12, carbs: 28, fats: 10 },
  'sopa': { calories: 40, protein: 2, carbs: 6, fats: 1 },
  'carne': { calories: 250, protein: 26, carbs: 0, fats: 17 },
  'pescado': { calories: 140, protein: 20, carbs: 0, fats: 6 },
  'pan': { calories: 265, protein: 9, carbs: 49, fats: 3 },
  'queso': { calories: 350, protein: 25, carbs: 1, fats: 27 },
  'leche': { calories: 42, protein: 3.4, carbs: 5, fats: 1 },
  'plátano': { calories: 89, protein: 1, carbs: 23, fats: 0.3 },
  'aguacate': { calories: 160, protein: 2, carbs: 9, fats: 15 },
};

function estimateNutrition(name: string, quantity: number): Omit<Meal, 'name' | 'time'> {
  const lower = name.toLowerCase();
  const factor = quantity / 100;
  for (const [key, val] of Object.entries(FOOD_DB)) {
    if (lower.includes(key)) {
      return {
        quantity, unit: 'g',
        calories: Math.round(val.calories * factor),
        protein: Math.round(val.protein * factor),
        carbs: Math.round(val.carbs * factor),
        fats: Math.round(val.fats * factor),
      };
    }
  }
  // Fallback: ~200kcal per 100g
  const fb: NutritionPer100g = { calories: 200, protein: 10, carbs: 25, fats: 8 };
  return {
    quantity, unit: 'g',
    calories: Math.round(fb.calories * factor),
    protein: Math.round(fb.protein * factor),
    carbs: Math.round(fb.carbs * factor),
    fats: Math.round(fb.fats * factor),
  };
}

function formatDateES(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function getDateStr(offset: number = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().split('T')[0];
}

const Dashboard = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [dateOffset, setDateOffset] = useState(0);
  const selectedDate = getDateStr(dateOffset);
  const isToday = dateOffset === 0;

  const { log, loading, addMeal, addWater } = useDailyLog(selectedDate);
  const { activities, loading: actLoading, addActivity, deleteActivity, totals } = useActivityLog(selectedDate);

  const [mealInput, setMealInput] = useState('');
  const [mealQuantity, setMealQuantity] = useState('100');
  const [addingMeal, setAddingMeal] = useState(false);
  const [actType, setActType] = useState('walking');
  const [actDuration, setActDuration] = useState('30');
  const [actSteps, setActSteps] = useState('0');
  const [addingAct, setAddingAct] = useState(false);

  const calorieData = useMemo(() => calculateCalories({
    weight: profile?.weight ? Number(profile.weight) : null,
    height: profile?.height ? Number(profile.height) : null,
    age: profile?.age ?? null,
    sex: profile?.sex ?? null,
    goal: profile?.goal ?? null,
  }), [profile]);

  const calPercent = calorieData.dailyCalories > 0 ? Math.min(Math.round((log.calories / calorieData.dailyCalories) * 100), 100) : 0;
  const waterGoal = 2500;
  const waterPercent = Math.min(Math.round((log.water_ml / waterGoal) * 100), 100);

  const displayName = profile?.full_name || 'Usuario';
  const goalLabels: Record<string, string> = { lose_fat: 'Perder grasa', gain_muscle: 'Ganar músculo', maintain: 'Mantenerme' };

  const handleAddMeal = async () => {
    if (!mealInput.trim()) {
      toast({ title: 'Escribe una comida', description: 'El campo no puede estar vacío.', variant: 'destructive' });
      return;
    }
    const qty = parseInt(mealQuantity) || 100;
    if (qty <= 0 || qty > 5000) {
      toast({ title: 'Cantidad inválida', description: 'Introduce una cantidad entre 1 y 5000 g.', variant: 'destructive' });
      return;
    }
    setAddingMeal(true);
    const nutrition = estimateNutrition(mealInput, qty);
    const meal: Meal = {
      name: mealInput.trim(),
      ...nutrition,
      time: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' }),
    };
    await addMeal(meal);
    setMealInput('');
    setMealQuantity('100');
    toast({ title: 'Comida registrada', description: `${meal.name} (${qty}g) — ${meal.calories} kcal` });
    setAddingMeal(false);
  };


  const handleAddActivity = async () => {
    const dur = parseInt(actDuration) || 0;
    const steps = parseInt(actSteps) || 0;
    if (dur <= 0 || dur > 600) {
      toast({ title: 'Duración inválida', description: 'Introduce entre 1 y 600 minutos.', variant: 'destructive' });
      return;
    }
    setAddingAct(true);
    const typeInfo = ACTIVITY_TYPES.find(t => t.value === actType) || ACTIVITY_TYPES[6];
    const cals = Math.round(typeInfo.calsPerMin * dur);
    await addActivity({ activity_type: actType, duration_min: dur, steps, calories_burned: cals, notes: '' });
    setActDuration('30');
    setActSteps('0');
    toast({ title: 'Actividad registrada', description: `${typeInfo.label} — ${dur} min · ${cals} kcal quemadas` });
    setAddingAct(false);
  };

  const summaryCards = [
    { icon: Flame, label: 'Calorías', value: `${log.calories}`, sub: `/ ${calorieData.dailyCalories} kcal`, color: 'text-primary' },
    { icon: Droplets, label: 'Agua', value: `${log.water_ml}`, sub: `/ ${waterGoal} ml`, color: 'text-blue-500' },
    { icon: Target, label: 'Objetivo', value: goalLabels[profile?.goal || ''] || '—', sub: calorieData.complete ? `TMB: ${calorieData.tmb}` : 'Completa tu perfil', color: 'text-primary' },
  ];

  const macros = [
    { label: 'Proteínas', value: log.protein, goal: calorieData.protein, color: 'bg-primary' },
    { label: 'Carbos', value: log.carbs, goal: calorieData.carbs, color: 'bg-secondary' },
    { label: 'Grasas', value: log.fats, goal: calorieData.fats, color: 'bg-amber-500' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-10 container mx-auto px-4">
        {/* Greeting + Date */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display font-bold text-2xl md:text-3xl mb-1">
            {isToday ? `Buenos días, ${displayName} 👋` : displayName}
          </h1>
          <div className="flex items-center gap-3 mb-2">
            <CalendarDays className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground capitalize">{formatDateES(selectedDate)}</span>
          </div>
          {/* Date nav */}
          <div className="flex items-center gap-2 mb-6">
            <Button variant="ghost" size="icon" className="rounded-xl h-8 w-8" onClick={() => setDateOffset(d => d - 1)}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant={isToday ? 'default' : 'outline'} size="sm" className="rounded-xl text-xs" onClick={() => setDateOffset(0)}>Hoy</Button>
            <Button variant="ghost" size="icon" className="rounded-xl h-8 w-8" onClick={() => setDateOffset(d => Math.min(d + 1, 0))} disabled={isToday}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {!calorieData.complete && (
            <div className="flex items-center gap-2 p-3 mb-6 rounded-2xl bg-accent border border-border text-foreground text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-primary" />
              Completa tu perfil (peso, altura, edad, sexo) para calcular tus calorías personalizadas.
            </div>
          )}
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : (
          <>
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
                      <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="url(#gradD)" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${calPercent * 2.51} ${251 - calPercent * 2.51}`} />
                      <defs><linearGradient id="gradD" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="hsl(var(--primary))" /><stop offset="100%" stopColor="hsl(var(--secondary))" /></linearGradient></defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-display font-bold text-lg">{Math.max(calorieData.dailyCalories - log.calories, 0)}</span>
                      <span className="text-[10px] text-muted-foreground">restantes</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      {macros.map((m) => (
                        <div key={m.label} className="text-center p-3 rounded-2xl bg-muted/50">
                          <div className="text-xs text-muted-foreground">{m.label}</div>
                          <div className="font-display font-bold">{m.value}g</div>
                          <div className="text-[10px] text-muted-foreground">/ {m.goal}g</div>
                          <div className="w-full h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
                            <div className={`h-full rounded-full ${m.color}`} style={{ width: `${Math.min((m.value / m.goal) * 100, 100)}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    {isToday && (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Ej: Pollo, arroz, ensalada..."
                            value={mealInput}
                            onChange={e => setMealInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleAddMeal()}
                            className="rounded-xl flex-1"
                          />
                          <Input
                            type="number"
                            placeholder="g"
                            value={mealQuantity}
                            onChange={e => setMealQuantity(e.target.value)}
                            className="rounded-xl w-20 text-center"
                            min={1}
                            max={5000}
                          />
                          <Button size="sm" onClick={handleAddMeal} disabled={addingMeal} className="rounded-xl bio-gradient border-0 text-primary-foreground gap-1">
                            {addingMeal ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Añadir
                          </Button>
                        </div>
                        <p className="text-[10px] text-muted-foreground">Indica el alimento y la cantidad en gramos para un cálculo más preciso.</p>
                      </div>
                    )}
                    {/* Meals list */}
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {log.meals_json.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          {isToday ? 'Todavía no has registrado comidas hoy' : 'Sin comidas registradas este día'}
                        </p>
                      ) : (
                        log.meals_json.map((meal, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 text-sm">
                            <div>
                              <span className="font-medium">{meal.name}</span>
                              <span className="text-xs text-muted-foreground ml-2">{meal.quantity ?? ''}{'unit' in meal ? (meal.unit || 'g') : 'g'} · {meal.time}</span>
                            </div>
                            <span className="text-xs font-medium text-primary">{meal.calories} kcal</span>
                          </div>
                        ))
                      )}
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
                    <span className="text-[10px] text-muted-foreground">{log.water_ml} ml</span>
                  </div>
                </div>
                {log.water_ml === 0 && !isToday ? (
                  <p className="text-xs text-muted-foreground text-center">Aún no has añadido agua</p>
                ) : (
                  <div className="flex gap-2 justify-center">
                    {isToday && [250, 500].map((ml) => (
                      <Button key={ml} variant="outline" size="sm" onClick={() => addWater(ml)} className="rounded-xl text-xs gap-1">
                        <Plus className="w-3 h-3" /> {ml} ml
                      </Button>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </>
        )}
      </main>

    </div>
  );
};

export default Dashboard;
