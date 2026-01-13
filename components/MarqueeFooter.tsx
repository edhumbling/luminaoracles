"use client";

import { Arimo } from "next/font/google";

const arimo = Arimo({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-arimo",
});

export default function MarqueeFooter() {
  // Repeat the text multiple times to ensure seamless infinite scroll
  const text = "Lumina Oracles";
  const repeatCount = 10;
  const repeatedText = Array(repeatCount).fill(text).join(" • ");

  return (
    <div
      className={`${arimo.className} relative w-full bg-black overflow-hidden py-4 md:py-8`}
    >
      {/* Gradient overlays for seamless fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Scrolling container */}
      <div className="marquee-container">
        <div className="marquee-content">
          <span className="marquee-text">{repeatedText}</span>
          <span className="marquee-text" aria-hidden="true">
            {repeatedText}
          </span>
        </div>
      </div>

      <style jsx>{`
        .marquee-container {
          width: 100%;
          overflow: hidden;
        }

        .marquee-content {
          display: flex;
          width: fit-content;
          animation: marquee 160s linear infinite;
        }

        .marquee-text {
          display: inline-block;
          white-space: nowrap;
          font-size: 30vw;
          font-weight: 900;
          line-height: 1;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          color: #ffffff;
          text-shadow:
            0 0 20px rgba(255, 255, 255, 0.9),
            0 0 40px rgba(255, 255, 255, 0.7),
            0 0 80px rgba(255, 255, 255, 0.5),
            0 0 120px rgba(255, 255, 255, 0.3);
          padding-right: 2vw;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes shimmer {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        /* Desktop - extremely huge */
        @media (min-width: 768px) {
          .marquee-text {
            font-size: 25vw;
          }
          .marquee-content {
            animation-duration: 240s;
          }
        }

        /* Large desktop - even bigger */
        @media (min-width: 1280px) {
          .marquee-text {
            font-size: 20vw;
          }
          .marquee-content {
            animation-duration: 320s;
          }
        }

        /* Mobile - still huge */
        @media (max-width: 767px) {
          .marquee-text {
            font-size: 35vw;
          }
          .marquee-content {
            animation-duration: 120s;
          }
        }
      `}</style>
    </div>
  );
}
