---
name: blog-feature
description: Comprehensive documentation on the architecture, implementation, and styling of the Lumina Oracles blog/article system. Covers SSG, search algorithms, SEO, and UI components.
---

# Blog Feature Architecture

This skill documents the complete implementation of the Blog/Article system for Lumina Oracles. The system is designed for high performance (Static Site Generation), superior SEO (Open Graph support), and a premium user experience (Weighted Search, Custom Typography).

## 1. Core Architecture

The blog is built using **Next.js 15+ App Router** with **TypeScript**. It utilizes a "data-as-code" approach to avoid heavy CMS dependencies for this specific scale, ensuring instant page loads via SSG.

### Directory Structure
```
/app
  /blogs
    /page.tsx           # Main listing page (Client-side Search Grid)
    /[slug]
      /page.tsx         # Individual Article Page (Server Component, SSG)
/components
  /BlogGrid.tsx         # Client-side Search & Filter Logic
  /BlogBackButton.tsx   # Smart navigation preserving scroll
  /ArticleShare.tsx     # Social Media Sharing
/lib
  /blog-data.ts         # Central Data Source (Types + Content)
/public
  /blog                 # Article thumbnail images
```

## 2. Data Layer (`lib/blog-data.ts`)

Instead of a database, all articles are stored in a constant `BLOG_POSTS` array. This allows Next.js to prerender all pages at build time.

### Data Model
```typescript
export interface BlogPost {
    id: string;
    slug: string;       // URL identifier
    title: string;
    excerpt: string;    // Used for SEO description
    content: string;    // HTML string (rendered via dangerouslySetInnerHTML)
    author: string;
    date: string;
    readTime: string;
    category: string;   // Used for filtering
    tags: string[];     // Used for search weighting
    image: string;      // Path to /public/blog/image.png
}
```

### Authority Links Policy
All `<u>` (underline) tags in the content have been converted to `<a>` tags pointing to reputable external authorities (Wikipedia, NIH, Harvard, etc.) to boost SEO credibility and user trust. The styling matches the site's "Lumina Gold" accent.

## 3. Individual Article Pages (`app/blogs/[slug]/page.tsx`)

### Static Generation
We use `generateStaticParams` to tell Next.js which paths to build.
```typescript
export async function generateStaticParams() {
    return getAllSlugs().map((slug) => ({ slug: slug.slug }));
}
```

### Dynamic Metadata & SEO
The `generateMetadata` function fetches the specific post to generate unique SEO tags.
- **Title**: `Post Title | Lumina Oracles Blog`
- **OG Image**: Uses `post.image` resolved against the `metadataBase` (absolute URL).
- **Description**: Uses `post.excerpt`.

### Typography & Layout
- **Font**: Uses `font-sans` (mapped to **Geist Sans**) for a clean, modern "Google Sans" aesthetic.
- **Weight**: Enforced `font-extralight` (200 weight) to look elegant and high-end, avoiding any "bold/clunky" appearance.
- **Design**:
  - Hero Image: Full width with gradient overlays.
  - Header Info: Date and Category are positioned **below** the title for hierarchy.
  - Content: Rendered inside a Tailwind `.prose` container with custom overrides for colors (`prose-headings:text-lumina-gold`).

## 4. Search & Filtering (`components/BlogGrid.tsx`)

The main `/blogs` page uses a client-side component to handle search, ensuring instant feedback without server roundtrips.

### Weighted Search Algorithm
The search is not a simple string match. It calculates a relevance score:
1.  **Title Match**: +10 points
2.  **Tag Match**: +5 points
3.  **Excerpt Match**: +3 points
4.  **Content Match**: +1 point

Results are sorted by this score descending.

### UX Features
- **Dynamic Categories**: Filter buttons are generated automatically from the `category` fields in `BLOG_POSTS`.
- **Glassmorphic UI**: Input and cards use `backdrop-blur` and `bg-white/5` for a premium glass feel.

## 5. Navigation Features

### Scroll Restoration (`components/BlogBackButton.tsx`)
Standard `Link` components reset scroll position. We use a custom component with `useRouter().back()` to ensure that when a user returns from an article to the main list, they are taken to their exact previous scroll position.

### Header Repositioning
The Back button on the article page is carefully positioned (`top-24 md:top-32`) to avoid overlapping the article title while staying clear of the main site navigation.

## 6. Social Sharing (`components/ArticleShare.tsx`)
A dedicated component handles sharing to:
- Facebook (`sharer.php`)
- X/Twitter (`intent/tweet`)
- LinkedIn, WhatsApp, Telegram, Pinterest.
- Includes a "Copy Link" feature with visual feedback.

## 7. Configuration Details
- **Tailwind V4**: Font mappings are set via `@theme` in `global.css` or implicitly via variables.
- **Metadata Base**: To ensure social images work, `metadataBase: new URL('https://luminaoracles.com')` is set in `app/layout.tsx`.

## How to Add a New Article
1.  Add a new entry to `BLOG_POSTS` in `lib/blog-data.ts`.
2.  Add a corresponding image to `public/blog/`.
3.  Ensure `slug` is unique.
4.  Write content with HTML tags (`<p>`, `<h2>`, etc.). **Do not use `<u>` tags**; use `<a href="..." target="_blank">` for authority links.
5.  Run `npm run build` to regenerate the static pages.
