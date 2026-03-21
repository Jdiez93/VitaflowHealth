import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { mockRecipes } from '@/data/mock';
import { Heart, Clock } from 'lucide-react';

const Recipes = () => {
  const [recipes, setRecipes] = useState(mockRecipes);

  const toggleFav = (id: string) => {
    setRecipes(prev => prev.map(r => r.id === id ? { ...r, is_favorite: !r.is_favorite } : r));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-10 container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display font-bold text-3xl mb-2">Recetas Saludables</h1>
          <p className="text-muted-foreground mb-8">Descubre recetas nutritivas y deliciosas para cada momento del día.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recipes.map((recipe, i) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card overflow-hidden hover-lift group"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={recipe.image_url} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <button
                  onClick={() => toggleFav(recipe.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center"
                >
                  <Heart className={`w-4 h-4 ${recipe.is_favorite ? 'text-destructive fill-destructive' : 'text-muted-foreground'}`} />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-display font-semibold text-sm mb-1">{recipe.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{recipe.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Recipes;
