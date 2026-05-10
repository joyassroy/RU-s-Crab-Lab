"use client";
import { useState } from "react";
import { Phone, Lock, User, Loader2, ArrowRight, Eye, EyeOff, ShieldCheck, Soup } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // রিডাইরেক্ট করার জন্য ইম্পোর্ট করা হলো
import { motion, AnimatePresence } from "framer-motion";
import { Playfair_Display, Anton } from "next/font/google";

// --- Premium Fonts ---
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"], style: ["italic"] });
const anton = Anton({ subsets: ["latin"], weight: ["400"] });

export default function SignupPage() {
  const router = useRouter(); // রাউটার ইনিশিয়ালাইজ করা হলো

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      setSuccess(true);
      
      // সাকসেস অ্যানিমেশন দেখানোর পর ২ সেকেন্ড পর হোম পেজে রিডাইরেক্ট করবে
      setTimeout(() => {
        router.push('/');
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full bg-black/40 border border-white/5 focus:border-[#E31B23] rounded-2xl py-4.5 pl-14 pr-12 text-white text-lg outline-none transition-all duration-500 shadow-inner focus:shadow-[0_0_30px_rgba(227,27,35,0.1)]";

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center overflow-hidden relative">
      
      {/* --- ELITE BACKGROUND AMBIANCE --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#E31B23]/10 blur-[180px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[40%] w-[500px] h-[500px] bg-[#ff4b4b]/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-[1920px] w-full mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-stretch min-h-screen">
          
          {/* --- LEFT SIDE: THE PREMIUM FORM (45% Width) --- */}
          <div className="w-full lg:w-[45%] flex items-center justify-center lg:justify-end px-6 md:px-12 lg:px-24 py-20 order-2 lg:order-1 relative">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }}
              className="w-full max-w-[500px] relative"
            >
              {/* Floating Header */}
              <div className="mb-12 text-center lg:text-left">
                <motion.div
                   initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                   className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E31B23]/10 border border-[#E31B23]/20 mb-6"
                >
                    <Soup size={16} className="text-[#E31B23]" />
                    <span className="text-[#E31B23] text-xs font-bold tracking-[0.2em] uppercase">Invitation To The Feasts</span>
                </motion.div>
                
                <h1 className={`${anton.className} text-6xl md:text-8xl text-white uppercase leading-[0.8] tracking-tighter mb-2`}>
                   Unlock
                </h1>
                <h1 className={`${anton.className} text-6xl md:text-8xl text-[#E31B23] uppercase leading-[0.8] tracking-tighter drop-shadow-[0_10px_20px_rgba(227,27,35,0.3)]`}>
                   The Lab
                </h1>
                <p className={`${playfair.className} text-white/50 text-xl mt-6 italic`}>
                     reserved for those who crave the exceptional.
                </p>
              </div>

              {/* Modern Glass Form */}
              <form onSubmit={handleSignup} className="space-y-6">
                
                <div className="space-y-1 group">
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#E31B23] transition-colors" size={22} />
                    <input 
                      type="text" required value={name} onChange={(e) => setName(e.target.value)}
                      placeholder="Your Chosen Name"
                      className={inputStyle}
                    />
                  </div>
                </div>

                <div className="space-y-1 group">
                  <div className="relative">
                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#E31B23] transition-colors" size={22} />
                    <input 
                      type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)}
                      placeholder="Registry Phone Connection"
                      className={`${inputStyle} font-mono`}
                    />
                  </div>
                </div>

                <div className="space-y-1 group">
                  <div className="relative">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#E31B23] transition-colors" size={22} />
                    <input 
                      type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
                      placeholder="Choose A Secret Passcode"
                      className={inputStyle}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors">
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                      className="bg-red-500/10 border border-red-500/20 py-3 px-4 rounded-xl text-red-500 text-sm font-medium text-center"
                    >
                      ⚠ {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button 
                  type="submit" disabled={loading}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#E31B23] hover:bg-[#c9161e] text-white py-5 rounded-2xl font-bold uppercase tracking-[0.3em] transition-all shadow-[0_15px_40px_rgba(227,27,35,0.4)] flex items-center justify-center gap-4 group"
                >
                  {loading ? <Loader2 className="animate-spin" size={24} /> : (
                    <>
                      <span>Secure Your Seat</span>
                      <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>

              <div className="mt-12 text-center">
                <p className="text-white/40 text-sm uppercase tracking-widest">
                  Already a member? {" "}
                  <Link href="/login" className="text-white hover:text-[#E31B23] font-bold transition-all underline underline-offset-8 decoration-[#E31B23]/30">
                    Authorize & Enter
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>

          {/* --- RIGHT SIDE: DYNAMIC PREMIUM IMAGE (55% Width) --- */}
          <div className="hidden lg:flex w-full lg:w-[55%] relative order-1 lg:order-2 overflow-hidden">
            
            <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-transparent to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/50 via-transparent to-[#030303]/80 z-10"></div>

            <motion.div 
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                className="relative w-full h-full"
            >
                <Image 
                    src="https://i.ibb.co.com/wNmhY4b7/delicious-lobster-gourmet-seafood.jpg" 
                    alt="Spicy Premium Seafood" 
                    fill 
                    className="object-cover"
                    priority
                />
            </motion.div>

            <div className="absolute bottom-20 left-20 z-20">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                    className="flex flex-col"
                >
                    <span className={`${playfair.className} text-white/40 text-2xl italic mb-2`}>The Official</span>
                    <span className={`${anton.className} text-white text-7xl uppercase leading-none tracking-tighter`}>Crab Lab</span>
                    <span className={`${anton.className} text-[#E31B23] text-7xl uppercase leading-none tracking-tighter -mt-2`}>Registry</span>
                </motion.div>
            </div>

            <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)] z-10 pointer-events-none"></div>
            <div className="absolute inset-0 bg-[#E31B23] mix-blend-overlay opacity-20 pointer-events-none z-10"></div>

          </div>

        </div>
      </div>
      
      {/* --- SUCCESS OVERLAY --- */}
      <AnimatePresence>
        {success && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
          >
             <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                className="bg-[#0a0a0a] border border-[#E31B23]/30 p-12 rounded-[40px] text-center max-w-md w-full shadow-[0_0_100px_rgba(227,27,35,0.2)]"
             >
                <div className="w-20 h-20 bg-[#E31B23] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(227,27,35,0.5)]">
                    <Soup size={40} className="text-white" />
                </div>
                <h2 className={`${anton.className} text-4xl text-white uppercase tracking-wider mb-4`}>Registry Complete</h2>
                <p className={`${playfair.className} text-white/60 text-lg mb-10 italic`}> Your key to the feasts has been generated. Redirecting to home page...</p>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2 }}
                        className="h-full bg-[#E31B23]"
                    />
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}