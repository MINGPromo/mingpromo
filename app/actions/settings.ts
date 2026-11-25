"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireDashboardUser } from "@/lib/dashboard-auth";

export async function updateSetting(key: string, value: string) {
    await requireDashboardUser();
    await prisma.setting.upsert({
        where: { key },
        update: { value },
        create: {
            key,
            value,
            description: "System Setting"
        }
    });

    revalidatePath("/dashboard/settings");
    revalidatePath("/");
    revalidatePath("/solutions");
    revalidatePath("/solutions/[slug]", "page");
}
