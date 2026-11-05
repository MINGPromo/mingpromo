
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding ...')

    // Seed Services
    const services = [
        {
            title: "Mobile LED Transformer",
            description: "The Mobile LED Transformer is the only advertising service that can expand horizontally up to 9.6 meters and elevate to a height of 1.8 meters. This unique transformation creates a wider, higher, and more impactful display, ensuring your campaign captures maximum visibility and attracts audiences from every angle in any public space.",
            icon: "Truck",
            videoId: "gcuHsBJ2zaA",
            order: 1
        },
        {
            title: "Videotron",
            description: "Videotron offers interesting and informative ads. Video ads are considered more effective in increasing the target market you want to achieve.",
            icon: "Monitor",
            videoId: "ebjqse7Px-c",
            order: 2
        },
        {
            title: "Billboard",
            description: "We provide a strategic spot and location for Billboard so that it can easy to note by your targeted market. The right placement, of course, will lead to more viewers. It also provides in many sizes according to your needs.",
            icon: "Tv",
            videoId: "uOvwboKoXnM",
            order: 3
        },
        {
            title: "Mobile Showcase",
            description: "Mobile Showcase is one of MING Promotion's creative products. Display innovative branding images of a product solely and move around premium or target locations according to marketing objectives.",
            icon: "Smartphone",
            videoId: "vxaHFxHFGKs",
            order: 4
        },
        {
            title: "Mall Branding",
            description: "We can also help to realize the advertising needs inside the mall. We provide various Mall Brandings services such as Giant Videotron, Paraphet, Shop Sign, Elevator, Escalator, Standing Box, Hanging Box, and other creative brand media.",
            icon: "Layers",
            videoId: "pg7ctTHcwvA",
            order: 5
        },
        {
            title: "Adsman",
            description: "Build more engagement on the street with ADSMAN. Reach more specific areas and customize branding possibilities.",
            icon: "Radio",
            videoId: "GtoJ5_8NUyo",
            order: 6
        },
    ]

    for (const s of services) {
        await prisma.service.create({ data: s })
    }

    // Seed Testimonials
    const testimonials = [
        {
            quote: "MING Promotion helped us achieve record-breaking awareness for our product launch. Their strategic videotron placements are unmatched.",
            author: "Budi Santoso",
            role: "Marketing Director",
            company: "TechGiant Indonesia"
        },
        {
            quote: "The Mobile LED service gave us the flexibility to reach audiences in specific areas during our roadshow. Highly recommended!",
            author: "Sarah Wijaya",
            role: "Brand Manager",
            company: "Fashion Week"
        },
        {
            quote: "Professional team, excellent execution, and transparent reporting. MING is our go-to partner for OOH advertising.",
            author: "Michael Chen",
            role: "CEO",
            company: "StartUp One"
        },
        {
            quote: "Our campaign visibility increased by 300% thanks to their strategic billboard locations in Jakarta's prime areas.",
            author: "Jessica Tan",
            role: "CMO",
            company: "Beauty Glow"
        },
        {
            quote: "Innovative solutions like 3D anamorphic ads really set our brand apart from competitors. MING delivered beyond expectations.",
            author: "David Nugraha",
            role: "Creative Director",
            company: "Future Motors"
        }
    ]

    for (const t of testimonials) {
        await prisma.testimonial.create({ data: t })
    }

    // Seed Clients
    const clients = [
        { name: "Tokopedia", logoUrl: "https://placehold.co/200x80/202020/FFFFFF?text=Tokopedia" },
        { name: "Gojek", logoUrl: "https://placehold.co/200x80/202020/FFFFFF?text=Gojek" },
        { name: "Traveloka", logoUrl: "https://placehold.co/200x80/202020/FFFFFF?text=Traveloka" },
        { name: "Shopee", logoUrl: "https://placehold.co/200x80/202020/FFFFFF?text=Shopee" },
        { name: "Samsung", logoUrl: "https://placehold.co/200x80/202020/FFFFFF?text=Samsung" },
        { name: "BCA", logoUrl: "https://placehold.co/200x80/202020/FFFFFF?text=BCA" },
        { name: "Mandiri", logoUrl: "https://placehold.co/200x80/202020/FFFFFF?text=Mandiri" },
        { name: "Telkomsel", logoUrl: "https://placehold.co/200x80/202020/FFFFFF?text=Telkomsel" },
        { name: "Indosat", logoUrl: "https://placehold.co/200x80/202020/FFFFFF?text=Indosat" },
        { name: "Unilever", logoUrl: "https://placehold.co/200x80/202020/FFFFFF?text=Unilever" },
        { name: "Danone", logoUrl: "https://placehold.co/200x80/202020/FFFFFF?text=Danone" },
        { name: "Nestle", logoUrl: "https://placehold.co/200x80/202020/FFFFFF?text=Nestle" }
    ]

    for (const c of clients) {
        await prisma.client.create({ data: c })
    }

    // Seed Settings
    await prisma.setting.create({
        data: {
            key: "videoProfileId",
            value: "pnKW-lQG9IA",
            description: "YouTube Video ID for the Video Profile section"
        }
    })

    // Seed Admin User
    await prisma.user.create({
        data: {
            email: "admin@mingpromo.com",
            password: "admin", // Plain text for demo purposes, assume hashed in real app
            name: "Admin User",
        }
    })

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
