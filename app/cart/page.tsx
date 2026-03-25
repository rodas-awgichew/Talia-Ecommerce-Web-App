"use client";

import { useCart } from '@/src/store/useCart';
import { formatPrice } from '@/src/lib/utils';
import { Minus, Plus, X, ArrowRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {loadStripe} from '@stripe/stripe-js';
import { getSupabaseBrowserClient } from '@/src/lib/supabaseClient';
import { useRouter } from "next/navigation";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error("Missing Stripe publishable key");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);



export default function Cart() {
  const { items, removeItem, addItem, decreaseQuantity, total } = useCart();

 const router = useRouter();
const handleCheckout = async () => {
  const supabase = getSupabaseBrowserClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    router.push("/auth/login");
    return;
  }

  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({ items }),
    });

    const dataRes = await res.json();

    if (dataRes.url) {
      window.location.href = dataRes.url;
    }
  } catch (error) {
    console.error("Checkout error:", error);
  }
};  


  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center space-y-8">
        <div className="flex justify-center">
          <div className="p-8 bg-charcoal/5 rounded-full">
            <ShoppingBag size={48} className="text-charcoal/20" />
          </div>
        </div>
        <h1 className="text-4xl font-serif">Your bag is empty</h1>
        <p className="text-charcoal/60 max-w-xs mx-auto">Looks like you haven't added anything to your bag yet.</p>
        <Link 
          href="/shop" 
          className="inline-block px-12 py-4 bg-charcoal text-bone text-xs uppercase tracking-widest font-bold hover:bg-sand transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-5xl md:text-7xl tracking-tighter mb-16">Shopping Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-12">
          {items.map((item) => (
            <motion.div 
              layout
              key={item.id} 
              className="flex gap-8 pb-12 border-b border-charcoal/10 last:border-0"
            >
              <div className="w-32 aspect-[3/4] bg-bone-dark overflow-hidden shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              
              <div className="flex-grow flex flex-col justify-between py-2">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-xs text-charcoal/40 uppercase tracking-widest">{item.category}</p>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-charcoal/40 hover:text-charcoal transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <div className="flex justify-between items-end">
                  <div className="flex items-center border border-charcoal/10 px-3 py-2 space-x-4">
                    <button onClick={() => decreaseQuantity(item.id)} className="hover:text-sand transition-colors"><Minus size={12} /></button>
                    <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                    <button onClick={() => addItem(item)} className="hover:text-sand transition-colors"><Plus size={12} /></button>
                  </div>
                  <p className="text-lg font-serif">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-12">
          <div className="bg-charcoal/5 p-8 space-y-8">
            <h2 className="text-xs uppercase tracking-widest font-bold">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-charcoal/60">Subtotal</span>
                <span>{formatPrice(total())}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-charcoal/60">Shipping</span>
                <span className="uppercase tracking-widest text-[10px] font-bold">Complimentary</span>
              </div>
              <div className="pt-4 border-t border-charcoal/10 flex justify-between font-serif text-xl">
                <span>Total</span>
                <span>{formatPrice(total())}</span>
              </div>
            </div>

          


           <button
  onClick={handleCheckout}
  className="w-full py-4 bg-charcoal text-bone text-xs uppercase tracking-widest font-bold hover:bg-sand transition-all flex items-center justify-center space-x-3"
>
  <span>Checkout</span>
  <ArrowRight size={14} />
</button>
            <div className="space-y-4 pt-4">
              <p className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold text-center">We Accept</p>
              <div className="flex justify-center space-x-4 opacity-30 grayscale">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4 text-center">
            <p className="text-xs text-charcoal/60 italic">Need assistance? Contact our concierge at support@sador.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
