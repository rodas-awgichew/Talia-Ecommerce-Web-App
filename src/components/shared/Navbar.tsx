"use client";

import Link from 'next/link';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '@/src/store/useCart';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const cartItems = useCart((state) => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bone/80 backdrop-blur-md border-b border-charcoal/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-8">
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden text-charcoal hover:text-sand transition-colors"
                aria-label="Open Menu"
              >
                <Menu size={24} />
              </button>
              <div className="hidden lg:flex space-x-8 text-xs uppercase tracking-[0.2em] font-medium">
                <Link href="/shop" className="hover:text-sand transition-colors">Shop</Link>
                <Link href="/collections" className="hover:text-sand transition-colors">Collections</Link>
                <Link href="/about" className="hover:text-sand transition-colors">About</Link>
              </div>
            </div>

            <Link href="/" className="text-3xl font-serif tracking-tighter hover:opacity-80 transition-opacity">
              TALIA
            </Link>

            <div className="flex items-center space-x-6">
              
              <Link href="/auth/login" className="text-charcoal hover:text-sand transition-colors" aria-label="Account">
                <User size={20} />
              </Link>
              <Link href="/cart" className="relative text-charcoal hover:text-sand transition-colors" aria-label="Cart">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-sand text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-full max-w-xs bg-bone z-[70] p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-2xl font-serif tracking-tighter">SADOR</span>
                <button onClick={() => setIsMenuOpen(false)} aria-label="Close Menu">
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col space-y-8 text-lg uppercase tracking-widest font-medium">
                <Link href="/shop" className="hover:text-sand transition-colors">Shop All</Link>
                <Link href="/collections" className="hover:text-sand transition-colors">Collections</Link>
                <Link href="/about" className="hover:text-sand transition-colors">About Us</Link>
                <Link href="/auth/login" className="hover:text-sand transition-colors">My Account</Link>
              </div>

              <div className="mt-auto space-y-6 pt-8 border-t border-charcoal/10">
                <p className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold">Follow Us</p>
                <div className="flex space-x-6 text-xs uppercase tracking-widest">
                  <a href="#" className="hover:text-sand transition-colors">Instagram</a>
                  <a href="#" className="hover:text-sand transition-colors">Pinterest</a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
