---
name: google-site-identity
description: Fix Google Search site name displaying as domain and missing logo/favicon issues. Use when Google shows "example.com" instead of brand name, or when the site logo doesn't render in search results.
---

# Google Site Identity (Site Name & Logo)

This skill documents how to properly configure your website so Google displays your **brand name** (not domain) and **logo** in search results.

## Common Issues

1. **Site name shows as domain** - Google displays "example.com" instead of "Example Brand"
2. **Logo/favicon doesn't render** - Generic icon shown instead of your logo
3. **OG image not appearing** - Social previews show a blank or default image

## Root Causes

### Site Name Issue

Google determines site names from multiple signals. Without proper structured data, it defaults to the domain name.

### Logo Not Rendering

Most commonly caused by:

- **Missing OG image file** - Metadata references a file that doesn't exist (404 error)
- **Incorrect logo dimensions** - Google requires specific sizes
- **Missing structured data logo** - Organization schema not configured

## Solution Overview

Three components must be correctly configured:

1. **WebSite Structured Data** - Tells Google your preferred site name
2. **Organization Structured Data** - Provides logo and brand information
3. **Open Graph Image** - The actual image file in `/public` folder

---

## Implementation

### 1. WebSite Structured Data

Add to your structured data component. The `name` property is what Google uses for site name:

```tsx
const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://yoursite.com/#website",
    url: "https://yoursite.com",
    name: "Your Brand Name",           // Primary site name
    alternateName: [                   // Variations Google might look for
        "Your Brand Name",
        "YourBrandName",
        "yourbrandname"
    ],
    description: "Your site description.",
    inLanguage: "en-US",               // Required for proper indexing
    publisher: {
        "@id": "https://yoursite.com/#organization"
    },
    potentialAction: {
        "@type": "SearchAction",
        target: {
            "@type": "EntryPoint",
            urlTemplate: "https://yoursite.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
    }
};
```

### 2. Organization Structured Data

The logo must be properly structured with dimensions:

```tsx
const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://yoursite.com/#organization",
    name: "Your Brand Name",
    legalName: "Your Brand Name",
    url: "https://yoursite.com",
    logo: {
        "@type": "ImageObject",
        "@id": "https://yoursite.com/#logo",
        url: "https://yoursite.com/logo.png",
        contentUrl: "https://yoursite.com/logo.png",
        width: 512,                    // Must be square, 512x512 recommended
        height: 512,
        caption: "Your Brand Logo"
    },
    image: {
        "@type": "ImageObject",
        url: "https://yoursite.com/logo.png",
        width: 512,
        height: 512
    },
    description: "Your organization description.",
    // ... other organization properties
};
```

### 3. Next.js Metadata Configuration

In your `layout.tsx`, ensure the OG image file actually exists:

```tsx
export const metadata: Metadata = {
    metadataBase: new URL('https://yoursite.com'),
    title: {
        default: "Your Brand Name | Tagline",
        template: "%s | Your Brand Name",
    },
    applicationName: "Your Brand Name",
    description: "Your site description.",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://yoursite.com",
        siteName: "Your Brand Name",
        title: "Your Brand Name | Tagline",
        description: "Your site description.",
        images: ["/og-image.png"],     // MUST exist in /public folder!
    },
    icons: {
        icon: [
            { url: '/favicon.ico' },
            { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
        ],
        shortcut: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
    appleWebApp: {
        title: 'Your Brand Name',
    },
};
```

### 4. Required Files in `/public`

Ensure these files exist:

```text
public/
├── og-image.png          # 1200x630px - Social preview image
├── logo.png              # 512x512px - Square logo for structured data
├── favicon.ico           # Multi-size favicon
├── favicon-96x96.png     # 96x96px favicon
├── apple-touch-icon.png  # 180x180px Apple touch icon
└── site.webmanifest      # PWA manifest with name property
```

### 5. Web Manifest

The `site.webmanifest` should include your brand name:

```json
{
    "name": "Your Brand Name",
    "short_name": "BrandName",
    "icons": [
        {
            "src": "/web-app-manifest-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
        },
        {
            "src": "/web-app-manifest-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
        }
    ],
    "theme_color": "#1a0a2e",
    "background_color": "#1a0a2e",
    "display": "standalone"
}
```

---

## Troubleshooting Checklist

### Site Name Still Shows Domain

- [ ] `WebSite` structured data has `name` property set
- [ ] `alternateName` includes variations of your brand
- [ ] `inLanguage` property is set
- [ ] Structured data is on the homepage (root URL)
- [ ] Wait 2-7 days after deploying for Google to recrawl

### Logo Still Not Rendering

- [ ] **Verify file exists**: Check that `/public/og-image.png` exists
- [ ] **Check for 404s**: Visit `https://yoursite.com/og-image.png` directly
- [ ] Logo dimensions are correct (512x512 for logo, 1200x630 for OG image)
- [ ] Organization schema has proper `logo` ImageObject structure
- [ ] Request reindexing in Google Search Console

---

## Validation Tools

1. **Google Rich Results Test**: <https://search.google.com/test/rich-results>
2. **Schema.org Validator**: <https://validator.schema.org/>
3. **Facebook Sharing Debugger**: <https://developers.facebook.com/tools/debug/>
4. **Twitter Card Validator**: <https://cards-dev.twitter.com/validator>

---

## After Deploying

1. **Request Reindexing** in Google Search Console:
   - Go to URL Inspection
   - Enter your homepage URL
   - Click "Request Indexing"

2. **Clear social media caches**:
   - Use Facebook Sharing Debugger to scrape new info
   - Use Twitter Card Validator

3. **Wait time**: Google typically takes 2-7 days to update site name and logo in search results

---

## Reference

- [Google Site Name Documentation](https://developers.google.com/search/docs/appearance/site-names)
- [Google Logo Documentation](https://developers.google.com/search/docs/appearance/structured-data/logo)
- [Schema.org WebSite](https://schema.org/WebSite)
- [Schema.org Organization](https://schema.org/Organization)
