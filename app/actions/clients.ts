"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireDashboardUser } from "@/lib/dashboard-auth";

export async function createClient(formData: FormData) {
    await requireDashboardUser();
    const name = formData.get("name") as string;
    const logoUrl = formData.get("logoUrl") as string;

    await prisma.client.create({
        data: {
            name,
            logoUrl,
        },
    });

    revalidatePath("/dashboard/clients");
    revalidatePath("/");
}

export async function updateClient(id: string, formData: FormData) {
    await requireDashboardUser();
    const name = formData.get("name") as string;
    const logoUrl = formData.get("logoUrl") as string;

    await prisma.client.update({
        where: { id },
        data: {
            name,
            logoUrl,
        },
    });

    revalidatePath("/dashboard/clients");
    revalidatePath("/");
}

export async function deleteClient(id: string) {
    await requireDashboardUser();
    await prisma.client.delete({
        where: { id },
    });

    revalidatePath("/dashboard/clients");
    revalidatePath("/");
}
