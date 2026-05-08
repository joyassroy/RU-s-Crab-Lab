import "./globals.css";

export const metadata = {
  title: "Crab Bites - Premium Seafood",
  description: "Order the spiciest and freshest crabs in town.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#080808] text-white">
        {children}
      </body>
    </html>
  );
}