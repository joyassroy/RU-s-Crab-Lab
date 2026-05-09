"use client";
import { FlaskConical, Flame, UtensilsCrossed, Package, Heart, ArrowDown } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Playfair_Display, Great_Vibes } from "next/font/google";

// --- Premium Fonts Initialization ---
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  weight: ["600", "700"], 
  style: ["italic"] 
});

const greatVibes = Great_Vibes({ 
  subsets: ["latin"], 
  weight: ["400"] 
});

// কার্ডের ডাটা
const labFeatures = [
  {
    id: 1,
    title: "SIGNATURE SAUCES",
    icon: FlaskConical,
    img: "https://images.unsplash.com/photo-1615719413546-198b25453f85?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "FRESH & BOLD",
    icon: Flame,
    img: "https://i.postimg.cc/6qhWNw28/crabs1.avif",
  },
  {
    id: 3,
    title: "COOKED TO ORDER",
    icon: UtensilsCrossed,
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop", 
  },
  {
    id: 4,
    title: "LAB PACKED",
    icon: Package,
    img: "https://i.postimg.cc/hvnDwhjQ/crabs2.avif",
  },
  {
    id: 5,
    title: "MADE WITH LOVE",
    icon: Heart,
    img: "https://i.postimg.cc/PJMXkhpr/crabs3.avif",
  },
];

export default function TheLab() {
  return (
    <section className="relative w-full bg-[#030303] pt-20 pb-10 border-t border-white/5 overflow-hidden">
        
        {/* Soft Background Glow for consistency */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#E31B23]/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

        <div className="max-w-[1920px] mx-auto px-4 md:px-12 lg:px-24 relative z-10">
            
            {/* --- Main Content Split --- */}
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-stretch">
                
                {/* --- Left Side: Premium Text Area --- */}
                <div className="w-full lg:w-1/4 flex flex-col justify-center shrink-0 pt-4 lg:pt-0">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Cursive Subheading */}
                        <h3 className={`${greatVibes.className} text-[#E31B23] text-3xl md:text-4xl font-normal tracking-wide drop-shadow-md mb-2`}>
                            Behind the scenes
                        </h3>
                        
                        {/* Luxury Italic Main Heading */}
                        <h2 className={`${playfair.className} text-5xl md:text-6xl lg:text-7xl text-white font-bold italic tracking-wider mb-6`}>
                            The Lab.
                        </h2>
                        
                        {/* Elegant Thin Separator */}
                        <div className="w-20 h-[2px] bg-gradient-to-r from-[#E31B23] to-transparent mb-8"></div>

                        {/* Premium Paragraph */}
                        <p className="text-[#a0a0a0] text-sm md:text-base font-light leading-relaxed mb-8 max-w-sm">
                            Every dish is crafted in our lab with fresh seafood, signature sauces & a whole lot of madness.
                        </p>

                        {/* Highlighted Bold Text */}
                        <h3 className="text-[#E31B23] font-bold italic text-base md:text-lg uppercase tracking-[0.2em] leading-snug border-l-2 border-[#E31B23] pl-4 py-1">
                            NO SHORTCUTS. <br />
                            <span className="text-white">JUST FLAVOR.</span>
                        </h3>
                    </motion.div>
                </div>

                {/* --- Right Side: Mobile Snap Slider / Desktop Grid --- */}
                <div className="w-full lg:w-3/4 -mx-4 md:mx-0 px-4 md:px-0">
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        // Mobile: flex, overflow-x-auto, snap-x | Desktop: grid
                        className="flex lg:grid gap-4 overflow-x-auto lg:overflow-visible snap-x snap-mandatory hide-scrollbar lg:grid-cols-5 h-[380px] md:h-[450px] pb-4 lg:pb-0"
                    >
                        {labFeatures.map((feature, index) => (
                            <div 
                                key={feature.id} 
                                // snap-center ensures cards stop perfectly in the middle on mobile swipe
                                className="relative w-[260px] sm:w-[300px] lg:w-full h-full shrink-0 snap-center rounded-xl overflow-hidden group cursor-pointer border border-white/5 hover:border-[#E31B23]/50 transition-all duration-500 shadow-lg"
                            >
                                {/* Background Image */}
                                <Image 
                                    src={feature.img} 
                                    alt={feature.title} 
                                    fill 
                                    sizes="(max-width: 1024px) 300px, 20vw"
                                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                                />
                                
                                {/* Dark Gradient Overlay at the bottom */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* Icon and Text at the bottom */}
                                <div className="absolute bottom-6 w-full px-4 flex flex-col items-center justify-center gap-3 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="p-3 rounded-full bg-[#E31B23]/10 text-white/80 group-hover:text-white group-hover:bg-[#E31B23] backdrop-blur-md transition-all duration-500">
                                        <feature.icon size={22} strokeWidth={1.5} />
                                    </div>
                                    <p className="text-white text-[11px] md:text-xs font-bold tracking-[0.15em] uppercase text-center">
                                        {feature.title}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* --- Bottom Scroll Indicator --- */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-20 md:mt-28 flex flex-col items-center justify-center gap-4 relative"
            >
                {/* Subtle Divider Lines */}
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -z-10"></div>
                
                {/* Animated Rotating Crab Logo (Bigger & Round) */}
                <motion.div 
                    animate={{ rotate: [0, 360] }}
                    transition={{ 
                        duration: 1, 
                        repeat: Infinity, 
                        repeatDelay: 3, 
                        ease: "easeInOut" 
                    }}
                    className="relative z-10 bg-[#030303] p-1.5 rounded-full border border-[#E31B23]/30 shadow-[0_0_20px_rgba(227,27,35,0.2)] flex items-center justify-center"
                >
                    <Image 
                        src="/crab-logo.jpeg" 
                        alt="crab icon" 
                        width={50} 
                        height={50} 
                        className="rounded-full object-cover opacity-100" 
                    />
                </motion.div>

                <p className="text-white/60 text-xs md:text-sm font-light tracking-[0.3em] uppercase mt-4">
                    Scroll To Explore Our Menu
                </p>

                <motion.div 
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ArrowDown size={22} className="text-[#E31B23] opacity-80" strokeWidth={1.5} />
                </motion.div>

            </motion.div>
        </div>
    </section>
  );
}