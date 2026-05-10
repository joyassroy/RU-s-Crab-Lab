import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    phone: { 
      type: String, 
      required: true, 
      unique: true 
    },
    // এই পাসওয়ার্ড ফিল্ডটা সম্ভবত তোমার মডেলে মিসিং ছিল
    password: { 
      type: String, 
      required: true 
    },
    role: { 
      type: String, 
      default: "customer" 
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;