
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Judith Avotri - Founder | Lumina Oracles",
  description: "Meet Judith Avotri, the spiritual teacher and mystic behind Lumina Oracles. Discover her journey of spiritual awakening and dedication to divine guidance.",
  openGraph: {
    title: "Judith Avotri - Founder | Lumina Oracles",
    description: "Meet Judith Avotri, the spiritual teacher and mystic behind Lumina Oracles. Discover her journey of spiritual awakening and dedication to divine guidance.",
    type: "profile",
    images: [
      {
        url: "/founder-placeholder.jpg", // Placeholder or default
        width: 1200,
        height: 630,
        alt: "Judith Avotri - Founder of Lumina Oracles",
      },
    ],
  },
};

export default function FounderPage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-background text-foreground pt-24 md:pt-32 pb-20 px-6 md:px-12 lg:px-24">
      {/* Creamy Glowy Top Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-lumina-gold/20 via-lumina-lavender/10 to-transparent blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-calligraffitti)] text-center text-lumina-gold mb-12 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] animate-breath">
          The Founder
        </h1>

        <div className="prose prose-lg dark:prose-invert md:prose-xl max-w-none font-light leading-relaxed">
          {/* Image Placeholder - Immersed in text */}
          <div className="float-right ml-8 mb-8 relative w-80 h-[400px] md:w-96 md:h-[500px] lg:w-[420px] lg:h-[560px] rounded-2xl overflow-hidden border border-lumina-gold/30 shadow-[0_0_30px_rgba(250,204,21,0.15)] group bg-background/50 backdrop-blur-sm">
            {/* Placeholder Content */}
            <div className="absolute inset-0 bg-gradient-to-br from-lumina-gold/10 to-lumina-lavender/10 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-20 h-20 rounded-full border border-lumina-gold/30 flex items-center justify-center mb-4">
                <span className="text-4xl">✨</span>
              </div>
              <p className="font-[family-name:var(--font-calligraffitti)] text-lumina-gold text-xl">
                Judith Avotri
              </p>
              <p className="text-xs uppercase tracking-widest opacity-50 mt-2">
                Image Placeholder
              </p>
            </div>

            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>

          <p className="first-letter:text-5xl first-letter:font-[family-name:var(--font-calligraffitti)] first-letter:text-lumina-gold first-letter:mr-2 first-letter:float-left">
            Judith Avotri is a spiritual teacher and practitioner of mysticism from Ghana. With a deep dedication to exploring and sharing the spiritual and mystical teachings, Judith guides others on their journey toward spiritual awakening and enlightenment.
          </p>

          <p className="mt-6">
            Her work is rooted in her rich cultural heritage and her passion for helping individuals connect with their higher selves. As a practicing mystic, Judith offers insights and teachings that inspire growth, inner peace, and a profound understanding of the divine.
          </p>

          <p className="mt-6">
            Through her guidance, many have found pathways to greater spiritual fulfillment and self-discovery. She embodies the sacred bridge between ancient wisdom and modern understanding, holding a lantern for those seeking to traverse the mists of the unknown.
          </p>
        </div>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-4 mt-16 opacity-30">
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-lumina-gold to-transparent" />
          <div className="w-2 h-2 rotate-45 border border-lumina-gold" />
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-lumina-gold to-transparent" />
        </div>
      </div>
    </main>
  );
}
