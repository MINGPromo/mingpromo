import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const globalFaqCategories = [
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
          "MING Promotion adalah perusahaan periklanan Out-of-Home (OOH) dan Digital Out-of-Home (DOOH) di Indonesia yang menghadirkan solusi media kreatif untuk membantu brand terhubung dengan audiensnya.",
        order: 0,
      },
      {
        questionEn: "What is the difference between OOH and DOOH advertising?",
        questionId: "Apa perbedaan antara iklan OOH dan DOOH?",
        answerEn:
          "OOH refers to static outdoor media such as traditional billboards and street banners, while DOOH uses digital LED screens that support dynamic video, motion graphics, and flexible scheduling.",
        answerId:
          "OOH merujuk pada media luar ruang statis seperti billboard konvensional, sedangkan DOOH menggunakan layar LED digital yang mendukung video dinamis, animasi, dan penjadwalan fleksibel.",
        order: 1,
      },
      {
        questionEn: "Why choose MING Promotion?",
        questionId: "Mengapa memilih MING Promotion?",
        answerEn:
          "We combine prime outdoor inventory, end-to-end production and permitting, and data-backed planning across major Indonesian cities.",
        answerId:
          "Kami menggabungkan inventori media luar ruang strategis, produksi serta perizinan menyeluruh, dan perencanaan berbasis data di berbagai kota besar Indonesia.",
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
        questionEn: "What media formats does MING Promotion offer?",
        questionId: "Format media apa saja yang ditawarkan MING Promotion?",
        answerEn:
          "We provide an integrated ecosystem spanning Roadside billboards & LEDs, Moving transit media, In-Mall digital & static placements, Experiential activations, and AI-powered audience analytics.",
        answerId:
          "Kami menyediakan ekosistem terpadu mulai dari billboard & LED Roadside, media bergerak (transit), penempatan digital & statis di dalam mal, aktivasi brand, hingga analitik audiens berbasis AI.",
        order: 0,
      },
      {
        questionEn: "Can we combine multiple solutions in one campaign?",
        questionId: "Bisakah kami menggabungkan beberapa solusi dalam satu kampanye?",
        answerEn:
          "Yes, our team specializes in building cross-format campaigns—combining Roadside, Transit, and Mall media—to maximize frequency and reach across your audience's daily journey.",
        answerId:
          "Ya, tim kami berpengalaman merancang kampanye lintas format—menggabungkan media Roadside, Transit, dan Mal—untuk memaksimalkan frekuensi dan jangkauan sepanjang perjalanan audiens.",
        order: 1,
      },
    ],
  },
  {
    key: "pricing",
    labelEn: "Pricing & Booking",
    labelId: "Harga & Pemesanan",
    order: 2,
    items: [
      {
        questionEn: "How far in advance should we book a campaign?",
        questionId: "Berapa lama sebelum kampanye kami harus melakukan pemesanan?",
        answerEn:
          "We recommend booking 2–4 weeks prior to launch for DOOH digital screens and 4–6 weeks in advance for static billboards or custom brand activations to allow time for permitting and production.",
        answerId:
          "Kami menyarankan pemesanan 2–4 minggu sebelum tayang untuk layar digital DOOH dan 4–6 minggu sebelumnya untuk billboard statis atau aktivasi khusus agar proses perizinan dan produksi berjalan optimal.",
        order: 0,
      },
    ],
  },
];

