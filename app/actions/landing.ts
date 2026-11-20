"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getLandingData() {
    const hero = await prisma.landingHero.findUnique({
        where: { id: "default" },
    });

    const metrics = await prisma.siteMetric.findMany({
        orderBy: { order: "asc" },
    });

    const tickers = await prisma.marqueeTicker.findMany({
        orderBy: { order: "asc" },
    });

    const layers = await prisma.connectionLayer.findMany({
        orderBy: { order: "asc" },
    });

    return { hero, metrics, tickers, layers };
}

export async function updateLandingHero(data: {
    tagline?: string;
    headlineEn: string;
    headlineId: string;
    leadEn: string;
    leadId: string;
}) {
    try {
        const result = await prisma.landingHero.upsert({
            where: { id: "default" },
            update: {
                tagline: data.tagline || "INSIDE OUT OF HOME",
                headlineEn: data.headlineEn,
                headlineId: data.headlineId,
                leadEn: data.leadEn,
                leadId: data.leadId,
            },
            create: {
                id: "default",
                tagline: data.tagline || "INSIDE OUT OF HOME",
                headlineEn: data.headlineEn,
                headlineId: data.headlineId,
                leadEn: data.leadEn,
                leadId: data.leadId,
            },
        });

        revalidatePath("/");
        revalidatePath("/dashboard/landing");
        return { success: true, data: result };
    } catch (error: any) {
        console.error("Failed to update Landing Hero:", error);
        return { success: false, error: error.message };
    }
}

export async function updateSiteMetrics(
    metrics: Array<{
        id?: string;
        targetNumber: number;
        suffix: string;
        formatComma: boolean;
        highlightEn: string;
        labelEn: string;
        highlightId: string;
        labelId: string;
        order?: number;
    }>
) {
    try {
        await prisma.siteMetric.deleteMany();

        for (let i = 0; i < metrics.length; i++) {
            const m = metrics[i];
            await prisma.siteMetric.create({
                data: {
                    targetNumber: Number(m.targetNumber) || 0,
                    suffix: m.suffix || "",
                    formatComma: Boolean(m.formatComma),
                    highlightEn: m.highlightEn || "",
                    labelEn: m.labelEn || "",
                    highlightId: m.highlightId || "",
                    labelId: m.labelId || "",
                    order: i,
                },
            });
        }

        revalidatePath("/");
        revalidatePath("/dashboard/landing");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to update Site Metrics:", error);
        return { success: false, error: error.message };
    }
}

export async function updateMarqueeTickers(
    tickers: Array<{
        id?: string;
        productType: string;
        locationName: string;
        impressions: string;
        order?: number;
        isActive?: boolean;
    }>
) {
    try {
        await prisma.marqueeTicker.deleteMany();

        for (let i = 0; i < tickers.length; i++) {
            const t = tickers[i];
            await prisma.marqueeTicker.create({
                data: {
                    productType: t.productType || "",
                    locationName: t.locationName || "",
                    impressions: t.impressions || "",
                    order: i,
                    isActive: t.isActive !== false,
                },
            });
        }

        revalidatePath("/");
        revalidatePath("/dashboard/landing");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to update Marquee Tickers:", error);
        return { success: false, error: error.message };
    }
}

export async function updateConnectionLayers(
    layers: Array<{
        id?: string;
        tabKey: string;
        badgeText: string;
        titleEn: string;
        titleId: string;
        descEn: string;
        descId: string;
        imageUrl: string;
        order?: number;
    }>
) {
    try {
        await prisma.connectionLayer.deleteMany();

        for (let i = 0; i < layers.length; i++) {
            const l = layers[i];
            await prisma.connectionLayer.create({
                data: {
                    tabKey: l.tabKey || `layer-${i + 1}`,
                    badgeText: l.badgeText || "",
                    titleEn: l.titleEn || "",
                    titleId: l.titleId || "",
                    descEn: l.descEn || "",
                    descId: l.descId || "",
                    imageUrl: l.imageUrl || "",
                    order: i,
                },
            });
        }

        revalidatePath("/");
        revalidatePath("/dashboard/landing");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to update Connection Layers:", error);
        return { success: false, error: error.message };
    }
}
