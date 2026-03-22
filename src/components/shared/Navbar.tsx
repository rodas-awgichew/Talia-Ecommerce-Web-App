"use client";

import Link from "next/link";
import { ShoppingBag, User, Menu, X, LogOut } from "lucide-react";
import { useCart } from "@/src/store/useCart";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/src/lib/supabaseClient";

export default function Navbar() {
  const cartItems = useCart((state) => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const pathname = usePathname();
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* LEFT: Hamburger (Mobile) / Nav Links (Desktop) */}
            <div className="flex items-center flex-1">
              {/* Mobile Toggle - Only visible on small screens */}
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden p-2 -ml-2"
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>

              {/* Desktop Links - Hidden on mobile, flex on large screens */}
              <div className="hidden lg:flex space-x-8 text-xs uppercase tracking-widest font-medium">
                <Link href="/shop" className="hover:opacity-60 transition-opacity">Shop</Link>
                <Link href="/collections" className="hover:opacity-60 transition-opacity">Collections</Link>
                <Link href="/about" className="hover:opacity-60 transition-opacity">About</Link>
              </div>
            </div>

            {/* CENTER: Logo */}
            <Link href="/" className="text-2xl md:text-3xl font-serif text-center flex-1">
              TALIA
            </Link>

            {/* RIGHT: Actions */}
            <div className="flex items-center justify-end space-x-5 flex-1">
              {!user ? (
                <Link href="/auth/login" className="hover:opacity-60 transition-opacity">
                  <User size={20} />
                </Link>
              ) : (
                <button onClick={handleLogout} className="hover:opacity-60 transition-opacity">
                  <LogOut size={20} />
                </button>
              )}

              <Link href="/cart" className="relative hover:opacity-60 transition-opacity">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/30 z-[60] backdrop-blur-sm"
            />
            
            {/* Sidebar Drawer */}
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-white z-[70] p-8 shadow-2xl"
            >
              <div className="flex justify-end">
                <button onClick={() => setIsMenuOpen(false)} className="p-2">
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col space-y-8 mt-12 text-xl font-serif">
                <Link href="/shop" className="border-b border-gray-100 pb-2">Shop</Link>
                <Link href="/collections" className="border-b border-gray-100 pb-2">Collections</Link>
                <Link href="/about" className="border-b border-gray-100 pb-2">About</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}