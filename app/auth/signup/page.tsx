"use client";

import Link from 'next/link';
import { motion } from 'motion/react';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic
    console.log('Signup attempt:', { name, email, password });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center min-h-[70vh]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-12"
      >
        <div className="text-center space-y-4">
          <h1 className="text-5xl tracking-tighter">Create Account</h1>
          <p className="text-charcoal/60 text-sm uppercase tracking-widest font-medium">Join the Sador community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-charcoal/40">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-transparent border-b border-charcoal/10 py-3 focus:border-charcoal outline-none transition-colors text-sm"
                placeholder="Jane Doe"
              />
            </div>
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
              <label className="text-[10px] uppercase tracking-widest font-bold text-charcoal/40">Password</label>
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
            <span>Create Account</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="text-center space-y-4 pt-8 border-t border-charcoal/10">
          <p className="text-sm text-charcoal/60">Already have an account?</p>
          <Link 
            href="/auth/login" 
            className="inline-block text-xs uppercase tracking-widest font-bold border-b border-charcoal pb-1 hover:text-sand hover:border-sand transition-all"
          >
            Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
