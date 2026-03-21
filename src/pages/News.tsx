import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { mockNews } from '@/data/mock';
import { Clock, ArrowUpRight } from 'lucide-react';

const News = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-20 pb-10 container mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-bold text-3xl mb-2">Noticias de Salud</h1>
        <p className="text-muted-foreground mb-8">Las últimas novedades en nutrición, bienestar y ciencia.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockNews.map((article, i) => (
          <motion.article
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card overflow-hidden hover-lift cursor-pointer group flex flex-col md:flex-row"
          >
            <div className="md:w-48 aspect-video md:aspect-square overflow-hidden flex-shrink-0">
              <img src={article.image_url} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
            <div className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium px-2 py-1 rounded-lg bg-accent text-accent-foreground">{article.category}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{article.read_time}</span>
                </div>
                <h2 className="font-display font-semibold text-base mb-2 group-hover:text-primary transition-colors">{article.title}</h2>
                <p className="text-sm text-muted-foreground line-clamp-2">{article.summary}</p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-sm text-primary font-medium">
                Leer artículo <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </main>
    <Footer />
  </div>
);

export default News;
