"use client";

import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-40">
      <header className="text-center space-y-6">
        <h1 className="text-6xl md:text-8xl tracking-tighter">About Talia</h1>
        <p className="text-charcoal/60 text-sm uppercase tracking-[0.3em] font-medium max-w-lg mx-auto">
          A commitment to timeless design and ethical production.
        </p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-12">
          <h2 className="text-5xl md:text-7xl tracking-tighter leading-tight">Our Story</h2>
          <p className="text-charcoal/60 leading-relaxed text-lg max-w-lg">
            Founded in 2026, Talia was born from a desire to create a wardrobe that transcends trends. We believe in the power of minimalism and the beauty of high-quality craftsmanship.
          </p>
          <p className="text-charcoal/60 leading-relaxed text-lg max-w-lg">
            Every piece in our collection is thoughtfully designed and meticulously crafted using sustainable materials and ethical practices. We partner with small, family-owned factories in Italy and France to ensure the highest standards of quality and fairness.
          </p>
        </div>
        <div className="aspect-[4/5] overflow-hidden bg-bone-dark">
          <img 
            src="https://picsum.photos/seed/about1/800/1000?grayscale" 
            alt="About Talia" 
            className="w-full h-full object-cover rounded-lg shadow-lg"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      <section className="bg-charcoal py-32 text-bone -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20 text-center ">
          <div className="space-y-6 ">
            <h3 className="text-xs uppercase tracking-[0.4em] font-bold text-bone/40">Sustainability</h3>
            <p className="text-xl font-serif">100% organic and recycled materials by 2030.</p>
          </div>
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-[0.4em] font-bold text-bone/40">Craftsmanship</h3>
            <p className="text-xl font-serif">Hand-finished details in every single garment.</p>
          </div>
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-[0.4em] font-bold text-bone/40">Transparency</h3>
            <p className="text-xl font-serif">Full traceability of our supply chain from fiber to finish.</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="aspect-[4/5] overflow-hidden bg-bone-dark order-2 lg:order-1">
          <img 
            src="https://picsum.photos/seed/about2/800/1000?grayscale" 
            alt="Our Vision" 
            className="w-full h-full object-cover rounded-lg shadow-lg"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="space-y-12 order-1 lg:order-2">
          <h2 className="text-5xl md:text-7xl tracking-tighter leading-tight">Our Vision</h2>
          <p className="text-charcoal/60 leading-relaxed text-lg max-w-lg">
            We envision a future where fashion is synonymous with responsibility. A future where every garment is cherished and passed down through generations.
          </p>
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest font-bold">Contact Us</p>
            <p className="text-sm text-charcoal/60">press@talia.com</p>
            <p className="text-sm text-charcoal/60">careers@talia.com</p>
          </div>
        </div>
      </section>
    </div>
  );
}
