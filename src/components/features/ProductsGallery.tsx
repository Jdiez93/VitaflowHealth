import { motion } from 'framer-motion';
import { mockProducts } from '@/data/mock';
import { Star } from 'lucide-react';

const ProductsGallery = () => (
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
        <p className="text-muted-foreground max-w-lg mx-auto">Selección de alimentos y superfoods para potenciar tu nutrición.</p>
      </motion.div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {mockProducts.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="glass-card overflow-hidden hover-lift cursor-pointer group"
          >
            <div className="aspect-square overflow-hidden rounded-t-3xl">
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
            <div className="p-3">
              <h3 className="font-display font-semibold text-xs mb-1 truncate">{product.name}</h3>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                <span className="text-xs text-muted-foreground">{product.rating}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProductsGallery;
