
import ServiceGrid from "@/components/ServiceGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Services | Lumina Oracles",
    description: "Explore our divine spiritual services and sacred offerings.",
};

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-black pt-24">
            <ServiceGrid />
        </main>
    );
}
