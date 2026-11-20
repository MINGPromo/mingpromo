"use client";

import React, { useState } from "react";
import { useLanguage } from "./LanguageContext";

interface MilestoneNode {
    year: string;
    nameEn: string;
    nameId: string;
    descEn: string;
    descId: string;
    img: string;
    pos: "pos-below" | "pos-above";
    isEndpoint?: boolean;
}

const MILESTONES: MilestoneNode[] = [
    { year: "1999", nameEn: "Neon Box", nameId: "Neon Box", descEn: "Our First Step in Outdoor Visibility", descId: "Langkah Pertama Kami dalam Visibilitas Luar Ruang", img: "/assets/media/milestones/neonbox new.png", pos: "pos-below" },
    { year: "2001", nameEn: "Mall Branding", nameId: "Mall Branding", descEn: "Bringing Brands Into Shopping Destinations", descId: "Menghadirkan Brand ke Berbagai Destinasi Belanja", img: "/assets/media/milestones/mall-branding.webp", pos: "pos-above" },
    { year: "2005", nameEn: "Billboard", nameId: "Billboard", descEn: "Expanding Brand Visibility Across City Roads", descId: "Memperluas Visibilitas Brand di Ruas Jalan Utama Kota", img: "/assets/media/milestones/billboard.webp", pos: "pos-below" },
    { year: "2010", nameEn: "Airport Videotron", nameId: "Airport Videotron", descEn: "Introducing Digital Advertising to Airport Environments", descId: "Menghadirkan Periklanan Digital ke Lingkungan Bandara", img: "/assets/media/milestones/airport.png", pos: "pos-above" },
    { year: "2014", nameEn: "The First LED Banner", nameId: "The First LED Banner", descEn: "Pioneering Suspended Digital Displays in Atriums", descId: "Mempelopori Layar Digital Gantung di Atrium", img: "/assets/media/milestones/the-first-led-banner.webp", pos: "pos-below" },
    { year: "2017", nameEn: "Mobile LED", nameId: "Mobile LED", descEn: "Taking Campaigns Directly to Audience Routes", descId: "Membawa Kampanye Langsung ke Rute Audiens", img: "/assets/media/milestones/mobile-led.webp", pos: "pos-above" },
    { year: "2020", nameEn: "Mobile Showcase", nameId: "Mobile Showcase", descEn: "Creating Moving Display Environments", descId: "Menciptakan Ruang Display Bergerak Interaktif", img: "/assets/media/milestones/mobile-showcase.webp", pos: "pos-below" },
    { year: "2022", nameEn: "Mobile Stage", nameId: "Mobile Stage", descEn: "Instant Event Capabilities Wherever Audiences Gather", descId: "Kapabilitas Panggung Instan di Titik Kumpul Audiens", img: "/assets/media/milestones/mobile-stage.webp", pos: "pos-above" },
    { year: "2025", nameEn: "Mobile Transformer", nameId: "Mobile Transformer", descEn: "Transforming Spaces into Brand Experiences", descId: "Mengubah Ruang Terbuka Menjadi Pengalaman Brand", img: "/assets/media/milestones/mobile-transformers.webp", pos: "pos-below" },
    { year: "2026", nameEn: "The Next Chapter", nameId: "Babak Berikutnya", descEn: "Continuing to Expand What's Possible in OOH Advertising", descId: "Terus Memperluas Batas Kemungkinan dalam Periklanan OOH", img: "/assets/media/milestones/mobile-transformers.webp", pos: "pos-above", isEndpoint: true },
];

export function MilestonesSection() {
    const { locale, t } = useLanguage();
    const [activeIndex, setActiveIndex] = useState(0);
    const active = MILESTONES[activeIndex];

    return (
        <section
            className="snap-section milestones-page-wrapper"
            id="milestones"
            data-nav-theme="dark"
            aria-label="Our Journey and Milestones"
        >
            <div className="milestones-inner-container">
                <div className="ms-header">
                    <div className="ms-heading-center">
                        <div className="ms-eyebrow">
                            <span className="ms-yellow-dot" aria-hidden="true"></span>
                            <span className="ms-eyebrow-text">{t("Our Journey", "Perjalanan Kami")}</span>
                        </div>
                        <h2 className="ms-title">MILESTONES</h2>
                        <p className="ms-subtitle">
                            {t(
                                "From our first outdoor advertising formats to mobile media and experiential solutions, explore how MING Promotion's products have evolved to create new ways for brands to connect with audiences.",
                                "Dari format iklan luar ruang pertama kami hingga media bergerak dan solusi eksperiensial, jelajahi bagaimana produk MING Promotion berevolusi menciptakan cara baru bagi brand untuk terhubung dengan audiens."
                            )}
                        </p>
                    </div>
                </div>

                {/* Stage Showcase */}
                <div className="ms-stage" aria-live="polite">
                    <div className="ms-showcase" id="msShowcase">
                        <div className="ms-stage-media">
                            <img
                                id="msStageImg"
                                src={active.img}
                                alt={`${active.year} ${active.nameEn}`}
                            />
                        </div>
                        <div className="ms-stage-info">
                            <div className="ms-stage-year" id="msStageYear">{active.year}</div>
                            <h3 className="ms-stage-name" id="msStageName">
                                {locale === "id" ? active.nameId : active.nameEn}
                            </h3>
                            <p className="ms-stage-desc" id="msStageDesc">
                                {locale === "id" ? active.descId : active.descEn}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Timeline Controls & Rail */}
                <div className="ms-timeline-section">
                    <div className="ms-mobile-controls" aria-label="Mobile timeline navigation">
                        <button
                            className="ms-mob-btn"
                            type="button"
                            onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
                            disabled={activeIndex === 0}
                            aria-label="Previous milestone"
                        >
                            &#8592;
                        </button>
                        <span className="ms-mob-hint">{t("Tap or swipe timeline", "Ketuk atau geser linimasa")}</span>
                        <button
                            className="ms-mob-btn"
                            type="button"
                            onClick={() => setActiveIndex((prev) => Math.min(MILESTONES.length - 1, prev + 1))}
                            disabled={activeIndex === MILESTONES.length - 1}
                            aria-label="Next milestone"
                        >
                            &#8594;
                        </button>
                    </div>

                    <div className="ms-timeline-scroll" id="timelineTrack" tabIndex={0}>
                        <div className="ms-timeline-rail" role="tablist">
                            {MILESTONES.map((item, idx) => {
                                const isActive = idx === activeIndex;
                                return (
                                    <button
                                        key={idx}
                                        type="button"
                                        className={`ms-node ${item.pos} ${item.isEndpoint ? "is-endpoint" : ""} ${isActive ? "is-active" : ""}`}
                                        role="tab"
                                        aria-selected={isActive}
                                        onClick={() => setActiveIndex(idx)}
                                        onMouseEnter={() => setActiveIndex(idx)}
                                    >
                                        <span className="ms-node-dot" aria-hidden="true"></span>
                                        <span className="ms-node-label">
                                            <span className="ms-node-year">{item.year}</span>
                                            <span className="ms-node-name">
                                                {locale === "id" ? item.nameId : item.nameEn}
                                            </span>
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

