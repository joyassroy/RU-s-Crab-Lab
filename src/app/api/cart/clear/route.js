import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import mongoose from "mongoose";

// স্কিমা কল করা (যদি আগে থেকে থাকে)
const Cart = mongoose.models.Cart || mongoose.model("Cart", new mongoose.Schema({
  userId: String,
  itemId: String,
  name: String,
  price: Number,
  image: String,
  quantity: Number
}));

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    await connectToDatabase();
    
    // 🔴 ম্যাজিক লজিক: এই ইউজারের যত আইটেম কার্টে আছে, সব একসাথে ডিলিট করে দিবে!
    await Cart.deleteMany({ userId: userId });

    return NextResponse.json({ success: true, message: "Cart cleared successfully" }, { status: 200 });
  } catch (error) {
    console.error("Cart Clear Error:", error);
    return NextResponse.json({ message: "Failed to clear cart" }, { status: 500 });
  }
}