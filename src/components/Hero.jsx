import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight, Star, Flame } from "lucide-react";

export default function Hero({ isBangla }) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-20 pt-20 overflow-hidden">
      
      {/* Background Image with Dark Gradient Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=2000&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/90 via-[#080808]/60 to-[#080808]"></div>
        
        {/* Radial Glow Effect for extra attractiveness */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(227,27,35,0.15)_0%,transparent_60%)] pointer-events-none"></div>
      </div>
      
      {/* Floating Animated Stats Card (Left) */}
      <motion.div 
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute left-10 lg:left-20 top-1/3 hidden md:flex items-center gap-3 px-6 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl z-20 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
      >
        <div className="bg-yellow-500/20 p-2 rounded-full">
          <Star size={24} className="text-yellow-500 fill-yellow-500" />
        </div>
        <div className="text-left">
          <p className="text-white font-bold text-lg">4.9/5</p>
          <p className="text-[#A0A0A0] text-xs uppercase tracking-wider">{isBangla ? "ইউজার রেটিং" : "User Rating"}</p>
        </div>
      </motion.div>

      {/* Floating Animated Trending Card (Right) */}
      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute right-10 lg:right-20 bottom-1/3 hidden md:flex items-center gap-4 px-5 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl z-20 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
      >
        <div className="bg-[#E31B23]/20 p-3 rounded-full">
          <Flame size={24} className="text-[#E31B23]" />
        </div>
        <div className="text-left">
          <p className="text-[#A0A0A0] text-xs uppercase tracking-wider mb-0.5">{isBangla ? "ট্রেন্ডিং" : "Trending Now"}</p>
          <p className="text-white font-bold text-sm">Spicy Garlic Crab</p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-5xl z-10 flex flex-col items-center mt-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="px-6 py-2 mb-8 rounded-full border border-[#E31B23]/30 bg-[#E31B23]/10 backdrop-blur-md inline-flex items-center gap-2"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31B23] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E31B23]"></span>
          </span>
          <span className="text-[#E31B23] text-sm font-bold tracking-widest uppercase">
            {isBangla ? "১০০% তাজা সি-ফুড" : "100% Fresh Catch"}
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-8xl lg:text-[100px] font-extrabold leading-[1.1] tracking-tighter mb-6 text-white"
          style={{ textShadow: '0 20px 40px rgba(0,0,0,0.9)' }}
        >
          {isBangla ? "স্বাদে" : "CRAVE"}<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E31B23] via-[#ff4d54] to-[#E31B23] animate-gradient-x">
            {isBangla ? "আগুন" : "THE SPICE."}
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-2xl text-gray-300 mb-12 max-w-3xl font-light leading-relaxed"
        >
          {isBangla 
            ? "শহরের সেরা এবং সবচেয়ে স্পাইসি কাঁকড়া এখন আপনার দোরগোড়ায়। একটি প্রিমিয়াম সি-ফুড এক্সপেরিয়েন্সের জন্য প্রস্তুত হোন।" 
            : "The city's finest and spiciest crabs, cooked to absolute perfection. Prepare your tastebuds for a premium seafood experience."}
        </motion.p>

        {/* Dual Call to Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto"
        >
          <button className="group relative px-8 py-4 md:px-10 md:py-5 bg-[#E31B23] text-white font-bold text-lg md:text-xl rounded-2xl transition-all overflow-hidden shadow-[0_0_30px_rgba(227,27,35,0.4)] hover:shadow-[0_0_50px_rgba(227,27,35,0.6)] transform hover:-translate-y-1">
            <span className="relative z-10 flex items-center justify-center gap-3">
              <ShoppingBag size={22} className="group-hover:-rotate-12 transition-transform" />
              {isBangla ? "অর্ডার করুন" : "Order Now"} 
            </span>
          </button>
          
          <button className="group relative px-8 py-4 md:px-10 md:py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold text-lg md:text-xl rounded-2xl transition-all hover:bg-white/10 hover:border-white/20 transform hover:-translate-y-1">
            <span className="relative z-10 flex items-center justify-center gap-3">
              {isBangla ? "মেনু দেখুন" : "Explore Menu"} 
              <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
            </span>
          </button>
        </motion.div>
      </div>
      
      {/* Custom Keyframes for Gradient Animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}} />
    </section>
  );
}