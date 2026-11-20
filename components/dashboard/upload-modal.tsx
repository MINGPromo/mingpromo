"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Upload, Loader2, Image as ImageIcon } from "lucide-react";

interface UploadModalProps {
    isOpen: boolean;
    file: File | null;
    onClose: () => void;
    onConfirm: (file: File, customName: string) => Promise<void>;
}

function formatBytes(bytes: number) {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(1) + " " + sizes[i];
}

export function UploadModal({ isOpen, file, onClose, onConfirm }: UploadModalProps) {
    const [fileName, setFileName] = useState("");
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (file) {
            // Get original name without extension
            const base = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
            setFileName(base);

            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);

            return () => {
                URL.revokeObjectURL(objectUrl);
            };
        } else {
            setFileName("");
            setPreviewUrl(null);
            setError(null);
        }
    }, [file]);

    if (!isOpen || !file) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!fileName.trim()) {
            setError("Nama file tidak boleh kosong");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            await onConfirm(file, fileName.trim());
            onClose();
        } catch (err: any) {
            setError(err.message || "Gagal mengupload file");
        } finally {
            setIsSubmitting(false);
        }
    };

    const isSvgOrGif = file.type === "image/svg+xml" || file.type === "image/gif";
    const targetExt = isSvgOrGif ? file.name.split(".").pop() : "webp";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-white">Beri Nama File Media</h2>
                        <p className="text-xs text-gray-400 mt-0.5">
                            Atur nama file sebelum disimpan dan dikompres.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="text-gray-400 hover:text-white transition-colors p-1"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Image Preview */}
                    <div className="flex items-center gap-4 bg-zinc-950 p-4 rounded-xl border border-white/5">
                        <div className="relative w-24 h-24 bg-black/50 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 flex items-center justify-center">
                            {previewUrl ? (
                                <Image
                                    src={previewUrl}
                                    alt="Preview"
                                    fill
                                    className="object-contain p-1"
                                    unoptimized
                                />
                            ) : (
                                <ImageIcon className="w-8 h-8 text-gray-600" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0 text-xs space-y-1">
                            <p className="text-white font-medium truncate">{file.name}</p>
                            <p className="text-gray-400">Ukuran asli: <span className="text-gray-200">{formatBytes(file.size)}</span></p>
                            <p className="text-gray-400">Tipe: <span className="text-gray-200">{file.type}</span></p>
                            {!isSvgOrGif && (
                                <span className="inline-block mt-1 px-2 py-0.5 bg-brand/10 text-brand rounded text-[11px] font-medium border border-brand/20">
                                    Otomatis dikompres ke .webp
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Input custom name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                            Nama Berkas <span className="text-brand">*</span>
                        </label>
                        <div className="flex items-center">
                            <input
                                type="text"
                                required
                                autoFocus
                                value={fileName}
                                onChange={(e) => setFileName(e.target.value)}
                                placeholder="misal: banner-promo-kemang"
                                className="flex-1 bg-black/50 border border-white/10 rounded-l-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand/50 font-mono"
                            />
                            <span className="bg-zinc-800 border border-l-0 border-white/10 rounded-r-lg px-3 py-2.5 text-xs text-gray-400 font-mono">
                                .{targetExt}
                            </span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-1.5">
                            Karakter spasi/simbol akan otomatis diubah menjadi tanda hubung (-) yang aman untuk web.
                        </p>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400">
                            {error}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-gray-300 rounded-xl text-sm font-medium transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2 bg-brand text-black rounded-xl text-sm font-bold hover:bg-white transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Mengompres & Upload...
                                </>
                            ) : (
                                <>
                                    <Upload className="w-4 h-4" />
                                    Simpan & Upload
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

