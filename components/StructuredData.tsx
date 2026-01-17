"use client";

import { usePathname } from "next/navigation";

// Organization Schema - appears on all pages
const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://luminaoracles.com/#organization",
    name: "Lumina Oracles",
    legalName: "Lumina Oracles",
    url: "https://luminaoracles.com",
    logo: {
        "@type": "ImageObject",
        "@id": "https://luminaoracles.com/#logo",
        url: "https://luminaoracles.com/logo.png",
        contentUrl: "https://luminaoracles.com/logo.png",
        width: 512,
        height: 512,
        caption: "Lumina Oracles Logo"
    },
    image: {
        "@type": "ImageObject",
        url: "https://luminaoracles.com/logo.png",
        width: 512,
        height: 512
    },
    description: "Spiritual guidance, tarot readings, astrology, and mystical wisdom from Mamaga Judith Etornam.",
    founder: {
        "@type": "Person",
        name: "Mamaga Judith Etornam",
        jobTitle: "Spiritual Teacher & Mystic",
        image: "https://ik.imagekit.io/humbling/damn.jpg",
        sameAs: [
            "https://www.tiktok.com/@greatgoddessdemystic"
        ]
    },
    contactPoint: {
        "@type": "ContactPoint",
        telephone: "+233-24-134-3329",
        contactType: "customer service",
        email: "goddessgreat16@gmail.com",
        availableLanguage: ["English"]
    },
    sameAs: [
        "https://www.tiktok.com/@greatgoddessdemystic"
    ],
    address: {
        "@type": "PostalAddress",
        addressCountry: "GH"
    }
};

// WebSite Schema - for sitelinks search box
const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://luminaoracles.com/#website",
    url: "https://luminaoracles.com",
    name: "Lumina Oracles",
    alternateName: ["Lumina Oracles", "LuminaOracles"],
    description: "Spiritual guidance and mystical wisdom",
    publisher: {
        "@id": "https://luminaoracles.com/#organization"
    },
    potentialAction: {
        "@type": "SearchAction",
        target: {
            "@type": "EntryPoint",
            urlTemplate: "https://luminaoracles.com/blogs?search={search_term_string}"
        },
        "query-input": "required name=search_term_string"
    }
};

export default function StructuredData() {
    const pathname = usePathname();

    // Page-specific schemas
    const getPageSchema = () => {
        switch (pathname) {
            case "/":
                return {
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    "@id": "https://luminaoracles.com/#webpage",
                    url: "https://luminaoracles.com",
                    name: "Lumina Oracles - Spiritual Guidance & Tarot Readings",
                    description: "Connect to your higher self with divine spiritual guidance. Expert tarot readings, astrology, chakra healing, and manifestation coaching.",
                    isPartOf: { "@id": "https://luminaoracles.com/#website" },
                    about: { "@id": "https://luminaoracles.com/#organization" },
                    primaryImageOfPage: {
                        "@type": "ImageObject",
                        url: "https://luminaoracles.com/og-image.png"
                    }
                };
            case "/services":
                return {
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "@id": "https://luminaoracles.com/services#service",
                    name: "Spiritual Consultation Services",
                    provider: { "@id": "https://luminaoracles.com/#organization" },
                    description: "Professional spiritual services including tarot readings, astrology consultations, chakra healing, and manifestation coaching.",
                    serviceType: ["Tarot Reading", "Astrology", "Chakra Healing", "Spiritual Guidance"],
                    areaServed: "Worldwide"
                };
            case "/about":
                return {
                    "@context": "https://schema.org",
                    "@type": "ProfilePage",
                    "@id": "https://luminaoracles.com/about#profile",
                    mainEntity: {
                        "@type": "Person",
                        name: "Mamaga Judith Etornam",
                        jobTitle: "Spiritual Teacher & Mystic",
                        description: "Spiritual teacher and practitioner of mysticism from Ghana, dedicated to guiding others on their journey toward spiritual awakening.",
                        image: "https://ik.imagekit.io/humbling/damn.jpg",
                        nationality: {
                            "@type": "Country",
                            name: "Ghana"
                        },
                        knowsAbout: ["Tarot", "Astrology", "Chakra Healing", "Spirituality", "Manifestation"],
                        worksFor: { "@id": "https://luminaoracles.com/#organization" }
                    }
                };
            case "/blogs":
                return {
                    "@context": "https://schema.org",
                    "@type": "Blog",
                    "@id": "https://luminaoracles.com/blogs#blog",
                    name: "Lumina Oracles Blog - Sacred Wisdom",
                    description: "Articles on spirituality, tarot, astrology, manifestation, and mystical wisdom.",
                    publisher: { "@id": "https://luminaoracles.com/#organization" },
                    blogPost: []
                };
            case "/contact":
                return {
                    "@context": "https://schema.org",
                    "@type": "ContactPage",
                    "@id": "https://luminaoracles.com/contact#contact",
                    name: "Contact Lumina Oracles",
                    description: "Get in touch with Mamaga Judith Etornam for spiritual guidance and consultations.",
                    mainEntity: { "@id": "https://luminaoracles.com/#organization" }
                };
            case "/media":
                return {
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "@id": "https://luminaoracles.com/media#collection",
                    name: "Lumina Oracles Media - Spiritual Videos & Teachings",
                    description: "A collection of spiritual videos, live sessions, and mystical teachings by Mamaga Judith Etornam.",
                    publisher: { "@id": "https://luminaoracles.com/#organization" }
                };
            default:
                return null;
        }
    };

    const pageSchema = getPageSchema();

    return (
        <>
            {/* Organization Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            {/* WebSite Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            {/* Page-specific Schema */}
            {pageSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
                />
            )}
        </>
    );
}
