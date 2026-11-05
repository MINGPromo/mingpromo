import { prisma } from "@/lib/db";
import { TestimonialManager } from "@/components/dashboard/testimonial-manager";

export const dynamic = 'force-dynamic';

export default async function TestimonialsPage() {
    const testimonials = await prisma.testimonial.findMany({
        orderBy: { order: 'asc' } // or createdAt desc
    });

    return <TestimonialManager initialTestimonials={testimonials} />;
}
