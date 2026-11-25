"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";
import { useLanguage } from "@/components/public/LanguageContext";
import { SolutionProductDetailView } from "@/components/public/solutions/SolutionProductDetailView";
import type { SolutionNavLink, SolutionPageInput } from "@/lib/solution-types";

function HeroTitle({ value }: { value: string }) {
  return (
    <h1 className="solution-hero-title">
      {value}
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
  const [activeProductSlug, setActiveProductSlug] = useState<string | null>(null);
  const [activeFaqCategory, setActiveFaqCategory] = useState(page.faqCategories[0]?.key ?? "");
  const [openFaqId, setOpenFaqId] = useState<string | null>(page.faqCategories[0]?.items[0]?.id ?? null);

  const activeFaq = page.faqCategories.find((category) => category.key === activeFaqCategory) ?? page.faqCategories[0];
  const products = useMemo(
    () => page.products.filter((product) => activeFilter === "all" || product.filterKeys.split(/\s+/).includes(activeFilter)),
    [activeFilter, page.products],
  );

  const introBody = t(page.introBodyEn, page.introBodyId).split(/\n\s*\n/).filter(Boolean);
  const activeProduct = page.products.find((product) => product.slug === activeProductSlug) ?? null;

  useEffect(() => {
    if (page.templateVariant !== "showcase") return;
    const syncHash = () => {
      const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      setActiveProductSlug(hash && page.products.some((product) => product.slug === hash) ? hash : null);
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);
    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
    };
  }, [page.products, page.templateVariant]);

  const selectProduct = (slug: string) => {
    if (!slug) return;
    setActiveProductSlug(slug);
    window.history.pushState(null, "", `#${encodeURIComponent(slug)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const backToSolution = () => {
    setActiveProductSlug(null);
    window.history.pushState(null, "", window.location.pathname + window.location.search);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="solution-page-root">
      <SiteHeader active="solutions" solutionLinks={solutionLinks} />
      {preview && <div className="solution-preview-banner">Draft preview — halaman ini belum dipublikasikan.</div>}

      <main>
        {activeProduct ? (
          <SolutionProductDetailView
            product={activeProduct}
            products={page.products}
            solutionBadge={page.badgeText}
            solutionSlug={page.slug}
            solutionFaqCategories={page.faqCategories}
            t={t}
            onSelectProduct={selectProduct}
            onBackToSolution={backToSolution}
          />
        ) : <>
        {/* HERO SECTION MATCHING FIGMA: 750px height, pure yellow title, dynamic CMS image */}
        <section
          className="solution-hero"
          data-nav-theme="dark"
          style={{
            backgroundImage: `url(${page.heroImage})`,
          }}
        >
          <div className="solution-hero-overlay" aria-hidden="true" />
          <div className="solution-hero-content">
            <nav className="solution-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">{t("HOME", "BERANDA")}</Link>
              <span className="solution-breadcrumb-separator">/</span>
              <span className="solution-breadcrumb-current">{page.badgeText || "THE ROADSIDE"}</span>
            </nav>
            <HeroTitle value={t(page.heroTitleEn, page.heroTitleId)} />
            <p>{t(page.heroDescriptionEn, page.heroDescriptionId)}</p>
            <div className="solution-hero-actions">
              <a href={page.primaryCtaHref || "#products"} className="solution-button solution-button-teal">
                {t(page.primaryCtaLabelEn, page.primaryCtaLabelId) || "EXPLORE MEDIA"}
              </a>
              <a href={page.secondaryCtaHref || "/#contact"} className="solution-button solution-button-ghost">
                {t(page.secondaryCtaLabelEn, page.secondaryCtaLabelId) || "PLAN YOUR CAMPAIGN"}
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 2: INTRODUCTION (Figma: White background, 2 columns) */}
        <section className="solution-introduction" aria-labelledby="solution-intro-heading">
          <div className="solution-intro-copy">
            <p className="solution-eyebrow">{t(page.introEyebrowEn, page.introEyebrowId) || "INTRODUCTION"}</p>
            <h2 id="solution-intro-heading">{t(page.introTitleEn, page.introTitleId)}</h2>
            {introBody.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <div className="solution-intro-image">
            <Image
              src={page.introImage || "/assets/media/eco-the-roadside.webp"}
              alt={t(page.introTitleEn, page.introTitleId)}
              fill
              sizes="(max-width: 1024px) 100vw, 544px"
            />
          </div>
        </section>

        {/* SECTION 3: WHY CHOOSE / BENEFITS (Figma: Pitch Black background, Single White 5-Column Card) */}
        <section className="solution-benefits" data-nav-theme="dark" aria-labelledby="solution-benefits-title">
          <div className="solution-benefits-inner">
            <div className="solution-benefits-heading">
              <h2 id="solution-benefits-title">{t(page.benefitsTitleEn, page.benefitsTitleId)}</h2>
              <p>{t(page.benefitsDescriptionEn, page.benefitsDescriptionId)}</p>
            </div>

            {page.benefits.length > 0 && (
              <div
                className="solution-benefit-grid"
                style={{ "--benefit-count": Math.min(page.benefits.length, 5) } as React.CSSProperties}
              >
                {page.benefits.map((benefit) => (
                  <article key={benefit.id ?? `${benefit.titleEn}-${benefit.titleId}`}>
                    <h3>{t(benefit.titleEn, benefit.titleId)}</h3>
                    <p>{t(benefit.descriptionEn, benefit.descriptionId)}</p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* EXPLORE LOCATIONS SECTION MATCHING FIGMA: Filters + 6 Cards with City Badge & Cyan Footer */}
        <section className={`solution-products ${page.templateVariant === "showcase" ? "solution-products-showcase" : ""}`} id="products">
          <div className="solution-products-heading">
            <h2>{t(page.productsTitleEn, page.productsTitleId)}</h2>
            <p>{t(page.productsDescriptionEn, page.productsDescriptionId)}</p>
          </div>

          {page.templateVariant !== "showcase" && (
            <div className="solution-filter-row">
              <div className="solution-filter-pills" role="group" aria-label={t("Filter locations", "Filter lokasi")}>
                <button type="button" className={activeFilter === "all" ? "active" : ""} onClick={() => setActiveFilter("all")}>
                  {t("All Locations", "Semua Lokasi")}
                </button>
                {page.filters.map((filter) => (
                  <button type="button" key={filter.id ?? filter.key} className={activeFilter === filter.key ? "active" : ""} onClick={() => setActiveFilter(filter.key)}>
                    {t(filter.labelEn, filter.labelId)}
                  </button>
                ))}
              </div>
              <label className="solution-filter-select">
                <span className="sr-only">{t("Media type", "Jenis media")}</span>
                <select value={activeFilter} onChange={(event) => setActiveFilter(event.target.value)}>
                  <option value="all">{t("All Media Types ▾", "Semua Jenis Media ▾")}</option>
                  {page.filters.map((filter) => <option value={filter.key} key={filter.id ?? filter.key}>{t(filter.labelEn, filter.labelId)}</option>)}
                </select>
              </label>
            </div>
          )}

          {page.templateVariant === "showcase" && page.products.length > 0 ? (
            <div className="solution-showcase-content solution-showcase-entry">
              <div className="solution-product-selector" role="tablist" aria-label={t("Choose a format", "Pilih format")}>
                {page.products.map((product) => (
                  <button type="button" role="tab" aria-selected="false" key={product.id ?? product.nameEn} onClick={() => selectProduct(product.slug ?? "")}>
                    {t(product.nameEn, product.nameId)}
                  </button>
                ))}
              </div>
              <div className="solution-showcase-entry-grid">
                {page.products.map((product) => (
                  <button type="button" key={product.id ?? product.nameEn} onClick={() => selectProduct(product.slug ?? "")}>
                    <div><Image src={product.detailHeroImage || product.imageUrl} alt={t(product.imageAltEn, product.imageAltId)} fill sizes="(max-width: 720px) 100vw, 50vw" /></div>
                    <span>{t(product.tagLabelEn, product.tagLabelId)}</span>
                    <h3>{t(product.nameEn, product.nameId)}</h3>
                    <p>{t(product.detailDescriptionEn || product.imageAltEn, product.detailDescriptionId || product.imageAltId)}</p>
                    <b>{t("View full product →", "Lihat detail produk →")}</b>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="solution-product-grid">
                {products.map((product, index) => (
                  <a href={product.href || "#"} className="solution-product-card" key={product.id ?? `${product.nameEn}-${index}`}>
                    <div className="solution-product-media">
                      <Image src={product.imageUrl} alt={t(product.imageAltEn, product.imageAltId)} fill sizes="(max-width: 720px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                      {product.tagLabelEn && <span className="solution-product-city-badge">{t(product.tagLabelEn, product.tagLabelId)}</span>}
                    </div>
                    <div className="solution-product-footer-bar">{t(product.nameEn, product.nameId)}</div>
                  </a>
                ))}
              </div>
              <div className="solution-products-more">
                <button type="button" className="solution-button solution-button-teal">
                  {t("More Locations", "Lebih Banyak Lokasi")}
                </button>
              </div>
            </>
          )}
          {page.templateVariant !== "showcase" && products.length === 0 && <p className="solution-empty">{t("No media matches this filter.", "Tidak ada media yang sesuai dengan filter ini.")}</p>}
        </section>
        </>}

        {/* FAQ SECTION MATCHING FIGMA: Centered heading, Yellow active pill, Cyan inactive pills, clean accordion */}
        {!activeProduct && activeFaq && (
          <section className="solution-faq" id="faq">
            <h2>{t(page.faqTitleEn || "Frequently Asked Questions", page.faqTitleId || "Pertanyaan yang Sering Diajukan")}</h2>
            <div className="solution-faq-pills" role="tablist" aria-label={t("FAQ categories", "Kategori FAQ")}>
              {page.faqCategories.map((category) => {
                const isActive = category.key === activeFaq.key;
                return (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={isActive ? "active" : ""}
                    key={category.id ?? category.key}
                    onClick={() => { setActiveFaqCategory(category.key); setOpenFaqId(category.items[0]?.id ?? null); }}
                  >
                    {t(category.labelEn, category.labelId)}
                  </button>
                );
              })}
            </div>
            <h3>{t(activeFaq.labelEn, activeFaq.labelId)}</h3>
            <div className="solution-faq-list">
              {activeFaq.items.map((item, index) => {
                const itemKey = item.id ?? `${activeFaq.key}-${index}`;
                const isOpen = openFaqId === itemKey;
                return (
                  <article className={isOpen ? "open" : ""} key={itemKey}>
                    <button type="button" aria-expanded={isOpen} onClick={() => setOpenFaqId(isOpen ? null : itemKey)}>
                      <span><b>Q:</b> {t(item.questionEn, item.questionId)}</span>
                      <i aria-hidden="true">{isOpen ? "−" : "+"}</i>
                    </button>
                    {isOpen && <div><p>{t(item.answerEn, item.answerId)}</p></div>}
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* FINAL WAVE CTA MATCHING FIGMA */}
        {!activeProduct && (
          <section className="solution-final-cta" id="contact" data-nav-theme="dark">
            <h2>
              {t("Your city,", "Kota Anda,")}<br />
              <em>{t("our stage.", "panggung kami.")}</em>
            </h2>
            <p>
              {t(
                "Tell us about your brand and campaign goals - our team will put together the best mix of OOH, DOOH, and mobile ads to reach them.",
                "Beri tahu kami tentang brand dan tujuan kampanye Anda - tim kami akan menyusun kombinasi terbaik OOH, DOOH, dan iklan mobile untuk mencapainya."
              )}
            </p>
            <a href={page.ctaButtonHref || "/#contact"} className="solution-button solution-button-yellow">
              {t("Request a Proposal >", "Minta Proposal >")}
            </a>
          </section>
        )}
      </main>

      <SiteFooter solutionLinks={solutionLinks} />
    </div>
  );
}
