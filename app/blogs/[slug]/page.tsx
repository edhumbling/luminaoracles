import { getAllSlugs, getPostBySlug, getRelatedPosts } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import ArticleShare from "@/components/ArticleShare";
import BlogBackButton from "@/components/BlogBackButton";
import RelatedPosts from "@/components/RelatedPosts";

export async function generateStaticParams() {
    const slugs = getAllSlugs();
    return slugs.map((slug) => ({
        slug: slug.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: "Article Not Found",
        };
    }

    return {
        title: `${post.title} | Lumina Oracles Blog`,
        description: post.excerpt,
        keywords: post.tags.join(", "),
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.date,
            authors: [post.author],
            tags: post.tags,
            section: post.category,
            images: [
                {
                    url: post.image,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: [post.image],
        },
    };
}

// Article structured data for SEO
function getArticleSchema(post: { title: string; excerpt: string; author: string; date: string; image: string; slug: string; content: string; category: string; tags: string[] }) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        image: `https://luminaoracles.com${post.image}`,
        datePublished: post.date,
        dateModified: post.date,
        author: {
            "@type": "Person",
            name: post.author,
            url: "https://luminaoracles.com/about"
        },
        publisher: {
            "@type": "Organization",
            name: "Lumina Oracles",
            logo: {
                "@type": "ImageObject",
                url: "https://luminaoracles.com/logo.png"
            }
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://luminaoracles.com/blogs/${post.slug}`
        },
        articleSection: post.category,
        keywords: post.tags.join(", ")
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const articleSchema = getArticleSchema(post);
    const relatedPosts = getRelatedPosts(post.slug, post.category);

    return (
        <article className="min-h-screen bg-black text-white selection:bg-lumina-gold selection:text-black pb-24">
            {/* Article Structured Data for Google */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            {/* Header / Hero with Article Image */}
            <div className="relative w-full h-[60vh] min-h-[500px]">
                <div className="absolute inset-0 bg-black/60 z-10" />
                {/* Use the article-specific image */}
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-20" />

                {/* Back Link - Positioned below header */}
                <div className="absolute top-24 md:top-32 left-6 md:left-auto md:right-12 z-40">
                    <BlogBackButton />
                </div>

                {/* Title and Meta - Positioned at bottom of hero */}
                <div className="absolute bottom-0 left-0 right-0 z-30 container mx-auto px-6 pb-12 md:pb-20">
                    <div className="max-w-4xl">
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight mb-4 drop-shadow-xl text-white">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4">
                            <span className="bg-lumina-gold/20 text-lumina-gold border border-lumina-gold/30 px-2.5 py-1 text-[10px] md:text-xs uppercase tracking-widest rounded-full backdrop-blur-md font-medium">
                                {post.category}
                            </span>
                            <div className="flex items-center gap-2 text-white/50 text-[10px] md:text-xs font-mono uppercase tracking-widest">
                                <span>{post.date}</span>
                                <span>•</span>
                                <span>{post.readTime}</span>
                            </div>
                        </div>

                        <p className="text-white/70 text-sm md:text-lg max-w-2xl mt-4 leading-relaxed font-light">
                            {post.excerpt}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Main Text */}
                    <div className="lg:col-span-8 lg:col-start-2">
                        <div
                            className="prose prose-lg md:prose-xl prose-invert max-w-none prose-headings:font-extralight prose-headings:text-lumina-gold prose-p:text-white/80 prose-p:leading-relaxed prose-p:font-extralight prose-strong:font-normal prose-strong:text-white prose-li:text-white/80 prose-li:font-extralight font-sans font-extralight mt-12 mb-16"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Divider */}
                        <div className="w-full h-px bg-white/10 my-12" />

                        {/* Author & Share */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 border border-white/10 rounded-lg bg-white/5 backdrop-blur-md">
                            <div className="flex items-center gap-4">
                                <div className="relative w-16 h-16 rounded-full overflow-hidden border border-lumina-gold/30">
                                    <Image
                                        src="https://ik.imagekit.io/humbling/damn.jpg"
                                        alt={post.author}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <span className="block text-xs uppercase tracking-widest text-white/50 mb-1">Written By</span>
                                    <span className="font-[family-name:var(--font-calligraffitti)] text-2xl text-lumina-gold">
                                        {post.author}
                                    </span>
                                    <span className="block text-xs text-white/40 mt-1">Founder & Mystic</span>
                                </div>
                            </div>

                            <ArticleShare title={post.title} slug={post.slug} />
                        </div>

                        {/* Related Posts */}
                        <RelatedPosts posts={relatedPosts} />
                    </div>

                </div>
            </div>
        </article>
    );
}
