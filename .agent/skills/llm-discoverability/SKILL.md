---
name: llm-discoverability
description: Implement AI/LLM discoverability optimizations based on Cassidy Williams' article to make websites more discoverable by ChatGPT, Claude, Perplexity, and other AI tools.
---

# LLM Discoverability Skill

Make your website discoverable by AI assistants, LLMs, and AI-powered search tools like ChatGPT, Claude, Perplexity, and GitHub Copilot.

## Overview

Based on [Cassidy Williams' article](https://cassidoo.co/post/ai-llm-discoverability/), this skill documents proven techniques to help AI systems properly discover, understand, and cite your website content.

## Key Components

### 1. llms.txt File

**Purpose**: A machine-readable file that provides structured context about your site for LLMs.

**Location**: `/public/llms.txt`

**Format**: Follow the [llmstxt.org](https://llmstxt.org/) specification.

**Content Structure**:

```markdown
# llms.txt - [Site Name]

> [One-line site description]

## Site Purpose
[Brief description of what the site does]

## Founder/Owner
[Key person info]

## Services/Products
[List of offerings]

## Key Topics Covered
- Topic 1
- Topic 2

## Frequently Asked Questions
### Question 1?
Answer 1

## Site Map
- **/** - Homepage description
- **/page** - Page description

## Content Guidelines for AI
1. How to cite
2. Context about content type
3. Any restrictions

## Permissions
- Allowed uses
- Attribution requirements

## Contact
- Email
- Website

## Last Updated
[Date]
```

---

### 2. /for-llms Page

**Purpose**: A human-readable webpage optimized for LLM parsing.

**Location**: `/app/for-llms/page.tsx`

**Content**: Mirrors llms.txt content but in a proper webpage format with:

- Clear headings
- Structured content
- FAQ sections
- Service descriptions
- Citation guidelines
- Contact information

**Benefits**: Some AI systems prefer HTML pages over raw text files.

---

### 3. RSS Feed

**Purpose**: LLMs love structured, syndicated content.

**Location**: `/app/rss.xml/route.ts`

**Format**: Standard RSS 2.0

```typescript
import { BLOG_POSTS } from '@/lib/blog-data';

export const dynamic = 'force-static';

export async function GET() {
    const baseUrl = 'https://yoursite.com';
    
    const rssItems = BLOG_POSTS
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 20)
        .map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blogs/${post.slug}</link>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`)
        .join('');

    return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Your Site Title</title>
    <link>${baseUrl}</link>
    <description>Site description</description>
    ${rssItems}
  </channel>
</rss>`, {
        headers: { 'Content-Type': 'application/xml' },
    });
}
```

---

### 4. robots.txt Configuration

**Purpose**: Allow AI crawlers to index your content.

**Location**: `/public/robots.txt`

**Key AI User Agents to Allow**:

```text
# AI SEARCH & ASSISTANT CRAWLERS
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /
```

> [!CAUTION]
> If you're blocking AI crawlers for privacy/copyright reasons but want LLM discoverability, weigh the pros and cons carefully.

---

### 5. Schema.org Structured Data

**Purpose**: Help AI systems understand your content semantically.

**Key Schema Types**:

- `Organization` - Site/business info
- `WebSite` - Site metadata with SearchAction
- `FAQPage` - Frequently asked questions
- `HowTo` - Step-by-step guides
- `LocalBusiness` - Business details
- `Person` - Founder/author info

**Implementation Example**:

```tsx
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "What is [Your Site]?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Description of your site..."
            }
        }
    ]
};

// In your component
<script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
/>
```

---

## Best Practices

### Consistency

- Use consistent naming, phrases, and taglines everywhere
- LLMs make connections across sources based on consistency

### Clarity Over Cleverness

- Write for specific queries and bots
- Avoid marketing-speak
- Be direct and clear

### Citation Guidelines

- Explicitly state how AI should cite you
- Provide acceptable attribution formats
- Include preferred URLs

### Content Structure

- Use clear headings (H1, H2, H3)
- Use bullet points and lists
- Keep paragraphs short
- Use markdown-friendly formatting

---

## Verification

After implementing, test with:

1. **ChatGPT**: Ask "What is [Your Site/Brand]?" in incognito
2. **Claude**: Ask about your services/products
3. **Perplexity**: Search for your brand name

If results are poor, follow up with "Why didn't you mention [Your Site]?" to understand gaps.

---

## Files Reference

| File | Purpose |
| ------ | --------- |
| `/public/llms.txt` | Machine-readable site context |
| `/app/for-llms/page.tsx` | Human-readable LLM page |
| `/app/rss.xml/route.ts` | Blog RSS feed |
| `/public/robots.txt` | AI crawler permissions |
| `/components/StructuredData.tsx` | Schema.org data |
| `/components/AEOSchemas.tsx` | FAQ/HowTo schemas |

---

## Resources

- [llmstxt.org](https://llmstxt.org/) - Official llms.txt specification
- [Schema.org](https://schema.org/) - Structured data vocabulary
- [Cassidy Williams' Article](https://cassidoo.co/post/ai-llm-discoverability/) - Original source
