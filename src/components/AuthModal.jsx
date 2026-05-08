import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Lock } from "lucide-react";

export default function AuthModal({ showAuthModal, setShowAuthModal, isBangla }) {
  return (
    <AnimatePresence>
      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAuthModal(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          ></motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="relative w-full max-w-md bg-[#111111]/90 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl"
          >
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">{isBangla ? "স্বাগতম" : "Welcome Back"}</h2>
              <p className="text-[#A0A0A0] text-sm">{isBangla ? "ফোন নম্বর দিয়ে লগিন করুন" : "Sign in with your phone number"}</p>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone size={18} className="text-gray-500" />
                </div>
                <input 
                  type="tel" 
                  className="w-full bg-white/5 border border-white/10 text-white rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#E31B23] focus:ring-1 focus:ring-[#E31B23] transition-all"
                  placeholder={isBangla ? "ফোন নম্বর" : "Phone Number"}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-500" />
                </div>
                <input 
                  type="password" 
                  className="w-full bg-white/5 border border-white/10 text-white rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#E31B23] focus:ring-1 focus:ring-[#E31B23] transition-all"
                  placeholder={isBangla ? "পাসওয়ার্ড" : "Password"}
                />
              </div>

              <button className="w-full py-4 mt-4 bg-[#E31B23] text-white font-bold rounded-2xl hover:bg-[#c8161d] transition-colors shadow-[0_0_20px_rgba(227,27,35,0.3)]">
                {isBangla ? "প্রবেশ করুন" : "Sign In"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}