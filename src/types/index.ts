export interface Profile {
  id: string;
  full_name: string;
  email: string;
  age: number | null;
  weight: number | null;
  height: number | null;
  sex: 'male' | 'female' | 'other' | null;
  goal: 'lose_fat' | 'gain_muscle' | 'maintain' | null;
  avatar_url: string | null;
  onboarding_completed: boolean;
  created_at: string;
}

export interface DailyLog {
  id: string;
  user_id: string;
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  water_ml: number;
  steps: number;
  meals_json: Meal[];
  created_at: string;
}

export interface Meal {
  name: string;
  quantity: number;   // grams, ml, or units
  unit: string;       // 'g' | 'ml' | 'unidad'
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  time: string;
}

export interface UserRecipe {
  id: string;
  user_id: string;
  title: string;
  description: string;
  image_url: string;
  is_favorite: boolean;
  created_at: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  image_url: string;
  category: string;
  read_time: string;
  date: string;
  source: string;
  content?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  category: string;
  rating: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
