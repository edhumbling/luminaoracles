"use client";

import Link from "next/link";
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
};

export default function Breadcrumbs() {
    const pathname = usePathname();

    // Don't show breadcrumbs on homepage
    if (pathname === "/") return null;

    const segments = pathname.split("/").filter(Boolean);

    const breadcrumbs: BreadcrumbItem[] = [
        { name: "Home", href: "/" },
        ...segments.map((segment, index) => ({
            name: pathNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
            href: "/" + segments.slice(0, index + 1).join("/"),
        })),
    ];

    // JSON-LD structured data for Google
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

    return (
        <>
            {/* JSON-LD for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Visual Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="py-4 px-6 md:px-12 lg:px-24">
                <ol className="flex items-center gap-2 text-sm text-white/50">
                    {breadcrumbs.map((crumb, index) => (
                        <li key={crumb.href} className="flex items-center gap-2">
                            {index > 0 && <span className="text-lumina-gold/30">›</span>}
                            {index === breadcrumbs.length - 1 ? (
                                <span className="text-lumina-gold font-medium">{crumb.name}</span>
                            ) : (
                                <Link
                                    href={crumb.href}
                                    className="hover:text-lumina-gold transition-colors duration-200"
                                >
                                    {crumb.name}
                                </Link>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    );
}
