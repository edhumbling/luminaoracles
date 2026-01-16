
import { Metadata } from "next";
import TikTokEmbed from "@/components/TikTokEmbed";

export const metadata: Metadata = {
    title: "TikTok Live | Lumina Oracles",
    description: "Watch live spiritual guidance, tarot readings, and mystical teachings from Mamaga Judith Etornam on TikTok.",
    openGraph: {
        title: "TikTok Live | Lumina Oracles",
        description: "Watch live spiritual guidance, tarot readings, and mystical teachings from Mamaga Judith Etornam on TikTok.",
        images: ["/og-media.png"],
    },
};

export default function MediaPage() {
    return <TikTokEmbed />;
}
