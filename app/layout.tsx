import type { Metadata } from "next";
import { Cabin, Rethink_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";

const cabin = Cabin({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cabin",
});

export const metadata: Metadata = {
  title: "Acme Store",
  description: "Example Next.js site with Optimizely experimentation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cabin.variable} max-w-7xl mx-auto`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
