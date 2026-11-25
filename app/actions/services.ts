"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireDashboardUser } from "@/lib/dashboard-auth";

export async function createService(formData: FormData) {
    await requireDashboardUser();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const icon = formData.get("icon") as string;
    const videoId = formData.get("videoId") as string;

    await prisma.service.create({
        data: {
            title,
            description,
            icon,
            videoId: videoId || null,
        },
    });

    revalidatePath("/dashboard/services");
    revalidatePath("/"); // Update home page as well
}

export async function updateService(id: string, formData: FormData) {
    await requireDashboardUser();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const icon = formData.get("icon") as string;
    const videoId = formData.get("videoId") as string;

    await prisma.service.update({
        where: { id },
        data: {
            title,
            description,
            icon,
            videoId: videoId || null,
        },
    });

    revalidatePath("/dashboard/services");
    revalidatePath("/");
}

export async function deleteService(id: string) {
    await requireDashboardUser();
    await prisma.service.delete({
        where: { id },
    });

    revalidatePath("/dashboard/services");
    revalidatePath("/");
}
