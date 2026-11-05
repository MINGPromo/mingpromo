"use client";

import { motion } from "framer-motion";
import { Search, Filter, Plus, MoreHorizontal } from "lucide-react";

export default function CampaignsPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Campaigns</h1>
                    <p className="text-gray-400">Manage and monitor all active advertising campaigns.</p>
                </div>
                <button className="px-5 py-2.5 bg-brand text-black font-semibold rounded-lg hover:bg-brand/90 transition-colors flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" />
                    New Campaign
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search campaigns..."
                        className="w-full bg-zinc-900 border border-white/10 text-sm rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-brand/50"
                    />
                </div>
                <button className="px-4 py-2.5 bg-zinc-900 border border-white/10 text-gray-300 font-medium rounded-lg hover:bg-zinc-800 transition-colors flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filter
                </button>
            </div>

            {/* Campaign List */}
            <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="px-6 py-4 font-semibold text-gray-400">Campaign Name</th>
                                <th className="px-6 py-4 font-semibold text-gray-400">Status</th>
                                <th className="px-6 py-4 font-semibold text-gray-400">Duration</th>
                                <th className="px-6 py-4 font-semibold text-gray-400">Impressions</th>
                                <th className="px-6 py-4 font-semibold text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <tr key={item} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-white">Summer Sale 2026</div>
                                        <div className="text-xs text-gray-500">Coca-Cola</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                            Active
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">Feb 01 - Mar 01, 2026</td>
                                    <td className="px-6 py-4 text-gray-300">1.2M</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
