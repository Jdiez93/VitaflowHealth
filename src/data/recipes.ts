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

export const recipesData: RecipeDetail[] = [
  // DESAYUNOS
  {
    id: 'r1', title: 'Bowl de Açaí y Granola', description: 'Desayuno energético con açaí, plátano, granola artesanal y semillas de chía.', image_url: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600', category: 'Desayuno', time: '10 min', calories: 380, protein: 8, carbs: 58, fats: 14,
    ingredients: ['200g pulpa de açaí', '1 plátano', '30g granola', '10g semillas de chía', '5 fresas', 'Miel al gusto'],
    steps: ['Tritura el açaí con medio plátano y un poco de agua.', 'Vierte en un bowl.', 'Decora con rodajas de plátano, fresas, granola y chía.', 'Añade un chorrito de miel.'],
    tags: ['Vegetariano', 'Alto en fibra'],
  },
  {
    id: 'r2', title: 'Tortilla de Espinacas y Queso Feta', description: 'Tortilla esponjosa rica en proteínas con espinacas frescas y queso feta.', image_url: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=600', category: 'Desayuno', time: '15 min', calories: 310, protein: 24, carbs: 4, fats: 22,
    ingredients: ['3 huevos', '50g espinacas frescas', '30g queso feta', 'Sal y pimienta', 'Aceite de oliva'],
    steps: ['Bate los huevos con sal y pimienta.', 'Saltea las espinacas en una sartén con aceite.', 'Vierte los huevos batidos y cocina a fuego medio.', 'Añade el queso feta desmenuzado y dobla.'],
    tags: ['Alta en proteína', 'Keto-friendly'],
  },
  {
    id: 'r3', title: 'Avena Overnight con Frutas', description: 'Avena preparada la noche anterior con leche de almendra, canela y frutas del bosque.', image_url: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=600', category: 'Desayuno', time: '5 min + reposo', calories: 320, protein: 10, carbs: 52, fats: 8,
    ingredients: ['60g copos de avena', '200ml leche de almendra', '1 cda semillas de chía', '½ cdta canela', '80g frutas del bosque', '1 cda miel'],
    steps: ['Mezcla la avena, leche, chía y canela en un tarro.', 'Tapa y refrigera toda la noche.', 'Por la mañana, añade las frutas y la miel.', 'Disfruta frío o a temperatura ambiente.'],
    tags: ['Vegetariano', 'Meal prep'],
  },
  {
    id: 'r4', title: 'Tostadas de Aguacate y Huevo', description: 'Pan integral tostado con aguacate cremoso, huevo poché y semillas.', image_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600', category: 'Desayuno', time: '12 min', calories: 350, protein: 16, carbs: 30, fats: 20,
    ingredients: ['2 rebanadas pan integral', '1 aguacate maduro', '2 huevos', 'Semillas de sésamo', 'Sal en escamas', 'Chile en hojuelas (opcional)'],
    steps: ['Tuesta el pan.', 'Aplasta el aguacate con un tenedor y extiéndelo sobre las tostadas.', 'Prepara los huevos pochés en agua hirviendo con vinagre.', 'Coloca los huevos sobre el aguacate y decora con semillas y sal.'],
    tags: ['Alta en proteína', 'Saludable'],
  },
  // COMIDAS
  {
    id: 'r5', title: 'Bowl de Quinoa Mediterráneo', description: 'Quinoa con tomates cherry, pepino, aceitunas, feta y vinagreta de limón.', image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600', category: 'Comida', time: '25 min', calories: 420, protein: 15, carbs: 48, fats: 20,
    ingredients: ['150g quinoa cocida', '100g tomates cherry', '½ pepino', '30g aceitunas negras', '30g queso feta', 'Aceite de oliva', 'Zumo de limón', 'Orégano'],
    steps: ['Cuece la quinoa según las instrucciones.', 'Corta los tomates, pepino y aceitunas.', 'Mezcla todo en un bowl.', 'Aliña con aceite de oliva, limón y orégano.', 'Desmenuza el feta por encima.'],
    tags: ['Vegetariano', 'Mediterráneo'],
  },
  {
    id: 'r6', title: 'Pechuga de Pollo a la Plancha con Boniato', description: 'Pollo jugoso marinado con especias, acompañado de boniato asado y brócoli.', image_url: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600', category: 'Comida', time: '35 min', calories: 480, protein: 42, carbs: 38, fats: 14,
    ingredients: ['200g pechuga de pollo', '1 boniato mediano', '150g brócoli', 'Pimentón', 'Ajo en polvo', 'Aceite de oliva', 'Sal y pimienta'],
    steps: ['Marina el pollo con pimentón, ajo, sal y aceite.', 'Corta el boniato en cubos y ásalo a 200°C durante 20 min.', 'Cocina el pollo a la plancha 5-6 min por lado.', 'Cuece el brócoli al vapor 4 minutos.', 'Sirve todo junto.'],
    tags: ['Alta en proteína', 'Sin gluten'],
  },
  {
    id: 'r7', title: 'Salmón al Horno con Espárragos', description: 'Filete de salmón glaseado con miso y miel, con espárragos trigueros al horno.', image_url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600', category: 'Comida', time: '25 min', calories: 450, protein: 38, carbs: 12, fats: 28,
    ingredients: ['200g filete de salmón', '1 manojo de espárragos', '1 cda miso blanco', '1 cda miel', '1 cda salsa de soja', 'Sésamo', 'Aceite de oliva'],
    steps: ['Mezcla miso, miel y soja para el glaseado.', 'Unta el salmón con el glaseado.', 'Coloca salmón y espárragos en una bandeja con aceite.', 'Hornea a 200°C durante 15 min.', 'Espolvorea sésamo al servir.'],
    tags: ['Omega-3', 'Sin gluten'],
  },
  {
    id: 'r8', title: 'Tacos de Lechuga con Pavo', description: 'Tacos ligeros usando hojas de lechuga como base, rellenos de pavo especiado.', image_url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600', category: 'Comida', time: '20 min', calories: 320, protein: 30, carbs: 10, fats: 18,
    ingredients: ['250g carne de pavo picada', 'Hojas de lechuga iceberg', '1 zanahoria rallada', 'Salsa de soja', 'Jengibre rallado', 'Cebollino', 'Aceite de sésamo'],
    steps: ['Saltea el pavo con jengibre, soja y aceite de sésamo.', 'Ralla la zanahoria.', 'Lava y seca las hojas de lechuga.', 'Rellena las hojas con pavo y zanahoria.', 'Decora con cebollino.'],
    tags: ['Baja en carbos', 'Alta en proteína'],
  },
  // CENAS
  {
    id: 'r9', title: 'Crema de Calabaza y Jengibre', description: 'Sopa cremosa de calabaza con un toque de jengibre y leche de coco.', image_url: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=600', category: 'Cena', time: '30 min', calories: 220, protein: 4, carbs: 30, fats: 10,
    ingredients: ['500g calabaza', '1 cebolla', '1 trozo jengibre fresco', '100ml leche de coco', 'Caldo de verduras', 'Semillas de calabaza', 'Aceite de oliva'],
    steps: ['Sofríe cebolla y jengibre rallado.', 'Añade la calabaza troceada y cubre con caldo.', 'Cocina 20 min hasta que esté tierna.', 'Tritura y añade la leche de coco.', 'Sirve con semillas de calabaza.'],
    tags: ['Vegano', 'Baja en calorías'],
  },
  {
    id: 'r10', title: 'Ensalada Tibia de Lentejas', description: 'Lentejas con verduras asadas, rúcula, queso de cabra y vinagreta de mostaza.', image_url: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=600', category: 'Cena', time: '25 min', calories: 380, protein: 22, carbs: 40, fats: 14,
    ingredients: ['200g lentejas cocidas', '1 pimiento rojo', '1 calabacín', '50g rúcula', '30g queso de cabra', '1 cda mostaza Dijon', 'Aceite de oliva', 'Vinagre de manzana'],
    steps: ['Asa el pimiento y calabacín en el horno.', 'Mezcla lentejas con las verduras asadas.', 'Prepara la vinagreta con mostaza, aceite y vinagre.', 'Sirve sobre un lecho de rúcula.', 'Desmenuzar queso de cabra por encima.'],
    tags: ['Vegetariano', 'Rica en hierro'],
  },
  {
    id: 'r11', title: 'Wok de Verduras y Tofu', description: 'Salteado rápido de verduras crujientes con tofu firme y salsa teriyaki casera.', image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600', category: 'Cena', time: '20 min', calories: 300, protein: 18, carbs: 28, fats: 14,
    ingredients: ['200g tofu firme', '1 pimiento', '1 zanahoria', '100g brócoli', '50g tirabeques', 'Salsa de soja', 'Miel', 'Jengibre', 'Aceite de sésamo'],
    steps: ['Corta el tofu en cubos y dóralo en sartén.', 'Saltea las verduras cortadas en juliana.', 'Mezcla soja, miel y jengibre para la salsa.', 'Añade el tofu y la salsa al wok.', 'Saltea 2 min más y sirve.'],
    tags: ['Vegano', 'Alta en fibra'],
  },
  {
    id: 'r12', title: 'Merluza en Papillote', description: 'Merluza al horno en papel con verduras, limón y hierbas frescas.', image_url: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=600', category: 'Cena', time: '25 min', calories: 250, protein: 32, carbs: 8, fats: 10,
    ingredients: ['200g filete de merluza', '1 calabacín', '10 tomates cherry', 'Limón', 'Eneldo fresco', 'Aceite de oliva', 'Sal y pimienta'],
    steps: ['Coloca el pescado sobre papel de horno.', 'Rodea con verduras cortadas, rodajas de limón y eneldo.', 'Rocía con aceite de oliva.', 'Cierra el papillote y hornea a 180°C durante 18 min.', 'Abre y sirve inmediatamente.'],
    tags: ['Baja en calorías', 'Sin gluten'],
  },
  // SNACKS
  {
    id: 'r13', title: 'Energy Balls de Dátiles y Cacao', description: 'Bolitas energéticas sin horno con dátiles, avena, cacao y almendras.', image_url: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600', category: 'Snack', time: '15 min', calories: 140, protein: 4, carbs: 18, fats: 7,
    ingredients: ['100g dátiles Medjool', '50g avena', '20g cacao en polvo', '30g almendras', '1 cda mantequilla de almendras', 'Coco rallado'],
    steps: ['Tritura dátiles, avena, cacao y almendras en un procesador.', 'Añade la mantequilla de almendras y mezcla.', 'Forma bolitas con las manos.', 'Reboza en coco rallado.', 'Refrigera al menos 30 min antes de comer.'],
    tags: ['Vegano', 'Sin azúcar añadida'],
  },
  {
    id: 'r14', title: 'Yogur Griego con Nueces y Miel', description: 'Snack rápido y proteico con yogur griego, nueces, miel y canela.', image_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600', category: 'Snack', time: '3 min', calories: 220, protein: 16, carbs: 18, fats: 10,
    ingredients: ['150g yogur griego natural', '20g nueces', '1 cda miel', 'Canela al gusto'],
    steps: ['Sirve el yogur en un bowl.', 'Añade las nueces troceadas.', 'Rocía con miel y espolvorea canela.'],
    tags: ['Alta en proteína', 'Rápido'],
  },
  {
    id: 'r15', title: 'Hummus Casero con Crudités', description: 'Hummus cremoso de garbanzos con palitos de zanahoria, pepino y apio.', image_url: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=600', category: 'Snack', time: '10 min', calories: 190, protein: 8, carbs: 22, fats: 8,
    ingredients: ['200g garbanzos cocidos', '2 cdas tahini', '1 diente de ajo', 'Zumo de limón', 'Pimentón', 'Aceite de oliva', 'Zanahoria', 'Pepino', 'Apio'],
    steps: ['Tritura garbanzos, tahini, ajo, limón y aceite hasta obtener una crema.', 'Sirve con pimentón y un chorro de aceite.', 'Corta las verduras en palitos.', 'Acompaña y disfruta.'],
    tags: ['Vegano', 'Rico en fibra'],
  },
  // ALTAS EN PROTEÍNA
  {
    id: 'r16', title: 'Batido de Proteína y Plátano', description: 'Batido cremoso post-entrenamiento con proteína, plátano, avena y mantequilla de cacahuete.', image_url: 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=600', category: 'Desayuno', time: '5 min', calories: 400, protein: 32, carbs: 45, fats: 12,
    ingredients: ['1 scoop proteína whey (vainilla)', '1 plátano', '30g avena', '1 cda mantequilla de cacahuete', '250ml leche', 'Hielo'],
    steps: ['Añade todos los ingredientes a la licuadora.', 'Tritura hasta obtener textura suave.', 'Sirve frío inmediatamente.'],
    tags: ['Alta en proteína', 'Post-entreno'],
  },
  // VEGETARIANAS
  {
    id: 'r17', title: 'Curry de Garbanzos y Espinacas', description: 'Curry especiado con garbanzos, espinacas y leche de coco. Reconfortante y nutritivo.', image_url: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600', category: 'Comida', time: '30 min', calories: 380, protein: 14, carbs: 42, fats: 18,
    ingredients: ['400g garbanzos cocidos', '200g espinacas', '200ml leche de coco', '1 cebolla', '2 dientes de ajo', 'Curry en polvo', 'Cúrcuma', 'Comino', 'Tomate triturado'],
    steps: ['Sofríe cebolla y ajo.', 'Añade especias y sofríe 1 min.', 'Agrega tomate triturado y garbanzos.', 'Vierte la leche de coco y cocina 15 min.', 'Incorpora las espinacas y cocina 3 min más.', 'Sirve con arroz basmati.'],
    tags: ['Vegano', 'Reconfortante'],
  },
  {
    id: 'r18', title: 'Pasta Integral con Pesto de Rúcula', description: 'Pasta integral con pesto casero de rúcula, almendras y parmesano.', image_url: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600', category: 'Comida', time: '20 min', calories: 440, protein: 16, carbs: 55, fats: 18,
    ingredients: ['150g pasta integral', '80g rúcula', '30g almendras', '30g parmesano', '1 diente de ajo', 'Aceite de oliva virgen extra', 'Sal'],
    steps: ['Cuece la pasta al dente.', 'Tritura rúcula, almendras, ajo, parmesano y aceite.', 'Escurre la pasta y mézclala con el pesto.', 'Sirve con un poco de parmesano extra.'],
    tags: ['Vegetariano', 'Energético'],
  },
  // BAJAS EN CALORÍAS
  {
    id: 'r19', title: 'Ensalada César Ligera', description: 'Versión ligera con pollo a la plancha, lechuga romana y aderezo de yogur.', image_url: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600', category: 'Comida', time: '15 min', calories: 280, protein: 28, carbs: 12, fats: 14,
    ingredients: ['150g pechuga de pollo', 'Lechuga romana', '20g parmesano', 'Yogur griego', 'Mostaza Dijon', 'Limón', 'Ajo en polvo'],
    steps: ['Cocina el pollo a la plancha y córtalo en tiras.', 'Lava y trocea la lechuga.', 'Mezcla yogur, mostaza, limón y ajo para el aderezo.', 'Ensambla la ensalada y añade parmesano en láminas.'],
    tags: ['Baja en calorías', 'Alta en proteína'],
  },
  {
    id: 'r20', title: 'Gazpacho Andaluz', description: 'Sopa fría de tomate tradicional, perfecta para días calurosos.', image_url: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600', category: 'Cena', time: '15 min + reposo', calories: 120, protein: 3, carbs: 15, fats: 6,
    ingredients: ['500g tomates maduros', '½ pepino', '½ pimiento verde', '1 diente de ajo', 'Pan del día anterior', 'Aceite de oliva virgen extra', 'Vinagre de Jerez', 'Sal'],
    steps: ['Trocea todas las verduras.', 'Tritura con el pan remojado, aceite y vinagre.', 'Pasa por un colador si deseas textura fina.', 'Refrigera al menos 2 horas.', 'Sirve frío con un chorrito de aceite.'],
    tags: ['Vegano', 'Baja en calorías', 'Sin cocción'],
  },
];
