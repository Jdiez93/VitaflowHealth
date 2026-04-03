import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface RecipeDetail {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: string[];
  steps: string[];
  tags: string[];
}

export function useRecipes() {
  const [recipes, setRecipes] = useState<RecipeDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('is_active', true)
        .order('published_at', { ascending: false });

      if (data && !error) {
        setRecipes(data.map(r => ({
          id: r.id,
          title: r.title,
          description: r.description,
          image_url: r.image_url,
          category: r.category,
          time: r.time,
          calories: r.calories,
          protein: r.protein,
          carbs: r.carbs,
          fats: r.fats,
          ingredients: Array.isArray(r.ingredients) ? r.ingredients as string[] : [],
          steps: Array.isArray(r.steps) ? r.steps as string[] : [],
          tags: Array.isArray(r.tags) ? r.tags as string[] : [],
        })));
      }
      setLoading(false);
    };
    fetchRecipes();
  }, []);

  return { recipes, loading };
}
