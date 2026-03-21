import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/features/HeroSection';
import NewsFeed from '@/components/features/NewsFeed';
import ProductsGallery from '@/components/features/ProductsGallery';
import TrackerPreview from '@/components/features/TrackerPreview';

const Index = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-16">
      <HeroSection />
      <NewsFeed />
      <ProductsGallery />
      <TrackerPreview />
    </main>
    <Footer />
  </div>
);

export default Index;
