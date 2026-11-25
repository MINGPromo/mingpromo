"use client";

import React from "react";
import { useLanguage } from "./LanguageContext";
import { HeroStatsBar, MetricItem } from "./HeroStatsBar";
import { HeroTickerRibbon, TickerItem } from "./HeroTickerRibbon";

export interface HeroData {
    headlineEn?: string | null;
    headlineId?: string | null;
    leadEn?: string | null;
    leadId?: string | null;
    tagline?: string | null;
    heroImage?: string | null;
}

interface HeroSectionProps {
    heroData?: HeroData | null;
    metrics?: MetricItem[];
    tickers?: TickerItem[];
}

export function HeroSection({ heroData, metrics, tickers }: HeroSectionProps) {
    const { t } = useLanguage();

    const headline = t(
        heroData?.headlineEn || "Connecting Brands with Audiences Since 1999.",
        heroData?.headlineId || "Menghubungkan Brand dengan Audiens Sejak 1999."
    );

    const description = t(
        heroData?.leadEn ||
            "The consumer journey is never confined to a single location. MING is here to bridge every touchpoint, ensuring your brand remains relevant, visible, and connected every step of the way.",
        heroData?.leadId ||
            "Perjalanan konsumen tidak pernah terbatas di satu lokasi. MING hadir menjembatani setiap titik temu, memastikan brand Anda tetap relevan, terlihat, dan terhubung di setiap langkah."
    );
    const hasCustomHeroImage = Boolean(heroData?.heroImage);
    const heroImage = heroData?.heroImage || "/assets/media/aset-3d-hero.webp";

    return (
        <section
            className={`snap-section hero-page-wrapper${hasCustomHeroImage ? " has-custom-hero-image" : ""}`}
            id="hero"
            aria-label="Hero Section"
        >
            {/* 3D HERO VISUAL */}
            <div className="hero-3d-visual" aria-hidden="true">
                <img
                    src={heroImage}
                    alt="MING 3D Visual"
                    className="hero-3d-img"
                    loading="eager"
                />
            </div>

            {/* HERO MAIN CONTENT SECTION */}
            <main className="hero-section">
                <div className="hero-inner-container">
                    <div className="hero-content-column">
                        {/* BIG DISPLAY TYPOGRAPHY: "INSIDE OUT OF HOME" */}
                        <div className="display-typography" aria-label="Inside Out of Home">
                            <div className="type-row row-inside">
                                <span className="hero-word word-inside">INSIDE</span>
                            </div>
                            <div className="type-row row-out">
                                <span className="hero-word word-out">OUT</span>
                            </div>
                            <div className="type-row row-home">
                                <span className="hero-word word-home">OF HOME</span>
                            </div>
                        </div>

                        {/* BOTTOM INTRO TEXT & VALUE PROPOSITION */}
                        <div className="hero-summary-block">
                            <h1 className="hero-headline">{headline}</h1>
                            <p className="hero-description">{description}</p>
                        </div>
                    </div>

                    {/* STATS BAR (4-COLUMN METRIC GRID) */}
                    <HeroStatsBar items={metrics} />
                </div>
            </main>

            {/* INFINITE PRODUCT & LOCATION IMPRESSIONS TICKER */}
            <HeroTickerRibbon items={tickers} />
        </section>
    );
}
