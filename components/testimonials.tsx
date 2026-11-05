"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";

interface Testimonial {
    quote: string;
    author: string;
    role: string;
    company: string;
}

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
    // Duplicate testimonials for seamless looping
    const infiniteTestimonials = [...testimonials, ...testimonials, ...testimonials];

    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand/5 blur-[100px] pointer-events-none rounded-full" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-900/10 blur-[120px] pointer-events-none rounded-full" />

            <div className="container mx-auto px-6 relative z-10 mb-16">
                <div className="text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-6"
                    >
                        Client <span className="text-brand">Testimonials</span>
                    </motion.h2>
                </div>
            </div>

            <div className="relative w-full overflow-hidden">
                {/* Gradient Masks for smooth fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 z-20 bg-gradient-to-r from-black to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 z-20 bg-gradient-to-l from-black to-transparent pointer-events-none" />

                <motion.div
                    className="flex gap-8 w-max px-6"
                    animate={{ x: "-33.33%" }}
                    transition={{
                        duration: 30,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {infiniteTestimonials.map((item, index) => (
                        <div
                            key={index}
                            className="bg-zinc-900/50 border border-white/5 p-8 rounded-2xl relative w-[350px] md:w-[450px] flex-shrink-0 hover:border-brand/30 transition-colors group"
                        >
                            <Quote className="w-10 h-10 text-zinc-800 group-hover:text-brand/20 transition-colors mb-6 absolute top-6 right-8" />

                            <p className="text-gray-300 italic mb-8 relative z-10 leading-relaxed line-clamp-4">
                                "{item.quote}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                    {item.author.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold text-sm">{item.author}</h4>
                                    <p className="text-brand text-xs">{item.role}, {item.company}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
