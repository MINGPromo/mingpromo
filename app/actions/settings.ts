"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateSetting(key: string, value: string) {
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
}
