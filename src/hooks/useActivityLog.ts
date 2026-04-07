import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface Activity {
  id: string;
  activity_type: string;
  duration_min: number;
  steps: number;
  calories_burned: number;
  notes: string;
}

const ACTIVITY_TYPES = [
  { value: 'walking', label: 'Caminar', emoji: '🚶', calsPerMin: 4 },
  { value: 'running', label: 'Correr', emoji: '🏃', calsPerMin: 10 },
  { value: 'cycling', label: 'Ciclismo', emoji: '🚴', calsPerMin: 7 },
  { value: 'gym', label: 'Gimnasio', emoji: '🏋️', calsPerMin: 6 },
  { value: 'swimming', label: 'Natación', emoji: '🏊', calsPerMin: 8 },
  { value: 'yoga', label: 'Yoga', emoji: '🧘', calsPerMin: 3 },
  { value: 'other', label: 'Otro', emoji: '⚡', calsPerMin: 5 },
];

export { ACTIVITY_TYPES };

export function useActivityLog(date: string) {
  const { user } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchActivities = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    setLoading(true);
    const { data } = await supabase
      .from('activity_logs')
      .select('id, activity_type, duration_min, steps, calories_burned, notes')
      .eq('user_id', user.id)
      .eq('date', date)
      .order('created_at', { ascending: true });
    setActivities((data as Activity[]) || []);
    setLoading(false);
  }, [user, date]);

  useEffect(() => { fetchActivities(); }, [fetchActivities]);

  const addActivity = useCallback(async (entry: Omit<Activity, 'id'>) => {
    if (!user) return;
    const { data } = await supabase
      .from('activity_logs')
      .insert([{ ...entry, user_id: user.id, date }])
      .select('id, activity_type, duration_min, steps, calories_burned, notes')
      .single();
    if (data) setActivities(prev => [...prev, data as Activity]);
  }, [user, date]);

  const deleteActivity = useCallback(async (id: string) => {
    if (!user) return;
    await supabase.from('activity_logs').delete().eq('id', id);
    setActivities(prev => prev.filter(a => a.id !== id));
  }, [user]);

  const totals = activities.reduce(
    (acc, a) => ({
      duration: acc.duration + a.duration_min,
      steps: acc.steps + a.steps,
      calories: acc.calories + a.calories_burned,
    }),
    { duration: 0, steps: 0, calories: 0 }
  );

  return { activities, loading, addActivity, deleteActivity, totals, refetch: fetchActivities };
}
