"use client";
import { useState, useEffect } from "react";
import { Globe, ShoppingBag, Search, User, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav({ isBangla, setIsBangla }) {
  const pathname = usePathname();
  
  // Auth & Cart States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // ডাটাবেস থেকে কার্টের সংখ্যা ফেচ করা
  const fetchCartCount = async (userId) => {
      try {
          const res = await fetch(`/api/cart?userId=${userId}`);
          if (res.ok) {
              const data = await res.json();
              const totalItems = data.reduce((acc, item) => acc + item.quantity, 0);
              setCartCount(totalItems);
          }
      } catch (error) {
          console.error("Failed to fetch cart count:", error);
      }
  };

  // রিয়েল-টাইম ডাটা সিঙ্ক
  useEffect(() => {
      const checkLoginStatus = () => {
          const user = localStorage.getItem("user");
          if (user) {
              setIsLoggedIn(true);
              fetchCartCount(JSON.parse(user).id);
          } else {
              setIsLoggedIn(false);
              setCartCount(0);
          }
      };

      checkLoginStatus();

      const handleCartUpdate = () => {
          const user = localStorage.getItem("user");
          if (user) fetchCartCount(JSON.parse(user).id);
      };

      window.addEventListener("userLoggedIn", checkLoginStatus);
      window.addEventListener("cartUpdated", handleCartUpdate);

      return () => {
          window.removeEventListener("userLoggedIn", checkLoginStatus);
          window.removeEventListener("cartUpdated", handleCartUpdate);
      };
  }, []);

  // এই পেজগুলোতে বটম ন্যাভ লুকানো থাকলে ভালো (অপশনাল)
  if (pathname === '/login' || pathname === '/signup') return null;

  return (
    <div className="md:hidden fixed bottom-0 w-full z-50 px-6 py-2 backdrop-blur-2xl bg-[#080808]/90 border-t border-white/10 pb-safe">
      <div className="flex justify-between items-center w-full relative">
        
        {/* --- Home Link --- */}
        <Link 
          href="/" 
          className={`relative p-2 flex flex-col items-center gap-1 transition-all duration-500 ease-out ${
            pathname === '/' ? '-translate-y-4 text-[#E31B23]' : 'text-[#A0A0A0] hover:text-white'
          }`}
        >
          <Home size={24} className={`transition-transform duration-500 ${pathname === '/' ? 'scale-110' : 'scale-100'}`} />
          <span className={`text-[10px] font-bold transition-opacity duration-500 ${pathname === '/' ? 'opacity-100' : 'opacity-0'}`}>
            Home
          </span>
          <span className={`absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-[#E31B23] transition-all duration-500 ${pathname === '/' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></span>
        </Link>

        {/* --- Menu/Search Link --- */}
        <Link 
          href="/menu" 
          className={`relative p-2 flex flex-col items-center gap-1 transition-all duration-500 ease-out ${
            pathname === '/menu' ? '-translate-y-4 text-[#E31B23]' : 'text-[#A0A0A0] hover:text-white'
          }`}
        >
          <Search size={24} className={`transition-transform duration-500 ${pathname === '/menu' ? 'scale-110' : 'scale-100'}`} />
          <span className={`text-[10px] font-bold transition-opacity duration-500 ${pathname === '/menu' ? 'opacity-100' : 'opacity-0'}`}>
            Menu
          </span>
          <span className={`absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-[#E31B23] transition-all duration-500 ${pathname === '/menu' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></span>
        </Link>
        
        {/* --- Center Cart Button (Floating Action Button) --- */}
        <div className="relative -top-6">
          <Link href="/cart" className="relative flex items-center justify-center p-4 bg-[#E31B23] text-white rounded-full shadow-[0_0_20px_rgba(227,27,35,0.4)] border-4 border-[#080808] transform hover:scale-105 active:scale-95 transition-all duration-300">
            <ShoppingBag size={24} />
            {/* Dynamic Cart Badge */}
            {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-[#E31B23] text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-full shadow-md animate-pulse">
                    {cartCount}
                </span>
            )}
          </Link>
        </div>

        {/* --- Language Toggle (Action Button) --- */}
        <button 
          onClick={() => setIsBangla(!isBangla)}
          className="relative p-2 text-[#A0A0A0] hover:text-white flex flex-col items-center gap-1 transition-all duration-300 active:-translate-y-2"
        >
          <Globe size={24} />
          <span className="text-[10px] font-medium opacity-70">{isBangla ? 'EN' : 'BN'}</span>
        </button>

        {/* --- Profile / Orders Link --- */}
        <Link 
          href={isLoggedIn ? "/orders" : "/login"}
          className={`relative p-2 flex flex-col items-center gap-1 transition-all duration-500 ease-out ${
            pathname === '/orders' ? '-translate-y-4 text-[#E31B23]' : 'text-[#A0A0A0] hover:text-white'
          }`}
        >
          <User size={24} className={`transition-transform duration-500 ${pathname === '/orders' ? 'scale-110' : 'scale-100'}`} />
          <span className={`text-[10px] font-bold transition-opacity duration-500 ${pathname === '/orders' ? 'opacity-100' : 'opacity-0'}`}>
            {isLoggedIn ? "Orders" : "Login"}
          </span>
          <span className={`absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-[#E31B23] transition-all duration-500 ${pathname === '/orders' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></span>
        </Link>

      </div>
    </div>
  );
}