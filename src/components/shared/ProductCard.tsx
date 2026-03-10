"use client";

import Link from 'next/link';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { Product, useCart } from '@/src/store/useCart';
import { formatPrice } from '@/src/lib/utils';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCart((state) => state.addItem);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/shop/${product.slug}`} className="block overflow-hidden bg-bone-dark aspect-[3/4] relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 rounded-lg shadow-lg"
          referrerPolicy="no-referrer"
        />
        {/* Second image hover effect placeholder */}
        <div className="absolute inset-0 bg-charcoal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>

      <div className="mt-4 space-y-1">
        <div className="flex justify-between items-start">
          <Link href={`/shop/${product.slug}`} className="text-sm font-medium hover:text-sand transition-colors">
            {product.name}
          </Link>
          <button 
            onClick={() => addItem(product)}
            className="p-1.5 bg-charcoal text-bone rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
          >
            <Plus size={14} />
          </button>
        </div>
        <p className="text-xs text-charcoal/60 uppercase tracking-widest">{product.category}</p>
        <p className="text-sm font-medium">{formatPrice(product.price)}</p>
      </div>
    </motion.div>
  );
}
