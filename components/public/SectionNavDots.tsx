"use client";

import React, { useEffect, useState } from "react";

const SECTIONS = [
    { id: "hero", title: "Hero" },
    { id: "solutions", title: "Our Solution" },
    { id: "milestones", title: "Our Journey & Milestones" },
    { id: "insight", title: "Our Insight" },
    { id: "solution-finder", title: "Campaign Solution Finder" },
    { id: "clients", title: "Our Clients & Testimonial" },
    { id: "contact", title: "Contact Us" },
    { id: "faq", title: "FAQ & Footer" },
];

export function SectionNavDots() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY + window.innerHeight * 0.4;
            const elements = SECTIONS.map((s) => document.getElementById(s.id));

            for (let i = elements.length - 1; i >= 0; i--) {
                const el = elements[i];
                if (el) {
                    const top = el.offsetTop;
                    if (scrollPos >= top) {
                        setActiveIndex(i);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav className="section-nav-dots" aria-label="Section Navigation">
            {SECTIONS.map((s, idx) => (
                <button
                    key={s.id}
                    type="button"
                    className={`nav-dot ${activeIndex === idx ? "active" : ""}`}
                    data-index={idx}
                    aria-label={`Go to ${s.title}`}
                    title={s.title}
                    onClick={() => scrollToSection(s.id)}
                />
            ))}
        </nav>
    );
}

