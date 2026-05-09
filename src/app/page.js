"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import About from "@/components/About";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import BottomNav from "@/components/BottomNav";
import TheLab from "@/components/TheLab";

export default function LandingPage() {
  const [isBangla, setIsBangla] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#080808] font-sans selection:bg-[#E31B23] selection:text-white">
      
      <Navbar 
        isBangla={isBangla} 
        setIsBangla={setIsBangla} 
        setShowAuthModal={setShowAuthModal} 
      />
      
      <Hero isBangla={isBangla} />
      <TheLab></TheLab>
      <Menu isBangla={isBangla} />

      {/* নতুন যোগ করা About সেকশন */}
      <About isBangla={isBangla} />

      {/* নতুন যোগ করা Footer সেকশন */}
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

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </main>
  );
}