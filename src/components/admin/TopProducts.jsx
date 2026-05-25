"use client";
import { Crown } from "lucide-react";

export default function TopProducts({ topProducts }) {
  return (
    <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">Top Sellers</h2>
          <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Most Ordered Items</p>
        </div>
        <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
          <Crown size={20} className="text-[#E31B23]" />
        </div>
      </div>

      <div className="space-y-5">
        {topProducts.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">No completed orders yet.</p>
        ) : (
          topProducts.map((item, index) => (
            <div key={item.id} className="flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src={item.img} alt={item.name} className="w-14 h-14 rounded-2xl object-cover shadow-sm group-hover:shadow-md transition-shadow" />
                  {index === 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#E31B23] text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white">
                      #1
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#E31B23] transition-colors line-clamp-1">{item.name}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">{item.orders} Orders completed</p>
                </div>
              </div>
              <p className="text-sm font-black text-gray-900 shrink-0 ml-2">Tk {item.revenue.toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}