import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { requireDashboardUser } from "@/lib/dashboard-auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    try {
        await requireDashboardUser();
    } catch {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-brand selection:text-black">
            <Sidebar />
            <Header />
            <main className="pl-64 pt-16 min-h-screen">
                <div className="container mx-auto p-8 max-w-7xl">
                    {children}
                </div>
            </main>
        </div>
    );
}
