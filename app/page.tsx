import Hero from "@/components/Hero";
import ServiceGrid from "@/components/ServiceGrid";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-lumina-cyan selection:text-background">
      <Hero />
      <ServiceGrid />
      <ContactSection />
    </main>
  );
}
