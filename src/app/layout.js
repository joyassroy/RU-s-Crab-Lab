import { Inter, Anton } from "next/font/google";
import "./globals.css";

// Inter font setup
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter", 
});

// Anton font setup
const anton = Anton({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

// 🔴 Advanced SEO & Metadata Configuration
export const metadata = {
  // ⚠️ ডেপ্লয় করার পর এখানে তোমার আসল ডোমেইন লিংকটা বসিয়ে দিও (যেমন: https://ruscrablab.com)
  metadataBase: new URL('http://localhost:3000'), 
  
  title: {
    default: "RU's Crab Lab | Best Spicy Crab & Seafood in Dhaka",
    template: "%s | RU's Crab Lab", // অন্য পেজে গেলে অটোমেটিক নাম চেঞ্জ হবে (যেমন: Menu | RU's Crab Lab)
  },
  description: "Craving the spiciest and most delicious crab in Dhaka? Visit RU's Crab Lab for an unforgettable premium seafood experience. Order online or dine with us today!",
  keywords: [
    "Spicy Crab Dhaka", 
    "Seafood Restaurant Dhaka", 
    "RU's Crab Lab", 
    "Best Crab in Bangladesh", 
    "Dhaka Food Delivery", 
    "Premium Seafood Dhaka",
    "Crab Delivery"
  ],
  icons: {
    icon: '/favicon.jpeg', // ব্রাউজার ট্যাবের জন্য
    shortcut: '/favicon.jpeg',
    apple: '/favicon.jpeg', // কেউ যদি আইফোন বা আইপ্যাডে সাইটটা হোমস্ক্রিনে সেভ করে, তখন এই আইকন দেখাবে
  },
  authors: [{ name: "RU's Crab Lab Team" }],
  creator: "RU's Crab Lab",
  
  // 🔴 Open Graph (Facebook, Messenger, WhatsApp এ লিংক শেয়ার করার জন্য)
  openGraph: {
    title: "RU's Crab Lab | Dhaka's Ultimate Seafood Destination",
    description: "Experience the spiciest and most mouth-watering crab in Dhaka. Order your masterpiece now!",
    url: '/',
    siteName: "RU's Crab Lab",
    images: [
      {
        url: '/crab-logo.jpeg', // তোমার লোগো বা সুন্দর কোনো খাবারের ছবি দিবে
        width: 1200,
        height: 630,
        alt: "RU's Crab Lab Premium Seafood",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // 🔴 Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: "RU's Crab Lab | Best Spicy Crab in Dhaka",
    description: "Experience the best spicy crab and premium seafood in Dhaka. Order now!",
    images: ['/crab-logo.jpeg'], 
  },

  // 🔴 Search Engine Crawling Instructions
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${anton.variable}`}>
      <body className="font-sans bg-[#020202] text-white">
        {children}
      </body>
    </html>
  );
}