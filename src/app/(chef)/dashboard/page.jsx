"use client";
import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Clock, Flame, Package, ChevronRight, Loader2, Utensils, CheckCheck } from "lucide-react";
import { ChefContext } from "../layout"; 

const workflow = ["pending", "preparing", "cooking", "ready", "served"];

export default function ChefDashboardPage() {
  const { isBangla } = useContext(ChefContext); 
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [successToast, setSuccessToast] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders"); 
      if (res.ok) {
        const data = await res.json();
        // Served হয়ে গেলে আর লাইভ প্যানেলে দেখাবে না
        const activeOrders = data.filter(o => o.status !== "served");
        setOrders(activeOrders);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(); 
    const interval = setInterval(fetchOrders, 5000); 
    return () => clearInterval(interval);
  }, []);

  const handleUpdateStatus = async (orderId, currentStatus) => {
    const currentIndex = workflow.indexOf(currentStatus);
    if (currentIndex === -1 || currentIndex === workflow.length - 1) return;

    const nextStatus = workflow[currentIndex + 1];
    setUpdatingId(orderId);

    try {
      const res = await fetch("/api/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: nextStatus })
      });

      if (res.ok) {
        if (nextStatus === "served") {
          // Served হলে লিস্ট থেকে সরিয়ে দিব এবং স্পেশাল টোস্ট দেখাবো
          setOrders(prev => prev.filter(o => o._id !== orderId));
          setSuccessToast(isBangla ? "অর্ডার ডেলিভারড এবং ডাটা সেভ হয়েছে!" : "Order Delivered & Analytics Updated!");
        } else {
          setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: nextStatus } : o));
        }

        if (nextStatus === "ready") {
          setSuccessToast(isBangla ? "অর্ডার সার্ভ করার জন্য প্রস্তুত!" : "Order is Ready to Serve!");
        }
        setTimeout(() => setSuccessToast(null), 4000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingId(null);
    }
  };

  // --- Interactive Stepper Component ---
  const OrderStepper = ({ currentStatus }) => {
    const steps = [
      { id: "pending", icon: Clock, label: "Pending" },
      { id: "preparing", icon: Package, label: "Prep" },
      { id: "cooking", icon: Flame, label: "Cook" },
      { id: "ready", icon: CheckCircle2, label: "Ready" }
    ];
    
    const currentIndex = steps.findIndex(s => s.id === currentStatus);

    return (
      <div className="flex items-center w-full max-w-sm mx-auto md:mx-0">
        {steps.map((step, idx) => {
          const isActive = idx <= currentIndex;
          const isLast = idx === steps.length - 1;
          const Icon = step.icon;
          
          return (
            <div key={step.id} className="flex items-center flex-1 last:flex-none">
              <div className="relative flex flex-col items-center group">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 z-10 ${isActive ? 'bg-[#E31B23] text-white shadow-[0_0_10px_rgba(227,27,35,0.4)]' : 'bg-gray-100 text-gray-400 border border-gray-200'}`}>
                  <Icon size={14} />
                </div>
                <span className={`absolute -bottom-5 text-[9px] font-bold uppercase tracking-wider transition-colors ${isActive ? 'text-[#E31B23]' : 'text-gray-400'}`}>
                  {step.label}
                </span>
              </div>
              {!isLast && (
                <div className="flex-1 h-1 mx-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full bg-[#E31B23] transition-all duration-700 ${idx < currentIndex ? 'w-full' : 'w-0'}`}></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto">
      {loading ? (
        <div className="h-[70vh] flex items-center justify-center">
          <Loader2 className="animate-spin text-[#E31B23]" size={40} />
        </div>
      ) : orders.length === 0 ? (
        <div className="h-[70vh] flex flex-col items-center justify-center text-gray-400">
          <Utensils size={64} className="mb-4 text-gray-200" />
          <p className="text-xl font-medium">{isBangla ? "রান্নাঘরে কোনো অর্ডার নেই" : "Kitchen is clear. No active orders."}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <AnimatePresence>
            {orders.map((order) => (
              <motion.div 
                key={order._id} 
                layout 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-[24px] md:rounded-[32px] p-6 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(227,27,35,0.06)] transition-all flex flex-col xl:flex-row xl:items-center gap-8"
              >
                
                {/* 1. Customer & Order Info (Left) */}
                <div className="xl:w-1/4 flex flex-col shrink-0 border-b xl:border-b-0 xl:border-r border-gray-100 pb-6 xl:pb-0 xl:pr-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-[#E31B23] animate-pulse"></span>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </p>
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-1">{order.userName}</h3>
                  <p className="text-sm text-gray-500 font-mono mb-4">{order.userPhone}</p>
                  <div className="mt-auto">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Total Value</p>
                    <p className="text-[#E31B23] font-bold text-lg">Tk {order.totalAmount}</p>
                  </div>
                </div>

                {/* 2. Order Items (Middle) */}
                <div className="xl:w-2/4 flex-1">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-4">Ordered Items</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-gray-50/50 p-2.5 rounded-xl border border-gray-100">
                        <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-sm">
                          <span className="text-[#E31B23] font-black">{item.quantity}x</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-700 leading-tight">{item.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Workflow & Action (Right) */}
                <div className="xl:w-1/4 flex flex-col shrink-0 gap-8 justify-center pt-4 xl:pt-0 border-t xl:border-t-0 border-gray-100">
                  
                  <OrderStepper currentStatus={order.status} />

                  <button 
                    onClick={() => handleUpdateStatus(order._id, order.status)}
                    disabled={updatingId === order._id}
                    className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-lg
                      ${order.status === "ready" 
                        ? "bg-green-500 hover:bg-green-600 text-white shadow-green-500/30" 
                        : "bg-gray-900 hover:bg-[#E31B23] text-white shadow-gray-900/20 hover:shadow-[#E31B23]/30"
                      }
                    `}
                  >
                    {updatingId === order._id ? <Loader2 className="animate-spin" size={20} /> : (
                      <>
                        {order.status === "pending" && (isBangla ? "প্রস্তুতি শুরু করুন" : "Start Preparing")}
                        {order.status === "preparing" && (isBangla ? "রান্না শুরু করুন" : "Start Cooking")}
                        {order.status === "cooking" && (isBangla ? "সার্ভ করার জন্য প্রস্তুত" : "Mark as Ready")}
                        {order.status === "ready" && (
                          <>
                            <CheckCheck size={20} />
                            {isBangla ? "ডেলিভারি সম্পন্ন" : "Mark as Delivered"}
                          </>
                        )}
                        {order.status !== "ready" && <ChevronRight size={20} />}
                      </>
                    )}
                  </button>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* --- Premium Toast --- */}
      <AnimatePresence>
        {successToast && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-white border border-green-100 p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center gap-4 min-w-[320px]"
          >
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
              <CheckCircle2 className="text-green-500" size={24} />
            </div>
            <div>
              <h4 className="text-gray-900 font-bold text-sm">{successToast}</h4>
              <p className="text-gray-400 text-xs mt-0.5">Admin dashboard data updated.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}