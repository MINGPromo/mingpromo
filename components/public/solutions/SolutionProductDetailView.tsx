"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { FaqCategoryInput, SolutionProductInput } from "@/lib/solution-types";
import { MovementProductDetailView } from "@/components/public/solutions/MovementProductDetailView";

type Translate = (english: string, indonesian: string) => string;

export function SolutionProductDetailView({
  product,
  products,
  solutionBadge,
  solutionSlug = "",
  solutionFaqCategories = [],
  t,
  onSelectProduct,
  onBackToSolution,
}: {
  product: SolutionProductInput;
  products: SolutionProductInput[];
  solutionBadge: string;
  solutionSlug?: string;
  solutionFaqCategories?: FaqCategoryInput[];
  t: Translate;
  onSelectProduct: (slug: string) => void;
  onBackToSolution: () => void;
}) {
  if (product.templateVariant === "movement" || solutionSlug === "the-movement") {
    return (
      <MovementProductDetailView
        product={product}
        products={products}
        solutionBadge={solutionBadge}
        solutionSlug={solutionSlug}
        solutionFaqCategories={solutionFaqCategories}
        t={t}
        onSelectProduct={onSelectProduct}
        onBackToSolution={onBackToSolution}
      />
    );
  }
  const gallery = useMemo(() => product.gallery ?? [], [product.gallery]);
  const features = useMemo(() => product.features ?? [], [product.features]);
  const [activeImage, setActiveImage] = useState(product.detailHeroImage || product.imageUrl);
  const [activeFeatureKey, setActiveFeatureKey] = useState(features[0]?.key ?? "tab1");

  useEffect(() => {
    setActiveImage(product.detailHeroImage || product.imageUrl);
    setActiveFeatureKey(features[0]?.key ?? "tab1");
  }, [features, product.detailHeroImage, product.imageUrl, product.slug]);

  const activeFeature = features.find((feature) => feature.key === activeFeatureKey) ?? features[0];
  const heroImage = product.detailHeroImage || product.imageUrl;
  const detailTitle = t(product.detailTitleEn || "Mobile LED Advertising That Goes Where Your Customers Are", product.detailTitleId || "Iklan Mobile LED yang Bergerak Menuju Pelanggan Anda");
  const detailDescription = t(
    product.detailDescriptionEn || "HIGH-DEFINITION MOVING DIGITAL BILLBOARDS TARGETING HIGH-DENSITY TRAFFIC CORRIDORS",
    product.detailDescriptionId || "BILLBOARD DIGITAL BERGERAK DEFINISI TINGGI MENARGETKAN KORIDOR LALU LINTAS PADAT"
  );
  const detailBody = t(
    product.detailBodyEn || "A fixed billboard waits for people to pass by. Mobile LED goes to them: office districts at rush hour, shopping areas on weekends, campuses, tourist spots and event entrances. The result is more impressions in the places that matter, with a video format that holds attention far better than a static poster.",
    product.detailBodyId || "Billboard statis menunggu orang lewat. Mobile LED mendatangi mereka: kawasan perkantoran di jam sibuk, area perbelanjaan di akhir pekan, kampus, spot wisata, dan pintu masuk acara. Hasilnya adalah lebih banyak impresi di lokasi strategis, dengan format video yang menarik perhatian lebih baik daripada poster statis."
  );
  const showcaseTitle = t(product.showcaseTitleEn || `Meet the ${product.nameEn}`, product.showcaseTitleId || `Kenali ${product.nameId}`);
  const showcaseDescription = t(product.showcaseDescriptionEn || "Moving Screen Built to Be Seen", product.showcaseDescriptionId || "Layar Bergerak yang Diciptakan untuk Dilihat");
  const showcaseMedia = product.showcaseMediaUrl || heroImage;

  return (
    <>
      {/* PRODUCT DETAIL HERO MATCHING FIGMA: Breadcrumbs, Badge, Buttons */}
      <section className="solution-product-detail-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(4,8,13,.86), rgba(4,8,13,.3) 70%), url(${heroImage})` }}>
        <div className="solution-product-detail-hero-inner">
          <nav className="solution-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">{t("HOME", "BERANDA")}</Link><span>/</span>
            <button type="button" onClick={onBackToSolution}>{solutionBadge}</button><span>/</span>
            <span>{t(product.nameEn, product.nameId).toUpperCase()}</span>
          </nav>
          <span className="solution-badge">{solutionBadge}</span>
          <h1 className="solution-product-detail-title">{t(product.nameEn, product.nameId).toUpperCase()}</h1>
          <p className="solution-product-detail-sub">{detailDescription}</p>
          <div className="solution-hero-actions">
            <a href={product.href || "/#contact"} className="solution-button solution-button-yellow">
              {t(`PLAN MY ${product.nameEn.toUpperCase()} CAMPAIGN`, `RENCANAKAN KAMPANYE ${product.nameId.toUpperCase()}`)}
            </a>
            <button
              type="button"
              className="solution-button solution-button-teal"
              onClick={() => document.getElementById("product-story")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            >
              {t("SEE HOW IT WORKS", "LIHAT CARA KERJANYA")}
            </button>
          </div>
          {products.length > 1 && (
            <div className="solution-product-hero-selector" role="tablist" aria-label={t("Choose product", "Pilih produk")}>
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

      {/* PRODUCT STORY (GALLERY + FEATURE TABS + TALK BAND) */}
      <section className="solution-product-story" id="product-story">
        <header>
          <h2>{detailTitle}</h2>
          <p>{detailBody}</p>
        </header>
        <div className="solution-product-story-grid">
          <div className="solution-product-gallery-panel">
            <div className="solution-product-gallery-main"><Image src={activeImage} alt={t(product.imageAltEn, product.imageAltId)} fill sizes="(max-width: 760px) 100vw, 58vw" /></div>
            {gallery.length > 0 && (
              <div className="solution-product-gallery-thumbs">
                {gallery.map((image) => (
                  <button type="button" className={activeImage === image.imageUrl ? "active" : ""} key={image.id ?? image.imageUrl} onClick={() => setActiveImage(image.imageUrl)}>
                    <Image src={image.imageUrl} alt={t(image.altEn, image.altId)} width={220} height={130} />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="solution-product-feature-panel">
            <div className="solution-product-feature-tabs" role="tablist" aria-label={t("Product advantages", "Keunggulan produk")}>
              {features.length > 0 ? (
                features.map((feature, idx) => (
                  <button type="button" role="tab" aria-selected={feature.key === activeFeature?.key} className={feature.key === activeFeature?.key ? "active" : ""} key={feature.id ?? feature.key} onClick={() => setActiveFeatureKey(feature.key)}>
                    {t(feature.labelEn, feature.labelId) || `TAB ${idx + 1}`}
                  </button>
                ))
              ) : (
                <>
                  <button type="button" role="tab" aria-selected={true} className="active">TAB 1</button>
                  <button type="button" role="tab" aria-selected={false}>TAB 2</button>
                  <button type="button" role="tab" aria-selected={false}>TAB 3</button>
                </>
              )}
            </div>
            <div className="solution-product-feature-copy">
              <h3>{activeFeature ? t(activeFeature.titleEn, activeFeature.titleId) : t("GET SEEN BY THOUSANDS", "TERLIHAT OLEH RIBUAN ORANG")}</h3>
              <p>{activeFeature ? t(activeFeature.bodyEn, activeFeature.bodyId) : t("Best for sales, grand openings and seasonal promos. We route around your outlet, nearby malls and residential areas, with your offer, location and call-to-action clear on screen. It reaches people who are already close enough to visit.", "Sangat baik untuk penjualan, grand opening, dan promosi musiman. Kami membuat rute di sekitar gerai Anda, mal terdekat, dan area pemukiman, dengan penawaran, lokasi, dan ajakan bertindak yang jelas di layar. Ini menjangkau orang-orang yang sudah cukup dekat untuk berkunjung.")}</p>
            </div>
            <div className="solution-product-coverage">
              <div>
                {product.locations && product.locations.length > 0 ? (
                  product.locations.map((location) => <b key={location.id ?? location.labelEn}>{t(location.labelEn, location.labelId)}</b>)
                ) : (
                  <>
                    <b>JAKARTA</b>
                    <b>BANDUNG</b>
                    <b>BEKASI</b>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="solution-product-talk-band">
          <p>{t("Not sure which setup fits your goal and budget? Tell us your target cities and dates. We'll recommend the most efficient route plan.", "Belum yakin setup mana yang sesuai dengan tujuan dan anggaran Anda? Beri tahu kota target dan tanggal kampanye. Kami akan merekomendasikan rute yang paling efisien.")}</p>
          <a href={product.href || "/#contact"}>{t("Talk With Us", "Hubungi Kami")}</a>
        </div>
      </section>

      {/* MEET THE PRODUCT & 3D ROTATE SHOWCASE */}
      <section className="solution-product-showcase">
        <header>
          <h2>{showcaseTitle}</h2>
          <p>{showcaseDescription}</p>
        </header>
        <div className="solution-product-showcase-media">
          {product.showcaseMediaType === "video" ? <video src={showcaseMedia} controls playsInline preload="metadata" /> : <Image src={showcaseMedia} alt={showcaseTitle} width={1400} height={800} />}
        </div>
        <div className="solution-showcase-specs-block">
          <h3>{t("3D Rotate Animation", "Animasi Putar 3D")}</h3>
          <p className="solution-showcase-subtext">
            {t(
              "Bright enough for daylight, sharp enough to read from a distance, and operated by a trained crew on a set route. This is what will carry your brand.",
              "Cukup terang untuk siang hari, cukup tajam untuk dibaca dari kejauhan, dan dioperasikan oleh kru terlatih di rute yang telah ditentukan. Inilah yang akan membawa brand Anda."
            )}
          </p>
          <div className="solution-showcase-tech-specs">
            <span>{t("Screen size: [ ] • Resolution: [ ] • Brightness: [ ] • Daily operating hours: [ ] • Content format: video, animation, motion graphics", "Ukuran layar: [ ] • Resolusi: [ ] • Kecerahan: [ ] • Jam operasional harian: [ ] • Format konten: video, animasi, motion graphics")}</span>
          </div>
        </div>
      </section>

      {/* REAL CAMPAIGNS (CASE STUDIES) WITH ARROW */}
      <section className="solution-product-cases">
        <header>
          <div>
            <h2>{t("Real Campaigns. Moving Brand Stories.", "Kampanye Nyata. Cerita Brand yang Bergerak.")}</h2>
            <p>{t(`See how brands use MING Promotion's ${product.nameEn} advertising to bring their messages closer to audiences. From city-wide awareness campaigns to multi-city roadshows, explore how moving digital screens connect brands with people across Indonesia.`, `Lihat bagaimana brand menggunakan iklan ${product.nameId} MING Promotion untuk membawa pesan lebih dekat kepada audiens. Dari kampanye awareness di seluruh kota hingga roadshow multi-kota.`)}</p>
          </div>
          <button type="button" className="solution-carousel-arrow-btn" aria-label="Next campaigns">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </header>
        <div className="solution-product-case-grid">
          {product.caseStudies && product.caseStudies.length > 0 ? (
            product.caseStudies.map((study) => (
              <a href={study.href || "/#contact"} key={study.id ?? study.titleEn}>
                <div><Image src={study.imageUrl || heroImage} alt={study.clientName} fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
                <span>{study.clientName}</span>
                <h3>{t(study.titleEn, study.titleId)}</h3>
                <p>{t(study.descriptionEn, study.descriptionId)}</p>
              </a>
            ))
          ) : (
            <>
              <div className="solution-product-case-card">
                <div className="case-card-img"><div className="case-card-placeholder" /></div>
                <div className="case-card-content">
                  <h3>TikTok <span>#SalingJaga</span></h3>
                  <p>{t("TikTok partnered with MING Promotion to bring its #SalingJaga campaign to the streets of Jakarta through Mobile LED advertising. Travelling across key areas including Sudirman, Thamrin, Blok M, and Senopati, the campaign displayed digital safety messages to connect with people beyond their mobile screens.", "TikTok bermitra dengan MING Promotion untuk menghadirkan kampanye #SalingJaga ke jalanan Jakarta melalui iklan Mobile LED.")}</p>
                </div>
              </div>
              <div className="solution-product-case-card">
                <div className="case-card-img"><div className="case-card-placeholder" /></div>
                <div className="case-card-content">
                  <h3>Erafone <span>Roadshow</span></h3>
                  <p>{t("Erafone took its Roadshow campaign on a multi-city tour supported by MING Promotion's Mobile LED.", "Erafone membawa kampanye Roadshow dalam tur multi-kota yang didukung oleh Mobile LED MING Promotion.")}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* GUIDES & INSIGHTS (4 CARDS MATCHING FIGMA) */}
      <section className="solution-product-insights">
        <header>
          <h2>{t(`${product.nameEn} Guides & Insights`, `Panduan & Insight ${product.nameId}`)}</h2>
          <p>{t("Read for detail insight", "Baca untuk wawasan mendalam")}</p>
        </header>
        <div className="solution-product-insights-grid">
          {product.insights && product.insights.length > 0 ? (
            product.insights.map((insight) => insight.post && (
              <Link href={`/blog/${insight.post.slug}`} key={insight.id ?? insight.postId}>
                <div className="solution-product-insight-image"><Image src={insight.post.coverImage || heroImage} alt={insight.post.title} fill sizes="(max-width: 760px) 100vw, 25vw" /></div>
                <span className="solution-insight-author">About Producer</span>
                <h3>{insight.post.title}</h3>
                <p>{insight.post.excerpt || t("This is a title to explain the product produced or created by the person on the left.", "Ini adalah deskripsi untuk menjelaskan produk.")}</p>
                <b>{t("READ MORE", "BACA SELENGKAPNYA")}</b>
              </Link>
            ))
          ) : (
            [1, 2, 3, 4].map((i) => (
              <div className="solution-product-insight-card" key={i}>
                <div className="solution-product-insight-image"><div className="insight-card-placeholder" /></div>
                <span className="solution-insight-author">About Producer</span>
                <p>{t("This is a title to explain the product produced or created by the person on the left.", "Ini adalah deskripsi untuk menjelaskan produk yang dibuat oleh pihak terkait.")}</p>
                <b>{t("READ MORE", "BACA SELENGKAPNYA")}</b>
              </div>
            ))
          )}
        </div>
        <div className="solution-internal-category-link">
          <span>OOH &gt; ADVERTISING &gt; {product.nameEn.toUpperCase()} (INTERNAL LINK TO RELEVANT CATEGORY)</span>
        </div>
      </section>
    </>
  );
}
