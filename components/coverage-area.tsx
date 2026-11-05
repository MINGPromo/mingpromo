"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const locations = [
    { city: "Jakarta", count: "50+" },
    { city: "Surabaya", count: "25+" },
    { city: "Bandung", count: "20+" },
    { city: "Medan", count: "15+" },
    { city: "Bali", count: "10+" },
    { city: "Makassar", count: "10+" },
];

export function CoverageArea() {
    return (
        <section className="py-24 bg-zinc-950 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-6"
                    >
                        Nationwide <span className="text-brand">Coverage</span>
                    </motion.h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Our network spans across major cities in Indonesia, ensuring your brand reaches its audience wherever they are.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Placeholder Map Visualization */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative aspect-[4/3] bg-zinc-900/50 rounded-3xl border border-white/5 p-8 flex items-center justify-center overflow-hidden"
                    >
                        {/* Abstract Map Graphic */}
                        <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Indonesia_provinces_blank_map.svg/2560px-Indonesia_provinces_blank_map.svg.png')] bg-contain bg-center bg-no-repeat" />

                        {/* Animated Dots for Cities */}
                        <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-brand rounded-full animate-ping" />
                        <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-brand rounded-full relative z-10" />

                        <div className="absolute top-[60%] left-[45%] w-3 h-3 bg-brand rounded-full animate-ping delay-100" />
                        <div className="absolute top-[60%] left-[45%] w-3 h-3 bg-brand rounded-full relative z-10" />

                        <div className="absolute top-[65%] right-[20%] w-3 h-3 bg-brand rounded-full animate-ping delay-300" />
                        <div className="absolute top-[65%] right-[20%] w-3 h-3 bg-brand rounded-full relative z-10" />

                        <div className="relative z-20 text-center">
                            <span className="text-4xl md:text-6xl font-bold text-white block mb-2">200+</span>
                            <span className="text-brand uppercase tracking-widest font-medium">Strategic Locations</span>
                        </div>
                    </motion.div>

                    {/* Location List */}
                    <div className="grid grid-cols-2 gap-4">
                        {locations.map((loc, index) => (
                            <motion.div
                                key={loc.city}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-zinc-900 border border-white/5 p-6 rounded-2xl flex items-center gap-4 hover:border-brand/30 transition-colors"
                            >
                                <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                                    <MapPin className="w-5 h-5 text-brand" />
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold text-lg">{loc.city}</h4>
                                    <p className="text-sm text-gray-400">{loc.count} Spots</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
