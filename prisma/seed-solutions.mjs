import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const movement = {
  slug: "the-movement",
  badgeText: "THE MOVEMENT",
  navLabelEn: "Mobile Ads",
  navLabelId: "Iklan Bergerak",
  overviewHeadlineEn: "Take Your Message Beyond Fixed Locations",
  overviewHeadlineId: "Bawa Pesan Anda Melampaui Lokasi Tetap",
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
    "Explore MING Promotion's Mobile LED and Adsman solutions, built for moving audiences and street-level impact.",
  seoDescriptionId:
    "Jelajahi solusi Mobile LED dan Adsman dari MING Promotion untuk menjangkau audiens yang bergerak.",
  published: true,
  order: 3,
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
  { slug: "the-inside", badgeText: "THE INSIDE", navLabelEn: "Premium Mall Inventory", navLabelId: "Inventori Mall Premium", overviewHeadlineEn: "Be Seen Where People Spend Time", overviewHeadlineId: "Hadir di Tempat Audiens Menghabiskan Waktu", image: "/assets/media/eco-the-inside.webp", order: 1 },
  { slug: "the-roadside", badgeText: "THE ROADSIDE", navLabelEn: "Roadside OOH & DOOH", navLabelId: "Roadside OOH & DOOH", overviewHeadlineEn: "Put Your Brand Where the City Moves", overviewHeadlineId: "Tempatkan Brand Anda di Jalur Pergerakan Kota", image: "/assets/media/eco-the-roadside.webp", order: 2 },
  { slug: "the-experience", badgeText: "THE EXPERIENCE", navLabelEn: "Experiential & Activation", navLabelId: "Eksperiensial & Aktivasi", overviewHeadlineEn: "Where Audiences Interact with Brands", overviewHeadlineId: "Tempat Audiens Berinteraksi dengan Brand", image: "/assets/media/eco-the-experience.webp", order: 4 },
  { slug: "the-brain", badgeText: "THE BRAIN", navLabelEn: "OOH Measurement", navLabelId: "Pengukuran OOH", overviewHeadlineEn: "Plan Smarter with Data and Insights", overviewHeadlineId: "Rencanakan Lebih Cerdas dengan Data dan Insight", image: "/assets/media/eco-the-brain.webp", order: 5 },
];

