"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { 
    Upload, 
    Trash2, 
    Copy, 
    Check, 
    Search, 
    ExternalLink, 
    HardDrive, 
    FileImage, 
    CheckCircle2 
} from "lucide-react";
import { uploadImage, deleteMediaFile, type MediaFile } from "@/app/actions/upload";
import { UploadModal } from "@/components/dashboard/upload-modal";

function formatBytes(bytes: number, decimals = 1) {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

function formatDate(isoString: string) {
    const d = new Date(isoString);
    return d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

/**
 * Format nama tampilan agar rapi tanpa timestamp di depan
 * Contoh: "1731143892-banner-promo.webp" -> "banner-promo.webp"
 */
function getDisplayFileName(rawName: string) {
    return rawName.replace(/^\d+-/, "");
}

export function MediaManager({ initialFiles }: { initialFiles: MediaFile[] }) {
    const [files, setFiles] = useState<MediaFile[]>(initialFiles);
    const [searchQuery, setSearchQuery] = useState("");
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Modal state for naming file
    const [pendingFile, setPendingFile] = useState<File | null>(null);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const filteredFiles = files.filter(f => 
        f.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalSize = files.reduce((acc, f) => acc + f.size, 0);

    const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (!fileList || fileList.length === 0) return;

        // Open modal for naming
        setPendingFile(fileList[0]);
        setIsUploadModalOpen(true);
        setUploadError(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleConfirmUpload = async (file: File, customName: string) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("customName", customName);

        const newUrl = await uploadImage(formData);
        const fileName = newUrl.replace("/uploads/", "");
        const newMediaFile: MediaFile = {
            name: fileName,
            url: newUrl,
            size: file.size,
            createdAt: new Date().toISOString(),
        };

        setFiles(prev => [newMediaFile, ...prev]);
        setSelectedFile(newMediaFile);
    };

    const handleCopy = (url: string) => {
        const fullUrl = `${window.location.origin}${url}`;
        navigator.clipboard.writeText(fullUrl);
        setCopiedUrl(url);
        setTimeout(() => setCopiedUrl(null), 2000);
    };

    const handleDelete = async (file: MediaFile) => {
        const displayName = getDisplayFileName(file.name);
        if (!confirm(`Are you sure you want to delete "${displayName}"?`)) return;

        setIsDeleting(true);
        const res = await deleteMediaFile(file.name);
        setIsDeleting(false);

        if (res.success) {
            setFiles(prev => prev.filter(f => f.name !== file.name));
            if (selectedFile?.name === file.name) {
                setSelectedFile(null);
            }
        } else {
            alert(res.error || "Gagal menghapus file");
        }
    };

    return (
        <div className="space-y-8">
            {/* Header section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Media Library</h1>
                    <p className="text-gray-400">
                        Upload and manage all images and promotional assets.
                    </p>
                </div>
                <div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelected}
                        accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml"
                        className="hidden"
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 bg-brand text-black px-4 py-2.5 rounded-xl font-medium hover:bg-white transition-colors"
                    >
                        <Upload className="w-5 h-5" />
                        Upload Media
                    </button>
                </div>
            </div>

            {uploadError && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                    {uploadError}
                </div>
            )}

            {/* Quick Stats Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-zinc-900 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                    <div className="p-3 bg-brand/10 rounded-lg text-brand">
                        <FileImage className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">{files.length}</div>
                        <div className="text-xs text-gray-400">Total Media Files</div>
                    </div>
                </div>
                <div className="bg-zinc-900 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                        <HardDrive className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">{formatBytes(totalSize)}</div>
                        <div className="text-xs text-gray-400">Storage Used</div>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search media by filename..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-zinc-900 border border-white/10 text-sm rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-brand/50"
                    />
                </div>
            </div>

            {/* Main Content: Grid & Preview Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Media Grid */}
                <div className={`${selectedFile ? "lg:col-span-2 xl:col-span-3" : "lg:col-span-3 xl:col-span-4"}`}>
                    {filteredFiles.length === 0 ? (
                        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-12 text-center">
                            <FileImage className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                            <h3 className="text-white font-medium mb-1">No media found</h3>
                            <p className="text-sm text-gray-500 mb-6">
                                {searchQuery ? "No files match your search criteria." : "Start by uploading your first image."}
                            </p>
                            {!searchQuery && (
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="bg-brand text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-white transition-colors"
                                >
                                    Upload Now
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                            {filteredFiles.map((file) => {
                                const isSelected = selectedFile?.name === file.name;
                                const displayName = getDisplayFileName(file.name);
                                return (
                                    <div
                                        key={file.name}
                                        onClick={() => setSelectedFile(file)}
                                        className={`group relative bg-zinc-900 border rounded-xl overflow-hidden cursor-pointer transition-all ${
                                            isSelected
                                                ? "border-brand ring-2 ring-brand/20 shadow-lg shadow-brand/10"
                                                : "border-white/10 hover:border-white/20"
                                        }`}
                                    >
                                        <div className="aspect-square relative bg-zinc-950 flex items-center justify-center p-2">
                                            <Image
                                                src={file.url}
                                                alt={displayName}
                                                fill
                                                className="object-contain p-2"
                                                unoptimized
                                            />
                                            {/* Overlay Quick Action */}
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <button
                                                    type="button"
                                                    title="Copy URL"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleCopy(file.url);
                                                    }}
                                                    className="p-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                                                >
                                                    {copiedUrl === file.url ? (
                                                        <Check className="w-4 h-4 text-brand" />
                                                    ) : (
                                                        <Copy className="w-4 h-4" />
                                                    )}
                                                </button>
                                                <button
                                                    type="button"
                                                    title="Delete"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(file);
                                                    }}
                                                    className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-2.5 border-t border-white/5 bg-zinc-900/90">
                                            <p className="text-xs text-white truncate font-medium" title={displayName}>
                                                {displayName}
                                            </p>
                                            <p className="text-[10px] text-gray-400 mt-0.5">{formatBytes(file.size)}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Details / Preview Pane */}
                {selectedFile && (
                    <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 h-fit sticky top-24 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-semibold text-white">Media Details</h3>
                            <button
                                onClick={() => setSelectedFile(null)}
                                className="text-gray-400 hover:text-white text-xs"
                            >
                                Close
                            </button>
                        </div>

                        <div className="aspect-video relative bg-zinc-950 rounded-xl overflow-hidden border border-white/5 flex items-center justify-center">
                            <Image
                                src={selectedFile.url}
                                alt={selectedFile.name}
                                fill
                                className="object-contain p-2"
                                unoptimized
                            />
                        </div>

                        <div className="space-y-3 text-xs">
                            <div>
                                <span className="text-gray-400 block mb-1">File Name</span>
                                <span className="text-white font-mono break-all bg-black/40 p-2 rounded-lg block border border-white/5">
                                    {getDisplayFileName(selectedFile.name)}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <span className="text-gray-400 block mb-1">File Size</span>
                                    <span className="text-white font-medium">{formatBytes(selectedFile.size)}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400 block mb-1">Uploaded</span>
                                    <span className="text-white font-medium">{formatDate(selectedFile.createdAt)}</span>
                                </div>
                            </div>

                            <div>
                                <span className="text-gray-400 block mb-1">Direct URL</span>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        readOnly
                                        value={selectedFile.url}
                                        className="flex-1 bg-black/40 border border-white/5 rounded-lg px-2.5 py-1.5 text-xs text-gray-300 font-mono"
                                    />
                                    <button
                                        onClick={() => handleCopy(selectedFile.url)}
                                        className="px-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg flex items-center gap-1.5 transition-colors"
                                    >
                                        {copiedUrl === selectedFile.url ? (
                                            <>
                                                <CheckCircle2 className="w-3.5 h-3.5 text-brand" />
                                                <span className="text-brand">Copied</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-3.5 h-3.5" />
                                                <span>Copy</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="pt-2 border-t border-white/10 flex gap-2">
                            <a
                                href={selectedFile.url}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                            >
                                <ExternalLink className="w-3.5 h-3.5" />
                                View Full
                            </a>
                            <button
                                onClick={() => handleDelete(selectedFile)}
                                disabled={isDeleting}
                                className="flex-1 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                Delete
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Upload & Naming Modal */}
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
