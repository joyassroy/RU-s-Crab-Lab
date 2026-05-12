"use client";
import { CheckCircle2, Clock, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HistoryItem({ order }) {
  // তারিখ সুন্দর করে দেখানোর জন্য
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-100 rounded-2xl p-6 md:px-8 hover:shadow-lg hover:shadow-gray-200/50 transition-all group"
    >
      <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-6">
        
        {/* Order Info */}
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
              <CheckCircle2 className="text-green-500" size={24} />
           </div>
           <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">#{order._id.slice(-8).toUpperCase()}</p>
              <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-500 text-[9px] font-bold rounded uppercase mt-1">
                {order.status}
              </span>
           </div>
        </div>

        {/* Customer */}
        <div className="flex flex-col">
           <p className="font-bold text-gray-900">{order.userName}</p>
           <p className="text-xs text-gray-400">{order.userPhone}</p>
        </div>

        {/* Items Summary */}
        <div className="flex flex-wrap gap-2">
           {order.items.slice(0, 2).map((item, i) => (
             <span key={i} className="text-xs bg-gray-50 border border-gray-100 px-2 py-1 rounded-lg text-gray-600">
               {item.quantity}x {item.name}
             </span>
           ))}
           {order.items.length > 2 && (
             <span className="text-[10px] text-[#E31B23] font-bold">+{order.items.length - 2} more</span>
           )}
        </div>

        {/* Amount */}
        <div>
           <p className="text-sm font-bold text-gray-900">Tk {order.totalAmount}</p>
           <p className="text-[10px] text-gray-400 font-medium">Payment: Cash on Delivery</p>
        </div>

        {/* Date & Action */}
        <div className="flex items-center justify-between md:justify-end gap-4">
           <p className="text-xs text-gray-400 md:text-right">{formatDate(order.createdAt)}</p>
           <div className="p-2 rounded-full bg-gray-50 group-hover:bg-[#E31B23]/10 transition-colors">
              <ChevronRight className="text-gray-300 group-hover:text-[#E31B23] transition-colors" size={20} />
           </div>
        </div>

      </div>
    </motion.div>
  );
}