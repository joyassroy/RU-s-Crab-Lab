"use client";
import { useState, useEffect } from "react";
import { Loader2, Package, Clock, Flame, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Anton, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";

const anton = Anton({ subsets: ["latin"], weight: ["400"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"], style: ["italic"] });

const statusSteps = [
    { label: "Pending", icon: Clock, color: "bg-gray-500" },
    { label: "Preparing", icon: Package, color: "bg-blue-500" },
    { label: "Cooking", icon: Flame, color: "bg-orange-500" },
    { label: "Ready", icon: CheckCircle, color: "bg-green-500" }
];

export default function MyOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) return;
            try {
                const res = await fetch(`/api/orders?userId=${user.id}`);
                const data = await res.json();
                setOrders(data);
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchOrders();
    }, []);

    const getStatusIndex = (status) => {
        const s = status.toLowerCase();
        if (s === "pending") return 0;
        if (s === "preparing") return 1;
        if (s === "cooking") return 2;
        if (s === "ready") return 3;
        return 0;
    };

    if (loading) return <div className="min-h-screen bg-[#030303] flex items-center justify-center"><Loader2 className="animate-spin text-[#E31B23]" size={40} /></div>;

    return (
        <main className="min-h-screen bg-[#030303] text-white pt-32 pb-20 px-6">
           
            <div className="max-w-4xl mx-auto">
                <h1 className={`${anton.className} text-5xl uppercase tracking-wider mb-10`}>Track <span className="text-[#E31B23]">Orders</span></h1>

                {orders.length === 0 ? (
                    <p className="text-white/30 text-xl italic">No active orders found.</p>
                ) : (
                    <div className="space-y-12">
                        {orders.map((order) => {
                            const currentIndex = getStatusIndex(order.status);
                            return (
                                <div key={order._id} className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[32px] shadow-xl">
                                    <div className="flex justify-between items-start mb-8">
                                        <div>
                                            <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Order ID</p>
                                            <p className="font-mono text-sm">#{order._id.slice(-8).toUpperCase()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Total Paid</p>
                                            <p className="text-[#E31B23] font-bold text-xl">Tk {order.totalAmount}</p>
                                        </div>
                                    </div>

                                    {/* --- Progress Bar --- */}
                                    <div className="relative flex justify-between items-center mb-4">
                                        <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 z-0"></div>
                                        <div className="absolute top-1/2 left-0 h-1 bg-[#E31B23] -translate-y-1/2 z-0 transition-all duration-1000" style={{ width: `${(currentIndex / 3) * 100}%` }}></div>

                                        {statusSteps.map((step, idx) => {
                                            const Icon = step.icon;
                                            const isActive = idx <= currentIndex;
                                            return (
                                                <div key={idx} className="relative z-10 flex flex-col items-center">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-[#E31B23] shadow-[0_0_15px_rgba(227,27,35,0.5)]' : 'bg-[#1a1a1a] border border-white/10'}`}>
                                                        <Icon size={18} className={isActive ? 'text-white' : 'text-white/20'} />
                                                    </div>
                                                    <p className={`text-[10px] mt-2 font-bold uppercase tracking-tighter ${isActive ? 'text-white' : 'text-white/20'}`}>{step.label}</p>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-white/5">
                                        <p className="text-xs text-white/30 uppercase tracking-widest mb-4">Order Items</p>
                                        <div className="flex flex-wrap gap-4">
                                            {order.items.map((item, i) => (
                                                <div key={i} className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl">
                                                    <span className="text-[#E31B23] font-bold text-sm">{item.quantity}x</span>
                                                    <span className="text-sm font-medium">{item.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}