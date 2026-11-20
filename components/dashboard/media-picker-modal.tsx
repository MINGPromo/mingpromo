"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, Upload, Check, Search, Loader2, Image as ImageIcon } from "lucide-react";
import { getMediaFiles, uploadImage, type MediaFile } from "@/app/actions/upload";
import { UploadModal } from "@/components/dashboard/upload-modal";

interface MediaPickerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (url: string) => void;
    title?: string;
}

export function MediaPickerModal({
    isOpen,
    onClose,
    onSelect,
    title = "Select Media",
}: MediaPickerModalProps) {
    const [files, setFiles] = useState<MediaFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

    // Custom naming modal state
    const [pendingFile, setPendingFile] = useState<File | null>(null);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            loadFiles();
        }
    }, [isOpen]);

    const loadFiles = async () => {
        setLoading(true);
        try {
            const data = await getMediaFiles();
            setFiles(data);
        } catch (err) {
            console.error("Failed to load media files", err);
        } finally {
            setLoading(false);
        }
    };

    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (!fileList || fileList.length === 0) return;

        setPendingFile(fileList[0]);
        setIsUploadModalOpen(true);

        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleConfirmUpload = async (file: File, customName: string) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("customName", customName);

        const newUrl = await uploadImage(formData);

        const newFile: MediaFile = {
            name: newUrl.replace("/uploads/", ""),
            url: newUrl,
            size: file.size,
            createdAt: new Date().toISOString(),
        };

        setFiles((prev) => [newFile, ...prev]);
        setSelectedUrl(newUrl);
    };

    const handleConfirm = () => {
        if (selectedUrl) {
            onSelect(selectedUrl);
            onClose();
        }
    };

    if (!isOpen) return null;

    const filtered = files.filter((f) =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="p-5 border-b border-white/10 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-white">{title}</h2>
                        <p className="text-xs text-gray-400">Select an existing image or upload a new one.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Toolbar */}
                <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row gap-3 items-center justify-between bg-zinc-950/40">
                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search images..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-zinc-900 border border-white/10 text-xs rounded-lg pl-9 pr-3 py-2 text-white focus:outline-none focus:border-brand/50"
                        />
                    </div>

                    <div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelected}
                            accept="image/*"
                            className="hidden"
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full sm:w-auto px-4 py-2 bg-brand/10 text-brand border border-brand/20 rounded-lg text-xs font-medium hover:bg-brand/20 transition-colors flex items-center justify-center gap-2"
                        >
                            <Upload className="w-4 h-4" />
                            Upload Image
                        </button>
                    </div>
                </div>

                {/* Body / Grid */}
                <div className="flex-1 overflow-y-auto p-5 custom-scrollbar min-h-[300px]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-64 gap-2 text-gray-400">
                            <Loader2 className="w-6 h-6 animate-spin text-brand" />
                            <span className="text-xs">Loading media library...</span>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <ImageIcon className="w-10 h-10 text-gray-600 mb-2" />
                            <p className="text-sm text-gray-400">No images found</p>
                            <p className="text-xs text-gray-500 mt-1">Upload a photo to get started</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                            {filtered.map((file) => {
                                const isSelected = selectedUrl === file.url;
                                return (
                                    <div
                                        key={file.name}
                                        onClick={() => setSelectedUrl(file.url)}
                                        className={`group relative bg-zinc-950 border rounded-xl overflow-hidden cursor-pointer transition-all ${
                                            isSelected
                                                ? "border-brand ring-2 ring-brand/30"
                                                : "border-white/10 hover:border-white/20"
                                        }`}
                                    >
                                        <div className="aspect-square relative flex items-center justify-center p-1 bg-zinc-900/60">
                                            <Image
                                                src={file.url}
                                                alt={file.name}
                                                fill
                                                className="object-contain p-1"
                                                unoptimized
                                            />
                                            {isSelected && (
                                                <div className="absolute top-1.5 right-1.5 p-1 bg-brand text-black rounded-full">
                                                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-2 border-t border-white/5 bg-zinc-900/90">
                                            <p className="text-[11px] text-gray-200 truncate">{file.name}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-white/10 bg-zinc-900 flex items-center justify-between">
                    <div className="text-xs text-gray-400 truncate max-w-sm">
                        {selectedUrl ? (
                            <span>
                                Selected: <span className="text-white font-mono">{selectedUrl}</span>
                            </span>
                        ) : (
                            <span>No image selected</span>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-zinc-800 text-gray-300 rounded-lg text-xs font-medium hover:bg-zinc-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleConfirm}
                            disabled={!selectedUrl}
                            className="px-4 py-2 bg-brand text-black rounded-lg text-xs font-semibold hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Use Selected Image
                        </button>
                    </div>
                </div>
            </div>

            {/* Sub-modal: Naming & Confirm Modal */}
            <UploadModal
                isOpen={isUploadModalOpen}
                file={pendingFile}
                onClose={() => {
                    setIsUploadModalOpen(false);
                    setPendingFile(null);
                }}
                onConfirm={handleConfirmUpload}
            />
        </div>
    );
}

