"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { FaqCategoryInput, SolutionProductInput } from "@/lib/solution-types";

type Translate = (english: string, indonesian: string) => string;

interface MovementProductDetailViewProps {
  product: SolutionProductInput;
  products: SolutionProductInput[];
  solutionBadge: string;
  solutionSlug: string;
  solutionFaqCategories: FaqCategoryInput[];
  t: Translate;
  onSelectProduct: (slug: string) => void;
  onBackToSolution: () => void;
}

export function MovementProductDetailView({
  product,
  products,
  solutionBadge,
  solutionSlug,
  solutionFaqCategories,
  t,
  onSelectProduct,
  onBackToSolution,
}: MovementProductDetailViewProps) {
  const gallery = useMemo(() => product.gallery ?? [], [product.gallery]);
  const features = useMemo(() => product.features ?? [], [product.features]);
  const worksGridRef = useRef<HTMLDivElement | null>(null);

  const [activeImage, setActiveImage] = useState(
    gallery[0]?.imageUrl || product.detailHeroImage || product.imageUrl
  );
  const [activeFeatureKey, setActiveFeatureKey] = useState(features[0]?.key ?? "tab1");

  // FAQ: prefer product-specific FAQs, fallback to solution-level FAQs
  const faqCategories = useMemo(
    () =>
      product.faqCategories && product.faqCategories.length > 0
        ? product.faqCategories
        : solutionFaqCategories,
    [product.faqCategories, solutionFaqCategories]
  );

  const [activeFaqCategory, setActiveFaqCategory] = useState(faqCategories[0]?.key ?? "");
  const [openFaqId, setOpenFaqId] = useState<string | null>(
    faqCategories[0]?.items?.[0]?.id ?? null
  );

  useEffect(() => {
    setActiveImage(gallery[0]?.imageUrl || product.detailHeroImage || product.imageUrl);
    setActiveFeatureKey(features[0]?.key ?? "tab1");
    setActiveFaqCategory(faqCategories[0]?.key ?? "");
    setOpenFaqId(faqCategories[0]?.items?.[0]?.id ?? null);
  }, [faqCategories, features, gallery, product.detailHeroImage, product.imageUrl, product.slug]);

  const activeFeature =
    features.find((feature) => feature.key === activeFeatureKey) ?? features[0];
  const activeFaq =
    faqCategories.find((category) => category.key === activeFaqCategory) ?? faqCategories[0];

  const heroImage = product.detailHeroImage || product.imageUrl;
  const productName = t(product.nameEn, product.nameId);
  const nameWords = productName.trim().split(/\s+/);
  const firstWord = nameWords[0] || productName;
  const restWords = nameWords.slice(1).join(" ");

  const detailTitle = t(
    product.detailTitleEn || "Mobile LED Advertising That Goes Where Your Customers Are",
    product.detailTitleId || "Iklan Mobile LED Menjangkau Tempat Pelanggan Anda Berada"
  );
  const detailDescription = t(
    product.detailDescriptionEn ||
      "HIGH-DEFINITION MOVING DIGITAL BILLBOARDS TARGETING HIGH-DENSITY TRAFFIC CORRIDORS",
    product.detailDescriptionId ||
      "BILLBOARD DIGITAL BERGERAK DEFINISI TINGGI MENYASAR KORIDOR LALU LINTAS PADAT"
  );
  const detailBody = t(
    product.detailBodyEn ||
      "A fixed billboard waits for people to pass by. Mobile LED goes to them: office districts at rush hour, shopping areas on weekends, campuses, tourist spots and event entrances. The result is more impressions in the places that matter, with a video format that holds attention far better than a static poster.",
    product.detailBodyId ||
      "Billboard statis menunggu orang melewatinya. Mobile LED mendatangi mereka: kawasan perkantoran saat jam sibuk, area belanja di akhir pekan, kampus, lokasi wisata, dan pintu masuk event. Hasilnya adalah lebih banyak impresi di tempat yang penting, dengan format video yang lebih menarik daripada poster statis."
  );

  const cityTags = useMemo(() => {
    if (activeFeature?.cityTags) {
      return activeFeature.cityTags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
    }
    if (product.locations && product.locations.length > 0) {
      return product.locations.map((loc) => t(loc.labelEn, loc.labelId));
    }
    return ["JAKARTA", "BANDUNG", "BEKASI"];
  }, [activeFeature, product.locations, t]);

  const showcaseTitle = t(
    product.showcaseTitleEn || `Meet the ${product.nameEn}`,
    product.showcaseTitleId || `Kenali ${product.nameId}`
  );
  const showcaseDescription = t(
    product.showcaseDescriptionEn || "Moving Screen Built to Be Seen",
    product.showcaseDescriptionId || "Layar Bergerak yang Dibuat untuk Terlihat"
  );
  const showcaseMedia = product.showcaseMediaUrl || heroImage;
  const showcaseMetaTitle = t(
    product.showcaseMetaTitleEn || "3D Rotate Animation",
    product.showcaseMetaTitleId || "Animasi Rotasi 3D"
  );
  const showcaseMetaDesc = t(
    product.showcaseMetaDescEn ||
      "Bright enough for daylight, sharp enough to read from a distance, and operated by a trained crew on a set route. This is what will carry your brand.",
    product.showcaseMetaDescId ||
      "Cukup terang untuk siang hari, cukup tajam untuk dibaca dari kejauhan, dan dioperasikan oleh kru terlatih di rute yang telah ditentukan. Inilah yang akan membawa brand Anda."
  );

  return (
    <>
      {/* SECTION 1: HERO BANNER */}
      <section
        className="moled-hero"
        aria-label={`${product.nameEn} Overview`}
        style={{ backgroundImage: `url(${heroImage})` }}
        data-nav-theme="dark"
      >
        <div className="moled-hero-content">
          <nav className="hero-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">{t("Home", "Beranda")}</Link>
            <span>/</span>
            <button type="button" onClick={onBackToSolution}>
              {solutionBadge}
            </button>
            <span>/</span>
            <span className="active">{productName}</span>
          </nav>

          <div className="hero-badge">{solutionBadge}</div>

          <h1 className="hero-title">
            <span className="highlight-yellow">{firstWord}</span>
            {restWords ? ` ${restWords}` : ""}
          </h1>

          <p className="hero-subtitle">{detailDescription}</p>

          <div className="hero-cta-group">
            <a
              href={product.heroPrimaryCtaHref || product.href || "#contact"}
              className="btn-hero-primary"
            >
              {t(
                product.heroPrimaryCtaLabelEn || "Book Campaign",
                product.heroPrimaryCtaLabelId || "Pesan Kampanye"
              )}
            </a>
            <a
              href={product.heroSecondaryCtaHref || "#guides"}
              className="btn-hero-secondary"
            >
              {t(
                product.heroSecondaryCtaLabelEn || "View Specs",
                product.heroSecondaryCtaLabelId || "Lihat Spesifikasi"
              )}
            </a>
          </div>

          {products.length > 1 && (
            <div
              className="solution-product-hero-selector"
              role="tablist"
              aria-label={t("Choose product", "Pilih produk")}
            >
              {products.map((item) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={item.slug === product.slug}
                  className={item.slug === product.slug ? "active" : ""}
                  key={item.id ?? item.nameEn}
                  onClick={() => onSelectProduct(item.slug ?? "")}
                >
                  {t(item.nameEn, item.nameId)}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 2: GALLERY & METRO COVERAGE TABS */}
      <section className="moled-gallery-section" id="gallery">
        <div className="section-head">
          <h2 className="section-h2">{detailTitle}</h2>
          <p className="section-desc">{detailBody}</p>
        </div>

        <div className="gallery-grid">
          <div className="gallery-visuals">
            <div className="gallery-main-frame">
              <Image
                src={activeImage}
                alt={t(product.imageAltEn, product.imageAltId)}
                fill
                sizes="(max-width: 860px) 100vw, 56vw"
                className="gallery-main-img"
              />
            </div>
            {gallery.length > 0 && (
              <div
                className="gallery-thumbs-row"
                role="tablist"
                aria-label={t("Gallery Thumbnails", "Galeri Thumbnail")}
              >
                {gallery.map((image, idx) => (
                  <button
                    type="button"
                    className={`gallery-thumb ${activeImage === image.imageUrl ? "active" : ""}`}
                    key={image.id ?? `${image.imageUrl}-${idx}`}
                    onClick={() => setActiveImage(image.imageUrl)}
                    aria-label={`View photo ${idx + 1}`}
                  >
                    <Image
                      src={image.imageUrl}
                      alt={t(image.altEn, image.altId)}
                      width={220}
                      height={140}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="gallery-tab-panel">
            <div
              className="tab-nav-row"
              role="tablist"
              aria-label={t("Metro Coverage Tabs", "Tab Jangkauan Metro")}
            >
              {features.length > 0 ? (
                features.map((feature, idx) => (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={feature.key === activeFeature?.key}
                    className={`tab-btn ${feature.key === activeFeature?.key ? "active" : ""}`}
                    key={feature.id ?? feature.key}
                    onClick={() => setActiveFeatureKey(feature.key)}
                  >
                    {t(feature.labelEn, feature.labelId) || `TAB ${idx + 1}`}
                  </button>
                ))
              ) : (
                <button type="button" role="tab" aria-selected={true} className="tab-btn active">
                  TAB 1
                </button>
              )}
            </div>

            <div className="tab-content active" role="tabpanel">
              <h3 className="tab-h3">
                {activeFeature
                  ? t(activeFeature.titleEn, activeFeature.titleId)
                  : t("GET SEEN BY THOUSANDS", "DILIHAT RIBUAN ORANG")}
              </h3>
              <p className="tab-text">
                {activeFeature
                  ? t(activeFeature.bodyEn, activeFeature.bodyId)
                  : t(
                      "Best for sales, grand openings and seasonal promos. We route around your outlet, nearby malls and residential areas, with your offer, location and call-to-action clear on screen.",
                      "Cocok untuk penjualan, grand opening, dan promo musiman. Kami mengatur rute di sekitar outlet, mall terdekat, dan area pemukiman."
                    )}
              </p>
              <div className="city-tags-row">
                {cityTags.map((tag) => (
                  <span className="city-pill" key={tag}>
                    {tag.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: MIDDLE VALUE PROPOSITION BAR */}
      <section className="moled-value-section">
        <div className="value-bar-card">
          <p className="value-bar-text">
            {t(
              product.valueBarTextEn ||
                "Not sure which setup fits your goal and budget? Tell us your target cities and dates. We'll recommend the most efficient route plan.",
              product.valueBarTextId ||
                "Belum yakin setup mana yang sesuai dengan tujuan dan budget Anda? Sampaikan kota dan tanggal target Anda. Kami akan merekomendasikan rute yang paling efisien."
            )}
          </p>
          <a
            href={product.valueBarCtaHref || "#contact"}
            className="btn-value-cta"
          >
            {t(
              product.valueBarCtaLabelEn || "Talk With Us",
              product.valueBarCtaLabelId || "Hubungi Kami"
            )}
          </a>
        </div>
      </section>

      {/* SECTION 4: 3D ROTATE ANIMATION / INTERACTIVE SHOWCASE */}
      <section className="moled-interactive-section">
        <div className="interactive-inner">
          <h2 className="interactive-h2">{showcaseTitle}</h2>
          <p className="interactive-sub">{showcaseDescription}</p>

          <div className="interactive-stage">
            {product.showcaseMediaType === "video" ? (
              <video
                src={showcaseMedia}
                controls
                playsInline
                preload="metadata"
                className="interactive-car-img"
              />
            ) : (
              <Image
                src={showcaseMedia}
                alt={showcaseTitle}
                width={1080}
                height={540}
                className="interactive-car-img"
              />
            )}
          </div>

          <h3 className="interactive-meta-title">{showcaseMetaTitle}</h3>
          <p className="interactive-meta-desc">{showcaseMetaDesc}</p>
        </div>
      </section>

      {/* SECTION 5: FEATURED WORKS CAROUSEL */}
      <section className="moled-works-section" id="works">
        <div className="works-header-row">
          <div className="section-head" style={{ marginBottom: 0 }}>
            <h2 className="section-h2">
              {t(
                product.worksTitleEn || "Real Campaigns. Moving Brand Stories.",
                product.worksTitleId || "Kampanye Nyata. Cerita Brand yang Bergerak."
              )}
            </h2>
            <p className="section-desc">
              {t(
                product.worksDescriptionEn ||
                  `See how brands use MING Promotion's ${product.nameEn} advertising to bring their messages closer to audiences. From city-wide awareness campaigns to multi-city roadshows, explore how moving digital screens connect brands with people across Indonesia.`,
                product.worksDescriptionId ||
                  `Lihat bagaimana brand menggunakan iklan ${product.nameId} MING Promotion untuk membawa pesan lebih dekat ke audiens. Dari kampanye awareness seluruh kota hingga roadshow multi-kota.`
              )}
            </p>
          </div>
          <button
            type="button"
            className="works-nav-btn"
            aria-label="Next featured work"
            onClick={() =>
              worksGridRef.current?.scrollBy({ left: 340, behavior: "smooth" })
            }
          >
            →
          </button>
        </div>

        <div className="works-grid" ref={worksGridRef}>
          {product.caseStudies && product.caseStudies.length > 0 ? (
            product.caseStudies.map((study) => (
              <a
                href={study.href || "#contact"}
                className="work-card"
                key={study.id ?? study.titleEn}
              >
                <div className="work-card-media">
                  <Image
                    src={study.imageUrl || heroImage}
                    alt={study.clientName}
                    fill
                    sizes="(max-width: 860px) 100vw, 48vw"
                  />
                </div>
                <div className="work-card-body">
                  <h3 className="work-card-title">{t(study.titleEn, study.titleId)}</h3>
                  <p className="work-card-desc">
                    {t(study.descriptionEn, study.descriptionId)}
                  </p>
                </div>
              </a>
            ))
          ) : (
            <>
              <div className="work-card">
                <div className="work-card-media">
                  <Image
                    src={heroImage}
                    alt="TikTok SalingJaga Mobile LED campaign"
                    fill
                    sizes="(max-width: 860px) 100vw, 48vw"
                  />
                </div>
                <div className="work-card-body">
                  <h3 className="work-card-title">TikTok #SalingJaga</h3>
                  <p className="work-card-desc">
                    {t(
                      "TikTok partnered with MING Promotion to bring its #SalingJaga campaign to the streets of Jakarta through Mobile LED advertising.",
                      "TikTok bermitra dengan MING Promotion untuk membawa kampanye #SalingJaga ke jalanan Jakarta melalui iklan Mobile LED."
                    )}
                  </p>
                </div>
              </div>
              <div className="work-card">
                <div className="work-card-media">
                  <Image
                    src={showcaseMedia}
                    alt="Erafone Mobile LED campaign"
                    fill
                    sizes="(max-width: 860px) 100vw, 48vw"
                  />
                </div>
                <div className="work-card-body">
                  <h3 className="work-card-title">Erafone</h3>
                  <p className="work-card-desc">
                    {t(
                      "Erafone took its roadshow campaign on a multi-city tour supported by MING Promotion's Mobile LED.",
                      "Erafone membawa kampanye roadshow-nya dalam tur multi-kota yang didukung Mobile LED MING Promotion."
                    )}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* SECTION 6: GUIDES & INSIGHTS */}
      <section className="moled-guides-section" id="guides">
        <div className="section-head">
          <h2 className="section-h2">
            {t(
              product.guidesTitleEn || `${product.nameEn} Guides & Insights`,
              product.guidesTitleId || `Panduan & Insight ${product.nameId}`
            )}
          </h2>
          <p className="section-desc">
            {t(
              product.guidesDescriptionEn || "Read for detail insight",
              product.guidesDescriptionId || "Baca insight selengkapnya"
            )}
          </p>
        </div>

        <div className="guides-grid">
          {product.insights && product.insights.length > 0 ? (
            product.insights.map(
              (insight) =>
                insight.post && (
                  <article className="guide-card" key={insight.id ?? insight.postId}>
                    <div className="guide-card-media">
                      <Image
                        src={insight.post.coverImage || heroImage}
                        alt={insight.post.title}
                        fill
                        sizes="(max-width: 860px) 100vw, 25vw"
                      />
                    </div>
                    <div className="guide-card-body">
                      <h3>{insight.post.title}</h3>
                      <p>
                        {insight.post.excerpt ||
                          t(
                            "Explore route strategy, creative best practices, and measurable results.",
                            "Pelajari strategi rute, praktik kreatif terbaik, dan hasil kampanye terukur."
                          )}
                      </p>
                      <Link href={`/blog/${insight.post.slug}`}>
                        {t("READ MORE", "BACA SELENGKAPNYA")}
                      </Link>
                    </div>
                  </article>
                )
            )
          ) : (
            [1, 2, 3, 4].map((idx) => (
              <article className="guide-card" key={idx}>
                <div className="guide-card-media">
                  <Image
                    src={heroImage}
                    alt={`${product.nameEn} guide ${idx}`}
                    fill
                    sizes="(max-width: 860px) 100vw, 25vw"
                  />
                </div>
                <div className="guide-card-body">
                  <h3>{t("Planning high-impact campaigns", "Merencanakan kampanye berdampak tinggi")}</h3>
                  <p>
                    {t(
                      "Connect published blog posts in CMS to customize this insight card.",
                      "Hubungkan artikel blog terbitan di CMS untuk menyesuaikan kartu insight ini."
                    )}
                  </p>
                  <Link href="/blog">{t("READ MORE", "BACA SELENGKAPNYA")}</Link>
                </div>
              </article>
            ))
          )}
        </div>

        <nav className="guides-taxonomy" aria-label="Related topics">
          <Link href="/our-solution">OOH</Link>
          <span>·</span>
          <Link href={`/solutions/${solutionSlug}`}>{solutionBadge}</Link>
          <span>·</span>
          <span>{productName}</span>
        </nav>
      </section>

      {/* SECTION 7: MODULAR FAQ ACCORDION */}
      {activeFaq && (
        <section className="solution-faq" id="faq">
          <h2>{t("Frequently Asked Questions", "Pertanyaan yang Sering Diajukan")}</h2>
          <div
            className="solution-faq-pills"
            role="tablist"
            aria-label={t("FAQ categories", "Kategori FAQ")}
          >
            {faqCategories.map((category) => {
              const isActive = category.key === activeFaq.key;
              return (
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={isActive ? "active" : ""}
                  key={category.id ?? category.key}
                  onClick={() => {
                    setActiveFaqCategory(category.key);
                    setOpenFaqId(category.items[0]?.id ?? null);
                  }}
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
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqId(isOpen ? null : itemKey)}
                  >
                    <span>
                      <b>Q:</b> {t(item.questionEn, item.questionId)}
                    </span>
                    <i aria-hidden="true">{isOpen ? "−" : "+"}</i>
                  </button>
                  {isOpen && (
                    <div>
                      <p>{t(item.answerEn, item.answerId)}</p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* SECTION 8: WAVE FINAL CTA */}
      <section className="moled-final-cta" id="contact" data-nav-theme="dark">
        <div className="split-card-container">
          <div className="split-card-cta">
            <div className="split-cta-badge">
              {t(product.ctaBadgeEn || "CAMPAIGN EXECUTION", product.ctaBadgeId || "EKSEKUSI KAMPANYE")}
            </div>
            <h2 className="split-cta-h2">
              {t(product.ctaTitleEn || "Your city,", product.ctaTitleId || "Kota Anda,")}
              <br />
              <em>{t(product.ctaEmphasisEn || "our stage.", product.ctaEmphasisId || "panggung kami.")}</em>
            </h2>
            <p className="split-cta-desc">
              {t(
                product.ctaDescriptionEn ||
                  "Tell us about your brand and campaign goals - our team will put together the best mix of OOH, DOOH, and mobile ads to reach them.",
                product.ctaDescriptionId ||
                  "Ceritakan brand dan tujuan kampanye Anda - tim kami akan menyusun kombinasi OOH, DOOH, dan iklan bergerak terbaik untuk menjangkaunya."
              )}
            </p>
            <a href={product.ctaButtonHref || "/#contact"} className="btn-split-wa">
              {t(
                product.ctaButtonLabelEn || "Request a Proposal",
                product.ctaButtonLabelId || "Minta Proposal"
              )}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
