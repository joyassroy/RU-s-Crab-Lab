"use client";
import { Phone, Mail } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import { Playfair_Display, Great_Vibes } from "next/font/google";

// --- Premium Fonts (Navbar style) ---
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"], style: ["italic"] });
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: ["400"] });

export default function Footer({ isBangla }) {
  return (
    <footer className="bg-[#030303] border-t border-white/5 pt-20 pb-24 md:pb-12 relative z-10 overflow-hidden">
      
      {/* Subtle Red Glow in Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#E31B23]/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto px-6 md:px-10 relative z-10 flex flex-col items-center text-center">

        {/* --- 1. Logo & Brand Name (Navbar Style) --- */}
        <div className="flex flex-col items-center justify-center mb-10 group cursor-pointer">
          <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-[#E31B23]/50 transition-colors shadow-[0_0_20px_rgba(227,27,35,0.2)] mb-4">
            <Image src="/crab-logo.jpeg" alt="Crab Lab Logo" fill className="object-cover" />
          </div>
          
          <div className="flex flex-col justify-center items-center">
              <span className={`${greatVibes.className} text-[#E31B23] text-4xl md:text-5xl leading-none tracking-widest drop-shadow-md`}>
                  RU's
              </span>
              <span className={`${playfair.className} text-white text-2xl md:text-3xl font-bold italic leading-none tracking-wider mt-1`}>
                  Crab Lab
              </span>
          </div>

          <p className="text-[#a0a0a0] max-w-sm mt-5 text-sm md:text-base font-light leading-relaxed">
            {isBangla 
              ? "খাঁটি স্পাইসি সি-ফুডের আসল স্বাদ উপভোগ করুন। তাজা, প্রিমিয়াম এবং এক্সক্লুসিভ।"
              : "Experience the true taste of spicy seafood. Fresh, premium, and exclusive."}
          </p>
        </div>

        {/* Elegant Separator */}
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#E31B23]/50 to-transparent mb-10"></div>

        {/* --- 2. Contact Info --- */}
        <div className="flex flex-col items-center mb-12">
          <h3 className="text-white font-bold text-sm md:text-base mb-6 uppercase tracking-[0.2em]">
            {isBangla ? "যোগাযোগ" : "Contact Us"}
          </h3>
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-10">
            
            {/* Phone */}
            <a href="tel:+8801XXXXXXXXX" className="flex items-center gap-3 text-[#A0A0A0] hover:text-[#E31B23] transition-colors group">
              <div className="p-2.5 rounded-full bg-white/5 group-hover:bg-[#E31B23]/10 border border-white/5 group-hover:border-[#E31B23]/30 transition-all">
                <Phone size={18} />
              </div>
              <span className="font-mono text-sm tracking-wider">+880 1XXX-XXXXXX</span>
            </a>
            
            {/* Email */}
            <a href="mailto:hello@crabbites.com" className="flex items-center gap-3 text-[#A0A0A0] hover:text-[#E31B23] transition-colors group">
              <div className="p-2.5 rounded-full bg-white/5 group-hover:bg-[#E31B23]/10 border border-white/5 group-hover:border-[#E31B23]/30 transition-all">
                <Mail size={18} />
              </div>
              <span className="text-sm tracking-widest">hello@crabbites.com</span>
            </a>

          </div>
        </div>

        {/* --- 3. Social Links --- */}
        <div className="flex flex-col items-center mb-16">
          <h3 className="text-white font-bold text-sm md:text-base mb-6 uppercase tracking-[0.2em]">
            {isBangla ? "আমাদের সাথে যুক্ত থাকুন" : "Follow Us"}
          </h3>
          
          <div className="flex items-center gap-5">
            {/* Facebook */}
            <a href="#" className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:-translate-y-1 hover:bg-[#1877F2] hover:border-[#1877F2] hover:shadow-[0_10px_20px_rgba(24,119,242,0.4)] transition-all duration-300">
              <FaFacebookF size={20} />
            </a>
            
            {/* Instagram */}
            <a href="#" className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:-translate-y-1 hover:bg-[#E1306C] hover:border-[#E1306C] hover:shadow-[0_10px_20px_rgba(225,48,108,0.4)] transition-all duration-300">
              <FaInstagram size={20} />
            </a>

            {/* TikTok */}
            <a href="#" className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:-translate-y-1 hover:bg-[#00f2fe] hover:text-black hover:shadow-[0_10px_20px_rgba(0,242,254,0.4)] transition-all duration-300">
              <FaTiktok size={18} />
            </a>

            {/* YouTube */}
            <a href="#" className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:-translate-y-1 hover:bg-[#FF0000] hover:border-[#FF0000] hover:shadow-[0_10px_20px_rgba(255,0,0,0.4)] transition-all duration-300">
              <FaYoutube size={20} />
            </a>
          </div>
        </div>

        {/* --- 4. Copyright --- */}
        <div className="w-full pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-widest text-[#A0A0A0] uppercase">
          <p>
            © {new Date().getFullYear()} RU's Crab Lab. {isBangla ? "সর্বস্বত্ব সংরক্ষিত।" : "All rights reserved."}
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">{isBangla ? "শর্তাবলী" : "Terms"}</a>
            <a href="#" className="hover:text-white transition-colors">{isBangla ? "গোপনীয়তা নীতি" : "Privacy"}</a>
          </div>
        </div>

      </div>
    </footer>
  );
}