import type { NewsArticle, Product, UserRecipe, DailyLog, ChatMessage, Meal } from '@/types';

export const mockNews: NewsArticle[] = [
  {
    id: '1',
    title: 'Cómo la dieta mediterránea reduce el riesgo cardiovascular en un 30%',
    summary: 'Nuevos estudios confirman que seguir una dieta rica en aceite de oliva, frutos secos y pescado azul mejora significativamente la salud del corazón.',
    image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600',
    category: 'Nutrición',
    read_time: '5 min',
    date: '2026-03-20',
    source: 'Journal of Nutrition',
  },
  {
    id: '2',
    title: 'El ayuno intermitente y sus efectos reales según la ciencia',
    summary: 'Meta-análisis revela que el ayuno 16:8 puede mejorar la sensibilidad a la insulina y promover la autofagia celular.',
    image_url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600',
    category: 'Bienestar',
    read_time: '7 min',
    date: '2026-03-19',
    source: 'The Lancet',
  },
  {
    id: '3',
    title: 'Microbiota intestinal: la clave para un sistema inmune fuerte',
    summary: 'Descubre cómo los probióticos y prebióticos pueden transformar tu salud digestiva y fortalecer tus defensas naturales.',
    image_url: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600',
    category: 'Salud',
    read_time: '6 min',
    date: '2026-03-18',
    source: 'Nature Medicine',
  },
  {
    id: '4',
    title: 'Proteínas vegetales: guía completa para deportistas',
    summary: 'Combinar legumbres, cereales y semillas puede ofrecer un perfil aminoácido completo sin necesidad de proteína animal.',
    image_url: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=600',
    category: 'Deportes',
    read_time: '4 min',
    date: '2026-03-17',
    source: 'Sports Science Review',
  },
];

export const mockProducts: Product[] = [
  { id: '1', name: 'Açaí Bowl Orgánico', description: 'Mezcla rica en antioxidantes con frutas frescas', image_url: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400', category: 'Superfoods', rating: 4.8 },
  { id: '2', name: 'Matcha Premium Grade', description: 'Té verde en polvo ceremonial de Kioto', image_url: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400', category: 'Bebidas', rating: 4.9 },
  { id: '3', name: 'Semillas de Chía', description: 'Fuente natural de omega-3 y fibra soluble', image_url: 'https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=400', category: 'Semillas', rating: 4.7 },
  { id: '4', name: 'Granola Artesanal', description: 'Sin azúcar añadida con frutos secos y coco', image_url: 'https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?w=400', category: 'Cereales', rating: 4.6 },
  { id: '5', name: 'Kombucha Natural', description: 'Bebida probiótica fermentada artesanalmente', image_url: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=400', category: 'Bebidas', rating: 4.5 },
  { id: '6', name: 'Aguacate Hass', description: 'Grasas saludables y potasio en cada porción', image_url: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400', category: 'Frescos', rating: 4.8 },
];

export const mockRecipes: UserRecipe[] = [
  { id: '1', user_id: '1', title: 'Bowl de Quinoa Tropical', description: 'Quinoa con mango, aguacate, edamame y aderezo de jengibre', image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', is_favorite: true, created_at: '2026-03-15' },
  { id: '2', user_id: '1', title: 'Smoothie Verde Energizante', description: 'Espinaca, plátano, semillas de chía y leche de almendra', image_url: 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400', is_favorite: true, created_at: '2026-03-14' },
  { id: '3', user_id: '1', title: 'Salmón al Horno con Vegetales', description: 'Salmón glaseado con miso, brócoli y boniato asado', image_url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400', is_favorite: false, created_at: '2026-03-13' },
  { id: '4', user_id: '1', title: 'Tostadas de Aguacate', description: 'Pan integral con aguacate, huevo poché y semillas de sésamo', image_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400', is_favorite: true, created_at: '2026-03-12' },
];

export const mockTodayLog: DailyLog = {
  id: '1',
  user_id: '1',
  date: new Date().toISOString().split('T')[0],
  calories: 1650,
  protein: 95,
  carbs: 180,
  fats: 62,
  water_ml: 1500,
  steps: 7200,
  meals_json: [
    { name: 'Avena con frutas', calories: 380, protein: 12, carbs: 58, fats: 10, time: '08:00' },
    { name: 'Ensalada César', calories: 520, protein: 35, carbs: 28, fats: 30, time: '13:00' },
    { name: 'Yogur con nueces', calories: 250, protein: 18, carbs: 20, fats: 12, time: '16:30' },
    { name: 'Pollo a la plancha', calories: 500, protein: 30, carbs: 74, fats: 10, time: '20:00' },
  ],
  created_at: new Date().toISOString(),
};

export const mockChatMessages: ChatMessage[] = [
  { id: '1', role: 'assistant', content: '¡Hola! Soy tu asistente de nutrición VitaFlow AI. ¿En qué puedo ayudarte hoy? 🌿', timestamp: '09:00' },
  { id: '2', role: 'user', content: '¿Qué debería cenar si quiero algo ligero pero nutritivo?', timestamp: '09:01' },
  { id: '3', role: 'assistant', content: 'Te recomiendo una ensalada tibia de quinoa con salmón al horno, espinacas baby y un aderezo de limón y tahini. Tiene unas 450 kcal, 35g de proteína y es rica en omega-3. ¿Te gustaría la receta completa? 🥗', timestamp: '09:01' },
];

export const calorieGoal = 2200;
export const waterGoal = 2500;
export const stepsGoal = 10000;
export const proteinGoal = 130;
export const carbsGoal = 275;
export const fatsGoal = 73;
