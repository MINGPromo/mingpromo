import { prisma } from "@/lib/db";
import { ServiceManager } from "@/components/dashboard/service-manager";

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
    const services = await prisma.service.findMany({
        orderBy: { order: 'asc' }
    });

    return <ServiceManager initialServices={services} />;
}
