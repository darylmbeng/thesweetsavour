import React, { useState, useEffect } from 'react';
import { Collection, Product, ProductImage, Settings, Testimonial } from '../supabase';
import { 
  ChevronLeft, Sparkles, MessageSquare, Shield, HelpCircle, 
  CheckCircle, Plus, Eye, ArrowRight, ArrowLeft, Star, Quote, Award, X, ZoomIn, ZoomOut
} from 'lucide-react';

interface PublicPagesProps {
  collections: Collection[];
  products: Product[];
  productImages: ProductImage[];
  testimonials: Testimonial[];
  settings: Settings;
  currentView: string;
  selectedSlug: string;
  onNavigate: (view: string, slug?: string) => void;
}

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function PublicPages({ 
  collections, 
  products, 
  productImages, 
  testimonials,
  settings, 
  currentView, 
  selectedSlug, 
  onNavigate 
}: PublicPagesProps) {
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedColFilter, setSelectedColFilter] = useState<string | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [currentProductImageIdx, setCurrentProductImageIdx] = useState(0);

  const openLightbox = (url: string) => {
    setSelectedImage(url);
    setZoomLevel(1);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setZoomLevel(1);
  };

  // Set selected product if routing to detail view
  useEffect(() => {
    if (currentView === 'product' && selectedSlug) {
      const prod = products.find(p => p.slug === selectedSlug);
      if (prod) {
        setSelectedProduct(prod);
        setCurrentProductImageIdx(0);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setSelectedProduct(null);
    }
  }, [currentView, selectedSlug, products]);

  // Create WhatsApp message generator
  const getWhatsAppOrderLink = (product: Product, collectionName: string) => {
    const rawNumber = (settings?.whatsapp_number || '+237681193469').replace(/[+\s\-()]/g, '');
    const text = `Hello! I would like to order this perfume from The Sweet Savour:\n\n*Product:* ${product.name}\n*Collection:* ${collectionName}\n*Volume:* ${product.volume || '30ml'}\n*Price:* ${product.price.toLocaleString()} FCFA\n\nPlease confirm availability and guide me through the order arrangements! Thank you.`;
    return `https://wa.me/${rawNumber}?text=${encodeURIComponent(text)}`;
  };

  const getCollectionName = (id: string) => {
    return collections.find(c => c.id === id)?.name || "Signature Collection";
  };

  // Testimonials now provided by props
  // FAQs Data
  const faqs = [
    {
      q: "What makes perfume oils unique?",
      a: "Perfume oils contain 100% pure fragrance oil concentrate. Because wood and floral oils anchor directly to the skin, they do not evaporate quickly, offering an exceptional 12 to 24-hour presence. They are also gentle on sensitive skin."
    },
    {
      q: "Where do you source your perfume ingredients from?",
      a: "We carefully import premium quality fragrance bases and essential oils from world-renowned niche distillers located in Dubai (United Arab Emirates) and selected master perfume laboratories in the United States."
    },
    {
      q: "What is the bottle size and pricing?",
      a: "Currently, all our signature perfume oils are packaged in sophisticated 30ml glass applicator bottles, perfectly priced at a flat 10,000 FCFA. This size is travel-friendly and lasts for months due to the high concentration."
    },
    {
      q: "How does the ordering and delivery process work?",
      a: "Browse our collections line, select 'Order via WhatsApp' on your favorite perfume, and a custom booking message will populate. Our representative will coordinates delivery options within Cameroon and sub-regions."
    },
    {
      q: "What is the inspiration behind 'The Sweet Savour'?",
      a: "We are luxury and faith-inspired, drawing names and precious fragrance motifs from exquisite, historic plants (such as Saffron, Frankincense, Myrrh, Honey, and Rose of Sharon), symbolizing deep spiritual beauty, joy, elegance, and legacy."
    }
  ];

  // Filtered Products List
  const filteredProducts = selectedColFilter
    ? products.filter(p => p.collection_id === selectedColFilter)
    : products;

  // Render individual product detail page
  if (currentView === 'product' && selectedProduct) {
    const customImages = productImages.filter(img => img.product_id === selectedProduct.id);
    const displayImages = [
      ...(selectedProduct.image_url ? [selectedProduct.image_url] : []),
      ...customImages.map(img => img.image_url)
    ];

    const colName = getCollectionName(selectedProduct.collection_id);

    return (
      <div className="pt-28 pb-20 bg-cream-gradient min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back button */}
          <button 
            onClick={() => {
              onNavigate('home');
              setTimeout(() => {
                const el = document.getElementById('perfumes-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="inline-flex items-center space-x-2 text-base tracking-widest uppercase text-left text-[#1A1A1A]/60 hover:text-gold mb-10 transition duration-300 focus:outline-hidden cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Collection</span>
          </button>

          {/* Product Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Image Showcase Panel */}
            <div className="space-y-4">
              <div className="aspect-square w-full rounded-xs overflow-hidden border border-[#EACE8C]/20 bg-white relative">
                {displayImages.length > 0 ? (
                  <img 
                    src={displayImages[currentProductImageIdx]} 
                    alt={selectedProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover animate-fade-in"
                  />
                ) : (
                  <div className="w-full h-full bg-[#1A1A1A]/10 flex items-center justify-center text-[#1A1A1A]/40 font-serif">
                    The Sweet Savour Premium Design
                  </div>
                )}
                
                {/* Brand watermark badge */}
                <div className="absolute top-4 left-4 py-1 px-2.5 bg-[#FAF6F0]/90 backdrop-blur-xs border border-[#EACE8C]/30 text-sm font-cinzel text-[#1A1A1A] tracking-widest rounded-xs">
                  {colName}
                </div>
              </div>

              {/* Thumbnails grid */}
              {displayImages.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {displayImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentProductImageIdx(idx)}
                      className={`aspect-square w-full rounded-xs overflow-hidden border transition duration-300 cursor-pointer ${
                        currentProductImageIdx === idx ? 'border-gold ring-1 ring-gold' : 'border-[#EACE8C]/15 hover:border-gold/40'
                      }`}
                      title={`View image ${idx + 1}`}
                      aria-label={`View image ${idx + 1}`}
                    >
                      <img 
                        src={img} 
                        alt="Alternative perfume detail view" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Spec Sheet Panel */}
            <div className="space-y-8 flex flex-col justify-start">
              
              <div className="space-y-4 text-left">
                <span className="text-base font-cinzel text-gold uppercase tracking-widest font-semibold block">
                  {colName}
                </span>
                <h1 className="text-3xl sm:text-4xl text-[#1A1A1A] font-serif leading-tight">
                  {selectedProduct.name}
                </h1>
                
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-cinzel font-light text-[#1A1A1A]">
                    {selectedProduct.price.toLocaleString()} FCFA
                  </span>
                  <span className="h-4 w-px bg-gold/30"></span>
                  <span className="text-base font-sans text-[#1A1A1A]/50 tracking-widest uppercase">
                    Volume: {selectedProduct.volume || '30ml'}
                  </span>
                </div>
              </div>

              {/* Fragrance availability status */}
              <div className="p-3 border border-[#EACE8C]/20 bg-[#FAF6F0] rounded-xs flex items-center space-x-2">
                <div className={`w-2.5 h-2.5 rounded-full ${selectedProduct.available ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                <span className="text-base tracking-wider uppercase font-sans-lux text-[#1A1A1A]/80">
                  {selectedProduct.available ? 'In Stock & Ready for Delivery' : 'Limited Batch / Coming Soon'}
                </span>
              </div>

              {/* Description */}
              <div className="space-y-3 text-left">
                <h3 className="font-cinzel text-base uppercase tracking-widest text-[#1A1A1A]">The Essence</h3>
                <p className="text-sm text-[#1A1A1A]/70 leading-relaxed font-light">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Fragrance Notes Breakdown */}
              <div className="space-y-4 text-left p-6 bg-white border border-[#EACE8C]/10 rounded-xs shadow-xs">
                <h3 className="font-cinzel text-base uppercase tracking-widest text-gold font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Aromatic Fragrance Notes</span>
                </h3>
                
                {selectedProduct.fragrance_notes ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    {selectedProduct.fragrance_notes.split('|').map((noteRow, i) => {
                      const splitNote = noteRow.split(':');
                      const noteTitle = splitNote[0]?.trim() || "Notes";
                      const noteText = splitNote[1]?.trim() || noteRow.trim();
                      return (
                        <div key={i} className="space-y-1">
                          <span className="text-sm font-cinzel text-[#1A1A1A]/40 uppercase tracking-widest block font-bold">{noteTitle}</span>
                          <span className="text-base text-[#1A1A1A]/80 font-medium leading-relaxed block">{noteText}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-base text-[#1A1A1A]/50 italic">
                    Premium blend details available on request. Crafted using premium materials from United States & Dubai labs.
                  </p>
                )}
              </div>

              {/* Order buttons */}
              <div className="pt-4 space-y-2">
                <a
                  href={getWhatsAppOrderLink(selectedProduct, colName)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex justify-center items-center gap-3 py-4 bg-[#08482A] hover:bg-[#03341C] text-[#FAF6F0] hover:text-white font-sans-lux text-sm tracking-widest uppercase font-bold border border-[#EACE8C] hover:border-[#F3DFB6] transition-all duration-300 rounded-xs shadow-lg shadow-emerald-950/20 transform hover:-translate-y-0.5"
                >
                  <WhatsAppIcon className="w-5 h-5 text-gold animate-pulse" />
                  <span>Order via WhatsApp</span>
                </a>
                <p className="text-sm text-emerald-700 font-semibold text-center flex items-center justify-center gap-1">
                  <span>✨ Instantly forwards formulation layout & product snapshot for quick ordering</span>
                </p>
              </div>

              {/* Guarantee highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#EACE8C]/15 text-base text-[#1A1A1A]/60">
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-gold shrink-0" />
                  <span>100% Pure Essential Perfume Oil</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-gold shrink-0" />
                  <span>Exceptional Longevity (12+ Hours)</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    );
  }

  // Render Full Homepage
  return (
    <div className="space-y-0" id="homepage-container">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen bg-[#111] overflow-hidden flex items-center pt-20">
        
        {/* Luxury artistic background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero.jpeg"
            alt="The Sweet Savour abstract background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-20 filter scale-105 animate-scale-up"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#101010]/80 to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#FAF6F0] to-transparent"></div>
        </div>

        {/* Hero Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full text-left py-16 sm:py-24">
          <div className="max-w-2xl space-y-8">
            
            {/* Meta context tagline */}
            <div className="inline-flex items-center space-x-2.5 pb-1 select-none animate-fade-in">
              <Sparkles className="w-4 h-4 text-[#EACE8C]" />
              <span className="text-sm sm:text-base font-cinzel tracking-widest text-[#EACE8C] uppercase font-semibold">
                Premium Long-Lasting Fragrances
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl text-white font-serif leading-tight font-light">
                A legacy <br />
                <span className="text-gold font-serif italic">in scent.</span>
              </h1>
              
              {/* Subheadline */}
              <p className="text-sm sm:text-base text-[#FAF6F0]/70 font-light leading-relaxed tracking-wide">
                Discover luxurious long-lasting perfume oils sourced from premium suppliers in Dubai and the United States and carefully curated into signature fragrances for every occasion.
              </p>
            </div>

            {/* Premium bullets */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2 text-base text-[#FAF6F0]/80 border-t border-[#FAF6F0]/10 font-sans-lux">
              <div>
                <span className="text-gold font-bold font-cinzel text-sm sm:text-base block">10,000 FCFA</span>
                <span className="text-sm uppercase font-semibold text-[#FAF6F0]/50 tracking-wider">Starting Price</span>
              </div>
              <div>
                <span className="text-gold font-bold font-cinzel text-sm sm:text-base block">30ml Bottle</span>
                <span className="text-sm uppercase font-semibold text-[#FAF6F0]/50 tracking-wider">Premium Volume</span>
              </div>
              <div className="col-span-2 md:col-span-1">
                <span className="text-gold font-bold font-cinzel text-sm sm:text-base block">100% Pure Concentrate</span>
                <span className="text-sm uppercase font-semibold text-[#FAF6F0]/50 tracking-wider font-sans">Pure Fragrance Oil</span>
              </div>
            </div>

            {/* CTA action group */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#collections"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('collections-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-[#EACE8C] hover:bg-[#d4af37] text-[#111] text-base tracking-widest uppercase font-semibold transition duration-500 text-center rounded-xs shadow-lg"
              >
                Explore Collections
              </a>
              
              <a
                href="#collections"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('collections-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-[#08482A]/85 hover:bg-[#03341C] text-[#FAF6F0] hover:text-white text-base tracking-widest uppercase font-bold border border-[#EACE8C] hover:border-[#F3DFB6] transition-all duration-300 text-center rounded-xs flex items-center justify-center gap-2 shadow-lg"
              >
                <WhatsAppIcon className="w-4 h-4 text-gold" />
                <span>Order on WhatsApp</span>
              </a>
            </div>

            {/* Core credentials subtitle */}
            <div className="pt-2 text-sm text-[#FAF6F0]/40 font-cinzel uppercase tracking-widest flex flex-wrap gap-x-4 gap-y-1">
              <span>✦ Christian-inspired brand</span>
              <span>✦ Premium Dubai & US Oils</span>
              <span>✦ High-end longevity guaranteed</span>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ABOUT US (OUR STORY) SECTION */}
      <section className="py-24 bg-white border-y border-[#EACE8C]/15 relative" id="story">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Visual representation card */}
            <div className="relative">
              <div className="aspect-[4/5] sm:aspect-[3/4] w-full rounded-xs overflow-hidden border border-[#EACE8C]/30 relative shadow-xl">
                <img 
                  src="/middle.jpeg" 
                  alt="Crafting premium oils" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                
                {/* Decorative scripture overlay */}
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-[#111]/90 via-[#111]/60 to-transparent text-[#FAF6F0] text-left">
                  <p className="text-base italic text-[#FAF6F0]/80 mb-2 leading-relaxed font-serif">
                    “And walk in love, as Christ also hath loved us… an offering and a sacrifice to God for a sweet-smelling savour.”
                  </p>
                  <p className="text-base font-cinzel text-[#EACE8C] uppercase tracking-widest">
                    — Ephesians 5:2
                  </p>
                </div>
              </div>
              
              {/* Absolutes decorative border badge */}
              <div className="absolute -top-6 -right-6 w-32 h-32 border border-[#EACE8C]/20 hidden sm:flex items-center justify-center rounded-full bg-[#FAF6F0] p-4 select-none">
                <div className="text-center">
                  <span className="font-cinzel text-base uppercase tracking-widest text-gold block font-semibold">Premium</span>
                  <span className="font-serif text-base italic text-[#1A1A1A] block">Quality Only</span>
                </div>
              </div>
            </div>

            {/* Narrative text block */}
            <div className="space-y-8 text-left">
              <div className="space-y-3">
                <span className="text-base font-cinzel text-gold uppercase tracking-widest font-semibold block">
                  A Legacy of Grace
                </span>
                <h2 className="text-3xl sm:text-4xl text-[#1A1A1A] font-serif leading-tight">
                  About The Sweet Savour
                </h2>
              </div>

              <div className="space-y-6 text-[#1A1A1A]/70 font-light text-sm leading-relaxed">
                <p>
                  More than a fragrance, The Sweet Savour is a reflection of worship, excellence, and divine presence.
                </p>
                <p>
                  Inspired by Scripture, our brand is founded on the belief that what is offered with love becomes a sweet aroma before God. Just as sacrifices, prayers, and acts of devotion ascended as a pleasing fragrance unto Him, we create scents that leave a lasting impression of grace, beauty, and purpose.
                </p>
                <p>
                  Every bottle is crafted with intention—designed not merely to be worn, but to tell a story. A story of confidence, refinement, and the beauty of a life surrendered to God.
                </p>
                <p>
                  At The Sweet Savour, fragrance is more than scent; it is presence. It is the unseen signature that lingers long after you have gone, just as God’s goodness leaves its mark upon every life it touches.
                </p>
              </div>

              <div className="pt-4 border-t border-[#EACE8C]/20 text-left space-y-4">
                <div className="space-y-1 text-center sm:text-left">
                  <p className="font-serif italic text-base text-[#1A1A1A]/80 leading-relaxed">
                    “An odour of a sweet smell, a sacrifice acceptable, wellpleasing to God.”
                  </p>
                  <p className="font-cinzel text-sm text-gold tracking-wider uppercase font-semibold">
                    — Philippians 4:18
                  </p>
                </div>
                
                <div className="pt-4 text-center sm:text-left">
                  <span className="text-lg font-cinzel text-[#1A1A1A] uppercase tracking-widest font-semibold block">
                    The Sweet Savour
                  </span>
                  <span className="text-base font-serif italic text-[#1A1A1A]/60 block">
                    Where fragrance becomes worship.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5: DIVINE ENCOUNTER SECTION */}
      <section className="py-24 bg-white border-y border-[#EACE8C]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">
            
            {/* Text Content */}
            <div className="flex-1 text-center md:text-left space-y-6">
              <span className="text-sm md:text-base font-cinzel text-gold uppercase tracking-widest font-semibold block animate-fade-in">
                A Divine Encounter
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] leading-tight">
                Experience True Refinement
              </h2>
              <p className="text-lg text-[#1A1A1A]/70 font-light italic font-serif">
                Let every scent you wear become a beautiful reflection of grace and purpose.
              </p>
            </div>

            {/* Photo Element */}
            <div className="flex-1 flex justify-center md:justify-end w-full">
              <div className="w-full max-w-sm relative">
                <div className="aspect-[4/5] rounded-xs overflow-hidden border border-[#EACE8C]/30 shadow-xl relative z-10 bg-[#FAF6F0]">
                  <img 
                    src="/photo.jpeg" 
                    alt="Experience True Refinement" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative background elements */}
                <div className="absolute -top-4 -right-4 w-full h-full border border-gold/20 rounded-xs -z-10"></div>
                <div className="absolute -bottom-4 -left-4 w-full h-full bg-[#FAF6F0] rounded-xs -z-20"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. COLLECTIONS SECTION */}
      <section className="py-24 bg-[#FAF6F0]" id="collections-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-base font-cinzel text-gold uppercase tracking-widest font-semibold block">
              Fragrance Portfolios
                </span>
            <h2 className="text-3xl sm:text-4xl text-[#1A1A1A] font-serif">
              Our Masterpiece Collections
            </h2>
            <div className="w-12 h-px bg-gold/50 mx-auto mt-4"></div>
            <p className="text-sm text-[#1A1A1A]/60 font-light leading-relaxed">
              Explore our curation of high-end perfume oils inspired by themes of blessing, devotion, and sacred fire. Click on a collection to filter products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[...collections].sort((a, b) => {
              if (a.status === 'Coming Soon' && b.status !== 'Coming Soon') return -1;
              if (a.status !== 'Coming Soon' && b.status === 'Coming Soon') return 1;
              return 0;
            }).map((col) => {
              const isSelected = selectedColFilter === col.id;
              
              return (
                <div 
                  key={col.id}
                  onClick={() => setSelectedColFilter(isSelected ? null : col.id)}
                  className={`group relative overflow-hidden rounded-xs border transition-all duration-500 cursor-pointer text-left bg-white h-[400px] flex flex-col justify-end p-8 ${
                    isSelected ? 'border-gold ring-1 ring-gold shadow-lg' : 'border-[#EACE8C]/15 hover:border-gold/50 shadow-xs'
                  }`}
                >
                  {/* Background overlay */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={
                        (col.hero_image && !col.hero_image.includes("images.unsplash.com")) 
                          ? col.hero_image 
                          : col.name.toLowerCase().includes('baruch') ? '/baruch bliss.jpeg' :
                        (col.name.toLowerCase().includes('harsam') || col.name.toLowerCase().includes('hashem') || col.name.toLowerCase().includes('honey')) ? '/hero.jpeg' :
                        (col.name.toLowerCase().includes('adonia') || col.name.toLowerCase().includes('adonai') || col.name.toLowerCase().includes('ember')) ? '/adonia ember.jpeg' :
                        (col.hero_image || '/hero.jpeg')
                      } 
                      alt={col.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent"></div>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-4 right-4 z-10 flex space-x-2">
                    <span className="py-1 px-2.5 bg-[#1a1a1a]/80 backdrop-blur-xs border border-[#EACE8C]/30 text-base font-cinzel text-white uppercase tracking-widest rounded-xs">
                      {col.category}
                    </span>
                    <span className={`py-1 px-2.5 text-base font-cinzel uppercase tracking-widest rounded-xs font-semibold ${
                      col.status === 'Available' ? 'bg-[#EACE8C] text-[#111]' : 'bg-[#EACE8C]/30 text-white border border-[#EACE8C]/20'
                    }`}>
                      {col.status}
                    </span>
                  </div>

                  {/* Core description block */}
                  <div className="z-10 space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-cinzel text-sm text-white font-semibold">
                        {col.name}
                      </h3>
                      <p className="text-base text-[#FAF6F0]/60 italic font-serif">
                        {col.category}
                      </p>
                    </div>

                    <p className="text-base text-[#FAF6F0]/80 font-light leading-relaxed h-[60px] overflow-hidden">
                      {col.description}
                    </p>

                    <div className="pt-2 border-t border-[#FAF6F0]/10 flex justify-between items-center text-sm font-cinzel uppercase tracking-widest text-[#EACE8C]">
                      <span>{isSelected ? 'Filter Active (Tap to Reset)' : 'Browse the Fragrances'}</span>
                      <ArrowRight className={`w-3.5 h-3.5 transition duration-300 ${isSelected ? 'rotate-90 text-white' : 'group-hover:translate-x-1'}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {selectedColFilter && (
            <div className="mt-8 text-center animate-fade-in">
              <button 
                onClick={() => setSelectedColFilter(null)}
                className="inline-flex items-center space-x-2 py-2 px-4 border border-gold/30 hover:border-gold/80 rounded-full text-base text-gold uppercase tracking-widest font-cinema font-medium cursor-pointer transition duration-300"
              >
                <span>Reset Collection Filter (Showing {collections.find(c => c.id === selectedColFilter)?.name})</span>
                <span className="text-bold">×</span>
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 4. FEATURED FRAGRANCES SECTION */}
      <section className="py-24 bg-white" id="perfumes-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-base font-cinzel text-gold uppercase tracking-widest font-semibold block">
              Our Signature Batches
            </span>
            <h2 className="text-3xl sm:text-4xl text-[#1A1A1A] font-serif">
              Featured Fragrances
            </h2>
            <div className="w-12 h-px bg-gold/50 mx-auto mt-4"></div>
            <p className="text-sm text-[#1A1A1A]/60 font-light leading-relaxed">
              Exquisite, highly concentrated perfume oils meticulously crafted in 30ml bottles. Experience luxury that lingers.
            </p>
          </div>

          {/* Perfume Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center border border-[#EACE8C]/15 bg-[#FAF6F0] rounded-xs max-w-lg mx-auto">
              <Sparkles className="w-8 h-8 text-gold/40 mx-auto mb-3" />
              <p className="text-sm text-[#1A1A1A]/60 italic font-serif">
                This beautiful batch is currently in pre-blend. Please check other inspiring collections!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((prod) => {
                const colName = getCollectionName(prod.collection_id);
                
                return (
                  <div 
                    key={prod.id} 
                    className="group flex flex-col h-full bg-white border border-[#EACE8C]/10 rounded-xs overflow-hidden hover:border-[#EACE8C]/45 transition-all duration-500 shadow-xs hover:shadow-md text-left"
                  >
                    {/* Image visual wrapper with luxury zoom */}
                    <div className="aspect-square relative overflow-hidden bg-cream-gradient border-b border-[#EACE8C]/10">
                      {prod.image_url ? (
                        <img 
                          src={prod.image_url} 
                          alt={prod.name} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm text-[#1A1A1A]/40 font-cinzel uppercase bg-[#EACE8C]/5 p-4 text-center">
                          The Sweet Savour Blend
                        </div>
                      )}
                      
                      {/* Featured watermark signet */}
                      {prod.featured && (
                        <div className="absolute top-3 left-3 py-1 px-2.5 bg-[#111] text-[#EACE8C] border border-[#EACE8C]/30 text-sm font-cinzel uppercase tracking-widest font-semibold rounded-xs shadow-xs">
                          Featured
                        </div>
                      )}

                      {/* Detail View quick actions */}
                      <div className="absolute inset-0 bg-[#111]/45 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300">
                        <button
                          onClick={() => onNavigate('product', prod.slug)}
                          className="p-3 bg-white hover:bg-[#EACE8C] text-[#111] hover:scale-105 transition duration-300 rounded-full shadow-lg"
                          title="View Aromatics"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Meta product particulars info */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      
                      <div className="space-y-1.5">
                        <span className="text-sm font-cinzel text-gold font-bold tracking-widest uppercase block">
                          {colName}
                        </span>
                        
                        <h3 className="font-serif text-base text-[#1A1A1A] tracking-wide hover:text-gold transition duration-200">
                          <button 
                            onClick={() => onNavigate('product', prod.slug)}
                            className="text-left focus:outline-hidden cursor-pointer"
                          >
                            {prod.name}
                          </button>
                        </h3>
                        
                        <p className="text-base text-[#1A1A1A]/50 font-light line-clamp-2 leading-relaxed">
                          {prod.description}
                        </p>
                      </div>

                      <div className="space-y-4 pt-2 border-t border-[#EACE8C]/10">
                        <div className="flex justify-between items-baseline">
                          <span className="font-cinzel text-[#1A1A1A] font-medium text-sm sm:text-base">
                            {prod.price.toLocaleString()} FCFA
                          </span>
                          <span className="text-sm font-sans tracking-widest text-[#1A1A1A]/50 uppercase font-medium">
                            {prod.volume || '30ml'}
                          </span>
                        </div>

                        {/* Action buttons */}
                        <div className="grid grid-cols-2 gap-2 pt-1 font-sans-lux">
                          <button
                            onClick={() => onNavigate('product', prod.slug)}
                            className="py-2 border border-[#EACE8C]/30 hover:border-[#1A1A1A] text-[#1A1A1A] text-sm tracking-widest uppercase font-semibold transition duration-300 text-center rounded-xs cursor-pointer"
                          >
                            Aromatics
                          </button>
                          
                          <a
                            href={getWhatsAppOrderLink(prod, colName)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2 bg-[#08482A] hover:bg-[#03341C] text-[#FAF6F0] text-sm tracking-widest uppercase font-bold border border-[#EACE8C] hover:border-[#F3DFB6] transition-all duration-300 text-center rounded-xs flex items-center justify-center gap-1 shadow-md"
                          >
                            <WhatsAppIcon className="w-3.5 h-3.5 text-gold" />
                            <span>Order</span>
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* 5. WHY PERFUME OILS SECTION */}
      <section className="py-24 bg-cream-gradient border-t border-[#EACE8C]/15" id="why-oils">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-base font-cinzel text-gold uppercase tracking-widest font-semibold block">
              The Science of Longevity
            </span>
            <h2 className="text-3xl sm:text-4xl text-[#1A1A1A] font-serif">
              Why Perfume Oils over Sprays?
            </h2>
            <div className="w-12 h-px bg-gold/50 mx-auto mt-4"></div>
            <p className="text-sm text-[#1A1A1A]/60 font-light leading-relaxed">
              Understand the high standards of luxurious fragrance oils and why they constitute the ultimate choice for continuous, deep aromatic performance.
            </p>
          </div>

          {/* Grid USPs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            
            {/* Feature 1 */}
            <div className="p-8 bg-white border border-[#EACE8C]/10 rounded-xs shadow-xs space-y-4 hover:shadow-md transition-shadow duration-300">
              <div className="w-10 h-10 rounded-xs bg-[#FAF6F0] border border-[#EACE8C]/30 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-cinzel text-sm uppercase tracking-wider font-semibold text-[#1A1A1A]">
                12 to 24-Hour Longevity
              </h3>
              <p className="text-base text-[#1A1A1A]/60 font-light leading-relaxed">
                Pure perfume oils anchor directly to your pulse points, releasing aromatic warmth consistently over hours without rapid evaporation.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-white border border-[#EACE8C]/10 rounded-xs shadow-xs space-y-4 hover:shadow-md transition-shadow duration-300">
              <div className="w-10 h-10 rounded-xs bg-[#FAF6F0] border border-[#EACE8C]/30 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-cinzel text-[#1A1A1A] font-bold text-lg uppercase tracking-widest mb-3">
                  Gentle and Safe
                </h3>
                <p className="text-[#1A1A1A]/70 text-sm leading-relaxed">
                  Formulated carefully to preserve natural botanical proteins and moisture. Delightfully hypoallergenic, making it ideal for daily application even on ultra-sensitive skins.
                </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-white border border-[#EACE8C]/10 rounded-xs shadow-xs space-y-4 hover:shadow-md transition-shadow duration-300">
              <div className="w-10 h-10 rounded-xs bg-[#FAF6F0] border border-[#EACE8C]/30 flex items-center justify-center">
                <Award className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-cinzel text-sm uppercase tracking-wider font-semibold text-[#1A1A1A]">
                Luxurious Scent Experience
              </h3>
              <p className="text-base text-[#1A1A1A]/60 font-light leading-relaxed">
                Experience dynamic aromatic developments close to the skin instead of chemical clouds. Sourced strictly from legendary houses in Dubai and the US to embody authentic grace and sophisticated presence.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section className="py-24 bg-white relative overflow-hidden text-center">
        {/* Background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 select-none pointer-events-none">
          <Quote className="w-80 h-80 text-gold" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <span className="text-base font-cinzel text-gold uppercase tracking-widest font-semibold block mb-2">
            Client Impressions
          </span>
          <h2 className="text-3xl sm:text-4xl text-[#1A1A1A] font-serif mb-12">
            Adored by Connoisseurs
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {testimonials.map((testi, i) => (
              <div 
                key={testi.id} 
                className="relative group rounded-xs overflow-hidden border border-[#EACE8C]/30 shadow-md bg-[#FAF6F0] hover:shadow-lg transition duration-300 cursor-pointer"
                onClick={() => openLightbox(testi.avatar)}
              >
                <img 
                  src={testi.avatar} 
                  alt={`Client Impression ${i+1}`} 
                  referrerPolicy="no-referrer"
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {selectedImage && (
            <div 
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
              onClick={closeLightbox}
            >
              <div className="relative w-full h-full flex flex-col items-center justify-center animate-fade-in overflow-hidden">
                {/* Close Button */}
                <button 
                  className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white/70 hover:text-white transition-colors cursor-pointer z-50 bg-black/50 p-2 rounded-full"
                  onClick={closeLightbox}
                  title="Close"
                >
                  <X className="w-8 h-8" />
                </button>

                {/* Zoom Controls */}
                <div className="absolute bottom-6 sm:bottom-10 flex space-x-4 z-50 bg-black/50 p-3 rounded-full backdrop-blur-md" onClick={(e) => e.stopPropagation()}>
                  <button 
                    className="text-white/70 hover:text-white transition-colors cursor-pointer p-2 rounded-full hover:bg-white/10"
                    onClick={() => setZoomLevel(prev => Math.max(0.5, prev - 0.5))}
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-6 h-6" />
                  </button>
                  <div className="flex items-center justify-center text-white font-sans w-12 select-none">
                    {Math.round(zoomLevel * 100)}%
                  </div>
                  <button 
                    className="text-white/70 hover:text-white transition-colors cursor-pointer p-2 rounded-full hover:bg-white/10"
                    onClick={() => setZoomLevel(prev => Math.min(3, prev + 0.5))}
                    title="Zoom In"
                  >
                    <ZoomIn className="w-6 h-6" />
                  </button>
                </div>

                {/* Scrollable Image Container */}
                <div 
                  className="w-full h-full overflow-auto flex items-center justify-center"
                  onClick={closeLightbox}
                >
                  <img 
                    src={selectedImage} 
                    className="max-w-full max-h-full object-contain shadow-2xl transition-transform duration-200 ease-out origin-center" 
                    style={{ transform: `scale(${zoomLevel})` }}
                    alt="Enlarged client impression" 
                    onClick={(e) => e.stopPropagation()}
                    draggable="false"
                  />
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section className="py-24 bg-[#FAF6F0] border-t border-[#EACE8C]/15" id="faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-base font-cinzel text-gold uppercase tracking-widest font-semibold block">
              Inquiries and Answers
            </span>
            <h2 className="text-3xl sm:text-4xl text-[#1A1A1A] font-serif">
              Frequently Asked Questions
            </h2>
            <div className="w-12 h-px bg-gold/50 mx-auto mt-4"></div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              
              return (
                <div 
                  key={idx} 
                  className="bg-white border border-[#EACE8C]/15 rounded-xs overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left p-6 flex justify-between items-center focus:outline-hidden cursor-pointer"
                  >
                    <span className="font-cinzel text-base uppercase tracking-wider text-[#1A1A1A] font-semibold pr-4">
                      {faq.q}
                    </span>
                    <span className="text-gold font-light text-sm">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  <div 
                    className={`transition-all duration-500 overflow-hidden text-left ${
                      isOpen ? 'max-h-48 border-t border-[#EACE8C]/10' : 'max-h-0'
                    }`}
                  >
                    <p className="p-6 text-base text-[#1A1A1A]/60 font-light leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 8. CALL TO ACTION SECTION */}
      <section className="py-24 bg-[#111] text-[#FAF6F0] relative overflow-hidden border-t border-gold/20">
        <div className="absolute inset-0 opacity-10 select-none">
          <img 
            src="/footer.jpeg" 
            alt="Signature scent background" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          
          <span className="text-base font-cinzel text-gold uppercase tracking-widest font-semibold block">
            The Pleasing Aroma of Christ
          </span>
          
          <h2 className="text-3xl sm:text-5xl font-serif text-white leading-tight font-light">
            Embody Your True Essence Today
          </h2>
          
          <p className="text-base sm:text-sm text-[#FAF6F0]/70 max-w-xl mx-auto leading-relaxed">
            Choose your signature luxury perfume oil in a sophisticated 30ml glass applicator bottle, priced at only 10,000 FCFA. Order now on WhatsApp for instant delivery arrangement.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="#collections"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('collections-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-[#EACE8C] hover:bg-[#d4af37] text-black text-base tracking-widest uppercase font-semibold transition duration-300 w-full sm:w-auto text-center rounded-xs shadow-md"
            >
              Order Instant via WhatsApp
            </a>
            
            <a
              href="#collections"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('collections-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-transparent border border-[#FAF6F0]/20 hover:border-[#FAF6F0]/50 hover:text-white text-base tracking-widest uppercase font-semibold transition duration-300 w-full sm:w-auto text-center rounded-xs"
            >
              View Fragrance Collections
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}
