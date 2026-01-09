import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import LiquidBackground from "@/components/LiquidBackground";
import Footer from "@/components/Footer";
import BackgroundAudio from "@/components/BackgroundAudio";
import { GradientBlur } from "@/components/gradient-blur";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const calligraffitti = localFont({
  src: "./fonts/Calligraffitti-Regular.ttf",
  variable: "--font-calligraffitti",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Lumina Oracles | Sacred Spiritual Consultation",
  description: "Connect to your higher self with heavenly light and divine guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${calligraffitti.variable} antialiased`}
      >
        <LiquidBackground />
        <GradientBlur />
        <BackgroundAudio />
        {children}
        <Footer />
      </body>
    </html>
  );
}
