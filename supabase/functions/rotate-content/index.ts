import { createClient } from "https://esm.sh/@supabase/supabase-js@2.99.3";
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.99.3/cors";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// Sample content pools for rotation
const newsPool = [
  { title: "Nuevos estudios revelan beneficios del ayuno intermitente 16:8", summary: "Investigadores confirman mejoras en sensibilidad a insulina y marcadores de inflamación.", content: "El ayuno intermitente 16:8 sigue ganando evidencia científica. Un nuevo metaanálisis publicado en el Journal of Clinical Nutrition ha demostrado que esta práctica, cuando se realiza de forma consistente durante al menos 8 semanas, mejora significativamente la sensibilidad a la insulina y reduce marcadores inflamatorios como la PCR.", image_url: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600", category: "Nutrición", source: "Journal of Clinical Nutrition", read_time: "4 min" },
  { title: "El ejercicio matutino mejora la calidad del sueño según Harvard", summary: "Entrenar antes de las 10 AM se asocia con un 30% más de sueño profundo.", content: "Un estudio longitudinal de Harvard Health Publishing con más de 5.000 participantes ha demostrado que las personas que hacen ejercicio entre las 7 y las 10 de la mañana experimentan un 30% más de sueño profundo comparado con quienes entrenan por la noche.", image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600", category: "Fitness", source: "Harvard Health Publishing", read_time: "3 min" },
  { title: "Omega-3: la dosis diaria recomendada sube a 500 mg según la OMS", summary: "Actualización de las guías nutricionales para prevención cardiovascular.", content: "La Organización Mundial de la Salud ha actualizado sus recomendaciones de ácidos grasos omega-3, elevando la dosis diaria mínima a 500 mg de EPA+DHA combinados para adultos sanos.", image_url: "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?w=600", category: "Nutrición", source: "OMS", read_time: "5 min" },
  { title: "Meditación y microbioma: la conexión mente-intestino", summary: "La meditación regular altera positivamente la composición de la microbiota intestinal.", content: "Un estudio publicado en Nature Neuroscience ha encontrado que practicantes regulares de meditación mindfulness presentan mayor diversidad microbiana intestinal y niveles más altos de bacterias productoras de butirato.", image_url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600", category: "Bienestar", source: "Nature Neuroscience", read_time: "4 min" },
  { title: "Proteína vegetal vs animal: nuevo consenso científico", summary: "Combinar fuentes vegetales puede igualar la calidad proteica de fuentes animales.", content: "Un panel de expertos en nutrición deportiva ha concluido que las proteínas vegetales, cuando se combinan estratégicamente, pueden proporcionar todos los aminoácidos esenciales en cantidades equivalentes a la proteína animal.", image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600", category: "Nutrición", source: "Sports Nutrition Review", read_time: "6 min" },
  { title: "Caminar 7.000 pasos diarios reduce mortalidad un 50%", summary: "Nuevo estudio confirma que no se necesitan 10.000 pasos para obtener beneficios.", content: "Un estudio publicado en JAMA Network Open ha demostrado que caminar al menos 7.000 pasos al día se asocia con una reducción del 50-70% en la mortalidad por todas las causas en adultos de mediana edad.", image_url: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600", category: "Fitness", source: "JAMA Network Open", read_time: "3 min" },
  { title: "Vitamina D: el 40% de la población mundial tiene déficit", summary: "Los expertos piden más suplementación y exposición solar controlada.", content: "Un informe global publicado en The Lancet revela que aproximadamente el 40% de la población mundial tiene niveles insuficientes de vitamina D, lo que se asocia con mayor riesgo de osteoporosis, depresión e infecciones respiratorias.", image_url: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600", category: "Salud", source: "The Lancet", read_time: "4 min" },
  { title: "La creatina no es solo para deportistas: beneficios cognitivos", summary: "Suplementar con creatina mejora la memoria de trabajo y reduce fatiga mental.", content: "Una revisión sistemática publicada en Experimental Gerontology ha encontrado que la suplementación con creatina monohidratada mejora la memoria de trabajo, especialmente en situaciones de estrés y privación de sueño.", image_url: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600", category: "Suplementos", source: "Experimental Gerontology", read_time: "5 min" },
  { title: "Dormir menos de 6 horas duplica el riesgo de resfriados", summary: "El sistema inmune depende críticamente de la duración del sueño.", content: "Investigadores de la Universidad de California han demostrado que las personas que duermen menos de 6 horas por noche tienen 4.2 veces más probabilidades de contraer un resfriado común comparado con quienes duermen más de 7 horas.", image_url: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600", category: "Descanso", source: "UC Sleep Research", read_time: "3 min" },
  { title: "Fermentados: más allá del yogur, descubre el kéfir y el kimchi", summary: "Los alimentos fermentados diversos mejoran la salud intestinal más que los probióticos en cápsulas.", content: "Un estudio de Stanford Medicine ha revelado que una dieta rica en alimentos fermentados variados durante 10 semanas aumenta la diversidad del microbioma y reduce 19 marcadores inflamatorios.", image_url: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=600", category: "Nutrición", source: "Stanford Medicine", read_time: "4 min" },
  { title: "Entrenamiento de fuerza: ahora recomendado desde los 7 años", summary: "Las guías pediátricas actualizan sus recomendaciones sobre ejercicio de resistencia en niños.", content: "La Academia Americana de Pediatría ha actualizado sus guías para incluir el entrenamiento de fuerza supervisado desde los 7 años, tras evidencia de que mejora la densidad ósea, coordinación y autoestima.", image_url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600", category: "Fitness", source: "AAP", read_time: "5 min" },
  { title: "Estrés crónico envejece el cerebro 10 años según estudio", summary: "Técnicas de manejo del estrés pueden revertir parcialmente el daño cognitivo.", content: "Un estudio de neuroimagen publicado en Biological Psychiatry ha mostrado que el estrés crónico acelera el envejecimiento cerebral en hasta 10 años, pero que intervenciones como mindfulness y ejercicio regular pueden revertir parcialmente estos cambios.", image_url: "https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=600", category: "Salud Mental", source: "Biological Psychiatry", read_time: "4 min" },
];

const recipesPool = [
  { title: "Bowl Mediterráneo de Quinoa", description: "Bowl nutritivo con quinoa, garbanzos, pepino, tomate y salsa tahini.", image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600", category: "Almuerzo", time: "25 min", calories: 420, protein: 18, carbs: 52, fats: 16, ingredients: ["200g quinoa","150g garbanzos cocidos","1 pepino","2 tomates","50g queso feta","Aceitunas kalamata","Tahini","Limón","Aceite de oliva"], steps: ["Cocina la quinoa según instrucciones.","Corta pepino y tomates en cubos.","Mezcla tahini con limón y agua para la salsa.","Monta el bowl con quinoa, garbanzos, verduras y feta.","Aliña con la salsa tahini."], tags: ["Vegetariano","Alto en proteína","Mediterráneo"] },
  { title: "Salmón al Horno con Espárragos", description: "Salmón jugoso al horno con espárragos trigueros y limón.", image_url: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600", category: "Cena", time: "30 min", calories: 380, protein: 35, carbs: 8, fats: 22, ingredients: ["200g filete de salmón","200g espárragos trigueros","1 limón","Ajo","Aceite de oliva","Eneldo fresco","Sal y pimienta"], steps: ["Precalienta horno a 200°C.","Coloca salmón y espárragos en bandeja.","Aliña con aceite, ajo, limón y eneldo.","Hornea 18-20 minutos.","Sirve con rodajas de limón."], tags: ["Alto en Omega-3","Bajo en carbos","Sin gluten"] },
  { title: "Smoothie Verde Detox", description: "Batido verde con espinacas, piña, jengibre y semillas de chía.", image_url: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=600", category: "Desayuno", time: "5 min", calories: 180, protein: 5, carbs: 32, fats: 4, ingredients: ["2 puñados espinacas","100g piña","1 plátano","1cm jengibre fresco","1 cda semillas de chía","200ml agua de coco"], steps: ["Añade todos los ingredientes a la batidora.","Bate hasta obtener una textura suave.","Sirve inmediatamente.","Opcional: añade hielo para más frescura."], tags: ["Vegano","Detox","Rápido"] },
  { title: "Wrap de Pollo y Aguacate", description: "Wrap integral con pollo a la plancha, aguacate y verduras crujientes.", image_url: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600", category: "Almuerzo", time: "15 min", calories: 450, protein: 32, carbs: 38, fats: 18, ingredients: ["1 tortilla integral","150g pechuga de pollo","1/2 aguacate","Lechuga","Tomate","Cebolla morada","Yogur griego","Limón"], steps: ["Cocina el pollo a la plancha con especias.","Corta aguacate y verduras.","Mezcla yogur con limón para la salsa.","Monta el wrap con todos los ingredientes.","Enrolla bien y corta por la mitad."], tags: ["Alto en proteína","Equilibrado","Rápido"] },
  { title: "Porridge de Avena con Frutos Rojos", description: "Avena cremosa con leche de almendras, frutos rojos y nueces.", image_url: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=600", category: "Desayuno", time: "10 min", calories: 320, protein: 10, carbs: 48, fats: 12, ingredients: ["80g copos de avena","250ml leche de almendras","100g frutos rojos","20g nueces","1 cda miel","Canela"], steps: ["Cocina la avena con la leche a fuego medio 5-7 min.","Remueve hasta obtener textura cremosa.","Sirve con frutos rojos y nueces.","Añade miel y canela al gusto."], tags: ["Vegetariano","Rico en fibra","Energético"] },
  { title: "Ensalada Caesar con Pollo", description: "Clásica ensalada Caesar con pollo a la parrilla y aderezo casero.", image_url: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600", category: "Almuerzo", time: "20 min", calories: 380, protein: 30, carbs: 15, fats: 22, ingredients: ["200g pechuga de pollo","1 lechuga romana","30g parmesano","Croutons integrales","1 huevo","Anchoas","Mostaza Dijon","Aceite de oliva","Limón"], steps: ["Cocina el pollo a la parrilla y córtalo en láminas.","Prepara el aderezo: mezcla huevo, anchoas, mostaza, limón y aceite.","Corta la lechuga y mézclala con el aderezo.","Añade pollo, croutons y parmesano rallado."], tags: ["Alto en proteína","Clásico","Saciante"] },
  { title: "Tacos de Pescado con Slaw", description: "Tacos de pescado blanco con ensalada de col crujiente y salsa de lima.", image_url: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600", category: "Cena", time: "25 min", calories: 340, protein: 28, carbs: 30, fats: 12, ingredients: ["300g pescado blanco","Tortillas de maíz","200g col morada","1 zanahoria","Cilantro","Lima","Yogur griego","Comino","Pimentón"], steps: ["Sazona el pescado con comino y pimentón.","Cocina a la plancha 3-4 min por lado.","Ralla col y zanahoria para el slaw.","Mezcla slaw con yogur, lima y cilantro.","Monta los tacos con pescado y slaw."], tags: ["Bajo en grasa","Mexicano","Fresco"] },
  { title: "Energy Bites de Cacao y Avena", description: "Bolitas energéticas sin horno con cacao, avena y mantequilla de cacahuete.", image_url: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600", category: "Snack", time: "10 min", calories: 150, protein: 5, carbs: 18, fats: 8, ingredients: ["100g avena","60g mantequilla de cacahuete","30g cacao en polvo","40g miel","30g chips de chocolate negro","1 cda semillas de lino"], steps: ["Mezcla todos los ingredientes en un bowl.","Refrigera la masa 15 minutos.","Forma bolitas con las manos húmedas.","Guarda en la nevera hasta servir."], tags: ["Vegano","Sin horno","Energético"] },
  { title: "Curry de Garbanzos y Espinacas", description: "Curry vegano cremoso con garbanzos, espinacas y leche de coco.", image_url: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600", category: "Cena", time: "30 min", calories: 390, protein: 15, carbs: 42, fats: 18, ingredients: ["400g garbanzos cocidos","200g espinacas","200ml leche de coco","1 cebolla","3 dientes de ajo","Curry en polvo","Cúrcuma","Jengibre","Tomate triturado"], steps: ["Sofríe cebolla, ajo y jengibre.","Añade curry, cúrcuma y tomate.","Incorpora garbanzos y leche de coco.","Cocina 15 min a fuego medio.","Añade espinacas al final y cocina 2 min más."], tags: ["Vegano","Alto en fibra","Reconfortante"] },
  { title: "Tortilla de Claras con Verduras", description: "Tortilla ligera de claras con espinacas, champiñones y pimiento.", image_url: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=600", category: "Desayuno", time: "10 min", calories: 180, protein: 22, carbs: 6, fats: 6, ingredients: ["4 claras de huevo","1 huevo entero","50g espinacas","50g champiñones","1/2 pimiento rojo","Aceite de oliva","Sal y pimienta"], steps: ["Saltea las verduras cortadas en una sartén.","Bate claras y huevo con sal y pimienta.","Vierte sobre las verduras.","Cocina a fuego medio-bajo hasta cuajar.","Dobla y sirve."], tags: ["Bajo en calorías","Alto en proteína","Keto-friendly"] },
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Deactivate old content
    await supabase.from("news").update({ is_active: false }).eq("is_active", true);
    await supabase.from("recipes").update({ is_active: false }).eq("is_active", true);

    // Pick random subset for rotation
    const shuffledNews = newsPool.sort(() => Math.random() - 0.5).slice(0, 8);
    const shuffledRecipes = recipesPool.sort(() => Math.random() - 0.5).slice(0, 8);

    const now = new Date().toISOString();

    // Insert new news
    const newsToInsert = shuffledNews.map((n, i) => ({
      ...n,
      published_at: new Date(Date.now() - i * 86400000).toISOString(),
      is_active: true,
    }));
    const { error: newsErr } = await supabase.from("news").insert(newsToInsert);
    if (newsErr) throw newsErr;

    // Insert new recipes
    const recipesToInsert = shuffledRecipes.map((r) => ({
      ...r,
      ingredients: JSON.stringify(r.ingredients),
      steps: JSON.stringify(r.steps),
      tags: JSON.stringify(r.tags),
      published_at: now,
      is_active: true,
    }));
    const { error: recErr } = await supabase.from("recipes").insert(recipesToInsert);
    if (recErr) throw recErr;

    return new Response(
      JSON.stringify({ success: true, news: shuffledNews.length, recipes: shuffledRecipes.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
