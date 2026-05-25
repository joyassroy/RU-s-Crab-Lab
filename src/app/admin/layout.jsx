"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, UtensilsCrossed, Users, LogOut, Menu, Loader2, X } from "lucide-react";
import { Anton } from "next/font/google";

const anton = Anton({ subsets: ["latin"], weight: ["400"] });

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  // --- Mobile Screen Detection ---
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- Security Verification ---
  useEffect(() => {
    const verifyAdmin = async () => {
      const userStr = localStorage.getItem("user");
      if (!userStr) { router.push("/login"); return; }
      
      const user = JSON.parse(userStr);
      try {
        const res = await fetch(`/api/auth/verify?id=${user.id}`);
        const data = await res.json();
        if (res.ok && data.role === "admin") {
          setIsAuthorized(true);
        } else {
          router.push("/menu");
        }
      } catch (error) { 
        router.push("/login"); 
      } finally {
        setLoading(false);
      }
    };
    verifyAdmin();
  }, [router]);

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Menu Management", href: "/admin/menu", icon: UtensilsCrossed },
    { name: "Users List", href: "/admin/users", icon: Users },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  // লিংকে ক্লিক করলে মোবাইলে সাইডবার অটোমেটিক বন্ধ হয়ে যাবে
  const handleNavClick = () => {
    if (isMobile) setIsSidebarOpen(false);
  };

  if (loading || !isAuthorized) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#E31B23]" size={40} />
        <p className="mt-4 text-gray-400 font-bold uppercase tracking-widest text-xs">Verifying Admin Access</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-gray-900 font-sans">
      
      {/* 🔴 Mobile Backdrop Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 🔴 Fixed Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-100 z-50 flex flex-col transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[4px_0_24px_rgba(0,0,0,0.02)]
        ${isSidebarOpen ? 'w-64 translate-x-0' : '-translate-x-full md:translate-x-0 md:w-20'}`}
      >
        {/* Logo Area */}
        <div className="h-20 flex items-center justify-between md:justify-center px-6 md:px-0 border-b border-gray-50 shrink-0">
          <h1 className={`${anton.className} text-2xl text-gray-900 tracking-wider ${!isSidebarOpen && 'md:hidden'}`}>
            CRAB<span className="text-[#E31B23]">LAB</span>
          </h1>
          {!isSidebarOpen && <span className={`${anton.className} text-2xl text-[#E31B23] hidden md:block`}>CL</span>}
          
          {/* Mobile Close Button */}
          {isMobile && (
            <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-gray-400 hover:text-[#E31B23] bg-gray-50 rounded-full">
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation - Cute Floating Pills */}
        <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.includes(item.href);
            return (
              <Link 
                key={item.name} 
                href={item.href} 
                onClick={handleNavClick}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                  isActive 
                    ? 'bg-[#E31B23] text-white shadow-[0_8px_20px_rgba(227,27,35,0.25)] scale-[1.02]' 
                    : 'text-gray-500 hover:bg-red-50 hover:text-[#E31B23]'
                }`}
              >
                <Icon size={20} className={`shrink-0 transition-transform duration-300 ${isActive ? '' : 'group-hover:scale-110'}`} />
                <span className={`font-bold text-sm tracking-wide whitespace-nowrap ${!isSidebarOpen && 'md:hidden'}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Area */}
        <div className="p-4 border-t border-gray-50 shrink-0">
          <button 
            onClick={handleLogout} 
            className={`flex items-center gap-3 px-4 py-3.5 w-full text-left rounded-2xl text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-all font-bold text-sm group ${!isSidebarOpen && 'justify-center'}`}
          >
            <LogOut size={20} className="shrink-0 group-hover:-translate-x-1 transition-transform" />
            <span className={`whitespace-nowrap ${!isSidebarOpen && 'md:hidden'}`}>Logout Session</span>
          </button>
        </div>
      </aside>

      {/* 🔴 Scrollable Main Content Area */}
      <div className={`transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col min-h-screen ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        
        {/* Sticky Topbar */}
        <header className="sticky top-0 z-30 h-20 bg-white/70 backdrop-blur-xl border-b border-gray-100 flex items-center px-4 md:px-8 justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="p-2.5 bg-white border border-gray-100 shadow-sm rounded-xl text-gray-500 hover:text-[#E31B23] hover:border-red-100 transition-all"
            >
              <Menu size={20} />
            </button>
            <div className="hidden md:block">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Admin Portal</p>
              <p className="text-sm font-bold text-gray-800">Restaurant Operations</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white border border-gray-100 p-1.5 pr-4 rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-9 h-9 bg-gradient-to-tr from-[#E31B23] to-[#ff4d4d] text-white rounded-full flex items-center justify-center font-black text-sm shadow-inner">
              A
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-black text-gray-900 leading-none">Admin</p>
              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-1">Superuser</p>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>

    </div>
  );
}