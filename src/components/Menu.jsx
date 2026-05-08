import { useState } from "react";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Loader2, Star, Flame, Info } from "lucide-react";
import Image from "next/image";
import ProductModal from "./ProductModal"; 

// --- Mock Database with detailed Info & BDT Price ---
const mockDatabaseItems = [
  { _id: "1", name: "Premium Garlic Crab", nameBn: "প্রিমিয়াম গার্লিক কাঁকড়া", category: "Crabs", priceBDT: 1799, img: "/crab-1.jpeg", rating: 4.8, description: "গাজীপুরের সবচেয়ে বড় সাইজের তাজা কাঁকড়া, আমাদের সিক্রেট গার্লিক ও বাটার সসে রান্না করা। স্পাইসি লেভেল মিডিয়াম। ২ জনের জন্য পর্যাপ্ত।", descriptionEn: "Jumbo sized fresh crabs cooked in our secret garlic butter sauce. Medium spicy. Served for two." },
  { _id: "2", name: "Fiery Chili Crab", nameBn: "ফায়ারি চিলি কাঁকড়া", category: "Crabs", priceBDT: 1999, img: "/crab-2.jpeg", rating: 4.9, description: "ঝাল যারা পছন্দ করেন তাদের জন্য স্পেশাল। সিঙ্গাপুরি স্টাইলের ফায়ারি চিলি সসে রান্না করা বড় কাঁকড়া। এক প্লেটে ৪টি বড় পিস।", descriptionEn: "Special for spice lovers. Large crabs cooked in Singaporean style fiery chili sauce. 4 large pieces per plate." },
  { _id: "3", name: "Ocean Feast Platter", nameBn: "ওশান ফিস্ট প্লাটার", category: "Combos", priceBDT: 3499, img: "/combos-1.jpeg", rating: 4.7, description: "পুরো সি-ফুড প্লাটার: স্পাইসি কাঁকড়া, ভাজা স্কুইড rings, প্রন এবং বাটার রাইস। ৩-৪ জনের জন্য উপযুক্ত।", descriptionEn: "Complete Seafood Platter: Spicy Crab, Fried Squid Rings, Prawns & Butter Rice. Serves 3-4." },
  { _id: "4", name: "Crab King Burger", nameBn: "ক্র্যাব কিং বার্গার", category: "Burgers", priceBDT: 899, img: "/burger-1.jpeg", rating: 4.6, description: "কাঁকড়ার তাজা কিমা দিয়ে তৈরি শাহী প্যাটি, সাথে চিজ, লটুস এবং আমাদের স্পেশাল সস। গাজীপুরের সেরা বার্গার।", descriptionEn: "Juicy Patty made with fresh crab meat, cheese, lettuce & special sauce. Gazaipur's best burger." },
];

const categories = ["All", "Crabs", "Combos", "Burgers"];

// --- Helper function to format BDT in Bangla ---
const formatPrice = (price, isBangla) => {
  if (isBangla) {
    return price.toLocaleString('bn-BD') + ' ৳';
  }
  return 'Tk ' + price.toLocaleString('en-US');
};

// --- SWR Fetcher function ---
const fetcher = async () => {
  await new Promise(resolve => setTimeout(resolve, 800)); 
  return mockDatabaseItems;
};

// --- Framer Motion Animations Definitions ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 } 
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

