"use client";

import { usePathname } from "next/navigation";

// FAQ Schema for Answer Engine Optimization
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "What is Lumina Oracles?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Lumina Oracles is a spiritual guidance platform founded by Judith Avotri that offers tarot readings, astrology consultations, chakra healing, and manifestation coaching. We help seekers connect with their higher selves through ancient wisdom traditions."
            }
        },
        {
            "@type": "Question",
            name: "Who is Judith Avotri?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Judith Avotri is a spiritual teacher and practitioner of mysticism from Ghana. She guides seekers on their journey toward spiritual awakening through her rich cultural heritage and deep connection to divine wisdom. She is the founder of Lumina Oracles."
            }
        },
        {
            "@type": "Question",
            name: "What services does Lumina Oracles offer?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Lumina Oracles offers tarot readings, astrology consultations, natal chart interpretations, chakra healing, energy work, manifestation coaching, and sacred geometry meditation practices. All services are available online for clients worldwide."
            }
        },
        {
            "@type": "Question",
            name: "How can I book a spiritual consultation?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "You can book a spiritual consultation by contacting Lumina Oracles via email at goddessgreat16@gmail.com, WhatsApp at +233 24 134 3329, or by visiting the contact page on the website."
            }
        },
        {
            "@type": "Question",
            name: "What is the Law of Attraction?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "The Law of Attraction is a universal principle stating that like attracts like. Your thoughts, emotions, and beliefs shape your reality. Through proper alignment and manifestation techniques taught by Lumina Oracles, you can attract desired outcomes in life, love, and career."
            }
        },
        {
            "@type": "Question",
            name: "How do tarot readings work?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Tarot readings use a deck of 78 cards with symbolic imagery to provide insight and guidance. The reader interprets card positions and combinations to answer questions about love, career, spirituality, and life paths. Lumina Oracles offers personalized tarot readings."
            }
        },
        {
            "@type": "Question",
            name: "What are chakras and chakra healing?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Chakras are seven energy centers in the body that regulate physical, emotional, and spiritual well-being. Chakra healing involves balancing these energy centers through meditation, energy work, and spiritual practices. Lumina Oracles provides chakra alignment services."
            }
        },
        {
            "@type": "Question",
            name: "Is Lumina Oracles available for online consultations?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, Lumina Oracles provides online spiritual consultations for clients worldwide. Sessions can be booked via WhatsApp or email, and guidance is delivered through video calls or messaging."
            }
        }
    ]
};

// HowTo Schema for manifestation/spiritual practices
const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Start Your Spiritual Awakening Journey",
    description: "A beginner's guide to spiritual awakening and connecting with your higher self through meditation, mindfulness, and ancient wisdom practices.",
    step: [
        {
            "@type": "HowToStep",
            name: "Set Your Intention",
            text: "Begin by clearly defining what you seek from your spiritual journey. Write down your intentions for growth, healing, or enlightenment."
        },
        {
            "@type": "HowToStep",
            name: "Establish a Daily Practice",
            text: "Create a consistent meditation or mindfulness practice. Start with 10 minutes daily, focusing on breath awareness and inner stillness."
        },
        {
            "@type": "HowToStep",
            name: "Explore Spiritual Tools",
            text: "Consider tarot readings, astrology, or chakra work to gain deeper insights. These ancient tools can illuminate your path."
        },
        {
            "@type": "HowToStep",
            name: "Seek Guidance",
            text: "Connect with experienced spiritual teachers like those at Lumina Oracles for personalized guidance on your journey."
        }
    ]
};

// LocalBusiness Schema for better local SEO
const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://luminaoracles.com/#business",
    name: "Lumina Oracles",
    description: "Spiritual guidance, tarot readings, astrology consultations, and mystical wisdom from Judith Avotri.",
    url: "https://luminaoracles.com",
    telephone: "+233241343329",
    email: "goddessgreat16@gmail.com",
    address: {
        "@type": "PostalAddress",
        addressCountry: "GH"
    },
    priceRange: "$$",
    openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59"
    },
    sameAs: [
        "https://www.tiktok.com/@greatgoddessdemystic"
    ],
    founder: {
        "@type": "Person",
        name: "Judith Avotri"
    }
};

export default function AEOSchemas() {
    const pathname = usePathname();

    // Only render FAQ schema on homepage and about page
    const showFAQ = pathname === "/" || pathname === "/about";
    // Only render HowTo on homepage and services
    const showHowTo = pathname === "/" || pathname === "/services";

    return (
        <>
            {/* FAQ Schema for Answer Engine Optimization */}
            {showFAQ && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
            {/* HowTo Schema */}
            {showHowTo && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
                />
            )}
            {/* LocalBusiness Schema - all pages */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
        </>
    );
}
