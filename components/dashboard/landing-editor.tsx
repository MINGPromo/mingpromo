"use client";

import { useState, useRef } from "react";
import {
    Save,
    ExternalLink,
    CheckCircle2,
    AlertCircle,
    Plus,
    Trash2,
    Upload,
    Sparkles,
    BarChart3,
    ScrollText,
    Layers,
    Loader2,
} from "lucide-react";
import {
    updateLandingHero,
    updateSiteMetrics,
    updateMarqueeTickers,
    updateConnectionLayers,
} from "@/app/actions/landing";
import { uploadImage } from "@/app/actions/upload";

interface LandingHeroProps {
    id: string;
    tagline: string;
    heroImage: string;
    headlineEn: string;
    headlineId: string;
    leadEn: string;
    leadId: string;
}

interface SiteMetricProps {
    id?: string;
    targetNumber: number;
    suffix: string;
    formatComma: boolean;
    highlightEn: string;
    labelEn: string;
    highlightId: string;
    labelId: string;
    order: number;
}

interface MarqueeTickerProps {
    id?: string;
    productType: string;
    locationName: string;
    impressions: string;
    order: number;
    isActive: boolean;
}

interface ConnectionLayerProps {
    id?: string;
    tabKey: string;
    badgeText: string;
    titleEn: string;
    titleId: string;
    descEn: string;
    descId: string;
    imageUrl: string;
    order: number;
}

interface LandingEditorProps {
    initialHero: LandingHeroProps | null;
    initialMetrics: SiteMetricProps[];
    initialTickers: MarqueeTickerProps[];
    initialLayers: ConnectionLayerProps[];
}

