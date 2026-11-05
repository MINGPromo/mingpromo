"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Save, Quote } from "lucide-react";
import { createTestimonial, updateTestimonial, deleteTestimonial } from "@/app/actions/testimonials";

interface Testimonial {
    id: string;
    quote: string;
    author: string;
    role: string;
    company: string;
}

export function TestimonialManager({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        quote: "",
        author: "",
        role: "",
        company: "",
    });

    const openCreateModal = () => {
        setEditingItem(null);
        setFormData({ quote: "", author: "", role: "", company: "" });
        setIsModalOpen(true);
    };

    const openEditModal = (item: Testimonial) => {
        setEditingItem(item);
        setFormData({
            quote: item.quote,
            author: item.author,
            role: item.role,
            company: item.company,
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append("quote", formData.quote);
        data.append("author", formData.author);
        data.append("role", formData.role);
        data.append("company", formData.company);

        try {
            if (editingItem) {
                await updateTestimonial(editingItem.id, data);
            } else {
                await createTestimonial(data);
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to save", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this testimonial?")) {
            await deleteTestimonial(id);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Testimonials</h1>
                    <p className="text-gray-400">Manage what your clients say about you.</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="flex items-center gap-2 bg-brand text-black px-4 py-2.5 rounded-xl font-medium hover:bg-white transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add New
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {initialTestimonials.map((item) => (
                    <div key={item.id} className="bg-zinc-900 border border-white/10 rounded-2xl p-6 group hover:border-brand/30 transition-colors relative">
                        <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5" />

                        <div className="mb-6 relative z-10">
                            <p className="text-gray-300 italic mb-4 line-clamp-4">"{item.quote}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold text-sm">
                                    {item.author.charAt(0)}
                                </div>
                                <div>
                                    <div className="text-white font-medium text-sm">{item.author}</div>
                                    <div className="text-xs text-gray-500">{item.role}, {item.company}</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 border-t border-white/5 pt-4">
                            <button
                                onClick={() => openEditModal(item)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                            >
                                <Pencil className="w-3.5 h-3.5" /> Edit
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                            >
                                <Trash2 className="w-3.5 h-3.5" /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal - Reusing structure from ServiceManager, could componentize if desired but keeping separate for speed */}
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
                                        {editingItem ? "Edit Testimonial" : "Add New Testimonial"}
                                    </h2>
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="p-6 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Quote</label>
                                        <textarea
                                            required
                                            rows={4}
                                            value={formData.quote}
                                            onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand/50"
                                            placeholder="What did the client say?"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Author Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.author}
                                                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand/50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Role / Job Title</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.role}
                                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand/50"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Company</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand/50"
                                        />
                                    </div>
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
                                        {loading ? "Saving..." : <><Save className="w-4 h-4" /> Save Testimonial</>}
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
