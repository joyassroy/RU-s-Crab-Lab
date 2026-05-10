"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Flame, Droplets, Zap, Loader2, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Playfair_Display, Anton } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700", "900"], style: ["italic"] });
const anton = Anton({ subsets: ["latin"], weight: ["400"] });

export default function Menu({ isBangla }) {
  const router = useRouter();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingToCartId, setAddingToCartId] = useState(null); 
  const [successToast, setSuccessToast] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/menu'); 
        const data = await res.json();
        if (data && data.length > 0) setMenuItems(data);
      } catch (error) {
        console.error("Failed to load:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (item) => {
    const userString = localStorage.getItem("user");
    if (!userString) {
        router.push('/login');
        return;
    }
    const user = JSON.parse(userString);
    setAddingToCartId(item._id);

    try {
        const res = await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                userId: user.id, 
                itemId: item._id,
                name: item.name,
                price: item.priceBDT,
                image: item.img,
                quantity: 1 
            })
        });
        if (res.ok) {
            setSuccessToast(isBangla ? item.descriptionBn?.split(" ")[0] || item.name : item.name);
            setTimeout(() => setSuccessToast(false), 3000);
        }
    } catch (error) {
        console.error(error);
    } finally {
        setAddingToCartId(null);
    }
  };

  if (loading) return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
          <Loader2 className="text-[#E31B23] animate-spin" size={40} />
          <p className="text-white/50 animate-pulse uppercase tracking-widest text-xs">Loading The Feast...</p>
      </div>
  );

  return (
    <section className="relative z-10 pt-20 pb-32">
        {/* Header Section */}
        <div className="text-center mb-24 px-6">
            <h3 className={`${playfair.className} text-[#E31B23] text-2xl italic mb-2`}>
                {isBangla ? "আমাদের বিশেষ আয়োজন" : "Discover the Taste"}
            </h3>
            <h1 className={`${anton.className} text-6xl md:text-8xl text-white uppercase tracking-wider`}>
                The <span className="text-[#E31B23]">Grand</span> Menu
            </h1>
        </div>

        {/* Menu Items List */}
        <div className="max-w-[1400px] mx-auto px-6 space-y-32">
            {menuItems.map((item, index) => (
                <motion.div 
                    key={item._id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`flex flex-col gap-10 items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                    {/* Image Section */}
                    <div className="w-full lg:w-1/2 relative group">
                        <div className="absolute inset-0 bg-[#E31B23]/5 blur-[60px] rounded-full"></div>
                        <div className="relative aspect-square max-h-[500px] rounded-[40px] bg-[#0a0a0a] border border-white/5 flex items-center justify-center p-8 overflow-hidden group-hover:border-[#E31B23]/20 transition-all duration-500">
                            <Image src={item.img} alt={item.name} fill className="object-contain p-10 group-hover:scale-105 transition-transform duration-700" />
                        </div>
                    </div>

                    {/* Text Section */}
                    <div className={`w-full lg:w-1/2 flex flex-col ${index % 2 === 0 ? 'lg:items-start' : 'lg:items-end'} items-center text-center lg:text-left`}>
                        <h2 className={`${anton.className} text-5xl md:text-7xl text-white uppercase leading-none mb-2`}>
                            {item.name.split(" ")[0]} <span className="text-[#E31B23]">{item.name.split(" ").slice(1).join(" ")}</span>
                        </h2>
                        <p className="text-white/60 text-lg md:text-xl max-w-md my-8 leading-relaxed">
                            {isBangla ? item.descriptionBn : item.description}
                        </p>

                        <div className="flex flex-row items-center gap-10">
                            <h3 className="text-[#E31B23] text-4xl md:text-5xl font-bold font-sans">Tk {item.priceBDT}</h3>
                            <button 
                                onClick={() => handleAddToCart(item)}
                                disabled={addingToCartId === item._id}
                                className="group flex items-center gap-4 bg-[#E31B23] hover:bg-[#c9161e] text-white px-8 py-3.5 rounded-full transition-all shadow-[0_10px_30px_rgba(227,27,35,0.3)] disabled:opacity-50"
                            >
                                <span className="font-bold uppercase text-sm">{addingToCartId === item._id ? "..." : "Add To Tray"}</span>
                                <div className="bg-[#050505] p-2 rounded-full"><Plus size={18} /></div>
                            </button>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* Success Toast */}
        <AnimatePresence>
            {successToast && (
                <motion.div initial={{ opacity: 0, y: 50, x: "-50%" }} animate={{ opacity: 1, y: 0, x: "-50%" }} exit={{ opacity: 0, y: 50, x: "-50%" }}
                    className="fixed bottom-10 left-1/2 z-[100] bg-[#0a0a0a] border border-[#22c55e] px-8 py-4 rounded-full shadow-2xl flex items-center gap-4"
                >
                    <CheckCircle2 className="text-[#22c55e]" size={20} />
                    <p className="text-white font-bold">{successToast} added!</p>
                </motion.div>
            )}
        </AnimatePresence>
    </section>
  );
}