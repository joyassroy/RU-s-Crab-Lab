"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Playfair_Display, Great_Vibes } from "next/font/google";

// --- Premium Fonts Initialization ---
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  weight: ["400", "600", "700"], 
  style: ["normal", "italic"] 
});

const greatVibes = Great_Vibes({ 
  subsets: ["latin"], 
  weight: ["400"] 
});

export default function Hero() {
  // Graceful & Slow Animations for Premium Feel
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } 
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-[#030303] flex items-center pt-28 pb-10 overflow-hidden px-6 md:px-12 lg:px-24">
        
        {/* Soft Luxury Red Glow */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[700px] h-[700px] bg-[#E31B23]/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-[1920px] mx-auto gap-12 relative z-10">
            
            {/* --- LEFT CONTENT (Luxury Typography) --- */}
            <div className="w-full md:w-1/2 flex flex-col pt-10 md:pt-0 z-20">
                
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col"
                >
                    {/* Small Pechano (Cursive) Premium Text */}
                    <motion.div variants={itemVariants} className="mb-4">
                        <h3 className={`${greatVibes.className} text-[#E31B23] text-4xl md:text-5xl font-normal tracking-wide drop-shadow-md`}>
                            Dhaka's finest
                        </h3>
                    </motion.div>
                    
                    {/* MASSIVE LUXURY ITALIC HEADLINE */}
                    <div className="flex flex-col mb-8">
                        <motion.h1 variants={itemVariants} className={`${playfair.className} text-6xl sm:text-7xl md:text-[90px] lg:text-[110px] text-white leading-[1.1] tracking-tight italic font-semibold`}>
                            Crave the
                        </motion.h1>
                        <motion.h1 variants={itemVariants} className={`${playfair.className} text-6xl sm:text-7xl md:text-[90px] lg:text-[110px] text-[#E31B23] leading-[1.1] tracking-tight italic font-bold drop-shadow-[0_0_15px_rgba(227,27,35,0.4)]`}>
                            Spice.
                        </motion.h1>
                    </div>

                    {/* Elegant Thin Separator */}
                    <motion.div variants={itemVariants} className="w-24 h-[2px] bg-gradient-to-r from-[#E31B23] to-transparent mb-8"></motion.div>
                    
                    {/* SUB-HEADLINE (Clean & Elegant) */}
                    <motion.h2 variants={itemVariants} className="text-lg md:text-xl font-light tracking-[0.2em] uppercase mb-4 text-white/90">
                        <span className="font-bold text-[#E31B23]">Spiciest</span> Crab Experience
                    </motion.h2>

                    {/* PARAGRAPH */}
                    <motion.p variants={itemVariants} className="text-[#a0a0a0] text-base md:text-lg font-light mb-12 max-w-md leading-relaxed tracking-wide">
                        Bold flavors meets fresh ingredients. <br />
                        Crafted for late nights and unforgettable moments.
                    </motion.p>

                    {/* PREMIUM BUTTON (Minimalist Outline) */}
                     {/* <motion.div variants={itemVariants}>
                        <button className="relative group px-10 py-4 rounded-full border border-[#E31B23]/50 text-white font-light tracking-[0.15em] uppercase overflow-hidden hover:border-[#E31B23] hover:shadow-[0_0_30px_rgba(227,27,35,0.2)] transition-all duration-500 bg-[#E31B23]/5 backdrop-blur-sm">
                            
                            <div className="absolute inset-0 bg-[#E31B23] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></div> 
                            
                           <span className="relative z-10 flex items-center gap-4">
                                Explore The Menu
                                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                            </span> 
                        </button>
                    </motion.div>  */}
               </motion.div> 
             </div>

            {/* --- RIGHT CONTENT (Floating Image Area) --- */}
            <div className="w-full md:w-1/2 relative h-[450px] md:h-[600px] lg:h-[700px] flex justify-center items-center">
                
                {/* Slow, Elegant Float Animation */}
                <motion.div
                    animate={{ y: [0, -15, 0], rotate: [0, 1, -1, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-full h-full"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] h-[65%] bg-[#E31B23]/15 blur-[90px] rounded-full z-0"></div>
                    
                    <Image 
                        src="https://i.postimg.cc/rsCj9RBK/1daa2d1d-d2a7-49a7-942c-54c7967f7630.jpg" 
                        alt="Premium Spicy Crab"
                        fill
                        className="object-contain relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </motion.div>
            </div>

        </div>
    </section>
  );
}