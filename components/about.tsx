"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function About() {
    return (
        <section id="about" className="py-24 bg-zinc-950 border-t border-white/5 relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/about-bg.png"
                    alt="Global Network"
                    fill
                    className="object-cover opacity-10"
                />
                <div className="absolute inset-0 bg-zinc-950/80" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-brand font-semibold tracking-wider uppercase mb-4 block"
                    >
                        Who We Are
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold text-white mb-8"
                    >
                        Pioneering OOH Innovation Since 1999
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-400 leading-relaxed mb-10"
                    >
                        <strong className="text-white">PT Mitra Inovasi Gemilang</strong>, operating as <strong className="text-brand">MING Promotion</strong>, is a premier Indonesian advertising company specializing in Out-of-Home (OOH) media solutions.
                        With over two decades of experience, we connect brands with audiences through high-impact visual experiences, from massive Videotron displays to targeted Mobile LED campaigns.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
                    >
                        <div className="p-4 bg-zinc-900/50 rounded-xl border border-brand/20 backdrop-blur-sm">
                            <div className="text-3xl font-bold text-brand mb-1">25+</div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider">Years Experience</div>
                        </div>
                        <div className="p-4 bg-zinc-900/50 rounded-xl border border-brand/20 backdrop-blur-sm">
                            <div className="text-3xl font-bold text-brand mb-1">100+</div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider">Locations</div>
                        </div>
                        <div className="p-4 bg-zinc-900/50 rounded-xl border border-brand/20 backdrop-blur-sm">
                            <div className="text-3xl font-bold text-brand mb-1">500+</div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider">Campaigns</div>
                        </div>
                        <div className="p-4 bg-zinc-900/50 rounded-xl border border-brand/20 backdrop-blur-sm">
                            <div className="text-3xl font-bold text-brand mb-1">24/7</div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider">Support</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
