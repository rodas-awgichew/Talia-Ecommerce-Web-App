"use client";

import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import ProductCard from '@/src/components/shared/ProductCard';
import { Filter, X, ChevronDown } from 'lucide-react';
import { useState, Suspense } from 'react';
import { cn } from '@/src/lib/utils';

const CATEGORIES = ['All', 'Dresses', 'Outerwear', 'Accessories', 'Bottoms', 'Tops'];
const COLORS = ['Black', 'Bone', 'Sand', 'Charcoal', 'Olive'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

const MOCK_PRODUCTS = [
  { id: '1', name: 'Silk Bias Midi Dress', price: 380, image: 'https://picsum.photos/seed/dress1/800/1200', category: 'Dresses', slug: 'silk-bias-midi-dress', colors: ['Black', 'Sand'], sizes: ['S', 'M', 'L'] },
  { id: '2', name: 'Cashmere Oversized Coat', price: 850, image: 'https://picsum.photos/seed/coat1/800/1200', category: 'Outerwear', slug: 'cashmere-oversized-coat', colors: ['Bone', 'Charcoal'], sizes: ['M', 'L', 'XL'] },
  { id: '3', name: 'Leather Minimalist Tote', price: 420, image: 'https://picsum.photos/seed/bag1/800/1200', category: 'Accessories', slug: 'leather-minimalist-tote', colors: ['Black'], sizes: ['S', 'M'] },
  { id: '4', name: 'Linen Tailored Trousers', price: 240, image: 'https://picsum.photos/seed/pants1/800/1200', category: 'Bottoms', slug: 'linen-tailored-trousers', colors: ['Olive'], sizes: ['S', 'M', 'L'] },
  { id: '5', name: 'Cotton Poplin Shirt', price: 180, image: 'https://picsum.photos/seed/shirt1/800/1200', category: 'Tops', slug: 'cotton-poplin-shirt', colors: ['Bone'], sizes: ['S', 'M'] },
  { id: '6', name: 'Wool Blend Blazer', price: 450, image: 'https://picsum.photos/seed/blazer1/800/1200', category: 'Outerwear', slug: 'wool-blend-blazer', colors: ['Charcoal'], sizes: ['M', 'L'] },
  { id: '7', name: 'Satin Slip Skirt', price: 220, image: 'https://picsum.photos/seed/skirt1/800/1200', category: 'Bottoms', slug: 'satin-slip-skirt', colors: ['Sand'], sizes: ['S', 'M', 'L'] },
  { id: '8', name: 'Minimalist Gold Hoops', price: 120, image: 'https://picsum.photos/seed/jewelry1/800/1200', category: 'Accessories', slug: 'minimalist-gold-hoops', colors: ['Gold'], sizes: ['S', 'M', 'L'] },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sort, setSort] = useState("Newest");
  
  const currentCategory = searchParams.get('category') || 'All';

  let filteredProducts = MOCK_PRODUCTS.filter((product) => {
  const categoryMatch =
    currentCategory === "All" ||
    product.category.toLowerCase() === currentCategory.toLowerCase();

  const colorMatch = !selectedColor || product.colors.includes(selectedColor);

  const sizeMatch = !selectedSize || product.sizes.includes(selectedSize);

  return categoryMatch && colorMatch && sizeMatch;

  if (sort === "Price: Low to High") {
  filteredProducts.sort((a, b) => a.price - b.price);
} else if (sort === "Price: High to Low") {
  filteredProducts.sort((a, b) => b.price - a.price);
}

});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 space-y-8 md:space-y-0">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl tracking-tighter">Shop All</h1>
          <p className="text-charcoal/60 text-sm uppercase tracking-widest font-medium">
            {filteredProducts.length} items found
          </p>
        </div>
        
        <div className="flex items-center space-x-6 w-full md:w-auto">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center space-x-2 text-xs uppercase tracking-widest font-bold border-b border-charcoal/20 pb-1 hover:border-charcoal transition-all"
          >
            <Filter size={14} />
            <span>Filter</span>
          </button>
          
          <div className="relative group">
            <button className="flex items-center space-x-2 text-xs uppercase tracking-widest font-bold border-b border-charcoal/20 pb-1 hover:border-charcoal transition-all">
              <span>Sort By</span>
              <ChevronDown size={14} />
            </button>
            <div className="absolute top-full right-0 mt-2 w-48 bg-bone border border-charcoal/5 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-30">
              {['Newest', 'Price: Low to High', 'Price: High to Low'].map((option) => (
                <button 
                  key={option}
                  onClick={() => setSort(option)}
                  className="w-full text-left px-4 py-3 text-[10px] uppercase tracking-widest hover:bg-charcoal hover:text-bone transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block w-64 space-y-12 shrink-0">
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-widest font-bold">Categories</h3>
            <ul className="space-y-4 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <a 
                    href={`/shop?category=${cat}`}
                    className={cn(
                      "hover:text-sand transition-colors",
                      currentCategory === cat ? "text-sand font-bold" : "text-charcoal/60"
                    )}
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-widest font-bold">Color</h3>
            <div className="flex flex-wrap gap-3">
              {COLORS.map((color) => (
                <button 
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className="w-6 h-6 rounded-full border border-charcoal/10 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color.toLowerCase() === 'bone' ? '#F5F5F7' : color.toLowerCase() === 'sand' ? '#C2B280' : color.toLowerCase() }}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-widest font-bold">Size</h3>
            <div className="grid grid-cols-3 gap-2">
              {SIZES.map((size) => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className="py-2 border border-charcoal/10 text-[10px] uppercase tracking-widest hover:bg-charcoal hover:text-bone transition-all"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          <div className="luxury-grid gap-x-8 gap-y-16  ">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-bone z-[70] p-8 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-2xl font-serif">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)}><X size={24} /></button>
              </div>
              
              <div className="space-y-12">
                <div className="space-y-6">
                  <h3 className="text-xs uppercase tracking-widest font-bold">Categories</h3>
                  <div className="flex flex-wrap gap-3">
                    {CATEGORIES.map((cat) => (
                      <a 
                        key={cat}
                        href={`/shop?category=${cat}`}
                        className={cn(
                          "px-4 py-2 border border-charcoal/10 text-[10px] uppercase tracking-widest transition-all",
                          currentCategory === cat ? "bg-charcoal text-bone" : "hover:bg-charcoal/5"
                        )}
                      >
                        {cat}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-charcoal/10">
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full py-4 bg-charcoal text-bone text-xs uppercase tracking-widest font-bold hover:bg-sand transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={<div className="p-20 text-center font-serif text-2xl">Loading Shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
