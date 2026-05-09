import { Inter, Anton } from "next/font/google";
import "./globals.css";

// Inter font setup
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter", // Tailwind এর জন্য ভেরিয়েবল
});

// Anton font setup (Anton এর শুধু 400 weight থাকে)
const anton = Anton({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

export const metadata = {
  title: "RU's Crab Lab",
  description: "Dhaka's Spiciest Crab Experience",
};

export default function RootLayout({ children }) {
  return (
    // html ট্যাগে ক্লাসগুলো অ্যাড করে দিলাম
    <html lang="en" className={`${inter.variable} ${anton.variable}`}>
      <body className="font-sans bg-[#020202] text-white">
        {children}
      </body>
    </html>
  );
}