import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { NewsArticle } from '@/types';

export function useNews() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('is_active', true)
        .order('published_at', { ascending: false });

      if (data && !error) {
        setArticles(data.map(n => ({
          id: n.id,
          title: n.title,
          summary: n.summary,
          content: n.content,
          image_url: n.image_url,
          category: n.category,
          read_time: n.read_time,
          date: n.published_at.split('T')[0],
          source: n.source,
        })));
      }
      setLoading(false);
    };
    fetchNews();
  }, []);

  return { articles, loading };
}
