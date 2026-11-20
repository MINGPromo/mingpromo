"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Save, FileText, ExternalLink, Eye, FolderOpen } from "lucide-react";
import { createPost, updatePost, deletePost } from "@/app/actions/posts";
import { MediaPickerModal } from "@/components/dashboard/media-picker-modal";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

interface Post {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string | null;
    coverImage: string | null;
    published: boolean;
    createdAt: Date;
    author: {
        id: string;
        name: string | null;
    };
}

interface User {
    id: string;
    name: string | null;
    email: string;
}

export function PostManager({ initialPosts, authors }: { initialPosts: Post[], authors: User[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Post | null>(null);
    const [loading, setLoading] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);

    // Simplistic author selection: default to first author if available
    const defaultAuthorId = authors.length > 0 ? authors[0].id : "";

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        coverImage: "",
        authorId: defaultAuthorId,
    });

    // Auto-generate slug from title
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        setFormData(prev => ({ ...prev, title, slug: editingItem ? prev.slug : slug }));
    };

    const openCreateModal = () => {
        setEditingItem(null);
        setFormData({
            title: "",
            slug: "",
            content: "",
            excerpt: "",
            coverImage: "",
            authorId: defaultAuthorId
        });
        setIsModalOpen(true);
    };

    const openEditModal = (item: Post) => {
        setEditingItem(item);
        setFormData({
            title: item.title,
            slug: item.slug,
            content: item.content,
            excerpt: item.excerpt || "",
            coverImage: item.coverImage || "",
            authorId: item.author?.id || defaultAuthorId,
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append("title", formData.title);
        data.append("slug", formData.slug);
        data.append("content", formData.content);
        data.append("excerpt", formData.excerpt);
        data.append("coverImage", formData.coverImage);
        data.append("authorId", formData.authorId);

        try {
            if (editingItem) {
                await updatePost(editingItem.id, data);
            } else {
                await createPost(data);
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to save", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this post?")) {
            await deletePost(id);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Blog Posts</h1>
                    <p className="text-gray-400">Manage news and updates for the company blog.</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="flex items-center gap-2 bg-brand text-black px-4 py-2.5 rounded-xl font-medium hover:bg-white transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    New Post
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {initialPosts.map((post) => (
                    <div key={post.id} className="bg-zinc-900 border border-white/10 rounded-2xl p-6 group hover:border-brand/30 transition-colors flex items-center justify-between">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center text-brand flex-shrink-0">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">{post.title}</h3>
                                <div className="flex items-center gap-3 text-sm text-gray-400">
                                    <span className="font-mono bg-white/5 px-2 py-0.5 rounded text-xs">{post.slug}</span>
                                    <span>•</span>
                                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                    <span>•</span>
                                    <span>By {post.author?.name || "Admin"}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {/* Future: View Link */}
                            {/* <Link href={`/blog/${post.slug}`} target="_blank" className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                                <ExternalLink className="w-4 h-4" />
                            </Link> */}

                            <button
                                onClick={() => openEditModal(post)}
                                className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                            >
                                <Pencil className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleDelete(post.id)}
                                className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}

                {initialPosts.length === 0 && (
                    <div className="text-center py-12 text-gray-500 bg-zinc-900/50 rounded-2xl border border-white/5 border-dashed">
                        No posts found. Create your first blog post!
                    </div>
                )}
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
                        >
                            <form onSubmit={handleSubmit} className="flex flex-col h-full min-h-0">
                                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-zinc-900 flex-shrink-0">
                                    <h2 className="text-xl font-bold text-white">
                                        {editingItem ? "Edit Post" : "Create New Post"}
                                    </h2>
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="p-6 space-y-4 overflow-y-auto flex-1 min-h-0">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.title}
                                            onChange={handleTitleChange}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand/50"
                                            placeholder="Enter post title"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Slug</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.slug}
                                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand/50 font-mono text-sm"
                                        />
                                    </div>

                                    {/* Simple Author Select for now */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Author</label>
                                        <select
                                            value={formData.authorId}
                                            onChange={(e) => setFormData({ ...formData, authorId: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand/50"
                                        >
                                            {authors.map(author => (
                                                <option key={author.id} value={author.id}>{author.name} ({author.email})</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Excerpt</label>
                                        <textarea
                                            rows={2}
                                            value={formData.excerpt}
                                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand/50"
                                            placeholder="Short summary..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Cover Image URL</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={formData.coverImage}
                                                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand/50 font-mono text-sm"
                                                placeholder="https://example.com/image.jpg or /uploads/..."
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setIsMediaPickerOpen(true)}
                                                className="px-3 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-gray-200 border border-white/10 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap"
                                            >
                                                <FolderOpen className="w-4 h-4 text-brand" />
                                                Media Library
                                            </button>
                                        </div>
                                    </div>

                                    {/* Content Editor with Preview */}
                                    <div className="flex-1 flex flex-col min-h-[300px]">
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="block text-sm font-medium text-gray-400">Content</label>
                                            <div className="flex bg-black/50 rounded-lg p-1 border border-white/10">
                                                <button
                                                    type="button"
                                                    onClick={() => setPreviewMode(false)}
                                                    className={`px-3 py-1.5 rounded text-xs font-medium flex items-center gap-2 transition-colors ${!previewMode ? "bg-brand text-black" : "text-gray-400 hover:text-white"}`}
                                                >
                                                    <Pencil className="w-3 h-3" /> Write
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setPreviewMode(true)}
                                                    className={`px-3 py-1.5 rounded text-xs font-medium flex items-center gap-2 transition-colors ${previewMode ? "bg-brand text-black" : "text-gray-400 hover:text-white"}`}
                                                >
                                                    <Eye className="w-3 h-3" /> Preview
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex-1 relative">
                                            {!previewMode ? (
                                                <textarea
                                                    required
                                                    value={formData.content}
                                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                                    className="w-full h-full min-h-[300px] bg-black/50 border border-white/10 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-brand/50 font-mono resize-none leading-relaxed"
                                                    placeholder="# Title&#10;&#10;Write your article here... You can use Markdown!&#10;- **Bold** text&#10;- *Italic* text&#10;- ![Image Alt](https://link-to-image.com)"
                                                />
                                            ) : (
                                                <div className="w-full h-full min-h-[300px] bg-black/20 border border-white/10 rounded-lg px-6 py-6 overflow-y-auto prose prose-invert prose-sm max-w-none">
                                                    {formData.content ? (
                                                        <ReactMarkdown>{formData.content}</ReactMarkdown>
                                                    ) : (
                                                        <p className="text-gray-500 italic">Nothing to preview yet...</p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        {!previewMode && (
                                            <p className="text-xs text-gray-500 mt-2">
                                                Supports Markdown. Use <code>![Alt](url)</code> for images.
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="p-6 pt-4 flex justify-end gap-3 border-t border-white/10 bg-zinc-900 flex-shrink-0">
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
                                        {loading ? "Saving..." : <><Save className="w-4 h-4" /> Save Post</>}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Media Picker Modal */}
            <MediaPickerModal
                isOpen={isMediaPickerOpen}
                onClose={() => setIsMediaPickerOpen(false)}
                onSelect={(url) => setFormData((prev) => ({ ...prev, coverImage: url }))}
                title="Choose Cover Image"
            />
        </div>
    );
}
