"use client";

import Link from 'next/link';
import { motion } from 'motion/react';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { getSupabaseBrowserClient } from '@/src/lib/supabaseClient';

export default function Signup() {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name, // ✅ store user name
        },
      },
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    // ✅ If email confirmation is OFF
    if (data.session) {
      router.push('/'); // redirect after signup
    } else {
      // ✅ If email confirmation is ON
      setSuccessMsg('Check your email to confirm your account.');
    }
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
          <p className="text-charcoal/60 text-sm uppercase tracking-widest font-medium">
            Join the Sador community
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-8">

          {/* ERROR MESSAGE */}
          {errorMsg && (
            <p className="text-red-500 text-sm">{errorMsg}</p>
          )}

          {/* SUCCESS MESSAGE */}
          {successMsg && (
            <p className="text-green-600 text-sm">{successMsg}</p>
          )}

          <div className="space-y-6">

            {/* NAME */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-charcoal/40">
                Full Name
              </label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-transparent border-b border-charcoal/10 py-3 focus:border-charcoal outline-none text-sm"
                placeholder="Jane Doe"
              />
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-charcoal/40">
                Email Address
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent border-b border-charcoal/10 py-3 focus:border-charcoal outline-none text-sm"
                placeholder="email@example.com"
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-charcoal/40">
                Password
              </label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent border-b border-charcoal/10 py-3 focus:border-charcoal outline-none text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-charcoal text-bone text-xs uppercase tracking-widest font-bold hover:bg-sand transition-all flex items-center justify-center space-x-3 disabled:opacity-50"
          >
            <span>{loading ? "Creating..." : "Create Account"}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="text-center space-y-4 pt-8 border-t border-charcoal/10">
          <p className="text-sm text-charcoal/60">Already have an account?</p>
          <Link 
            href="/auth/login" 
            className="inline-block text-xs uppercase tracking-widest font-bold border-b border-charcoal pb-1 hover:text-sand transition-all"
          >
            Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
}