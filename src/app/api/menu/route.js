import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectToDatabase();
    
    // ডেটাবেস থেকে শুধু সেই প্রোডাক্টগুলো আনব যেগুলো এভেইলেবল (isAvailable: true)
    const products = await Product.find({ isAvailable: true }).sort({ createdAt: -1 });
    
    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json({ error: "Failed to load menu" }, { status: 500 });
  }
}