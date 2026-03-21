import { motion } from 'framer-motion';
import { mockNews } from '@/data/mock';
import { Clock, ArrowUpRight } from 'lucide-react';

const NewsFeed = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="text-sm font-medium text-primary mb-2 block">AI Feed</span>
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">Noticias de Salud</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">Artículos curados sobre nutrición, bienestar y ciencia de la salud.</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockNews.map((article, i) => (
          <motion.article
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group glass-card overflow-hidden hover-lift cursor-pointer"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-t-3xl">
              <img src={article.image_url} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium px-2 py-1 rounded-lg bg-accent text-accent-foreground">{article.category}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{article.read_time}</span>
              </div>
              <h3 className="font-display font-semibold text-sm leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{article.summary}</p>
              <div className="mt-3 flex items-center gap-1 text-xs text-primary font-medium">
                Leer más <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default NewsFeed;
