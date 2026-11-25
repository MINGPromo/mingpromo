import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const mobileLedFaqCategories = [
  {
    key: "about",
    labelEn: "About MING Promotion",
    labelId: "Tentang MING Promotion",
    order: 0,
    items: [
      {
        questionEn: "What is MING Promotion?",
        questionId: "Apa itu MING Promotion?",
        answerEn:
          "MING Promotion is an Out-of-Home (OOH) and Digital Out-of-Home (DOOH) advertising company in Indonesia, offering creative media solutions to help brands connect with their audiences.",
        answerId:
          "MING Promotion adalah perusahaan periklanan Out-of-Home (OOH) dan Digital Out-of-Home (DOOH) di Indonesia, yang menawarkan solusi media kreatif untuk membantu brand terhubung dengan audiens mereka.",
        order: 0,
      },
      {
        questionEn: "What is the difference between OOH and DOOH advertising?",
        questionId: "Apa perbedaan antara iklan OOH dan DOOH?",
        answerEn:
          "OOH refers to traditional outdoor media like billboards and banners, while DOOH includes digital screens, videotron displays, and interactive media that present dynamic multimedia content.",
        answerId:
          "OOH merujuk pada media luar ruang tradisional seperti billboard dan banner, sedangkan DOOH mencakup layar digital, videotron, dan media interaktif yang menampilkan konten multimedia dinamis.",
        order: 1,
      },
      {
        questionEn: "Why choose MING Promotion?",
        questionId: "Mengapa memilih MING Promotion?",
        answerEn:
          "With 25+ years of experience, nationwide OOH spots, premium mall networks, mobile experiential fleets, and audience measurement, MING delivers high-impact campaigns with proven recall.",
        answerId:
          "Dengan pengalaman lebih dari 25 tahun, titik OOH nasional, jaringan mall premium, armada mobile experiential, dan pengukuran audiens, MING menghadirkan kampanye berdampak tinggi dengan recall yang terbukti.",
        order: 2,
      },
    ],
  },
  {
    key: "products",
    labelEn: "Products & Services",
    labelId: "Produk & Layanan",
    order: 1,
    items: [
      {
        questionEn: "What formats and support are available?",
        questionId: "Format dan dukungan apa yang tersedia?",
        answerEn:
          "Mobile LED supports high-definition video and static creative, with optional audio and event support for live campaign moments.",
        answerId:
          "Mobile LED mendukung video definisi tinggi dan materi statis, dengan dukungan audio dan event opsional untuk momen kampanye live.",
        order: 0,
      },
    ],
  },
  {
    key: "locations",
    labelEn: "Locations & Placements",
    labelId: "Lokasi & Penempatan",
    order: 2,
    items: [
      {
        questionEn: "Where can Mobile LED routes run?",
        questionId: "Di mana rute Mobile LED dapat berjalan?",
        answerEn:
          "Routes can be planned around major roads, business districts, commercial centers, university areas, events, and other high-density audience locations.",
        answerId:
          "Rute dapat direncanakan di sekitar jalan utama, kawasan bisnis, pusat komersial, area kampus, event, dan lokasi audiens berdensitas tinggi lainnya.",
        order: 0,
      },
    ],
  },
  {
    key: "pricing",
    labelEn: "Pricing & Booking",
    labelId: "Harga & Pemesanan",
    order: 3,
    items: [
      {
        questionEn: "What is the minimum booking duration?",
        questionId: "Berapa durasi booking minimum?",
        answerEn:
          "Flexible packages are available for daily events, monthly campaigns, and longer integrated OOH programs.",
        answerId:
          "Paket fleksibel tersedia untuk event harian, kampanye bulanan, dan program OOH terintegrasi jangka panjang.",
        order: 0,
      },
    ],
  },
  {
    key: "technical",
    labelEn: "Advertising Materials & Technical Requirements",
    labelId: "Materi Iklan & Persyaratan Teknis",
    order: 4,
    items: [
      {
        questionEn: "What creative files are required?",
        questionId: "Materi kreatif apa yang dibutuhkan?",
        answerEn:
          "We support MP4, MOV, JPG, and PNG. Exact dimensions and technical guidelines are shared during campaign booking.",
        answerId:
          "Kami mendukung MP4, MOV, JPG, dan PNG. Dimensi dan panduan teknis lengkap diberikan saat booking kampanye.",
        order: 0,
      },
    ],
  },
  {
    key: "reporting",
    labelEn: "Campaign & Reporting",
    labelId: "Kampanye & Laporan",
    order: 5,
    items: [
      {
        questionEn: "How is delivery reported?",
        questionId: "Bagaimana penayangan dilaporkan?",
        answerEn:
          "Each campaign can include GPS route tracking, photo and video documentation, and Proof of Play reporting.",
        answerId:
          "Setiap kampanye dapat dilengkapi pelacakan rute GPS, dokumentasi foto dan video, serta laporan Proof of Play.",
        order: 0,
      },
    ],
  },
];

