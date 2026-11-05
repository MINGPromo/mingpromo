import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowLeft, User, Calendar } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface PostPageProps {
    params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export default async function BlogPostPage({ params }: PostPageProps) {
    const { slug } = await params;

    const post = await prisma.post.findUnique({
        where: { slug },
        include: {
            author: { select: { name: true } }
        }
    });

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-black text-white selection:bg-brand selection:text-black">
            <Navbar />

            <article className="pt-32 pb-16 px-6">
                <div className="container mx-auto max-w-4xl">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Blog
                    </Link>

                    {post.coverImage && (
                        <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden mb-10 border border-white/10">
                            <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                                unoptimized
                            />
                        </div>
                    )}

                    <div className="mb-10 text-center">
                        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(post.createdAt).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>{post.author?.name || "Admin"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="prose prose-xl prose-invert mx-auto prose-a:text-brand prose-headings:text-white prose-p:text-gray-300">
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    );
}
