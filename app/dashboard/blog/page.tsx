import { prisma } from "@/lib/db";
import { PostManager } from "@/components/dashboard/post-manager";

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            author: { select: { id: true, name: true, email: true } }
        }
    });

    const authors = await prisma.user.findMany({
        select: { id: true, name: true, email: true }
    });

    return <PostManager initialPosts={posts} authors={authors} />;
}
