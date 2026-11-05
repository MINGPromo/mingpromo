"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const expertise = [
    "3D Anamorphic Content",
    "Augmented Reality (AR) Campaigns",
    "Measurement & Data Analytics",
    "Offline to Online (O2O) Integration",
    "Creative Event Execution",
    "Interactive Digital Installations",
];

export function Expertise() {
    return (
        <section id="expertise" className="py-24 bg-black relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/expertise-bg.png"
                    alt="Tech Abstract"
                    fill
                    className="object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-black/90" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-brand font-semibold tracking-wider uppercase mb-2 block">Why Choose Us</span>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                                Beyond Standard <span className="text-brand">Advertising</span>
                            </h2>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                MING Promotion pushes the boundaries of OOH media with cutting-edge technology and creative innovation. We don't just display ads; we create immersive experiences that leave a lasting impression.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {expertise.map((item, index) => (
                                    <motion.div
                                        key={item}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center gap-3"
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-brand flex-shrink-0" />
                                        <span className="text-gray-200">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:w-1/2 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative aspect-square md:aspect-video rounded-3xl overflow-hidden bg-zinc-900 border border-white/10"
                        >
                            {/* Visual Representation of High Tech/Anamorphic */}
                            <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-purple-900/20" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-white/20 font-bold text-4xl uppercase tracking-widest text-center">
                                    Immersive<br />Technological<br />Experience
                                </span>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute top-10 left-10 w-20 h-1 border-t-2 border-l-2 border-brand rounded-tl-xl" />
                            <div className="absolute bottom-10 right-10 w-20 h-1 border-b-2 border-r-2 border-brand rounded-br-xl" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
