"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, UtensilsCrossed, Users, Settings, LogOut, Menu } from "lucide-react";
import { Anton } from "next/font/google";

const anton = Anton({ subsets: ["latin"], weight: ["400"] });

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Menu Management", href: "/admin/menu", icon: UtensilsCrossed },
    { name: "Users List", href: "/admin/users", icon: Users },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#F4F7FE] flex">
      {/* Sidebar */}
      <aside className={`bg-white shadow-xl transition-all duration-300 z-50 fixed md:relative h-screen ${isSidebarOpen ? 'w-64' : 'w-0 md:w-20'} overflow-hidden flex flex-col`}>
        <div className="h-20 flex items-center justify-center border-b border-gray-100">
          <h1 className={`${anton.className} text-2xl text-gray-900 ${!isSidebarOpen && 'md:hidden'}`}>
            CRAB<span className="text-[#E31B23]">LAB</span>
          </h1>
          {!isSidebarOpen && <span className={`${anton.className} text-2xl text-[#E31B23] hidden md:block`}>CL</span>}
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.includes(item.href);
            return (
              <Link key={item.name} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-[#E31B23] text-white shadow-lg shadow-[#E31B23]/30' : 'text-gray-500 hover:bg-red-50 hover:text-[#E31B23]'}`}>
                <Icon size={20} />
                <span className={`font-medium ${!isSidebarOpen && 'md:hidden'}`}>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl text-gray-500 hover:bg-red-50 hover:text-[#E31B23] transition-colors">
            <LogOut size={20} />
            <span className={`font-medium ${!isSidebarOpen && 'md:hidden'}`}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-20 bg-white/80 backdrop-blur-md shadow-sm flex items-center px-6 justify-between shrink-0">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-gray-50 rounded-lg text-gray-600 hover:text-[#E31B23] transition-colors">
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 text-[#E31B23] rounded-full flex items-center justify-center font-bold">A</div>
            <div>
              <p className="text-sm font-bold text-gray-900">Admin</p>
              <p className="text-xs text-gray-500">Superuser</p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}