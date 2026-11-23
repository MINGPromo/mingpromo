"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "./LanguageContext";
import type { SolutionNavLink } from "@/lib/solution-types";

const fallbackSolutions: SolutionNavLink[] = [
    { slug: "the-inside", badgeText: "THE INSIDE", navLabelEn: "Premium Mall Inventory", navLabelId: "Inventori Mall Premium" },
    { slug: "the-roadside", badgeText: "THE ROADSIDE", navLabelEn: "Roadside OOH & DOOH", navLabelId: "Roadside OOH & DOOH" },
    { slug: "the-movement", badgeText: "THE MOVEMENT", navLabelEn: "Mobile Ads", navLabelId: "Iklan Bergerak" },
    { slug: "the-experience", badgeText: "THE EXPERIENCE", navLabelEn: "Experiential & Activation", navLabelId: "Eksperiensial & Aktivasi" },
    { slug: "the-brain", badgeText: "THE BRAIN", navLabelEn: "OOH Measurement", navLabelId: "Pengukuran OOH" },
];

export function SiteHeader({ active = "home", solutionLinks }: { active?: string; solutionLinks?: SolutionNavLink[] } = {}) {
    const { locale, setLocale, t } = useLanguage();
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [onDark, setOnDark] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const links = solutionLinks && solutionLinks.length > 0 ? solutionLinks : fallbackSolutions;
    const hasPublishedLinks = Boolean(solutionLinks?.length);

    useEffect(() => {
        const darkSelector = '[data-nav-theme="dark"], .solutions-page-wrapper, .milestones-page-wrapper, .testimonial-page-wrapper, .cta-page-wrapper, .site-footer';
        let themeRaf: number | null = null;

        const updateNavTheme = () => {
            themeRaf = null;
            if (window.scrollY > 40) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }

            const siteHeader = headerRef.current;
            if (!siteHeader) return;

            const pillRect = siteHeader.getBoundingClientRect();
            const navCenterY = pillRect.height > 0 ? pillRect.top + pillRect.height / 2 : 46;
            const darkTargets = document.querySelectorAll(darkSelector);
            let isOverDark = false;

            for (let i = 0; i < darkTargets.length; i++) {
                const rect = darkTargets[i].getBoundingClientRect();
                if (rect.height > 0 && rect.top <= navCenterY && rect.bottom >= navCenterY) {
                    isOverDark = true;
                    break;
                }
            }

            setOnDark(isOverDark);
        };

        const scheduleNavTheme = () => {
            if (themeRaf === null) {
                themeRaf = window.requestAnimationFrame(updateNavTheme);
            }
        };

        window.addEventListener("scroll", scheduleNavTheme, { passive: true });
        window.addEventListener("resize", scheduleNavTheme, { passive: true });
        window.addEventListener("hashchange", scheduleNavTheme);
        updateNavTheme();

        return () => {
            window.removeEventListener("scroll", scheduleNavTheme);
            window.removeEventListener("resize", scheduleNavTheme);
            window.removeEventListener("hashchange", scheduleNavTheme);
            if (themeRaf !== null) cancelAnimationFrame(themeRaf);
        };
    }, []);

    return (
        <>
            <header className="header-container" id="siteHeaderWrapper">
                <nav
                    ref={headerRef}
                    className={`nav-pill ${scrolled ? "scrolled" : ""} ${onDark ? "on-dark" : ""}`}
                    id="siteHeader"
                    data-active={active}
                    aria-label="Main Navigation"
                >
                    {/* Brand / Logo */}
                    <Link href="/" className="brand-logo" aria-label="MING Media Promotion">
                        <Image
                            src="/assets/logos/LOGO%20ONLY%20ALT-01%20(2).png"
                            alt="MING Media Promotion"
                            width={1460}
                            height={420}
                            className="brand-logo-mark"
                        />
                    </Link>

                    {/* Center Navigation Links */}
                    <ul className="nav-menu">
                        <li
                            className={`nav-item has-dropdown ${dropdownOpen ? "open" : ""}`}
                            onMouseEnter={() => setDropdownOpen(true)}
                            onMouseLeave={() => setDropdownOpen(false)}
                        >
                            <Link
                                href="/#solutions"
                                className="nav-link dropdown-toggle"
                                onClick={(e) => {
                                    if (pathname === "/") {
                                        e.preventDefault();
                                        document.getElementById("solutions")?.scrollIntoView({ behavior: "smooth" });
                                    }
                                }}
                            >
                                <span>{t("Our Solution ▾", "Solusi Kami ▾")}</span>
                            </Link>
                            <div className="dropdown-menu">
                                {links.map((item) => (
                                    <Link href={hasPublishedLinks ? `/solutions/${item.slug}` : "/#solutions"} className="dropdown-item" key={item.slug}>
                                        <span>{item.badgeText}</span>
                                    </Link>
                                ))}
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link href="/#clients" className="nav-link">
                                {t("Our Client", "Klien Kami")}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/#insight" className="nav-link">
                                {t("Insight", "Wawasan")}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/#about" className="nav-link">
                                {t("About", "Tentang Kami")}
                            </Link>
                        </li>
                    </ul>

                    {/* Right Side: Language Toggle & CTA Button */}
                    <div className="nav-actions">
                        <div className="lang-selector" role="group" aria-label="Language selection">
                            <span
                                className={`lang-opt ${locale === "en" ? "active" : ""}`}
                                onClick={() => setLocale("en")}
                                style={{ cursor: "pointer" }}
                            >
                                EN
                            </span>
                            <span className="lang-divider">/</span>
                            <span
                                className={`lang-opt ${locale === "id" ? "active" : ""}`}
                                onClick={() => setLocale("id")}
                                style={{ cursor: "pointer" }}
                            >
                                IND
                            </span>
                        </div>

                        <Link href="/#contact" className="btn-contact">
                            {t("Contact Us!", "Hubungi Kami!")}
                        </Link>

                        {/* Mobile Hamburger Toggle */}
                        <button
                            className="mobile-toggle"
                            id="mobileToggle"
                            aria-label="Open menu"
                            aria-expanded={mobileOpen}
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </nav>
            </header>

            {/* Mobile Drawer Overlay */}
            <div className={`mobile-drawer ${mobileOpen ? "open" : ""}`} id="mobileDrawer">
                <Link href="/" onClick={() => setMobileOpen(false)}>
                    {t("Home", "Beranda")}
                </Link>
                <Link href="/#solutions" onClick={() => setMobileOpen(false)}>
                    {t("Our Solution", "Solusi Kami")}
                </Link>
                <Link href="/#clients" onClick={() => setMobileOpen(false)}>
                    {t("Our Client", "Klien Kami")}
                </Link>
                <Link href="/#insight" onClick={() => setMobileOpen(false)}>
                    {t("Insight", "Wawasan")}
                </Link>
                <Link href="/#about" onClick={() => setMobileOpen(false)}>
                    {t("About", "Tentang Kami")}
                </Link>
                <div style={{ marginTop: "24px", display: "flex", gap: "16px" }}>
                    <span
                        className={`lang-opt ${locale === "en" ? "active" : ""}`}
                        onClick={() => {
                            setLocale("en");
                            setMobileOpen(false);
                        }}
                        style={{ cursor: "pointer", fontWeight: 700 }}
                    >
                        English
                    </span>
                    <span>|</span>
                    <span
                        className={`lang-opt ${locale === "id" ? "active" : ""}`}
                        onClick={() => {
                            setLocale("id");
                            setMobileOpen(false);
                        }}
                        style={{ cursor: "pointer", fontWeight: 700 }}
                    >
                        Indonesia
                    </span>
                </div>
            </div>
        </>
    );
}
