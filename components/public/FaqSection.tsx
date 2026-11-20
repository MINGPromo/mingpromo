"use client";

import React, { useState } from "react";
import { useLanguage } from "./LanguageContext";

interface FaqItem {
    id: string;
    qEn: string;
    qId: string;
    aEn: string;
    aId: string;
}

interface FaqCategory {
    key: string;
    labelEn: string;
    labelId: string;
    items: FaqItem[];
}

const FAQ_DATA: FaqCategory[] = [
    {
        key: "about",
        labelEn: "About MING Promotion",
        labelId: "Tentang MING Promotion",
        items: [
            {
                id: "about-1",
                qEn: "What is MING Promotion?",
                qId: "Apa itu MING Promotion?",
                aEn: "MING Promotion is an Out-of-Home (OOH) and Digital Out-of-Home (DOOH) advertising company in Indonesia, offering creative media solutions to help brands connect with their audiences.",
                aId: "MING Promotion adalah perusahaan periklanan Out-of-Home (OOH) dan Digital Out-of-Home (DOOH) di Indonesia, yang menawarkan solusi media kreatif untuk membantu brand terhubung dengan audiens mereka.",
            },
            {
                id: "about-2",
                qEn: "What is the difference between OOH and DOOH advertising?",
                qId: "Apa perbedaan antara iklan OOH dan DOOH?",
                aEn: "OOH refers to traditional static outdoor media like billboards and banners, while DOOH includes digital screens, videotron displays, and interactive media that present dynamic, real-time multimedia content.",
                aId: "OOH merujuk pada media luar ruang statis seperti billboard dan spanduk, sedangkan DOOH mencakup layar digital, videotron, dan media interaktif yang menayangkan konten multimedia dinamis secara real-time.",
            },
            {
                id: "about-3",
                qEn: "Why choose MING Promotion?",
                qId: "Mengapa memilih MING Promotion?",
                aEn: "With 25+ years of experience, 12,000+ nationwide OOH spots, 250+ premium mall networks, mobile experiential fleets, and AI audience measurement, MING delivers high-impact campaigns with proven recall.",
                aId: "Dengan pengalaman 25+ tahun, 12.000+ titik OOH nasional, jaringan di 250+ mall premium, armada mobile experiential, dan pengukuran AI, MING menghadirkan kampanye berdampak tinggi dan terukur.",
            },
        ],
    },
    {
        key: "products",
        labelEn: "Products & Services",
        labelId: "Produk & Layanan",
        items: [
            {
                id: "prod-1",
                qEn: "What advertising formats does MING provide?",
                qId: "Format iklan apa saja yang disediakan MING?",
                aEn: "We provide five integrated pillars: The Outside (mobile LED trucks & experiential showcases), The Inside (premium shopping mall LED networks), The Roadside (arterial highway billboards & digital videotrons), The Ground (field activations & pop-ups), and The Brain (AI audience measurement).",
                aId: "Kami menyediakan lima pilar terpadu: The Outside (truk LED mobile & etalase berjalan), The Inside (jaringan LED mall premium), The Roadside (billboard jalan protokol & videotron), The Ground (aktivasi lapangan & pop-up), serta The Brain (pengukuran audiens AI).",
            },
            {
                id: "prod-2",
                qEn: "Can different media formats be combined into one campaign?",
                qId: "Bisakah format media yang berbeda digabungkan dalam satu kampanye?",
                aEn: "Yes. We specialize in cross-channel OOH campaigns that seamlessly combine roadside mass awareness, shopping mall frequency, mobile experiential roadshows, and on-ground brand engagement.",
                aId: "Ya. Kami mengkhususkan diri dalam kampanye lintas media OOH yang memadukan awareness massal jalan protokol, frekuensi mall premium, roadshow armada mobile, dan interaksi langsung di lapangan.",
            },
            {
                id: "prod-3",
                qEn: "Do you provide 3D anamorphic and custom experiential builds?",
                qId: "Apakah MING menyediakan animasi 3D anamorphic dan instalasi kustom?",
                aEn: "Yes. We design and execute bespoke 3D anamorphic video content, glass-box showcase trucks, interactive kinetic displays, and full-vehicle experiential conversions tailored to your concept.",
                aId: "Ya. Kami merancang dan memproduksi konten animasi 3D anamorphic, truk etalase kaca tembus pandang, instalasi kinetik interaktif, dan konversi armada kustom sesuai visi kreatif brand Anda.",
            },
        ],
    },
    {
        key: "locations",
        labelEn: "Locations & Placements",
        labelId: "Lokasi & Penempatan",
        items: [
            {
                id: "loc-1",
                qEn: "Where are MING advertising locations located?",
                qId: "Di mana saja lokasi titik iklan MING berada?",
                aEn: "Our nationwide network covers major commercial corridors across Greater Jakarta (Jabodetabek), Surabaya, Bandung, Medan, Bali, Semarang, and other key tier-1 and tier-2 cities across Indonesia.",
                aId: "Jaringan nasional kami mencakup koridor komersial utama di Jabodetabek, Surabaya, Bandung, Medan, Bali, Semarang, dan kota-kota strategis lainnya di seluruh Indonesia.",
            },
            {
                id: "loc-2",
                qEn: "Which shopping malls have MING media networks?",
                qId: "Pusat perbelanjaan mana saja yang memiliki jaringan media MING?",
                aEn: "We operate across 250+ top lifestyle malls, including Grand Indonesia, Plaza Indonesia, Senayan City, Pondok Indah Mall, Kota Kasablanka, Central Park, and leading regional lifestyle destinations.",
                aId: "Kami hadir di lebih dari 250+ mall gaya hidup papan atas, termasuk Grand Indonesia, Plaza Indonesia, Senayan City, Pondok Indah Mall, Kota Kasablanka, Central Park, dan mall regional utama.",
            },
            {
                id: "loc-3",
                qEn: "Can we customize the route and schedule of mobile LED trucks?",
                qId: "Bisakah rute dan jadwal operasional truk LED mobile disesuaikan?",
                aEn: "Yes. Mobile LED routes, operational hours, and stop-off locations can be tailored to target specific commercial centers, business districts, university clusters, or high-profile events.",
                aId: "Ya. Rute armada truk LED, jam operasional, dan titik singgah dapat disesuaikan secara presisi untuk menjangkau pusat bisnis, kawasan perkantoran, klaster kampus, atau area acara khusus.",
            },
        ],
    },
    {
        key: "pricing",
        labelEn: "Pricing & Booking",
        labelId: "Harga & Pemesanan",
        items: [
            {
                id: "price-1",
                qEn: "How is advertising pricing calculated?",
                qId: "Bagaimana perhitungan biaya dan harga pasang iklan?",
                aEn: "Rates depend on the media format, location tier, campaign duration, screen share-of-voice (SOV), and production requirements. We offer flexible options from daily activations to annual packages.",
                aId: "Biaya ditentukan berdasarkan format media, tier lokasi, durasi kampanye, share-of-voice (SOV) layar, dan kebutuhan teknis produksi. Tersedia paket fleksibel harian hingga kontrak tahunan.",
            },
            {
                id: "price-2",
                qEn: "What is the minimum booking duration?",
                qId: "Berapa durasi booking minimum untuk beriklan?",
                aEn: "Digital roadside videotrons and mall screens typically start from 1 to 2 weeks. Mobile LED activations can be scheduled for single-day events, while static billboards generally run on monthly cycles.",
                aId: "Videotron digital jalan protokol dan layar mall umumnya mulai dari durasi 1 hingga 2 minggu. Truk LED mobile dapat dibooking harian untuk event khusus, sementara billboard statis mulai dari 1 bulan.",
            },
            {
                id: "price-3",
                qEn: "How can I receive an official proposal and media plan?",
                qId: "Bagaimana cara mendapatkan proposal resmi dan rencana media?",
                aEn: "Simply click 'Request a Proposal' or contact our team via the form. Share your campaign goals, target markets, timing, and budget range, and our media strategists will respond within 24 hours.",
                aId: "Cukup klik tombol 'Request a Proposal' atau hubungi kami melalui formulir. Sampaikan tujuan kampanye, target pasar, waktu, dan estimasi anggaran, tim kami akan merespons dalam 24 jam kerja.",
            },
        ],
    },
    {
        key: "technical",
        labelEn: "Advertising Materials & Technical Requirements",
        labelId: "Materi Iklan & Syarat Teknis",
        items: [
            {
                id: "tech-1",
                qEn: "What file formats and specs are required for DOOH screens?",
                qId: "Format file dan spesifikasi apa yang dibutuhkan untuk layar DOOH?",
                aEn: "We support MP4 (H.264), MOV, JPEG, and PNG. Aspect ratios vary by placement (16:9 landscape, 9:16 portrait, or custom LED configurations). Exact technical guidelines are supplied upon campaign booking.",
                aId: "Kami menerima file format MP4 (H.264), MOV, JPEG, dan PNG. Rasio aspek bervariasi (16:9 lanskap, 9:16 potret, atau dimensi LED kustom). Lembar spesifikasi teknis lengkap akan diberikan saat pemesanan.",
            },
            {
                id: "tech-2",
                qEn: "Does MING provide creative adaptation and production support?",
                qId: "Apakah MING menyediakan bantuan adaptasi desain dan produksi kreatif?",
                aEn: "Yes. Our internal creative team assists with formatting, motion graphic adaptation, 3D anamorphic rendering, vehicle wrap printing, and physical construction for immersive ground activations.",
                aId: "Ya. Tim kreatif in-house kami siap membantu adaptasi ukuran, motion graphics, rendering visual 3D anamorphic, cetak wrap armada, hingga konstruksi fisik untuk aktivasi langsung.",
            },
            {
                id: "tech-3",
                qEn: "What is the deadline for submitting creative assets before launch?",
                qId: "Berapa tenggat waktu pengiriman materi iklan sebelum penayangan?",
                aEn: "For digital screens, final assets should be delivered 3 to 5 business days before the flight date for QC testing. For static print banners and vehicle wraps, 7 to 10 business days are recommended.",
                aId: "Untuk layar digital DOOH, materi final diserahkan 3-5 hari kerja sebelum tanggal tayang untuk uji tayang (QC). Untuk cetak banner statis dan wrap armada, disarankan 7-10 hari kerja.",
            },
        ],
    },
    {
        key: "reporting",
        labelEn: "Campaign & Reporting",
        labelId: "Kampanye & Laporan",
        items: [
            {
                id: "rep-1",
                qEn: "How does MING measure and track campaign performance?",
                qId: "Bagaimana MING mengukur dan melacak performa kampanye?",
                aEn: "Through 'The Brain', our proprietary measurement framework, we evaluate traffic flow, estimated impressions, audience dwell time, demographic profiles, and GPS live telemetry for mobile fleets.",
                aId: "Melalui pilar 'The Brain', kami mengukur arus lalu lintas, estimasi impresi tayang, dwell time audiens, profil demografi, serta log rute GPS real-time untuk armada berjalan.",
            },
            {
                id: "rep-2",
                qEn: "Do clients receive proof of performance (POP) photos and videos?",
                qId: "Apakah klien menerima dokumentasi bukti tayang (POP)?",
                aEn: "Yes. High-resolution photo and video Proof of Performance (POP) is delivered within 48 hours of campaign launch, complemented by a comprehensive wrap-up analytics summary upon completion.",
                aId: "Ya. Dokumentasi foto dan video Proof of Performance (POP) beresolusi tinggi diberikan dalam 48 jam setelah kampanye dimulai, disertai ringkasan performa menyeluruh saat kampanye usai.",
            },
            {
                id: "rep-3",
                qEn: "Can creative content be updated while the campaign is running?",
                qId: "Bisakah materi iklan diganti atau diperbarui selama kampanye berlangsung?",
                aEn: "On digital DOOH screens and mobile LED units, creative materials can be refreshed or swapped remotely with 24 to 48 hours notice, enabling dynamic promotions and contextual messages.",
                aId: "Pada videotron digital DOOH dan truk LED mobile, materi iklan dapat diganti atau diperbarui secara berkala dengan pemberitahuan 24-48 jam kerja untuk mendukung promo yang fleksibel.",
            },
        ],
    },
];

