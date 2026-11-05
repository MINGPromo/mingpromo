import { prisma } from "@/lib/db";
import { SettingsManager } from "@/components/dashboard/settings-manager";

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
    const settings = await prisma.setting.findMany();

    return <SettingsManager initialSettings={settings} />;
}
