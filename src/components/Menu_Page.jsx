import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Loader2 } from "lucide-react";
import Image from "next/image";

// এই ডেটাগুলো পরে আমাদের MongoDB থেকে আসবে
const mockDatabaseItems = [
  { _id: "1", name: "Spicy Garlic Crab", nameBn: "স্পাইসি গার্লিক কাঁকড়া", category: "Crabs", price: "$14.99", img: "https://images.unsplash.com/photo-1544681280-d2dc1e63a355?q=80&w=500&auto=format&fit=crop" },
  { _id: "2", name: "Crispy Crab Claws", nameBn: "ক্রিস্পি ক্র্যাব ক্লজ", category: "Crabs", price: "$12.99", img: "https://images.unsplash.com/photo-1621509935100-349079a831e5?q=80&w=500&auto=format&fit=crop" },
  { _id: "3", name: "Seafood Platter", nameBn: "সি-ফুড প্লাটার", category: "Combos", price: "$24.49", img: "https://images.unsplash.com/photo-1559742811-822873691df8?q=80&w=500&auto=format&fit=crop" },
  { _id: "4", name: "Crab Cake Burger", nameBn: "ক্র্যাব কেক বার্গার", category: "Burgers", price: "$10.99", img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=500&auto=format&fit=crop" },
];

const categories = ["All", "Crabs", "Combos", "Burgers", "Drinks"];

export default function Menu({ isBangla }) {
  const [activeCategory, setActiveCategory] = useState("All");
  
  // ডেটাবেস থেকে আসা ডেটা এবং লোডিং স্টেট ম্যানেজ করার জন্য
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock API Call (Simulating MongoDB Fetch)
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setIsLoading(true);
        // এখানে আমরা ২ সেকেন্ডের একটি ডিলে দিচ্ছি ডেটাবেস ফেচিং বোঝানোর জন্য
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // পরে এখানে fetch('/api/menu') ব্যবহার করব
        setMenuItems(mockDatabaseItems);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  const filteredItems = activeCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section className="px-4 md:px-20 py-24 relative z-10 bg-[#080808]">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <h2 className="text-3xl md:text-5xl font-bold text-white">
          {isBangla ? "আমাদের মেনু" : "Explore Menu"}
        </h2>
        
        <div className="flex overflow-x-auto w-full md:w-auto pb-4 md:pb-0 gap-3 hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat 
                  ? "bg-[#E31B23] text-white font-medium shadow-[0_0_15px_rgba(227,27,35,0.4)]" 
                  : "bg-white/5 border border-white/5 text-[#A0A0A0] hover:text-white hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State or Data Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 size={48} className="text-[#E31B23] animate-spin mb-4" />
          <p className="text-[#A0A0A0] font-medium">
            {isBangla ? "তাজা মেনু লোড হচ্ছে..." : "Loading fresh catch..."}
          </p>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={item._id} // MongoDB এর ডিফল্ট আইডি _id হয়
                  className="bg-white/5 border border-white/5 p-4 rounded-[32px] group hover:border-[#E31B23]/50 transition-colors duration-500 relative overflow-hidden flex flex-col h-full"
                >
                  <div className="w-full h-56 rounded-2xl overflow-hidden mb-5 relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none"></div>
                    <Image 
                      src={item.img} 
                      alt={item.name} 
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="px-2 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-1 text-white">{isBangla ? item.nameBn : item.name}</h3>
                    <p className="text-[#A0A0A0] text-sm mb-5 flex-grow">Fresh catching recipe</p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-2xl font-bold text-[#E31B23]">{item.price}</span>
                      <button className="p-3 bg-white/5 hover:bg-[#E31B23] rounded-full border border-white/10 transition-all duration-300">
                        <Plus size={20} className="text-white" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              // যদি কোনো ক্যাটাগরিতে খাবার না থাকে
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <p className="text-[#A0A0A0] text-lg">
                  {isBangla ? "এই ক্যাটাগরিতে কোনো আইটেম পাওয়া যায়নি।" : "No items found in this category."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}