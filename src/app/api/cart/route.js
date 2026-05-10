import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import mongoose from "mongoose";

// --- ১. কার্ট মডেল ডিফাইন করা ---
// যদি তোমার আলাদা models ফোল্ডার থাকে, তবে সেখানেও এটি রাখতে পারো।
const cartSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true 
  },
  itemId: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  image: { 
    type: String 
  },
  quantity: { 
    type: Number, 
    default: 1 
  }
}, { timestamps: true });

// মডেলটি অলরেডি থাকলে সেটি নিবে, নয়তো নতুন তৈরি করবে
const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

// --- ২. POST মেথড (Add to Cart) ---
export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, itemId, name, price, image, quantity } = body;

    // ভ্যালিডেশন
    if (!userId || !itemId) {
      return NextResponse.json({ message: "User ID এবং Item ID প্রয়োজন!" }, { status: 400 });
    }

    await connectToDatabase();

    // চেক করা হচ্ছে কার্টে এই ইউজারের জন্য এই খাবারটি অলরেডি আছে কি না
    const existingCartItem = await Cart.findOne({ userId, itemId });

    if (existingCartItem) {
      // যদি থাকে, তবে বর্তমান পরিমাণের সাথে নতুন পরিমাণ যোগ হবে
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      
      return NextResponse.json({ 
        success: true, 
        message: "পরিমাণ আপডেট করা হয়েছে!", 
        cartItem: existingCartItem 
      }, { status: 200 });
    } else {
      // যদি না থাকে, তবে নতুন এন্ট্রি তৈরি হবে
      const newCartItem = await Cart.create({
        userId,
        itemId,
        name,
        price,
        image,
        quantity: quantity || 1
      });

      return NextResponse.json({ 
        success: true, 
        message: "ট্রেতে নতুন আইটেম যোগ হয়েছে!", 
        cartItem: newCartItem 
      }, { status: 201 });
    }

  } catch (error) {
    console.error("Cart API Error:", error);
    return NextResponse.json({ message: "সার্ভারে সমস্যা হয়েছে!" }, { status: 500 });
  }
}

// --- ৩. GET মেথড (নির্দিষ্ট ইউজারের কার্ট ডাটা দেখা) ---
// এটি পরবর্তীতে যখন তুমি কার্ট পেজ বানাবে তখন কাজে লাগবে
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "User ID প্রয়োজন!" }, { status: 400 });
    }

    await connectToDatabase();
    const userCart = await Cart.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json(userCart, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "ডাটা আনতে সমস্যা হয়েছে!" }, { status: 500 });
  }
}
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await connectToDatabase();
    await Cart.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Item removed" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to remove" }, { status: 500 });
  }
}
// PUT: আইটেমের কোয়ান্টিটি আপডেট করা
export async function PUT(req) {
  try {
    const { id, quantity } = await req.json();
    await connectToDatabase();
    
    const updatedItem = await Cart.findByIdAndUpdate(
      id, 
      { quantity: quantity }, 
      { new: true }
    );

    return NextResponse.json({ success: true, cartItem: updatedItem });
  } catch (error) {
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}