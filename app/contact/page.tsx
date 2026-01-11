import ContactSection from "@/components/ContactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact | Lumina Oracles",
    description: "Reach out to Lumina Oracles for sacred spiritual consultation and divine guidance.",
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-background text-foreground pt-16 md:pt-0">
            <ContactSection />
        </main>
    );
}
