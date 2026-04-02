import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import type { Meal } from '@/types';
import type { Json } from '@/integrations/supabase/types';

export interface DailyLogData {
  id: string | null;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  water_ml: number;
  steps: number;
  meals_json: Meal[];
}

const emptyLog: DailyLogData = {
  id: null,
  calories: 0,
  protein: 0,
  carbs: 0,
  fats: 0,
  water_ml: 0,
  steps: 0,
  meals_json: [],
};

export function useDailyLog(date: string) {
  const { user } = useAuth();
  const [log, setLog] = useState<DailyLogData>(emptyLog);
  const [loading, setLoading] = useState(true);

  const fetchLog = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    setLoading(true);
    const { data } = await supabase
      .from('daily_logs')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', date)
      .maybeSingle();

    if (data) {
      const meals = Array.isArray(data.meals_json) ? (data.meals_json as unknown as Meal[]) : [];
      setLog({
        id: data.id,
        calories: data.calories,
        protein: Number(data.protein),
        carbs: Number(data.carbs),
        fats: Number(data.fats),
        water_ml: data.water_ml,
        steps: data.steps,
        meals_json: meals,
      });
    } else {
      setLog(emptyLog);
    }
    setLoading(false);
  }, [user, date]);

  useEffect(() => { fetchLog(); }, [fetchLog]);

  const upsertLog = useCallback(async (updates: Partial<DailyLogData>) => {
    if (!user) return;
    const newLog = { ...log, ...updates };
    setLog(newLog);

    const mealsJson = JSON.parse(JSON.stringify(newLog.meals_json)) as Json;
    const payload = {
      date,
      calories: newLog.calories,
      protein: newLog.protein,
      carbs: newLog.carbs,
      fats: newLog.fats,
      water_ml: newLog.water_ml,
      steps: newLog.steps,
      meals_json: mealsJson,
    };

    if (log.id) {
      await supabase.from('daily_logs').update(payload).eq('id', log.id);
    } else {
      const { data } = await supabase.from('daily_logs').insert({ ...payload, user_id: user.id }).select('id').single();
      if (data) setLog(prev => ({ ...prev, id: data.id }));
    }
  }, [user, date, log]);

  const addMeal = useCallback(async (meal: Meal) => {
    const newMeals = [...log.meals_json, meal];
    const newCals = log.calories + meal.calories;
    const newProtein = log.protein + meal.protein;
    const newCarbs = log.carbs + meal.carbs;
    const newFats = log.fats + meal.fats;
    await upsertLog({
      meals_json: newMeals,
      calories: newCals,
      protein: newProtein,
      carbs: newCarbs,
      fats: newFats,
    });
  }, [log, upsertLog]);

  const addWater = useCallback(async (ml: number) => {
    await upsertLog({ water_ml: Math.min(log.water_ml + ml, 5000) });
  }, [log, upsertLog]);

  return { log, loading, addMeal, addWater, refetch: fetchLog };
}
