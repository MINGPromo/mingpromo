"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter, type FooterLinks } from "@/components/public/SiteFooter";
import { useLanguage } from "@/components/public/LanguageContext";
import type { SolutionNavLink } from "@/lib/solution-types";

type OverviewData = {
  heroTitleEn: string; heroTitleId: string; heroDescriptionEn: string; heroDescriptionId: string; heroImage: string;
  heroPrimaryCtaLabelEn: string; heroPrimaryCtaLabelId: string; heroPrimaryCtaHref: string;
  heroSecondaryCtaLabelEn: string; heroSecondaryCtaLabelId: string; heroSecondaryCtaHref: string;
  heroSupportingLineEn: string; heroSupportingLineId: string;
  introEyebrowEn: string; introEyebrowId: string; introTitleEn: string; introTitleId: string; introBodyEn: string; introBodyId: string;
  layersEyebrowEn: string; layersEyebrowId: string; layersTitleEn: string; layersTitleId: string; layersDescriptionEn: string; layersDescriptionId: string;
  ctaTitleEn: string; ctaTitleId: string; ctaEmphasisEn: string; ctaEmphasisId: string; ctaDescriptionEn: string; ctaDescriptionId: string;
  ctaButtonLabelEn: string; ctaButtonLabelId: string; ctaButtonHref: string;
  ctaSecondaryButtonLabelEn: string; ctaSecondaryButtonLabelId: string; ctaSecondaryButtonHref: string;
  ctaReassuranceEn: string; ctaReassuranceId: string;
};

type Card = {
  slug: string; badgeText: string; navLabelEn: string; navLabelId: string;
  overviewHeadlineEn: string; overviewHeadlineId: string; heroImage: string;
};

function cleanMultiline(value: string) {
  return value.replace(/\\n/g, "\n").replace(/\r\n/g, "\n").trim();
}

