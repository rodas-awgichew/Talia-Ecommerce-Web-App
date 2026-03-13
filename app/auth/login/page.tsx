"use client";

import Link from 'next/link';
import { motion } from 'motion/react';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center min-h-[70vh]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-12"
      >
        <div className="text-center space-y-4">
          <h1 className="text-5xl tracking-tighter">Welcome Back</h1>
          <p className="text-charcoal/60 text-sm uppercase tracking-widest font-medium">Please enter your details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-charcoal/40">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent border-b border-charcoal/10 py-3 focus:border-charcoal outline-none transition-colors text-sm"
                placeholder="email@example.com"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase tracking-widest font-bold text-charcoal/40">Password</label>
                <Link href="/auth/forgot-password" title="Forgot Password" className="text-[10px] uppercase tracking-widest text-charcoal/40 hover:text-charcoal transition-colors">Forgot Password?</Link>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent border-b border-charcoal/10 py-3 focus:border-charcoal outline-none transition-colors text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-charcoal text-bone text-xs uppercase tracking-widest font-bold hover:bg-sand transition-all flex items-center justify-center space-x-3"
          >
            <span>Sign In</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="text-center space-y-4 pt-8 border-t border-charcoal/10">
          <p className="text-sm text-charcoal/60">New to Sador?</p>
          <Link 
            href="/auth/signup" 
            className="inline-block text-xs uppercase tracking-widest font-bold border-b border-charcoal pb-1 hover:text-sand hover:border-sand transition-all"
          >
            Create an Account
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
