"use client";

import { Bell, Search, User } from "lucide-react";

export function Header() {
    return (
        <header className="h-16 bg-zinc-900/50 backdrop-blur-md border-b border-white/10 fixed top-0 right-0 left-64 z-30 flex items-center justify-between px-6">
            <div className="flex items-center flex-1 max-w-xl">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search campaigns, devices..."
                        className="w-full bg-zinc-900 border border-white/10 text-sm rounded-full pl-10 pr-4 py-2 text-white focus:outline-none focus:border-brand/50"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand rounded-full border border-zinc-900" />
                </button>
                <div className="h-8 w-px bg-white/10" />
                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <div className="text-sm font-medium text-white">Admin User</div>
                        <div className="text-xs text-gray-500">Super Admin</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-gray-400">
                        <User className="w-5 h-5" />
                    </div>
                </div>
            </div>
        </header>
    );
}
