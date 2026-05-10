"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trash2, X, Loader2, CheckCircle2, ChevronRight, ShoppingCart, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Playfair_Display, Anton } from "next/font/google";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"], style: ["italic"] });
const anton = Anton({ subsets: ["latin"], weight: ["400"] });

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBangla, setIsBangla] = useState(false);
  
  // States for Deletion & Checkout
  const [itemToDelete, setItemToDelete] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // --- ডাটা লোড করা ---
  useEffect(() => {
    const fetchCart = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        router.push("/login");
        return;
      }
      try {
        const res = await fetch(`/api/cart?userId=${user.id}`);
        const data = await res.json();
        setCartItems(data);
      } catch (error) {
        console.error("Cart fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [router]);

  // --- কোয়ান্টিটি আপডেট করার লজিক (Optimistic UI) ---
  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return; // ১ এর নিচে নামতে দিবে না

    // ইনস্ট্যান্টলি ফ্রন্টএন্ডে আপডেট করা হচ্ছে যাতে ইউজার সাথে সাথে চেঞ্জ দেখতে পায়
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );

    try {
      // ব্যাকগ্রাউন্ডে ডাটাবেস আপডেট করা হচ্ছে
      await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: itemId, quantity: newQuantity })
      });
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Quantity update error:", error);
    }
  };

  // --- আইটেম ডিলিট করার লজিক ---
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/cart?id=${itemToDelete._id}`, { method: "DELETE" });
      if (res.ok) {
        setCartItems(cartItems.filter(item => item._id !== itemToDelete._id));
        setItemToDelete(null);
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // --- অর্ডার কনফার্ম করার লজিক ---
  const handleConfirmOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCheckoutLoading(true);
    try {
        const res = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: user.id,
                userName: user.name,
                userPhone: user.phone,
                items: cartItems,
                totalAmount: subtotal,
                status: "pending" // Initial state
            })
        });

        if (res.ok) {
            // ✅ ১. ডাটাবেস থেকে ইউজারের কার্ট ডিলিট করার কল
            await fetch(`/api/cart/clear?userId=${user.id}`, { method: "DELETE" });
            
            // ✅ ২. লোকাল স্টেট ক্লিয়ার
            setCartItems([]);
            setOrderSuccess(true);
            
            // ✅ ৩. ন্যাভবার ব্যাজ আপডেট
            window.dispatchEvent(new Event("cartUpdated"));
        }
    } catch (error) {
        console.error("Order error:", error);
    } finally {
        setCheckoutLoading(false);
    }
};

  // রিয়েল-টাইম সাবটোটাল ক্যালকুলেশন
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (loading) return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center">
      <Loader2 className="text-[#E31B23] animate-spin" size={48} />
    </div>
  );

  return (
    <main className="min-h-screen bg-[#030303] text-white pb-32">
      <Navbar isBangla={isBangla} setIsBangla={setIsBangla} />
      
      <div className="max-w-[1200px] mx-auto px-4 pt-32">
        <header className="mb-12 text-center md:text-left">
          <h1 className={`${anton.className} text-5xl md:text-7xl uppercase tracking-wider`}>
            Your <span className="text-[#E31B23]">Tray</span>
          </h1>
          <p className={`${playfair.className} text-white/40 text-lg italic mt-2`}>
            Review your selected masterpieces before the fire starts.
          </p>
        </header>

        {cartItems.length === 0 && !orderSuccess ? (
          <div className="flex flex-col items-center justify-center py-20 bg-[#0a0a0a] rounded-[40px] border border-white/5">
            <ShoppingCart size={64} className="text-white/10 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Your tray is empty</h3>
            <button onClick={() => router.push("/menu")} className="text-[#E31B23] font-bold uppercase tracking-widest flex items-center gap-2">
              Back to Menu <ChevronRight size={20} />
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* --- Cart Items List --- */}
            <div className="bg-[#0a0a0a]/50 backdrop-blur-xl rounded-[32px] border border-white/5 overflow-hidden">
              {cartItems.map((item) => (
                <div key={item._id} className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-6 md:p-8 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors relative">
                  
                  {/* Remove Button (Mobile: Top Right, Desktop: End) */}
                  <button 
                    onClick={() => setItemToDelete(item)} 
                    className="absolute top-4 right-4 md:relative md:top-auto md:right-auto md:order-last p-2 text-white/20 hover:text-[#E31B23] transition-colors"
                  >
                    <X size={24} />
                  </button>

                  <div className="flex items-center gap-4 md:gap-8 w-full">
                    {/* Image */}
                    <div className="relative w-20 h-20 md:w-24 md:h-24 bg-black rounded-2xl overflow-hidden border border-white/10 shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                    </div>
                    
                    {/* Info Row */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
                      <div className="max-w-[200px] md:max-w-xs">
                        <h3 className="font-bold text-lg md:text-xl uppercase tracking-wide truncate">{item.name}</h3>
                        <span className="text-[#E31B23] text-xs font-bold font-mono">Tk {item.price} / unit</span>
                      </div>

                      <div className="flex flex-row items-center justify-between md:justify-end gap-6 md:gap-12 w-full md:w-auto">
                        
                        {/* Dynamic Quantity Controls */}
                        <div className="flex flex-col items-start md:items-center">
                            <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-2">Qty</span>
                            <div className="flex items-center bg-white/5 rounded-full border border-white/10 p-1">
                                <button 
                                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#E31B23] transition-colors text-white/70 hover:text-white"
                                >
                                    <Minus size={14} />
                                </button>
                                
                                <span className={`${anton.className} w-10 text-center text-xl`}>
                                    {item.quantity}
                                </span>
                                
                                <button 
                                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#E31B23] transition-colors text-white/70 hover:text-white"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Individual Item Total */}
                        <div className="flex flex-col items-end min-w-[100px]">
                            <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-2">Total</span>
                            <span className="text-[#E31B23] text-2xl md:text-3xl font-bold font-sans">
                                Tk {item.price * item.quantity}
                            </span>
                        </div>

                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* --- Subtotal Section --- */}
            <div className="mt-12 bg-[#0a0a0a] p-8 md:p-12 rounded-[40px] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="w-full md:w-auto text-center md:text-left">
                <h4 className="text-white/40 uppercase tracking-[0.3em] text-xs font-bold mb-2">Total Payable Amount</h4>
                <div className="flex items-baseline justify-center md:justify-start gap-2">
                   <span className="text-white/40 text-xl font-bold uppercase">Tk</span>
                   <span className={`${anton.className} text-6xl md:text-8xl text-white`}>{subtotal}</span>
                </div>
              </div>

              <button 
                onClick={handleConfirmOrder}
                disabled={checkoutLoading || cartItems.length === 0}
                className="w-full md:w-auto px-12 py-5 bg-[#E31B23] hover:bg-[#c9161e] text-white font-bold uppercase tracking-[0.2em] rounded-full shadow-[0_20px_40px_rgba(227,27,35,0.3)] transition-all flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50"
              >
                {checkoutLoading ? <Loader2 className="animate-spin" /> : "Confirm Order"}
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* --- DELETE MODAL --- */}
      <AnimatePresence>
        {itemToDelete && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#0a0a0a] border border-white/10 p-10 rounded-[40px] max-w-sm w-full text-center">
              <div className="w-20 h-20 bg-[#E31B23]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trash2 className="text-[#E31B23]" size={32} />
              </div>
              <h2 className="text-2xl font-bold mb-2 uppercase tracking-tight">Are you sure?</h2>
              <p className="text-white/50 mb-8 leading-relaxed">Remove <span className="text-white font-bold">{itemToDelete.name}</span> from your tray?</p>
              <div className="flex gap-4">
                <button onClick={() => setItemToDelete(null)} className="flex-1 py-4 rounded-2xl border border-white/10 font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-colors">Cancel</button>
                <button onClick={handleDelete} className="flex-1 py-4 rounded-2xl bg-[#E31B23] font-bold uppercase tracking-widest text-xs hover:bg-[#c9161e] transition-colors">Remove</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- SUCCESS OVERLAY --- */}
      <AnimatePresence>
        {orderSuccess && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
             <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="max-w-md w-full text-center">
                <div className="w-24 h-24 bg-[#22c55e]/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(34,197,94,0.2)]">
                  <CheckCircle2 className="text-[#22c55e]" size={48} />
                </div>
                <h2 className={`${anton.className} text-5xl text-white uppercase tracking-wider mb-4`}>Fire Started!</h2>
                <p className={`${playfair.className} text-white/70 text-xl mb-10 italic`}>
                   Wait some time to cook for my chef. We will notify you once it's ready.
                </p>
                <button onClick={() => router.push("/")} className="px-10 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:bg-[#E31B23] hover:text-white transition-all">Back to Home</button>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <BottomNav isBangla={isBangla} setIsBangla={setIsBangla} />
    </main>
  );
}