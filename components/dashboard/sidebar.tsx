"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Settings, Layers, Star, Users, LogOut, FileText, UserCog, Image as ImageIcon, Home, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/app/actions/auth";

const menuItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Landing Page", href: "/dashboard/landing", icon: Home },
    { name: "Solution Pages", href: "/dashboard/solutions", icon: Compass },
    { name: "Media Library", href: "/dashboard/media", icon: ImageIcon },
    { name: "Services", href: "/dashboard/services", icon: Layers },
    { name: "Testimonials", href: "/dashboard/testimonials", icon: Star },
    { name: "Clients", href: "/dashboard/clients", icon: Users },
    { name: "Blog", href: "/dashboard/blog", icon: FileText },
    { name: "Users", href: "/dashboard/users", icon: UserCog },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-zinc-900 border-r border-white/10 h-screen fixed left-0 top-0 flex flex-col z-40">
            <div className="p-6 h-16 flex items-center border-b border-white/10">
                <Link href="/dashboard" className="relative h-8 w-32">
                    <Image
                        src="/logo-white.png"
                        alt="MING Admin"
                        fill
                        className="object-contain object-left"
                        priority
                    />
                </Link>
            </div>

            <div className="flex-1 py-6 flex flex-col gap-1 px-3">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-brand/10 text-brand"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "text-brand" : "text-gray-500 group-hover:text-white")} />
                            {item.name}
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t border-white/10">
                <button
                    onClick={() => logout()}
                    className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
                >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
