"use client";

import { usePathname } from "next/navigation";

interface BreadcrumbItem {
    name: string;
    href: string;
}

// Main section path names
const pathNames: Record<string, string> = {
    services: "Spiritual Services",
    blogs: "Sacred Wisdom",
    media: "TikTok Live",
    about: "About",
    contact: "Contact",
    "goddess-ai": "Goddess AI",
    "wall-of-love": "Wall of Love",
};

// Service slugs to proper names
const serviceNames: Record<string, string> = {
    "spiritual-consultation": "Spiritual Consultation",
    "psychic-readings": "Psychic Readings",
    "meditation-guidance": "Meditation Guidance",
    "energy-healing": "Energy Healing",
    "spiritual-coaching": "Spiritual Coaching",
    "manifestation-guidance": "Manifestation Guidance",
    "spiritual-workshops": "Spiritual Workshops",
    "intuitive-guidance": "Intuitive Guidance",
};

// Helper to humanize a slug
function humanizeSlug(slug: string): string {
    // Check service names first
    if (serviceNames[slug]) return serviceNames[slug];
    // Check main path names
    if (pathNames[slug]) return pathNames[slug];
    // Default: capitalize and replace hyphens with spaces
    return slug
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export default function Breadcrumbs() {
    const pathname = usePathname();

    // Don't render anything on homepage
    if (pathname === "/") return null;

    const segments = pathname.split("/").filter(Boolean);

    const breadcrumbs: BreadcrumbItem[] = [
        { name: "Home", href: "/" },
        ...segments.map((segment, index) => ({
            name: humanizeSlug(segment),
            href: "/" + segments.slice(0, index + 1).join("/"),
        })),
    ];

    // JSON-LD structured data for Google
    // Per Google's guidelines: last item should NOT include "item" URL
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, index) => {
            const isLastItem = index === breadcrumbs.length - 1;

            // Base structure
            const listItem: {
                "@type": string;
                position: number;
                name: string;
                item?: string;
            } = {
                "@type": "ListItem",
                position: index + 1,
                name: crumb.name,
            };

            // Only add item URL if not the last breadcrumb
            if (!isLastItem) {
                listItem.item = `https://luminaoracles.com${crumb.href}`;
            }

            return listItem;
        }),
    };

    // Only render the invisible JSON-LD script for SEO - no visual element
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

