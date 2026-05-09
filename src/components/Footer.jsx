import { Phone, Mail } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

export default function Footer({ isBangla }) {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-16 pb-24 md:pb-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-20">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="text-3xl font-extrabold tracking-wider mb-4">
              <span className="text-white">RU's </span>
              <span className="text-[#E31B23]">Crab Lab</span>
            </div>
            <p className="text-[#A0A0A0] max-w-xs">
              {isBangla 
                ? "খাঁটি স্পাইসি সি-ফুডের আসল স্বাদ উপভোগ করুন। তাজা, প্রিমিয়াম এবং এক্সক্লুসিভ।"
                : "Experience the true taste of spicy seafood. Fresh, premium, and exclusive."}
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">
              {isBangla ? "যোগাযোগ" : "Contact Us"}
            </h3>
            <div className="space-y-4">
              <a href="tel:+8801XXXXXXXXX" className="flex items-center gap-3 text-[#A0A0A0] hover:text-[#E31B23] transition-colors">
                <Phone size={18} />
                <span>+880 1XXX-XXXXXX</span>
              </a>
              <a href="mailto:hello@crabbites.com" className="flex items-center gap-3 text-[#A0A0A0] hover:text-[#E31B23] transition-colors">
                <Mail size={18} />
                <span>hello@crabbites.com</span>
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">
              {isBangla ? "আমাদের সাথে যুক্ত থাকুন" : "Follow Us"}
            </h3>
            <div className="flex items-center gap-4">
              {/* Facebook */}
              <a href="#" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all duration-300">
                <FaFacebookF size={18} />
              </a>
              
              {/* Instagram */}
              <a href="#" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#E1306C] hover:border-[#E1306C] transition-all duration-300">
                <FaInstagram size={18} />
              </a>

              {/* TikTok */}
              <a href="#" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#00f2fe] hover:text-black transition-all duration-300">
                <FaTiktok size={16} />
              </a>

              {/* YouTube */}
              <a href="#" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#FF0000] hover:border-[#FF0000] transition-all duration-300">
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#A0A0A0] text-sm">
            © {new Date().getFullYear()} Crab Bites. {isBangla ? "সর্বস্বত্ব সংরক্ষিত।" : "All rights reserved."}
          </p>
          <div className="flex gap-6 text-sm text-[#A0A0A0]">
            <a href="#" className="hover:text-white transition-colors">{isBangla ? "শর্তাবলী" : "Terms"}</a>
            <a href="#" className="hover:text-white transition-colors">{isBangla ? "গোপনীয়তা নীতি" : "Privacy"}</a>
          </div>
        </div>

      </div>
    </footer>
  );
}