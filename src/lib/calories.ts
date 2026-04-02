/**
 * Mifflin-St Jeor TMB calculation and goal-based calorie targets.
 */

interface CalorieInput {
  weight: number | null;   // kg
  height: number | null;   // cm
  age: number | null;
  sex: string | null;      // 'male' | 'female' | 'other'
  goal: string | null;     // 'lose_fat' | 'gain_muscle' | 'maintain'
}

export interface CalorieResult {
  tmb: number;
  dailyCalories: number;
  protein: number;   // grams
  carbs: number;     // grams
  fats: number;      // grams
  complete: boolean;
}

const ACTIVITY_FACTOR = 1.55; // moderately active

export function calculateCalories(input: CalorieInput): CalorieResult {
  const { weight, height, age, sex, goal } = input;

  if (!weight || !height || !age || !sex) {
    return { tmb: 0, dailyCalories: 2000, protein: 100, carbs: 250, fats: 67, complete: false };
  }

  // Mifflin-St Jeor
  let tmb: number;
  if (sex === 'male') {
    tmb = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    tmb = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  let tdee = Math.round(tmb * ACTIVITY_FACTOR);

  // Adjust for goal
  let dailyCalories: number;
  switch (goal) {
    case 'lose_fat':
      dailyCalories = Math.round(tdee * 0.8); // 20% deficit
      break;
    case 'gain_muscle':
      dailyCalories = Math.round(tdee * 1.15); // 15% surplus
      break;
    default:
      dailyCalories = tdee;
  }

  // Macro distribution
  const proteinCals = dailyCalories * 0.30;
  const carbsCals = dailyCalories * 0.45;
  const fatsCals = dailyCalories * 0.25;

  return {
    tmb: Math.round(tmb),
    dailyCalories,
    protein: Math.round(proteinCals / 4),
    carbs: Math.round(carbsCals / 4),
    fats: Math.round(fatsCals / 9),
    complete: true,
  };
}
