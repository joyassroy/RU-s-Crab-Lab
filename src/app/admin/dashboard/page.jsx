"use client";
import { useState } from "react";
import { DollarSign, ShoppingBag, XCircle, TrendingUp, Package } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// ডামি চার্ট ডাটা (পরে ডাটাবেস থেকে আসবে)
const salesData = [
  { name: "Mon", sales: 4000 }, { name: "Tue", sales: 3000 },
  { name: "Wed", sales: 5000 }, { name: "Thu", sales: 2780 },
  { name: "Fri", sales: 8900 }, { name: "Sat", sales: 10500 },
  { name: "Sun", sales: 7500 },
];

export default function AdminDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Overview Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Track your restaurant's performance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Sales (Month)" amount="Tk 1,24,500" icon={DollarSign} color="text-blue-600" bg="bg-blue-50" />
        <KPICard title="Today's Sales" amount="Tk 8,900" icon={TrendingUp} color="text-green-600" bg="bg-green-50" />
        <KPICard title="Completed Orders" amount="342" icon={ShoppingBag} color="text-[#E31B23]" bg="bg-red-50" />
        <KPICard title="Rejected/Cancelled" amount="12" icon={XCircle} color="text-gray-600" bg="bg-gray-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bar Chart Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Revenue Last 7 Days</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="sales" fill="#E31B23" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Package size={20} className="text-[#E31B23]" /> Top Selling Items
          </h2>
          <div className="space-y-4">
            <TopItem name="Spicy Crab Masala" orders="124" price="1,200" img="/crab-logo.jpeg" />
            <TopItem name="Garlic Butter Prawn" orders="98" price="850" img="/crab-logo.jpeg" />
            <TopItem name="Seafood Platter" orders="75" price="2,500" img="/crab-logo.jpeg" />
            <TopItem name="Crab Soup" orders="62" price="450" img="/crab-logo.jpeg" />
          </div>
        </div>
      </div>

    </div>
  );
}

// Helper Components
function KPICard({ title, amount, icon: Icon, color, bg }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`w-14 h-14 ${bg} ${color} rounded-full flex items-center justify-center shrink-0`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{amount}</h3>
      </div>
    </div>
  );
}

function TopItem({ name, orders, price, img }) {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
      <div className="flex items-center gap-3">
        <img src={img} alt={name} className="w-10 h-10 rounded-lg object-cover" />
        <div>
          <h4 className="text-sm font-bold text-gray-900">{name}</h4>
          <p className="text-xs text-gray-500">{orders} Orders</p>
        </div>
      </div>
      <p className="text-sm font-bold text-[#E31B23]">Tk {price}</p>
    </div>
  );
}