const roadsideFaqCategories = [
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
          "MING Promotion adalah perusahaan periklanan Out-of-Home (OOH) dan Digital Out-of-Home (DOOH) di Indonesia yang menghadirkan solusi media kreatif untuk membantu brand terhubung dengan audiensnya.",
        order: 0,
      },
      {
        questionEn: "What is the difference between OOH and DOOH advertising?",
        questionId: "Apa perbedaan antara iklan OOH dan DOOH?",
        answerEn:
          "OOH refers to static outdoor media such as traditional billboards and street banners, while DOOH uses digital LED screens that support dynamic video, motion graphics, and flexible scheduling.",
        answerId:
          "OOH merujuk pada media luar ruang statis seperti billboard konvensional, sedangkan DOOH menggunakan layar LED digital yang mendukung video dinamis, animasi, dan penjadwalan fleksibel.",
        order: 1,
      },
      {
        questionEn: "Why choose MING Promotion?",
        questionId: "Mengapa memilih MING Promotion?",
        answerEn:
          "We combine prime roadside inventory, end-to-end production and permitting, and data-backed planning across major Indonesian cities.",
        answerId:
          "Kami menggabungkan inventori titik roadside strategis, produksi serta perizinan menyeluruh, dan perencanaan berbasis data di berbagai kota besar Indonesia.",
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
        questionEn: "What roadside formats are available for brands?",
        questionId: "Format media roadside apa saja yang tersedia?",
        answerEn:
          "Our roadside portfolio includes large-format static billboards, high-brightness roadside LED screens, street-level panels, and highway gantries.",
        answerId:
          "Portofolio roadside kami mencakup billboard statis format besar, layar LED roadside beresolusi tinggi, panel setingkat jalan, hingga gantry jalan tol.",
        order: 0,
      },
      {
        questionEn: "Can we run dayparting or scheduled content on roadside LEDs?",
        questionId: "Bisakah kami menjalankan penjadwalan konten berdasarkan jam pada LED roadside?",
        answerEn:
          "Yes, our DOOH roadside screens allow time-of-day scheduling so you can tailor creatives for morning commuters, lunch hours, or evening traffic.",
        answerId:
          "Ya, layar LED DOOH kami mendukung penjadwalan berbasis jam sehingga Anda dapat menyesuaikan materi iklan untuk jam berangkat kerja, siang hari, maupun jam pulang kantor.",
        order: 1,
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
        questionEn: "Where are MING Promotion roadside media located?",
        questionId: "Di mana saja lokasi media roadside MING Promotion?",
        answerEn:
          "Our placements cover high-traffic arterial roads, CBD intersections, toll corridors, and commercial districts across Greater Jakarta and major Indonesian cities.",
        answerId:
          "Penempatan kami mencakup jalan arteri padat lalu lintas, persimpangan kawasan bisnis (CBD), koridor jalan tol, dan area komersial di Jabodetabek serta kota besar Indonesia.",
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
        questionEn: "What is the minimum booking duration for roadside media?",
        questionId: "Berapa durasi pemesanan minimum untuk media roadside?",
        answerEn:
          "Digital roadside screens can be booked starting from 2 weeks to 1 month, while static billboards are typically booked per 1, 3, 6, or 12 months.",
        answerId:
          "Layar LED roadside dapat dipesan mulai dari durasi 2 minggu hingga 1 bulan, sedangkan billboard statis umumnya dipesan per 1, 3, 6, atau 12 bulan.",
        order: 0,
      },
      {
        questionEn: "Does the price include printing, installation, and local tax?",
        questionId: "Apakah harga sudah termasuk cetak materi, pemasangan, dan pajak reklame?",
        answerEn:
          "Our proposals can be tailored as all-inclusive packages covering media rental, vinyl production, installation, lighting, and local billboard tax.",
        answerId:
          "Proposal kami dapat disusun sebagai paket menyeluruh yang mencakup sewa media, cetak materi, pemasangan, pencahayaan, dan pajak reklame daerah.",
        order: 1,
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
        questionEn: "What file format and resolution are required for Roadside LED?",
        questionId: "Apa format file dan resolusi yang dibutuhkan untuk Roadside LED?",
        answerEn:
          "We recommend MP4 (H.264) videos at 25–30 fps matching the exact pixel dimensions of your selected screen, with a standard 15-second slot duration.",
        answerId:
          "Kami merekomendasikan video format MP4 (H.264) 25–30 fps sesuai resolusi layar yang dipilih, dengan durasi slot standar 15 detik.",
        order: 0,
      },
    ],
  },
  {
    key: "reporting",
    labelEn: "Campaign & Reporting",
    labelId: "Kampanye & Pelaporan",
    order: 5,
    items: [
      {
        questionEn: "What proof of performance do we receive after launch?",
        questionId: "Bukti penayangan apa yang kami terima setelah kampanye berjalan?",
        answerEn:
          "You receive photo/video installation proof, automated Proof-of-Play logs for DOOH screens, and periodic night/day monitoring reports.",
        answerId:
          "Anda akan menerima dokumentasi foto/video pemasangan, log Proof-of-Play otomatis untuk layar DOOH, serta laporan pemantauan siang dan malam secara berkala.",
        order: 0,
      },
    ],
  },
];

