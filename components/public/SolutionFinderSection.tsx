"use client";

import React, { useState } from "react";
import { useLanguage } from "./LanguageContext";

interface QuestionOption {
    val: string;
    labelEn: string;
    labelId: string;
    subEn: string;
    subId: string;
}

interface QuestionDef {
    titleEn: string;
    titleId: string;
    subEn: string;
    subId: string;
    options: QuestionOption[];
}

const QUESTIONS: QuestionDef[] = [
    {
        titleEn: "What is happening in your business?",
        titleId: "Apa yang sedang terjadi di bisnis Anda?",
        subEn: "Choose the situation closest to your campaign.",
        subId: "Pilih situasi yang paling mendekati kampanye Anda.",
        options: [
            { val: "launch", labelEn: "Launching a new product or service", labelId: "Peluncuran produk atau layanan baru", subEn: "I need people to notice something new quickly.", subId: "Saya ingin orang segera menyadari produk baru ini." },
            { val: "awareness", labelEn: "Building brand awareness", labelId: "Membangun brand awareness", subEn: "I want stronger visibility and repeated presence.", subId: "Saya butuh visibilitas kuat dan kehadiran berulang." },
            { val: "event", labelEn: "Promoting an event or moment", labelId: "Promosi event atau momentum khusus", subEn: "I need attention around a date, venue, or community moment.", subId: "Saya butuh atensi intensif seputar tanggal, venue, atau momen komunitas." },
            { val: "traffic", labelEn: "Driving people to a location", labelId: "Mengarahkan kunjungan ke lokasi", subEn: "I want to support store, mall, venue, or area visitation.", subId: "Saya ingin meningkatkan kunjungan ke toko, mall, atau lokasi tertentu." },
        ],
    },
    {
        titleEn: "What is your primary campaign objective?",
        titleId: "Apa tujuan utama kampanye Anda?",
        subEn: "Select the metric that matters most.",
        subId: "Pilih dampak yang paling Anda prioritaskan.",
        options: [
            { val: "reach", labelEn: "Maximum city-wide reach", labelId: "Jangkauan massal seluruh kota", subEn: "Broadest possible exposure along main commute lines.", subId: "Eksposur seluas mungkin di sepanjang jalur arteri kota." },
            { val: "engagement", labelEn: "High-dwell engagement", labelId: "Interaksi dan retensi tinggi", subEn: "Capturing consumers during leisure or shopping moments.", subId: "Menjangkau konsumen saat sedang santai atau berbelanja." },
            { val: "activation", labelEn: "Direct experiential activation", labelId: "Aktivasi pengalaman langsung", subEn: "Sampling, product trial, or interactive consumer touchpoints.", subId: "Uji coba produk, sampling, atau interaksi tatap muka." },
            { val: "prestige", labelEn: "Iconic brand prestige", labelId: "Prestise dan citra brand ikonik", subEn: "Unmissable landmark visual dominance.", subId: "Dominasi visual di lokasi ikonik perkotaan." },
        ],
    },
    {
        titleEn: "Where does your audience spend their time?",
        titleId: "Di mana audiens Anda beraktivitas?",
        subEn: "Pick their primary touchpoint.",
        subId: "Tentukan lingkungan utama mereka.",
        options: [
            { val: "mall", labelEn: "Premier shopping malls & lifestyle hubs", labelId: "Mall prestisius & pusat lifestyle", subEn: "High-intent consumers ready to browse and buy.", subId: "Konsumen siap belanja dengan daya beli tinggi." },
            { val: "roadside", labelEn: "Major arterial roads & toll corridors", labelId: "Jalan protokol & jalur tol arteri", subEn: "Daily commuters, drivers, and transit travelers.", subId: "Penglaju harian, pengendara, dan pengguna transportasi." },
            { val: "mobile", labelEn: "Scattered urban zones & event clusters", labelId: "Zona urban tersebar & klaster acara", subEn: "Dynamic audiences requiring mobile coverage.", subId: "Audiens dinamis yang membutuhkan kehadiran fleksibel." },
            { val: "transit", labelEn: "Transit stations & commuter hubs", labelId: "Stasiun transit & simpul komuter", subEn: "High-volume pedestrians on daily routines.", subId: "Arus pejalan kaki masif dalam perjalanan harian." },
        ],
    },
    {
        titleEn: "What execution format fits best?",
        titleId: "Format eksekusi apa yang paling sesuai?",
        subEn: "Choose your creative presentation.",
        subId: "Pilih cara penyampaian pesan kreatif Anda.",
        options: [
            { val: "dooh", labelEn: "Full-motion digital screens (DOOH)", labelId: "Layar digital animasi penuh (DOOH)", subEn: "Dynamic video content and daypart scheduling.", subId: "Konten video dinamis dengan rotasi terjadwal." },
            { val: "static", labelEn: "Continuous static dominance", labelId: "Dominasi statis eksklusif", subEn: "100% Share of Voice without rotating slots.", subId: "Kepemilikan slot tayang penuh 100% tanpa bergantian." },
            { val: "mobile_exp", labelEn: "Mobile LED & roving display", labelId: "Armada Mobile LED & display keliling", subEn: "Route-targeted roaming visibility.", subId: "Visibilitas berpindah dengan rute khusus target Anda." },
            { val: "activation_full", labelEn: "Experiential pop-up & stage", labelId: "Pop-up aktivasi interaktif & panggung", subEn: "Transforming spaces into immersive brand hubs.", subId: "Mengubah area publik menjadi ruang interaksi brand." },
        ],
    },
];

