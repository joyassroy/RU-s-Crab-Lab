import { useState } from "react";
import { Globe, MoreVertical, X } from "lucide-react"; 
import Image from "next/image";
import Link from "next/link"; 

export default function Navbar({ isBangla, setIsBangla, setShowAuthModal }) {
    // মোবাইলের ড্রপডাউন মেনু ট্র্যাক করার স্টেট
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="flex fixed top-0 w-full z-50 px-4 md:px-8 py-3 md:py-5 justify-between items-center backdrop-blur-2xl bg-[#080808]/80 border-b border-white/5 md:border-white/10">

            {/* --- Logo Section --- */}
            <div className="flex items-center gap-2.5 md:gap-3 cursor-pointer group">
                <div className="relative h-9 w-9 md:h-14 md:w-14 rounded-full overflow-hidden border border-white/10 group-hover:border-[#E31B23]/50 transition-colors bg-white/5 flex items-center justify-center shadow-inner">
                    <Image
                        src="/crab-logo.jpeg" 
                        alt="Crab Bites Logo"
                        fill
                        priority 
                        className="object-cover" 
                    />
                </div>
                <div className="text-lg md:text-3xl font-extrabold tracking-widest">
                    <span className="text-white">RU's </span>
                    <span className="text-[#E31B23]">Crab Lab</span>
                </div>
            </div>

            {/* --- Desktop Menu (শুধু ল্যাপটপ/ডেস্কটপে দেখাবে) --- */}
            <div className="hidden md:flex items-center gap-8">
                <Link href="/menu" className="text-[#A0A0A0] hover:text-[#E31B23] transition-colors duration-300 font-medium">
                    Menu
                </Link>
                <Link href="#offers" className="text-[#A0A0A0] hover:text-[#E31B23] transition-colors duration-300 font-medium">
                    Offers
                </Link>

                <button
                    onClick={() => setIsBangla(!isBangla)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-white"
                >
                    <Globe size={18} className="text-[#E31B23]" />
                    <span className="text-sm font-medium">{isBangla ? 'EN' : 'BN'}</span>
                </button>

                <button
                    onClick={() => setShowAuthModal(true)}
                    className="px-8 py-2.5 rounded-full bg-[#E31B23]/10 border border-[#E31B23]/30 hover:bg-[#E31B23] transition-all font-medium text-white shadow-[0_0_15px_rgba(227,27,35,0.15)] hover:shadow-[0_0_25px_rgba(227,27,35,0.4)]"
                >
                    {isBangla ? "লগিন" : "Login"}
                </button>
            </div>

            {/* --- Mobile Action: 3-Dot Toggle Button --- */}
            <div className="flex md:hidden items-center">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 text-white hover:text-[#E31B23] transition-colors"
                >
                    {/* মেনু ওপেন থাকলে 'X' দেখাবে, নাহলে ৩-ডট দেখাবে */}
                    {isMenuOpen ? <X size={26} /> : <MoreVertical size={26} />}
                </button>
            </div>

            {/* --- Mobile Dropdown Menu --- */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-[#080808]/95 backdrop-blur-xl border-b border-white/10 flex flex-col items-center py-8 gap-6 md:hidden shadow-2xl">
                    <Link 
                        href="/menu" 
                        onClick={() => setIsMenuOpen(false)} // ক্লিক করার পর মেনু বন্ধ হয়ে যাবে
                        className="text-white hover:text-[#E31B23] text-xl font-medium transition-colors"
                    >
                        {isBangla ? "মেনু" : "Menu"}
                    </Link>
                    <Link 
                        href="#offers" 
                        onClick={() => setIsMenuOpen(false)}
                        className="text-white hover:text-[#E31B23] text-xl font-medium transition-colors"
                    >
                        {isBangla ? "অফার" : "Offers"}
                    </Link>

                    <button
                        onClick={() => {
                            setIsBangla(!isBangla);
                            setIsMenuOpen(false);
                        }}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/10 bg-white/5 text-white mt-2"
                    >
                        <Globe size={18} className="text-[#E31B23]" />
                        <span className="text-sm font-medium">{isBangla ? 'English' : 'বাংলা'}</span>
                    </button>

                    <button
                        onClick={() => {
                            setShowAuthModal(true);
                            setIsMenuOpen(false);
                        }}
                        className="px-12 py-3.5 mt-2 rounded-full bg-[#E31B23] font-bold text-white shadow-[0_0_15px_rgba(227,27,35,0.4)] w-11/12 max-w-xs"
                    >
                        {isBangla ? "লগিন" : "Login"}
                    </button>
                </div>
            )}
            
        </nav>
    );
}