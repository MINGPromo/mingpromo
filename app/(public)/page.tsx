import React from "react";
import { prisma } from "@/lib/db";
import { SiteHeader } from "@/components/public/SiteHeader";
import { HeroSection } from "@/components/public/HeroSection";
import { ConnectionLayers } from "@/components/public/ConnectionLayers";
import { MilestonesSection } from "@/components/public/MilestonesSection";
import { InsightEditorialSection } from "@/components/public/InsightEditorialSection";
import { SolutionFinderSection } from "@/components/public/SolutionFinderSection";
import { ClientsTestimonialsSection } from "@/components/public/ClientsTestimonialsSection";
import { ContactCtaSection } from "@/components/public/ContactCtaSection";
import { FaqSection } from "@/components/public/FaqSection";
import { SiteFooter } from "@/components/public/SiteFooter";
import { SectionNavDots } from "@/components/public/SectionNavDots";
import { getPublishedSolutionLinks } from "@/lib/solutions";
import type { SolutionNavLink } from "@/lib/solution-types";
import type { HeroData } from "@/components/public/HeroSection";
import type { MetricItem } from "@/components/public/HeroStatsBar";
import type { TickerItem } from "@/components/public/HeroTickerRibbon";
import type { LayerItem } from "@/components/public/ConnectionLayers";

export const dynamic = "force-dynamic";

export default async function PublicHomePage() {
    let hero: HeroData | null = null;
    let metrics: MetricItem[] = [];
    let tickers: TickerItem[] = [];
    let layers: LayerItem[] = [];
    let solutionLinks: SolutionNavLink[] = [];

    try {
        hero = await prisma.landingHero.findUnique({ where: { id: "default" } });
    } catch (e) {
        console.error("Failed to load LandingHero:", e);
    }

    try {
        metrics = await prisma.siteMetric.findMany({ orderBy: { order: "asc" } });
    } catch (e) {
        console.error("Failed to load SiteMetric:", e);
    }

    try {
        tickers = await prisma.marqueeTicker.findMany({
            where: { isActive: true },
            orderBy: { order: "asc" },
        });
    } catch (e) {
        console.error("Failed to load MarqueeTicker:", e);
    }

    try {
        layers = await prisma.connectionLayer.findMany({
            orderBy: { order: "asc" },
            include: { solutionPage: { select: { slug: true, published: true } } },
        });
    } catch (e) {
        console.error("Failed to load ConnectionLayer:", e);
    }

    try {
        solutionLinks = await getPublishedSolutionLinks();
    } catch (e) {
        console.error("Failed to load SolutionPage navigation:", e);
    }

    return (
        <div className="landing-page-root">
            <SiteHeader active="home" solutionLinks={solutionLinks} />

            {/* Section 1: Hero Section */}
            <HeroSection heroData={hero} metrics={metrics} tickers={tickers} />

            {/* Section 2: Connection Layers */}
            <ConnectionLayers items={layers} />

            {/* Section 3: Milestones */}
            <MilestonesSection />

            {/* Section 4: Our Insight */}
            <InsightEditorialSection />

            {/* Section 5: Solution Finder */}
            <SolutionFinderSection />

            {/* Section 6: Clients & Testimonials */}
            <ClientsTestimonialsSection />

            {/* Section 7: Contact / CTA */}
            <ContactCtaSection />

            {/* Section 8: FAQ & Footer */}
            <section
                className="snap-section faq-footer-section"
                id="faq"
                aria-label="Frequently Asked Questions & Footer"
            >
                <FaqSection />
                <SiteFooter solutionLinks={solutionLinks} />
            </section>

            {/* Side Navigation Dots */}
            <SectionNavDots />
        </div>
    );
}