function placeholderData(item) {
  const copy = {
    "the-brain": {
      titleEn: "Turn audience movement into campaign intelligence",
      titleId: "Ubah pergerakan audiens menjadi intelligence kampanye",
      heroEn: "Measure attention, movement, and campaign delivery with a clearer view of your OOH performance.",
      heroId: "Ukur perhatian, pergerakan, dan delivery kampanye dengan pandangan yang lebih jelas atas performa OOH Anda.",
      bodyEn: "The Brain connects audience intelligence, campaign measurement, and live reporting so every placement can be planned and improved.",
      bodyId: "The Brain menghubungkan intelligence audiens, pengukuran kampanye, dan pelaporan langsung agar setiap penempatan dapat direncanakan dan ditingkatkan.",
    },
    "the-inside": {
      titleEn: "Own attention inside premium destinations",
      titleId: "Kuasai perhatian di destinasi premium",
      heroEn: "Bring your brand into the malls, retail environments, and high-dwell spaces where audiences spend time.",
      heroId: "Hadirkan brand di mall, lingkungan retail, dan ruang dengan dwell time tinggi tempat audiens menghabiskan waktu.",
      bodyEn: "The Inside combines premium inventory with thoughtful placement planning to make every indoor audience moment work harder.",
      bodyId: "The Inside menggabungkan inventori premium dengan perencanaan penempatan yang matang agar setiap momen audiens indoor bekerja lebih kuat.",
    },
    "the-roadside": {
      titleEn: "Be visible where the city moves",
      titleId: "Terlihat di tempat kota bergerak",
      heroEn: "Reach high-frequency routes with roadside OOH and DOOH placements built for scale and recall.",
      heroId: "Jangkau rute dengan frekuensi tinggi melalui penempatan OOH dan DOOH roadside yang dirancang untuk skala dan recall.",
      bodyEn: "The Roadside helps brands own the daily commute through strategic locations, clear visibility, and measurable delivery.",
      bodyId: "The Roadside membantu brand menguasai perjalanan harian melalui lokasi strategis, visibilitas jelas, dan delivery terukur.",
    },
    "the-experience": {
      titleEn: "Make the brand moment unforgettable",
      titleId: "Jadikan momen brand tak terlupakan",
      heroEn: "Turn launches, roadshows, and live activations into experiences people remember and share.",
      heroId: "Ubah peluncuran, roadshow, dan aktivasi live menjadi pengalaman yang diingat dan dibagikan audiens.",
      bodyEn: "The Experience brings creative production, audience interaction, and media reach together in one activation system.",
      bodyId: "The Experience menyatukan produksi kreatif, interaksi audiens, dan jangkauan media dalam satu sistem aktivasi.",
    },
  }[item.slug] ?? {
    titleEn: item.navLabelEn,
    titleId: item.navLabelId,
    heroEn: `Explore ${item.navLabelEn} solutions from MING Promotion.`,
    heroId: `Jelajahi solusi ${item.navLabelId} dari MING Promotion.`,
    bodyEn: `Discover how ${item.navLabelEn} can move your campaign forward.`,
    bodyId: `Temukan bagaimana ${item.navLabelId} dapat menggerakkan kampanye Anda.`,
  };
  return {
    slug: item.slug,
    badgeText: item.badgeText,
    navLabelEn: item.navLabelEn,
    navLabelId: item.navLabelId,
    overviewHeadlineEn: item.overviewHeadlineEn,
    overviewHeadlineId: item.overviewHeadlineId,
    heroTitleEn: item.badgeText,
    heroTitleId: item.badgeText,
    heroDescriptionEn: copy.heroEn,
    heroDescriptionId: copy.heroId,
    heroImage: item.image,
    introTitleEn: copy.titleEn,
    introTitleId: copy.titleId,
    introBodyEn: copy.bodyEn,
    introBodyId: copy.bodyId,
    introImage: item.image,
    benefitsTitleEn: `Why Choose ${item.badgeText}?`,
    benefitsTitleId: `Mengapa Memilih ${item.badgeText}?`,
    benefitsDescriptionEn: "Add the page-specific value proposition in the CMS.",
    benefitsDescriptionId: "Tambahkan proposisi nilai khusus halaman melalui CMS.",
    productsTitleEn: "Explore Our Media",
    productsTitleId: "Jelajahi Media Kami",
    productsDescriptionEn: "Explore the media formats and placements available for this solution.",
    productsDescriptionId: "Jelajahi format media dan penempatan yang tersedia untuk solusi ini.",
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
    published: true,
    order: item.order,
  };
}

