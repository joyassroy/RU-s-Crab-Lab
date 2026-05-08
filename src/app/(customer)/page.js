"use client";
import Hero from "@/components/Hero";
import About from "@/components/About";

// এই পেজ থেকে Navbar/Footer সব রিমুভ, কারণ সেগুলো layout.js হ্যান্ডেল করছে
export default function LandingPage() {
  return (
    <>
      <Hero isBangla={false} />
      <About isBangla={false} />
      
      {/* স্ক্রলবার লুকানোর জন্য */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </>
  );
}