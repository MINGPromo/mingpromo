"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function VideoProfile({ videoId = "pnKW-lQG9IA", thumbnail }: { videoId?: string; thumbnail?: string }) {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl max-h-[800px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-6"
                    >
                        We Are <span className="text-brand">MING Promotion</span>
                    </motion.h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Our commitment is to continue growing and innovate a new buzz as well as a pioneer of creative advertising media companies in Indonesia.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative w-full aspect-video max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_-10px_rgba(0,178,189,0.2)] bg-zinc-900 group cursor-pointer"
                    onClick={() => setIsPlaying(true)}
                >
                    {!isPlaying ? (
                        <>
                            {/* Thumbnail / Cover */}
                            <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
                                <Image
                                    src={thumbnail || "/video-cover.png"}
                                    alt="Video Profile Cover"
                                    fill
                                    className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

                                <div className="relative z-10 flex flex-col items-center gap-6 group-hover:scale-105 transition-transform duration-500">
                                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-brand group-hover:border-brand transition-colors duration-300">
                                        <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-1" />
                                    </div>
                                    <span className="text-white font-medium tracking-wider uppercase text-sm md:text-base">Watch Our Profile</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                            title="Company Profile"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0"
                        />
                    )}
                </motion.div>
            </div>
        </section>
    );
}
