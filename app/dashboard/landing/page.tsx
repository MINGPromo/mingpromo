import { prisma } from "@/lib/db";
import { LandingEditor } from "@/components/dashboard/landing-editor";

export const dynamic = "force-dynamic";

export default async function LandingDashboardPage() {
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

    return (
        <LandingEditor
            initialHero={hero}
            initialMetrics={metrics}
            initialTickers={tickers}
            initialLayers={layers}
        />
    );
}

