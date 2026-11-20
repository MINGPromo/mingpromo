import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding Landing Page MVP data...");

    // 1. Landing Hero
    await prisma.landingHero.upsert({
        where: { id: "default" },
        update: {},
        create: {
            id: "default",
            tagline: "INSIDE OUT OF HOME",
            headlineEn: "Connecting Brands with Audiences Since 1999.",
            headlineId: "Menghubungkan Brand dengan Audiens Sejak 1999.",
            leadEn: "The consumer journey is never confined to a single location. MING is here to bridge every touchpoint, ensuring your brand remains relevant, visible, and connected every step of the way.",
            leadId: "Perjalanan konsumen tidak pernah terbatas pada satu lokasi. MING hadir menjembatani setiap titik temu, memastikan brand Anda tetap relevan, terlihat, dan terhubung di setiap langkah.",
        },
    });

    // 2. Site Metrics (4 items)
    await prisma.siteMetric.deleteMany();
    const metrics = [
        {
            targetNumber: 25,
            suffix: "+",
            formatComma: false,
            highlightEn: "OOH",
            labelEn: "Years of OOH experience",
            highlightId: "OOH",
            labelId: "Tahun pengalaman OOH",
            order: 1,
        },
        {
            targetNumber: 50,
            suffix: "M",
            formatComma: false,
            highlightEn: "Impressions",
            labelEn: "Monthly Impressions",
            highlightId: "Impresi",
            labelId: "Impresi Bulanan",
            order: 2,
        },
        {
            targetNumber: 12000,
            suffix: "+",
            formatComma: true,
            highlightEn: "Nationwide",
            labelEn: "OOH spots Nationwide",
            highlightId: "Nasional",
            labelId: "Titik OOH Nasional",
            order: 3,
        },
        {
            targetNumber: 250,
            suffix: "+",
            formatComma: false,
            highlightEn: "across Indonesia",
            labelEn: "Mall media across Indonesia",
            highlightId: "di seluruh Indonesia",
            labelId: "Media Mall di seluruh Indonesia",
            order: 4,
        },
    ];
    for (const m of metrics) {
        await prisma.siteMetric.create({ data: m });
    }

    // 3. Marquee Tickers (13 unique items)
    await prisma.marqueeTicker.deleteMany();
    const tickers = [
        { productType: "LED Screen", locationName: "23 Paskal, Bandung", impressions: "1,107,250 impressions/mo", order: 1 },
        { productType: "Digital Totem", locationName: "Kuningan City Mall", impressions: "2,870,139 impressions/mo", order: 2 },
        { productType: "Hanging Banner", locationName: "Pondok Indah Mall 1", impressions: "2,101,757 impressions/mo", order: 3 },
        { productType: "Static Billboard", locationName: "WTC Serpong", impressions: "1,351,822 impressions/mo", order: 4 },
        { productType: "Pillar Wrap", locationName: "Kemang Village", impressions: "1,866,975 impressions/mo", order: 5 },
        { productType: "Indoor Videotron", locationName: "Metropolitan Mall", impressions: "1,380,702 impressions/mo", order: 6 },
        { productType: "Mega LED Facade", locationName: "Grand Indonesia", impressions: "3,450,120 impressions/mo", order: 7 },
        { productType: "Escalator Branding", locationName: "Central Park Mall", impressions: "3,120,400 impressions/mo", order: 8 },
        { productType: "Elevator Wrap", locationName: "Senayan City", impressions: "2,980,500 impressions/mo", order: 9 },
        { productType: "Digital Screen Network", locationName: "Mall Kelapa Gading", impressions: "2,640,800 impressions/mo", order: 10 },
        { productType: "Curved LED", locationName: "Tunjungan Plaza Surabaya", impressions: "2,890,300 impressions/mo", order: 11 },
        { productType: "Atrium Lightbox", locationName: "Sun Plaza Medan", impressions: "1,620,450 impressions/mo", order: 12 },
        { productType: "Digital Spectacular", locationName: "Beachwalk Bali", impressions: "1,480,900 impressions/mo", order: 13 },
    ];
    for (const tk of tickers) {
        await prisma.marqueeTicker.create({ data: tk });
    }

    // 4. Five Connection Layers
    await prisma.connectionLayer.deleteMany();
    const layers = [
        {
            tabKey: "the-brain",
            badgeText: "THE BRAIN",
            titleEn: "OOH Measurement",
            titleId: "Pengukuran OOH",
            descEn: "Measure and optimize your campaigns with verified audience data.",
            descId: "Ukur dan optimalkan kampanye Anda dengan data audiens terverifikasi.",
            imageUrl: "/assets/media/eco-the-brain.webp",
            order: 1,
        },
        {
            tabKey: "the-movement",
            badgeText: "THE MOVEMENT",
            titleEn: "Mobile Ads",
            titleId: "Iklan Bergerak",
            descEn: "Dynamic mobile media taking your brand directly to prime audience paths.",
            descId: "Media bergerak dinamis yang membawa brand Anda langsung ke jalur audiens utama.",
            imageUrl: "/assets/media/eco-the-movement.webp",
            order: 2,
        },
        {
            tabKey: "the-inside",
            badgeText: "THE INSIDE",
            titleEn: "Premium Mall Inventory",
            titleId: "Inventory Mall Premium",
            descEn: "High-impact visual dominance within Indonesia's premier shopping destinations.",
            descId: "Dominasi visual berdampak tinggi di pusat perbelanjaan terkemuka Indonesia.",
            imageUrl: "/assets/media/eco-the-inside.webp",
            order: 3,
        },
        {
            tabKey: "the-roadside",
            badgeText: "THE ROADSIDE",
            titleEn: "Roadside OOH & DOOH",
            titleId: "Roadside OOH & DOOH",
            descEn: "Unmissable city-scale presence across key thoroughfares and urban arteries.",
            descId: "Kehadiran berskala kota yang tak terlewatkan di jalan protokol dan simpul perkotaan.",
            imageUrl: "/assets/media/eco-the-roadside.webp",
            order: 4,
        },
        {
            tabKey: "the-experience",
            badgeText: "THE EXPERIENCE",
            titleEn: "Experiential & Activation",
            titleId: "Aktivasi & Pengalaman",
            descEn: "Interactive consumer encounters transforming brand perception in real-time.",
            descId: "Interaksi langsung yang mengubah persepsi brand konsumen secara nyata.",
            imageUrl: "/assets/media/eco-the-experience.webp",
            order: 5,
        },
    ];
    for (const l of layers) {
        await prisma.connectionLayer.create({ data: l });
    }

    console.log("Landing Page MVP seeding completed successfully!");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

