"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireDashboardUser } from "@/lib/dashboard-auth";

export async function createUser(formData: FormData) {
    await requireDashboardUser();
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;

    // In a real app, hash the password!
    await prisma.user.create({
        data: {
            email,
            name,
            password,
        },
    });

    revalidatePath("/dashboard/users");
}

export async function updateUser(id: string, formData: FormData) {
    await requireDashboardUser();
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    // Only update password if provided
    const password = formData.get("password") as string;

    const data: any = { email, name };
    if (password) {
        data.password = password;
    }

    await prisma.user.update({
        where: { id },
        data,
    });

    revalidatePath("/dashboard/users");
}

export async function deleteUser(id: string) {
    await requireDashboardUser();
    // Prevent deleting the last user or self (if we had current user context) works best with UI checks
    await prisma.user.delete({
        where: { id },
    });

    revalidatePath("/dashboard/users");
}
