"use client";

import React from "react";
import { useLanguage } from "./LanguageContext";

export function ContactCtaSection() {
    const { t } = useLanguage();

    return (
        <section
            className="snap-section cta-page-wrapper"
            id="contact"
            data-nav-theme="dark"
            aria-label="Call to Action Section"
        >
            <div className="cta-inner">
                <h2 className="cta-headline">
                    <span>{t("Your city,", "Kota Anda,")}</span>
                    <br />
                    <i>{t("our stage.", "panggung kami.")}</i>
                </h2>
                <p className="cta-desc">
                    <span>
                        {t(
                            "Tell us about your brand and campaign goals – our team will put together the best mix of OOH, DOOH, and mobile ads to reach them.",
                            "Ceritakan tujuan brand dan kampanye Anda – tim kami akan menyusun kombinasi OOH, DOOH, dan iklan bergerak terbaik untuk menjangkaunya."
                        )}
                    </span>
                </p>
                <a className="cta-btn" id="ctaProposalBtn" href="#solution-finder">
                    <span>{t("Request a Proposal >", "Minta Proposal >")}</span>
                </a>
            </div>
        </section>
    );
}

