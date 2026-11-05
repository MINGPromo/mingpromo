"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createTestimonial(formData: FormData) {
    const quote = formData.get("quote") as string;
    const author = formData.get("author") as string;
    const role = formData.get("role") as string;
    const company = formData.get("company") as string;

    await prisma.testimonial.create({
        data: {
            quote,
            author,
            role,
            company,
        },
    });

    revalidatePath("/dashboard/testimonials");
    revalidatePath("/");
}

export async function updateTestimonial(id: string, formData: FormData) {
    const quote = formData.get("quote") as string;
    const author = formData.get("author") as string;
    const role = formData.get("role") as string;
    const company = formData.get("company") as string;

    await prisma.testimonial.update({
        where: { id },
        data: {
            quote,
            author,
            role,
            company,
        },
    });

    revalidatePath("/dashboard/testimonials");
    revalidatePath("/");
}

export async function deleteTestimonial(id: string) {
    await prisma.testimonial.delete({
        where: { id },
    });

    revalidatePath("/dashboard/testimonials");
    revalidatePath("/");
}
