"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Monitor, Truck, Tv, Smartphone, Layers, Radio, Save, AlertCircle } from "lucide-react";
import { createService, updateService, deleteService } from "@/app/actions/services";

// Icon mapping for display and selection
const AVAILABLE_ICONS = [
    { name: "Truck", icon: Truck },
    { name: "Monitor", icon: Monitor },
    { name: "Tv", icon: Tv },
    { name: "Smartphone", icon: Smartphone },
    { name: "Layers", icon: Layers },
    { name: "Radio", icon: Radio },
];

const IconMap: { [key: string]: any } = {
    Truck, Monitor, Tv, Smartphone, Layers, Radio
};

interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    videoId: string | null;
}

export function ServiceManager({ initialServices }: { initialServices: Service[] }) {
    const [services, setServices] = useState(initialServices);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        icon: "Monitor",
        videoId: "",
    });

    const openCreateModal = () => {
        setEditingService(null);
        setFormData({ title: "", description: "", icon: "Monitor", videoId: "" });
        setIsModalOpen(true);
    };

    const openEditModal = (service: Service) => {
        setEditingService(service);
        setFormData({
            title: service.title,
            description: service.description,
            icon: service.icon,
            videoId: service.videoId || "",
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("icon", formData.icon);
        data.append("videoId", formData.videoId);

        try {
            if (editingService) {
                await updateService(editingService.id, data);
            } else {
                await createService(data);
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to save service", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this service?")) {
            await deleteService(id);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Services Management</h1>
                    <p className="text-gray-400">Add, edit, or remove services displayed on the landing page.</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="flex items-center gap-2 bg-brand text-black px-4 py-2.5 rounded-xl font-medium hover:bg-white transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add New Service
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {initialServices.map((service) => {
                    const Icon = IconMap[service.icon] || Monitor;
                    return (
                        <div key={service.id} className="bg-zinc-900 border border-white/10 rounded-2xl p-6 group hover:border-brand/30 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-white/5 rounded-lg text-brand">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => openEditModal(service)}
                                        className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(service.id)}
                                        className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                            <p className="text-gray-400 text-sm line-clamp-2 mb-4">{service.description}</p>
                            {service.videoId && (
                                <div className="text-xs text-gray-500 font-mono bg-black/30 px-2 py-1 rounded inline-block">
                                    YT: {service.videoId}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
                        >
                            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-zinc-900">
                                <h2 className="text-xl font-bold text-white">
                                    {editingService ? "Edit Service" : "Add New Service"}
                                </h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Service Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand/50"
                                        placeholder="e.g., Videotron"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand/50"
                                        placeholder="Brief description of the service..."
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Icon</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {AVAILABLE_ICONS.map((item) => (
                                                <button
                                                    type="button"
                                                    key={item.name}
                                                    onClick={() => setFormData({ ...formData, icon: item.name })}
                                                    className={`p-2 rounded-lg flex items-center justify-center border transition-all ${formData.icon === item.name
                                                            ? "bg-brand/20 border-brand text-brand"
                                                            : "bg-black/30 border-white/5 text-gray-400 hover:border-white/20"
                                                        }`}
                                                    title={item.name}
                                                >
                                                    <item.icon className="w-5 h-5" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Video ID (YouTube)</label>
                                        <input
                                            type="text"
                                            value={formData.videoId}
                                            onChange={(e) => setFormData({ ...formData, videoId: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand/50"
                                            placeholder="e.g., dQw4w9WgXcQ"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Optional. The ID from the YouTube URL.</p>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-6 py-2.5 bg-brand text-black rounded-lg text-sm font-bold hover:bg-white transition-colors flex items-center gap-2 disabled:opacity-50"
                                    >
                                        {loading ? "Saving..." : <><Save className="w-4 h-4" /> Save Service</>}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
