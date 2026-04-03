import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useRecipes } from '@/hooks/useRecipes';
import type { RecipeDetail } from '@/hooks/useRecipes';
import { Heart, Clock, Flame, Dumbbell, ArrowLeft, ChefHat, ListOrdered, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = ['Todas', 'Desayuno', 'Comida', 'Cena', 'Snack'];

const Recipes = () => {
  const { recipes, loading } = useRecipes();
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDetail | null>(null);

  const filtered = selectedCategory === 'Todas'
    ? recipes
    : recipes.filter(r => r.category === selectedCategory);

  const toggleFav = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-10 container mx-auto px-4">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {selectedRecipe ? (
              <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <Button variant="ghost" className="rounded-xl gap-2 mb-6" onClick={() => setSelectedRecipe(null)}>
                  <ArrowLeft className="w-4 h-4" /> Volver a recetas
                </Button>
                <div className="max-w-3xl mx-auto">
                  <div className="aspect-video rounded-3xl overflow-hidden mb-6">
                    <img src={selectedRecipe.image_url} alt={selectedRecipe.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="text-xs font-medium px-3 py-1 rounded-lg bg-accent text-accent-foreground">{selectedRecipe.category}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{selectedRecipe.time}</span>
                    {selectedRecipe.tags.map(t => (
                      <span key={t} className="text-xs px-2 py-1 rounded-lg bg-muted text-muted-foreground">{t}</span>
                    ))}
                  </div>
                  <h1 className="font-display font-bold text-3xl mb-3">{selectedRecipe.title}</h1>
                  <p className="text-muted-foreground mb-6">{selectedRecipe.description}</p>

                  <div className="grid grid-cols-4 gap-3 mb-8">
                    {[
                      { label: 'Calorías', value: selectedRecipe.calories, unit: 'kcal' },
                      { label: 'Proteína', value: selectedRecipe.protein, unit: 'g' },
                      { label: 'Carbos', value: selectedRecipe.carbs, unit: 'g' },
                      { label: 'Grasas', value: selectedRecipe.fats, unit: 'g' },
                    ].map(n => (
                      <div key={n.label} className="text-center p-3 rounded-2xl bg-muted/50">
                        <div className="font-display font-bold text-lg">{n.value}<span className="text-xs text-muted-foreground ml-0.5">{n.unit}</span></div>
                        <div className="text-xs text-muted-foreground">{n.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mb-8">
                    <h2 className="font-display font-semibold text-lg mb-3 flex items-center gap-2"><ChefHat className="w-5 h-5 text-primary" /> Ingredientes</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedRecipe.ingredients.map((ing, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground p-2 rounded-xl bg-muted/30">
                          <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                          {ing}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="font-display font-semibold text-lg mb-3 flex items-center gap-2"><ListOrdered className="w-5 h-5 text-primary" /> Preparación</h2>
                    <ol className="space-y-3">
                      {selectedRecipe.steps.map((step, i) => (
                        <li key={i} className="flex gap-3 text-sm">
                          <span className="w-7 h-7 rounded-full bio-gradient flex items-center justify-center text-primary-foreground text-xs font-bold flex-shrink-0">{i + 1}</span>
                          <span className="text-muted-foreground pt-1">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="list" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h1 className="font-display font-bold text-3xl mb-2">Recetas Saludables</h1>
                <p className="text-muted-foreground mb-6">Descubre recetas nutritivas y deliciosas para cada momento del día.</p>

                <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                  {categories.map(cat => (
                    <Button
                      key={cat}
                      variant={selectedCategory === cat ? 'default' : 'outline'}
                      size="sm"
                      className="rounded-xl text-xs whitespace-nowrap"
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>

                {filtered.length === 0 ? (
                  <p className="text-center text-muted-foreground py-12">No hay recetas en esta categoría.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filtered.map((recipe, i) => (
                      <motion.div
                        key={recipe.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="glass-card overflow-hidden hover-lift group cursor-pointer"
                        onClick={() => setSelectedRecipe(recipe)}
                      >
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img src={recipe.image_url} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                          <button
                            onClick={(e) => toggleFav(recipe.id, e)}
                            className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center"
                          >
                            <Heart className={`w-4 h-4 ${favorites.has(recipe.id) ? 'text-destructive fill-destructive' : 'text-muted-foreground'}`} />
                          </button>
                          <div className="absolute bottom-2 left-2 flex items-center gap-1">
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-md glass text-foreground">{recipe.category}</span>
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-md glass text-foreground flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" />{recipe.time}</span>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-display font-semibold text-sm mb-1">{recipe.title}</h3>
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{recipe.description}</p>
                          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                            <span className="flex items-center gap-0.5"><Flame className="w-3 h-3 text-primary" />{recipe.calories} kcal</span>
                            <span className="flex items-center gap-0.5"><Dumbbell className="w-3 h-3 text-primary" />{recipe.protein}g prot</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Recipes;
