"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function RevenueChart({ chartData }) {
  return (
    <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] h-full flex flex-col">
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 tracking-tight">Revenue Overview</h2>
        <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Last 7 Days Performance</p>
      </div>
      
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 500 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 500 }} />
            <Tooltip 
              cursor={{ fill: '#f9fafb' }} 
              contentStyle={{ borderRadius: '16px', border: '1px solid #f3f4f6', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)' }} 
            />
            <Bar dataKey="sales" fill="#E31B23" radius={[8, 8, 8, 8]} barSize={36} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}