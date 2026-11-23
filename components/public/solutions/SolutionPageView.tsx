"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";
import { useLanguage } from "@/components/public/LanguageContext";
import type { SolutionNavLink, SolutionPageInput } from "@/lib/solution-types";

function HeroTitle({ value }: { value: string }) {
  const words = value.trim().split(/\s+/);
  const emphasis = words.pop() ?? value;
  return (
    <h1>
      {words.length > 0 && <span>{words.join(" ")}</span>}
      <strong>{emphasis}</strong>
    </h1>
  );
}

export function SolutionPageView({
  page,
  solutionLinks,
  preview = false,
}: {
  page: SolutionPageInput;
  solutionLinks: SolutionNavLink[];
  preview?: boolean;
}) {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeFaqCategory, setActiveFaqCategory] = useState(page.faqCategories[0]?.key ?? "");
  const [openFaqId, setOpenFaqId] = useState<string | null>(page.faqCategories[0]?.items[0]?.id ?? null);

  const activeFaq = page.faqCategories.find((category) => category.key === activeFaqCategory) ?? page.faqCategories[0];
  const products = useMemo(
    () => page.products.filter((product) => activeFilter === "all" || product.filterKeys.split(/\s+/).includes(activeFilter)),
    [activeFilter, page.products],
  );

  const introBody = t(page.introBodyEn, page.introBodyId).split(/\n\s*\n/).filter(Boolean);

  return (
    <div className="solution-page-root">
      <SiteHeader active="solutions" solutionLinks={solutionLinks} />
      {preview && <div className="solution-preview-banner">Draft preview — halaman ini belum dipublikasikan.</div>}

      <main>
        <section className="solution-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(9,13,20,.78), rgba(9,13,20,.28) 58%, rgba(9,13,20,.1)), url(${page.heroImage})` }}>
          <div className="solution-hero-content">
            <nav className="solution-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">{t("Home", "Beranda")}</Link><span>/</span><span>{page.badgeText}</span>
            </nav>
            <span className="solution-badge">{page.badgeText}</span>
            <HeroTitle value={t(page.heroTitleEn, page.heroTitleId)} />
            <p>{t(page.heroDescriptionEn, page.heroDescriptionId)}</p>
            <div className="solution-hero-actions">
              <a href={page.primaryCtaHref} className="solution-button solution-button-primary">{t(page.primaryCtaLabelEn, page.primaryCtaLabelId)}</a>
              <a href={page.secondaryCtaHref} className="solution-button solution-button-light">{t(page.secondaryCtaLabelEn, page.secondaryCtaLabelId)}</a>
            </div>
          </div>
        </section>

        <section className="solution-introduction">
          <div className="solution-intro-copy">
            <p className="solution-eyebrow">{t(page.introEyebrowEn, page.introEyebrowId)}</p>
            <h2>{t(page.introTitleEn, page.introTitleId)}</h2>
            {introBody.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
          <div className="solution-intro-image"><Image src={page.introImage} alt={t(page.introTitleEn, page.introTitleId)} fill sizes="(max-width: 1024px) 100vw, 45vw" /></div>
        </section>

        <section className="solution-benefits" data-nav-theme="dark">
          <div className="solution-benefits-heading">
            <h2>{t(page.benefitsTitleEn, page.benefitsTitleId)}</h2>
            <p>{t(page.benefitsDescriptionEn, page.benefitsDescriptionId)}</p>
          </div>
          {page.benefits.length > 0 && (
            <div className="solution-benefit-grid" style={{ "--benefit-count": Math.min(page.benefits.length, 5) } as React.CSSProperties}>
              {page.benefits.map((benefit) => (
                <article key={benefit.id ?? `${benefit.titleEn}-${benefit.titleId}`}>
                  <h3>{t(benefit.titleEn, benefit.titleId)}</h3>
                  <p>{t(benefit.descriptionEn, benefit.descriptionId)}</p>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="solution-products" id="products">
          <div className="solution-products-heading">
            <h2>{t(page.productsTitleEn, page.productsTitleId)}</h2>
            <p>{t(page.productsDescriptionEn, page.productsDescriptionId)}</p>
          </div>

          {page.filters.length > 0 && (
            <div className="solution-filter-row">
              <div className="solution-filter-pills" role="group" aria-label={t("Filter media", "Filter media")}>
                <button type="button" className={activeFilter === "all" ? "active" : ""} onClick={() => setActiveFilter("all")}>{t("All Formats", "Semua Format")}</button>
                {page.filters.map((filter) => <button type="button" key={filter.id ?? filter.key} className={activeFilter === filter.key ? "active" : ""} onClick={() => setActiveFilter(filter.key)}>{t(filter.labelEn, filter.labelId)}</button>)}
              </div>
              <label className="solution-filter-select">
                <span className="sr-only">{t("Media type", "Jenis media")}</span>
                <select value={activeFilter} onChange={(event) => setActiveFilter(event.target.value)}>
                  <option value="all">{t("All Media Types", "Semua Jenis Media")}</option>
                  {page.filters.map((filter) => <option value={filter.key} key={filter.id ?? filter.key}>{t(filter.labelEn, filter.labelId)}</option>)}
                </select>
              </label>
            </div>
          )}

          <div className="solution-product-grid">
            {products.map((product, index) => (
              <a href={product.href} className="solution-product-card" key={product.id ?? `${product.nameEn}-${index}`}>
                <div className="solution-product-media">
                  <Image src={product.imageUrl} alt={t(product.imageAltEn, product.imageAltId)} fill sizes="(max-width: 720px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  <span>{t(product.tagLabelEn, product.tagLabelId)}</span>
                </div>
                <div className="solution-product-name">{t(product.nameEn, product.nameId)}</div>
              </a>
            ))}
          </div>
          {products.length === 0 && <p className="solution-empty">{t("No media matches this filter.", "Tidak ada media yang sesuai dengan filter ini.")}</p>}
        </section>

        {activeFaq && (
          <section className="solution-faq" id="faq">
            <h2>{t(page.faqTitleEn, page.faqTitleId)}</h2>
            <div className="solution-faq-pills" role="tablist" aria-label={t("FAQ categories", "Kategori FAQ")}>
              {page.faqCategories.map((category) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={category.key === activeFaq.key}
                  className={category.key === activeFaq.key ? "active" : ""}
                  key={category.id ?? category.key}
                  onClick={() => { setActiveFaqCategory(category.key); setOpenFaqId(category.items[0]?.id ?? null); }}
                >
                  {t(category.labelEn, category.labelId)}
                </button>
              ))}
            </div>
            <h3>{t(activeFaq.labelEn, activeFaq.labelId)}</h3>
            <div className="solution-faq-list">
              {activeFaq.items.map((item, index) => {
                const itemKey = item.id ?? `${activeFaq.key}-${index}`;
                const isOpen = openFaqId === itemKey;
                return (
                  <article className={isOpen ? "open" : ""} key={itemKey}>
                    <button type="button" aria-expanded={isOpen} onClick={() => setOpenFaqId(isOpen ? null : itemKey)}>
                      <span><b>Q:</b> {t(item.questionEn, item.questionId)}</span><i aria-hidden="true">{isOpen ? "−" : "+"}</i>
                    </button>
                    {isOpen && <div><p>{t(item.answerEn, item.answerId)}</p></div>}
                  </article>
                );
              })}
            </div>
          </section>
        )}

        <section className="solution-final-cta" id="contact" data-nav-theme="dark">
          <h2>{t(page.ctaTitleEn, page.ctaTitleId)}<br /><em>{t(page.ctaEmphasisEn, page.ctaEmphasisId)}</em></h2>
          <p>{t(page.ctaDescriptionEn, page.ctaDescriptionId)}</p>
          <a href={page.ctaButtonHref} className="solution-button solution-button-yellow">{t(page.ctaButtonLabelEn, page.ctaButtonLabelId)}</a>
        </section>
      </main>

      <SiteFooter solutionLinks={solutionLinks} />
    </div>
  );
}
