import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    const body = await req.json();
    const { phone, password } = body;

    if (!phone || !password) {
      return NextResponse.json({ message: "Phone and password are required" }, { status: 400 });
    }

    await connectToDatabase();

    // ডাটাবেসে ফোন নম্বর চেক করা
    const existingUser = await User.findOne({ phone });

    if (!existingUser) {
      // ফোন নম্বর না পেলে এই এরর মেসেজটা ফ্রন্টএন্ডে দেখাবে
      return NextResponse.json({ message: "No account found with this phone number!" }, { status: 404 });
    }

    // পাসওয়ার্ড চেক করা (প্রোডাকশনে bcrypt.compare ব্যবহার করা উচিত)
    if (existingUser.password !== password) {
      return NextResponse.json({ message: "Incorrect password!" }, { status: 401 });
    }

    // সবকিছু ঠিক থাকলে সাকসেস রিটার্ন করবে
    return NextResponse.json({ 
      success: true, 
      message: "Login successful",
      user: { 
        id: existingUser._id, 
        name: existingUser.name, 
        phone: existingUser.phone,
        role: existingUser.role || "customer" // 🔴 এই ম্যাজিক লাইনটা অ্যাড করা হলো!
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}