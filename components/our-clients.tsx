"use client";

import { motion } from "framer-motion";

import Image from "next/image";

interface Client {
    name: string;
    logoUrl: string; // Changed from 'logo' to match schema 'logoUrl' but wait, schema has logoUrl. Let's align.
}

export function OurClients({ clients }: { clients: Client[] }) {
    return (
        <section className="py-20 bg-zinc-950 border-t border-white/5 relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-3xl font-bold text-white relative z-10"
                    >
                        Trusted by <span className="text-brand">Industry Leaders</span>
                    </motion.h2>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative w-full aspect-[2/1] md:aspect-[3/1] bg-white rounded-2xl overflow-hidden"
                >
                    <Image
                        src="/logoclientnewrevisi1.png"
                        alt="Industry Leaders"
                        fill
                        className="object-contain p-4"
                        unoptimized
                    />
                </motion.div>
            </div>
        </section>
    );
}