const experienceFaqCategories = [
  {
    key: "activation",
    labelEn: "Event & Brand Activation",
    labelId: "Event & Aktivasi Brand",
    order: 0,
    items: [
      {
        questionEn: "What types of experiential activations can MING Promotion execute?",
        questionId: "Jenis aktivasi brand apa saja yang dapat dijalankan oleh MING Promotion?",
        answerEn:
          "We design and execute pop-up booths, interactive installations, roadshows, product sampling, and synchronized OOH-plus-experiential launches.",
        answerId:
          "Kami merancang dan mengeksekusi pop-up booth, instalasi interaktif, roadshow, product sampling, serta peluncuran produk yang terintegrasi dengan media OOH.",
        order: 0,
      },
      {
        questionEn: "Can activations be integrated with digital screens or mobile ads?",
        questionId: "Bisakah aktivasi diintegrasikan dengan layar digital atau iklan mobile?",
        answerEn:
          "Yes, we can connect on-ground activations with live social feeds on nearby DOOH screens and retarget attendees via mobile geofencing.",
        answerId:
          "Ya, kami dapat menghubungkan aktivasi lapangan dengan tampilan interaktif di layar DOOH terdekat serta menargetkan ulang pengunjung melalui mobile geofencing.",
        order: 1,
      },
    ],
  },
  {
    key: "permits",
    labelEn: "Production & Permits",
    labelId: "Produksi & Perizinan",
    order: 1,
    items: [
      {
        questionEn: "Does MING Promotion handle venue permits and booth fabrication?",
        questionId: "Apakah MING Promotion menangani perizinan venue dan fabrikasi booth?",
        answerEn:
          "Yes, our production team handles structural engineering, 3D fabrication, venue coordination, safety compliance, and on-site event staffing.",
        answerId:
          "Ya, tim produksi kami menangani konstruksi teknis, fabrikasi 3D, koordinasi venue, standar keselamatan, hingga staf operasional di lapangan.",
        order: 0,
      },
      {
        questionEn: "How long does custom activation production take?",
        questionId: "Berapa lama waktu produksi untuk aktivasi custom?",
        answerEn:
          "Standard custom booths require 2–3 weeks for fabrication and testing, while large multi-city roadshows typically take 4–6 weeks of preparation.",
        answerId:
          "Booth custom standar membutuhkan 2–3 minggu untuk fabrikasi dan uji coba, sedangkan roadshow multi-kota umumnya membutuhkan persiapan 4–6 minggu.",
        order: 1,
      },
    ],
  },
];

async function seedScopeCategories({ scope, solutionPageId = null, categories }) {
  for (const cat of categories) {
    const existing = await prisma.faqCategory.findFirst({
      where: {
        scope,
        solutionPageId,
        key: cat.key,
      },
      select: { id: true },
    });

    if (existing) {
      await prisma.faqCategory.delete({ where: { id: existing.id } });
    }

    const created = await prisma.faqCategory.create({
      data: {
        scope,
        solutionPageId,
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
      include: { items: true },
    });

    console.log(
      `Seeded [${scope}${solutionPageId ? `:${solutionPageId}` : ""}] ${created.labelEn} (${created.items.length} items)`
    );
  }
}

async function main() {
  console.log("Seeding contextual FAQ data...");

  // 1. Seed GLOBAL FAQs
  await seedScopeCategories({
    scope: "GLOBAL",
    solutionPageId: null,
    categories: globalFaqCategories,
  });

  // 2. Seed THE ROADSIDE FAQs
  const roadside = await prisma.solutionPage.findUnique({
    where: { slug: "the-roadside" },
    select: { id: true, slug: true },
  });

  if (roadside) {
    await seedScopeCategories({
      scope: "SOLUTION",
      solutionPageId: roadside.id,
      categories: roadsideFaqCategories,
    });
  } else {
    console.warn('Warning: SolutionPage with slug "the-roadside" not found.');
  }

  // 3. Seed THE EXPERIENCE FAQs
  const experience = await prisma.solutionPage.findUnique({
    where: { slug: "the-experience" },
    select: { id: true, slug: true },
  });

  if (experience) {
    await seedScopeCategories({
      scope: "SOLUTION",
      solutionPageId: experience.id,
      categories: experienceFaqCategories,
    });
  } else {
    console.warn('Warning: SolutionPage with slug "the-experience" not found.');
  }

  console.log("FAQ seeding completed successfully.");
}

main()
  .catch((error) => {
    console.error("Failed to seed FAQs:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
