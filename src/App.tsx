import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PublicPages from './components/PublicPages';
import AdminPages from './components/AdminPages';
import { 
  getCollections, getProducts, getProductImages, getSettings,
  Collection, Product, ProductImage, Settings,
  INITIAL_COLLECTIONS, INITIAL_PRODUCTS, INITIAL_IMAGES, DEFAULT_SETTINGS
} from './supabase';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [collections, setCollections] = useState<Collection[]>(INITIAL_COLLECTIONS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [productImages, setProductImages] = useState<ProductImage[]>(INITIAL_IMAGES);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  
  const [currentView, setCurrentView] = useState<string>('home'); // 'home' | 'product' | 'admin'
  const [selectedSlug, setSelectedSlug] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // Sync data from database/local helper
  const loadStoreData = async () => {
    try {
      const cols = await getCollections();
      const prods = await getProducts();
      const imgs = await getProductImages();
      const settingsData = await getSettings();

      setCollections(cols);
      setProducts(prods);
      setProductImages(imgs);
      setSettings(settingsData);
    } catch (err) {
      console.error('Core data load failed', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStoreData();
  }, []);

  // Hash Routing Logic to support native history and back-buttons smoothly inside developer frames
  useEffect(() => {
    const handleLocationHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/product/')) {
        setCurrentView('product');
        setSelectedSlug(hash.replace('#/product/', ''));
      } else if (hash === '#/admin') {
        setCurrentView('admin');
        setSelectedSlug('');
      } else {
        setCurrentView('home');
        setSelectedSlug('');
      }
    };

    window.addEventListener('hashchange', handleLocationHashChange);
    handleLocationHashChange(); // Run on absolute mount

    return () => {
      window.removeEventListener('hashchange', handleLocationHashChange);
    };
  }, []);

  // Soft navigation state dispatcher
  const handleNavigation = (view: string, slug: string = '') => {
    if (view === 'product') {
      window.location.hash = `#/product/${slug}`;
    } else if (view === 'admin') {
      window.location.hash = `#/admin`;
    } else {
      window.location.hash = `#/`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF9F6] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin"></div>
        <div className="flex items-center space-x-1.5 font-cinzel text-xs text-gold tracking-widest uppercase">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>The Sweet Savour</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F6] text-[#1A1A1A] flex flex-col justify-between selection:bg-[#EACE8C] selection:text-black">
      
      {/* 1. Navbar displays globally across routes */}
      <Navbar 
        settings={settings} 
        currentView={currentView} 
        onNavigate={handleNavigation} 
      />

      {/* 2. Primary Route Switcher Layout */}
      <main className="flex-grow">
        {currentView === 'admin' ? (
          <AdminPages 
            collections={collections}
            products={products}
            productImages={productImages}
            settings={settings}
            onRefreshData={loadStoreData}
            onNavigateHome={() => handleNavigation('home')}
          />
        ) : (
          <PublicPages 
            collections={collections}
            products={products}
            productImages={productImages}
            settings={settings}
            currentView={currentView}
            selectedSlug={selectedSlug}
            onNavigate={handleNavigation}
          />
        )}
      </main>

      {/* 3. Footer displays globally except inside the heavy admin dashboard */}
      {currentView !== 'admin' && (
        <Footer 
          settings={settings} 
          onNavigate={handleNavigation} 
        />
      )}

    </div>
  );
}
