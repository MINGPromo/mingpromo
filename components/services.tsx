"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Monitor, Truck, Tv, Smartphone, Layers, Radio, X } from "lucide-react";

const IconMap: { [key: string]: any } = {
    Truck,
    Monitor,
    Tv,
    Smartphone,
    Layers,
    Radio
}

interface Service {
    title: string;
    description: string;
    icon: string;
    videoId: string | null;
}

export function Services({ services }: { services: Service[] }) {
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    return (
        <section id="services" className="py-24 bg-zinc-950 relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/services-bg.png"
                    alt="City Motion Blur"
                    fill
                    className="object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-zinc-950/90" />
            </div>

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-brand/5 blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4"
                    >
                        Our <span className="text-brand">Products</span>
                    </motion.h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Comprehensive OOH solutions designed to amplify your brand presence across every touchpoint.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const Icon = IconMap[service.icon] || Monitor;
                        return (
                            <motion.div
                                key={service.title}
                                layoutId={`card-${service.title}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                onClick={() => setSelectedService(service)}
                                className="group p-8 bg-zinc-900/50 border border-white/5 rounded-2xl hover:bg-zinc-900/80 hover:border-brand/40 hover:shadow-[0_0_30px_-10px_rgba(0,178,189,0.15)] transition-all duration-300 cursor-pointer"
                            >
                                <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-brand text-brand group-hover:text-black transition-colors duration-300">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-400 group-hover:text-gray-300 transition-colors line-clamp-1">
                                    {service.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <AnimatePresence>
                {selectedService && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedService(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            layoutId={`card-${selectedService.title}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-4xl overflow-hidden relative shadow-2xl flex flex-col max-h-[90vh]"
                        >
                            <button
                                onClick={() => setSelectedService(null)}
                                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-10 bg-black/50 p-2 rounded-full"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="p-6 md:p-8 overflow-y-auto">
                                <div className="mb-6">
                                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                        {selectedService.title}
                                    </h3>
                                    <p className="text-gray-300 text-lg leading-relaxed">
                                        {selectedService.description}
                                    </p>
                                </div>

                                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-white/5 shadow-[0_0_50px_-20px_rgba(0,178,189,0.3)]">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={`https://www.youtube.com/embed/${selectedService.videoId}?autoplay=1`}
                                        title={selectedService.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="absolute inset-0"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
