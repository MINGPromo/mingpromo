"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const content = formData.get("content") as string;
    const excerpt = formData.get("excerpt") as string;
    const coverImage = formData.get("coverImage") as string;
    const authorId = formData.get("authorId") as string;

    await prisma.post.create({
        data: {
            title,
            slug,
            content,
            excerpt,
            coverImage,
            authorId,
            published: true, // Default to published for simplicity now
        },
    });

    revalidatePath("/dashboard/blog");
}

export async function updatePost(id: string, formData: FormData) {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const content = formData.get("content") as string;
    const excerpt = formData.get("excerpt") as string;
    const coverImage = formData.get("coverImage") as string;

    await prisma.post.update({
        where: { id },
        data: {
            title,
            slug,
            content,
            excerpt,
            coverImage,
        },
    });

    revalidatePath("/dashboard/blog");
}

export async function deletePost(id: string) {
    await prisma.post.delete({
        where: { id },
    });

    revalidatePath("/dashboard/blog");
}
