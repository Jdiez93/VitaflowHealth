import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { mockNews } from '@/data/mock';
import { Clock, ArrowUpRight, ArrowLeft, BookOpen, X } from 'lucide-react';
import type { NewsArticle } from '@/types';
import { Button } from '@/components/ui/button';

const News = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-10 container mx-auto px-4">
        <AnimatePresence mode="wait">
          {selectedArticle ? (
            <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Button variant="ghost" className="rounded-xl gap-2 mb-6" onClick={() => setSelectedArticle(null)}>
                <ArrowLeft className="w-4 h-4" /> Volver a noticias
              </Button>
              <div className="max-w-3xl mx-auto">
                <div className="aspect-video rounded-3xl overflow-hidden mb-8">
                  <img src={selectedArticle.image_url} alt={selectedArticle.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-medium px-3 py-1 rounded-lg bg-accent text-accent-foreground">{selectedArticle.category}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{selectedArticle.read_time}</span>
                  <span className="text-xs text-muted-foreground">{selectedArticle.date}</span>
                  <span className="text-xs text-muted-foreground">· {selectedArticle.source}</span>
                </div>
                <h1 className="font-display font-bold text-3xl md:text-4xl mb-6 leading-tight">{selectedArticle.title}</h1>
                <div className="prose prose-lg max-w-none text-foreground">
                  {selectedArticle.content?.split('\n\n').map((paragraph, i) => (
                    <div key={i} className="mb-4">
                      {paragraph.startsWith('**') ? (
                        <h3 className="font-display font-semibold text-lg mt-6 mb-3">{paragraph.replace(/\*\*/g, '')}</h3>
                      ) : paragraph.startsWith('- ') ? (
                        <ul className="space-y-1 ml-4">
                          {paragraph.split('\n').map((item, j) => (
                            <li key={j} className="text-muted-foreground flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                              {item.replace('- ', '')}
                            </li>
                          ))}
                        </ul>
                      ) : paragraph.match(/^\d\./) ? (
                        <ol className="space-y-1 ml-4">
                          {paragraph.split('\n').map((item, j) => (
                            <li key={j} className="text-muted-foreground">{item}</li>
                          ))}
                        </ol>
                      ) : (
                        <p className="text-muted-foreground leading-relaxed">{paragraph}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <h1 className="font-display font-bold text-3xl mb-2">Noticias de Salud</h1>
              <p className="text-muted-foreground mb-8">Las últimas novedades en nutrición, bienestar y ciencia.</p>

              {/* Featured article */}
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card overflow-hidden hover-lift cursor-pointer group mb-8"
                onClick={() => setSelectedArticle(mockNews[0])}
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="aspect-video md:aspect-auto overflow-hidden">
                    <img src={mockNews[0].image_url} alt={mockNews[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium px-2 py-1 rounded-lg bg-accent text-accent-foreground">{mockNews[0].category}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{mockNews[0].read_time}</span>
                    </div>
                    <h2 className="font-display font-bold text-xl md:text-2xl mb-3 group-hover:text-primary transition-colors">{mockNews[0].title}</h2>
                    <p className="text-sm text-muted-foreground mb-4">{mockNews[0].summary}</p>
                    <div className="flex items-center gap-2 text-sm text-primary font-medium">
                      <BookOpen className="w-4 h-4" /> Leer artículo completo <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </motion.article>

              {/* Rest of articles */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockNews.slice(1).map((article, i) => (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card overflow-hidden hover-lift cursor-pointer group"
                    onClick={() => setSelectedArticle(article)}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img src={article.image_url} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium px-2 py-1 rounded-lg bg-accent text-accent-foreground">{article.category}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{article.read_time}</span>
                      </div>
                      <h2 className="font-display font-semibold text-base mb-2 group-hover:text-primary transition-colors line-clamp-2">{article.title}</h2>
                      <p className="text-xs text-muted-foreground line-clamp-2">{article.summary}</p>
                      <div className="mt-3 flex items-center gap-1 text-sm text-primary font-medium">
                        Leer más <ArrowUpRight className="w-3 h-3" />
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default News;
