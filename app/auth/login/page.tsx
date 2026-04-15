"use client";

import Link from 'next/link';
import { motion } from 'motion/react';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { getSupabaseBrowserClient } from '@/src/lib/supabaseClient';

export default function Login() {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  setLoading(true);
  setErrorMsg("");

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    setErrorMsg(error.message);
    setLoading(false);
    return;
  }

  const user = data.user;

  const { data: profile, error: profileError } = await supabase
  .from("profiles")
  .select("role")
  .eq("id", user.id)
  .single();

if (profileError || !profile) {
  console.error("Profile missing");

  document.cookie = `user-role=user; path=/`;

  router.push("/");
  return;
}

  setLoading(false);

  //  ROLE-BASED REDIRECT
  if (profile.role === "admin") {
    router.push("/admin");
  } else {
    router.push("/");
  }

  router.refresh();
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
          <p className="text-charcoal/60 text-sm uppercase tracking-widest font-medium">
            Please enter your details
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">

          {/* ERROR */}
          {errorMsg && (
            <p className="text-red-500 text-sm">{errorMsg}</p>
          )}

          <div className="space-y-6">

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
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase tracking-widest font-bold text-charcoal/40">
                  Password
                </label>
                <Link href="/auth/forgot-password" className="text-[10px] uppercase tracking-widest text-charcoal/40 hover:text-charcoal">
                  Forgot Password?
                </Link>
              </div>

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

          {/* BUTTON */}
          <button  
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-charcoal text-bone text-xs uppercase tracking-widest font-bold hover:bg-sand transition-all flex items-center justify-center space-x-3 disabled:opacity-50"
          >
            <span>{loading ? "Signing in..." : "Sign In"}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="text-center space-y-4 pt-8 border-t border-charcoal/10">
          <p className="text-sm text-charcoal/60">New to Sador?</p>
          <Link 
            href="/auth/signup" 
            className="inline-block text-xs uppercase tracking-widest font-bold border-b border-charcoal pb-1 hover:text-sand"
          >
            Create an Account
          </Link>
        </div>
      </motion.div>
    </div>
  );
}