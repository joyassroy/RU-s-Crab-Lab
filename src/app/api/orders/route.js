import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import mongoose from "mongoose";

// --- Order Schema ---
const orderSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  userPhone: String,
  items: Array,
  totalAmount: Number,
  status: { type: String, default: "pending" }, // pending, preparing, cooking, ready
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

// 🟢 POST: নতুন অর্ডার প্লেস করার জন্য (Cart পেজ থেকে আসবে)
export async function POST(req) {
  try {
    const body = await req.json();
    await connectToDatabase();
    
    const newOrder = await Order.create(body);

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error) {
    console.error("Order POST Error:", error);
    return NextResponse.json({ message: "Order placement failed" }, { status: 500 });
  }
}

// 🔵 GET: ইউজারের অর্ডারগুলো ফেচ করার জন্য (My Orders পেজ থেকে আসবে)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    await connectToDatabase();
    
    // ইউজারের সব অর্ডার লেটেস্ট অনুযায়ী (নতুনটা আগে) সর্ট করে নিয়ে আসবে
    const userOrders = await Order.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json(userOrders, { status: 200 });
  } catch (error) {
    console.error("Order GET Error:", error);
    return NextResponse.json({ message: "Failed to fetch orders" }, { status: 500 });
  }
}