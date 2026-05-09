import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  deliveryAddress: { type: String, required: true },
  status: { 
    type: String, 
    default: "Pending", 
    enum: ["Pending", "Preparing", "On the way", "Delivered", "Cancelled"] 
  },
  paymentMethod: { type: String, default: "Cash on Delivery" }
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;