import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import mongoose from "mongoose";

// --- User Schema ---
const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  password: String,
  role: { type: String, default: "customer" },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    await connectToDatabase();
    
    // ডাটাবেস থেকে ইউজারের আসল ডাটা আনা হচ্ছে
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 🔴 ব্যাকএন্ড থেকে কনফার্ম করা হচ্ছে তার আসল রোল কী
    return NextResponse.json({ success: true, role: user.role }, { status: 200 });

  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}