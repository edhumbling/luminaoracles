import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SanctuaryBackground from "@/components/SanctuaryBackground";
import Footer from "@/components/Footer";
import MarqueeFooter from "@/components/MarqueeFooter";
import BackgroundAudio from "@/components/BackgroundAudio";
import MobileHeader from "@/components/MobileHeader";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";

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
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    title: 'Lumina Oracles',
  },
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
        <SanctuaryBackground />
        <Header />
        <MobileHeader />
        <BackgroundAudio />
        {children}
        <Footer />
        <MarqueeFooter />
        <ScrollToTop />
      </body>
    </html>
  );
}
