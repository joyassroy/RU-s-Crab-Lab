"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft, Search, Calendar, CheckCircle2, XCircle } from "lucide-react"; // 🔴 আইকন অ্যাড করা হলো
import { Anton, Inter } from "next/font/google";
import Navbar from "@/components/Navbar"; 
import HistoryItem from "@/components/HistoryItem";

const anton = Anton({ subsets: ["latin"], weight: ["400"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

export default function OrderHistoryPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // --- Security Verification ---
  useEffect(() => {
    const verifyChef = async () => {
      const userStr = localStorage.getItem("user");
      if (!userStr) { router.push("/login"); return; }
      
      const user = JSON.parse(userStr);
      try {
        const res = await fetch(`/api/auth/verify?id=${user.id}`);
        const data = await res.json();
        if (res.ok && (data.role === "chef" || data.role === "admin")) {
          setIsAuthorized(true);
        } else {
          router.push("/menu");
        }
      } catch (error) { router.push("/login"); }
    };
    verifyChef();
  }, [router]);

  // --- Fetch History Data ---
  useEffect(() => {
    if (!isAuthorized) return;
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        
        const historyData = data.filter(
          o => o.status === "ready" || o.status === "served" || o.status === "cancelled"
        );
        
        setOrders(historyData);
      } catch (error) { 
        console.error(error); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchHistory();
  }, [isAuthorized]);

  const filteredOrders = orders.filter(order => 
    order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order._id.includes(searchTerm)
  );

  // 🔴 অর্ডারগুলোকে ২ ভাগে ভাগ করা হচ্ছে
  const completedOrders = filteredOrders.filter(o => o.status === "ready" || o.status === "served");
  const cancelledOrders = filteredOrders.filter(o => o.status === "cancelled");

  if (!isAuthorized || loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#E31B23]" size={40} />
      </div>
    );
  }

  return (
    <main className={`min-h-screen bg-[#F8F9FA] pb-20 ${inter.className}`}>
      {/* Header Area */}
      <div className="bg-white border-b border-gray-100 pt-12 pb-8 px-6 md:px-12">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-[#E31B23] mb-6 transition-colors">
          <ArrowLeft size={20} /> <span>Back to Dashboard</span>
        </button>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h1 className={`${anton.className} text-4xl md:text-5xl text-gray-900 uppercase tracking-tight`}>
            Order <span className="text-[#E31B23]">History</span>
          </h1>

          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search by name or order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 py-3 pl-12 pr-4 rounded-xl focus:border-[#E31B23] outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* History Content */}
      <div className="max-w-7xl mx-auto px-6 mt-10">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
             <Calendar size={48} className="mx-auto text-gray-200 mb-4" />
             <p className="text-gray-400">No completed or cancelled orders found in the history.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            
            {/* 🟢 COMPLETED ORDERS SECTION */}
            {completedOrders.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-500" /> 
                  Successful Orders
                </h2>
                
                <div className="grid grid-cols-1 gap-4">
                  {/* Table Header */}
                  <div className="hidden md:grid grid-cols-5 px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-200">
                    <span>Order Info</span>
                    <span>Customer</span>
                    <span>Items</span>
                    <span>Total Amount</span>
                    <span className="text-right">Completion Date</span>
                  </div>

                  {completedOrders.map((order) => (
                    <HistoryItem key={order._id} order={order} />
                  ))}
                </div>
              </div>
            )}

            {/* 🔴 CANCELLED ORDERS SECTION */}
            {cancelledOrders.length > 0 && (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-red-500 flex items-center gap-2">
                    <XCircle size={18} /> 
                    Cancelled Orders
                  </h2>
                  <div className="flex-1 h-[1px] bg-red-100"></div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="hidden md:grid grid-cols-5 px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-red-300 border-b border-red-100">
                    <span>Order Info</span>
                    <span>Customer</span>
                    <span>Items</span>
                    <span>Total Amount</span>
                    <span className="text-right">Cancellation Date</span>
                  </div>

                  {cancelledOrders.map((order) => (
                    <HistoryItem key={order._id} order={order} />
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </main>
  );
}