import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import mongoose from "mongoose";

// --- 1. Order Schema ---
const orderSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  userPhone: String,
  items: Array,
  totalAmount: Number,
  status: { type: String, default: "pending" }, // pending, preparing, cooking, ready, served
  createdAt: { type: Date, default: Date.now }
});
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

// --- 2. Product Analytics Schema (Admin Panel এর জন্য) ---
const productStatSchema = new mongoose.Schema({
  itemId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  totalSold: { type: Number, default: 0 },
  totalRevenue: { type: Number, default: 0 }
});
const ProductStat = mongoose.models.ProductStat || mongoose.model("ProductStat", productStatSchema);

// 🟢 POST: নতুন অর্ডার প্লেস করার জন্য
export async function POST(req) {
  try {
    const body = await req.json();
    await connectToDatabase();
    const newOrder = await Order.create(body);
    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Order placement failed" }, { status: 500 });
  }
}

// 🔵 GET: অর্ডার ফেচ করার জন্য
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    await connectToDatabase();
    
    let orders;
    if (userId) {
      orders = await Order.find({ userId }).sort({ createdAt: -1 });
    } else {
      orders = await Order.find({}).sort({ createdAt: -1 });
    }
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch orders" }, { status: 500 });
  }
}

// 🟠 PUT: অর্ডারের স্ট্যাটাস আপডেট এবং Analytics সেভ
export async function PUT(req) {
  try {
    const { orderId, status } = await req.json();
    if (!orderId || !status) {
      return NextResponse.json({ message: "Missing data" }, { status: 400 });
    }

    await connectToDatabase();
    
    // ১. অর্ডারের স্ট্যাটাস আপডেট করা
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId, 
      { status: status }, 
      { new: true }
    );

    // ২. 🔴 ম্যাজিক লজিক: যদি স্ট্যাটাস "served" হয়, তবে প্রোডাক্ট স্ট্যাটস আপডেট হবে
    if (status === "served" && updatedOrder) {
      for (let item of updatedOrder.items) {
        // প্রতিটি আইটেমের জন্য totalSold এবং totalRevenue আপডেট হবে
        await ProductStat.findOneAndUpdate(
          { itemId: item.itemId || item._id }, // তোমার কার্ট আইটেমের আইডির উপর ভিত্তি করে
          { 
            $set: { name: item.name },
            $inc: { 
              totalSold: item.quantity, 
              totalRevenue: item.price * item.quantity 
            }
          },
          { upsert: true, new: true } // না থাকলে নতুন তৈরি করবে
        );
      }
    }

    return NextResponse.json({ success: true, order: updatedOrder }, { status: 200 });
  } catch (error) {
    console.error("Order PUT Error:", error);
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}