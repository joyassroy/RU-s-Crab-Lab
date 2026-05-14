"use client";
import { useState } from "react";
import { Phone, Lock, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { motion, AnimatePresence } from "framer-motion";
import { Playfair_Display, Anton } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"], style: ["italic"] });
const anton = Anton({ subsets: ["latin"], weight: ["400"] });

export default function LoginPage() {
  const router = useRouter(); 

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [userRole, setUserRole] = useState("customer"); // 🔴 ইউজারের রোল সেভ করার জন্য স্টেট

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }
      console.log("Full API Response:", data);
      console.log("User Role is:", data.user?.role);
      
      setSuccess(true);
      
      // ডাটাবেস থেকে পাওয়া রোল স্টেটে সেভ করছি
      const role = data.user?.role || "customer";
      setUserRole(role);
      
      // ইউজারের ডাটা localStorage এ সেভ করে রাখছি
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event("userLoggedIn"));
      }

      // 🔴 Role অনুযায়ী রিডাইরেক্ট লজিক
      setTimeout(() => {
        if (role === "chef" || role === "admin") {
          router.push('/dashboard'); // শেফ বা অ্যাডমিন হলে ড্যাশবোর্ডে যাবে
        } else {
          router.push('/menu'); // কাস্টমার হলে মেনুতে যাবে
        }
      }, 2000); 

    } catch (err) {
      setError(err.message); 
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full bg-black/60 border border-white/5 focus:border-[#E31B23] rounded-xl py-4 pl-14 pr-12 text-white text-lg outline-none transition-all duration-300 shadow-inner focus:shadow-[0_0_25px_rgba(227,27,35,0.2)]";

  const currentGif = error 
    ? "https://tenor.com/embed/12407322522514770750" 
    : "https://tenor.com/embed/11089354223080050737"; 

  const playfulText = error 
    ? "Oops! Access denied... 😭" 
    : "Ready to spice things up? 😉";

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center overflow-hidden relative">
      
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E31B23]/10 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E31B23]/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute inset-0 opacity-[0.02] bg-[url('/grid.svg')] bg-center z-0"></div>

      <div className="max-w-[1500px] w-full mx-auto p-4 md:p-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 min-h-[90vh]">
          
          <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end px-4 lg:px-8 order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
              className="w-full max-w-[480px] bg-[#0a0a0a]/80 backdrop-blur-2xl p-10 md:p-12 rounded-[30px] border border-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.6)] relative overflow-hidden"
            >
              
              <div className="absolute top-0 left-0 w-32 h-[2px] bg-gradient-to-r from-[#E31B23] to-transparent"></div>
              
              <div className="flex flex-col items-center lg:items-start mb-12 text-center lg:text-left">
                <h3 className={`${playfair.className} text-[#E31B23] text-xl italic mb-2 tracking-wide`}>
                  Welcome Back
                </h3>
                <h1 className={`${anton.className} text-5xl md:text-6xl text-white uppercase tracking-wider leading-[0.9]`}>
                  Enter
                </h1>
                <h1 className={`${anton.className} text-6xl md:text-7xl text-[#E31B23] uppercase tracking-wider leading-[0.9] drop-shadow-[0_0_15px_rgba(227,27,35,0.4)]`}>
                  The Lab
                </h1>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                
                <div className="relative group">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#E31B23] transition-colors" size={24} />
                  <input 
                    type="tel" required value={phone} onChange={(e) => {
                      setPhone(e.target.value);
                      if(error) setError(""); 
                    }}
                    placeholder="Phone Number"
                    className={inputStyle}
                  />
                </div>

                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#E31B23] transition-colors" size={24} />
                  <input 
                    type={showPassword ? "text" : "password"} required value={password} onChange={(e) => {
                      setPassword(e.target.value);
                      if(error) setError(""); 
                    }}
                    placeholder="Password"
                    className={inputStyle}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors p-1">
                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                      className="text-[#E31B23] text-sm font-medium tracking-wide bg-[#E31B23]/10 px-4 py-2 rounded-lg border border-[#E31B23]/30 text-center"
                    >
                      ⚠ {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.button 
                  type="submit" disabled={loading || success}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="group w-full flex items-center justify-center gap-4 bg-gradient-to-r from-[#E31B23] to-[#b31219] text-white py-4 mt-4 rounded-xl text-lg font-bold uppercase tracking-[0.2em] transition-all shadow-[0_10px_30px_rgba(227,27,35,0.3)] disabled:opacity-70"
                >
                  {loading ? <Loader2 className="animate-spin" size={26} /> : (
                    <>
                      <span>Grant Access</span>
                      <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>

              <div className="mt-10 text-center">
                <p className="text-[#a0a0a0] text-sm">
                  First time here?{" "}
                  <Link href="/signup" className="text-white font-bold hover:text-[#E31B23] transition-colors underline underline-offset-4 decoration-[#E31B23]/50">
                    Create Account
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>

          <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center lg:justify-start px-4 order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex flex-col items-center group"
            >
              <motion.div 
                animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className={`mb-6 border px-6 py-2 rounded-full backdrop-blur-sm transition-colors duration-500 ${error ? 'bg-red-500/10 border-red-500/50' : 'bg-[#E31B23]/10 border-[#E31B23]/30'}`}
              >
                <p className={`${playfair.className} ${error ? 'text-red-400' : 'text-white'} text-lg tracking-wide flex items-center gap-2 transition-colors duration-500`}>
                  {playfulText}
                </p>
              </motion.div>

              <div className={`w-[300px] h-[300px] xl:w-[350px] xl:h-[350px] rounded-[40px] bg-[#0a0a0a] border shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden flex items-center justify-center transition-all duration-500 ${error ? 'border-red-500/50 shadow-[0_20px_60px_rgba(239,68,68,0.2)]' : 'border-white/10 group-hover:border-[#E31B23]/40 group-hover:shadow-[0_20px_60px_rgba(227,27,35,0.2)]'}`}>
                <div className={`absolute inset-0 bg-gradient-to-t pointer-events-none z-10 transition-colors duration-500 ${error ? 'from-red-500/20 to-transparent' : 'from-[#E31B23]/10 to-transparent'}`}></div>
                
                <iframe 
                  key={currentGif} 
                  src={currentGif} 
                  className="w-full h-full scale-[1.02] pointer-events-none opacity-90" 
                  frameBorder="0" 
                  allowFullScreen
                ></iframe>
              </div>

              <div className={`w-[250px] h-[15px] blur-[15px] rounded-[100%] mt-6 transition-all duration-500 ${error ? 'bg-red-500/40' : 'bg-[#E31B23]/20 group-hover:bg-[#E31B23]/40 group-hover:blur-[20px]'}`}></div>
            </motion.div>
          </div>

        </div>
      </div>
      
      <AnimatePresence>
        {success && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-10 right-10 z-[100] bg-[#0a0a0a] border border-[#22c55e] p-6 rounded-2xl shadow-[0_0_50px_rgba(34,197,94,0.3)] flex items-center gap-5"
          >
            <div className="w-12 h-12 rounded-full bg-[#22c55e]/20 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-[#22c55e]" />
            </div>
            <div>
              <h4 className={`${anton.className} text-white text-2xl tracking-wider uppercase`}>Access Granted</h4>
              {/* 🔴 রোল অনুযায়ী টেক্সট পরিবর্তন */}
              <p className="text-[#a0a0a0] text-sm font-medium">
                {userRole === "chef" || userRole === "admin" ? "Entering the kitchen..." : "Entering the menu..."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}