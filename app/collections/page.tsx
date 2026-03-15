"use client";

import { motion } from 'motion/react';
import Link from 'next/link';

const COLLECTIONS = [
  {
    id: '1',
    title: 'Spring / Summer 2026',
    description: 'A celebration of light and fluid silhouettes. Featuring organic silks and breathable linens.',
    image: 'https://picsum.photos/seed/coll1/1200/800?grayscale',
    slug: 'ss26'
  },
  {
    id: '2',
    title: 'The Minimalist Edit',
    description: 'Essential pieces for the modern wardrobe. Focus on structure, quality, and timeless appeal.',
    image: 'https://picsum.photos/seed/coll2/1200/800?grayscale',
    slug: 'minimalist-edit'
  },
  {
    id: '3',
    title: 'Evening Elegance',
    description: 'Sophisticated designs for after-dark. Bias-cut dresses and tailored outerwear.',
    image: 'https://picsum.photos/seed/coll3/1200/800?grayscale',
    slug: 'evening-elegance'
  }
];

export default function Collections() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-32">
      <header className="text-center space-y-6">
        <h1 className="text-6xl md:text-8xl tracking-tighter">Collections</h1>
        <p className="text-charcoal/60 text-sm uppercase tracking-[0.3em] font-medium max-w-lg mx-auto">
          Explore our curated seasonal releases and thematic edits.
        </p>
      </header>

      <div className="space-y-40">
        {COLLECTIONS.map((collection, index) => (
          <motion.section 
            key={collection.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-20 items-center`}
          >
            <div className="w-full lg:w-3/5 aspect-[3/2] overflow-hidden bg-bone-dark">
              <img 
                src={collection.image} 
                alt={collection.title} 
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105 rounded-lg shadow-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="w-full lg:w-2/5 space-y-8">
              <p className="text-[10px] uppercase tracking-[0.4em] text-charcoal/40 font-bold">Collection 0{index + 1}</p>
              <h2 className="text-4xl md:text-6xl tracking-tighter">{collection.title}</h2>
              <p className="text-charcoal/60 leading-relaxed text-lg">
                {collection.description}
              </p>
              <Link 
                href={`/shop?collection=${collection.slug}`}
                className="inline-block border-b border-charcoal pb-2 text-xs uppercase tracking-widest font-bold hover:text-sand hover:border-sand transition-all"
              >
                View Collection
              </Link>
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}
