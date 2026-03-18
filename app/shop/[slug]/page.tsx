"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ShoppingBag, ChevronRight, Minus, Plus, Heart } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/src/store/useCart';
import { formatPrice, cn } from '@/src/lib/utils';

const MOCK_PRODUCTS = [
  { id: '1', name: 'Silk Bias Midi Dress', price: 380, image: 'https://picsum.photos/seed/dress1/800/1200', category: 'Dresses', slug: 'silk-bias-midi-dress', description: 'A timeless silhouette crafted from 100% organic mulberry silk. This bias-cut midi dress features a delicate cowl neckline and adjustable spaghetti straps, offering a fluid drape that moves with elegance.' },
  { id: '2', name: 'Cashmere Oversized Coat', price: 850, image: 'https://picsum.photos/seed/coat1/800/1200', category: 'Outerwear', slug: 'cashmere-oversized-coat', description: 'Luxurious double-faced cashmere coat with a relaxed, oversized fit. Hand-stitched seams and a minimalist belt closure make this a versatile masterpiece for the colder months.' },
];

export default function ProductDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const addItem = useCart((state) => state.addItem);
  const [selectedSize, setSelectedSize] = useState('S');
  const [quantity, setQuantity] = useState(1);
  
  const product = MOCK_PRODUCTS.find(p => p.slug === slug) || MOCK_PRODUCTS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-charcoal/40 mb-12">
        <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
        <ChevronRight size={10} />
        <Link href="/shop" className="hover:text-charcoal transition-colors">Shop</Link>
        <ChevronRight size={10} />
        <span className="text-charcoal">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Image Gallery */}
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-[3/4] overflow-hidden bg-bone-dark"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-bone-dark overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                <img src={`https://picsum.photos/seed/detail${i}/400/400`} alt="Detail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-12">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-charcoal/40 font-bold">{product.category}</p>
            <h1 className="text-5xl md:text-6xl tracking-tighter leading-tight">{product.name}</h1>
            <p className="text-2xl font-serif">{formatPrice(product.price)}</p>
          </div>

          <p className="text-charcoal/70 leading-relaxed max-w-lg">
            {product.description}
          </p>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs uppercase tracking-widest font-bold">Select Size</h3>
                <button className="text-[10px] uppercase tracking-widest text-charcoal/40 border-b border-charcoal/20 hover:text-charcoal transition-colors">Size Guide</button>
              </div>
              <div className="flex space-x-3">
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "w-12 h-12 border text-[10px] uppercase tracking-widest transition-all",
                      selectedSize === size 
                        ? "bg-charcoal text-bone border-charcoal" 
                        : "border-charcoal/10 hover:border-charcoal"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center border border-charcoal/10 px-4 py-3 space-x-6">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="hover:text-sand transition-colors"><Minus size={14} /></button>
                <span className="text-sm font-medium w-4 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="hover:text-sand transition-colors"><Plus size={14} /></button>
              </div>
              
              <button 
                onClick={() => addItem(product)}
                className="flex-grow bg-charcoal text-bone py-4 text-xs uppercase tracking-widest font-bold hover:bg-sand transition-all flex items-center justify-center space-x-3"
              >
                <ShoppingBag size={16} />
                <span>Add to Bag</span>
              </button>
              
              <button className="p-4 border border-charcoal/10 hover:bg-charcoal/5 transition-colors">
                <Heart size={18} />
              </button>
            </div>
          </div>

          {/* Accordions */}
          <div className="border-t border-charcoal/10 pt-8 space-y-6">
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="text-xs uppercase tracking-widest font-bold">Details & Composition</span>
                <ChevronRight size={14} className="group-open:rotate-90 transition-transform" />
              </summary>
              <div className="mt-4 text-sm text-charcoal/60 leading-relaxed">
                <ul className="list-disc list-inside space-y-2">
                  <li>100% Organic Mulberry Silk</li>
                  <li>Bias-cut for a fluid drape</li>
                  <li>Adjustable spaghetti straps</li>
                  <li>Dry clean only</li>
                  <li>Made in Italy</li>
                </ul>
              </div>
            </details>
            <details className="group border-t border-charcoal/10 pt-6">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="text-xs uppercase tracking-widest font-bold">Shipping & Returns</span>
                <ChevronRight size={14} className="group-open:rotate-90 transition-transform" />
              </summary>
              <div className="mt-4 text-sm text-charcoal/60 leading-relaxed">
                <p>Complimentary standard shipping on all orders. Returns are accepted within 14 days of delivery.</p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
