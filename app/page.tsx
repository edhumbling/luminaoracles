import Hero from "@/components/Hero";
import ServiceGrid from "@/components/ServiceGrid";
import ContactSection from "@/components/ContactSection";
import BackgroundAudio from "@/components/BackgroundAudio";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-lumina-cyan selection:text-background">
      <BackgroundAudio />
      <Hero />
      <ServiceGrid />
      <ContactSection />
    </main>
  );
}
