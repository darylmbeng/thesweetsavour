import { createClient } from '@supabase/supabase-js';

// Retrieve Supabase config from env or fallback to user credentials
const SUPABASE_URL = (((import.meta as any).env?.VITE_SUPABASE_URL) || 'https://xeobjyydreuowjixxqgh.supabase.co').trim();
const SUPABASE_ANON_KEY = (((import.meta as any).env?.VITE_SUPABASE_ANON_KEY) || 'sb_publishable_efnrm3mlrnd-2KBw9OBySQ_wKjdyuR7').trim();

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Types matching the database structure
export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  status: 'Available' | 'Coming Soon';
  hero_image?: string;
  created_at?: string;
}

export interface Product {
  id: string;
  collection_id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  volume: string;
  image_url?: string;
  featured: boolean;
  available: boolean;
  display_order: number;
  created_at?: string;
  fragrance_notes?: string; // Add convenience storage
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
}

export interface Settings {
  id: string;
  whatsapp_number: string;
  business_email: string;
  social_links: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

// Elegant initial seeded data for fallback and out-of-the-box experience
export const INITIAL_COLLECTIONS: Collection[] = [
  {
    id: "col-1",
    name: "Baruch Bliss",
    slug: "baruch-bliss",
    category: "Unisex",
    description: "A fragrance collection inspired by blessing, divine favor, confidence, and timeless elegance.",
    status: "Available",
    hero_image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    created_at: new Date().toISOString()
  },
  {
    id: "col-2",
    name: "Hashem Honey",
    slug: "hashem-honey",
    category: "Unisex",
    description: "A warm, sweet, and captivating golden fragrance collection designed to leave an unforgettable, long-lasting presence.",
    status: "Available",
    hero_image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
    created_at: new Date().toISOString()
  },
  {
    id: "col-3",
    name: "Adonai Ember",
    slug: "adonai-ember",
    category: "Male",
    description: "A bold, warm wood and refined masculine fragrance collection designed for strength, elegance, and spiritual stature.",
    status: "Coming Soon",
    hero_image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
    created_at: new Date().toISOString()
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    collection_id: "col-1",
    name: "Solomon's Rose Perfume Oil",
    slug: "solomons-rose-perfume-oil",
    description: "An exquisite composition of rich Damask rose, warm organic saffron, and golden amber. Inspired by the Song of Solomon, this perfume oil surrounds you with a sense of royal elegance and sacred beauty. Sourced from fine houses in Dubai.",
    price: 10000,
    volume: "30ml",
    image_url: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    featured: true,
    available: true,
    display_order: 1,
    fragrance_notes: "Top: Damask Rose, Saffron | Heart: Myrrh, Frankincense | Base: Amber, Agarwood (Oud)",
    created_at: new Date().toISOString()
  },
  {
    id: "prod-2",
    collection_id: "col-2",
    name: "Manna Nectar Perfume Oil",
    slug: "manna-nectar-perfume-oil",
    description: "A sweet, divine fragrance resembling wild honey, roasted almonds, and light vanilla orchid, designed to leave a mesmerizing, long-lasting trail. Sourced from premium distillers in the United States.",
    price: 10000,
    volume: "30ml",
    image_url: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
    featured: true,
    available: true,
    display_order: 2,
    fragrance_notes: "Top: Sweet Honey, Orange Blossom | Heart: Roasted Almond, Vanilla Orchid | Base: White Musk, Sandalwood",
    created_at: new Date().toISOString()
  },
  {
    id: "prod-3",
    collection_id: "col-1",
    name: "Gideon's Laurel Perfume Oil",
    slug: "gideons-laurel-perfume-oil",
    description: "Elegant and empowering scent featuring dynamic citrus and soft jasmine blended with rich balsam. Inspired by courage and blessings, suited for confident presence during daily wear and special occasions.",
    price: 10000,
    volume: "30ml",
    image_url: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    featured: false,
    available: true,
    display_order: 3,
    fragrance_notes: "Top: Bergamot, Grapefruit | Heart: Night Jasmine, Neroli | Base: Cedarwood, Balsam Fir",
    created_at: new Date().toISOString()
  },
  {
    id: "prod-4",
    collection_id: "col-3",
    name: "Ember of Adonai Perfume Oil",
    slug: "ember-of-adonai-perfume-oil",
    description: "A rich, warm oriental scent featuring smoked cedarwood, premium leather, incense, and deep tobacco leaf. Inspired by strength, sacred presence, and masculine sophistication. Sourced from Dubai.",
    price: 10000,
    volume: "30ml",
    image_url: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
    featured: true,
    available: true,
    display_order: 4,
    fragrance_notes: "Top: Incense, Pink Pepper | Heart: Cedar, Rich Mahogany, Leather | Base: Vetiver, Tobacco Leaf, Amber",
    created_at: new Date().toISOString()
  }
];

export const INITIAL_IMAGES: ProductImage[] = [
  { id: "img-1", product_id: "prod-1", image_url: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80" },
  { id: "img-2", product_id: "prod-2", image_url: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80" },
  { id: "img-3", product_id: "prod-3", image_url: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80" },
  { id: "img-4", product_id: "prod-4", image_url: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80" }
];

export const DEFAULT_SETTINGS: Settings = {
  id: "setting-default",
  whatsapp_number: "+237681193469", // Provided by user: +237 6 81 19 34 69
  business_email: "contact@thesweetsavour.com",
  social_links: {
    instagram: "https://www.instagram.com/thesweetsavour_?igsh=YzljYTk1ODg3Zg==",
    facebook: "https://facebook.com/thesweetsavour",
    twitter: "https://twitter.com/thesweetsavour"
  }
};

// Local storage helpers to serve as primary cache or mock database if Supabase elements are not initialized.
function getLocalData<T>(key: string, defaultVal: T): T {
  try {
    const item = localStorage.getItem(`sweetsavour_${key}`);
    return item ? JSON.parse(item) : defaultVal;
  } catch (e) {
    console.error('LocalStorage load failed', e);
    return defaultVal;
  }
}

function setLocalData<T>(key: string, data: T) {
  try {
    localStorage.setItem(`sweetsavour_${key}`, JSON.stringify(data));
  } catch (e) {
    console.error('LocalStorage write failed', e);
  }
}

// Initialize LocalStorage with initial data if empty
if (!localStorage.getItem('sweetsavour_collections')) {
  setLocalData('collections', INITIAL_COLLECTIONS);
}
if (!localStorage.getItem('sweetsavour_products')) {
  setLocalData('products', INITIAL_PRODUCTS);
}
if (!localStorage.getItem('sweetsavour_product_images')) {
  setLocalData('product_images', INITIAL_IMAGES);
}
const storedSettings = localStorage.getItem('sweetsavour_settings');
if (storedSettings) {
  try {
    const parsed = JSON.parse(storedSettings);
    if (!parsed.social_links?.instagram || !parsed.social_links.instagram.includes('thesweetsavour_')) {
      parsed.social_links = {
        ...parsed.social_links,
        instagram: "https://www.instagram.com/thesweetsavour_?igsh=YzljYTk1ODg3Zg=="
      };
      setLocalData('settings', parsed);
    }
  } catch (e) {
    setLocalData('settings', DEFAULT_SETTINGS);
  }
} else {
  setLocalData('settings', DEFAULT_SETTINGS);
}

// Dynamic queries that gracefully fallback if tables do not exist in Supabase yet
export async function getCollections(): Promise<Collection[]> {
  try {
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .order('name');
    
    if (error) throw error;
    if (data && data.length > 0) {
      // Sync local storage with DB data as secondary cache
      setLocalData('collections', data);
      return data as Collection[];
    }
  } catch (err) {
    console.log('Using local collections fallback', err);
  }
  return getLocalData<Collection[]>('collections', INITIAL_COLLECTIONS);
}

export async function getProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('display_order');
    
    if (error) throw error;
    if (data && data.length > 0) {
      setLocalData('products', data);
      return data as Product[];
    }
  } catch (err) {
    console.log('Using local products fallback', err);
  }
  return getLocalData<Product[]>('products', INITIAL_PRODUCTS);
}

export async function getProductImages(productId?: string): Promise<ProductImage[]> {
  try {
    let query = supabase.from('product_images').select('*');
    if (productId) {
      query = query.eq('product_id', productId);
    }
    const { data, error } = await query;
    if (error) throw error;
    if (data && data.length > 0) {
      return data as ProductImage[];
    }
  } catch (err) {
    console.log('Using local product images fallback', err);
  }
  
  const localImages = getLocalData<ProductImage[]>('product_images', INITIAL_IMAGES);
  if (productId) {
    return localImages.filter(img => img.product_id === productId);
  }
  return localImages;
}

export async function getSettings(): Promise<Settings> {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .maybeSingle();
    
    if (error) throw error;
    if (data) {
      setLocalData('settings', data);
      return data as Settings;
    }
  } catch (err) {
    console.log('Using local settings fallback', err);
  }
  return getLocalData<Settings>('settings', DEFAULT_SETTINGS);
}

// Mutation Helpers with local fallback and Supabase syncing
export async function saveCollection(collection: Omit<Collection, 'created_at'>): Promise<Collection> {
  let savedCollection: Collection = { 
    ...collection, 
    created_at: new Date().toISOString() 
  };
  
  // Update Local Storage first for raw performance and foolproof edits
  const localCols = getLocalData<Collection[]>('collections', INITIAL_COLLECTIONS);
  const existingIdx = localCols.findIndex(c => c.id === collection.id);
  if (existingIdx >= 0) {
    localCols[existingIdx] = { ...localCols[existingIdx], ...collection };
    savedCollection = localCols[existingIdx];
  } else {
    localCols.push(savedCollection);
  }
  setLocalData('collections', localCols);

  // Attempt Supabase sync
  try {
    const payload = {
      id: collection.id,
      name: collection.name,
      slug: collection.slug,
      description: collection.description,
      category: collection.category,
      status: collection.status,
      hero_image: collection.hero_image
    };

    const { data, error } = await supabase
      .from('collections')
      .upsert(payload, { onConflict: 'id' })
      .select()
      .single();
    
    if (error) throw error;
    if (data) {
      return data as Collection;
    }
  } catch (err) {
    console.warn('Supabase collection save failed, using local changes', err);
  }

  return savedCollection;
}

export async function deleteCollection(id: string): Promise<boolean> {
  const localCols = getLocalData<Collection[]>('collections', INITIAL_COLLECTIONS);
  const filtered = localCols.filter(c => c.id !== id);
  setLocalData('collections', filtered);

  // Cascade delete products in same collection
  const localProds = getLocalData<Product[]>('products', INITIAL_PRODUCTS);
  const prodsFiltered = localProds.filter(p => p.collection_id !== id);
  setLocalData('products', prodsFiltered);

  try {
    const { error } = await supabase.from('collections').delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (err) {
    console.warn('Supabase collection delete failure, skipped cloud sync', err);
  }
  return true;
}

export async function saveProduct(
  product: Omit<Product, 'created_at'>, 
  additionalImages: string[] = []
): Promise<Product> {
  let savedProduct: Product = { 
    ...product, 
    created_at: new Date().toISOString() 
  };

  // Update Local
  const localProds = getLocalData<Product[]>('products', INITIAL_PRODUCTS);
  const existingIdx = localProds.findIndex(p => p.id === product.id);
  if (existingIdx >= 0) {
    localProds[existingIdx] = { ...localProds[existingIdx], ...product };
    savedProduct = localProds[existingIdx];
  } else {
    localProds.push(savedProduct);
  }
  setLocalData('products', localProds);

  // Update associated auxiliary images
  const localImages = getLocalData<ProductImage[]>('product_images', INITIAL_IMAGES);
  
  // Clear existing images for this product from local
  const remainingImages = localImages.filter(img => img.product_id !== product.id);
  const newImagesList: ProductImage[] = [
    // Include principal image if defined
    ...(product.image_url ? [{ id: `img-p-${product.id}`, product_id: product.id, image_url: product.image_url }] : []),
    // Include grid of supplementary images
    ...additionalImages.map((url, i) => ({
      id: `img-add-${product.id}-${i}-${Date.now()}`,
      product_id: product.id,
      image_url: url
    }))
  ];
  setLocalData('product_images', [...remainingImages, ...newImagesList]);

  // Attempt Supabase upsert
  try {
    const payload = {
      id: product.id,
      collection_id: product.collection_id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      volume: product.volume,
      image_url: product.image_url,
      featured: product.featured,
      available: product.available,
      display_order: product.display_order,
      fragrance_notes: product.fragrance_notes
    };

    const { data, error } = await supabase
      .from('products')
      .upsert(payload, { onConflict: 'id' })
      .select()
      .single();
    
    if (error) throw error;

    // Delete existing product image mappings in database
    await supabase.from('product_images').delete().eq('product_id', product.id);
    
    // Insert new product image mappings in database
    if (newImagesList.length > 0) {
      await supabase.from('product_images').insert(
        newImagesList.map(img => ({
          product_id: img.product_id,
          image_url: img.image_url
        }))
      );
    }

    if (data) {
      return data as Product;
    }
  } catch (err) {
    console.warn('Supabase product save failed, client falling back to local Storage changes', err);
  }

  return savedProduct;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const localProds = getLocalData<Product[]>('products', INITIAL_PRODUCTS);
  const filtered = localProds.filter(p => p.id !== id);
  setLocalData('products', filtered);

  const localImages = getLocalData<ProductImage[]>('product_images', INITIAL_IMAGES);
  setLocalData('product_images', localImages.filter(img => img.product_id !== id));

  try {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (err) {
    console.warn('Supabase product delete failed, skipped cloud sync', err);
  }
  return true;
}

export async function saveSettings(settings: Settings): Promise<Settings> {
  setLocalData('settings', settings);

  try {
    // Attempt settings save to Supabase
    const { data, error } = await supabase
      .from('settings')
      .upsert({
        id: settings.id,
        whatsapp_number: settings.whatsapp_number,
        business_email: settings.business_email,
        social_links: settings.social_links
      }, { onConflict: 'id' })
      .select()
      .single();
    
    if (error) throw error;
    if (data) {
      return data as Settings;
    }
  } catch (err) {
    console.warn('Supabase settings save failed, falling back to local changes', err);
  }

  return settings;
}

// SQL Script string that the administrator can run inside Supabase SQL editor to bootstrap everything.
export const BOOTSTRAP_SQL_SCRIPT = `-- =======================================================
-- CONFIGURATION SQL FOR THE SWEET SAVOUR PERFUME WEBSITE
-- =======================================================
-- Copy and paste this script into your Supabase SQL Editor 
-- (https://supabase.com/dashboard/project/.../sql/new)
-- and click "Run" to create your tables and configure security rules!

-- 1. Create Collections Table
CREATE TABLE IF NOT EXISTS public.collections (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Available', 'Coming Soon')),
  hero_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  collection_id TEXT REFERENCES public.collections(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL DEFAULT 10000,
  volume TEXT NOT NULL DEFAULT '30ml',
  image_url TEXT,
  featured BOOLEAN DEFAULT false NOT NULL,
  available BOOLEAN DEFAULT true NOT NULL,
  display_order INTEGER DEFAULT 0 NOT NULL,
  fragrance_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Product Images Table
CREATE TABLE IF NOT EXISTS public.product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT REFERENCES public.products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL
);

-- 4. Create Settings Table
CREATE TABLE IF NOT EXISTS public.settings (
  id TEXT PRIMARY KEY DEFAULT 'setting-default',
  whatsapp_number TEXT NOT NULL DEFAULT '+237681193469',
  business_email TEXT NOT NULL DEFAULT 'contact@thesweetsavour.com',
  social_links JSONB DEFAULT '{"instagram": "https://www.instagram.com/thesweetsavour_?igsh=YzljYTk1ODg3Zg==", "facebook": "https://facebook.com/thesweetsavour"}'::jsonb
);

-- 5. Seed initial data
INSERT INTO public.collections (id, name, slug, description, category, status, hero_image)
VALUES 
  ('col-1', 'Baruch Bliss', 'baruch-bliss', 'A fragrance collection inspired by blessing, elegance, confidence, and timeless beauty.', 'Unisex', 'Available', 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80'),
  ('col-2', 'Hashem Honey', 'hashem-honey', 'A warm, sweet, and captivating golden fragrance collection designed to leave an unforgettable, long-lasting presence.', 'Unisex', 'Available', 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80'),
  ('col-3', 'Adonai Ember', 'adonai-ember', 'A bold, warm wood and refined masculine fragrance collection designed for strength, elegance, and spiritual stature.', 'Male', 'Coming Soon', 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.products (id, collection_id, name, slug, description, price, volume, image_url, featured, available, display_order, fragrance_notes)
VALUES
  ('prod-1', 'col-1', 'Solomon''s Rose Perfume Oil', 'solomons-rose-perfume-oil', 'An exquisite composition of rich Damask rose, warm organic saffron, and golden amber. Inspired by the Song of Solomon, this perfume oil surrounds you with a sense of royal elegance and sacred beauty. Sourced from fine houses in Dubai.', 10000, '30ml', 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80', true, true, 1, 'Top: Damask Rose, Saffron | Heart: Myrrh, Frankincense | Base: Amber, Agarwood (Oud)'),
  ('prod-2', 'col-2', 'Manna Nectar Perfume Oil', 'manna-nectar-perfume-oil', 'A sweet, divine fragrance resembling wild honey, roasted almonds, and light vanilla orchid, designed to leave a mesmerizing, long-lasting trail. Sourced from premium distillers in the United States.', 10000, '30ml', 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80', true, true, 2, 'Top: Sweet Honey, Orange Blossom | Heart: Roasted Almond, Vanilla Orchid | Base: White Musk, Sandalwood'),
  ('prod-3', 'col-1', 'Gideon''s Laurel Perfume Oil', 'gideons-laurel-perfume-oil', 'Elegant and empowering scent featuring dynamic citrus and soft jasmine blended with rich balsam. Inspired by courage and blessings, suited for confident presence during daily wear and special occasions.', 10000, '30ml', 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80', false, true, 3, 'Top: Bergamot, Grapefruit | Heart: Night Jasmine, Neroli | Base: Cedarwood, Balsam Fir'),
  ('prod-4', 'col-3', 'Ember of Adonai Perfume Oil', 'ember-of-adonai-perfume-oil', 'A rich, warm oriental scent featuring smoked cedarwood, premium leather, incense, and deep tobacco leaf. Inspired by strength, sacred presence, and masculine sophistication. Sourced from Dubai.', 10000, '30ml', 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80', true, true, 4, 'Top: Incense, Pink Pepper | Heart: Cedar, Rich Mahogany, Leather | Base: Vetiver, Tobacco Leaf, Amber')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.product_images (product_id, image_url)
VALUES
  ('prod-1', 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80'),
  ('prod-2', 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80'),
  ('prod-3', 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80'),
  ('prod-4', 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80')
ON CONFLICT DO NOTHING;

INSERT INTO public.settings (id, whatsapp_number, business_email, social_links)
VALUES ('setting-default', '+237681193469', 'contact@thesweetsavour.com', '{"instagram": "https://www.instagram.com/thesweetsavour_?igsh=YzljYTk1ODg3Zg==", "facebook": "https://facebook.com/thesweetsavour", "twitter": "https://twitter.com/thesweetsavour"}')
ON CONFLICT (id) DO NOTHING;

-- 6. Enable Row Level Security (RLS) on all tables for integrity
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- 7. Grant Public Read access to everyone
DROP POLICY IF EXISTS "Allow public read access on collections" ON public.collections;
CREATE POLICY "Allow public read access on collections" ON public.collections 
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access on products" ON public.products;
CREATE POLICY "Allow public read access on products" ON public.products 
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access on product_images" ON public.product_images;
CREATE POLICY "Allow public read access on product_images" ON public.product_images 
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access on settings" ON public.settings;
CREATE POLICY "Allow public read access on settings" ON public.settings 
  FOR SELECT USING (true);

-- 8. Enable Full CRUD permissions for public (allows admin bypass to write to DB)
DROP POLICY IF EXISTS "Allow full write access on collections for authenticated users" ON public.collections;
DROP POLICY IF EXISTS "Allow full write access on collections for public" ON public.collections;
CREATE POLICY "Allow full write access on collections for public" ON public.collections 
  FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow full write access on products for authenticated users" ON public.products;
DROP POLICY IF EXISTS "Allow full write access on products for public" ON public.products;
CREATE POLICY "Allow full write access on products for public" ON public.products 
  FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow full write access on product_images for authenticated users" ON public.product_images;
DROP POLICY IF EXISTS "Allow full write access on product_images for public" ON public.product_images;
CREATE POLICY "Allow full write access on product_images for public" ON public.product_images 
  FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow full write access on settings for authenticated users" ON public.settings;
DROP POLICY IF EXISTS "Allow full write access on settings for public" ON public.settings;
CREATE POLICY "Allow full write access on settings for public" ON public.settings 
  FOR ALL USING (true) WITH CHECK (true);
`;
