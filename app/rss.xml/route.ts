import { BLOG_POSTS } from '@/lib/blog-data';

// Required for static export (output: 'export')
export const dynamic = 'force-static';

export async function GET() {
    const baseUrl = 'https://luminaoracles.com';

    const rssItems = BLOG_POSTS
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 20)
        .map(post => {
            const pubDate = new Date(post.date).toUTCString();
            // Strip HTML tags from content for description
            const description = post.excerpt.replace(/<[^>]*>/g, '');

            return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blogs/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blogs/${post.slug}</guid>
      <description><![CDATA[${description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>goddessgreat16@gmail.com (Mamaga Judith Etornam)</author>
      <category>${post.category}</category>
    </item>`;
        })
        .join('');

    const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Lumina Oracles - Sacred Wisdom Blog</title>
    <link>${baseUrl}/blogs</link>
    <description>Spiritual guidance, tarot readings, astrology, and mystical wisdom from Mamaga Judith Etornam. Explore articles on manifestation, chakra healing, meditation, and spiritual awakening.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>Lumina Oracles</title>
      <link>${baseUrl}</link>
    </image>
    <copyright>© ${new Date().getFullYear()} Lumina Oracles. All rights reserved.</copyright>
    <managingEditor>goddessgreat16@gmail.com (Mamaga Judith Etornam)</managingEditor>
    <webMaster>goddessgreat16@gmail.com (Mamaga Judith Etornam)</webMaster>
    <ttl>60</ttl>
    ${rssItems}
  </channel>
</rss>`;

    return new Response(rssFeed, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
