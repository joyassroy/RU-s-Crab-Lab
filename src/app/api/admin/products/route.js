import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product"; // তোমার প্রোডাক্ট মডেল

// সব প্রোডাক্ট দেখার জন্য (GET)
export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// নতুন প্রোডাক্ট অ্যাড করার জন্য (POST)
export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const newProduct = await Product.create(data);
    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// প্রোডাক্ট আপডেট করার জন্য (PUT)
export async function PUT(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const { _id, ...updateData } = data;
    const updatedProduct = await Product.findByIdAndUpdate(_id, updateData, { new: true });
    return NextResponse.json({ success: true, product: updatedProduct }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// প্রোডাক্ট ডিলিট করার জন্য (DELETE)
export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}