"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Menu from "@/components/Menu";
import AuthModal from "@/components/AuthModal";
import BottomNav from "@/components/BottomNav";

export default function MenuPage() {
  const [isBangla, setIsBangla] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#080808] font-sans selection:bg-[#E31B23] selection:text-white">
      
      <Navbar 
        isBangla={isBangla} 
        setIsBangla={setIsBangla} 
        setShowAuthModal={setShowAuthModal} 
      />
      
      <div className="pt-24 min-h-screen">
        <Menu isBangla={isBangla} />
      </div>

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

    </main>
  );
}