export function SolutionOverviewView({
  overview,
  cards,
  solutionLinks,
  footerLinks,
}: {
  overview: OverviewData;
  cards: Card[];
  solutionLinks: SolutionNavLink[];
  footerLinks?: FooterLinks;
}) {
  const { t } = useLanguage();
  const initialIndex = Math.floor(cards.length / 2);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const dragState = useRef({ active: false, moved: false, startX: 0, scrollLeft: 0 });

  const introParagraphs = useMemo(
    () => cleanMultiline(t(overview.introBodyEn, overview.introBodyId)).split(/\n\s*\n/).filter(Boolean),
    [overview.introBodyEn, overview.introBodyId, t],
  );

  const scrollToCard = (index: number) => {
    setActiveIndex(index);
    const scroller = scrollerRef.current;
    const card = cardRefs.current[index];
    if (!scroller || !card) return;
    const offset = card.offsetLeft - (scroller.clientWidth - card.clientWidth) / 2;
    scroller.scrollTo({ left: offset, behavior: "smooth" });
  };

  const updateActiveCardOnScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller || cards.length === 0) return;

    const center = scroller.scrollLeft + scroller.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(cardCenter - center);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  const handleCardClick = (event: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    if (dragState.current.moved) {
      event.preventDefault();
      dragState.current.moved = false;
      return;
    }

    if (index !== activeIndex) {
      event.preventDefault();
      scrollToCard(index);
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const scroller = scrollerRef.current;
    if (!scroller) return;
    dragState.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      scrollLeft: scroller.scrollLeft,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active) return;
    const delta = event.clientX - dragState.current.startX;
    if (Math.abs(delta) > 8) {
      dragState.current.moved = true;
    }
    const scroller = scrollerRef.current;
    if (scroller && dragState.current.moved) {
      scroller.scrollLeft = dragState.current.scrollLeft - delta;
    }
  };

  const handlePointerUp = () => {
    dragState.current.active = false;
  };

  return (
    <div className="solution-overview-root">
      <SiteHeader active="solutions" solutionLinks={solutionLinks} />
      <main>
        {/* HERO SECTION EXACTLY MATCHING FIGMA: Flush Left Yellow Ribbon + White Bold Italic Text */}
        <section
          className="solution-overview-hero"
          data-nav-theme="dark"
          style={{
            backgroundImage: `url(${overview.heroImage || '/assets/media/our-solution-hero.webp'})`,
          }}
        >
          <div className="solution-overview-hero-content">
            <div className="solution-hero-yellow-ribbon">
              <h1 className="solution-hero-ribbon-text">OUR SOLUTION.</h1>
            </div>
            <p className="solution-overview-hero-copy">
              {t(
                "From high-impact roadside billboards to premium mall LED screens, mobile advertising and real-world brand experiences,.",
                "Dari billboard roadside berdaya jangkau tinggi hingga layar LED mall premium, media bergerak, dan pengalaman brand di dunia nyata,."
              )}
            </p>
          </div>
        </section>

        {/* SECTION WHAT WE DO: Aligned to Figma */}
        <section className="solution-overview-intro" aria-labelledby="solution-intro-title">
          {/* BADGE "What We Do" (Figma: Prominent Teal Pill) */}
          <div className="solution-overview-intro-badge-row">
            <span className="solution-overview-label">{t("What We Do", "Yang Kami Lakukan")}</span>
          </div>

          <div className="solution-overview-intro-grid">
            {/* LEFT COLUMN: Headings with yellow pills */}
            <div className="solution-overview-intro-heading">
              <h2 id="solution-intro-title">
                <span className="solution-intro-line">Different Brands.</span>
                <span className="solution-intro-line">Different Goals.</span>
                <span className="solution-intro-highlight-group">
                  <span className="yellow-pill-tag">One Connected</span>
                  <span className="yellow-pill-tag">Ecosystem.</span>
                </span>
              </h2>
            </div>

            {/* RIGHT COLUMN: 4 Paragraphs (Wide ~760px) */}
            <div className="solution-overview-intro-copy">
              {introParagraphs.length > 0 ? (
                introParagraphs.map((paragraph, index) => <p key={`${paragraph.slice(0, 24)}-${index}`}>{paragraph}</p>)
              ) : (
                <>
                  <p>{t("Every campaign starts with a goal. Maybe you want more people to recognize your brand, introduce a new product, reach shoppers near retail destinations or create an experience people will remember.", "Setiap kampanye dimulai dengan sebuah tujuan. Mungkin Anda ingin lebih banyak orang mengenali brand Anda, memperkenalkan produk baru, menjangkau pengunjung di sekitar destinasi retail, atau menciptakan pengalaman yang akan mereka ingat.")}</p>
                  <p>{t("MING Promotion brings together five advertising ecosystems to help you find the right approach.", "MING Promotion menyatukan lima ekosistem periklanan untuk membantu Anda menemukan pendekatan yang tepat.")}</p>
                  <p>{t("From static and digital out-of-home advertising to mobile media, experiential marketing and audience insights, our solutions are designed to support different campaign objectives, locations and audience environments.", "Dari iklan luar ruang statis dan digital hingga media bergerak, pemasaran eksperiensial, dan wawasan audiens, solusi kami dirancang untuk mendukung berbagai tujuan kampanye, lokasi, dan lingkungan audiens.")}</p>
                  <p>{t("Explore each solution to discover how your brand can connect with people beyond traditional advertising channels.", "Jelajahi setiap solusi untuk menemukan bagaimana brand Anda dapat terhubung dengan audiens melampaui saluran periklanan tradisional.")}</p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* CARDS CAROUSEL: Pure manual horizontal interaction, NO vertical auto-scroll */}
        {cards.length > 0 && (
          <section className="solution-overview-layers" id="ecosystem" aria-label={t("Five advertising ecosystems", "Lima ekosistem periklanan")}>
            <div
              ref={scrollerRef}
              className="solution-overview-carousel"
              role="region"
              aria-label={t("Five advertising connection layers", "Lima lapisan koneksi periklanan")}
              tabIndex={0}
              onScroll={updateActiveCardOnScroll}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") { event.preventDefault(); scrollToCard((activeIndex + 1) % cards.length); }
                if (event.key === "ArrowLeft") { event.preventDefault(); scrollToCard((activeIndex - 1 + cards.length) % cards.length); }
              }}
            >
              <div className="solution-overview-carousel-spacer" aria-hidden="true" />
              {cards.map((card, index) => (
                <Link
                  ref={(node) => { cardRefs.current[index] = node; }}
                  href={`/solutions/${card.slug}`}
                  className={`solution-overview-layer-card${index === activeIndex ? " is-active" : ""}`}
                  key={card.slug}
                  aria-current={index === activeIndex ? "true" : undefined}
                  onClick={(event) => handleCardClick(event, index)}
                >
                  <div className="solution-overview-layer-image"><Image src={card.heroImage} alt="" fill sizes="(max-width: 640px) 82vw, 360px" /></div>
                  <div className="solution-overview-layer-copy">
                    <span className="solution-layer-badge">{card.badgeText}</span>
                    <h3 className="solution-layer-title">{t(card.overviewHeadlineEn || card.navLabelEn, card.overviewHeadlineId || card.navLabelId)}</h3>
                  </div>
                </Link>
              ))}
              <div className="solution-overview-carousel-spacer" aria-hidden="true" />
            </div>
            {cards.length > 1 && (
              <div className="solution-overview-carousel-controls">
                <div className="solution-overview-carousel-dots" aria-label={t("Choose solution", "Pilih solusi")}>
                  {cards.map((card, index) => (
                    <button
                      key={card.slug}
                      type="button"
                      className={index === activeIndex ? "is-active" : ""}
                      onClick={() => scrollToCard(index)}
                      aria-label={`${index + 1}. ${card.badgeText}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* CTA WAVE SECTION */}
        <section className="solution-overview-cta">
          <h2>
            <span>{t("Your city,", "Kota Anda,")}</span><br />
            <em>{t("our stage.", "panggung kami.")}</em>
          </h2>
          <p className="solution-overview-cta-copy">
            {t(
              "Tell us about your brand and campaign goals - our team will put together the best mix of OOH, DOOH, and mobile ads to reach them.",
              "Beri tahu kami tentang brand dan tujuan kampanye Anda - tim kami akan menyusun kombinasi terbaik OOH, DOOH, dan iklan mobile untuk mencapainya."
            )}
          </p>
          <div className="solution-overview-cta-actions">
            <a href="/#contact" className="solution-button solution-button-yellow">
              {t("Request a Proposal >", "Minta Proposal >")}
            </a>
          </div>
        </section>
      </main>
      <SiteFooter solutionLinks={solutionLinks} footerLinks={footerLinks} />
    </div>
  );
}
