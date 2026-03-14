"use client";

import { motion } from "motion/react";
import Link from "next/link";
import ProductCard from "@/src/components/shared/ProductCard";
import { ArrowRight } from "lucide-react";
import { Product } from "@/src/store/useCart";

const FEATURED_PRODUCTS = [
  {
    id: '1',
    name: 'Silk Bias Midi Dress',
    price: 380,
    image: 'https://picsum.photos/seed/dress1/800/1200',
    category: 'Dresses',
    slug: 'silk-bias-midi-dress'
  },
  {
    id: '2',
    name: 'Cashmere Oversized Coat',
    price: 850,
    image: 'https://picsum.photos/seed/coat1/800/1200',
    category: 'Outerwear',
    slug: 'cashmere-oversized-coat'
  },
  {
    id: '3',
    name: 'Leather Minimalist Tote',
    price: 420,
    image: 'https://picsum.photos/seed/bag1/800/1200',
    category: 'Accessories',
    slug: 'leather-minimalist-tote'
  },
  {
    id: '4',
    name: 'Linen Tailored Trousers',
    price: 240,
    image: 'https://picsum.photos/seed/pants1/800/1200',
    category: 'Bottoms',
    slug: 'linen-tailored-trousers'
  }
];

export default function Home() {
  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden">

        <div className="absolute inset-0 bg-charcoal/20 z-10" />

        <img
          src="https://picsum.photos/seed/hero/1920/1080?grayscale"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-9xl text-bone font-serif tracking-tighter mb-8"
          >
            The New Standard
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-bone/80 text-sm md:text-lg uppercase tracking-[0.3em] font-medium mb-12"
          >
            Spring / Summer 2026 Collection
          </motion.p>

          <Link
            href="/shop"
            className="px-12 py-4 bg-bone text-charcoal text-xs uppercase tracking-widest font-bold hover:bg-sand hover:text-white transition-all duration-300"
          >
            Explore Collection
          </Link>

        </div>
      </section>

      {/* Featured Collections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl tracking-tighter">New Arrivals</h2>
            <p className="text-charcoal/60 text-sm uppercase tracking-widest font-medium">Curated for the modern silhouette</p>
          </div>
          <Link href="/shop" className="group flex items-center space-x-2 text-xs uppercase tracking-widest font-bold hover:text-sand transition-colors">
            <span>View All</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        
        <div className="luxury-grid gap-x-8 gap-y-16  ">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand Ethos */}
      <section className="bg-charcoal py-32 text-bone overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <h2 className="text-5xl md:text-7xl tracking-tighter leading-tight">Crafted with <br/><span className="italic font-light">Precision & Purpose</span></h2>
              <p className="text-bone/60 leading-relaxed text-lg max-w-lg">
                Talia is more than a label. It's a commitment to timeless design, ethical production, and the belief that luxury should be felt, not just seen. Every piece is a testament to the art of minimalism.
              </p>
              <div className="flex space-x-12">
                <div>
                  <p className="text-3xl font-serif mb-2">100%</p>
                  <p className="text-[10px] uppercase tracking-widest text-bone/40 font-bold">Organic Silk</p>
                </div>
                <div>
                  <p className="text-3xl font-serif mb-2">Hand</p>
                  <p className="text-[10px] uppercase tracking-widest text-bone/40 font-bold">Finished Details</p>
                </div>
                <div>
                  <p className="text-3xl font-serif mb-2">Italy</p>
                  <p className="text-[10px] uppercase tracking-widest text-bone/40 font-bold">Sourced Leather</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square"
            >
              <img 
                src="https://picsum.photos/seed/ethos/1000/1000?grayscale" 
                alt="Craftsmanship" 
                className="w-full h-full object-cover rounded-lg shadow-lg "
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -left-10 bg-sand p-12 hidden md:block">
                <p className="text-white text-xs uppercase tracking-[0.3em] font-bold">EST. 2026</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/shop?category=dresses" className="group relative aspect-[4/5] overflow-hidden bg-bone-dark rounded-lg shadow-lg">
            <img src="https://picsum.photos/seed/cat1/800/1000" alt="Dresses" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-charcoal/30 transition-colors" />
            <div className="absolute bottom-10 left-10 text-bone">
              <h3 className="text-3xl mb-2 font-serif">Dresses</h3>
              <p className="text-[10px] uppercase tracking-widest font-bold border-b border-bone/40 pb-1 inline-block">Shop Now</p>
            </div>
          </Link>
          <Link href="/shop?category=outerwear" className="group relative aspect-[4/5] overflow-hidden bg-bone-dark">
            <img src="https://picsum.photos/seed/cat2/800/1000" alt="Outerwear" className="w-full rounded-lg shadow-lg h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-charcoal/30 transition-colors" />
            <div className="absolute bottom-10 left-10 text-bone">
              <h3 className="text-3xl mb-2 font-serif">Outerwear</h3>
              <p className="text-[10px] uppercase tracking-widest font-bold border-b border-bone/40 pb-1 inline-block">Shop Now</p>
            </div>
          </Link>
          <Link href="/shop?category=accessories" className="group relative aspect-[4/5] overflow-hidden bg-bone-dark">
            <img src="https://picsum.photos/seed/cat3/800/1000" alt="Accessories" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 rounded-lg shadow-lg" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-charcoal/30 transition-colors" />
            <div className="absolute bottom-10 left-10 text-bone">
              <h3 className="text-3xl mb-2 font-serif">Accessories</h3>
              <p className="text-[10px] uppercase tracking-widest font-bold border-b border-bone/40 pb-1 inline-block">Shop Now</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
