"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, ShoppingBag, Truck, Flame, CheckCircle, Minus, Plus } from "lucide-react"; 
import Image from "next/image";

// --- Framer Motion Animations ---
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
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) setQuantity(1);
  }, [product]);

  if (!product) return null;

  const totalPrice = product.priceBDT * quantity;

  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handleIncrease = () => setQuantity((prev) => prev + 1);

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-0 pt-20 overflow-y-auto">
          
          {/* Modal Backdrop (Darker & blurrier for the spicy theme) */}
          <motion.div 
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose} 
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          ></motion.div>

          {/* Modal Content (Dark, Rugged, Edgy) */}
          <motion.div 
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-5xl bg-[#050505] border border-[#E31B23]/20 rounded-[40px] p-6 md:p-10 shadow-[0_0_50px_rgba(227,27,35,0.15)] z-10 flex flex-col md:flex-row gap-10"
          >
            
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2.5 bg-black hover:bg-[#E31B23] rounded-full border border-white/10 hover:border-[#E31B23] transition-colors text-gray-400 hover:text-white z-20 group"
            >
              <X size={22} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* --- Left Side: Product Image --- */}
            <div className="w-full md:w-1/2 h-72 md:h-[450px] relative rounded-3xl overflow-hidden border border-[#E31B23]/10 flex-shrink-0 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                <Image 
                    src={product.img} 
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/20 to-transparent"></div>
            </div>

            {/* --- Right Side: Details --- */}
            <div className="w-full md:w-1/2 flex flex-col pt-2">
              
              <div className="flex items-center gap-3 mb-4">
                {/* Rating Badge */}
                <div className="flex items-center gap-1.5 px-4 py-1.5 bg-black rounded-sm border border-yellow-500/30">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-yellow-500 font-black text-sm">{product.rating}</span>
                </div>
                {/* Hot Item Badge */}
                <div className="flex items-center gap-1.5 px-4 py-1.5 bg-[#E31B23]/10 rounded-sm border border-[#E31B23]/30">
                    <Flame size={14} className="text-[#E31B23]" />
                    <span className="text-[#E31B23] font-black text-xs uppercase tracking-widest">Spicy Pick</span>
                </div>
              </div>

              {/* Product Title */}
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase leading-none">
                {isBangla ? product.nameBn : product.name}
              </h2>

              {/* Description */}
              <p className="text-[#888888] text-lg mb-8 leading-relaxed font-medium">
                {isBangla ? product.descriptionBn : product.description}
              </p>
              
              {/* Features */}
              <div className="space-y-4 mb-8 text-white font-bold tracking-wide flex-grow">
                  <div className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-[#E31B23]" />
                    <span className="uppercase text-sm">{isBangla ? "তাজা এবং অথেন্টিক সি-ফুড" : "Fresh & Authentic Seafood"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck size={20} className="text-[#E31B23]" />
                    <span className="uppercase text-sm">{isBangla ? "দ্রুততম ডেলিভারি" : "Lightning Fast Delivery"}</span>
                  </div>
              </div>

              {/* --- Quantity, Price & Add to Cart --- */}
              <div className="mt-auto flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 pt-8 border-t border-[#E31B23]/20">
                
                {/* Quantity Controls & Total Price Wrapper */}
                <div className="flex items-center gap-6 w-full xl:w-auto justify-between xl:justify-start">
                  
                  {/* Quantity Controller (Rugged Style) */}
                  <div className="flex items-center bg-black border border-white/10 rounded-2xl p-1.5">
                    <button 
                      onClick={handleDecrease}
                      className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors disabled:opacity-50"
                      disabled={quantity <= 1}
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-10 text-center text-white font-black text-xl">
                      {isBangla ? quantity.toLocaleString('bn-BD') : quantity}
                    </span>
                    <button 
                      onClick={handleIncrease}
                      className="p-3 text-[#E31B23] hover:text-white hover:bg-[#E31B23] rounded-xl transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  {/* Total Price Display */}
                  <div className="flex flex-col text-right xl:text-left">
                      <span className="text-xs text-[#E31B23] font-black tracking-widest uppercase mb-1">
                          {isBangla ? "মোট মূল্য" : "Total Price"}
                      </span>
                      <span className="text-3xl font-black text-white">
                          {formatPrice(totalPrice, isBangla)}
                      </span>
                  </div>
                </div>
                
                {/* Add to Cart Button */}
                <button className="w-full xl:w-auto group relative px-8 py-5 bg-[#E31B23] text-white font-black text-lg rounded-2xl transition-all shadow-[0_0_20px_rgba(227,27,35,0.4)] hover:shadow-[0_0_40px_rgba(227,27,35,0.8)] transform hover:-translate-y-1 overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center gap-3 whitespace-nowrap uppercase tracking-widest">
                        <ShoppingBag size={22} className="group-hover:scale-110 transition-transform" />
                        {isBangla ? "কার্টে নিন" : "Add to Cart"} 
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