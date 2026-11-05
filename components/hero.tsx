"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero({ backgroundImage }: { backgroundImage?: string }) {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={backgroundImage || "/images/hero-bg.png"}
                    alt="Future City Night"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
            </div>

            {/* Background Gradient/Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand/30 via-transparent to-transparent opacity-60 z-0" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />

            {/* Floating Elements Animation */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand/40 rounded-full blur-[100px]"
            />
            <motion.div
                animate={{
                    y: [0, 20, 0],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand/20 rounded-full blur-[120px]"
            />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider text-brand border border-brand/50 rounded-full bg-brand/10 backdrop-blur-sm uppercase shadow-[0_0_15px_-3px_rgba(0,178,189,0.3)]">
                        Leading OOH Media Solutions
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
                        Dominate the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-cyan-300 drop-shadow-[0_0_10px_rgba(0,178,189,0.3)]">Urban Landscape</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-10 leading-relaxed">
                        Maximize your audience reach with MING Promotion's innovative Videotron, Mobile LED, and creative campaign executions across Indonesia.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <button className="group px-8 py-4 bg-brand text-black font-bold rounded-full hover:bg-cyan-400 transition-all transform hover:scale-105 flex items-center gap-2 shadow-[0_0_20px_-5px_rgba(0,178,189,0.5)]">
                            Explore Our Services
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition-all backdrop-blur-sm">
                            Contact Sales
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
                <div className="w-px h-12 bg-gradient-to-b from-brand to-transparent" />
            </motion.div>
        </section>
    );
}
