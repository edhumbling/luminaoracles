import { getAllSlugs, getPostBySlug } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ArticleShare from "@/components/ArticleShare";
import { ArrowLeft } from "lucide-react";

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
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.date,
            authors: [post.author],
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-black text-white selection:bg-lumina-gold selection:text-black pb-24">
            {/* Header / Hero */}
            <div className="relative w-full h-[50vh] min-h-[400px]">
                <div className="absolute inset-0 bg-black/60 z-10" />
                {/* Use the common blog header or a specific one if available */}
                <Image
                    src="/blog-header.png"
                    alt={post.title}
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-20" />

                {/* Back Link */}
                <div className="absolute top-24 left-6 z-30">
                    <Link
                        href="/blogs"
                        className="flex items-center gap-2 text-white/70 hover:text-lumina-gold transition-colors group bg-black/20 backdrop-blur-sm pr-4 rounded-full"
                    >
                        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-lumina-gold transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        <span className="text-sm uppercase tracking-widest font-mono">Back to Blogs</span>
                    </Link>
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-30 container mx-auto px-6 pb-12 md:pb-16">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="bg-lumina-gold/20 text-lumina-gold border border-lumina-gold/30 px-3 py-1 text-xs uppercase tracking-widest rounded-sm backdrop-blur-md">
                                {post.category}
                            </span>
                            <span className="text-white/60 text-sm font-mono uppercase tracking-widest">
                                {post.date}
                            </span>
                            <span className="text-white/40 text-sm font-mono uppercase tracking-widest md:block hidden">
                                • {post.readTime}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight mb-6 drop-shadow-xl text-white">
                            {post.title}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Main Text */}
                    <div className="lg:col-span-8 lg:col-start-2">
                        <div
                            className="prose prose-lg md:prose-xl prose-invert max-w-none prose-headings:font-light prose-headings:text-lumina-gold prose-p:text-white/80 prose-p:leading-relaxed prose-p:font-light prose-strong:text-white prose-li:text-white/80 font-serif mt-12 mb-16"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Divider */}
                        <div className="w-full h-px bg-white/10 my-12" />

                        {/* Author & Share */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 border border-white/10 rounded-lg bg-white/5 backdrop-blur-md">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-lumina-gold/10 border border-lumina-gold/30 flex items-center justify-center text-2xl">
                                    ✨
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
                    </div>

                </div>
            </div>
        </article>
    );
}
