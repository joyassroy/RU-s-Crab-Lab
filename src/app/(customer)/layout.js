"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import BottomNav from "@/components/BottomNav";

export default function CustomerLayout({ children }) {
  // গ্লোবাল স্টেটগুলো এখন লেআউটে থাকবে
  const [isBangla, setIsBangla] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="relative min-h-screen font-sans selection:bg-[#E31B23] selection:text-white flex flex-col">
      
      {/* ফিক্সড ন্যাভবার */}
      <Navbar 
        isBangla={isBangla} 
        setIsBangla={setIsBangla} 
        setShowAuthModal={setShowAuthModal} 
      />
      
      {/* এই চিলড্রেনের ভেতরেই পেজগুলো (Hero, Menu) লোড হবে, ন্যাভবার/ফুটার স্থির থাকবে */}
      <main className="flex-grow pt-20 md:pt-24">
        {children}
      </main>

      {/* ফিক্সড ফুটার ও মডাল */}
      <Footer isBangla={isBangla} />

      <AuthModal 
        showAuthModal={showAuthModal} 
        setShowAuthModal={setShowAuthModal} 
        isBangla={isBangla} 
      />

      <BottomNav 
        isBangla={isBangla} 
        setIsBangla={setIsBangla} 
        setShowAuthModal={setShowAuthModal} 
      />
      
    </div>
  );
}