"use client";
import { useState, useEffect } from "react";
import { Globe, MoreVertical, X, ShoppingBag, LogOut, User } from "lucide-react"; 
import Image from "next/image";
import Link from "next/link"; 
import { Playfair_Display, Great_Vibes } from "next/font/google";

// --- Premium Fonts ---
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"], style: ["italic"] });
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: ["400"] });

export default function Navbar({ isBangla, setIsBangla }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [cartCount, setCartCount] = useState(0); // 🔴 নতুন স্টেট: কার্ট আইটেমের সংখ্যা রাখার জন্য

    // 🔴 নতুন ফাংশন: ডাটাবেস থেকে কার্টের সংখ্যা ফেচ করা
    const fetchCartCount = async (userId) => {
        try {
            const res = await fetch(`/api/cart?userId=${userId}`);
            if (res.ok) {
                const data = await res.json();
                // সব আইটেমের quantity যোগ করে টোটাল বের করা হচ্ছে
                const totalItems = data.reduce((acc, item) => acc + item.quantity, 0);
                setCartCount(totalItems);
            }
        } catch (error) {
            console.error("Failed to fetch cart count:", error);
        }
    };

    useEffect(() => {
        const checkLoginStatus = () => {
            const user = localStorage.getItem("user");
            if (user) {
                setIsLoggedIn(true);
                const parsedUser = JSON.parse(user);
                setUserData(parsedUser);
                fetchCartCount(parsedUser.id); // 🔴 লগিন থাকলে সাথে সাথে কার্ট ফেচ করবে
            } else {
                setIsLoggedIn(false);
                setUserData(null);
                setCartCount(0); // লগআউট থাকলে কার্ট জিরো
            }
        };

        // শুরুতে একবার চেক করবে
        checkLoginStatus();

        // 🔴 কাস্টম ইভেন্ট লিসেনার: লগিন বা কার্ট আপডেট হলে রিয়েল-টাইমে নাম্বার চেঞ্জ হবে
        const handleCartUpdate = () => {
            const user = localStorage.getItem("user");
            if (user) {
                fetchCartCount(JSON.parse(user).id);
            }
        };

        window.addEventListener("userLoggedIn", checkLoginStatus);
        window.addEventListener("cartUpdated", handleCartUpdate); // কার্ট আপডেটের ইভেন্ট

        return () => {
            window.removeEventListener("userLoggedIn", checkLoginStatus);
            window.removeEventListener("cartUpdated", handleCartUpdate);
        };
    }, []);

    // লগআউট ফাংশন
    const handleLogout = () => {
        localStorage.removeItem("user"); 
        setIsLoggedIn(false);
        setUserData(null);
        setCartCount(0); // লগআউট করলে ব্যাজ ক্লিয়ার হয়ে যাবে
        setShowProfileMenu(false);
    };

    return (
        <nav className="flex fixed top-0 w-full z-50 px-4 md:px-12 py-3 md:py-4 justify-between items-center bg-[#030303]/60 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.3)] transition-all duration-300">

            {/* --- Logo Section (Luxury Typography) --- */}
            <Link href="/" className="flex items-center gap-3 cursor-pointer group">
                <div className="relative h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden border border-white/10 group-hover:border-[#E31B23]/50 transition-colors shadow-[0_0_15px_rgba(227,27,35,0.2)]">
                    <Image
                        src="/crab-logo.jpeg" 
                        alt="Crab Lab Logo"
                        fill
                        priority 
                        className="object-cover" 
                    />
                </div>
                <div className="flex flex-col justify-center -mt-1">
                    <span className={`${greatVibes.className} text-[#E31B23] text-2xl md:text-3xl leading-none tracking-widest drop-shadow-md`}>
                        RU's
                    </span>
                    <span className={`${playfair.className} text-white text-lg md:text-xl font-bold italic leading-none tracking-wider -mt-1`}>
                        Crab Lab
                    </span>
                </div>
            </Link>

            {/* --- Desktop Menu --- */}
            <div className="hidden md:flex items-center gap-8">
                <Link href="/menu" className="text-white/80 hover:text-[#E31B23] transition-colors duration-300 font-medium tracking-wider uppercase text-sm">
                    {isBangla ? "মেনু" : "Menu"}
                </Link>
                
                <Link href="#offers" className="text-white/80 hover:text-[#E31B23] transition-colors duration-300 font-medium tracking-wider uppercase text-sm">
                    {isBangla ? "অফার" : "Offers"}
                </Link>

                {/* Language Toggle */}
                <button
                    onClick={() => setIsBangla(!isBangla)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:border-[#E31B23]/50 hover:bg-[#E31B23]/10 transition-all text-white"
                >
                    <Globe size={16} className="text-[#E31B23]" />
                    <span className="text-xs font-bold tracking-widest">{isBangla ? 'EN' : 'BN'}</span>
                </button>

                {/* 🔴 Desktop Cart Icon with Dynamic Badge */}
                <Link href="/cart" className="relative p-2 text-white hover:text-[#E31B23] transition-colors group">
                    <ShoppingBag size={24} className="group-hover:scale-110 transition-transform" />
                    {cartCount > 0 && (
                        <span className="absolute top-0 right-0 bg-[#E31B23] text-white text-[10px] font-black h-4 w-4 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(227,27,35,0.6)] animate-pulse">
                            {cartCount}
                        </span>
                    )}
                </Link>

                {/* --- Auth Section (Login / Profile Info) --- */}
                {isLoggedIn ? (
                    <div className="relative">
                        <button 
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className="relative h-10 w-10 flex items-center justify-center rounded-full border-2 border-[#E31B23] bg-[#0a0a0a] overflow-hidden hover:shadow-[0_0_15px_rgba(227,27,35,0.4)] transition-all"
                        >
                            <User size={20} className="text-[#E31B23]" />
                        </button>

                        {/* Profile Dropdown */}
                        {/* Profile Dropdown */}
{showProfileMenu && (
    <div className="absolute right-0 mt-3 w-56 bg-[#0a0a0a]/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl py-3 z-50">
        <div className="px-4 py-3 border-b border-white/10 mb-2">
            <p className="text-sm text-white font-bold truncate">{userData?.name}</p>
            <p className="text-xs text-[#888888] font-mono">{userData?.phone}</p>
        </div>
        
        {/* ✅ My Orders Link */}
        <Link href="/orders" onClick={() => setShowProfileMenu(false)} className="w-full flex items-center gap-3 px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/5 transition-colors">
            <ShoppingBag size={18} className="text-[#E31B23]" />
            {isBangla ? "আমার অর্ডারসমূহ" : "My Orders"}
        </Link>

        <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-white/80 hover:text-[#E31B23] hover:bg-[#E31B23]/10 transition-colors mt-1"
        >
            <LogOut size={18} /> 
            {isBangla ? "লগআউট" : "Logout"}
        </button>
    </div>
)}
                    </div>
                ) : (
                    <Link
                        href="/login"
                        className="flex items-center justify-center px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E31B23] to-[#b31219] text-white font-bold tracking-widest text-sm uppercase shadow-[0_0_15px_rgba(227,27,35,0.3)] hover:shadow-[0_0_25px_rgba(227,27,35,0.6)] hover:scale-105 transition-all"
                    >
                        {isBangla ? "লগিন" : "Login"}
                    </Link>
                )}
            </div>

            {/* --- Mobile Actions (Cart + Hamburger) --- */}
            <div className="flex md:hidden items-center gap-4">
                
                {/* 🔴 Mobile Cart Icon with Dynamic Badge */}
                <Link href="/cart" className="relative p-1 text-white hover:text-[#E31B23] transition-colors">
                    <ShoppingBag size={24} />
                    {cartCount > 0 && (
                        <span className="absolute top-0 right-0 bg-[#E31B23] text-white text-[10px] font-black h-4 w-4 flex items-center justify-center rounded-full shadow-md animate-pulse">
                            {cartCount}
                        </span>
                    )}
                </Link>

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-1 text-white hover:text-[#E31B23] transition-colors"
                >
                    {isMenuOpen ? <X size={28} /> : <MoreVertical size={28} />}
                </button>
            </div>

            {/* --- Mobile Dropdown Menu --- */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-[#050505]/95 backdrop-blur-2xl border-b border-[#E31B23]/20 flex flex-col items-center py-8 gap-6 md:hidden shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-50">
                    
                    {isLoggedIn && (
                        <div className="flex flex-col items-center gap-3 mb-4 pb-6 border-b border-white/10 w-4/5">
                            <div className="w-16 h-16 rounded-full border-2 border-[#E31B23] bg-[#0a0a0a] flex items-center justify-center shadow-[0_0_15px_rgba(227,27,35,0.3)]">
                                <User size={32} className="text-[#E31B23]" />
                            </div>
                            <div className="text-center">
                                <p className="text-white font-bold text-lg">{userData?.name || "User"}</p>
                                <p className="text-[#a0a0a0] text-sm font-mono">{userData?.phone || ""}</p>
                            </div>
                        </div>
                    )}

                    <Link href="/menu" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-[#E31B23] text-xl font-bold uppercase tracking-widest transition-colors">
                        {isBangla ? "মেনু" : "Menu"}
                    </Link>
                    
                    <Link href="#offers" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-[#E31B23] text-xl font-bold uppercase tracking-widest transition-colors">
                        {isBangla ? "অফার" : "Offers"}
                    </Link>

                    <button
                        onClick={() => { setIsBangla(!isBangla); setIsMenuOpen(false); }}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/10 bg-white/5 text-white mt-2"
                    >
                        <Globe size={18} className="text-[#E31B23]" />
                        <span className="text-sm font-bold tracking-widest">{isBangla ? 'English' : 'বাংলা'}</span>
                    </button>

                    {isLoggedIn ? (
                         <button
                         onClick={() => { handleLogout(); setIsMenuOpen(false); }} 
                         className="flex items-center justify-center gap-2 px-10 py-3.5 mt-4 rounded-full border border-[#E31B23] text-[#E31B23] font-bold uppercase tracking-widest w-11/12 max-w-xs hover:bg-[#E31B23]/10 transition-colors"
                     >
                         <LogOut size={18} />
                         {isBangla ? "লগআউট" : "Logout"}
                     </button>
                    ) : (
                        <Link
                            href="/login"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center justify-center px-10 py-3.5 mt-4 rounded-full bg-gradient-to-r from-[#E31B23] to-[#b31219] font-bold tracking-widest uppercase text-white shadow-[0_0_20px_rgba(227,27,35,0.4)] w-11/12 max-w-xs"
                        >
                            {isBangla ? "লগিন" : "Login"}
                        </Link>
                    )}
                </div>
            )}
            
        </nav>
    );
}