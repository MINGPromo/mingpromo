"use client";

import React, { useRef } from "react";
import { useLanguage } from "./LanguageContext";

interface TestimonialItem {
    quoteEn: string;
    quoteId: string;
    authorName: string;
    authorCompany: string;
    stars?: number;
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
    {
        quoteEn: "We move at a fast pace, so partnering with MiNG’s roaming Mobile LED fleet gave our launch unmistakable city-wide visibility.",
        quoteId: "Kami bergerak cepat, dan bermitra dengan armada Mobile LED MiNG memberi peluncuran kami visibilitas masif di seluruh kota.",
        authorName: "Victoria Wotton",
        authorCompany: "Fementum Odio Co.",
        stars: 5,
    },
    {
        quoteEn: "Combining premier mall LED banners with roadside DOOH lifted brand recall dramatically throughout our seasonal campaign.",
        quoteId: "Menggabungkan LED banner di mall unggulan dan DOOH jalan raya meningkatkan brand recall kampanye musiman kami secara signifikan.",
        authorName: "Daniel Hartono",
        authorCompany: "Nusantara Retail Group",
        stars: 5,
    },
    {
        quoteEn: "From rapid Mobile Stage setup to transparent AI impression reporting, MiNG executes every detail cleanly and on schedule.",
        quoteId: "Dari pemasangan Mobile Stage yang cepat hingga laporan impresi AI yang transparan, MiNG mengeksekusi setiap detail tepat waktu.",
        authorName: "Nadya Kusuma",
        authorCompany: "Sentosa Fintech Indonesia",
        stars: 5,
    },
    {
        quoteEn: "Their Mobile Showcase turned ordinary parking plazas into interactive pop-up showrooms that drove real product trials.",
        quoteId: "Mobile Showcase mereka mengubah area publik biasa menjadi showroom pop-up interaktif yang mendorong uji coba produk nyata.",
        authorName: "Budi Santoso",
        authorCompany: "Karya Otomotif Mandiri",
        stars: 5,
    },
    {
        quoteEn: "Securing iconic airport arrivals and CBD digital billboards with MiNG elevated our luxury skincare launch across Indonesia.",
        quoteId: "Mengamankan layar digital ikonik bandara dan pusat bisnis bersama MiNG mendongkrak peluncuran produk perawatan kulit mewah kami.",
        authorName: "Clarissa Tan",
        authorCompany: "Aria Cosmetics Indonesia",
        stars: 5,
    },
    {
        quoteEn: "Coordinating a nationwide rollout across 18 cities felt effortless thanks to MiNG’s massive inventory and single-point team.",
        quoteId: "Koordinasi kampanye serentak di 18 kota terasa mudah berkat inventaris masif dan tim terpadu yang disediakan MiNG.",
        authorName: "Reza Pahlevi",
        authorCompany: "Laju Telemedia Nusantara",
        stars: 5,
    },
    {
        quoteEn: "In-mall atrium totems and digital ceiling banners captured shoppers right before checkout, boosting our weekend footfall.",
        quoteId: "Digital totem atrium dan banner gantung mall menjangkau pengunjung tepat sebelum transaksi, menaikkan kunjungan akhir pekan kami.",
        authorName: "Amanda Gunawan",
        authorCompany: "Harvest Food & Beverage",
        stars: 5,
    },
    {
        quoteEn: "Strategic toll-gate and commuter corridor placements delivered consistent daily reach among our target homebuyer segment.",
        quoteId: "Penempatan strategis di gerbang tol dan koridor komuter memberi jangkauan harian konsisten ke segmen pembeli rumah kami.",
        authorName: "Kevin Wijaya",
        authorCompany: "Horizon Property Group",
        stars: 5,
    },
    {
        quoteEn: "Connecting street DOOH exposure with mobile retargeting via The Brain gave our marketing team measurable conversion attribution.",
        quoteId: "Menghubungkan paparan DOOH jalanan dengan retargeting seluler melalui The Brain memberi tim kami atribusi konversi yang terukur.",
        authorName: "Siska Prawira",
        authorCompany: "Aura Activewear Indonesia",
        stars: 5,
    },
];

const BRAND_LOGOS = [
    { src: "/assets/logos/brand-amazon.png", alt: "Amazon" },
    { src: "/assets/logos/brand-dribbble.png", alt: "Dribbble" },
    { src: "/assets/logos/brand-hubspot.png", alt: "HubSpot" },
    { src: "/assets/logos/brand-notion.png", alt: "Notion" },
    { src: "/assets/logos/brand-netflix.png", alt: "Netflix" },
    { src: "/assets/logos/brand-zoom.png", alt: "Zoom" },
];

export function ClientsTestimonialsSection() {
    const { t } = useLanguage();
    const trackRef = useRef<HTMLDivElement>(null);

    return (
        <section
            className="snap-section testimonial-page-wrapper"
            id="clients"
            data-nav-theme="dark"
            aria-label="Our Clients & Testimonial Section"
        >
            {/* Top Infinite Brand Logo Marquee */}
            <div className="brand-marquee-container" aria-label="Partner brands marquee">
                <div className="brand-marquee-track">
                    {/* Set 1 */}
                    <div className="brand-marquee-group" aria-hidden="true">
                        {[...BRAND_LOGOS, ...BRAND_LOGOS].map((b, i) => (
                            <img
                                key={`set1-${i}`}
                                src={b.src}
                                alt={b.alt}
                                className="brand-logo-img"
                                loading="lazy"
                            />
                        ))}
                    </div>
                    {/* Set 2 */}
                    <div className="brand-marquee-group" aria-hidden="true">
                        {[...BRAND_LOGOS, ...BRAND_LOGOS].map((b, i) => (
                            <img
                                key={`set2-${i}`}
                                src={b.src}
                                alt={b.alt}
                                className="brand-logo-img"
                                loading="lazy"
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Centered Yellow-Ruled Header */}
            <div className="testimonial-heading-bar">
                <span className="testimonial-rule" aria-hidden="true"></span>
                <h2 className="testimonial-title">{t("Testimonials", "Testimoni Klien")}</h2>
                <span className="testimonial-rule" aria-hidden="true"></span>
            </div>

            {/* Horizontal Testimonial Cards Carousel */}
            <div className="testimonial-track-wrap">
                <div
                    className="testimonial-track"
                    id="testimonialTrack"
                    ref={trackRef}
                    role="region"
                    aria-label="Client testimonials carousel"
                >
                    {DEFAULT_TESTIMONIALS.map((item, idx) => (
                        <article key={idx} className="t-testimonial-card">
                            <div className="t-card-silhouette" aria-hidden="true">
                                <svg viewBox="0 0 180 240" fill="currentColor" preserveAspectRatio="xMidYMax meet">
                                    <path d="M90 22c-22 0-37 16-37 39 0 12 4 23 11 31-16 8-34 23-41 47l-15 101h164l-15-101c-7-24-25-39-41-47 7-8 11-19 11-31 0-23-15-39-37-39z" />
                                </svg>
                            </div>
                            <div className="t-card-body">
                                <div className="t-quote-mark" aria-hidden="true">
                                    &ldquo;
                                </div>
                                <p className="t-quote-text">{t(item.quoteEn, item.quoteId)}</p>
                                <div className="t-author-block">
                                    <div className="t-author-name">{item.authorName}</div>
                                    <div className="t-author-company">{item.authorCompany}</div>
                                    <div className="t-stars" aria-label="5 out of 5 stars">
                                        ★★★★★
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