async function main() {
  const movementPage = await prisma.solutionPage.upsert({
    where: { slug: movement.slug },
    update: { seoDescriptionEn: movement.seoDescriptionEn, seoDescriptionId: movement.seoDescriptionId },
    create: movement,
  });

  for (const item of placeholders) {
    await prisma.solutionPage.upsert({
      where: { slug: item.slug },
      update: placeholderData(item),
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

  await prisma.solutionOverview.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      heroEyebrowEn: "", heroEyebrowId: "",
      heroTitleEn: "Our Advertising Solutions", heroTitleId: "Solusi Periklanan Kami",
      heroDescriptionEn: "From high-impact roadside billboards to premium mall LED screens, mobile advertising and real-world brand experiences, discover integrated OOH and DOOH solutions designed to connect your brand with audiences across Indonesia.",
      heroDescriptionId: "Dari billboard roadside berdampak tinggi hingga layar LED premium di mal, periklanan bergerak, dan pengalaman brand di dunia nyata, temukan solusi OOH dan DOOH terintegrasi yang dirancang untuk menghubungkan brand Anda dengan audiens di seluruh Indonesia.",
      heroImage: "/assets/media/eco-the-movement.webp",
      heroPrimaryCtaLabelEn: "Explore Our Solutions", heroPrimaryCtaLabelId: "Jelajahi Solusi Kami", heroPrimaryCtaHref: "#ecosystem",
      heroSecondaryCtaLabelEn: "Plan Your Campaign", heroSecondaryCtaLabelId: "Rencanakan Kampanye Anda", heroSecondaryCtaHref: "/#contact",
      heroSupportingLineEn: "Roadside · Indoor · Mobile · Experience · Intelligence", heroSupportingLineId: "Roadside · Indoor · Mobile · Experience · Intelligence",
      introEyebrowEn: "What We Do", introEyebrowId: "Yang Kami Lakukan",
      introTitleEn: "Different Brands.\nDifferent Goals.\nOne Connected\nEcosystem.", introTitleId: "Brand Berbeda.\nTujuan Berbeda.\nSatu Ekosistem\nTerhubung.",
      introBodyEn: "Every campaign starts with a goal. Maybe you want more people to recognize your brand, introduce a new product, reach shoppers near retail destinations or create an experience people will remember.\n\nMING Promotion brings together five advertising ecosystems to help you find the right approach.\n\nFrom static and digital out-of-home advertising to mobile media, experiential marketing and audience insights, our solutions are designed to support different campaign objectives, locations and audience environments.\n\nExplore each solution to discover how your brand can connect with people beyond traditional advertising channels.",
      introBodyId: "Setiap kampanye dimulai dengan sebuah tujuan. Mungkin Anda ingin lebih banyak orang mengenali brand Anda, memperkenalkan produk baru, menjangkau pengunjung di sekitar destinasi retail, atau menciptakan pengalaman yang akan mereka ingat.\n\nMING Promotion menyatukan lima ekosistem periklanan untuk membantu Anda menemukan pendekatan yang tepat.\n\nMulai dari periklanan luar ruang statis dan digital hingga media bergerak, experiential marketing, dan audience insight, solusi kami dirancang untuk mendukung beragam tujuan kampanye, lokasi, dan lingkungan audiens.\n\nJelajahi setiap solusi untuk menemukan cara brand Anda dapat terhubung dengan audiens melampaui kanal periklanan tradisional.",
      layersEyebrowEn: "Explore Our Ecosystem", layersEyebrowId: "Jelajahi Ekosistem Kami",
      layersTitleEn: "Find the Right Way to Connect with Your Audience", layersTitleId: "Temukan Cara Tepat untuk Terhubung dengan Audiens Anda",
      layersDescriptionEn: "Your audience moves between different places and experiences every day. Discover five ways to bring your campaign into those moments.", layersDescriptionId: "Audiens Anda berpindah di antara berbagai tempat dan pengalaman setiap hari. Temukan lima cara untuk menghadirkan kampanye Anda ke dalam momen-momen tersebut.",
      ctaTitleEn: "Not Sure Which Solution Fits Your", ctaTitleId: "Belum Yakin Solusi Mana yang Tepat untuk Kampanye", ctaEmphasisEn: "Campaign?", ctaEmphasisId: "Anda?",
      ctaDescriptionEn: "You don't need to know which advertising format to choose.\n\nTell us what you want to achieve, who you want to reach and where your campaign should run. We'll help you explore suitable advertising solutions based on your objectives, preferred locations and budget.",
      ctaDescriptionId: "Anda tidak perlu mengetahui format periklanan mana yang harus dipilih.\n\nCeritakan apa yang ingin Anda capai, siapa yang ingin Anda jangkau, dan di mana kampanye Anda akan berjalan. Kami akan membantu Anda mengeksplorasi solusi periklanan yang sesuai berdasarkan tujuan, lokasi pilihan, dan anggaran Anda.",
      ctaButtonLabelEn: "Get My Free Plan & Quote", ctaButtonLabelId: "Dapatkan Rencana & Penawaran Gratis", ctaButtonHref: "/#contact",
      ctaSecondaryButtonLabelEn: "Talk to Our Team", ctaSecondaryButtonLabelId: "Bicara dengan Tim Kami", ctaSecondaryButtonHref: "/#contact",
      ctaReassuranceEn: "Free consultation · Tailored recommendations · One connected advertising ecosystem", ctaReassuranceId: "Konsultasi gratis · Rekomendasi yang disesuaikan · Satu ekosistem periklanan terhubung",
      seoTitleEn: "Our Advertising Solutions | MING Promotion", seoTitleId: "Solusi Periklanan Kami | MING Promotion",
      seoDescriptionEn: "Discover integrated OOH and DOOH advertising solutions from MING Promotion across Indonesia.", seoDescriptionId: "Temukan solusi periklanan OOH dan DOOH terintegrasi dari MING Promotion di seluruh Indonesia.",
    },
  });

  await prisma.solutionPage.updateMany({ where: { slug: "the-movement" }, data: { templateVariant: "showcase" } });
  await prisma.solutionPage.updateMany({ where: { slug: { in: ["the-roadside", "the-inside"] } }, data: { templateVariant: "inventory" } });
  await prisma.solutionPage.updateMany({ where: { slug: { in: ["the-brain", "the-experience"] } }, data: { templateVariant: "standard" } });

  const movementRecord = await prisma.solutionPage.findUnique({ where: { slug: "the-movement" }, select: { id: true } });
  if (movementRecord) {
    await prisma.solutionProduct.updateMany({ where: { solutionPageId: movementRecord.id }, data: { isActive: false } });
    const mobile = await prisma.solutionProduct.updateMany({ where: { solutionPageId: movementRecord.id, nameEn: "Mobile LED" }, data: {
      isActive: true, slug: "mobile-led", detailTitleEn: "Mobile LED Advertising That Goes Where Your Customers Are", detailTitleId: "Iklan Mobile LED yang Hadir di Tempat Pelanggan Anda Berada",
      detailDescriptionEn: "High-definition moving digital billboards targeting high-density traffic corridors.", detailDescriptionId: "Billboard digital bergerak beresolusi tinggi yang menargetkan koridor lalu lintas padat.", detailBodyEn: "A fixed billboard waits for people to pass by. Mobile LED goes to them, bringing dynamic video creative into the places and moments that matter.", detailBodyId: "Billboard statis menunggu orang melewatinya. Mobile LED hadir menghampiri mereka, membawa konten video dinamis ke tempat dan momen yang penting.", detailHeroImage: "/assets/solutions/the-movement/mobile-led.webp", showcaseTitleEn: "Meet the Mobile LED", showcaseTitleId: "Kenali Mobile LED", showcaseDescriptionEn: "A moving screen built to be seen across the routes your audience takes every day.", showcaseDescriptionId: "Layar bergerak yang dirancang untuk terlihat di sepanjang rute harian audiens Anda.", showcaseMediaUrl: "/assets/media/insight/insight-mobile-led.webp", showcaseMediaType: "image"
    } });
    const adsman = await prisma.solutionProduct.updateMany({ where: { solutionPageId: movementRecord.id, nameEn: "Adsman" }, data: {
      isActive: true, slug: "adsman", detailTitleEn: "Bring Your Brand to the Street", detailTitleId: "Bawa Brand Anda ke Jalanan",
      detailDescriptionEn: "Build more engagement on the street with a flexible experiential format.", detailDescriptionId: "Bangun engagement lebih kuat di jalanan melalui format experiential yang fleksibel.", detailBodyEn: "Adsman creates direct, memorable encounters between your brand and the audiences moving through the city.", detailBodyId: "Adsman menciptakan pertemuan langsung dan berkesan antara brand Anda dan audiens yang bergerak di kota.", detailHeroImage: "/assets/solutions/the-movement/adsman.webp", showcaseTitleEn: "Meet Adsman", showcaseTitleId: "Kenali Adsman", showcaseDescriptionEn: "A flexible street-level format for launches, roadshows, and audience engagement.", showcaseDescriptionId: "Format fleksibel di level jalan untuk peluncuran, roadshow, dan engagement audiens.", showcaseMediaUrl: "/assets/solutions/the-movement/adsman.webp", showcaseMediaType: "image"
    } });
    const products = await prisma.solutionProduct.findMany({ where: { solutionPageId: movementRecord.id, isActive: true }, select: { id: true, nameEn: true } });
    const insightPosts = await prisma.post.findMany({ where: { published: true }, orderBy: { createdAt: "desc" }, take: 4, select: { id: true } });
    for (const product of products) {
      await prisma.solutionProductFeature.deleteMany({ where: { productId: product.id } });
      await prisma.solutionProductLocation.deleteMany({ where: { productId: product.id } });
      await prisma.solutionProductGallery.deleteMany({ where: { productId: product.id } });
      await prisma.solutionProductCaseStudy.deleteMany({ where: { productId: product.id } });
      await prisma.solutionProductInsight.deleteMany({ where: { productId: product.id } });
      const featureRows = product.nameEn === "Mobile LED" ? [
        { productId: product.id, key: "reach", labelEn: "Reach", labelId: "Jangkauan", titleEn: "Get seen by thousands", titleId: "Dilihat ribuan audiens", bodyEn: "Route your message around the locations and moments that matter to your campaign.", bodyId: "Arahkan pesan Anda ke lokasi dan momen yang penting bagi kampanye.", order: 0 },
        { productId: product.id, key: "impact", labelEn: "Impact", labelId: "Dampak", titleEn: "Moving impact", titleId: "Dampak bergerak", bodyEn: "Dynamic video and repeated exposure create stronger recall than a static poster.", bodyId: "Video dinamis dan eksposur berulang menciptakan ingatan lebih kuat daripada poster statis.", order: 1 },
        { productId: product.id, key: "flexibility", labelEn: "Flexibility", labelId: "Fleksibilitas", titleEn: "Built around your route", titleId: "Dirancang mengikuti rute Anda", bodyEn: "Adjust routes, operating windows, and creative delivery around campaign priorities.", bodyId: "Sesuaikan rute, waktu operasional, dan penayangan materi mengikuti prioritas kampanye.", order: 2 },
      ] : [
        { productId: product.id, key: "engagement", labelEn: "Engagement", labelId: "Engagement", titleEn: "Meet audiences directly", titleId: "Temui audiens secara langsung", bodyEn: "Create memorable interactions where people gather, move, and discover new brands.", bodyId: "Ciptakan interaksi berkesan di tempat orang berkumpul, bergerak, dan menemukan brand baru.", order: 0 },
        { productId: product.id, key: "activation", labelEn: "Activation", labelId: "Aktivasi", titleEn: "Flexible street activation", titleId: "Aktivasi jalanan yang fleksibel", bodyEn: "Adapt the format for launches, sampling, roadshows, and direct audience engagement.", bodyId: "Sesuaikan format untuk peluncuran, sampling, roadshow, dan engagement langsung.", order: 1 },
      ];
      for (const feature of featureRows) await prisma.solutionProductFeature.create({ data: feature });
      const locationRows = [
        { productId: product.id, labelEn: "Jakarta", labelId: "Jakarta", order: 0 },
        { productId: product.id, labelEn: "Bandung", labelId: "Bandung", order: 1 },
        { productId: product.id, labelEn: "Bekasi", labelId: "Bekasi", order: 2 },
      ];
      for (const location of locationRows) await prisma.solutionProductLocation.create({ data: location });
      const galleryRows = product.nameEn === "Mobile LED" ? [
        { productId: product.id, imageUrl: "/assets/solutions/the-movement/mobile-led.webp", altEn: "Mobile LED truck in the city", altId: "Truk Mobile LED di kota", order: 0 },
        { productId: product.id, imageUrl: "/assets/media/insight/insight-mobile-led.webp", altEn: "Mobile LED campaign detail", altId: "Detail kampanye Mobile LED", order: 1 },
      ] : [
        { productId: product.id, imageUrl: "/assets/solutions/the-movement/adsman.webp", altEn: "Adsman street activation", altId: "Aktivasi jalanan Adsman", order: 0 },
      ];
      for (const gallery of galleryRows) await prisma.solutionProductGallery.create({ data: gallery });
      const caseRows = product.nameEn === "Mobile LED" ? [
        { clientName: "National Launch", titleEn: "Make the launch impossible to miss", titleId: "Buat peluncuran mustahil terlewat", imageUrl: galleryRows[0].imageUrl },
        { clientName: "Multi-city Roadshow", titleEn: "Bring the message closer to audiences", titleId: "Bawa pesan lebih dekat kepada audiens", imageUrl: galleryRows[1].imageUrl },
      ] : [
        { clientName: "Urban Activation", titleEn: "Turn streets into brand moments", titleId: "Jadikan jalanan momen brand", imageUrl: galleryRows[0].imageUrl },
      ];
      for (const [caseOrder, row] of caseRows.entries()) await prisma.solutionProductCaseStudy.create({ data: {
        productId: product.id, ...row,
        descriptionEn: "A flexible format designed around the audience, route, and moment of the campaign.",
        descriptionId: "Format fleksibel yang dirancang mengikuti audiens, rute, dan momen kampanye.",
        href: "/#contact", order: caseOrder, isActive: true,
      } });
      for (const [insightOrder, post] of insightPosts.entries()) await prisma.solutionProductInsight.create({ data: { productId: product.id, postId: post.id, order: insightOrder } });
    }
    console.log(`Movement products configured: ${mobile.count + adsman.count}`);
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
