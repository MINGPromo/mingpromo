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

export type FooterLinks = {
    careerUrl?: string;
    sitemapUrl?: string;
};

export function SiteFooter({ solutionLinks, footerLinks }: { solutionLinks?: SolutionNavLink[]; footerLinks?: FooterLinks } = {}) {
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
        <footer className="site-footer footer-page-wrapper" id="footer" aria-label="Footer MING Promotion">
            <div className="footer-inner">
                <div className="footer-main-grid footer-grid">
                    {/* LEFT COLUMN: Brand Logo, Address, WhatsApp, Newsletter */}
                    <div className="footer-left-col footer-left">
                        <Link href="/" className="footer-brand-logo footer-logo" aria-label="MING Media Promotion">
                            <Image
                                src="/assets/logos/ming-footer-logo.png"
                                alt="MING Media Promotion"
                                width={180}
                                height={50}
                                className="footer-logo-img"
                                priority
                            />
                        </Link>
                        <p className="footer-address">
                            Komplek Lodan Center Blok E nomor 5, RT.12/RW.5, Ancol, Kec. Pademangan, Jakarta Utara, Daerah Khusus Ibukota Jakarta 14430
                        </p>
                        <a href="https://wa.me/6285922206600" className="footer-wa-link footer-wa" target="_blank" rel="noopener noreferrer">
                            <svg className="footer-wa-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                            </svg>
                            <span>+62 859 2220 6600</span>
                        </a>

                        <div className="footer-newsletter">
                            <div className="newsletter-title">{t("Don't Miss What's Next.", "Jangan Lewatkan Tren Terbaru.")}</div>
                            <div className="newsletter-sub">{t("Trends, ideas, and updates worth knowing.", "Wawasan, gagasan, dan inovasi yang layak diketahui.")}</div>
                            {subscribed ? (
                                <p style={{ color: "var(--ming-teal, #00b2be)", fontSize: "13px", marginTop: "8px", fontWeight: 600 }}>
                                    ✓ {t("Thank you for subscribing!", "Terima kasih telah berlangganan!")}
                                </p>
                            ) : (
                                <form className="newsletter-form" onSubmit={handleSubscribe}>
                                    <input
                                        type="email"
                                        className="newsletter-input"
                                        placeholder={t("Your Email", "Email Anda")}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        aria-label="Email address"
                                    />
                                    <button type="submit" className="newsletter-btn" aria-label="Subscribe newsletter">
                                        <svg className="newsletter-send-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="22" y1="2" x2="11" y2="13"></line>
                                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                        </svg>
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: 3 Navigation Sub-columns */}
                    <div className="footer-right-grid footer-nav-grid">
                        {/* Sub-col 1: OUR SOLUTION */}
                        <div className="footer-nav-col footer-col">
                            <h4>{t("OUR SOLUTION", "SOLUSI KAMI")}</h4>
                            <ul>
                                {links.map((item) => (
                                    <li key={item.slug} className="solution-nav-item footer-solution-item">
                                        <Link 
                                            href={hasPublishedLinks ? `/solutions/${item.slug}` : "/our-solution"}
                                            className="solution-nav-title footer-solution-title"
                                        >
                                            <span className="solution-badge-text">{item.badgeText}</span>
                                            <span className="solution-nav-sub footer-solution-sub">
                                                {t(item.navLabelEn, item.navLabelId)}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Sub-col 2: RESOURCES */}
                        <div className="footer-nav-col footer-col">
                            <h4>{t("RESOURCES", "SUMBER DAYA")}</h4>
                            <ul>
                                <li><Link href="/#contact" className="footer-nav-link footer-link">{t("CONTACT US", "HUBUNGI KAMI")}</Link></li>
                                <li><Link href="/#faq" className="footer-nav-link footer-link">{t("FAQ", "TANYA JAWAB")}</Link></li>
                                {footerLinks?.careerUrl && <li><Link href={footerLinks.careerUrl} className="footer-nav-link footer-link">{t("CAREER", "KARIER")}</Link></li>}
                                {footerLinks?.sitemapUrl && <li><Link href={footerLinks.sitemapUrl} className="footer-nav-link footer-link">{t("SITEMAP", "PETA SITUS")}</Link></li>}
                            </ul>
                        </div>

                        {/* Sub-col 3: SOCIAL MEDIA */}
                        <div className="footer-nav-col footer-col">
                            <h4>{t("SOCIAL", "MEDIA SOSIAL")}</h4>
                            <ul>
                                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-nav-link footer-link">INSTAGRAM</a></li>
                                <li><a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="footer-nav-link footer-link">TIKTOK</a></li>
                                <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-nav-link footer-link">LINKEDIN</a></li>
                                <li><a href="https://threads.net" target="_blank" rel="noopener noreferrer" className="footer-nav-link footer-link">THREAD</a></li>
                                <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer-nav-link footer-link">YOUTUBE</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Divider Line */}
                <div className="footer-divider" />

                {/* Copyright Bottom */}
                <div className="footer-bottom">
                    <p className="footer-copyright">
                        Copyright © 2026 MING PROMOTION. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
