"use client";

import React, { useState } from "react";
import { useLanguage } from "./LanguageContext";

export interface LayerItem {
    id?: string;
    tabKey: string;
    badgeText: string;
    titleEn: string;
    titleId: string;
    descEn: string;
    descId: string;
    imageUrl: string;
    solutionPage?: { slug: string; published: boolean } | null;
}

const DEFAULT_LAYERS: LayerItem[] = [
    {
        tabKey: "the-brain",
        badgeText: "THE BRAIN",
        titleEn: "OOH Measurement",
        titleId: "Pengukuran OOH",
        descEn: "Measure and optimize your campaigns with verified audience data.",
        descId: "Ukur dan optimalkan kampanye Anda dengan data audiens terverifikasi.",
        imageUrl: "/assets/media/eco-the-brain.webp",
    },
    {
        tabKey: "the-movement",
        badgeText: "THE MOVEMENT",
        titleEn: "Mobile Ads",
        titleId: "Iklan Bergerak",
        descEn: "Dynamic mobile media taking your brand directly to prime audience paths.",
        descId: "Media bergerak dinamis yang membawa brand Anda langsung ke jalur audiens utama.",
        imageUrl: "/assets/media/eco-the-movement.webp",
    },
    {
        tabKey: "the-inside",
        badgeText: "THE INSIDE",
        titleEn: "Premium Mall Inventory",
        titleId: "Inventory Mall Premium",
        descEn: "High-impact visual dominance within Indonesia's premier shopping destinations.",
        descId: "Dominasi visual berdampak tinggi di pusat perbelanjaan terkemuka Indonesia.",
        imageUrl: "/assets/media/eco-the-inside.webp",
    },
    {
        tabKey: "the-roadside",
        badgeText: "THE ROADSIDE",
        titleEn: "Roadside OOH & DOOH",
        titleId: "Roadside OOH & DOOH",
        descEn: "Unmissable city-scale presence across key thoroughfares and urban arteries.",
        descId: "Kehadiran berskala kota yang tak terlewatkan di jalan protokol dan simpul perkotaan.",
        imageUrl: "/assets/media/eco-the-roadside.webp",
    },
    {
        tabKey: "the-experience",
        badgeText: "THE EXPERIENCE",
        titleEn: "Experiential & Activation",
        titleId: "Aktivasi & Pengalaman",
        descEn: "Interactive consumer encounters transforming brand perception in real-time.",
        descId: "Interaksi langsung yang mengubah persepsi brand konsumen secara nyata.",
        imageUrl: "/assets/media/eco-the-experience.webp",
    },
];

export function ConnectionLayers({ items }: { items?: LayerItem[] }) {
    const { locale, t } = useLanguage();
    const data = (items && items.length > 0) ? items : DEFAULT_LAYERS;
    const [activeKey, setActiveKey] = useState<string>("the-brain");

    const getMatchedKey = (key: string) => {
        if (key === "the-outside") return "the-movement";
        if (key === "the-ground") return "the-experience";
        return key;
    };

    return (
        <section
            className="snap-section solutions-page-wrapper"
            id="solutions"
            data-nav-theme="dark"
            aria-label="Our Solution and Ecosystem"
        >
            <div className="eco-showcase-banner">
                {/* Showcase Background Photos Slider Stack */}
                <div className="eco-bg-slider" id="ecoBgSlider" aria-hidden="true">
                    {data.map((item, idx) => {
                        const isMatch = (item.tabKey === activeKey || getMatchedKey(activeKey) === item.tabKey);
                        return (
                            <img
                                key={idx}
                                className={`eco-bg-img ${isMatch ? "active" : ""}`}
                                src={item.imageUrl}
                                alt={item.badgeText}
                                loading={idx === 0 ? "eager" : "lazy"}
                            />
                        );
                    })}
                </div>

                {/* Top Left Headline */}
                <div className="eco-top-info" aria-label="Ecosystem Overview">
                    <div className="eco-title-row">
                        <span className="yellow-bullet" aria-hidden="true"></span>
                        <h2 className="eco-main-title">
                            {t("Five Connection Layers", "Lima Lapisan Koneksi")}
                        </h2>
                    </div>
                    <p className="eco-main-subtitle">
                        {t("Different Spaces. Different Possibilities.", "Ruang Berbeda. Peluang Berbeda.")}
                    </p>
                    <p className="eco-main-desc">
                        {t(
                            "Advertising can take many forms. Here's how we bring it into the places people go, the journeys they take, and the moments they share.",
                            "Periklanan hadir dalam berbagai bentuk. Begini cara kami menghadirkan pesan brand ke ruang yang dikunjungi, perjalanan yang ditempuh, dan momen yang dibagikan konsumen."
                        )}
                    </p>
                </div>

                {/* Dark Contrast Gradient Overlay */}
                <div className="eco-gradient-overlay" aria-hidden="true"></div>

                {/* Interactive Ecosystem Content Overlay */}
                <div className="eco-overlay-content">
                    <div className="eco-capsule-bar" role="navigation" aria-label="Ecosystem Categories">
                        {data.map((item, idx) => {
                            const isMatch = (item.tabKey === activeKey || getMatchedKey(activeKey) === item.tabKey);
                            const title = locale === "id" ? item.titleId : item.titleEn;
                            return (
                                <a
                                    key={idx}
                                    href={item.solutionPage?.published ? `/solutions/${item.solutionPage.slug}` : "/#contact"}
                                    className={`eco-item-card ${isMatch ? "active is-featured" : ""}`}
                                    onMouseEnter={() => setActiveKey(item.tabKey)}
                                    onFocus={() => setActiveKey(item.tabKey)}
                                    style={{ background: "none", border: "none", textAlign: "left", cursor: "pointer", textDecoration: "none" }}
                                >
                                    <span className="eco-pill-title">{item.badgeText}</span>
                                    <span className="eco-sublabel">{title}</span>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