export function LandingEditor({
    initialHero,
    initialMetrics,
    initialTickers,
    initialLayers,
}: LandingEditorProps) {
    const [activeTab, setActiveTab] = useState<"hero" | "metrics" | "tickers" | "layers">("hero");

    // Form States
    const [hero, setHero] = useState<LandingHeroProps>(
        initialHero || {
            id: "default",
            tagline: "INSIDE OUT OF HOME",
            heroImage: "/assets/media/aset-3d-hero.webp",
            headlineEn: "Connecting Brands with Audiences Since 1999.",
            headlineId: "Menghubungkan Brand dengan Audiens Sejak 1999.",
            leadEn: "The consumer journey is never confined to a single location. MING is here to bridge every touchpoint, ensuring your brand remains relevant, visible, and connected every step of the way.",
            leadId: "Perjalanan konsumen tidak pernah terbatas di satu lokasi. MING hadir menjembatani setiap titik temu, memastikan brand Anda tetap relevan, terlihat, dan terhubung di setiap langkah.",
        }
    );

    const [metrics, setMetrics] = useState<SiteMetricProps[]>(
        initialMetrics.length > 0
            ? initialMetrics
            : [
                  { targetNumber: 25, suffix: "+", formatComma: false, highlightEn: "OOH", labelEn: "Years of OOH experience", highlightId: "OOH", labelId: "Tahun pengalaman OOH", order: 0 },
                  { targetNumber: 50, suffix: "M", formatComma: false, highlightEn: "Impressions", labelEn: "Monthly Impressions", highlightId: "Impresi", labelId: "Impresi Bulanan", order: 1 },
                  { targetNumber: 12000, suffix: "+", formatComma: true, highlightEn: "Nationwide", labelEn: "OOH spots Nationwide", highlightId: "Nasional", labelId: "Titik OOH Nasional", order: 2 },
                  { targetNumber: 250, suffix: "+", formatComma: false, highlightEn: "across Indonesia", labelEn: "Mall media across Indonesia", highlightId: "di Indonesia", labelId: "Mall di seluruh Indonesia", order: 3 },
              ]
    );

    const [tickers, setTickers] = useState<MarqueeTickerProps[]>(
        initialTickers.length > 0
            ? initialTickers
            : [
                  { productType: "LED Screen", locationName: "23 Paskal, Bandung", impressions: "1,107,250 impressions/mo", order: 0, isActive: true },
                  { productType: "Digital Totem", locationName: "Kuningan City Mall", impressions: "2,870,139 impressions/mo", order: 1, isActive: true },
              ]
    );

    const [layers, setLayers] = useState<ConnectionLayerProps[]>(
        initialLayers.length > 0
            ? initialLayers
            : [
                  { tabKey: "the-brain", badgeText: "THE BRAIN", titleEn: "OOH Measurement", titleId: "Pengukuran OOH", descEn: "Measure and optimize your campaigns with verified audience data.", descId: "Ukur dan optimalkan kampanye Anda dengan data audiens terverifikasi.", imageUrl: "/assets/media/eco-the-brain.webp", order: 0 },
                  { tabKey: "the-movement", badgeText: "THE MOVEMENT", titleEn: "Mobile Ads", titleId: "Iklan Bergerak", descEn: "Dynamic mobile media taking your brand directly to prime audience paths.", descId: "Media bergerak dinamis yang membawa brand Anda langsung ke jalur audiens utama.", imageUrl: "/assets/media/eco-the-movement.webp", order: 1 },
                  { tabKey: "the-inside", badgeText: "THE INSIDE", titleEn: "Premium Mall Inventory", titleId: "Inventory Mall Premium", descEn: "High-impact visual dominance within Indonesia's premier shopping destinations.", descId: "Dominasi visual berdampak tinggi di pusat perbelanjaan terkemuka Indonesia.", imageUrl: "/assets/media/eco-the-inside.webp", order: 2 },
                  { tabKey: "the-roadside", badgeText: "THE ROADSIDE", titleEn: "Roadside OOH & DOOH", titleId: "Roadside OOH & DOOH", descEn: "Unmissable city-scale presence across key thoroughfares and urban arteries.", descId: "Visibilitas skala kota yang tak terlewatkan di koridor arteri tersibuk.", imageUrl: "/assets/media/eco-the-roadside.webp", order: 3 },
                  { tabKey: "the-experience", badgeText: "THE EXPERIENCE", titleEn: "Experiential & Activation", titleId: "Aktivasi & Pengalaman Brand", descEn: "Bespoke brand activations transforming physical spaces into unforgettable moments.", descId: "Interaksi langsung yang mengubah persepsi brand konsumen secara nyata.", imageUrl: "/assets/media/eco-the-experience.webp", order: 4 },
              ]
    );

    const [saving, setSaving] = useState(false);
    const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
    const [uploadingHeroImage, setUploadingHeroImage] = useState(false);

    const handleSaveAll = async (openSite = false) => {
        setSaving(true);
        setFeedback(null);

        try {
            // 1. Update Hero
            const resHero = await updateLandingHero({
                tagline: hero.tagline,
                heroImage: hero.heroImage,
                headlineEn: hero.headlineEn,
                headlineId: hero.headlineId,
                leadEn: hero.leadEn,
                leadId: hero.leadId,
            });

            if (!resHero.success) throw new Error(resHero.error || "Gagal menyimpan Hero");

            // 2. Update Metrics
            const resMetrics = await updateSiteMetrics(metrics);
            if (!resMetrics.success) throw new Error("Gagal menyimpan angka metrik");

            // 3. Update Tickers
            const resTickers = await updateMarqueeTickers(tickers);
            if (!resTickers.success) throw new Error("Gagal menyimpan running ticker");

            // 4. Update Layers
            const resLayers = await updateConnectionLayers(layers);
            if (!resLayers.success) throw new Error("Gagal menyimpan connection layers");

            setFeedback({
                type: "success",
                message: "Semua perubahan berhasil disimpan dan website publik telah diperbarui!",
            });

            if (openSite) {
                window.open("/", "_blank");
            }
        } catch (err: any) {
            setFeedback({
                type: "error",
                message: err.message || "Terjadi kesalahan saat menyimpan data.",
            });
        } finally {
            setSaving(false);
        }
    };

    // Metric Helpers
    const updateMetricItem = (index: number, field: keyof SiteMetricProps, val: any) => {
        const next = [...metrics];
        next[index] = { ...next[index], [field]: val };
        setMetrics(next);
    };

    // Ticker Helpers
    const addTickerRow = () => {
        setTickers([
            ...tickers,
            {
                productType: "New Format",
                locationName: "New Location",
                impressions: "1,000,000 impressions/mo",
                order: tickers.length,
                isActive: true,
            },
        ]);
    };

    const updateTickerItem = (index: number, field: keyof MarqueeTickerProps, val: any) => {
        const next = [...tickers];
        next[index] = { ...next[index], [field]: val };
        setTickers(next);
    };

    const removeTickerRow = (index: number) => {
        setTickers(tickers.filter((_, i) => i !== index));
    };

    // Layer Helpers
    const updateLayerItem = (index: number, field: keyof ConnectionLayerProps, val: any) => {
        const next = [...layers];
        next[index] = { ...next[index], [field]: val };
        setLayers(next);
    };

    const handleLayerImageUpload = async (index: number, file: File) => {
        if (!file) return;
        setUploadingIndex(index);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const url = await uploadImage(formData);
            updateLayerItem(index, "imageUrl", url);
        } catch (e) {
            alert("Gagal mengupload gambar. Pastikan format JPG, PNG, atau WebP.");
        } finally {
            setUploadingIndex(null);
        }
    };

    const handleHeroImageUpload = async (file: File) => {
        if (!file) return;
        setUploadingHeroImage(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("customName", "landing-hero-visual");

        try {
            const url = await uploadImage(formData);
            setHero((current) => ({ ...current, heroImage: url }));
        } catch (error) {
            setFeedback({
                type: "error",
                message: error instanceof Error ? error.message : "Gagal mengunggah gambar hero.",
            });
        } finally {
            setUploadingHeroImage(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Top Bar Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-900 border border-white/10 p-6 rounded-2xl shadow-xl">
                <div>
                    <div className="flex items-center gap-2 text-brand text-xs font-semibold uppercase tracking-wider mb-1">
                        <Sparkles className="w-4 h-4" />
                        <span>CMS Marketing Editor (No-Code)</span>
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Editor Landing Page</h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Ubah teks, angka pencapaian, dan gambar pilar landing page dengan mudah. Semua foto otomatis dikompres ke WebP.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => handleSaveAll(true)}
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white font-medium text-sm rounded-xl border border-white/15 transition-all shadow-sm active:scale-95 disabled:opacity-50"
                    >
                        <ExternalLink className="w-4 h-4" />
                        <span>Simpan &amp; Buka Web ↗</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => handleSaveAll(false)}
                        disabled={saving}
                        className="flex items-center gap-2 px-5 py-2.5 bg-brand hover:bg-brand/90 text-black font-semibold text-sm rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Menyimpan...</span>
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                <span>Simpan Perubahan</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Notification Alert */}
            {feedback && (
                <div
                    className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium border ${
                        feedback.type === "success"
                            ? "bg-emerald-950/60 text-emerald-300 border-emerald-800/60"
                            : "bg-red-950/60 text-red-300 border-red-800/60"
                    }`}
                >
                    {feedback.type === "success" ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : (
                        <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                    )}
                    <span>{feedback.message}</span>
                </div>
            )}

            {/* Tabs Navigation */}
            <div className="flex border-b border-white/10 gap-2 overflow-x-auto pb-1">
                {[
                    { key: "hero", label: "Tab 1: Hero & Tagline", icon: Sparkles },
                    { key: "metrics", label: "Tab 2: 4 Angka Metrik", icon: BarChart3 },
                    { key: "tickers", label: "Tab 3: Running Ticker", icon: ScrollText },
                    { key: "layers", label: "Tab 4: Five Connection Layers", icon: Layers },
                ].map((tab) => {
                    const isActive = activeTab === tab.key;
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => setActiveTab(tab.key as any)}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                                isActive
                                    ? "border-brand text-brand bg-brand/5 rounded-t-lg"
                                    : "border-transparent text-gray-400 hover:text-white hover:bg-white/5 rounded-t-lg"
                            }`}
                        >
                            <Icon className="w-4 h-4" />
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Tab 1: Hero & Tagline */}
            {activeTab === "hero" && (
                <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 space-y-6">
                    <div>
                        <h2 className="text-lg font-semibold text-white">Konten Teks Hero Utama</h2>
                        <p className="text-xs text-gray-400 mt-0.5">
                            Bagian pembuka di layar pertama website. Isi kolom Bahasa Indonesia dan Bahasa Inggris berdampingan.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="rounded-xl border border-white/10 bg-black/30 p-4 space-y-3">
                            <div>
                                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                                    Visual 3D Hero
                                </label>
                                <p className="text-xs text-gray-500">
                                    Gambar ini tampil di sisi kanan hero landing page dengan komposisi visual yang ada.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start gap-4">
                                <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white">
                                    <img src={hero.heroImage} alt="Preview visual 3D hero" className="h-full w-full object-contain" />
                                </div>
                                <div className="w-full space-y-2">
                                    <input
                                        type="text"
                                        value={hero.heroImage}
                                        onChange={(e) => setHero({ ...hero, heroImage: e.target.value })}
                                        placeholder="/uploads/landing-hero-visual.webp atau URL gambar"
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white text-xs font-mono focus:border-brand focus:outline-none"
                                    />
                                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs font-medium text-white transition-all hover:bg-white/15">
                                        <Upload className="h-3.5 w-3.5" />
                                        <span>{uploadingHeroImage ? "Mengunggah..." : "Upload Visual Hero"}</span>
                                        <input
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                                            className="hidden"
                                            disabled={uploadingHeroImage}
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) handleHeroImageUpload(file);
                                            }}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                                Display Typography
                            </label>
                            <input
                                type="text"
                                value={hero.tagline || ""}
                                onChange={(e) => setHero({ ...hero, tagline: e.target.value })}
                                placeholder="INSIDE OUT OF HOME"
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-brand focus:outline-none"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Default: <strong>INSIDE OUT OF HOME</strong>
                            </p>
                        </div>

                        {/* Side by side Headline */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-brand uppercase tracking-wider mb-1.5">
                                    Judul Utama (Bahasa Indonesia)
                                </label>
                                <textarea
                                    rows={2}
                                    value={hero.headlineId || ""}
                                    onChange={(e) => setHero({ ...hero, headlineId: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-brand focus:outline-none"
                                    placeholder="Menghubungkan Brand dengan Audiens Sejak 1999."
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1.5">
                                    Headline (English)
                                </label>
                                <textarea
                                    rows={2}
                                    value={hero.headlineEn || ""}
                                    onChange={(e) => setHero({ ...hero, headlineEn: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-brand focus:outline-none"
                                    placeholder="Connecting Brands with Audiences Since 1999."
                                />
                            </div>
                        </div>

                        {/* Side by side Lead Description */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-brand uppercase tracking-wider mb-1.5">
                                    Deskripsi Ringkas (Bahasa Indonesia)
                                </label>
                                <textarea
                                    rows={4}
                                    value={hero.leadId || ""}
                                    onChange={(e) => setHero({ ...hero, leadId: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-brand focus:outline-none leading-relaxed"
                                    placeholder="Perjalanan konsumen tidak pernah terbatas di satu lokasi..."
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1.5">
                                    Lead Description (English)
                                </label>
                                <textarea
                                    rows={4}
                                    value={hero.leadEn || ""}
                                    onChange={(e) => setHero({ ...hero, leadEn: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-brand focus:outline-none leading-relaxed"
                                    placeholder="The consumer journey is never confined to a single location..."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Tab 2: 4 Angka Metrik */}
            {activeTab === "metrics" && (
                <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 space-y-6">
                    <div>
                        <h2 className="text-lg font-semibold text-white">4 Angka Statistik Pencapaian</h2>
                        <p className="text-xs text-gray-400 mt-0.5">
                            Angka-angka ini akan beranimasi menghitung naik saat pengunjung membuka halaman hero.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {metrics.map((m, idx) => (
                            <div key={idx} className="bg-black/40 border border-white/10 rounded-xl p-5 space-y-4">
                                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                    <span className="text-xs font-bold text-brand uppercase">
                                        Kolom Metrik #{idx + 1}
                                    </span>
                                    <span className="text-lg font-mono font-bold text-white">
                                        {m.targetNumber.toLocaleString()}
                                        {m.suffix}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1">Target Angka</label>
                                        <input
                                            type="number"
                                            value={m.targetNumber}
                                            onChange={(e) => updateMetricItem(idx, "targetNumber", Number(e.target.value))}
                                            className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-brand focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1">Akhiran Simbol (+ / M)</label>
                                        <input
                                            type="text"
                                            value={m.suffix || ""}
                                            onChange={(e) => updateMetricItem(idx, "suffix", e.target.value)}
                                            className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-brand focus:outline-none"
                                            placeholder="+, M, dll"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id={`comma-${idx}`}
                                        checked={m.formatComma}
                                        onChange={(e) => updateMetricItem(idx, "formatComma", e.target.checked)}
                                        className="rounded border-white/20 text-brand focus:ring-0"
                                    />
                                    <label htmlFor={`comma-${idx}`} className="text-xs text-gray-300">
                                        Gunakan format koma pemisah ribuan (contoh: 12,000+)
                                    </label>
                                </div>

                                <div className="grid grid-cols-2 gap-3 pt-1">
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1">Kata Tebal (EN)</label>
                                        <input
                                            type="text"
                                            value={m.highlightEn || ""}
                                            onChange={(e) => updateMetricItem(idx, "highlightEn", e.target.value)}
                                            className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-brand focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1">Kata Tebal (ID)</label>
                                        <input
                                            type="text"
                                            value={m.highlightId || ""}
                                            onChange={(e) => updateMetricItem(idx, "highlightId", e.target.value)}
                                            className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-brand focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1">Label Lengkap (EN)</label>
                                        <input
                                            type="text"
                                            value={m.labelEn || ""}
                                            onChange={(e) => updateMetricItem(idx, "labelEn", e.target.value)}
                                            className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-brand focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1">Label Lengkap (ID)</label>
                                        <input
                                            type="text"
                                            value={m.labelId || ""}
                                            onChange={(e) => updateMetricItem(idx, "labelId", e.target.value)}
                                            className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-brand focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tab 3: Running Ticker */}
            {activeTab === "tickers" && (
                <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-semibold text-white">Running Ticker Pita Bawah</h2>
                            <p className="text-xs text-gray-400 mt-0.5">
                                Teks berjalan tanpa henti di bawah hero yang menampilkan inventaris dan impresi live.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={addTickerRow}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-brand/10 hover:bg-brand/20 text-brand text-xs font-semibold rounded-lg border border-brand/30 transition-all self-start sm:self-auto"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Tambah Item</span>
                        </button>
                    </div>

                    <div className="space-y-3">
                        {tickers.map((t, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col md:flex-row items-start md:items-center gap-3 bg-black/40 border border-white/10 rounded-xl p-3"
                            >
                                <span className="text-xs font-mono text-gray-500 w-6 shrink-0">#{idx + 1}</span>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1 w-full">
                                    <input
                                        type="text"
                                        value={t.productType}
                                        onChange={(e) => updateTickerItem(idx, "productType", e.target.value)}
                                        placeholder="Tipe Produk (cth: LED Screen)"
                                        className="bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:border-brand focus:outline-none"
                                    />
                                    <input
                                        type="text"
                                        value={t.locationName}
                                        onChange={(e) => updateTickerItem(idx, "locationName", e.target.value)}
                                        placeholder="Nama Lokasi (cth: Kuningan City)"
                                        className="bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:border-brand focus:outline-none"
                                    />
                                    <input
                                        type="text"
                                        value={t.impressions}
                                        onChange={(e) => updateTickerItem(idx, "impressions", e.target.value)}
                                        placeholder="Impresi (cth: 2,870,139 impressions/mo)"
                                        className="bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:border-brand focus:outline-none"
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={() => removeTickerRow(idx)}
                                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all self-end md:self-auto"
                                    title="Hapus Baris"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tab 4: Five Connection Layers */}
            {activeTab === "layers" && (
                <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 space-y-6">
                    <div>
                        <h2 className="text-lg font-semibold text-white">Five Connection Layers (Section 2)</h2>
                        <p className="text-xs text-gray-400 mt-0.5">
                            Kelola 5 pilar ekosistem MING, teks penjelasan, dan gambar latar belakang interaktif.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {layers.map((l, idx) => (
                            <div key={idx} className="bg-black/40 border border-white/10 rounded-xl p-5 space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-mono px-2 py-0.5 bg-brand/10 text-brand rounded">
                                            Pilar #{idx + 1}
                                        </span>
                                        <span className="font-bold text-white text-sm">{l.badgeText}</span>
                                    </div>
                                    <span className="text-xs text-gray-500 font-mono">key: {l.tabKey}</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-300 mb-1">
                                            Judul Pilar (ID)
                                        </label>
                                        <input
                                            type="text"
                                            value={l.titleId || ""}
                                            onChange={(e) => updateLayerItem(idx, "titleId", e.target.value)}
                                            className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-brand focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-300 mb-1">
                                            Title (EN)
                                        </label>
                                        <input
                                            type="text"
                                            value={l.titleEn || ""}
                                            onChange={(e) => updateLayerItem(idx, "titleEn", e.target.value)}
                                            className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-brand focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-300 mb-1">
                                            Deskripsi (ID)
                                        </label>
                                        <textarea
                                            rows={2}
                                            value={l.descId || ""}
                                            onChange={(e) => updateLayerItem(idx, "descId", e.target.value)}
                                            className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 text-white text-sm focus:border-brand focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-300 mb-1">
                                            Description (EN)
                                        </label>
                                        <textarea
                                            rows={2}
                                            value={l.descEn || ""}
                                            onChange={(e) => updateLayerItem(idx, "descEn", e.target.value)}
                                            className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 text-white text-sm focus:border-brand focus:outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Image Preview & Upload */}
                                <div className="pt-2 border-t border-white/5">
                                    <label className="block text-xs font-medium text-gray-300 mb-2">
                                        Foto Latar Belakang Pilar
                                    </label>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                        {l.imageUrl && (
                                            <div className="relative w-40 h-24 rounded-lg overflow-hidden border border-white/10 bg-black shrink-0">
                                                <img
                                                    src={l.imageUrl}
                                                    alt={l.badgeText}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}

                                        <div className="space-y-2 flex-1 w-full">
                                            <input
                                                type="text"
                                                value={l.imageUrl}
                                                onChange={(e) => updateLayerItem(idx, "imageUrl", e.target.value)}
                                                placeholder="/assets/media/eco-...webp atau URL gambar"
                                                className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-white text-xs font-mono focus:border-brand focus:outline-none"
                                            />

                                            <div className="flex items-center gap-2">
                                                <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white text-xs font-medium rounded-lg border border-white/15 transition-all">
                                                    <Upload className="w-3.5 h-3.5" />
                                                    <span>
                                                        {uploadingIndex === idx ? "Mengompres..." : "Upload Foto Baru"}
                                                    </span>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        disabled={uploadingIndex === idx}
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) handleLayerImageUpload(idx, file);
                                                        }}
                                                    />
                                                </label>
                                                <span className="text-[11px] text-gray-500">
                                                    (Otomatis dikonversi ke WebP tajam &amp; ringan)
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

