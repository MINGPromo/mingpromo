import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const movement = {
  slug: "the-movement",
  badgeText: "THE MOVEMENT",
  navLabelEn: "Mobile Ads",
  navLabelId: "Iklan Bergerak",
  heroTitleEn: "THE MOVEMENT",
  heroTitleId: "THE MOVEMENT",
  heroDescriptionEn:
    "Reach people where cities move. Explore mobile media designed to connect your brand with audiences throughout their daily journeys.",
  heroDescriptionId:
    "Jangkau audiens di setiap pergerakan kota. Jelajahi media bergerak yang menghubungkan brand dengan orang-orang di sepanjang perjalanan mereka.",
  heroImage: "/assets/solutions/the-movement/hero.webp",
  primaryCtaLabelEn: "Explore Media",
  primaryCtaLabelId: "Jelajahi Media",
  primaryCtaHref: "#products",
  secondaryCtaLabelEn: "Plan Your Campaign",
  secondaryCtaLabelId: "Rencanakan Kampanye",
  secondaryCtaHref: "/#contact",
  introEyebrowEn: "Introduction",
  introEyebrowId: "Pengantar",
  introTitleEn: "Make Every Journey a Brand Opportunity",
  introTitleId: "Jadikan Setiap Perjalanan Peluang bagi Brand",
  introBodyEn:
    "Every day, people move through busy roads, business districts, shopping destinations, and major transportation routes. These everyday journeys create opportunities for brands to become part of the urban landscape.\n\nThe Movement by MING Promotion connects campaigns with strategic moving media across Indonesia, from high-definition mobile LED screens to flexible experiential vehicles.\n\nWhether you're launching a new product, promoting an offer, or building long-term awareness, make your message part of the everyday journey.",
  introBodyId:
    "Setiap hari, masyarakat bergerak melalui jalan ramai, kawasan bisnis, pusat perbelanjaan, dan jalur transportasi utama. Perjalanan sehari-hari ini membuka peluang bagi brand untuk menjadi bagian dari lanskap perkotaan.\n\nThe Movement dari MING Promotion menghubungkan kampanye dengan media bergerak strategis di seluruh Indonesia, mulai dari layar Mobile LED beresolusi tinggi hingga kendaraan experiential yang fleksibel.\n\nBaik untuk peluncuran produk, promosi penawaran, maupun membangun awareness jangka panjang, hadirkan pesan brand di setiap perjalanan audiens.",
  introImage: "/assets/solutions/the-movement/hero.webp",
  benefitsTitleEn: "Why Choose The Movement?",
  benefitsTitleId: "Mengapa Memilih The Movement?",
  benefitsDescriptionEn:
    "More than a media placement. A chance to become part of the routes people take every day.",
  benefitsDescriptionId:
    "Lebih dari sekadar penempatan media. Jadilah bagian dari rute yang dilalui audiens setiap hari.",
  productsTitleEn: "Explore Our Moving Media",
  productsTitleId: "Jelajahi Media Bergerak Kami",
  productsDescriptionEn:
    "Explore moving formats built for city routes, audience moments, events, and experiential campaigns.",
  productsDescriptionId:
    "Jelajahi format bergerak untuk rute perkotaan, momen audiens, acara, dan kampanye experiential.",
  faqTitleEn: "Frequently Asked Questions",
  faqTitleId: "Pertanyaan yang Sering Diajukan",
  ctaTitleEn: "Your city,",
  ctaTitleId: "Kota Anda,",
  ctaEmphasisEn: "our stage.",
  ctaEmphasisId: "panggung kami.",
  ctaDescriptionEn:
    "Tell us about your brand and campaign goals. Our team will put together the best mix of OOH, DOOH, and mobile ads to reach them.",
  ctaDescriptionId:
    "Ceritakan tujuan brand dan kampanye Anda. Tim kami akan menyusun kombinasi OOH, DOOH, dan iklan bergerak terbaik untuk menjangkaunya.",
  ctaButtonLabelEn: "Request a Proposal",
  ctaButtonLabelId: "Minta Proposal",
  ctaButtonHref: "/#contact",
  seoTitleEn: "The Movement | Mobile Advertising | MING Promotion",
  seoTitleId: "The Movement | Iklan Bergerak | MING Promotion",
  seoDescriptionEn:
    "Explore MING Promotion's Mobile LED, Mobile Showcase, Mobile Stage, Mobile Transformer, Mobile Trailer, and Adsman solutions.",
  seoDescriptionId:
    "Jelajahi solusi Mobile LED, Mobile Showcase, Mobile Stage, Mobile Transformer, Mobile Trailer, dan Adsman dari MING Promotion.",
  published: true,
  order: 2,
  benefits: {
    create: [
      { titleEn: "Everyday Visibility", titleId: "Visibilitas Harian", descriptionEn: "Be seen along busy roads, intersections, and commercial areas.", descriptionId: "Tampil di jalan ramai, persimpangan, dan kawasan komersial.", order: 1 },
      { titleEn: "Repeated Exposure", titleId: "Eksposur Berulang", descriptionEn: "Build stronger recall through repeated exposure across planned routes.", descriptionId: "Bangun ingatan brand melalui eksposur berulang di rute terencana.", order: 2 },
      { titleEn: "Visual Impact", titleId: "Dampak Visual", descriptionEn: "Dynamic formats turn everyday movement into an unmissable brand moment.", descriptionId: "Format dinamis mengubah mobilitas harian menjadi momen brand yang mencolok.", order: 3 },
      { titleEn: "Relevant Routes", titleId: "Rute Relevan", descriptionEn: "Plan campaigns around the areas, audiences, and moments that matter most.", descriptionId: "Rencanakan kampanye berdasarkan area, audiens, dan momen terpenting.", order: 4 },
      { titleEn: "Digital Flexibility", titleId: "Fleksibilitas Digital", descriptionEn: "Update and adapt creative content for changing campaign priorities.", descriptionId: "Perbarui materi kreatif mengikuti perubahan prioritas kampanye.", order: 5 },
    ],
  },
  filters: {
    create: [
      { key: "digital", labelEn: "Digital", labelId: "Digital", order: 1 },
      { key: "experiential", labelEn: "Experiential", labelId: "Eksperiensial", order: 2 },
      { key: "roadshow", labelEn: "Roadshow", labelId: "Roadshow", order: 3 },
    ],
  },
  products: {
    create: [
      { nameEn: "Mobile LED", nameId: "Mobile LED", imageUrl: "/assets/solutions/the-movement/mobile-led.webp", imageAltEn: "Mobile LED advertising truck", imageAltId: "Truk iklan Mobile LED", tagLabelEn: "Digital / Roadshow", tagLabelId: "Digital / Roadshow", filterKeys: "digital roadshow", href: "/#contact", order: 1 },
      { nameEn: "Mobile Showcase", nameId: "Mobile Showcase", imageUrl: "/assets/media/milestones/mobile-showcase.webp", imageAltEn: "Mobile Showcase vehicle", imageAltId: "Kendaraan Mobile Showcase", tagLabelEn: "Experiential", tagLabelId: "Eksperiensial", filterKeys: "experiential roadshow", href: "/#contact", order: 2 },
      { nameEn: "Mobile Stage", nameId: "Mobile Stage", imageUrl: "/assets/media/milestones/mobile-stage.webp", imageAltEn: "Mobile Stage activation", imageAltId: "Aktivasi Mobile Stage", tagLabelEn: "Experiential / Roadshow", tagLabelId: "Eksperiensial / Roadshow", filterKeys: "experiential roadshow", href: "/#contact", order: 3 },
      { nameEn: "Mobile Transformer", nameId: "Mobile Transformer", imageUrl: "/assets/media/milestones/mobile-transformers.webp", imageAltEn: "Mobile Transformer", imageAltId: "Mobile Transformer", tagLabelEn: "Experiential", tagLabelId: "Eksperiensial", filterKeys: "experiential", href: "/#contact", order: 4 },
      { nameEn: "Mobile Trailer", nameId: "Mobile Trailer", imageUrl: "/assets/solutions/the-movement/hero.webp", imageAltEn: "Mobile Trailer fleet", imageAltId: "Armada Mobile Trailer", tagLabelEn: "Digital / Roadshow", tagLabelId: "Digital / Roadshow", filterKeys: "digital roadshow", href: "/#contact", order: 5 },
      { nameEn: "Adsman", nameId: "Adsman", imageUrl: "/assets/solutions/the-movement/adsman.webp", imageAltEn: "Adsman experiential mobile media", imageAltId: "Media bergerak eksperiensial Adsman", tagLabelEn: "Experiential", tagLabelId: "Eksperiensial", filterKeys: "experiential", href: "/#contact", order: 6 },
    ],
  },
  faqCategories: {
    create: [
      {
        key: "about", labelEn: "About MING Promotion", labelId: "Tentang MING Promotion", order: 1,
        items: { create: [
          { questionEn: "What is MING Promotion?", questionId: "Apa itu MING Promotion?", answerEn: "MING Promotion is an Out-of-Home (OOH) and Digital Out-of-Home (DOOH) advertising company in Indonesia, offering creative media solutions to help brands connect with their audiences.", answerId: "MING Promotion adalah perusahaan periklanan Out-of-Home (OOH) dan Digital Out-of-Home (DOOH) di Indonesia yang menyediakan solusi media kreatif untuk menghubungkan brand dengan audiens.", order: 1 },
          { questionEn: "What is the difference between OOH and DOOH advertising?", questionId: "Apa perbedaan iklan OOH dan DOOH?", answerEn: "OOH uses traditional outdoor formats, while DOOH uses digital screens and dynamic content that can be updated throughout a campaign.", answerId: "OOH menggunakan format luar ruang tradisional, sedangkan DOOH menggunakan layar digital dan konten dinamis yang dapat diperbarui selama kampanye.", order: 2 },
          { questionEn: "Why choose MING Promotion?", questionId: "Mengapa memilih MING Promotion?", answerEn: "MING combines nationwide media, moving formats, creative execution, and accountable campaign reporting.", answerId: "MING menggabungkan jaringan media nasional, format bergerak, eksekusi kreatif, dan pelaporan kampanye yang akuntabel.", order: 3 },
        ] },
      },
      { key: "products", labelEn: "Products & Services", labelId: "Produk & Layanan", order: 2, items: { create: [{ questionEn: "Which moving format fits my campaign?", questionId: "Format bergerak apa yang cocok untuk kampanye saya?", answerEn: "Our team recommends a format based on your audience, route, creative, campaign duration, and activation needs.", answerId: "Tim kami merekomendasikan format berdasarkan audiens, rute, materi kreatif, durasi kampanye, dan kebutuhan aktivasi Anda.", order: 1 }] } },
      { key: "locations", labelEn: "Locations & Placements", labelId: "Lokasi & Penempatan", order: 3, items: { create: [{ questionEn: "Where can The Movement operate?", questionId: "Di mana The Movement dapat beroperasi?", answerEn: "Routes can cover major roads, business districts, commercial areas, campuses, events, and other high-density locations.", answerId: "Rute dapat mencakup jalan utama, kawasan bisnis, area komersial, kampus, acara, dan lokasi padat lainnya.", order: 1 }] } },
      { key: "pricing", labelEn: "Pricing & Booking", labelId: "Harga & Pemesanan", order: 4, items: { create: [{ questionEn: "How is a campaign priced?", questionId: "Bagaimana harga kampanye ditentukan?", answerEn: "Pricing depends on format, operating hours, route, campaign duration, and production requirements.", answerId: "Harga bergantung pada format, jam operasi, rute, durasi kampanye, dan kebutuhan produksi.", order: 1 }] } },
      { key: "technical", labelEn: "Advertising Materials & Technical Requirements", labelId: "Materi Iklan & Persyaratan Teknis", order: 5, items: { create: [{ questionEn: "What creative materials are required?", questionId: "Materi kreatif apa yang dibutuhkan?", answerEn: "Technical specifications are supplied after the selected moving format and campaign plan are confirmed.", answerId: "Spesifikasi teknis diberikan setelah format bergerak dan rencana kampanye dikonfirmasi.", order: 1 }] } },
      { key: "reporting", labelEn: "Campaign & Reporting", labelId: "Kampanye & Pelaporan", order: 6, items: { create: [{ questionEn: "How is campaign delivery reported?", questionId: "Bagaimana pelaksanaan kampanye dilaporkan?", answerEn: "Campaign reporting can include route tracking, photo and video documentation, and Proof of Play.", answerId: "Pelaporan kampanye dapat mencakup pelacakan rute, dokumentasi foto dan video, serta Proof of Play.", order: 1 }] } },
    ],
  },
};

