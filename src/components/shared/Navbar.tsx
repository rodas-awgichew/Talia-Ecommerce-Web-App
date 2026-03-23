"use client";

import Link from "next/link";
import { ShoppingBag, User, Menu, X, LogOut } from "lucide-react";
import { useCart } from "@/src/store/useCart";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/src/lib/supabaseClient";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export default function Navbar() {
  const cartItems = useCart((state) => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  // Get initial session
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };

    getSession();

    // Listen for auth changes 
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase]);


  const handleLogout = async () => {
    await supabase.auth.signOut();

    // Force refresh so middleware/layout sees new state
    router.push("/auth/login");
    router.refresh();
  };

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
  }, [isMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* LEFT */}
            <div className="flex items-center flex-1">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden p-2 -ml-2"
              >
                <Menu size={24} />
              </button>

              <div className="hidden lg:flex space-x-8 text-xs uppercase tracking-widest font-medium">
                <Link href="/shop">Shop</Link>
                <Link href="/collections">Collections</Link>
                <Link href="/about">About</Link>
              </div>
            </div>

            {/* CENTER */}
            <Link href="/" className="text-2xl md:text-3xl font-serif text-center flex-1">
              TALIA
            </Link>

            {/* RIGHT */}
            <div className="flex items-center justify-end space-x-5 flex-1">

              {/* 👇 AUTH UI */}
              {loading ? null : !user ? (
                <Link href="/auth/login">
                  <User size={20} />
                </Link>
              ) : (
                <button onClick={handleLogout}>
                  <LogOut size={20} />
                </button>
              )}

              <Link href="/cart" className="relative">
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

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/30 z-[60]"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-white z-[70] p-8"
            >
              <div className="flex justify-end">
                <button onClick={() => setIsMenuOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col space-y-8 mt-12 text-xl font-serif">
                <Link href="/shop">Shop</Link>
                <Link href="/collections">Collections</Link>
                <Link href="/about">About</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}