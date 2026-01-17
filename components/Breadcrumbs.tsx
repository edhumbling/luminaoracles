"use client";

import { usePathname } from "next/navigation";

interface BreadcrumbItem {
    name: string;
    href: string;
}

const pathNames: Record<string, string> = {
    services: "Spiritual Services",
    blogs: "Sacred Wisdom",
    media: "TikTok Live",
    about: "About",
    contact: "Contact",
    "goddess-ai": "Goddess AI", // Add mapping for Goddess AI route
};

export default function Breadcrumbs() {
    const pathname = usePathname();

    // Don't render anything on homepage
    if (pathname === "/") return null;

    const segments = pathname.split("/").filter(Boolean);

    const breadcrumbs: BreadcrumbItem[] = [
        { name: "Home", href: "/" },
        ...segments.map((segment, index) => ({
            name: pathNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
            href: "/" + segments.slice(0, index + 1).join("/"),
        })),
    ];

    // JSON-LD structured data for Google (invisible SEO only)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.name,
            item: `https://luminaoracles.com${crumb.href}`,
        })),
    };

    // Only render the invisible JSON-LD script for SEO - no visual element
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
