import { motion } from 'framer-motion';
import { mockTodayLog, calorieGoal, proteinGoal, carbsGoal, fatsGoal } from '@/data/mock';

const TrackerPreview = () => {
  const calPercent = Math.round((mockTodayLog.calories / calorieGoal) * 100);
  const remaining = calorieGoal - mockTodayLog.calories;

  const macros = [
    { label: 'Proteínas', value: mockTodayLog.protein, goal: proteinGoal, color: 'bg-primary' },
    { label: 'Carbos', value: mockTodayLog.carbs, goal: carbsGoal, color: 'bg-secondary' },
    { label: 'Grasas', value: mockTodayLog.fats, goal: fatsGoal, color: 'bg-yellow-500' },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-primary mb-2 block">Preview</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">Seguimiento Inteligente</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Visualiza tu progreso diario con gráficos claros y detallados.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto glass-card p-8"
        >
          {/* Donut chart placeholder */}
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(140 15% 90%)" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="40" fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${calPercent * 2.51} ${251 - calPercent * 2.51}`}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(160, 84%, 30%)" />
                  <stop offset="100%" stopColor="hsl(143, 64%, 24%)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display font-bold text-2xl">{remaining}</span>
              <span className="text-xs text-muted-foreground">kcal restantes</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {macros.map((m) => (
              <div key={m.label} className="text-center">
                <div className="text-xs text-muted-foreground mb-1">{m.label}</div>
                <div className="font-display font-bold text-sm">{m.value}g</div>
                <div className="w-full h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
                  <div className={`h-full rounded-full ${m.color}`} style={{ width: `${Math.min((m.value / m.goal) * 100, 100)}%` }} />
                </div>
                <div className="text-xs text-muted-foreground mt-1">{m.goal}g</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrackerPreview;