const placeholders = [
  { slug: "the-brain", badgeText: "THE BRAIN", navLabelEn: "OOH Measurement", navLabelId: "Pengukuran OOH", image: "/assets/media/eco-the-brain.webp", order: 1 },
  { slug: "the-inside", badgeText: "THE INSIDE", navLabelEn: "Premium Mall Inventory", navLabelId: "Inventori Mall Premium", image: "/assets/media/eco-the-inside.webp", order: 3 },
  { slug: "the-roadside", badgeText: "THE ROADSIDE", navLabelEn: "Roadside OOH & DOOH", navLabelId: "Roadside OOH & DOOH", image: "/assets/media/eco-the-roadside.webp", order: 4 },
  { slug: "the-experience", badgeText: "THE EXPERIENCE", navLabelEn: "Experiential & Activation", navLabelId: "Eksperiensial & Aktivasi", image: "/assets/media/eco-the-experience.webp", order: 5 },
];

function placeholderData(item) {
  return {
    slug: item.slug,
    badgeText: item.badgeText,
    navLabelEn: item.navLabelEn,
    navLabelId: item.navLabelId,
    heroTitleEn: item.badgeText,
    heroTitleId: item.badgeText,
    heroDescriptionEn: `Build the ${item.badgeText} page from the CMS using the shared solution template.`,
    heroDescriptionId: `Bangun halaman ${item.badgeText} dari CMS menggunakan template solution yang sama.`,
    heroImage: item.image,
    introTitleEn: item.navLabelEn,
    introTitleId: item.navLabelId,
    introBodyEn: "Complete this draft from the Solution Pages editor before publishing.",
    introBodyId: "Lengkapi draft ini melalui editor Solution Pages sebelum dipublikasikan.",
    introImage: item.image,
    benefitsTitleEn: `Why Choose ${item.badgeText}?`,
    benefitsTitleId: `Mengapa Memilih ${item.badgeText}?`,
    benefitsDescriptionEn: "Add the page-specific value proposition in the CMS.",
    benefitsDescriptionId: "Tambahkan proposisi nilai khusus halaman melalui CMS.",
    productsTitleEn: "Explore Our Media",
    productsTitleId: "Jelajahi Media Kami",
    productsDescriptionEn: "Add products, inventory, or placements from the CMS.",
    productsDescriptionId: "Tambahkan produk, inventori, atau penempatan melalui CMS.",
    ctaTitleEn: "Your brand,",
    ctaTitleId: "Brand Anda,",
    ctaEmphasisEn: "our stage.",
    ctaEmphasisId: "panggung kami.",
    ctaDescriptionEn: "Tell us about your campaign goals and our team will help plan the right media mix.",
    ctaDescriptionId: "Ceritakan tujuan kampanye Anda dan tim kami akan membantu merencanakan kombinasi media yang tepat.",
    seoTitleEn: `${item.badgeText} | MING Promotion`,
    seoTitleId: `${item.badgeText} | MING Promotion`,
    seoDescriptionEn: `${item.navLabelEn} solutions from MING Promotion.`,
    seoDescriptionId: `Solusi ${item.navLabelId} dari MING Promotion.`,
    published: false,
    order: item.order,
  };
}

async function main() {
  const movementPage = await prisma.solutionPage.upsert({
    where: { slug: movement.slug },
    update: {},
    create: movement,
  });

  for (const item of placeholders) {
    await prisma.solutionPage.upsert({
      where: { slug: item.slug },
      update: {},
      create: placeholderData(item),
    });
  }

  const pages = await prisma.solutionPage.findMany({ select: { id: true, slug: true } });
  const pageBySlug = new Map(pages.map((page) => [page.slug, page.id]));
  for (const slug of ["the-brain", "the-movement", "the-inside", "the-roadside", "the-experience"]) {
    const pageId = pageBySlug.get(slug);
    if (!pageId) continue;
    await prisma.connectionLayer.updateMany({
      where: { tabKey: slug },
      data: { solutionPageId: pageId },
    });
  }

  console.log(`Solution CMS seeded. The Movement: ${movementPage.id}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
