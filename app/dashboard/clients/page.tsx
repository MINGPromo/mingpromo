import { prisma } from "@/lib/db";
import { ClientManager } from "@/components/dashboard/client-manager";

export const dynamic = 'force-dynamic';

export default async function ClientsPage() {
    const clients = await prisma.client.findMany({
        orderBy: { order: 'asc' }
    });

    return <ClientManager initialClients={clients} />;
}
