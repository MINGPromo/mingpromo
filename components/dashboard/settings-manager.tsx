"use client";

import { useState, useRef } from "react";
import { Video, Save, Upload, X, FolderOpen } from "lucide-react";
import { updateSetting } from "@/app/actions/settings";
import { uploadImage } from "@/app/actions/upload";
import { MediaPickerModal } from "@/components/dashboard/media-picker-modal";
import Image from "next/image";

interface Setting {
    key: string;
    value: string;
    description: string | null;
}

// Inline Image Uploader Component
function ImageUploader({
    label,
    value,
    onChange,
    placeholder = "Select an image..."
}: {
    label: string,
    value: string,
    onChange: (url: string) => void,
    placeholder?: string
}) {
    const [uploading, setUploading] = useState(false);
    const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const url = await uploadImage(formData);
            onChange(url);
        } catch (error) {
            console.error("Upload failed", error);
            alert("Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
            <div className="flex items-start gap-4">
                {value && (
                    <div className="relative w-32 h-20 bg-black/50 rounded-lg overflow-hidden border border-white/10 group">
                        <Image
                            src={value}
                            alt="Preview"
                            fill
                            className="object-cover"
                        />
                        <button
                            onClick={() => onChange("")}
                            className="absolute top-1 right-1 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="w-3 h-3 text-white" />
                        </button>
                    </div>
                )}

                <div className="flex-1">
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-sm text-gray-300 disabled:opacity-50"
                        >
                            {uploading ? (
                                <span className="animate-pulse">Uploading...</span>
                            ) : (
                                <>
                                    <Upload className="w-4 h-4" />
                                    {value ? "Upload New" : "Upload Image"}
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsMediaPickerOpen(true)}
                            className="flex items-center gap-1.5 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-gray-200 border border-white/10 rounded-lg text-sm font-medium transition-colors"
                        >
                            <FolderOpen className="w-4 h-4 text-brand" />
                            Media Library
                        </button>
                    </div>

                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="mt-2 w-full bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-400 focus:outline-none focus:border-brand/50 font-mono"
                        placeholder="Image URL or choose from library..."
                    />
                </div>
            </div>

            <MediaPickerModal
                isOpen={isMediaPickerOpen}
                onClose={() => setIsMediaPickerOpen(false)}
                onSelect={(url) => onChange(url)}
                title={`Select ${label}`}
            />
        </div>
    );
}

export function SettingsManager({ initialSettings }: { initialSettings: Setting[] }) {
    const [loading, setLoading] = useState(false);

    // Helper to find value by key
    const getSetting = (key: string) => initialSettings.find(s => s.key === key)?.value || "";

    const [videoProfileId, setVideoProfileId] = useState(getSetting("videoProfileId"));
    const [videoProfileThumbnail, setVideoProfileThumbnail] = useState(getSetting("videoProfileThumbnail"));

    // Social Links
    const [socialYoutube, setSocialYoutube] = useState(getSetting("social_youtube"));
    const [socialLinkedin, setSocialLinkedin] = useState(getSetting("social_linkedin"));
    const [socialInstagram, setSocialInstagram] = useState(getSetting("social_instagram"));

    // Contact
    const [contactEmail, setContactEmail] = useState(getSetting("contact_email"));
    const [contactPhone, setContactPhone] = useState(getSetting("contact_phone"));
    const [contactAddress, setContactAddress] = useState(getSetting("contact_address"));

    // Branding
    const [footerLogo, setFooterLogo] = useState(getSetting("footer_logo"));
    const [brandDescription, setBrandDescription] = useState(getSetting("brand_description"));
    const [footerCareerUrl, setFooterCareerUrl] = useState(getSetting("footer_career_url"));
    const [footerSitemapUrl, setFooterSitemapUrl] = useState(getSetting("footer_sitemap_url"));

    // Hero
    const [heroBackground, setHeroBackground] = useState(getSetting("hero_background"));

    const handleSaveSettings = async () => {
        setLoading(true);
        try {
            await Promise.all([
                updateSetting("videoProfileId", videoProfileId),
                updateSetting("videoProfileThumbnail", videoProfileThumbnail),
                updateSetting("social_youtube", socialYoutube),
                updateSetting("social_linkedin", socialLinkedin),
                updateSetting("social_instagram", socialInstagram),
                updateSetting("contact_email", contactEmail),
                updateSetting("contact_phone", contactPhone),
                updateSetting("contact_address", contactAddress),
                updateSetting("footer_logo", footerLogo),
                updateSetting("brand_description", brandDescription),
                updateSetting("footer_career_url", footerCareerUrl),
                updateSetting("footer_sitemap_url", footerSitemapUrl),
                updateSetting("hero_background", heroBackground),
            ]);
            alert("All settings saved successfully!");
        } catch (error) {
            console.error("Failed to save", error);
            alert("Failed to save settings.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
                    <p className="text-gray-400">Configure global website settings.</p>
                </div>
                <button
                    onClick={handleSaveSettings}
                    disabled={loading}
                    className="px-6 py-2.5 bg-brand text-black rounded-lg text-sm font-bold hover:bg-white transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                    {loading ? "Saving..." : <><Save className="w-4 h-4" /> Save All Changes</>}
                </button>
            </div>

            {/* Video Profile Section */}
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-brand/10 rounded-lg text-brand">
                        <Video className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg font-bold text-white">Video Profile Configuration</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">YouTube Video ID</label>
                        <input
                            type="text"
                            value={videoProfileId}
                            onChange={(e) => setVideoProfileId(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand/50 font-mono"
                            placeholder="e.g. pnKW-lQG9IA"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                            The ID from the YouTube URL: youtube.com/watch?v=<b>ID_IS_HERE</b>
                        </p>
                    </div>
                    <div>
                        <ImageUploader
                            label="Thumbnail Cover"
                            value={videoProfileThumbnail}
                            onChange={setVideoProfileThumbnail}
                        />
                    </div>
                </div>
            </div>

            {/* Social Media Section */}
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 mb-6">
                <h2 className="text-lg font-bold text-white mb-6">Social Media Links</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">YouTube Channel URL</label>
                        <input
                            type="text"
                            value={socialYoutube}
                            onChange={(e) => setSocialYoutube(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand/50"
                            placeholder="https://youtube.com/..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">LinkedIn URL</label>
                        <input
                            type="text"
                            value={socialLinkedin}
                            onChange={(e) => setSocialLinkedin(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand/50"
                            placeholder="https://linkedin.com/in/..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Instagram URL</label>
                        <input
                            type="text"
                            value={socialInstagram}
                            onChange={(e) => setSocialInstagram(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand/50"
                            placeholder="https://instagram.com/..."
                        />
                    </div>
                </div>
            </div>

            {/* Contact Info Section */}
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 mb-6">
                <h2 className="text-lg font-bold text-white mb-6">Contact Information</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                        <input
                            type="email"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand/50"
                            placeholder="info@mingpromo.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
                        <input
                            type="text"
                            value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand/50"
                            placeholder="+62 8..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Office Address</label>
                        <textarea
                            value={contactAddress}
                            onChange={(e) => setContactAddress(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand/50 min-h-[80px]"
                            placeholder="Jakarta, Indonesia..."
                        />
                    </div>
                </div>
            </div>

            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 mb-6">
                <h2 className="text-lg font-bold text-white mb-2">Footer Links</h2>
                <p className="mb-6 text-sm text-gray-400">Link kosong tidak akan ditampilkan di website publik.</p>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Career URL</label>
                        <input type="text" value={footerCareerUrl} onChange={(e) => setFooterCareerUrl(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand/50" placeholder="https://... atau /career" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Sitemap URL</label>
                        <input type="text" value={footerSitemapUrl} onChange={(e) => setFooterSitemapUrl(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand/50" placeholder="https://... atau /sitemap" />
                    </div>
                </div>
            </div>

            {/* Branding Section */}
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 mb-6">
                <h2 className="text-lg font-bold text-white mb-6">Branding & Visuals</h2>
                <div className="space-y-4">
                    <div>
                        <ImageUploader
                            label="Footer/Brand Logo"
                            value={footerLogo}
                            onChange={setFooterLogo}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Brand Description (Footer)</label>
                        <textarea
                            value={brandDescription}
                            onChange={(e) => setBrandDescription(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand/50 min-h-[80px]"
                            placeholder="Established in 1999..."
                        />
                    </div>
                    <div>
                        <ImageUploader
                            label="Hero Background Image"
                            value={heroBackground}
                            onChange={setHeroBackground}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
