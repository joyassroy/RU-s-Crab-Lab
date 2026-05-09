import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true }, 
  email: { type: String },
  address: { type: String },
  role: { type: String, default: "customer", enum: ["customer", "admin"] }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;