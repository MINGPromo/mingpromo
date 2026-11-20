"use client";

import React from "react";

export interface TickerItem {
    id?: string;
    productType: string;
    locationName: string;
    impressions: string;
}

const DEFAULT_TICKERS: TickerItem[] = [
    { productType: "LED Screen", locationName: "23 Paskal, Bandung", impressions: "1,107,250 impressions/mo" },
    { productType: "Digital Totem", locationName: "Kuningan City Mall", impressions: "2,870,139 impressions/mo" },
    { productType: "Hanging Banner", locationName: "Pondok Indah Mall 1", impressions: "2,101,757 impressions/mo" },
    { productType: "Static Billboard", locationName: "WTC Serpong", impressions: "1,351,822 impressions/mo" },
    { productType: "Pillar Wrap", locationName: "Kemang Village", impressions: "1,866,975 impressions/mo" },
    { productType: "Indoor Videotron", locationName: "Metropolitan Mall", impressions: "1,380,702 impressions/mo" },
    { productType: "Mega LED Facade", locationName: "Grand Indonesia", impressions: "3,450,120 impressions/mo" },
    { productType: "Escalator Branding", locationName: "Central Park Mall", impressions: "3,120,400 impressions/mo" },
    { productType: "Elevator Wrap", locationName: "Senayan City", impressions: "2,980,500 impressions/mo" },
    { productType: "Digital Screen Network", locationName: "Mall Kelapa Gading", impressions: "2,640,800 impressions/mo" },
    { productType: "Curved LED", locationName: "Tunjungan Plaza Surabaya", impressions: "2,890,300 impressions/mo" },
    { productType: "Atrium Lightbox", locationName: "Sun Plaza Medan", impressions: "1,620,450 impressions/mo" },
    { productType: "Digital Spectacular", locationName: "Beachwalk Bali", impressions: "1,480,900 impressions/mo" },
];

export function HeroTickerRibbon({ items }: { items?: TickerItem[] }) {
    const list = (items && items.length > 0) ? items : DEFAULT_TICKERS;

    const renderList = (ariaHidden?: boolean) => (
        <div className="ticker-content" aria-hidden={ariaHidden}>
            {list.map((item, idx) => (
                <React.Fragment key={idx}>
                    <span className="ticker-item">
                        <strong className="ticker-prod">{item.productType}</strong>{" "}
                        {item.locationName} — {item.impressions}
                    </span>
                    <span className="ticker-sep">•</span>
                </React.Fragment>
            ))}
        </div>
    );

    return (
        <div className="hero-ticker-ribbon" aria-label="Live Impressions Ticker">
            <div className="ticker-track">
                {renderList(false)}
                {renderList(true)}
            </div>
        </div>
    );
}

