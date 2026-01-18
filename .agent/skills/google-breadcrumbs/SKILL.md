---
name: google-breadcrumb-structured-data
description: Implement Google-compliant BreadcrumbList structured data (JSON-LD) for SEO. Use when adding breadcrumb navigation, implementing schema.org markup, or improving search result appearance.
---

# Google Breadcrumb Structured Data

This skill documents how to implement Google-compliant breadcrumb structured data using JSON-LD format in a Next.js application.

## Overview

Breadcrumb structured data helps Google understand your site's hierarchy and can appear in search results as a breadcrumb trail, improving click-through rates.

## Google's Key Requirements

1. **Use JSON-LD format** - Preferred by Google over Microdata or RDFa
2. **Schema type**: `BreadcrumbList` containing `ListItem` elements
3. **Required properties per ListItem**:
   - `@type`: "ListItem"
   - `position`: Integer (1-indexed)
   - `name`: Human-readable page title
   - `item`: URL (OPTIONAL for the last item - Google uses current page URL)

4. **IMPORTANT**: The last breadcrumb item should NOT include the `item` URL property

## Implementation Pattern

### Component Structure

```tsx
"use client";

import { usePathname } from "next/navigation";

interface BreadcrumbItem {
    name: string;
    href: string;
}

// Map slugs to readable names
const pathNames: Record<string, string> = {
    services: "Services",
    blogs: "Blog",
    about: "About",
    contact: "Contact",
};

// For dynamic routes with slugs
const serviceNames: Record<string, string> = {
    "my-service": "My Service Name",
};

function humanizeSlug(slug: string): string {
    if (serviceNames[slug]) return serviceNames[slug];
    if (pathNames[slug]) return pathNames[slug];
    return slug
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export default function Breadcrumbs() {
    const pathname = usePathname();

    // Don't render on homepage
    if (pathname === "/") return null;

    const segments = pathname.split("/").filter(Boolean);

    const breadcrumbs: BreadcrumbItem[] = [
        { name: "Home", href: "/" },
        ...segments.map((segment, index) => ({
            name: humanizeSlug(segment),
            href: "/" + segments.slice(0, index + 1).join("/"),
        })),
    ];

    // Build JSON-LD - last item should NOT have "item" property
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, index) => {
            const isLastItem = index === breadcrumbs.length - 1;
            
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
            
            // Only add item URL if NOT the last breadcrumb
            if (!isLastItem) {
                listItem.item = `https://yourdomain.com${crumb.href}`;
            }
            
            return listItem;
        }),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
```

### Usage in Layout

Add the Breadcrumbs component to your root layout:

```tsx
// app/layout.tsx
import Breadcrumbs from "@/components/Breadcrumbs";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Breadcrumbs />
                {children}
            </body>
        </html>
    );
}
```

## Example Output

For a page at `/services/psychic-readings`:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://example.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://example.com/services"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Psychic Readings"
    }
  ]
}
```

## Validation

Test your implementation using:

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

## Reference

- [Google Breadcrumb Documentation](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [Schema.org BreadcrumbList](https://schema.org/BreadcrumbList)
