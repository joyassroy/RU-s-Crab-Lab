import mongoose from "mongoose"; // এই লাইনটি মিসিং ছিল!

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameBn: { type: String },
  category: { type: String, required: true },
  priceBDT: { type: Number, required: true },
  img: { type: String, required: true },
  rating: { type: Number, default: 0 },
  description: { type: String },
  descriptionBn: { type: String },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

// Next.js এর জন্য সেফ এক্সপোর্ট (Hot Reloading এর সময় যেন ক্র্যাশ না করে)
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;