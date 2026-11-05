import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowRight, User, Calendar } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function BlogIndexPage() {
    const posts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        include: {
            author: { select: { name: true } }
        }
    });

    return (
        <main className="min-h-screen bg-black text-white selection:bg-brand selection:text-black">
            <Navbar />

            <section className="pt-32 pb-16 px-6 container mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Latest <span className="text-brand">News</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Updates, insights, and stories from MING Promotion.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Link
                            href={`/blog/${post.slug}`}
                            key={post.id}
                            className="group bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden hover:border-brand/50 transition-colors"
                        >
                            <div className="relative aspect-[16/9] bg-white/5">
                                {post.coverImage ? (
                                    <Image
                                        src={post.coverImage}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                                        No Image
                                    </div>
                                )}
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <User className="w-3 h-3" />
                                        <span>{post.author?.name || "Admin"}</span>
                                    </div>
                                </div>

                                <h2 className="text-xl font-bold mb-3 group-hover:text-brand transition-colors line-clamp-2">
                                    {post.title}
                                </h2>
                                <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                                    {post.excerpt || "No excerpt avaliable."}
                                </p>

                                <span className="inline-flex items-center gap-2 text-sm font-bold text-brand">
                                    Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="text-center py-20 bg-zinc-900/50 rounded-2xl border border-white/10">
                        <p className="text-gray-500 text-lg">No posts published yet.</p>
                    </div>
                )}
            </section>

            <Footer />
        </main>
    );
}
