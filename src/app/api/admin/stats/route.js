import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Order from "@/models/Order"; // তোমার Order মডেল

export async function GET() {
  try {
    await connectToDatabase();
    
    // ডাটাবেস থেকে সব অর্ডার তুলে আনা হচ্ছে
    const orders = await Order.find({});

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    let totalSalesMonth = 0;
    let totalSalesToday = 0;
    let completedCount = 0;
    let cancelledCount = 0;

    // গত ৭ দিনের চার্টের জন্য ডামি স্ট্রাকচার তৈরি
    const last7DaysMap = {};
    for(let i = 6; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        last7DaysMap[d.toLocaleDateString('en-US', {weekday: 'short'})] = 0;
    }

    const itemSales = {};

    // 🔴 আসল ক্যালকুলেশন শুরু
    orders.forEach(order => {
      const orderDate = new Date(order.createdAt);
      const amount = Number(order.totalAmount) || 0;

      if (order.status === 'cancelled') {
          cancelledCount++;
      }

      if (order.status === 'served') {
          completedCount++;

          // আজকের সেলস
          if (orderDate >= todayStart) totalSalesToday += amount;
          
          // এই মাসের সেলস
          if (orderDate >= monthStart) totalSalesMonth += amount;

          // গত ৭ দিনের গ্রাফের হিসাব
          const diffTime = Math.abs(now - orderDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          if (diffDays <= 7) {
              const dayName = orderDate.toLocaleDateString('en-US', {weekday: 'short'});
              if (last7DaysMap[dayName] !== undefined) {
                  last7DaysMap[dayName] += amount;
              }
          }

          // টপ সেলিং প্রোডাক্টের হিসাব
          order.items.forEach(item => {
              if (!itemSales[item.name]) {
                  itemSales[item.name] = { 
                    id: item.name, 
                    name: item.name, 
                    orders: 0, 
                    revenue: 0, 
                    img: '/crab-logo.jpeg' // ডিফল্ট ইমেজ
                  };
              }
              itemSales[item.name].orders += Number(item.quantity);
              // যদি ডাটাবেসে প্রাইস থাকে, সেটা দিয়ে গুণ হবে। না থাকলে শুধু অর্ডার কাউন্ট হবে
              const itemPrice = item.price ? Number(item.price) : (amount / Number(item.quantity)); 
              itemSales[item.name].revenue += itemPrice * Number(item.quantity);
          });
      }
    });

    // চার্টের জন্য ডাটা ফরম্যাট করা
    const chartData = Object.keys(last7DaysMap).map(key => ({
        name: key,
        sales: last7DaysMap[key]
    }));

    // সবচেয়ে বেশি বিক্রি হওয়া ৪টা আইটেম ফিল্টার করা
    const topProducts = Object.values(itemSales)
      .sort((a, b) => b.orders - a.orders)
      .slice(0, 4);

    return NextResponse.json({
        success: true,
        stats: {
          totalSalesMonth,
          totalSalesToday,
          completedCount,
          cancelledCount,
          chartData,
          topProducts
        }
    }, { status: 200 });

  } catch (error) {
    console.error("Stats Error:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch stats" }, { status: 500 });
  }
}