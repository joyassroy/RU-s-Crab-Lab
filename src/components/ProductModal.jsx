import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, ShoppingBag, Truck, Flame, CheckCircle, Minus, Plus } from "lucide-react"; // Minus এবং Plus আইকন যোগ করা হয়েছে
import Image from "next/image";

// --- Framer Motion Animations for Modal ---
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  visible: { 
    opacity: 1, scale: 1, y: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 }
  },
  exit: { opacity: 0, scale: 0.9, y: 50 }
};

export default function ProductModal({ product, onClose, isBangla, formatPrice }) {
  // কোয়ান্টিটি ট্র্যাক করার জন্য স্টেট
  const [quantity, setQuantity] = useState(1);

  // মডাল ওপেন হলে বা নতুন প্রোডাক্ট সিলেক্ট করলে কোয়ান্টিটি যেন আবার 1 থেকে শুরু হয়
  useEffect(() => {
    if (product) {
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  // রিয়েল-টাইম টোটাল প্রাইস ক্যালকুলেশন
  const totalPrice = product.priceBDT * quantity;

  // কোয়ান্টিটি কমানোর ফাংশন (১ এর নিচে নামবে না)
  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // কোয়ান্টিটি বাড়ানোর ফাংশন
  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-0 pt-20 overflow-y-auto">
          
          {/* Modal Backdrop (Blur effect) */}
          <motion.div 
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose} 
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          ></motion.div>

          {/* Modal Content (Glassmorphism UI) */}
          <motion.div 
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-4xl bg-[#111111]/90 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 shadow-2xl z-10 flex flex-col md:flex-row gap-10"
          >
            
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-[#E31B23]/20 rounded-full border border-white/10 transition-colors text-gray-400 hover:text-white z-20"
            >
              <X size={20} />
            </button>

            {/* --- Left Side: Product Image --- */}
            <div className="w-full md:w-2/5 h-64 md:h-[400px] relative rounded-3xl overflow-hidden border border-white/10 flex-shrink-0">
                <Image 
                    src={product.img} 
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            {/* --- Right Side: Details --- */}
            <div className="w-full md:w-3/5 flex flex-col pt-4">
              
              <div className="flex items-center gap-3 mb-3">
                {/* Rating Badge */}
                <div className="flex items-center gap-1.5 px-4 py-1.5 bg-yellow-500/10 rounded-full border border-yellow-500/30">
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-yellow-500 font-extrabold text-sm">{product.rating}</span>
                </div>
                {/* Hot Item Badge */}
                {product.rating > 4.7 && (
                    <div className="flex items-center gap-1.5 px-4 py-1.5 bg-[#E31B23]/10 rounded-full border border-[#E31B23]/30">
                        <Flame size={16} className="text-[#E31B23]" />
                        <span className="text-[#E31B23] font-bold text-xs uppercase tracking-wider">Hot Item</span>
                    </div>
                )}
              </div>

              {/* Product Title */}
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5 tracking-tighter leading-none">
                {isBangla ? product.nameBn : product.name}
              </h2>

              {/* Description */}
              <p className="text-[#A0A0A0] text-lg mb-8 leading-relaxed font-light">
                {isBangla ? product.description : product.descriptionEn}
              </p>
              
              {/* Features */}
              <div className="space-y-3 mb-8 text-white font-medium flex-grow">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle size={18} className="text-[#E31B23]" />
                    <span>{isBangla ? "তাজা এবং অথেন্টিক সি-ফুড" : "Fresh & Authentic Seafood"}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Truck size={18} className="text-[#E31B23]" />
                    <span>{isBangla ? "গাজীপুরের ভেতর ১ ঘণ্টায় ডেলিভারি" : "1 Hour Delivery in Gazipur"}</span>
                  </div>
              </div>

              {/* --- Quantity, Price & Add to Cart (Bottom Section) --- */}
              <div className="mt-auto flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-white/5">
                
                {/* Quantity Controls & Total Price Wrapper */}
                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-start">
                  
                  {/* Quantity Controller */}
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1.5">
                    <button 
                      onClick={handleDecrease}
                      className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors disabled:opacity-50"
                      disabled={quantity <= 1}
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-8 text-center text-white font-bold text-lg">
                      {isBangla ? quantity.toLocaleString('bn-BD') : quantity}
                    </span>
                    <button 
                      onClick={handleIncrease}
                      className="p-2 text-[#E31B23] hover:text-white hover:bg-[#E31B23] rounded-full transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  {/* Total Price Display */}
                  <div className="flex flex-col text-right md:text-left">
                      <span className="text-sm text-[#A0A0A0] font-medium tracking-wide">
                          {isBangla ? "মোট মূল্য" : "Total Price"}
                      </span>
                      <span className="text-3xl font-extrabold text-[#E31B23]">
                          {formatPrice(totalPrice, isBangla)}
                      </span>
                  </div>
                </div>
                
                {/* Add to Cart Button */}
                <button className="w-full md:w-auto group relative px-8 py-4 md:px-10 md:py-5 bg-[#E31B23] text-white font-bold text-lg md:text-xl rounded-2xl transition-all shadow-[0_0_30px_rgba(227,27,35,0.3)] hover:shadow-[0_0_50px_rgba(227,27,35,0.6)] transform hover:-translate-y-1">
                    <span className="relative z-10 flex items-center justify-center gap-3 whitespace-nowrap">
                        <ShoppingBag size={22} className="group-hover:rotate-12 transition-transform" />
                        {isBangla ? "কার্টে যুক্ত করুন" : "Add to Cart"} 
                    </span>
                </button>

              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}