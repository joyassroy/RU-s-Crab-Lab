"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Minus, Flame, Droplets, Zap, Loader2, CheckCircle2, ShoppingBag, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Playfair_Display, Anton } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700", "900"], style: ["italic"] });
const anton = Anton({ subsets: ["latin"], weight: ["400"] });

export default function Menu({ isBangla }) {
  const router = useRouter();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // States for Modal and Toast
  const [selectedItem, setSelectedItem] = useState(null); 
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(null);

  // --- ডাটাবেস থেকে মেনু ফেচ করা ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/menu'); 
        const data = await res.json();
        if (data && data.length > 0) setMenuItems(data);
      } catch (error) {
        console.error("Failed to load menu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // --- বাটন ক্লিক করলে মডাল ওপেন করার লজিক ---
  const handleOpenModal = (item) => {
    const userString = localStorage.getItem("user");
    if (!userString) {
        router.push('/login'); // লগিন না থাকলে রিডাইরেক্ট
        return;
    }
    setSelectedItem(item);
    setQuantity(1);
  };

  // --- ডাটাবেসে ফাইনাল অ্যাড করার লজিক ---
  const confirmAddToCart = async () => {
    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);
    
    setIsSubmitting(true);
    try {
        const res = await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                userId: user.id, 
                itemId: selectedItem._id,
                name: selectedItem.name,
                price: selectedItem.priceBDT,
                image: selectedItem.img,
                quantity: quantity 
            })
        });

        if (res.ok) {
            setShowSuccessToast(selectedItem.name);
            setSelectedItem(null); // মডাল ক্লোজ
            // ৩ সেকেন্ড পর অটোমেটিক টোস্ট ক্লোজ হবে
            setTimeout(() => setShowSuccessToast(null), 5000);
            window.dispatchEvent(new Event("cartUpdated"));
        }
    } catch (error) {
        console.error("Cart Error:", error);
    } finally {
        setIsSubmitting(false);
    }
  };

  if (loading) return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
          <Loader2 className="text-[#E31B23] animate-spin" size={40} />
          <p className="text-white/50 animate-pulse uppercase tracking-widest text-xs">Loading The Feast...</p>
      </div>
  );

  return (
    <section className="relative z-10 pt-10 pb-32">
        {/* Header Section */}
        <div className="text-center mb-24 px-6">
            <h3 className={`${playfair.className} text-[#E31B23] text-2xl italic mb-2`}>
                {isBangla ? "আমাদের বিশেষ আয়োজন" : "Discover the Taste"}
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
                                onClick={() => handleOpenModal(item)}
                                className="group flex items-center gap-4 bg-[#E31B23] hover:bg-[#c9161e] text-white px-8 py-3.5 rounded-full transition-all shadow-[0_10px_30px_rgba(227,27,35,0.3)]"
                            >
                                <span className="font-bold uppercase text-sm">{isBangla ? "ট্রেতে যোগ করুন" : "Add To Tray"}</span>
                                <div className="bg-[#050505] p-2 rounded-full"><Plus size={18} /></div>
                            </button>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* --- 1. QUANTITY SELECTION MODAL (Premium Look) --- */}
        <AnimatePresence>
            {selectedItem && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-[#0a0a0a] border border-[#E31B23]/30 p-8 rounded-[40px] w-full max-w-md relative flex flex-col items-center text-center"
                    >
                        <button onClick={() => setSelectedItem(null)} className="absolute top-6 right-6 text-white/50 hover:text-[#E31B23] transition-colors">
                            <X size={32} />
                        </button>

                        <div className="relative w-40 h-40 mb-6 bg-gradient-to-b from-[#E31B23]/20 to-transparent rounded-full p-4">
                            <Image src={selectedItem.img} alt={selectedItem.name} fill className="object-contain p-4" />
                        </div>

                        <h2 className={`${anton.className} text-3xl text-white mb-2 uppercase tracking-tight`}>
                            {selectedItem.name}
                        </h2>
                        
                        <p className="text-white/40 text-sm mb-8">{isBangla ? "পরিমাণ নির্বাচন করুন" : "Select Quantity"}</p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-8 mb-10">
                            <button 
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-[#E31B23] transition-colors text-white"
                            >
                                <Minus size={24} />
                            </button>
                            <span className={`${anton.className} text-5xl text-white w-12`}>{quantity}</span>
                            <button 
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-[#E31B23] transition-colors text-white"
                            >
                                <Plus size={24} />
                            </button>
                        </div>

                        <div className="w-full border-t border-white/10 pt-8 mb-8">
                            <div className="flex justify-between items-center px-4">
                                <span className="text-white/40 uppercase tracking-widest text-xs">Total Price</span>
                                <span className="text-[#E31B23] text-3xl font-bold">Tk {selectedItem.priceBDT * quantity}</span>
                            </div>
                        </div>

                        <button 
                            onClick={confirmAddToCart}
                            disabled={isSubmitting}
                            className="w-full bg-[#E31B23] py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#b31219] transition-all flex items-center justify-center gap-3 text-white"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : (
                                <>
                                    <ShoppingBag size={20} />
                                    {isBangla ? "নিশ্চিত করুন" : "Confirm To Tray"}
                                </>
                            )}
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

        {/* --- 2. INTERACTIVE SUCCESS TOAST (Premium Look) --- */}
        <AnimatePresence>
            {showSuccessToast && (
                <motion.div 
                    initial={{ opacity: 0, y: 100, x: "-50%" }} animate={{ opacity: 1, y: 0, x: "-50%" }} exit={{ opacity: 0, y: 100, x: "-50%" }}
                    className="fixed bottom-10 left-1/2 z-[200] w-[95%] max-w-xl bg-[#0a0a0a]/95 backdrop-blur-xl border border-[#22c55e]/30 p-6 rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col md:flex-row items-center justify-between gap-6"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#22c55e]/20 flex items-center justify-center">
                            <CheckCircle2 className="text-[#22c55e]" size={28} />
                        </div>
                        <div className="text-left">
                            <h4 className="text-white font-bold text-lg">
                                {isBangla ? "ট্রেতে যোগ করা হয়েছে!" : "Added to Tray!"}
                            </h4>
                            <p className="text-white/50 text-sm">{showSuccessToast} (x{quantity})</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button 
                            onClick={() => setShowSuccessToast(null)}
                            className="flex-1 md:flex-none px-6 py-3 rounded-full border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-all"
                        >
                            {isBangla ? "আরও দেখুন" : "Continue"}
                        </button>
                        <button 
                            onClick={() => router.push('/cart')}
                            className="flex-1 md:flex-none px-6 py-3 rounded-full bg-[#E31B23] text-white font-bold text-xs uppercase tracking-widest shadow-[0_10px_20px_rgba(227,27,35,0.3)] flex items-center justify-center gap-2"
                        >
                            {isBangla ? "কার্টে যান" : "Go to Tray"}
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </section>
  );
}