
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Judith Avotri | Lumina Oracles",
  description: "Meet Judith Avotri, the spiritual teacher and mystic behind Lumina Oracles. Discover her journey of spiritual awakening and dedication to divine guidance.",
  openGraph: {
    title: "About Judith Avotri | Lumina Oracles",
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

export default function AboutPage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-background text-foreground pt-24 md:pt-32 pb-20 px-6 md:px-12 lg:px-24">
      {/* Creamy Glowy Top Effect */}
      {/* Hero Background Image - Spiritual Lines */}
      <div className="absolute top-0 left-0 w-full h-[700px] pointer-events-none z-0 overflow-hidden">
        <Image
          src="/founder-hero-new.png"
          alt="Sacred Geometry Spiritual Lines"
          fill
          className="object-cover opacity-80 mix-blend-normal animate-pulse-slow"
          priority
        />
        {/* Gradient Overlay for blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-lumina-gold/5 via-transparent to-transparent" />
      </div>

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

        {/* Mission & Vision Section - Redesigned for Clarity & Impact */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Mission */}
          <div className="relative p-8 rounded-2xl bg-zinc-900/90 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 rounded-full bg-lumina-gold/10 flex items-center justify-center mb-6 text-2xl border border-lumina-gold/20 shadow-[0_0_15px_rgba(250,204,21,0.1)] group-hover:shadow-[0_0_25px_rgba(250,204,21,0.3)] transition-shadow">
              🏛️
            </div>
            <h3 className="text-2xl font-[family-name:var(--font-calligraffitti)] text-lumina-gold mb-4">
              The Sacred Design
            </h3>
            <p className="text-base font-light leading-relaxed text-gray-200">
              To reawaken the dormant divinity encoded within the human spirit. Our mission is to provide the architectural blueprints for the soul's ascension, guiding seekers through the labyrinth of existence with the unwavering lamp of ancient truth.
            </p>
          </div>

          {/* Vision for the Collective (Global) */}
          <div className="relative p-8 rounded-2xl bg-zinc-900/90 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 rounded-full bg-lumina-gold/10 flex items-center justify-center mb-6 text-2xl border border-lumina-gold/20 shadow-[0_0_15px_rgba(250,204,21,0.1)] group-hover:shadow-[0_0_25px_rgba(250,204,21,0.3)] transition-shadow">
              🌍
            </div>
            <h3 className="text-2xl font-[family-name:var(--font-calligraffitti)] text-lumina-gold mb-4">
              Vision for the Collective
            </h3>
            <p className="text-base font-light leading-relaxed text-gray-200">
              We envision a world that stands as a fortress of spiritual sovereignty. A global reality where the rhythmic heartbeat of ancient wisdom harmonizes with the pulse of the future, creating a sanctuary where every soul across the earth walks in the fullness of their power and purpose.
            </p>
          </div>

          {/* Impact */}
          <div className="relative p-8 rounded-2xl bg-zinc-900/90 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 rounded-full bg-lumina-gold/10 flex items-center justify-center mb-6 text-2xl border border-lumina-gold/20 shadow-[0_0_15px_rgba(250,204,21,0.1)] group-hover:shadow-[0_0_25px_rgba(250,204,21,0.3)] transition-shadow">
              🌊
            </div>
            <h3 className="text-2xl font-[family-name:var(--font-calligraffitti)] text-lumina-gold mb-4">
              The Ripple Effect
            </h3>
            <p className="text-base font-light leading-relaxed text-gray-200">
              We do not merely heal individuals; we weave a tapestry of awakened consciousness. Our impact is measured not in numbers, but in the silent revolutions of the heart—lives transformed, families restored, and a collective destiny elevated to the realm of the divine.
            </p>
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-4 mt-16 opacity-30">
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-lumina-gold to-transparent" />
          <div className="w-2 h-2 rotate-45 border border-lumina-gold" />
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-lumina-gold to-transparent" />
        </div>

        {/* Connect with Me Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-calligraffitti)] text-lumina-gold mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
            Connect with Me
          </h2>

          <div className="flex items-center justify-center gap-6">
            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@greatgoddessdemystic?_r=1&_t=ZS-92w5SVgScbY"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-14 h-14 rounded-full bg-lumina-gold/10 border border-lumina-gold/30 flex items-center justify-center text-lumina-gold/70 hover:text-lumina-gold hover:border-lumina-gold hover:bg-lumina-gold/20 hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(250,204,21,0.1)] hover:shadow-[0_0_25px_rgba(250,204,21,0.3)]"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>

            {/* Email */}
            <a
              href="mailto:goddessgreat16@gmail.com"
              aria-label="Email"
              className="w-14 h-14 rounded-full bg-lumina-gold/10 border border-lumina-gold/30 flex items-center justify-center text-lumina-gold/70 hover:text-lumina-gold hover:border-lumina-gold hover:bg-lumina-gold/20 hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(250,204,21,0.1)] hover:shadow-[0_0_25px_rgba(250,204,21,0.3)]"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/233241343329"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-14 h-14 rounded-full bg-lumina-gold/10 border border-lumina-gold/30 flex items-center justify-center text-lumina-gold/70 hover:text-lumina-gold hover:border-lumina-gold hover:bg-lumina-gold/20 hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(250,204,21,0.1)] hover:shadow-[0_0_25px_rgba(250,204,21,0.3)]"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>

          {/* Email text display */}
          <p className="mt-6 text-sm text-foreground/50 font-mono tracking-wide">
            goddessgreat16@gmail.com
          </p>
        </div>
      </div>
    </main>
  );
}
