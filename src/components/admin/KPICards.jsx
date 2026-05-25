"use client";
import { Wallet, Activity, BadgeCheck, Ban } from "lucide-react";

export default function KPICards({ stats }) {
  const kpiData = [
    { title: "Monthly Revenue", amount: `Tk ${stats.totalSalesMonth.toLocaleString()}`, icon: Wallet, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
    { title: "Today's Sales", amount: `Tk ${stats.totalSalesToday.toLocaleString()}`, icon: Activity, color: "text-green-600", bg: "bg-green-50", border: "border-green-100" },
    { title: "Completed Orders", amount: stats.completedCount.toString(), icon: BadgeCheck, color: "text-[#E31B23]", bg: "bg-red-50", border: "border-red-100" },
    { title: "Cancelled Orders", amount: stats.cancelledCount.toString(), icon: Ban, color: "text-gray-500", bg: "bg-gray-50", border: "border-gray-200" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((item, index) => {
        const Icon = item.icon;
        return (
          <div key={index} className="group bg-white p-6 rounded-[24px] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(227,27,35,0.06)] transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-[18px] flex items-center justify-center shrink-0 border ${item.bg} ${item.color} ${item.border} group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={26} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-1">{item.title}</p>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">{item.amount}</h3>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}