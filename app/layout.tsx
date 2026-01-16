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
import Breadcrumbs from "@/components/Breadcrumbs";
import StructuredData from "@/components/StructuredData";
import AEOSchemas from "@/components/AEOSchemas";
import Analytics from "@/components/Analytics";

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
  metadataBase: new URL('https://luminaoracles.com'),
  title: "Lumina Oracles | Spiritual Guidance, Tarot Readings & Mystical Wisdom",
  description: "Connect to your higher self with divine spiritual guidance. Expert tarot readings, astrology, chakra healing, manifestation coaching, and ancestral wisdom from Mamaga Judith Etornam in Ghana.",
  keywords: [
    "spiritual guidance",
    "tarot reading",
    "tarot card reader",
    "astrology",
    "zodiac readings",
    "chakra healing",
    "energy healing",
    "manifestation",
    "law of attraction",
    "spiritual awakening",
    "mystic",
    "oracle",
    "divine guidance",
    "meditation",
    "sacred geometry",
    "ancestral wisdom",
    "spiritual teacher Ghana",
    "online tarot reading",
    "psychic reading",
    "spiritual consultation",
    "Mamaga Judith Etornam",
    "Lumina Oracles",
  ],
  authors: [{ name: "Mamaga Judith Etornam" }],
  creator: "Mamaga Judith Etornam",
  publisher: "Lumina Oracles",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://luminaoracles.com",
    siteName: "Lumina Oracles",
    title: "Lumina Oracles | Spiritual Guidance & Tarot Readings",
    description: "Connect to your higher self with divine spiritual guidance. Expert tarot readings, astrology, and mystical wisdom.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumina Oracles | Spiritual Guidance",
    description: "Connect to your higher self with divine spiritual guidance.",
  },
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
      <head>
        <Analytics />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${calligraffitti.variable} antialiased`}
      >
        <SanctuaryBackground />
        <Header />
        <MobileHeader />
        <Breadcrumbs />
        <StructuredData />
        <AEOSchemas />
        <BackgroundAudio />
        {children}
        <Footer />
        <MarqueeFooter />
        <ScrollToTop />
      </body>
    </html>
  );
}
