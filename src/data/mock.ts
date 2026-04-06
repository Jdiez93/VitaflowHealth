import type { NewsArticle, Product, UserRecipe, DailyLog, ChatMessage } from '@/types';

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
    content: `La dieta mediterránea ha demostrado ser una de las más saludables del mundo. Un reciente meta-análisis publicado en el Journal of Nutrition, que incluyó más de 12,000 participantes, confirma que seguir este patrón alimentario reduce el riesgo de enfermedades cardiovasculares en un 30%.

**¿Qué incluye la dieta mediterránea?**

- Aceite de oliva virgen extra como grasa principal
- Abundantes frutas y verduras frescas
- Legumbres y cereales integrales
- Pescado azul al menos 2-3 veces por semana
- Frutos secos y semillas
- Consumo moderado de lácteos fermentados
- Reducción de carnes rojas y procesadas

**Beneficios comprobados:**

1. Reducción de colesterol LDL (malo) y aumento del HDL (bueno)
2. Mejora de la presión arterial
3. Disminución de marcadores inflamatorios
4. Protección contra el deterioro cognitivo
5. Control del peso corporal

Los investigadores recomiendan adoptar este estilo de alimentación de forma progresiva, comenzando por sustituir las grasas saturadas por aceite de oliva y aumentando el consumo de pescado y vegetales.`,
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
    content: `El ayuno intermitente se ha convertido en una de las estrategias nutricionales más populares. Pero, ¿qué dice realmente la ciencia?

**Protocolo 16:8**

El método más estudiado consiste en restringir la ingesta de alimentos a una ventana de 8 horas y ayunar las 16 restantes. Los resultados son prometedores:

- Mejora de la sensibilidad a la insulina en un 20-30%
- Activación de la autofagia (limpieza celular)
- Reducción de marcadores inflamatorios
- Pérdida de grasa corporal sin pérdida significativa de masa muscular

**Precauciones importantes:**

No es recomendable para embarazadas, personas con trastornos alimentarios o diabetes tipo 1 sin supervisión médica. Lo ideal es consultar con un profesional antes de comenzar.`,
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
    content: `Tu intestino alberga billones de microorganismos que juegan un papel fundamental en tu salud. La microbiota intestinal influye directamente en tu sistema inmune, estado de ánimo y metabolismo.

**Alimentos probióticos recomendados:**
- Yogur natural sin azúcar
- Kéfir
- Chucrut y kimchi
- Kombucha
- Miso y tempeh

**Alimentos prebióticos (alimentan a tus bacterias buenas):**
- Plátano verde
- Ajo y cebolla
- Alcachofa
- Espárragos
- Avena

Mantener una microbiota diversa es clave para una salud óptima. La recomendación es consumir al menos 30 plantas diferentes por semana.`,
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
    content: `Cada vez más deportistas optan por fuentes de proteína vegetal. La ciencia demuestra que es perfectamente posible cubrir las necesidades proteicas con una dieta basada en plantas.

**Mejores fuentes de proteína vegetal:**
- Lentejas: 25g de proteína por 100g
- Garbanzos: 19g por 100g
- Tofu: 15g por 100g
- Tempeh: 20g por 100g
- Quinoa: 14g por 100g
- Semillas de cáñamo: 31g por 100g

**Combinaciones inteligentes:**
Arroz + lentejas, pan integral + hummus, tofu + quinoa. Estas combinaciones aseguran un perfil completo de aminoácidos esenciales.`,
  },
];

export interface ProductDetail extends Product {
  ingredients: string[];
  nutritionPer100g: { calories: number; protein: number; carbs: number; fats: number; fiber: number };
  benefits: string[];
}

