"use client";
import { useState } from "react";
import { Globe, MoreVertical, X, ShoppingBag, LogOut, User } from "lucide-react"; 
import Image from "next/image";
import Link from "next/link"; 
import { Playfair_Display, Great_Vibes } from "next/font/google";

// --- Premium Fonts ---
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"], style: ["italic"] });
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: ["400"] });

export default function Navbar({ isBangla, setIsBangla, setShowAuthModal }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    
    // ⚠️ এটি একটি ফেক স্টেট। পরে যখন আসল লগিন করবে, তখন এই স্টেটটা Auth Context থেকে আসবে।
    // ডেমো দেখার জন্য তুমি `false` কে `true` করে দেখতে পারো প্রোফাইল কেমন দেখায়।
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // ডেমো লগিন ফাংশন
    const handleMockLogin = () => {
        setIsLoggedIn(true);
        // setShowAuthModal(true); // আসল প্রজেক্টে মডাল ওপেন হবে
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

                {/* Cart Icon */}
                <Link href="/cart" className="relative p-2 text-white hover:text-[#E31B23] transition-colors group">
                    <ShoppingBag size={24} className="group-hover:scale-110 transition-transform" />
                    <span className="absolute top-0 right-0 bg-[#E31B23] text-white text-[10px] font-black h-4 w-4 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(227,27,35,0.6)]">
                        3
                    </span>
                </Link>

                {/* --- Auth Section (Login / Profile Pic) --- */}
                {isLoggedIn ? (
                    <div className="relative">
                        <button 
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className="relative h-10 w-10 rounded-full border-2 border-[#E31B23] overflow-hidden hover:shadow-[0_0_15px_rgba(227,27,35,0.4)] transition-all"
                        >
                            {/* ডেমো প্রোফাইল ছবি (Next.js config error এড়াতে সরাসরি img ট্যাগ) */}
                            <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
                        </button>

                        {/* Profile Dropdown */}
                        {showProfileMenu && (
                            <div className="absolute right-0 mt-3 w-48 bg-[#0a0a0a]/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl py-2 z-50">
                                <div className="px-4 py-3 border-b border-white/10 mb-2">
                                    <p className="text-sm text-white font-bold">Joyassroy Barua</p>
                                    <p className="text-xs text-[#888888]">user@example.com</p>
                                </div>
                                <button 
                                    onClick={() => {
                                        setIsLoggedIn(false);
                                        setShowProfileMenu(false);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-2 text-white/80 hover:text-white hover:bg-[#E31B23]/20 transition-colors"
                                >
                                    <LogOut size={16} className="text-[#E31B23]" /> 
                                    {isBangla ? "লগআউট" : "Logout"}
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={handleMockLogin}
                        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E31B23] to-[#b31219] text-white font-bold tracking-widest text-sm uppercase shadow-[0_0_15px_rgba(227,27,35,0.3)] hover:shadow-[0_0_25px_rgba(227,27,35,0.6)] hover:scale-105 transition-all"
                    >
                        {isBangla ? "লগিন" : "Login"}
                    </button>
                )}
            </div>

            {/* --- Mobile Actions (Cart + Hamburger) --- */}
            <div className="flex md:hidden items-center gap-4">
                
                {/* Mobile Cart Icon */}
                <Link href="/cart" className="relative p-1 text-white hover:text-[#E31B23] transition-colors">
                    <ShoppingBag size={24} />
                    <span className="absolute top-0 right-0 bg-[#E31B23] text-white text-[10px] font-black h-4 w-4 flex items-center justify-center rounded-full shadow-md">
                        3
                    </span>
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
                    
                    {/* Mobile Profile Section */}
                    {isLoggedIn && (
                        <div className="flex flex-col items-center gap-3 mb-4 pb-6 border-b border-white/10 w-4/5">
                            <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-16 h-16 rounded-full border-2 border-[#E31B23]" />
                            <p className="text-white font-bold">Joyassroy Barua</p>
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

                    {/* Mobile Auth Button */}
                    {isLoggedIn ? (
                         <button
                         onClick={() => { setIsLoggedIn(false); setIsMenuOpen(false); }}
                         className="flex items-center justify-center gap-2 px-10 py-3.5 mt-4 rounded-full border border-[#E31B23] text-[#E31B23] font-bold uppercase tracking-widest w-11/12 max-w-xs hover:bg-[#E31B23]/10"
                     >
                         <LogOut size={18} />
                         {isBangla ? "লগআউট" : "Logout"}
                     </button>
                    ) : (
                        <button
                            onClick={() => { handleMockLogin(); setIsMenuOpen(false); }}
                            className="px-10 py-3.5 mt-4 rounded-full bg-gradient-to-r from-[#E31B23] to-[#b31219] font-bold tracking-widest uppercase text-white shadow-[0_0_20px_rgba(227,27,35,0.4)] w-11/12 max-w-xs"
                        >
                            {isBangla ? "লগিন" : "Login"}
                        </button>
                    )}
                </div>
            )}
            
        </nav>
    );
}