async function main() {
  const movement = await prisma.solutionPage.findUnique({
    where: { slug: "the-movement" },
    include: { products: true },
  });

  if (!movement) {
    console.warn("SolutionPage 'the-movement' not found.");
    return;
  }

  // Ensure all products under The Movement use the 'movement' templateVariant
  await prisma.solutionProduct.updateMany({
    where: { solutionPageId: movement.id },
    data: { templateVariant: "movement" },
  });

  const mobileLed = movement.products.find((p) => p.slug === "mobile-led");
  if (!mobileLed) {
    console.warn("Product 'mobile-led' under 'the-movement' not found.");
    return;
  }

  await prisma.solutionProduct.update({
    where: { id: mobileLed.id },
    data: {
      templateVariant: "movement",
      detailTitleEn: "Mobile LED Advertising That Goes Where Your Customers Are",
      detailTitleId: "Iklan Mobile LED Menjangkau Tempat Pelanggan Anda Berada",
      detailDescriptionEn:
        "HIGH-DEFINITION MOVING DIGITAL BILLBOARDS TARGETING HIGH-DENSITY TRAFFIC CORRIDORS",
      detailDescriptionId:
        "BILLBOARD DIGITAL BERGERAK DEFINISI TINGGI MENYASAR KORIDOR LALU LINTAS PADAT",
      detailBodyEn:
        "A fixed billboard waits for people to pass by. Mobile LED goes to them: office districts at rush hour, shopping areas on weekends, campuses, tourist spots and event entrances. The result is more impressions in the places that matter, with a video format that holds attention far better than a static poster.",
      detailBodyId:
        "Billboard statis menunggu orang melewatinya. Mobile LED mendatangi mereka: kawasan perkantoran saat jam sibuk, area belanja di akhir pekan, kampus, lokasi wisata, dan pintu masuk event. Hasilnya adalah lebih banyak impresi di tempat yang penting, dengan format video yang lebih menarik daripada poster statis.",
      detailHeroImage: "/assets/solutions/the-movement/mobile-led.webp",
      heroPrimaryCtaLabelEn: "Book Campaign",
      heroPrimaryCtaLabelId: "Pesan Kampanye",
      heroPrimaryCtaHref: "#contact",
      heroSecondaryCtaLabelEn: "View Specs",
      heroSecondaryCtaLabelId: "Lihat Spesifikasi",
      heroSecondaryCtaHref: "#guides",
      valueBarTextEn:
        "Not sure which setup fits your goal and budget? Tell us your target cities and dates. We'll recommend the most efficient route plan.",
      valueBarTextId:
        "Belum yakin setup mana yang sesuai dengan tujuan dan budget Anda? Sampaikan kota dan tanggal target Anda. Kami akan merekomendasikan rute yang paling efisien.",
      valueBarCtaLabelEn: "Talk With Us",
      valueBarCtaLabelId: "Hubungi Kami",
      valueBarCtaHref: "#contact",
      showcaseTitleEn: "Meet the Mobile LED",
      showcaseTitleId: "Kenali Mobile LED",
      showcaseDescriptionEn: "Moving Screen Built to Be Seen",
      showcaseDescriptionId: "Layar Bergerak yang Dibuat untuk Terlihat",
      showcaseMediaUrl: "/assets/media/milestones/mobile-led.webp",
      showcaseMediaType: "image",
      showcaseMetaTitleEn: "3D Rotate Animation",
      showcaseMetaTitleId: "Animasi Rotasi 3D",
      showcaseMetaDescEn:
        "Bright enough for daylight, sharp enough to read from a distance, and operated by a trained crew on a set route. This is what will carry your brand.",
      showcaseMetaDescId:
        "Cukup terang untuk siang hari, cukup tajam untuk dibaca dari kejauhan, dan dioperasikan oleh kru terlatih di rute yang telah ditentukan. Inilah yang akan membawa brand Anda.",
      worksTitleEn: "Real Campaigns. Moving Brand Stories.",
      worksTitleId: "Kampanye Nyata. Cerita Brand yang Bergerak.",
      worksDescriptionEn:
        "See how brands use MING Promotion's Mobile LED advertising to bring their messages closer to audiences. From city-wide awareness campaigns to multi-city roadshows, explore how moving digital screens connect brands with people across Indonesia.",
      worksDescriptionId:
        "Lihat bagaimana brand menggunakan iklan Mobile LED MING Promotion untuk membawa pesan lebih dekat ke audiens. Dari kampanye awareness seluruh kota hingga roadshow multi-kota.",
      guidesTitleEn: "Mobile LED Guides & Insights",
      guidesTitleId: "Panduan & Insight Mobile LED",
      guidesDescriptionEn: "Read for detail insight",
      guidesDescriptionId: "Baca insight selengkapnya",
      ctaBadgeEn: "CAMPAIGN EXECUTION",
      ctaBadgeId: "EKSEKUSI KAMPANYE",
      ctaTitleEn: "Your city,",
      ctaTitleId: "Kota Anda,",
      ctaEmphasisEn: "our stage.",
      ctaEmphasisId: "panggung kami.",
      ctaDescriptionEn:
        "Tell us about your brand and campaign goals - our team will put together the best mix of OOH, DOOH, and mobile ads to reach them.",
      ctaDescriptionId:
        "Ceritakan brand dan tujuan kampanye Anda - tim kami akan menyusun kombinasi OOH, DOOH, dan iklan bergerak terbaik untuk menjangkaunya.",
      ctaButtonLabelEn: "Request a Proposal",
      ctaButtonLabelId: "Minta Proposal",
      ctaButtonHref: "/#contact",
    },
  });

  // Replace gallery with 4 curated Mobile LED images
  await prisma.solutionProductGallery.deleteMany({ where: { productId: mobileLed.id } });
  for (const item of [
    {
      productId: mobileLed.id,
      imageUrl: "/assets/solutions/the-movement/mobile-led.webp",
      altEn: "MING Mobile LED Billboard on High Street",
      altId: "Mobile LED MING di jalan utama",
      order: 0,
    },
    {
      productId: mobileLed.id,
      imageUrl: "/assets/media/insight/insight-mobile-led.webp",
      altEn: "Mobile LED night corridor visibility",
      altId: "Visibilitas Mobile LED di malam hari",
      order: 1,
    },
    {
      productId: mobileLed.id,
      imageUrl: "/assets/media/milestones/mobile-led.webp",
      altEn: "Mobile LED fleet vehicle showcase",
      altId: "Armada kendaraan Mobile LED",
      order: 2,
    },
    {
      productId: mobileLed.id,
      imageUrl: "/assets/media/milestones/mobile-transformers.webp",
      altEn: "Mobile LED experiential activation truck",
      altId: "Truk aktivasi Mobile LED",
      order: 3,
    },
  ]) {
    await prisma.solutionProductGallery.create({ data: item });
  }

  // Replace Metro Coverage Tabs (features)
  await prisma.solutionProductFeature.deleteMany({ where: { productId: mobileLed.id } });
  for (const item of [
    {
      productId: mobileLed.id,
      key: "tab1",
      labelEn: "TAB 1",
      labelId: "TAB 1",
      titleEn: "GET SEEN BY THOUSANDS",
      titleId: "DILIHAT RIBUAN ORANG",
      bodyEn:
        "Best for sales, grand openings and seasonal promos. We route around your outlet, nearby malls and residential areas, with your offer, location and call-to-action clear on screen. It reaches people who are already close enough to visit.",
      bodyId:
        "Cocok untuk penjualan, grand opening, dan promo musiman. Kami mengatur rute di sekitar outlet, mall terdekat, dan area pemukiman, dengan penawaran, lokasi, dan call-to-action Anda terlihat jelas di layar.",
      cityTags: "JAKARTA, BANDUNG, BEKASI",
      order: 0,
    },
    {
      productId: mobileLed.id,
      key: "tab2",
      labelEn: "TAB 2",
      labelId: "TAB 2",
      titleEn: "West Java Lifestyle & Commercial Centers",
      titleId: "Pusat Gaya Hidup & Komersial Jawa Barat",
      bodyEn:
        "Connecting brands directly with young, active audiences across Dago, Riau, Asia Afrika in Bandung, and prime lifestyle retail corridors in Bekasi & Bogor. High dwell-time routes designed for maximum engagement.",
      bodyId:
        "Menghubungkan brand langsung dengan audiens muda dan aktif di Dago, Riau, Asia Afrika Bandung, serta koridor ritel gaya hidup utama di Bekasi & Bogor.",
      cityTags: "BANDUNG, BOGOR, TANGERANG",
      order: 1,
    },
    {
      productId: mobileLed.id,
      key: "tab3",
      labelEn: "TAB 3",
      labelId: "TAB 3",
      titleEn: "Nationwide Roadshow & Activation Convoys",
      titleId: "Konvoi Roadshow & Aktivasi Nasional",
      bodyEn:
        "Multi-city synchronized campaigns spanning Java, Sumatra, and Bali. Perfect for product launches, experiential sampling, festival roadshows, and integrated brand tours with full sound-and-light integration.",
      bodyId:
        "Kampanye sinkron multi-kota melintasi Jawa, Sumatra, dan Bali. Sangat cocok untuk peluncuran produk, sampling pengalaman, dan roadshow festival.",
      cityTags: "SURABAYA, SEMARANG, BALI",
      order: 2,
    },
  ]) {
    await prisma.solutionProductFeature.create({ data: item });
  }

  // Replace Featured Works (case studies)
  await prisma.solutionProductCaseStudy.deleteMany({ where: { productId: mobileLed.id } });
  for (const item of [
    {
      productId: mobileLed.id,
      clientName: "TikTok",
      titleEn: "TikTok #SalingJaga",
      titleId: "TikTok #SalingJaga",
      descriptionEn:
        "TikTok partnered with MING Promotion to bring its #SalingJaga campaign to the streets of Jakarta through Mobile LED advertising.",
      descriptionId:
        "TikTok bermitra dengan MING Promotion untuk membawa kampanye #SalingJaga ke jalanan Jakarta melalui iklan Mobile LED.",
      imageUrl: "/assets/solutions/the-movement/mobile-led.webp",
      href: "#contact",
      order: 0,
      isActive: true,
    },
    {
      productId: mobileLed.id,
      clientName: "Erafone",
      titleEn: "Erafone",
      titleId: "Erafone",
      descriptionEn:
        "Erafone took its roadshow campaign on a multi-city tour supported by MING Promotion's Mobile LED.",
      descriptionId:
        "Erafone membawa kampanye roadshow-nya dalam tur multi-kota yang didukung Mobile LED MING Promotion.",
      imageUrl: "/assets/media/insight/insight-mobile-led.webp",
      href: "#contact",
      order: 1,
      isActive: true,
    },
  ]) {
    await prisma.solutionProductCaseStudy.create({ data: item });
  }

  // Connect up to 4 published blog posts as Guides & Insights if not already linked
  const publishedPosts = await prisma.post.findMany({
    where: { published: true },
    take: 4,
    orderBy: { createdAt: "desc" },
    select: { id: true },
  });
  if (publishedPosts.length > 0) {
    await prisma.solutionProductInsight.deleteMany({ where: { productId: mobileLed.id } });
    for (const [idx, post] of publishedPosts.entries()) {
      await prisma.solutionProductInsight.create({
        data: {
          productId: mobileLed.id,
          postId: post.id,
          order: idx,
        },
      });
    }
  }

  // Seed Product-level FAQs for Mobile LED
  await prisma.faqCategory.deleteMany({
    where: { scope: "PRODUCT", productId: mobileLed.id },
  });

  for (const cat of mobileLedFaqCategories) {
    await prisma.faqCategory.create({
      data: {
        scope: "PRODUCT",
        productId: mobileLed.id,
        key: cat.key,
        labelEn: cat.labelEn,
        labelId: cat.labelId,
        order: cat.order,
        items: {
          create: cat.items.map((item) => ({
            questionEn: item.questionEn,
            questionId: item.questionId,
            answerEn: item.answerEn,
            answerId: item.answerId,
            order: item.order,
            isActive: true,
          })),
        },
      },
    });
  }

  console.log("Successfully seeded Mobile LED product & FAQs.");
}

main()
  .catch((error) => {
    console.error("Failed to seed Mobile LED:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