export function FaqSection() {
    const { t } = useLanguage();
    const [activeCat, setActiveCat] = useState("about");
    const [openCards, setOpenCards] = useState<Record<string, boolean>>({
        "about-1": true,
        "prod-1": true,
        "loc-1": true,
        "price-1": true,
        "tech-1": true,
        "rep-1": true,
    });

    const activeGroup = FAQ_DATA.find((c) => c.key === activeCat) || FAQ_DATA[0];

    const toggleCard = (id: string) => {
        setOpenCards((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <div className="faq-page-wrapper">
            <div className="faq-inner">
                <h2 className="faq-title">{t("Frequently Asked Questions", "Pertanyaan yang Sering Diajukan")}</h2>

                {/* Category Filter Tabs */}
                <div className="faq-category-pills" role="tablist" aria-label="FAQ Categories">
                    {FAQ_DATA.map((cat) => (
                        <button
                            key={cat.key}
                            className={`faq-pill ${activeCat === cat.key ? "active" : ""}`}
                            data-cat={cat.key}
                            role="tab"
                            aria-selected={activeCat === cat.key}
                            onClick={() => setActiveCat(cat.key)}
                        >
                            <span>{t(cat.labelEn, cat.labelId)}</span>
                        </button>
                    ))}
                </div>

                {/* Active Category Subtitle */}
                <h3 className="faq-active-cat-title" id="faqCurrentCategoryTitle">
                    {t(activeGroup.labelEn, activeGroup.labelId)}
                </h3>

                {/* Accordion Items Container */}
                <div className="faq-items-list" id="faqItemsList" role="tabpanel">
                    <div className="faq-group active" data-cat-group={activeGroup.key}>
                        {activeGroup.items.map((item) => {
                            const isOpen = !!openCards[item.id];
                            return (
                                <div key={item.id} className={`faq-card ${isOpen ? "open" : ""}`}>
                                    <button
                                        type="button"
                                        className="faq-card-header"
                                        aria-expanded={isOpen}
                                        onClick={() => toggleCard(item.id)}
                                    >
                                        <span className="faq-card-question">
                                            <strong className="faq-q-prefix">Q:</strong>
                                            <span className="faq-q-text">{t(item.qEn, item.qId)}</span>
                                        </span>
                                        <span className="faq-card-icon" aria-hidden="true">
                                            <svg viewBox="0 0 28 28" fill="none">
                                                <circle cx="14" cy="14" r="12" stroke="#00b2be" strokeWidth="2.2" />
                                                <line className="faq-icon-h" x1="8" y1="14" x2="20" y2="14" stroke="#00b2be" strokeWidth="2.2" strokeLinecap="round" />
                                                <line className="faq-icon-v" x1="14" y1="8" x2="14" y2="20" stroke="#00b2be" strokeWidth="2.2" strokeLinecap="round" />
                                            </svg>
                                        </span>
                                    </button>
                                    <div className="faq-card-body">
                                        <div className="faq-card-body-inner">
                                            <p className="faq-card-answer">{t(item.aEn, item.aId)}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

