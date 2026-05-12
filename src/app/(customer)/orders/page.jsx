"use client";
import { useState, useEffect } from "react";
import { Loader2, Package, Clock, Flame, CheckCircle, CheckCheck, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Anton, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";

const anton = Anton({ subsets: ["latin"], weight: ["400"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"], style: ["italic"] });

const statusSteps = [
    { label: "Pending", icon: Clock },
    { label: "Preparing", icon: Package },
    { label: "Cooking", icon: Flame },
    { label: "Ready", icon: CheckCircle }
];

export default function MyOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        const userStr = localStorage.getItem("user");
        if (!userStr) return;
        const user = JSON.parse(userStr);
        try {
            const res = await fetch(`/api/orders?userId=${user.id}`);
            const data = await res.json();
            setOrders(data);
        } catch (err) { 
            console.error(err); 
        } finally { 
            setLoading(false); 
        }
    };

    // --- রিয়েল-টাইম আপডেট (Polling) ---
    useEffect(() => {
        fetchOrders();
        // প্রতি ৫ সেকেন্ডে ব্যাকগ্রাউন্ডে অর্ডার ফেচ হবে যাতে প্রগ্রেস বার অটো আপডেট হয়
        const interval = setInterval(fetchOrders, 5000);
        return () => clearInterval(interval);
    }, []);

    const getStatusIndex = (status) => {
        const s = status.toLowerCase();
        if (s === "pending") return 0;
        if (s === "preparing") return 1;
        if (s === "cooking") return 2;
        if (s === "ready") return 3;
        return 0;
    };

    // অর্ডারগুলোকে ২ ভাগে ভাগ করা হচ্ছে: লাইভ এবং কমপ্লিট
    const activeOrders = orders.filter(o => o.status !== "served");
    const completedOrders = orders.filter(o => o.status === "served");

    if (loading) return (
        <div className="min-h-screen bg-[#030303] flex items-center justify-center">
            <Loader2 className="animate-spin text-[#E31B23]" size={40} />
        </div>
    );

    return (
        <main className="min-h-screen bg-[#030303] text-white pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                
                <h1 className={`${anton.className} text-5xl uppercase tracking-wider mb-2`}>
                    Track <span className="text-[#E31B23]">Orders</span>
                </h1>
                <p className={`${playfair.className} text-white/40 italic mb-10`}>Watch the fire turning into your meal...</p>

                {orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-[#0a0a0a] rounded-[40px] border border-white/5">
                        <ShoppingBag size={64} className="text-white/10 mb-6" />
                        <h3 className="text-2xl font-bold mb-4">No orders found</h3>
                        <p className="text-white/40">You haven't placed any orders yet.</p>
                    </div>
                ) : (
                    <div className="space-y-16">
                        
                        {/* --- 🔴 ACTIVE ORDERS SECTION --- */}
                        {activeOrders.length > 0 && (
                            <div className="space-y-8">
                                <h2 className="text-sm uppercase font-bold tracking-[0.3em] text-[#E31B23] flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-[#E31B23] animate-pulse"></span>
                                    Live Kitchen
                                </h2>
                                
                                <AnimatePresence>
                                    {activeOrders.map((order) => {
                                        const currentIndex = getStatusIndex(order.status);
                                        return (
                                            <motion.div 
                                                layout
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                key={order._id} 
                                                className="bg-[#0a0a0a] border border-white/10 p-8 rounded-[32px] shadow-[0_10px_30px_rgba(227,27,35,0.05)] relative overflow-hidden"
                                            >
                                                {/* Ambient Glow for Active Orders */}
                                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#E31B23]/5 blur-[80px] rounded-full pointer-events-none"></div>

                                                <div className="flex justify-between items-start mb-10 relative z-10">
                                                    <div>
                                                        <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Order ID</p>
                                                        <p className="font-mono text-sm">#{order._id.slice(-8).toUpperCase()}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Total Paid</p>
                                                        <p className="text-[#E31B23] font-bold text-2xl font-sans">Tk {order.totalAmount}</p>
                                                    </div>
                                                </div>

                                                {/* --- Progress Bar --- */}
                                                <div className="relative flex justify-between items-center mb-6 z-10">
                                                    <div className="absolute top-1/2 left-0 w-full h-1.5 bg-white/5 -translate-y-1/2 rounded-full"></div>
                                                    <div className="absolute top-1/2 left-0 h-1.5 bg-gradient-to-r from-[#E31B23] to-[#ff4d4d] -translate-y-1/2 transition-all duration-1000 ease-out rounded-full shadow-[0_0_15px_rgba(227,27,35,0.5)]" style={{ width: `${(currentIndex / 3) * 100}%` }}></div>

                                                    {statusSteps.map((step, idx) => {
                                                        const Icon = step.icon;
                                                        const isActive = idx <= currentIndex;
                                                        return (
                                                            <div key={idx} className="relative z-10 flex flex-col items-center">
                                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-700 ${isActive ? 'bg-[#E31B23] text-white shadow-[0_0_20px_rgba(227,27,35,0.4)] scale-110' : 'bg-[#111] text-white/20 border border-white/5'}`}>
                                                                    <Icon size={20} />
                                                                </div>
                                                                <p className={`absolute -bottom-6 text-[10px] font-bold uppercase tracking-widest transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/20'}`}>
                                                                    {step.label}
                                                                </p>
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                <div className="mt-12 pt-6 border-t border-white/5 relative z-10">
                                                    <p className="text-xs text-white/30 uppercase tracking-widest mb-4">Ordered Items</p>
                                                    <div className="flex flex-wrap gap-3">
                                                        {order.items.map((item, i) => (
                                                            <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                                                                <span className="text-[#E31B23] font-bold text-sm">{item.quantity}x</span>
                                                                <span className="text-sm font-medium text-white/80">{item.name}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            </div>
                        )}

                        {/* --- 🟢 COMPLETED ORDERS SECTION --- */}
                        {completedOrders.length > 0 && (
                            <div className="space-y-6">
                                <h2 className="text-sm uppercase font-bold tracking-[0.3em] text-white/30 flex items-center gap-3 pt-6 border-t border-white/5">
                                    <CheckCheck size={16} />
                                    Past Orders
                                </h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <AnimatePresence>
                                        {completedOrders.map((order) => (
                                            <motion.div 
                                                layout
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                key={order._id} 
                                                className="bg-[#050505] border border-white/5 p-6 rounded-[24px] opacity-80 hover:opacity-100 transition-opacity"
                                            >
                                                <div className="flex justify-between items-center mb-6">
                                                    <div>
                                                        <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">Order #{order._id.slice(-6).toUpperCase()}</p>
                                                        <p className="text-white/60 font-medium text-sm">
                                                            {new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-col items-end">
                                                        <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] uppercase font-bold tracking-widest rounded-full flex items-center gap-1">
                                                            <CheckCheck size={12} /> Served
                                                        </span>
                                                        <p className="text-white font-bold mt-2">Tk {order.totalAmount}</p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-2">
                                                    {order.items.slice(0, 3).map((item, i) => (
                                                        <span key={i} className="text-xs text-white/50 bg-white/5 px-2 py-1 rounded-md">
                                                            {item.quantity}x {item.name}
                                                        </span>
                                                    ))}
                                                    {order.items.length > 3 && (
                                                        <span className="text-xs text-[#E31B23] font-bold py-1">+{order.items.length - 3} more</span>
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        )}

                    </div>
                )}
            </div>
        </main>
    );
}