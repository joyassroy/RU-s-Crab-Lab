import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product"; 

const menuItems = [
  {
    "name": "Crab Fries",
    "nameBn": "ক্র্যাব ফ্রাইস",
    "category": "Crabs",
    "priceBDT": 240,
    "img": "https://i.postimg.cc/tTZ1N0xj/crab-fries.jpg",
    "rating": 4.8,
    "description": "Crispy fries loaded with cheesy crab, lab sauce, and spicy toppings",
    "descriptionBn": "ক্রিস্পি ফ্রাইস, সাথে চিজি ক্র্যাব, ল্যাব সস এবং স্পাইসি টপিংস।"
  },
  {
    "name": "Classic Crab Fry",
    "nameBn": "ক্লাসিক ক্র্যাব ফ্রাই",
    "category": "Crabs",
    "priceBDT": 220,
    "img": "https://i.postimg.cc/FHLn81XL/Gemini-Generated-Image-guga8lguga8lguga.png",
    "rating": 4.7,
    "description": "Crispy fried crab tossed in our signature spicy lab sauce.",
    "descriptionBn": "আমাদের সিগনেচার স্পাইসি ল্যাব সসে মাখানো ক্রিস্পি ফ্রাইড কাঁকড়া।"
  },
  {
    "name": "Golden Butter Crab",
    "nameBn": "গোল্ডেন বাটার ক্র্যাব",
    "category": "Crabs",
    "priceBDT": 240,
    "img": "https://i.postimg.cc/76GCnv2y/golden-butter-crab.jpg",
    "rating": 4.9,
    "description": "Crispy crab coated in rich garlic butter with smoky seasoning.",
    "descriptionBn": "স্মোকি সিজনিং এবং গার্লিক বাটারে মোড়ানো ক্রিস্পি কাঁকড়া।"
  },
  {
    "name": "Sweet Chilli Crab",
    "nameBn": "সুইট চিলি ক্র্যাব",
    "category": "Crabs",
    "priceBDT": 230,
    "img": "https://i.postimg.cc/KYskTc4C/sweet-chilli.jpg",
    "rating": 4.8,
    "description": "Sticky sweet chilli and honey glazed crab with a spicy kick.",
    "descriptionBn": "মধু ও সুইট চিলির মিশ্রণে তৈরি স্পাইসি কাঁকড়া।"
  },
  {
    "name": "Shrimp Sticks",
    "nameBn": "শ্রিম্প স্টিকস",
    "category": "Seafood",
    "priceBDT": 190,
    "img": "https://i.postimg.cc/PxpLQGwG/shrimp-sticks-jpg.jpg",
    "rating": 4.6,
    "description": "Crispy deep-fried shrimp skewers drizzled with creamy spicy sauce.",
    "descriptionBn": "ক্রিমি স্পাইসি সস দিয়ে সাজানো ক্রিস্পি ডিপ-ফ্রাইড চিংড়ি স্টিক।"
  },
  {
    "name": "Signature Crab Dip",
    "nameBn": "সিগনেচার ক্র্যাব ডিপ",
    "category": "Dips",
    "priceBDT": 50,
    "img": "https://i.ibb.co.com/dwqMkffv/1960c8c8-708b-4cf7-a22e-b4c75e289022.jpg",
    "rating": 4.9,
    "description": "Creamy spicy house dip made with smoky seasoning and our signature lab sauce.",
    "descriptionBn": "স্মোকি সিজনিং এবং ল্যাব সসে তৈরি ক্রিমি স্পাইসি হাউস ডিপ।"
  },
  {
    "name": "Garlic Dip",
    "nameBn": "গার্লিক ডিপ",
    "category": "Dips",
    "priceBDT": 50,
    "img": "https://i.ibb.co.com/dwqMkffv/1960c8c8-708b-4cf7-a22e-b4c75e289022.jpg",
    "rating": 4.7,
    "description": "Smooth roasted garlic dip with buttery herbs and a rich savory flavor.",
    "descriptionBn": "বাটারি হার্বস এবং রোস্টেড গার্লিকের স্মুথ ডিপ।"
  }
];

export async function GET() {
  try {
    // ১. ডেটাবেসের সাথে কানেক্ট করা
    await connectToDatabase();

    // ২. আগের সব ডেটা মুছে ফেলা (যাতে ডাবল এন্ট্রি না হয়)
    await Product.deleteMany({});

    // ৩. নতুন ডেটা পুশ করা
    const insertedProducts = await Product.insertMany(menuItems);

    return NextResponse.json({ 
      message: "✅ Database Seeded Successfully!", 
      success: true,
      count: insertedProducts.length
    });

  } catch (error) {
    console.error("Seeding Error:", error);
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
  }
}