export function SolutionFinderSection() {
    const { locale, t } = useLanguage();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({ 0: "launch" });
    const [contact, setContact] = useState("");
    const [showResult, setShowResult] = useState(false);

    const handleSelectOption = (val: string) => {
        setAnswers((prev) => ({ ...prev, [step]: val }));
    };

    const handleNext = () => {
        if (step < QUESTIONS.length - 1) {
            setStep(step + 1);
        } else {
            setShowResult(true);
        }
    };

    const handleBack = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    const handleRestart = () => {
        setStep(0);
        setShowResult(false);
    };

    // Determine tailored recommendation
    const env = answers[2] || "mall";
    const moment = answers[0] || "launch";

    let result = {
        titleEn: "THE INSIDE: Premium Mall Inventory",
        titleId: "THE INSIDE: Inventory Mall Premium",
        descEn: "Suspended digital atriums, giant LED screens, and elevator wraps in Indonesia's top shopping malls capture high-intent audiences directly at the point of decision.",
        descId: "Digital banner atrium gantung, giant LED, dan branding lift di pusat perbelanjaan terkemuka Indonesia menjangkau audiens tepat di titik pengambilan keputusan.",
        roleEn: "Role: High-Impact Retail Dominance",
        roleId: "Peran: Dominasi Ritel Berdampak Tinggi",
        envEn: "Environment: Premier Shopping Malls",
        envId: "Lingkungan: Pusat Perbelanjaan Premium",
        formatEn: "Format: Atrium DOOH / Parapet LED",
        formatId: "Format: DOOH Atrium / Parapet LED",
    };

    if (env === "mobile" || moment === "launch") {
        result = {
            titleEn: "THE OUTSIDE: Mobile LED & Dynamic Fleet",
            titleId: "THE OUTSIDE: Mobile LED & Armada Dinamis",
            descEn: "A roaming digital LED and experiential truck medium designed for dynamic city-wide reach, flexible route scheduling, and high-impact product launches.",
            descId: "Media LED keliling dan armada truk interaktif fleksibel yang menjangkau seluruh penjuru kota secara masif, sangat ideal untuk momentum peluncuran produk baru.",
            roleEn: "Role: Dynamic City Fleet",
            roleId: "Peran: Armada Kota Bergerak",
            envEn: "Environment: Multi-Route Urban",
            envId: "Lingkungan: Rute Urban Tersebar",
            formatEn: "Format: High-Impact DOOH",
            formatId: "Format: Layar Digital Interaktif",
        };
    } else if (env === "roadside") {
        result = {
            titleEn: "THE ROADSIDE: Roadside LED & Landmark Videotron",
            titleId: "THE ROADSIDE: LED Jalan Protokol & Videotron Ikonik",
            descEn: "High-visibility large format digital OOH positioned on prime commuter arteries and commercial corridors for continuous 24/7 city-wide impact.",
            descId: "Layar digital LED format besar di jalan protokol strategis dan koridor komersial utama dengan jangkauan impresi masif tanpa henti 24/7.",
            roleEn: "Role: Continuous Mass Reach",
            roleId: "Peran: Jangkauan Massal 24/7",
            envEn: "Environment: Prime Commuter Roads",
            envId: "Lingkungan: Jalan Protokol Utama",
            formatEn: "Format: Landmark DOOH / Static",
            formatId: "Format: Billboard & Videotron",
        };
    }

    const currentQ = QUESTIONS[step];
    const progressPercent = showResult ? 100 : Math.round(((step + 1) / QUESTIONS.length) * 100);

    return (
        <section className="snap-section finder-page-wrapper" id="solution-finder" aria-label="Campaign Solution Finder">
            <div className="finder-inner-container">
                {/* Heading & Deskripsi di luar card quiz (sesuai instruksi user) */}
                <div className="finder-section-header">
                    <h2 className="finder-section-title">
                        <span>{t("Find Your Best OOH Mix", "Temukan Kombinasi OOH Terbaik Anda")}</span>
                    </h2>
                    <p className="finder-section-desc">
                        <span>
                            {t(
                                "Not sure which media fits your campaign? Answer 4 quick questions below to get a tailored OOH recommendation.",
                                "Belum yakin media mana yang paling cocok? Jawab 4 pertanyaan singkat di bawah ini untuk rekomendasi OOH yang tepat."
                            )}
                        </span>
                    </p>
                </div>

                <div className="home-finder-shell" id="homeFinder">
                    {/* Left Dark Aside */}
                    <aside className="home-finder-aside">
                        <div className="aside-top-content">
                            <div className="mini">
                                <span>{t("HOW IT WORKS", "CARA KERJA")}</span>
                            </div>
                            <h3 className="aside-title">
                                <span>{t("Answer four campaign questions.", "Jawab empat pertanyaan kampanye.")}</span>
                            </h3>
                            <p className="aside-desc">
                                <span>
                                    {t(
                                        "We use your answers to rank the most relevant MING solution roles and suggest an integrated alternative when useful.",
                                        "Kami menggunakan jawaban Anda untuk memetakan solusi MING yang paling relevan dan menyarankan alternatif media mix yang terintegrasi."
                                    )}
                                </span>
                            </p>

                            <div className="home-finder-steps">
                                {["Campaign moment", "Primary objective", "Audience environment", "Execution preference"].map((name, idx) => {
                                    const labelsId = ["Momen kampanye", "Tujuan utama", "Lingkungan audiens", "Preferensi eksekusi"];
                                    const isActive = idx === step && !showResult;
                                    const isDone = idx < step || showResult;
                                    return (
                                        <div
                                            key={idx}
                                            className={`home-finder-step ${isActive ? "active" : ""} ${isDone ? "completed" : ""}`}
                                            onClick={() => {
                                                if (idx <= step) {
                                                    setStep(idx);
                                                    setShowResult(false);
                                                }
                                            }}
                                            style={{ cursor: idx <= step ? "pointer" : "default" }}
                                        >
                                            <i>{idx + 1}</i>
                                            <span>{t(name, labelsId[idx])}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="aside-footer">
                            <span>{t("Instant AI-Guided Recommendation", "Rekomendasi Terpandu Instan")}</span>
                        </div>
                    </aside>

                    {/* Right Main Box */}
                    <div className="home-finder-main">
                        <div className="finder-top-bar">
                            <div className="finder-progress-track">
                                <div className="finder-progress-fill" style={{ width: `${progressPercent}%` }}></div>
                            </div>
                        </div>

                        {!showResult ? (
                            <>
                                <div className="home-finder-q active">
                                    <div className="q-tag">QUESTION 0{step + 1}</div>
                                    <h3 className="q-title">
                                        <span>{locale === "id" ? currentQ.titleId : currentQ.titleEn}</span>
                                    </h3>
                                    <div className="q-sub">
                                        <span>{locale === "id" ? currentQ.subId : currentQ.subEn}</span>
                                    </div>

                                    <div className="home-finder-options">
                                        {currentQ.options.map((opt) => {
                                            const isSelected = answers[step] === opt.val;
                                            return (
                                                <div
                                                    key={opt.val}
                                                    className={`home-finder-option ${isSelected ? "selected" : ""}`}
                                                    onClick={() => handleSelectOption(opt.val)}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <strong>{locale === "id" ? opt.labelId : opt.labelEn}</strong>
                                                    <span>{locale === "id" ? opt.subId : opt.subEn}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="home-finder-controls">
                                    <div className="finder-contact-wrap">
                                        <input
                                            type="text"
                                            className="finder-contact-input"
                                            placeholder={t("Phone / WhatsApp or Email *", "No. HP / WhatsApp atau Email *")}
                                            value={contact}
                                            onChange={(e) => setContact(e.target.value)}
                                        />
                                    </div>
                                    <div className="finder-nav-actions">
                                        {step > 0 && (
                                            <button type="button" className="btn-finder-back" onClick={handleBack}>
                                                ← {t("Back", "Kembali")}
                                            </button>
                                        )}
                                        <button
                                            type="button"
                                            className="btn-finder-next"
                                            onClick={handleNext}
                                            disabled={!answers[step]}
                                        >
                                            {step === QUESTIONS.length - 1
                                                ? t("See Recommendation →", "Lihat Rekomendasi →")
                                                : t("Next →", "Lanjut →")}
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="home-finder-result active">
                                <div className="result-kicker">
                                    <span>{t("RECOMMENDED SOLUTION", "SOLUSI DIREKOMENDASIKAN")}</span>
                                </div>
                                <h3 className="result-title">{locale === "id" ? result.titleId : result.titleEn}</h3>
                                <p className="result-desc">{locale === "id" ? result.descId : result.descEn}</p>
                                <div className="result-meta-grid">
                                    <span className="result-meta-pill">{locale === "id" ? result.roleId : result.roleEn}</span>
                                    <span className="result-meta-pill">{locale === "id" ? result.envId : result.envEn}</span>
                                    <span className="result-meta-pill">{locale === "id" ? result.formatId : result.formatEn}</span>
                                </div>
                                <div className="result-actions">
                                    <a className="finder-result-btn" href="#solutions">
                                        <span>{t("Explore This Solution →", "Lihat Solusi Ini →")}</span>
                                    </a>
                                    <button type="button" className="finder-recalculate-btn" onClick={handleRestart}>
                                        <span>← {t("Change Answers", "Ubah Pilihan")}</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

