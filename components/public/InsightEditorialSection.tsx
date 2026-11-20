"use client";

import React, { useState } from "react";
import { useLanguage } from "./LanguageContext";

interface InsightItem {
    id: number;
    titleEn: string;
    titleId: string;
    headlineEn: string;
    headlineId: string;
    descEn: string;
    descId: string;
    img: string;
}

const INSIGHTS: InsightItem[] = [
    {
        id: 1,
        titleEn: "TRANSFORMING ROADSIDE BILLBOARDS INTO URBAN STORYTELLING",
        titleId: "MENGUBAH BILLBOARD JALAN RAYA MENJADI CERITA VISUAL KOTA",
        headlineEn: "Roadside DOOH Impact Strategy",
        headlineId: "Strategi Dampak DOOH Jalan Raya",
        descEn: "How high-traffic arterial digital billboards maximize brand recall during daily urban commutes.",
        descId: "Bagaimana videotron jalan arteri memaksimalkan daya ingat merek di jam sibuk kota.",
        img: "/assets/media/insight/insight-featured.webp",
    },
    {
        id: 2,
        titleEn: "PROGRAMMATIC INDOOR LED FOR MODERN RETAIL EXPERIENCES",
        titleId: "LED INDOOR PROGRAMATIK UNTUK PENGALAMAN RITEL MODERN",
        headlineEn: "Programmatic Indoor Mall LED",
        headlineId: "LED Mall Indoor Programatik",
        descEn: "Capturing high-intent shoppers with synchronized suspended LED banners inside premier shopping malls.",
        descId: "Menjangkau pengunjung pusat perbelanjaan melalui hanging LED banner tersinkronisasi.",
        img: "/assets/media/insight/insight-led-banner.webp",
    },
    {
        id: 3,
        titleEn: "BRIDGING DIGITAL SCREENS WITH EXPERIENTIAL ACTIVATIONS",
        titleId: "MENGHUBUNGKAN LAYAR DIGITAL DAN AKTIVASI EKSPERIENSIAL",
        headlineEn: "Experiential OOH Integration",
        headlineId: "Integrasi OOH Eksperiensial",
        descEn: "Combining immersive 3D showcase trucks and street-level pop-ups for direct consumer engagement.",
        descId: "Menggabungkan truk display 3D dan aktivasi ruang publik untuk interaksi konsumen langsung.",
        img: "/assets/media/insight/insight-experiential.webp",
    },
    {
        id: 4,
        titleEn: "HYPER-LOCAL TARGETING VIA ROAMING MOBILE LED FLEETS",
        titleId: "PENARGETAN HIPER-LOKAL MELALUI ARMADA MOBILE LED",
        headlineEn: "Hyper-Local Mobile LED Fleet",
        headlineId: "Armada Mobile LED Hiper-Lokal",
        descEn: "Delivering dynamic full-motion campaigns directly to key event districts, campuses, and business hubs.",
        descId: "Menghadirkan kampanye bergerak dinamis langsung ke kawasan acara, kampus, dan pusat bisnis.",
        img: "/assets/media/insight/insight-mobile-led.webp",
    },
    {
        id: 5,
        titleEn: "MEASURING REAL-TIME OOH AUDIENCE REACH WITH AI VISION",
        titleId: "MENGUKUR JANGKAUAN AUDIENS OOH REAL-TIME DENGAN AI",
        headlineEn: "AI-Measured OOH Analytics",
        headlineId: "Analitik OOH Berbasis AI",
        descEn: "Turning street impressions into transparent campaign metrics powered by computer vision and mobility data.",
        descId: "Mengubah impresi luar ruang menjadi metrik kampanye transparan berbasis AI dan data mobilitas.",
        img: "/assets/media/insight/insight-ai-analytics.webp",
    },
];

export function InsightEditorialSection() {
    const { locale, t } = useLanguage();
    const [selectedId, setSelectedId] = useState(1);
    const selected = INSIGHTS.find((i) => i.id === selectedId) || INSIGHTS[0];

    return (
        <section className="snap-section insight-page-wrapper" id="insight" aria-label="Our Insight Section">
            <svg className="insight-bg-wave" viewBox="0 0 600 220" fill="none" aria-hidden="true">
                <path d="M40 -20 C 170 110, 290 10, 420 95 C 510 155, 575 110, 620 40" stroke="currentColor" strokeWidth="1.5" />
                <path d="M90 -40 C 210 95, 330 -5, 460 80 C 540 130, 595 85, 640 20" stroke="currentColor" strokeWidth="1.2" />
            </svg>

            <div className="insight-inner-container">
                <div className="insight-header-row">
                    <h2 className="insight-section-title">{t("Our Insight", "Insight Kami")}</h2>
                </div>

                <div className="insight-editorial-grid">
                    {/* Left Column Featured Card */}
                    <article className="insight-featured" id="insightFeaturedCard">
                        <img
                            id="insightFeaturedImg"
                            src={selected.img}
                            alt={selected.titleEn}
                            className="insight-featured-img"
                        />
                        <div className="insight-featured-overlay" aria-hidden="true"></div>
                        <div className="insight-featured-content">
                            <h3 className="insight-featured-title" id="insightFeaturedTitle">
                                {locale === "id" ? selected.titleId : selected.titleEn}
                            </h3>
                            <a href="#contact" className="insight-pill-featured">
                                <span>{t("Read More", "Baca")}</span>
                                <span className="pill-arrow" aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </article>

                    {/* Scroll Rail */}
                    <div className="insight-scroll-rail" aria-hidden="true">
                        <div className="insight-scroll-track">
                            <div
                                className="insight-scroll-thumb"
                                style={{ top: `${((selectedId - 1) / (INSIGHTS.length - 1)) * 80}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Right Column List */}
                    <div className="insight-list" id="insightList" role="region" aria-label="Editorial insight articles">
                        {INSIGHTS.map((item) => {
                            const isSel = item.id === selectedId;
                            return (
                                <article
                                    key={item.id}
                                    className={`insight-item ${isSel ? "is-selected" : ""}`}
                                    onClick={() => setSelectedId(item.id)}
                                    onMouseEnter={() => setSelectedId(item.id)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <div className="insight-item-thumb-wrap">
                                        <img src={item.img} alt={item.headlineEn} className="insight-item-thumb" />
                                    </div>
                                    <div className="insight-item-body">
                                        <h3 className="insight-item-title">
                                            {locale === "id" ? item.headlineId : item.headlineEn}
                                        </h3>
                                        <p className="insight-item-desc">
                                            {locale === "id" ? item.descId : item.descEn}
                                        </p>
                                        <span className="insight-pill-outline">
                                            <span>{t("Read More", "Selengkapnya")}</span>
                                            <span className="pill-arrow" aria-hidden="true">&rarr;</span>
                                        </span>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

