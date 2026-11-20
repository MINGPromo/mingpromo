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

export const dynamic = "force-dynamic";

export default async function PublicHomePage() {
    let hero = null;
    let metrics: any[] = [];
    let tickers: any[] = [];
    let layers: any[] = [];

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
        });
    } catch (e) {
        console.error("Failed to load ConnectionLayer:", e);
    }

    return (
        <div className="landing-page-root">
            <SiteHeader active="home" />

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
                <SiteFooter />
            </section>

            {/* Side Navigation Dots */}
            <SectionNavDots />
        </div>
    );
}