export default function Menu({ isBangla }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null); 
  
  // --- SWR Implementation ---
  const { data: menuItems, error, isLoading } = useSWR('api/menu', fetcher, {
    revalidateOnFocus: false, 
    dedupingInterval: 60000 
  });

  if (error) return <div className="text-center text-[#E31B23] py-20">Error loading menu.</div>;

  const filteredItems = menuItems
    ? activeCategory === "All" 
      ? menuItems 
      : menuItems.filter(item => item.category === activeCategory)
    : [];

  return (
    <section id="menu" className="px-4 md:px-20 py-24 relative z-10 bg-[#080808]">
      
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(227,27,35,0.08)_0%,transparent_65%)] pointer-events-none"></div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6 relative z-10">
        <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter">
          {isBangla ? "আমাদের মেনু" : "Explore Menu"}
        </h2>
        
        {/* Category Tabs */}
        <div className="flex overflow-x-auto w-full md:w-auto pb-4 md:pb-0 gap-3 hide-scrollbar rounded-full p-2 bg-white/5 border border-white/5 backdrop-blur-md">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full whitespace-nowrap transition-all duration-300 font-bold text-sm ${
                activeCategory === cat 
                  ? "bg-[#E31B23] text-white font-medium shadow-[0_0_20px_rgba(227,27,35,0.5)] scale-105" 
                  : "text-[#A0A0A0] hover:text-white hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 min-h-[400px]">
          <Loader2 size={50} className="text-[#E31B23] animate-spin mb-4 opacity-70" />
          <p className="text-[#A0A0A0] font-bold text-lg animate-pulse">
            {isBangla ? "তাজা সি-ফুড লোড হচ্ছে..." : "Loading fresh catch..."}
          </p>
        </div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
        >
          <AnimatePresence>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <motion.div
                  layout
                  variants={cardVariants}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(227,27,35,0.15)" }}
                  key={item._id}
                  className="bg-[#111111] border border-white/5 p-5 rounded-[32px] group hover:border-[#E31B23]/40 transition-all duration-500 relative overflow-hidden flex flex-col h-full shadow-lg"
                >
                  
                  {/* Image Container */}
                  <div className="w-full h-60 rounded-2xl overflow-hidden mb-6 relative flex-shrink-0 cursor-pointer" onClick={() => setSelectedProduct(item)}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none transition-opacity duration-300 group-hover:opacity-100"></div>
                    
                    <Image 
                      src={item.img} 
                      alt={item.name} 
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full border border-yellow-500/30">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-white font-bold text-xs">{item.rating}</span>
                    </div>

                    {/* Details Info Icon */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                            <Info size={24} className="text-white" />
                        </div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="px-1 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-1.5">
                        <h3 className="text-2xl font-bold mb-1 text-white tracking-tight group-hover:text-[#E31B23] transition-colors cursor-pointer" onClick={() => setSelectedProduct(item)}>
                            {isBangla ? item.nameBn : item.name}
                        </h3>
                    </div>
                    
                    <p className="text-[#A0A0A0] text-sm mb-6 flex-grow leading-relaxed line-clamp-2">
                        {isBangla ? item.description : item.descriptionEn}
                    </p>

                    <div className="flex justify-between items-center mt-auto pt-3 border-t border-white/5">
                      <div className="flex flex-col">
                        <span className="text-sm text-[#A0A0A0] font-medium tracking-wide">
                            {isBangla ? "মূল্য" : "Price"}
                        </span>
                        <span className="text-3xl font-extrabold text-[#E31B23]">
                            {formatPrice(item.priceBDT, isBangla)}
                        </span>
                      </div>
                      
                      {/* Plus Button Updated Here */}
                      <button 
                        onClick={() => setSelectedProduct(item)} // এখানে ক্লিক ইভেন্ট অ্যাড করা হয়েছে
                        className="p-4 bg-[#E31B23]/10 hover:bg-[#E31B23] rounded-3xl border border-[#E31B23]/30 hover:border-[#E31B23] transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(227,27,35,0.4)]"
                      >
                        <Plus size={24} className="text-white group-hover:scale-110" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-20 flex flex-col items-center gap-4 bg-white/5 rounded-3xl border border-white/5"
              >
                <Flame size={40} className="text-gray-600" />
                <p className="text-[#A0A0A0] text-lg font-bold">
                  {isBangla ? "এই ক্যাটাগরিতে কোনো আইটেম পাওয়া যায়নি।" : "No items found in this category."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* --- Product Detail Modal --- */}
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        isBangla={isBangla} 
        formatPrice={formatPrice}
      />

    </section>
  );
}