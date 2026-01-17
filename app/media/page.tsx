
import { Metadata } from "next";
import TikTokEmbed from "@/components/TikTokEmbed";

export const metadata: Metadata = {
    title: "Media | Lumina Oracles - Spiritual Videos & Wisdom",
    description: "Explore spiritual teachings, tarot readings, and mystical wisdom videos from Mamaga Judith Etornam. Watch our latest media content and live sessions.",
    openGraph: {
        title: "Media | Lumina Oracles - Spiritual Videos & Wisdom",
        description: "Explore spiritual teachings, tarot readings, and mystical wisdom videos from Mamaga Judith Etornam. Watch our latest media content and live sessions.",
        images: ["/og-media.png"],
    },
};

export default function MediaPage() {
    return <TikTokEmbed />;
}
