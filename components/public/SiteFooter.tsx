"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./LanguageContext";
import type { SolutionNavLink } from "@/lib/solution-types";

const fallbackSolutions: SolutionNavLink[] = [
    { slug: "the-inside", badgeText: "THE INSIDE", navLabelEn: "Premium Mall Inventory", navLabelId: "Inventori Mall Premium" },
    { slug: "the-roadside", badgeText: "THE ROADSIDE", navLabelEn: "Roadside OOH & DOOH", navLabelId: "Roadside OOH & DOOH" },
    { slug: "the-movement", badgeText: "THE MOVEMENT", navLabelEn: "Mobile Ads", navLabelId: "Iklan Bergerak" },
    { slug: "the-experience", badgeText: "THE EXPERIENCE", navLabelEn: "Experiential & Activation", navLabelId: "Eksperiensial & Aktivasi" },
    { slug: "the-brain", badgeText: "THE BRAIN", navLabelEn: "OOH Measurement", navLabelId: "Pengukuran OOH" },
];

export function SiteFooter({ solutionLinks }: { solutionLinks?: SolutionNavLink[] } = {}) {
    const { t } = useLanguage();
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const links = solutionLinks && solutionLinks.length > 0 ? solutionLinks : fallbackSolutions;
    const hasPublishedLinks = Boolean(solutionLinks?.length);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setSubscribed(true);
            setEmail("");
        }
    };

    return (
        <footer className="site-footer" id="footer" aria-label="Footer MING Promotion">
            <div className="footer-container">
                <div className="footer-columns">
                    {/* Brand Column */}
                    <div className="footer-col-brand">
                        <Link href="/" className="footer-brand-logo" aria-label="MING Media Promotion">
                            <Image
                                src="/assets/logos/LOGO%20ONLY%20ALT-01%20(2).png"
                                alt="MING Media Promotion"
                                width={1460}
                                height={420}
                                className="footer-logo-img"
                            />
                        </Link>
                        <p className="footer-address">
                            Komplek Lodan Center Blok E nomor 5, RT.12/RW.5, Ancol, Kec. Pademangan, Jakarta Utara, Daerah Khusus Ibukota Jakarta 14430
                        </p>
                        <a href="https://wa.me/6285922206600" className="footer-wa" target="_blank" rel="noopener noreferrer">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                            </svg>
                            <span>+62 859 2220 6600</span>
                        </a>

                        <div className="footer-newsletter">
                            <div className="fn-title">{t("Don't Miss What's Next.", "Jangan Lewatkan Tren Terbaru.")}</div>
                            <div className="fn-subtitle">{t("Trends, ideas, and updates worth knowing.", "Wawasan, gagasan, dan inovasi yang layak diketahui.")}</div>
                            {subscribed ? (
                                <p style={{ color: "var(--ming-teal)", fontSize: "14px", marginTop: "8px" }}>
                                    ✓ {t("Thank you for subscribing!", "Terima kasih telah berlangganan!")}
                                </p>
                            ) : (
                                <form className="fn-form" onSubmit={handleSubscribe}>
                                    <input
                                        type="email"
                                        placeholder={t("Your Email", "Email Anda")}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        aria-label="Email address"
                                    />
                                    <button type="submit" aria-label="Subscribe newsletter">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="22" y1="2" x2="11" y2="13"></line>
                                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                        </svg>
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="footer-col">
                        <h3>{t("OUR SOLUTION", "SOLUSI KAMI")}</h3>
                        <ul>
                            {links.map((item) => (
                                <li key={item.slug}>
                                    <Link href={hasPublishedLinks ? `/solutions/${item.slug}` : "/#solutions"}>
                                        {item.badgeText} <small>{t(item.navLabelEn, item.navLabelId)}</small>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h3>{t("RESOURCES", "SUMBER DAYA")}</h3>
                        <ul>
                            <li><Link href="/#contact">{t("CONTACT US", "HUBUNGI KAMI")}</Link></li>
                            <li><Link href="/#faq">{t("FAQ", "TANYA JAWAB")}</Link></li>
                            <li><Link href="/#about">{t("CAREER", "KARIER")}</Link></li>
                            <li><Link href="/#solutions">{t("SITEMAP", "PETA SITUS")}</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h3>{t("SOCIAL", "MEDIA SOSIAL")}</h3>
                        <ul>
                            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">INSTAGRAM</a></li>
                            <li><a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">TIKTOK</a></li>
                            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LINKEDIN</a></li>
                            <li><a href="https://threads.net" target="_blank" rel="noopener noreferrer">THREAD</a></li>
                            <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YOUTUBE</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-copyright">
                    <p>Copyright © 2026 MING PROMOTION. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

