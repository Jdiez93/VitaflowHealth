import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockProducts, type ProductDetail } from '@/data/mock';
import { Star, X, Leaf, Flame, Dumbbell } from 'lucide-react';

const ProductCard = ({ product, onClick }: { product: ProductDetail; onClick: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="glass-card overflow-hidden hover-lift cursor-pointer group"
    onClick={onClick}
  >
    <div className="aspect-square overflow-hidden">
      <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
    </div>
    <div className="p-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-accent text-accent-foreground">{product.category}</span>
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
          <span className="text-xs text-muted-foreground">{product.rating}</span>
        </div>
      </div>
      <h3 className="font-display font-semibold text-sm mb-1 truncate">{product.name}</h3>
      <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
      <div className="mt-3 flex items-center gap-3 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-primary" />{product.nutritionPer100g.calories} kcal</span>
        <span className="flex items-center gap-1"><Dumbbell className="w-3 h-3 text-primary" />{product.nutritionPer100g.protein}g prot</span>
      </div>
    </div>
  </motion.div>
);

const ProductModal = ({ product, onClose }: { product: ProductDetail; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className="glass-card max-w-lg w-full max-h-[85vh] overflow-y-auto"
      onClick={e => e.stopPropagation()}
    >
      <div className="relative aspect-video overflow-hidden rounded-t-3xl">
        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
        <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center">
          <X className="w-4 h-4" />
        </button>
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="text-xs font-medium px-2 py-1 rounded-lg bg-accent text-accent-foreground">{product.category}</span>
          <span className="text-xs font-medium px-2 py-1 rounded-lg glass flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />{product.rating}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h2 className="font-display font-bold text-xl mb-2">{product.name}</h2>
        <p className="text-sm text-muted-foreground mb-5">{product.description}</p>

        {/* Nutrition grid */}
        <div className="grid grid-cols-5 gap-2 mb-5">
          {[
            { label: 'Calorías', value: product.nutritionPer100g.calories, unit: 'kcal' },
            { label: 'Proteína', value: product.nutritionPer100g.protein, unit: 'g' },
            { label: 'Carbos', value: product.nutritionPer100g.carbs, unit: 'g' },
            { label: 'Grasas', value: product.nutritionPer100g.fats, unit: 'g' },
            { label: 'Fibra', value: product.nutritionPer100g.fiber, unit: 'g' },
          ].map((n) => (
            <div key={n.label} className="text-center p-2 rounded-2xl bg-muted/50">
              <div className="font-display font-bold text-sm">{n.value}<span className="text-[10px] text-muted-foreground">{n.unit}</span></div>
              <div className="text-[10px] text-muted-foreground">{n.label}</div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground mb-5">* Valores por 100g</p>

        {/* Ingredients */}
        <div className="mb-5">
          <h3 className="font-display font-semibold text-sm mb-2 flex items-center gap-1"><Leaf className="w-4 h-4 text-primary" /> Ingredientes</h3>
          <div className="flex flex-wrap gap-2">
            {product.ingredients.map((ing) => (
              <span key={ing} className="text-xs px-3 py-1.5 rounded-xl bg-accent text-accent-foreground">{ing}</span>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div>
          <h3 className="font-display font-semibold text-sm mb-2">Beneficios</h3>
          <div className="space-y-2">
            {product.benefits.map((b) => (
              <div key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const ProductsGallery = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(null);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-primary mb-2 block">Curated</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">Productos Recomendados</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Selección de alimentos y superfoods con información nutricional detallada.</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} onClick={() => setSelectedProduct(product)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default ProductsGallery;
