"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Save, Image as ImageIcon } from "lucide-react";
import { createClient, updateClient, deleteClient } from "@/app/actions/clients";
import Image from "next/image";

interface Client {
    id: string;
    name: string;
    logoUrl: string;
}

export function ClientManager({ initialClients }: { initialClients: Client[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Client | null>(null);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        logoUrl: "",
    });

    const openCreateModal = () => {
        setEditingItem(null);
        setFormData({ name: "", logoUrl: "https://placehold.co/200x80/202020/FFFFFF?text=LOGO" });
        setIsModalOpen(true);
    };

    const openEditModal = (item: Client) => {
        setEditingItem(item);
        setFormData({
            name: item.name,
            logoUrl: item.logoUrl,
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append("name", formData.name);
        data.append("logoUrl", formData.logoUrl);

        try {
            if (editingItem) {
                await updateClient(editingItem.id, data);
            } else {
                await createClient(data);
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to save", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this client?")) {
            await deleteClient(id);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Client Logos</h1>
                    <p className="text-gray-400">Manage the trusted partners display.</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="flex items-center gap-2 bg-brand text-black px-4 py-2.5 rounded-xl font-medium hover:bg-white transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Client
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {initialClients.map((item) => (
                    <div key={item.id} className="bg-zinc-900 border border-white/10 rounded-2xl p-4 group hover:border-brand/30 transition-colors flex flex-col items-center text-center">
                        <div className="w-full aspect-[3/2] bg-white/5 rounded-xl mb-4 relative overflow-hidden flex items-center justify-center p-4">
                            <div className="relative w-full h-full grayscale group-hover:grayscale-0 transition-all opacity-70 group-hover:opacity-100">
                                <Image
                                    src={item.logoUrl}
                                    alt={item.name}
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            </div>
                        </div>

                        <h3 className="text-white font-medium text-sm mb-3 truncate w-full px-2">{item.name}</h3>

                        <div className="flex gap-2 w-full">
                            <button
                                onClick={() => openEditModal(item)}
                                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                            >
                                <Pencil className="w-3.5 h-3.5" /> Edit
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                ))}
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
                            <form onSubmit={handleSubmit}>
                                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-zinc-900">
                                    <h2 className="text-xl font-bold text-white">
                                        {editingItem ? "Edit Client" : "Add New Client"}
                                    </h2>
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="p-6 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Company Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand/50"
                                            placeholder="e.g. Tokopedia"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Logo URL</label>
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.logoUrl}
                                                    onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                                                    className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-brand/50 font-mono text-sm"
                                                    placeholder="https://..."
                                                />
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">
                                            Paste a direct image URL. You can use services like imgur or placehold.co.
                                        </p>
                                    </div>

                                    {/* Logo Preview */}
                                    {formData.logoUrl && (
                                        <div className="bg-white/5 rounded-lg p-4 flex flex-col items-center">
                                            <span className="text-xs text-gray-500 mb-2">Preview</span>
                                            <div className="relative w-32 h-16">
                                                <Image
                                                    src={formData.logoUrl}
                                                    alt="Preview"
                                                    fill
                                                    className="object-contain"
                                                    unoptimized
                                                    onError={(e) => {
                                                        // Fallback logic could go here, but purely visual for now
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-6 pt-0 flex justify-end gap-3">
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
                                        {loading ? "Saving..." : <><Save className="w-4 h-4" /> Save Client</>}
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
