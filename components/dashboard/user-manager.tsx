"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Save, User as UserIcon } from "lucide-react";
import { createUser, updateUser, deleteUser } from "@/app/actions/users";

interface User {
    id: string;
    email: string;
    name: string | null;
    createdAt: Date;
}

export function UserManager({ initialUsers, currentUserEmail }: { initialUsers: User[], currentUserEmail?: string }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: "",
    });

    const openCreateModal = () => {
        setEditingItem(null);
        setFormData({ email: "", name: "", password: "" });
        setIsModalOpen(true);
    };

    const openEditModal = (item: User) => {
        setEditingItem(item);
        setFormData({
            email: item.email,
            name: item.name || "",
            password: "", // Don't show existing password
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append("email", formData.email);
        data.append("name", formData.name);
        if (formData.password) {
            data.append("password", formData.password);
        }

        try {
            if (editingItem) {
                await updateUser(editingItem.id, data);
            } else {
                if (!formData.password) {
                    alert("Password is required for new users");
                    setLoading(false);
                    return;
                }
                await createUser(data);
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to save", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        const userToDelete = initialUsers.find(u => u.id === id);
        if (userToDelete?.email === currentUserEmail) {
            alert("You cannot delete your own account.");
            return;
        }

        if (confirm("Are you sure you want to delete this user?")) {
            await deleteUser(id);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
                    <p className="text-gray-400">Manage admin access to the dashboard.</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="flex items-center gap-2 bg-brand text-black px-4 py-2.5 rounded-xl font-medium hover:bg-white transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add User
                </button>
            </div>

            <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/10 text-gray-400 text-sm uppercas">
                        <tr>
                            <th className="p-6 font-medium">User</th>
                            <th className="p-6 font-medium">Email</th>
                            <th className="p-6 font-medium">Created At</th>
                            <th className="p-6 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {initialUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                                <td className="p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                                            <UserIcon className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium text-white">{user.name || "Unnamed"}</span>
                                    </div>
                                </td>
                                <td className="p-6 text-gray-300">{user.email}</td>
                                <td className="p-6 text-gray-500 text-sm">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="p-6 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => openEditModal(user)}
                                            className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                                            title="Edit"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            disabled={user.email === currentUserEmail}
                                            className={`p-2 rounded-lg transition-colors ${user.email === currentUserEmail
                                                    ? "text-gray-600 cursor-not-allowed"
                                                    : "hover:bg-red-500/10 text-gray-400 hover:text-red-400"
                                                }`}
                                            title={user.email === currentUserEmail ? "You cannot delete yourself" : "Delete"}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
                                        {editingItem ? "Edit User" : "Add New User"}
                                    </h2>
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="p-6 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand/50"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand/50"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">
                                            {editingItem ? "New Password (leave blank to keep current)" : "Password"}
                                        </label>
                                        <input
                                            type="password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                                        {loading ? "Saving..." : <><Save className="w-4 h-4" /> Save User</>}
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
