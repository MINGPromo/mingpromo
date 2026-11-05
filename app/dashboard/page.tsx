"use client";

import { motion } from "framer-motion";
import { Activity, Users, Monitor, TrendingUp, AlertCircle } from "lucide-react";

const stats = [
    {
        name: "Active Campaigns",
        value: "12",
        change: "+2.5%",
        icon: Activity,
        color: "text-brand",
    },
    {
        name: "Total Reach",
        value: "2.4M",
        change: "+12%",
        icon: Users,
        color: "text-blue-400",
    },
    {
        name: "Devices Online",
        value: "48/50",
        change: "-2",
        icon: Monitor,
        color: "text-green-400",
    },
    {
        name: "Impressions Today",
        value: "145K",
        change: "+8%",
        icon: TrendingUp,
        color: "text-purple-400",
    },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
                <p className="text-gray-400">Welcome back, here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 bg-zinc-900 border border-white/10 rounded-2xl hover:border-brand/30 transition-colors"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg bg-white/5 ${stat.color}`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <span className={stat.change.startsWith("+") ? "text-green-500 text-xs font-medium" : "text-red-500 text-xs font-medium"}>
                                {stat.change}
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-sm text-gray-400">{stat.name}</div>
                    </motion.div>
                ))}
            </div>

            {/* Device Status & Map Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-zinc-900 border border-white/10 rounded-2xl p-6 h-[400px] flex flex-col">
                    <h3 className="text-lg font-semibold text-white mb-6">Live Device Map</h3>
                    <div className="flex-1 bg-zinc-800/50 rounded-xl relative overflow-hidden group">
                        {/* Simulated Map */}
                        <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-medium bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Jakarta_Location_Map.svg/1200px-Jakarta_Location_Map.svg.png')] bg-cover bg-center grayscale opacity-20">
                        </div>

                        {/* Simulated Pins */}
                        <div className="absolute top-1/4 left-1/4 p-1.5 bg-brand rounded-full animate-pulse shadow-[0_0_20px_rgba(0,178,189,0.5)]"></div>
                        <div className="absolute top-1/2 left-1/3 p-1.5 bg-green-500 rounded-full animate-pulse"></div>
                        <div className="absolute bottom-1/3 right-1/4 p-1.5 bg-brand rounded-full animate-pulse"></div>
                    </div>
                </div>

                <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 h-[400px] flex flex-col">
                    <h3 className="text-lg font-semibold text-white mb-6">System Alerts</h3>
                    <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex gap-3 p-3 bg-white/5 rounded-lg border border-white/5 box-border">
                                <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <div className="text-sm font-medium text-white mb-1">High Temperature Warning</div>
                                    <div className="text-xs text-gray-500">Videotron Jl. Sudirman - Unit 2</div>
                                    <div className="text-[10px] text-gray-600 mt-2">Just now</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
