import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-bone py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-serif tracking-tighter">Talia</h3>
            <p className="text-sm text-bone/60 leading-relaxed max-w-xs">
              Curating high-fashion essentials for the modern woman. Minimalist luxury, sustainable craftsmanship.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-bone/60">
              <li><Link href="/shop?category=new" className="hover:text-bone transition-colors">New Arrivals</Link></li>
              <li><Link href="/shop?category=dresses" className="hover:text-bone transition-colors">Dresses</Link></li>
              <li><Link href="/shop?category=outerwear" className="hover:text-bone transition-colors">Outerwear</Link></li>
              <li><Link href="/shop?category=accessories" className="hover:text-bone transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-bone/60">
              <li><Link href="/shipping" className="hover:text-bone transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/faq" className="hover:text-bone transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-bone transition-colors">Contact Us</Link></li>
              <li><Link href="/size-guide" className="hover:text-bone transition-colors">Size Guide</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-6">Newsletter</h4>
            <p className="text-sm text-bone/60 mb-4">Join our list for exclusive releases and updates.</p>
            <form className="flex border-b border-bone/20 pb-2">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-bone/30"
              />
              <button type="submit" className="text-xs uppercase tracking-widest font-bold hover:text-sand transition-colors">Join</button>
            </form>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-bone/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-[10px] uppercase tracking-widest text-bone/40">© 2026 Talia. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 text-[10px] uppercase tracking-widest text-bone/40">
            <Link href="/privacy" className="hover:text-bone transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-bone transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
