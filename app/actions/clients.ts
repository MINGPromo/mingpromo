"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createClient(formData: FormData) {
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
    await prisma.client.delete({
        where: { id },
    });

    revalidatePath("/dashboard/clients");
    revalidatePath("/");
}