export const mockProducts: ProductDetail[] = [
  { id: '1', name: 'Açaí Bowl Orgánico', description: 'Mezcla rica en antioxidantes con frutas frescas y granola crujiente', image_url: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&auto=format&fit=crop', category: 'Superfoods', rating: 4.8, ingredients: ['Açaí liofilizado', 'Plátano', 'Arándanos', 'Granola artesanal', 'Miel de abeja', 'Coco rallado'], nutritionPer100g: { calories: 165, protein: 3, carbs: 28, fats: 5, fiber: 4 }, benefits: ['Alto en antioxidantes', 'Fuente de vitamina C', 'Energía natural'] },
  { id: '2', name: 'Matcha Premium Grade', description: 'Té verde en polvo ceremonial de Kioto, rico en L-teanina', image_url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&auto=format&fit=crop', category: 'Bebidas', rating: 4.9, ingredients: ['Hojas de té verde molidas', 'Origen: Uji, Kioto'], nutritionPer100g: { calories: 324, protein: 30, carbs: 39, fats: 5, fiber: 39 }, benefits: ['Concentración y calma', 'Metabolismo activo', 'Rico en catequinas'] },
  { id: '3', name: 'Semillas de Chía', description: 'Fuente natural de omega-3, fibra soluble y proteína vegetal', image_url: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&auto=format&fit=crop', category: 'Semillas', rating: 4.7, ingredients: ['Semillas de chía orgánicas 100%'], nutritionPer100g: { calories: 486, protein: 17, carbs: 42, fats: 31, fiber: 34 }, benefits: ['Omega-3 vegetal', 'Saciedad prolongada', 'Salud digestiva'] },
  { id: '4', name: 'Granola Artesanal', description: 'Sin azúcar añadida, con frutos secos, coco y canela', image_url: 'https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?w=400&auto=format&fit=crop', category: 'Cereales', rating: 4.6, ingredients: ['Avena integral', 'Almendras', 'Nueces', 'Coco rallado', 'Semillas de girasol', 'Canela', 'Aceite de coco'], nutritionPer100g: { calories: 420, protein: 12, carbs: 55, fats: 18, fiber: 8 }, benefits: ['Energía sostenida', 'Sin azúcar añadida', 'Rica en fibra'] },
  { id: '5', name: 'Kombucha Natural', description: 'Bebida probiótica fermentada artesanalmente con SCOBY vivo', image_url: 'https://images.unsplash.com/photo-1595981234058-a9302fb97229?w=400&auto=format&fit=crop', category: 'Bebidas', rating: 4.5, ingredients: ['Té verde', 'Azúcar de caña (fermentada)', 'Cultivo SCOBY', 'Jengibre fresco'], nutritionPer100g: { calories: 15, protein: 0, carbs: 3, fats: 0, fiber: 0 }, benefits: ['Probióticos naturales', 'Mejora digestión', 'Bajo en calorías'] },
  { id: '6', name: 'Aguacate Hass', description: 'Grasas monoinsaturadas, potasio y vitamina E en cada porción', image_url: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&auto=format&fit=crop', category: 'Frescos', rating: 4.8, ingredients: ['Aguacate Hass 100% natural'], nutritionPer100g: { calories: 160, protein: 2, carbs: 9, fats: 15, fiber: 7 }, benefits: ['Grasas saludables', 'Rico en potasio', 'Salud cardiovascular'] },
  { id: '7', name: 'Espirulina en Polvo', description: 'Microalga con 60% proteína y hierro biodisponible', image_url: 'https://images.unsplash.com/photo-1622485831930-34ac18684aae?w=400&auto=format&fit=crop', category: 'Superfoods', rating: 4.6, ingredients: ['Espirulina orgánica deshidratada'], nutritionPer100g: { calories: 290, protein: 57, carbs: 24, fats: 8, fiber: 4 }, benefits: ['Proteína completa', 'Rico en hierro', 'Desintoxicante natural'] },
  { id: '8', name: 'Mantequilla de Almendras', description: 'Crema 100% almendras tostadas sin aditivos ni azúcar', image_url: 'https://images.unsplash.com/photo-1612187209234-a3b1b8f38bba?w=400&auto=format&fit=crop', category: 'Untables', rating: 4.7, ingredients: ['Almendras tostadas 100%'], nutritionPer100g: { calories: 614, protein: 21, carbs: 19, fats: 56, fiber: 10 }, benefits: ['Vitamina E', 'Magnesio', 'Grasas mono-insaturadas'] },
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
    { name: 'Avena con frutas', quantity: 200, unit: 'g', calories: 380, protein: 12, carbs: 58, fats: 10, time: '08:00' },
    { name: 'Ensalada César', quantity: 300, unit: 'g', calories: 520, protein: 35, carbs: 28, fats: 30, time: '13:00' },
    { name: 'Yogur con nueces', quantity: 150, unit: 'g', calories: 250, protein: 18, carbs: 20, fats: 12, time: '16:30' },
    { name: 'Pollo a la plancha', quantity: 250, unit: 'g', calories: 500, protein: 30, carbs: 74, fats: 10, time: '20:00' },
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
