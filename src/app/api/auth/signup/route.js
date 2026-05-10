import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    const { name, phone, password } = await req.json();

    // ভ্যালিডেশন চেক
    if (!name || !phone || !password) {
      return NextResponse.json(
        { message: "সবগুলো ফিল্ড পূরণ করা বাধ্যতামূলক!" }, 
        { status: 400 }
      );
    }

    await connectToDatabase();

    // চেক করা হচ্ছে ফোন নম্বর অলরেডি ডাটাবেসে আছে কি না
    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      // যদি ফোন নম্বর থাকে, তবে এরর মেসেজ দিবে যা ফ্রন্টএন্ডে ওই কান্নার GIF ট্রিগার করবে
      return NextResponse.json(
        { message: "এই ফোন নম্বরটি দিয়ে অলরেডি অ্যাকাউন্ট খোলা হয়েছে!" }, 
        { status: 409 }
      );
    }

    // ডাটাবেসে নতুন ইউজার তৈরি
    const newUser = await User.create({
      name,
      phone,
      password, // প্রোডাকশনে অবশ্যই bcrypt দিয়ে পাসওয়ার্ড হ্যাশ করে নেওয়া উচিত
    });

    return NextResponse.json({ 
      success: true, 
      message: "অ্যাকাউন্ট তৈরি সফল হয়েছে!",
      user: { id: newUser._id, name: newUser.name, phone: newUser.phone }
    }, { status: 201 });

  } catch (error) {
    console.error("Signup API Error:", error);
    return NextResponse.json(
      { message: "সার্ভারে সমস্যা হয়েছে, আবার চেষ্টা করো!" }, 
      { status: 500 }
    );
  }
}