"use client";

import React, { useEffect, useState, useRef } from "react";
import { useLanguage } from "./LanguageContext";

export interface MetricItem {
    id?: string;
    targetNumber: number;
    suffix: string;
    formatComma: boolean;
    highlightEn: string;
    labelEn: string;
    highlightId: string;
    labelId: string;
}

const DEFAULT_METRICS: MetricItem[] = [
    {
        targetNumber: 25,
        suffix: "+",
        formatComma: false,
        highlightEn: "OOH",
        labelEn: "Years of OOH experience",
        highlightId: "OOH",
        labelId: "Tahun pengalaman OOH",
    },
    {
        targetNumber: 50,
        suffix: "M",
        formatComma: false,
        highlightEn: "Impressions",
        labelEn: "Monthly Impressions",
        highlightId: "Impresi",
        labelId: "Impresi Bulanan",
    },
    {
        targetNumber: 12000,
        suffix: "+",
        formatComma: true,
        highlightEn: "Nationwide",
        labelEn: "OOH spots Nationwide",
        highlightId: "Nasional",
        labelId: "Titik OOH Nasional",
    },
    {
        targetNumber: 250,
        suffix: "+",
        formatComma: false,
        highlightEn: "across Indonesia",
        labelEn: "Mall media across Indonesia",
        highlightId: "di seluruh Indonesia",
        labelId: "Media Mall di seluruh Indonesia",
    },
];

export function HeroStatsBar({ items }: { items?: MetricItem[] }) {
    const { locale } = useLanguage();
    const data = (items && items.length > 0) ? items : DEFAULT_METRICS;
    const [counts, setCounts] = useState<number[]>(data.map(() => 0));
    const [started, setStarted] = useState(false);
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = barRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started) {
                    setStarted(true);
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [started]);

    useEffect(() => {
        if (!started) return;

        const duration = 1800;
        const startTime = performance.now();

        const updateCounters = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);

            const nextCounts = data.map((item) => Math.round(item.targetNumber * ease));
            setCounts(nextCounts);

            if (progress < 1) {
                requestAnimationFrame(updateCounters);
            }
        };

        requestAnimationFrame(updateCounters);
    }, [started, data]);

    const formatNum = (num: number, useComma: boolean) => {
        if (!useComma) return num.toString();
        return num.toLocaleString("en-US");
    };

    return (
        <div ref={barRef} className="stats-bar hero-stats-bar" aria-label="MING Statistics and Track Record">
            <div className="stats-container">
                {data.map((item, idx) => {
                    const displayNum = started ? formatNum(counts[idx], item.formatComma) : formatNum(item.targetNumber, item.formatComma);
                    const label = locale === "id" ? item.labelId : item.labelEn;
                    const highlight = locale === "id" ? item.highlightId : item.highlightEn;

                    // Split label around highlight to render <strong>
                    let before = label;
                    let after = "";
                    if (highlight && label.toLowerCase().includes(highlight.toLowerCase())) {
                        const parts = label.split(new RegExp(`(${highlight})`, "i"));
                        if (parts.length >= 3) {
                            before = parts[0];
                            after = parts.slice(2).join("");
                        }
                    }

                    return (
                        <div key={idx} className="stat-col">
                            <div className="stat-number stat-counter">
                                {displayNum}{item.suffix}
                            </div>
                            <div className="stat-label">
                                {before}
                                <strong>{highlight}</strong>
                                {after}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

