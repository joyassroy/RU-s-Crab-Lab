"use client";
import { useState, useEffect, createContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  History, Settings, LogOut, Globe, BellRing, 
  Menu as MenuIcon, X, Loader2
} from "lucide-react";
import { Playfair_Display, Anton, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700", "900"], style: ["italic"] });
const anton = Anton({ subsets: ["latin"], weight: ["400"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

// 🔴 Context তৈরি করা হচ্ছে যাতে পেজগুলো isBangla স্টেট ব্যবহার করতে পারে
export const ChefContext = createContext();

export default function ChefLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname(); // কোন পেজে আছে সেটা বোঝার জন্য
  
  const [isBangla, setIsBangla] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // --- 🔴 BACKEND Security Verification ---
  useEffect(() => {
    const verifyUserFromBackend = async () => {
      const userStr = localStorage.getItem("user");
      if (!userStr) { router.push("/login"); return; }

      const user = JSON.parse(userStr);
      try {
        const res = await fetch(`/api/auth/verify?id=${user.id}`);
        const data = await res.json();

        if (res.ok && (data.role === "chef" || data.role === "admin")) {
          setIsAuthorized(true);
        } else {
          router.push("/menu");
        }
      } catch (error) {
        console.error("Verification failed:", error);
        router.push("/login");
      }
    };
    verifyUserFromBackend();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  // লোডিং স্ক্রিন (যতক্ষণ না সিকিউরিটি ভেরিফাই হচ্ছে)
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#E31B23] mb-4" size={48} />
        <p className="text-gray-500 font-medium tracking-widest uppercase text-sm">Verifying Access...</p>
      </div>
    );
  }

  return (
    <ChefContext.Provider value={{ isBangla }}>
      <div className={`min-h-screen bg-[#F8F9FA] flex text-gray-900 ${inter.className}`}>
        
        {/* --- SIDEBAR --- */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:flex flex-col`}>
          <div className="h-20 flex items-center px-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
               <div className="relative h-10 w-10 rounded-full overflow-hidden border border-gray-200 shadow-sm">
                  <Image src="/crab-logo.jpeg" alt="Logo" fill className="object-cover" />
               </div>
               <div className="flex flex-col">
                  <span className={`${playfair.className} text-[#E31B23] text-xl font-bold italic leading-none`}>Chef's Panel</span>
                  <span className="text-xs text-gray-400 font-medium tracking-widest uppercase">RU's Crab Lab</span>
               </div>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="ml-auto lg:hidden text-gray-400 hover:text-[#E31B23]">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 px-4 py-8 space-y-2">
            <Link href="/dashboard" className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${pathname === '/dashboard' ? 'bg-[#E31B23]/5 text-[#E31B23] border border-[#E31B23]/10' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
              <BellRing size={20} /> {isBangla ? "লাইভ অর্ডার" : "Live Orders"}
            </Link>
            <Link href="/history" className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${pathname === '/history' ? 'bg-[#E31B23]/5 text-[#E31B23] border border-[#E31B23]/10' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
              <History size={20} /> {isBangla ? "অর্ডার হিস্ট্রি" : "Order History"}
            </Link>
          </nav>

          <div className="p-4 border-t border-gray-100">
            <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl font-bold transition-colors">
              <LogOut size={18} /> {isBangla ? "লগআউট" : "Logout"}
            </button>
          </div>
        </aside>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
          
          {/* Topbar */}
          <header className="h-20 bg-white border-b border-gray-200 px-4 md:px-8 flex items-center justify-between shrink-0">
             <div className="flex items-center gap-4">
                <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-gray-600 hover:text-[#E31B23]">
                  <MenuIcon size={28} />
                </button>
                <h1 className={`${anton.className} text-2xl md:text-3xl text-gray-800 uppercase tracking-wide`}>
                  Kitchen <span className="text-[#E31B23]">Display</span>
                </h1>
             </div>

             <div className="flex items-center gap-4">
                <button onClick={() => setIsBangla(!isBangla)} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 hover:border-[#E31B23]/50 hover:bg-gray-50 transition-all text-gray-600">
                  <Globe size={16} className="text-[#E31B23]" />
                  <span className="text-xs font-bold tracking-widest">{isBangla ? 'EN' : 'BN'}</span>
                </button>
                
                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
                    <Image src="https://i.pravatar.cc/150?img=68" alt="Chef" width={40} height={40} />
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-bold text-gray-900">Head Chef</p>
                    <p className="text-xs text-gray-500">Kitchen Master</p>
                  </div>
                </div>
             </div>
          </header>

          {/* 🔴 চিলড্রেন (পেজ) রেন্ডার হবে এখানে */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>

        </main>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden"></div>
        )}
      </div>
    </ChefContext.Provider>
  );
}