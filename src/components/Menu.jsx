"use client";
import { useState, useEffect } from "react";
import { Plus, ArrowRight, ArrowLeft, Flame, Droplets, Zap, Loader2 } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Playfair_Display, Anton } from "next/font/google";

// --- Premium Fonts ---
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700", "900"], style: ["italic"] });
const anton = Anton({ subsets: ["latin"], weight: ["400"] });

export default function Menu({ isBangla }) {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPaused, setIsPaused] = useState(false); // স্লাইডার পজ করার জন্য নতুন স্টেট

  // --- ডাটাবেস ফেচ ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/menu'); 
        if (!res.ok) throw new Error("Failed to fetch");
        
        const data = await res.json();
        if (data && data.length > 0) {
            setMenuItems(data);
        }
      } catch (error) {
        console.error("Failed to load menu items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // --- Auto Slider (with Pause Functionality) ---
  useEffect(() => {
    // যদি আইটেম ১টার কম থাকে অথবা ইউজার হোল্ড করে রাখে (isPaused), তাহলে স্লাইড হবে না
    if (menuItems.length <= 1 || isPaused) return; 
    
    const slideInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev === menuItems.length - 1 ? 0 : prev + 1));
    }, 4000); 
    
    return () => clearInterval(slideInterval);
  }, [menuItems.length, isPaused]); // isPaused চেঞ্জ হলেও এফেক্ট রান করবে

  const handleNext = () => setCurrentIndex((prev) => (prev === menuItems.length - 1 ? 0 : prev + 1));
  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? menuItems.length - 1 : prev - 1));

  if (loading) {
      return (
          <div className="h-screen bg-[#050505] flex flex-col items-center justify-center gap-6">
              <div className="relative p-4 rounded-full bg-[#E31B23]/10">
                <Loader2 className="text-[#E31B23] animate-spin" size={48} />
              </div>
              <p className="text-white font-bold tracking-[0.2em] uppercase animate-pulse">Loading The Lab...</p>
          </div>
      );
  }

  const currentItem = menuItems[currentIndex];
  const nameParts = currentItem?.name.split(" ") || ["", ""];
  const titleWhite = nameParts[0];
  const titleRed = nameParts.slice(1).join(" ") || "";

  const getTagline = (category) => {
      if(category === "Crabs") return "CRUNCHY. SPICY. ADDICTIVE.";
      if(category === "Dips") return "RICH. CREAMY. SAVORY.";
      return "BOLD. PREMIUM. EXCLUSIVE.";
  };

  const flavors = [
    { name: "SPICY", icon: Flame },
    { name: "FRESH", icon: Droplets },
    { name: "BOLD", icon: Zap },
  ];

  return (
    <section className="relative w-full min-h-screen bg-[#050505] pt-24 md:pt-40 pb-16 overflow-hidden flex lg:items-center">
        
        {/* Background Subtle Smoke/Glow Effect */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#E31B23]/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

        {/* Desktop: onMouseEnter, onMouseLeave 
            Mobile: onTouchStart, onTouchEnd 
            এই ইভেন্টগুলোর মাধ্যমে ইউজার টাচ করলে বা হোভার করলে স্লাইডার থেমে যাবে।
        */}
        <div 
            className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 w-full relative z-10"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
        >
            
            {/* --- Desktop: Grid 2-Column Layout --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-20">
                
                {/* --- LEFT COLUMN: TEXT (Desktop: 5 Columns) --- */}
                <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
                    
                    {/* Item Number */}
                    <motion.h3 
                        key={`id-${currentIndex}`}
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className={`${playfair.className} text-[#E31B23] text-3xl lg:text-5xl font-black italic mb-2`}
                    >
                        {currentIndex < 9 ? `0${currentIndex + 1}` : currentIndex + 1}.
                    </motion.h3>

                    {/* Massive Title Stack */}
                    <motion.div 
                        key={`title-${currentIndex}`}
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col mb-6 lg:mb-10"
                    >
                        <h1 className={`${anton.className} text-5xl sm:text-7xl lg:text-[110px] text-white uppercase leading-[0.85] tracking-wide`}>
                            {titleWhite}
                        </h1>
                        <h1 className={`${anton.className} text-5xl sm:text-7xl lg:text-[110px] text-[#E31B23] uppercase leading-[0.85] tracking-wide transform lg:-rotate-2 -mt-1 lg:-mt-4 drop-shadow-[0_0_20px_rgba(227,27,35,0.4)]`}>
                            {titleRed}
                        </h1>
                    </motion.div>

                    {/* Tagline Box */}
                    <motion.div 
                        key={`tagline-${currentIndex}`}
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#E31B23] px-6 py-2 transform -skew-x-12 rounded-sm shadow-[0_5px_15px_rgba(227,27,35,0.4)] mb-8 lg:mb-12"
                    >
                        <p className="transform skew-x-12 text-[#050505] font-black tracking-widest text-xs lg:text-base uppercase">
                            {getTagline(currentItem?.category)}
                        </p>
                    </motion.div>

                    {/* Description */}
                    <motion.p 
                        key={`desc-${currentIndex}`}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-white/80 text-lg lg:text-xl font-medium max-w-md leading-relaxed mb-10 lg:mb-14"
                    >
                        {isBangla ? currentItem?.descriptionBn : currentItem?.description}
                    </motion.p>

                    {/* Flavor Profile */}
                    <div className="flex items-center gap-8 lg:gap-12 mb-10 lg:mb-14">
                        {flavors.map((flavor, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-3">
                                <flavor.icon className="text-[#E31B23] w-6 h-6 lg:w-8 lg:h-8" strokeWidth={1.5} />
                                <span className="text-white text-[10px] lg:text-xs font-bold tracking-widest uppercase">{flavor.name}</span>
                            </div>
                        ))}
                    </div>

                    {/* Price & Action */}
                    <div className="flex flex-row items-center justify-center lg:justify-start gap-4 sm:gap-8 lg:gap-12 w-full lg:w-auto">
                        
                        {/* Price (এক লাইনে রাখার জন্য shrink-0 এবং whitespace-nowrap) */}
                        <h2 className="text-[#E31B23] text-3xl sm:text-4xl lg:text-6xl font-bold font-sans whitespace-nowrap shrink-0">
                            Tk {currentItem?.priceBDT}
                        </h2>

                        {/* Button (মোবাইল ও ডেস্কটপ সবখানে এক লাইনে থাকবে) */}
                        <button 
                            onClick={() => setSelectedProduct(currentItem)}
                            className="group flex flex-row items-center justify-between gap-3 sm:gap-6 bg-[#E31B23] hover:bg-[#c9161e] text-white px-5 py-2.5 sm:px-8 sm:py-3.5 rounded-full transition-all duration-300 shadow-[0_10px_30px_rgba(227,27,35,0.3)] active:scale-95 shrink-0 whitespace-nowrap"
                        >
                            <span className="font-bold tracking-widest uppercase text-[11px] sm:text-sm lg:text-base">
                                Add To Tray
                            </span>
                            <div className="bg-[#050505] p-1.5 sm:p-2 rounded-full group-hover:rotate-90 transition-transform">
                                <Plus className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                        </button>
                    </div>
                </div>

                {/* --- RIGHT COLUMN: IMAGE & NAV (Desktop: 7 Columns) --- */}
                <div className="lg:col-span-7 relative flex justify-center items-center h-[40vh] lg:h-[700px] order-1 lg:order-2">
                    
                    {/* Main Food Image */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`img-${currentIndex}`}
                            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.6 }}
                            className="relative w-full h-full"
                        >
                            <Image 
                                src={currentItem?.img} alt={currentItem?.name}
                                fill className="object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.9)] z-10"
                                priority
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* --- DESKTOP NAVIGATION (Fixed Bottom-Right) --- */}
                    <div className="hidden lg:flex absolute bottom-0 right-0 z-30 flex-row items-center gap-8">
                        
                        {/* Prev Button */}
                        <div className="flex flex-col items-center gap-3 cursor-pointer group" onClick={handlePrev}>
                            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-[#050505]/80 backdrop-blur-md group-hover:border-[#E31B23] transition-all">
                                <ArrowLeft size={30} className="text-white/60 group-hover:text-[#E31B23] group-hover:-translate-x-1.5 transition-all" />
                            </div>
                            <span className="text-white/40 text-[10px] font-bold tracking-[0.3em] uppercase group-hover:text-[#E31B23] transition-colors">Prev</span>
                        </div>

                        {/* Next Button */}
                        <div className="flex flex-col items-center gap-3 cursor-pointer group" onClick={handleNext}>
                            <div className="w-16 h-16 rounded-full border border-[#E31B23]/70 flex items-center justify-center bg-[#050505]/90 backdrop-blur-md group-hover:bg-[#E31B23] transition-all">
                                <ArrowRight size={30} className="text-white group-hover:translate-x-1.5 transition-transform" />
                            </div>
                            <span className="text-white/80 text-[10px] font-bold tracking-[0.3em] uppercase group-hover:text-white transition-colors">Next Item</span>
                        </div>
                    </div>

                    {/* Mobile Only Navigation (Float on Image) */}
                    <div className="lg:hidden absolute inset-0 z-20 flex items-center justify-between px-2 pointer-events-none">
                        <button onClick={handlePrev} className="pointer-events-auto w-10 h-10 rounded-full bg-[#050505]/60 border border-white/10 flex items-center justify-center">
                            <ArrowLeft size={20} className="text-white" />
                        </button>
                        <button onClick={handleNext} className="pointer-events-auto w-10 h-10 rounded-full bg-[#E31B23]/80 flex items-center justify-center">
                            <ArrowRight size={20} className="text-white" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* --- Premium Modal --- */}
        <AnimatePresence>
          {selectedProduct && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
                  <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                      className="bg-[#0a0a0a] border border-[#E31B23]/30 p-8 rounded-[40px] w-full max-w-md relative flex flex-col items-center text-center"
                  >
                      <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 text-white/50 hover:text-[#E31B23] transition-colors">
                          <Plus size={32} className="rotate-45" />
                      </button>
                      <div className="relative w-40 h-40 mb-6 rounded-full overflow-hidden border-2 border-[#E31B23]">
                          <Image src={selectedProduct.img} alt={selectedProduct.name} fill className="object-cover" />
                      </div>
                      <h2 className={`${anton.className} text-4xl text-white mb-2 uppercase tracking-tight`}>
                        {selectedProduct.name.split(" ")[0]} <span className="text-[#E31B23]">{selectedProduct.name.split(" ").slice(1).join(" ")}</span>
                      </h2>
                      <h3 className="text-[#E31B23] text-2xl font-bold mb-6 font-sans whitespace-nowrap">Tk {selectedProduct.priceBDT}</h3>
                      <p className="text-white/60 mb-10 text-lg leading-relaxed">{isBangla ? selectedProduct.descriptionBn : selectedProduct.description}</p>
                      <button onClick={() => setSelectedProduct(null)} className="w-full bg-[#E31B23] py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#b31219] transition-all">Confirm Add To Tray</button>
                  </motion.div>
              </div>
          )}
        </AnimatePresence>
    </section>
  );
}