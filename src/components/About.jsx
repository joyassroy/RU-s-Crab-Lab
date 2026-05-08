import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function About({ isBangla }) {
  const features = isBangla 
    ? ["প্রতিদিন তাজা সংগ্রহ", "সিক্রেট স্পাইসি রেসিপি", "প্রিমিয়াম কোয়ালিটি", "১০০% হাইজিন মেইনটেইন"]
    : ["Daily Fresh Catch", "Secret Spicy Recipe", "Premium Quality", "100% Hygiene Maintained"];

  return (
    <section className="px-4 md:px-20 py-24 relative z-10 bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Image Section */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden border border-white/10 group"
        >
          <Image 
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop" 
            alt="Cooking Premium Crabs" 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent"></div>
          
          {/* Floating Badge */}
          <div className="absolute bottom-6 left-6 bg-[#E31B23]/90 backdrop-blur-md px-6 py-3 rounded-2xl border border-[#E31B23]">
            <p className="text-white font-bold text-xl">5+ Years</p>
            <p className="text-white/80 text-xs uppercase tracking-wider">Of Culinary Excellence</p>
          </div>
        </motion.div>

        {/* Text Section */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E31B23]/30 bg-[#E31B23]/10 mb-6">
            <span className="text-[#E31B23] text-sm font-bold uppercase tracking-widest">
              {isBangla ? "আমাদের সম্পর্কে" : "Our Story"}
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {isBangla ? "গাজীপুরের সেরা" : "Serving The Finest"}<br/>
            <span className="text-[#E31B23]">
              {isBangla ? "সি-ফুড এক্সপেরিয়েন্স" : "Seafood Experience"}
            </span>
          </h2>

          <p className="text-[#A0A0A0] text-lg mb-8 leading-relaxed">
            {isBangla 
              ? "একটি সাধারণ প্যাশন থেকে আমাদের যাত্রা শুরু—আপনাদের প্লেটে সবচেয়ে তাজা, প্রিমিয়াম এবং পারফেক্ট স্পাইসি কাঁকড়া তুলে দেওয়া। আমাদের শেফরা প্রতিটি খাবার এমনভাবে তৈরি করেন যেন তা শুধু খাবার নয়, বরং একটি স্মরণীয় অভিজ্ঞতা হয়ে থাকে।"
              : "We started with a simple passion: bringing the freshest, most premium, and perfectly spiced crabs to your plate. Our chefs craft every dish not just as a meal, but as an unforgettable culinary journey."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-[#E31B23]" />
                <span className="text-white font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}