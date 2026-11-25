"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink,
  ImagePlus,
  Loader2,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import {
  createSolutionDraft,
  deleteSolutionPage,
  duplicateSolutionPage,
  saveSolutionPage,
} from "@/app/actions/solutions";
import { uploadImage } from "@/app/actions/upload";
import type {
  SolutionBenefitInput,
  SolutionFaqCategoryInput,
  SolutionFilterInput,
  SolutionPageInput,
  SolutionProductInput,
  SolutionProductGalleryInput,
  SolutionProductFeatureInput,
  SolutionProductLocationInput,
  SolutionProductCaseStudyInput,
  SolutionInsightPostInput,
} from "@/lib/solution-types";

type Tab = "general" | "hero" | "introduction" | "benefits" | "products" | "faq" | "cta";

const tabs: Array<{ key: Tab; label: string }> = [
  { key: "general", label: "General & SEO" },
  { key: "hero", label: "Hero" },
  { key: "introduction", label: "Introduction" },
  { key: "benefits", label: "Benefits" },
  { key: "products", label: "Products & Filters" },
  { key: "faq", label: "FAQ" },
  { key: "cta", label: "Final CTA" },
];

function TextField({ label, value, onChange, type = "text", hint }: { label: string; value: string | number; onChange: (value: string) => void; type?: string; hint?: string }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-gray-300">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-brand"
      />
      {hint && <span className="block text-xs text-gray-500">{hint}</span>}
    </label>
  );
}

function TextArea({ label, value, onChange, rows = 4, hint }: { label: string; value: string; onChange: (value: string) => void; rows?: number; hint?: string }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-gray-300">{label}</span>
      <textarea
        value={value}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        className="w-full resize-y rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm leading-6 text-white outline-none transition focus:border-brand"
      />
      {hint && <span className="block text-xs text-gray-500">{hint}</span>}
    </label>
  );
}

function FieldPair({
  label,
  valueEn,
  valueId,
  onChangeEn,
  onChangeId,
  multiline = false,
}: {
  label: string;
  valueEn: string;
  valueId: string;
  onChangeEn: (value: string) => void;
  onChangeId: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {multiline ? (
        <>
          <TextArea label={`${label} — EN`} value={valueEn} onChange={onChangeEn} />
          <TextArea label={`${label} — ID`} value={valueId} onChange={onChangeId} />
        </>
      ) : (
        <>
          <TextField label={`${label} — EN`} value={valueEn} onChange={onChangeEn} />
          <TextField label={`${label} — ID`} value={valueId} onChange={onChangeId} />
        </>
      )}
    </div>
  );
}

function Panel({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-xl">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {description && <p className="mt-1 text-sm text-gray-400">{description}</p>}
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function ItemActions({ index, total, onMove, onRemove }: { index: number; total: number; onMove: (from: number, to: number) => void; onRemove: () => void }) {
  return (
    <div className="flex items-center gap-1">
      <button type="button" disabled={index === 0} onClick={() => onMove(index, index - 1)} className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-30" aria-label="Move up"><ChevronUp className="h-4 w-4" /></button>
      <button type="button" disabled={index === total - 1} onClick={() => onMove(index, index + 1)} className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-30" aria-label="Move down"><ChevronDown className="h-4 w-4" /></button>
      <button type="button" onClick={onRemove} className="rounded-lg p-2 text-red-400 hover:bg-red-500/10" aria-label="Remove"><Trash2 className="h-4 w-4" /></button>
    </div>
  );
}

function moveItem<T>(items: T[], from: number, to: number) {
  if (to < 0 || to >= items.length) return items;
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

export function SolutionPageManager({ initialPages, availablePosts = [] }: { initialPages: SolutionPageInput[]; availablePosts?: SolutionInsightPostInput[] }) {
  const router = useRouter();
  const [pages, setPages] = useState(initialPages);
  const [selectedId, setSelectedId] = useState(initialPages[0]?.id ?? "");
  const [pendingSelectedId, setPendingSelectedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("general");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [deletePending, setDeletePending] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    setPages(initialPages);
    if (pendingSelectedId && initialPages.some((page) => page.id === pendingSelectedId)) {
      setSelectedId(pendingSelectedId);
      setPendingSelectedId(null);
    } else if (!initialPages.some((page) => page.id === selectedId)) {
      setSelectedId(initialPages[0]?.id ?? "");
    }
  }, [initialPages, pendingSelectedId, selectedId]);

  const selectedIndex = pages.findIndex((page) => page.id === selectedId);
  const page = pages[selectedIndex];
  const publicUrl = page ? `/solutions/${page.slug}` : "";

  const updatePage = (updater: (current: SolutionPageInput) => SolutionPageInput) => {
    if (selectedIndex < 0) return;
    setPages((current) => current.map((item, index) => (index === selectedIndex ? updater(item) : item)));
  };

  const setField = <K extends keyof SolutionPageInput>(key: K, value: SolutionPageInput[K]) => {
    updatePage((current) => ({ ...current, [key]: value }));
  };

  const uploadToField = async (key: "heroImage" | "introImage", file: File) => {
    setUploading(key);
    setNotice(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("customName", `${page.slug}-${key}`);
      const url = await uploadImage(formData);
      setField(key, url);
    } catch (error) {
      setNotice({ type: "error", message: error instanceof Error ? error.message : "Upload gagal." });
    } finally {
      setUploading(null);
    }
  };

  const uploadProductAsset = async (uploadKey: string, file: File, applyUrl: (url: string) => void) => {
    setUploading(uploadKey);
    setNotice(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("customName", `${page.slug}-${uploadKey}`);
      applyUrl(await uploadImage(formData));
    } catch (error) {
      setNotice({ type: "error", message: error instanceof Error ? error.message : "Upload gagal." });
    } finally {
      setUploading(null);
    }
  };

  const handleSave = async () => {
    if (!page) return;
    setSaving(true);
    setNotice(null);
    const result = await saveSolutionPage(page);
    setSaving(false);
    if (!result.success) {
      setNotice({ type: "error", message: result.error });
      return;
    }
    setPendingSelectedId(result.id);
    setNotice({ type: "success", message: "Solution page berhasil disimpan." });
    router.refresh();
  };

  const handleCreate = async () => {
    setSaving(true);
    const result = await createSolutionDraft();
    setSaving(false);
    if (result.success) {
      setPendingSelectedId(result.id);
      router.refresh();
    }
  };

  const handleDuplicate = async () => {
    if (!page?.id) return;
    setSaving(true);
    const result = await duplicateSolutionPage(page.id);
    setSaving(false);
    if (result.success) {
      setPendingSelectedId(result.id);
      router.refresh();
    } else {
      setNotice({ type: "error", message: result.error });
    }
  };

  const handleDelete = async () => {
    if (!page?.id) return;
    setDeletePending(true);
  };

  const confirmDelete = async () => {
    if (!page?.id) return;
    setSaving(true);
    const result = await deleteSolutionPage(page.id);
    setSaving(false);
    setDeletePending(false);
    if (result.success) router.refresh();
    else setNotice({ type: "error", message: result.error });
  };

  const availableFilterKeys = useMemo(() => page?.filters.map((filter) => filter.key).join(", ") ?? "", [page?.filters]);

  if (!page) {
    return (
      <Panel title="Solution Pages" description="Belum ada halaman solution.">
        <button type="button" onClick={handleCreate} className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-3 font-semibold text-black"><Plus className="h-4 w-4" /> Buat Solution Page</button>
      </Panel>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-zinc-900 p-6 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">CMS Solution Template</p>
          <h1 className="mt-1 text-2xl font-bold">Solution Pages</h1>
          <p className="mt-1 text-sm text-gray-400">Satu template publik untuk seluruh halaman solution MING.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={handleCreate} disabled={saving} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium hover:bg-white/10"><Plus className="h-4 w-4" /> Baru</button>
          <button type="button" onClick={handleDuplicate} disabled={saving} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium hover:bg-white/10"><Copy className="h-4 w-4" /> Duplikat</button>
          <a href={`${publicUrl}?preview=1`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium hover:bg-white/10"><ExternalLink className="h-4 w-4" /> Preview</a>
          <button type="button" onClick={handleSave} disabled={saving} className="inline-flex min-w-28 items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-black disabled:opacity-50">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Simpan</button>
        </div>
      </header>

      {notice && (
        <div className={`rounded-xl border px-4 py-3 text-sm ${notice.type === "success" ? "border-green-500/30 bg-green-500/10 text-green-300" : "border-red-500/30 bg-red-500/10 text-red-300"}`}>
          {notice.message}
        </div>
      )}

      {deletePending && (
        <div className="flex flex-col gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200 sm:flex-row sm:items-center sm:justify-between">
          <span>Hapus <strong>{page.badgeText}</strong>? Semua konten di halaman ini ikut dihapus.</span>
          <div className="flex gap-2">
            <button type="button" onClick={() => setDeletePending(false)} className="rounded-lg border border-white/15 px-3 py-2 text-xs text-gray-200 hover:bg-white/10">Batal</button>
            <button type="button" onClick={confirmDelete} disabled={saving} className="rounded-lg bg-red-500 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50">Ya, hapus</button>
          </div>
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border border-white/10 bg-zinc-900 p-3">
          <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Halaman</p>
          <div className="space-y-1">
            {pages.map((item) => (
              <button key={item.id} type="button" onClick={() => { setSelectedId(item.id ?? ""); setActiveTab("general"); setNotice(null); }} className={`w-full rounded-xl px-3 py-3 text-left transition ${item.id === selectedId ? "bg-brand/10 text-brand" : "text-gray-300 hover:bg-white/5"}`}>
                <span className="block text-sm font-semibold">{item.badgeText}</span>
                <span className="mt-1 flex items-center gap-2 text-xs text-gray-500"><span className={`h-2 w-2 rounded-full ${item.published ? "bg-green-400" : "bg-amber-400"}`} />{item.published ? "Published" : "Draft"}</span>
              </button>
            ))}
          </div>
        </aside>

        <div className="min-w-0 space-y-5">
          <nav className="flex gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-zinc-900 p-2">
            {tabs.map((tab) => (
              <button key={tab.key} type="button" onClick={() => setActiveTab(tab.key)} className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition ${activeTab === tab.key ? "bg-brand text-black" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}>{tab.label}</button>
            ))}
          </nav>

          {activeTab === "general" && (
            <Panel title="General & SEO" description="Identitas halaman, status publikasi, dan metadata mesin pencari.">
              <div className="grid gap-4 md:grid-cols-2">
                <TextField label="Badge / Nama Hierarki" value={page.badgeText} onChange={(value) => setField("badgeText", value)} />
                <TextField label="Slug" value={page.slug} onChange={(value) => setField("slug", value)} hint="Contoh: the-movement" />
              </div>
              <FieldPair label="Label Navigasi" valueEn={page.navLabelEn} valueId={page.navLabelId} onChangeEn={(value) => setField("navLabelEn", value)} onChangeId={(value) => setField("navLabelId", value)} />
              <FieldPair label="H3 Kartu Our Solution" valueEn={page.overviewHeadlineEn} valueId={page.overviewHeadlineId} onChangeEn={(value) => setField("overviewHeadlineEn", value)} onChangeId={(value) => setField("overviewHeadlineId", value)} />
              <div className="grid gap-4 md:grid-cols-2">
                <TextField label="Urutan" type="number" value={page.order} onChange={(value) => setField("order", Number(value))} />
                <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
                  <input type="checkbox" checked={page.published} onChange={(event) => setField("published", event.target.checked)} className="h-4 w-4 accent-brand" />
                  <span><span className="block text-sm font-medium text-white">Published</span><span className="text-xs text-gray-500">Draft tidak dapat dibuka pengunjung.</span></span>
                </label>
              </div>
              <label className="block space-y-2">
                <span className="text-sm font-medium text-gray-300">Layout Detail Solution</span>
                <select value={page.templateVariant ?? "standard"} onChange={(event) => setField("templateVariant", event.target.value)} className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-brand">
                  <option value="standard">Standard — hero, benefits, products</option>
                  <option value="inventory">Inventory — filter dan listing media</option>
                  <option value="showcase">Showcase — selector produk dan detail showcase</option>
                </select>
                <span className="block text-xs text-gray-500">Product tetap berada di dalam satu halaman solution. Gunakan Showcase untuk The Movement.</span>
              </label>
              <FieldPair label="SEO Title" valueEn={page.seoTitleEn} valueId={page.seoTitleId} onChangeEn={(value) => setField("seoTitleEn", value)} onChangeId={(value) => setField("seoTitleId", value)} />
              <FieldPair multiline label="SEO Description" valueEn={page.seoDescriptionEn} valueId={page.seoDescriptionId} onChangeEn={(value) => setField("seoDescriptionEn", value)} onChangeId={(value) => setField("seoDescriptionId", value)} />
              <div className="flex justify-end"><button type="button" onClick={handleDelete} className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10"><Trash2 className="h-4 w-4" /> Hapus halaman</button></div>
            </Panel>
          )}

          {activeTab === "hero" && (
            <Panel title="Hero" description="Bagian pembuka dengan background penuh dan dua CTA.">
              <FieldPair label="Judul" valueEn={page.heroTitleEn} valueId={page.heroTitleId} onChangeEn={(value) => setField("heroTitleEn", value)} onChangeId={(value) => setField("heroTitleId", value)} />
              <FieldPair multiline label="Deskripsi" valueEn={page.heroDescriptionEn} valueId={page.heroDescriptionId} onChangeEn={(value) => setField("heroDescriptionEn", value)} onChangeId={(value) => setField("heroDescriptionId", value)} />
              <TextField label="Hero Image URL" value={page.heroImage} onChange={(value) => setField("heroImage", value)} />
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm hover:bg-white/10"><ImagePlus className="h-4 w-4" />{uploading === "heroImage" ? "Mengunggah..." : "Upload Hero"}<input type="file" accept="image/*" className="hidden" onChange={(event) => event.target.files?.[0] && uploadToField("heroImage", event.target.files[0])} /></label>
              <div className="grid gap-4 md:grid-cols-2"><TextField label="Primary CTA — EN" value={page.primaryCtaLabelEn} onChange={(value) => setField("primaryCtaLabelEn", value)} /><TextField label="Primary CTA — ID" value={page.primaryCtaLabelId} onChange={(value) => setField("primaryCtaLabelId", value)} /></div>
              <TextField label="Primary CTA URL" value={page.primaryCtaHref} onChange={(value) => setField("primaryCtaHref", value)} />
              <div className="grid gap-4 md:grid-cols-2"><TextField label="Secondary CTA — EN" value={page.secondaryCtaLabelEn} onChange={(value) => setField("secondaryCtaLabelEn", value)} /><TextField label="Secondary CTA — ID" value={page.secondaryCtaLabelId} onChange={(value) => setField("secondaryCtaLabelId", value)} /></div>
              <TextField label="Secondary CTA URL" value={page.secondaryCtaHref} onChange={(value) => setField("secondaryCtaHref", value)} />
            </Panel>
          )}

          {activeTab === "introduction" && (
            <Panel title="Introduction">
              <FieldPair label="Eyebrow" valueEn={page.introEyebrowEn} valueId={page.introEyebrowId} onChangeEn={(value) => setField("introEyebrowEn", value)} onChangeId={(value) => setField("introEyebrowId", value)} />
              <FieldPair label="Judul" valueEn={page.introTitleEn} valueId={page.introTitleId} onChangeEn={(value) => setField("introTitleEn", value)} onChangeId={(value) => setField("introTitleId", value)} />
              <FieldPair multiline label="Isi" valueEn={page.introBodyEn} valueId={page.introBodyId} onChangeEn={(value) => setField("introBodyEn", value)} onChangeId={(value) => setField("introBodyId", value)} />
              <TextField label="Introduction Image URL" value={page.introImage} onChange={(value) => setField("introImage", value)} />
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm hover:bg-white/10"><ImagePlus className="h-4 w-4" />{uploading === "introImage" ? "Mengunggah..." : "Upload Introduction Image"}<input type="file" accept="image/*" className="hidden" onChange={(event) => event.target.files?.[0] && uploadToField("introImage", event.target.files[0])} /></label>
            </Panel>
          )}

          {activeTab === "benefits" && (
            <Panel title="Benefits" description="Jumlah benefit fleksibel dan urutan dapat diubah.">
              <FieldPair label="Judul Section" valueEn={page.benefitsTitleEn} valueId={page.benefitsTitleId} onChangeEn={(value) => setField("benefitsTitleEn", value)} onChangeId={(value) => setField("benefitsTitleId", value)} />
              <FieldPair multiline label="Deskripsi Section" valueEn={page.benefitsDescriptionEn} valueId={page.benefitsDescriptionId} onChangeEn={(value) => setField("benefitsDescriptionEn", value)} onChangeId={(value) => setField("benefitsDescriptionId", value)} />
              {page.benefits.map((item, index) => (
                <div key={item.id ?? `benefit-${index}`} className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <div className="mb-4 flex items-center justify-between"><h3 className="font-medium">Benefit {index + 1}</h3><ItemActions index={index} total={page.benefits.length} onMove={(from, to) => setField("benefits", moveItem(page.benefits, from, to))} onRemove={() => setField("benefits", page.benefits.filter((_, itemIndex) => itemIndex !== index))} /></div>
                  <div className="space-y-4"><FieldPair label="Judul" valueEn={item.titleEn} valueId={item.titleId} onChangeEn={(value) => setField("benefits", page.benefits.map((entry, itemIndex) => itemIndex === index ? { ...entry, titleEn: value } : entry))} onChangeId={(value) => setField("benefits", page.benefits.map((entry, itemIndex) => itemIndex === index ? { ...entry, titleId: value } : entry))} /><FieldPair multiline label="Deskripsi" valueEn={item.descriptionEn} valueId={item.descriptionId} onChangeEn={(value) => setField("benefits", page.benefits.map((entry, itemIndex) => itemIndex === index ? { ...entry, descriptionEn: value } : entry))} onChangeId={(value) => setField("benefits", page.benefits.map((entry, itemIndex) => itemIndex === index ? { ...entry, descriptionId: value } : entry))} /></div>
                </div>
              ))}
              <button type="button" onClick={() => setField("benefits", [...page.benefits, { titleEn: "New Benefit", titleId: "Benefit Baru", descriptionEn: "Describe this benefit.", descriptionId: "Jelaskan benefit ini." } satisfies SolutionBenefitInput])} className="inline-flex items-center gap-2 rounded-xl border border-dashed border-white/20 px-4 py-2.5 text-sm text-gray-300 hover:border-brand hover:text-brand"><Plus className="h-4 w-4" /> Tambah Benefit</button>
            </Panel>
          )}

          {activeTab === "products" && (
            <div className="space-y-5">
              <Panel title="Product Section">
                <FieldPair label="Judul Section" valueEn={page.productsTitleEn} valueId={page.productsTitleId} onChangeEn={(value) => setField("productsTitleEn", value)} onChangeId={(value) => setField("productsTitleId", value)} />
                <FieldPair multiline label="Deskripsi Section" valueEn={page.productsDescriptionEn} valueId={page.productsDescriptionId} onChangeEn={(value) => setField("productsDescriptionEn", value)} onChangeId={(value) => setField("productsDescriptionId", value)} />
              </Panel>
              <Panel title="Filters" description="Key dipakai pada field Filter Keys produk.">
                {page.filters.map((item, index) => (
                  <div key={item.id ?? `filter-${index}`} className="grid gap-3 rounded-xl border border-white/10 bg-black/30 p-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
                    <TextField label="Key" value={item.key} onChange={(value) => setField("filters", page.filters.map((entry, itemIndex) => itemIndex === index ? { ...entry, key: value } : entry))} />
                    <TextField label="Label EN" value={item.labelEn} onChange={(value) => setField("filters", page.filters.map((entry, itemIndex) => itemIndex === index ? { ...entry, labelEn: value } : entry))} />
                    <TextField label="Label ID" value={item.labelId} onChange={(value) => setField("filters", page.filters.map((entry, itemIndex) => itemIndex === index ? { ...entry, labelId: value } : entry))} />
                    <ItemActions index={index} total={page.filters.length} onMove={(from, to) => setField("filters", moveItem(page.filters, from, to))} onRemove={() => setField("filters", page.filters.filter((_, itemIndex) => itemIndex !== index))} />
                  </div>
                ))}
                <button type="button" onClick={() => setField("filters", [...page.filters, { key: "new-filter", labelEn: "New Filter", labelId: "Filter Baru" } satisfies SolutionFilterInput])} className="inline-flex items-center gap-2 rounded-xl border border-dashed border-white/20 px-4 py-2.5 text-sm text-gray-300 hover:border-brand hover:text-brand"><Plus className="h-4 w-4" /> Tambah Filter</button>
              </Panel>
              <Panel title="Products / Inventory" description={`Filter tersedia: ${availableFilterKeys || "belum ada"}`}>
                {page.products.map((item, index) => (
                  <div key={item.id ?? `product-${index}`} className="rounded-xl border border-white/10 bg-black/30 p-4">
                    <div className="mb-4 flex items-center justify-between"><h3 className="font-medium">Item {index + 1}</h3><ItemActions index={index} total={page.products.length} onMove={(from, to) => setField("products", moveItem(page.products, from, to))} onRemove={() => setField("products", page.products.filter((_, itemIndex) => itemIndex !== index))} /></div>
                    <div className="space-y-4">
                      <FieldPair label="Nama" valueEn={item.nameEn} valueId={item.nameId} onChangeEn={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, nameEn: value } : entry))} onChangeId={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, nameId: value } : entry))} />
                      <FieldPair label="Tag" valueEn={item.tagLabelEn} valueId={item.tagLabelId} onChangeEn={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, tagLabelEn: value } : entry))} onChangeId={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, tagLabelId: value } : entry))} />
                      <div className="grid gap-4 md:grid-cols-2"><TextField label="Image URL" value={item.imageUrl} onChange={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, imageUrl: value } : entry))} /><TextField label="Target URL" value={item.href} onChange={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, href: value } : entry))} /></div>
                      <FieldPair label="Image Alt" valueEn={item.imageAltEn} valueId={item.imageAltId} onChangeEn={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, imageAltEn: value } : entry))} onChangeId={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, imageAltId: value } : entry))} />
                      <div className="grid gap-4 md:grid-cols-2"><TextField label="Filter Keys" value={item.filterKeys} onChange={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, filterKeys: value } : entry))} hint="Pisahkan dengan spasi atau koma." /><label className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3"><input type="checkbox" checked={item.isActive} onChange={(event) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, isActive: event.target.checked } : entry))} className="accent-brand" /><span className="text-sm">Aktif ditampilkan</span></label></div>
                      <div className="rounded-xl border border-brand/20 bg-brand/5 p-4">
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Detail product dalam halaman solution</p>
                          {item.id && (
                            <a
                              href={`/dashboard/faq?scope=PRODUCT&productId=${item.id}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg bg-[#00b2be] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#009aa5] transition-colors"
                            >
                              Kelola FAQ Produk ({item.nameEn})
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                        <div className="space-y-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <TextField label="Product Slug / Anchor" value={item.slug ?? ""} onChange={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, slug: value } : entry))} hint="Contoh: mobile-led. Dipakai sebagai anchor #mobile-led." />
                            <label className="block space-y-2">
                              <span className="text-sm font-medium text-gray-300">Product Template</span>
                              <select
                                value={item.templateVariant ?? "standard"}
                                onChange={(event) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, templateVariant: event.target.value } : entry))}
                                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white"
                              >
                                <option value="movement">Movement (Hero + Gallery/Tabs + Value Bar + 3D + Works + Guides + FAQ + CTA)</option>
                                <option value="standard">Standard</option>
                                <option value="roadside">Roadside (Future Template)</option>
                                <option value="inside">Inside (Future Template)</option>
                              </select>
                            </label>
                          </div>
                          <FieldPair label="Detail Title" valueEn={item.detailTitleEn ?? ""} valueId={item.detailTitleId ?? ""} onChangeEn={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, detailTitleEn: value } : entry))} onChangeId={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, detailTitleId: value } : entry))} />
                          <FieldPair multiline label="Detail Description (Hero Subtitle)" valueEn={item.detailDescriptionEn ?? ""} valueId={item.detailDescriptionId ?? ""} onChangeEn={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, detailDescriptionEn: value } : entry))} onChangeId={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, detailDescriptionId: value } : entry))} />
                          <FieldPair multiline label="Detail Body (Gallery Intro)" valueEn={item.detailBodyEn ?? ""} valueId={item.detailBodyId ?? ""} onChangeEn={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, detailBodyEn: value } : entry))} onChangeId={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, detailBodyId: value } : entry))} />
                          <TextField label="Detail Hero Image URL" value={item.detailHeroImage ?? ""} onChange={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, detailHeroImage: value } : entry))} />
                          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-200 hover:bg-white/10"><ImagePlus className="h-4 w-4" />{uploading === `product-${index}-hero` ? "Mengunggah..." : "Upload hero product"}<input type="file" accept="image/*" className="hidden" onChange={(event) => event.target.files?.[0] && uploadProductAsset(`product-${index}-hero`, event.target.files[0], (url) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, detailHeroImage: url } : entry)))} /></label>

                          <div className="rounded-xl border border-white/10 bg-black/20 p-3 space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Hero CTA Buttons</p>
                            <FieldPair label="Primary CTA Label" valueEn={item.heroPrimaryCtaLabelEn ?? ""} valueId={item.heroPrimaryCtaLabelId ?? ""} onChangeEn={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, heroPrimaryCtaLabelEn: value } : entry))} onChangeId={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, heroPrimaryCtaLabelId: value } : entry))} />
                            <TextField label="Primary CTA URL" value={item.heroPrimaryCtaHref ?? "#contact"} onChange={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, heroPrimaryCtaHref: value } : entry))} />
                            <FieldPair label="Secondary CTA Label" valueEn={item.heroSecondaryCtaLabelEn ?? ""} valueId={item.heroSecondaryCtaLabelId ?? ""} onChangeEn={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, heroSecondaryCtaLabelEn: value } : entry))} onChangeId={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, heroSecondaryCtaLabelId: value } : entry))} />
                            <TextField label="Secondary CTA URL" value={item.heroSecondaryCtaHref ?? "#guides"} onChange={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, heroSecondaryCtaHref: value } : entry))} />
                          </div>

                          <div className="rounded-xl border border-white/10 bg-black/20 p-3 space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Middle Value Proposition Bar</p>
                            <FieldPair multiline label="Value Bar Text" valueEn={item.valueBarTextEn ?? ""} valueId={item.valueBarTextId ?? ""} onChangeEn={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, valueBarTextEn: value } : entry))} onChangeId={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, valueBarTextId: value } : entry))} />
                            <FieldPair label="Value Bar Button Label" valueEn={item.valueBarCtaLabelEn ?? ""} valueId={item.valueBarCtaLabelId ?? ""} onChangeEn={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, valueBarCtaLabelEn: value } : entry))} onChangeId={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, valueBarCtaLabelId: value } : entry))} />
                            <TextField label="Value Bar Button URL" value={item.valueBarCtaHref ?? "#contact"} onChange={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, valueBarCtaHref: value } : entry))} />
                          </div>

                          <FieldPair label="Showcase Title" valueEn={item.showcaseTitleEn ?? ""} valueId={item.showcaseTitleId ?? ""} onChangeEn={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, showcaseTitleEn: value } : entry))} onChangeId={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, showcaseTitleId: value } : entry))} />
                          <FieldPair multiline label="Showcase Description" valueEn={item.showcaseDescriptionEn ?? ""} valueId={item.showcaseDescriptionId ?? ""} onChangeEn={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, showcaseDescriptionEn: value } : entry))} onChangeId={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, showcaseDescriptionId: value } : entry))} />
                          <div className="grid gap-4 md:grid-cols-2"><TextField label="Showcase Media URL" value={item.showcaseMediaUrl ?? ""} onChange={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, showcaseMediaUrl: value } : entry))} /><label className="block space-y-2"><span className="text-sm font-medium text-gray-300">Media Type</span><select value={item.showcaseMediaType ?? "image"} onChange={(event) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, showcaseMediaType: event.target.value } : entry))} className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white"><option value="image">Image</option><option value="video">Video</option></select></label></div>
                          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-200 hover:bg-white/10"><ImagePlus className="h-4 w-4" />{uploading === `product-${index}-showcase` ? "Mengunggah..." : "Upload showcase image"}<input type="file" accept="image/*" className="hidden" onChange={(event) => event.target.files?.[0] && uploadProductAsset(`product-${index}-showcase`, event.target.files[0], (url) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, showcaseMediaUrl: url, showcaseMediaType: "image" } : entry)))} /></label>
                          <FieldPair label="Showcase Meta Title (e.g. 3D Rotate Animation)" valueEn={item.showcaseMetaTitleEn ?? ""} valueId={item.showcaseMetaTitleId ?? ""} onChangeEn={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, showcaseMetaTitleEn: value } : entry))} onChangeId={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, showcaseMetaTitleId: value } : entry))} />
                          <FieldPair multiline label="Showcase Meta Description" valueEn={item.showcaseMetaDescEn ?? ""} valueId={item.showcaseMetaDescId ?? ""} onChangeEn={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, showcaseMetaDescEn: value } : entry))} onChangeId={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, showcaseMetaDescId: value } : entry))} />
                          <div className="space-y-3">
                            <p className="text-sm font-medium text-gray-300">Product Gallery</p>
                            {(item.gallery ?? []).map((gallery, galleryIndex) => <div key={gallery.id ?? `gallery-${galleryIndex}`} className="space-y-3 rounded-xl border border-white/10 bg-black/20 p-3"><div className="flex justify-end"><button type="button" onClick={() => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, gallery: (entry.gallery ?? []).filter((_, childIndex) => childIndex !== galleryIndex) } : entry))} className="rounded-lg p-2 text-red-400 hover:bg-red-500/10" aria-label="Remove gallery image"><Trash2 className="h-4 w-4" /></button></div><TextField label="Image URL" value={gallery.imageUrl} onChange={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, gallery: (entry.gallery ?? []).map((child, childIndex) => childIndex === galleryIndex ? { ...child, imageUrl: value } : child) } : entry))} /><FieldPair label="Image Alt" valueEn={gallery.altEn} valueId={gallery.altId} onChangeEn={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, gallery: (entry.gallery ?? []).map((child, childIndex) => childIndex === galleryIndex ? { ...child, altEn: value } : child) } : entry))} onChangeId={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, gallery: (entry.gallery ?? []).map((child, childIndex) => childIndex === galleryIndex ? { ...child, altId: value } : child) } : entry))} /><label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs"><ImagePlus className="h-3 w-3" />Upload<input type="file" accept="image/*" className="hidden" onChange={(event) => event.target.files?.[0] && uploadProductAsset(`product-${index}-gallery-${galleryIndex}`, event.target.files[0], (url) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, gallery: (entry.gallery ?? []).map((child, childIndex) => childIndex === galleryIndex ? { ...child, imageUrl: url } : child) } : entry)))} /></label></div>)}
                            <button type="button" onClick={() => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, gallery: [...(entry.gallery ?? []), { imageUrl: entry.detailHeroImage || entry.imageUrl, altEn: entry.imageAltEn, altId: entry.imageAltId } satisfies SolutionProductGalleryInput] } : entry))} className="inline-flex items-center gap-2 rounded-lg border border-dashed border-white/20 px-3 py-2 text-xs text-gray-300 hover:border-brand hover:text-brand"><Plus className="h-3 w-3" /> Tambah gallery</button>
                          </div>
                          <div className="space-y-3">
                            <p className="text-sm font-medium text-gray-300">Locations / Coverage</p>
                            {(item.locations ?? []).map((location, locationIndex) => <div key={location.id ?? `location-${locationIndex}`} className="grid gap-3 md:grid-cols-[1fr_1fr_auto]"><TextField label="Location EN" value={location.labelEn} onChange={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, locations: (entry.locations ?? []).map((child, childIndex) => childIndex === locationIndex ? { ...child, labelEn: value } : child) } : entry))} /><TextField label="Location ID" value={location.labelId} onChange={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, locations: (entry.locations ?? []).map((child, childIndex) => childIndex === locationIndex ? { ...child, labelId: value } : child) } : entry))} /><button type="button" onClick={() => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, locations: (entry.locations ?? []).filter((_, childIndex) => childIndex !== locationIndex) } : entry))} className="self-end rounded-lg p-3 text-red-400 hover:bg-red-500/10" aria-label="Remove location"><Trash2 className="h-4 w-4" /></button></div>)}
                            <button type="button" onClick={() => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, locations: [...(entry.locations ?? []), { labelEn: "New location", labelId: "Lokasi baru" } satisfies SolutionProductLocationInput] } : entry))} className="inline-flex items-center gap-2 rounded-lg border border-dashed border-white/20 px-3 py-2 text-xs text-gray-300 hover:border-brand hover:text-brand"><Plus className="h-3 w-3" /> Tambah lokasi</button>
                          </div>
                          <div className="space-y-3">
                            <p className="text-sm font-medium text-gray-300">Showcase Features / Metro Coverage Tabs</p>
                            {(item.features ?? []).map((feature, featureIndex) => <div key={feature.id ?? `feature-${featureIndex}`} className="space-y-3 rounded-xl border border-white/10 bg-black/20 p-3"><div className="flex justify-end"><button type="button" onClick={() => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, features: (entry.features ?? []).filter((_, childIndex) => childIndex !== featureIndex) } : entry))} className="rounded-lg p-2 text-red-400 hover:bg-red-500/10" aria-label="Remove feature"><Trash2 className="h-4 w-4" /></button></div><div className="grid gap-3 md:grid-cols-3"><TextField label="Feature Key" value={feature.key} onChange={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, features: (entry.features ?? []).map((child, childIndex) => childIndex === featureIndex ? { ...child, key: value } : child) } : entry))} /><TextField label="Tab Label EN" value={feature.labelEn} onChange={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, features: (entry.features ?? []).map((child, childIndex) => childIndex === featureIndex ? { ...child, labelEn: value } : child) } : entry))} /><TextField label="Tab Label ID" value={feature.labelId} onChange={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, features: (entry.features ?? []).map((child, childIndex) => childIndex === featureIndex ? { ...child, labelId: value } : child) } : entry))} /></div><FieldPair label="Feature Title" valueEn={feature.titleEn} valueId={feature.titleId} onChangeEn={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, features: (entry.features ?? []).map((child, childIndex) => childIndex === featureIndex ? { ...child, titleEn: value } : child) } : entry))} onChangeId={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, features: (entry.features ?? []).map((child, childIndex) => childIndex === featureIndex ? { ...child, titleId: value } : child) } : entry))} /><FieldPair multiline label="Feature Body" valueEn={feature.bodyEn} valueId={feature.bodyId} onChangeEn={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, features: (entry.features ?? []).map((child, childIndex) => childIndex === featureIndex ? { ...child, bodyEn: value } : child) } : entry))} onChangeId={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, features: (entry.features ?? []).map((child, childIndex) => childIndex === featureIndex ? { ...child, bodyId: value } : child) } : entry))} /><TextField label="City Tags (pisahkan koma)" value={feature.cityTags ?? ""} onChange={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, features: (entry.features ?? []).map((child, childIndex) => childIndex === featureIndex ? { ...child, cityTags: value } : child) } : entry))} hint="Contoh: JAKARTA, BANDUNG, BEKASI" /></div>)}
                            <button type="button" onClick={() => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, features: [...(entry.features ?? []), { key: "new-feature", labelEn: "Feature", labelId: "Fitur", titleEn: "New feature", titleId: "Fitur baru", bodyEn: "Describe this feature.", bodyId: "Jelaskan fitur ini.", cityTags: "" } satisfies SolutionProductFeatureInput] } : entry))} className="inline-flex items-center gap-2 rounded-lg border border-dashed border-white/20 px-3 py-2 text-xs text-gray-300 hover:border-brand hover:text-brand"><Plus className="h-3 w-3" /> Tambah feature</button>
                          </div>
                          <div className="space-y-3">
                            <p className="text-sm font-medium text-gray-300">Featured Works / Case Studies</p>
                            <FieldPair label="Works Section Title" valueEn={item.worksTitleEn ?? ""} valueId={item.worksTitleId ?? ""} onChangeEn={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, worksTitleEn: value } : entry))} onChangeId={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, worksTitleId: value } : entry))} />
                            <FieldPair multiline label="Works Section Description" valueEn={item.worksDescriptionEn ?? ""} valueId={item.worksDescriptionId ?? ""} onChangeEn={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, worksDescriptionEn: value } : entry))} onChangeId={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, worksDescriptionId: value } : entry))} />
                            {(item.caseStudies ?? []).map((study, studyIndex) => <div key={study.id ?? `case-${studyIndex}`} className="space-y-3 rounded-xl border border-white/10 bg-black/20 p-3"><div className="flex justify-end"><button type="button" onClick={() => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, caseStudies: (entry.caseStudies ?? []).filter((_, childIndex) => childIndex !== studyIndex) } : entry))} className="rounded-lg p-2 text-red-400 hover:bg-red-500/10" aria-label="Remove case study"><Trash2 className="h-4 w-4" /></button></div><TextField label="Client" value={study.clientName} onChange={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, caseStudies: (entry.caseStudies ?? []).map((child, childIndex) => childIndex === studyIndex ? { ...child, clientName: value } : child) } : entry))} /><FieldPair label="Case Title" valueEn={study.titleEn} valueId={study.titleId} onChangeEn={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, caseStudies: (entry.caseStudies ?? []).map((child, childIndex) => childIndex === studyIndex ? { ...child, titleEn: value } : child) } : entry))} onChangeId={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, caseStudies: (entry.caseStudies ?? []).map((child, childIndex) => childIndex === studyIndex ? { ...child, titleId: value } : child) } : entry))} /><FieldPair multiline label="Case Description" valueEn={study.descriptionEn} valueId={study.descriptionId} onChangeEn={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, caseStudies: (entry.caseStudies ?? []).map((child, childIndex) => childIndex === studyIndex ? { ...child, descriptionEn: value } : child) } : entry))} onChangeId={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, caseStudies: (entry.caseStudies ?? []).map((child, childIndex) => childIndex === studyIndex ? { ...child, descriptionId: value } : child) } : entry))} /><div className="grid gap-3 md:grid-cols-2"><TextField label="Image URL" value={study.imageUrl} onChange={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, caseStudies: (entry.caseStudies ?? []).map((child, childIndex) => childIndex === studyIndex ? { ...child, imageUrl: value } : child) } : entry))} /><TextField label="Target URL" value={study.href} onChange={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, caseStudies: (entry.caseStudies ?? []).map((child, childIndex) => childIndex === studyIndex ? { ...child, href: value } : child) } : entry))} /></div><label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs"><ImagePlus className="h-3 w-3" />Upload case image<input type="file" accept="image/*" className="hidden" onChange={(event) => event.target.files?.[0] && uploadProductAsset(`product-${index}-case-${studyIndex}`, event.target.files[0], (url) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, caseStudies: (entry.caseStudies ?? []).map((child, childIndex) => childIndex === studyIndex ? { ...child, imageUrl: url } : child) } : entry)))} /></label></div>)}
                            <button type="button" onClick={() => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, caseStudies: [...(entry.caseStudies ?? []), { clientName: "Client", titleEn: "New case study", titleId: "Studi kasus baru", descriptionEn: "Describe the campaign.", descriptionId: "Jelaskan kampanye.", imageUrl: entry.detailHeroImage || entry.imageUrl, href: "/#contact", isActive: true } satisfies SolutionProductCaseStudyInput] } : entry))} className="inline-flex items-center gap-2 rounded-lg border border-dashed border-white/20 px-3 py-2 text-xs text-gray-300 hover:border-brand hover:text-brand"><Plus className="h-3 w-3" /> Tambah case study</button>
                          </div>
                          <div className="space-y-3">
                            <p className="text-sm font-medium text-gray-300">Guides & Insights</p>
                            <FieldPair label="Guides Section Title" valueEn={item.guidesTitleEn ?? ""} valueId={item.guidesTitleId ?? ""} onChangeEn={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, guidesTitleEn: value } : entry))} onChangeId={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, guidesTitleId: value } : entry))} />
                            <FieldPair label="Guides Section Subtitle" valueEn={item.guidesDescriptionEn ?? ""} valueId={item.guidesDescriptionId ?? ""} onChangeEn={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, guidesDescriptionEn: value } : entry))} onChangeId={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, guidesDescriptionId: value } : entry))} />
                            {(item.insights ?? []).map((insight, insightIndex) => { const post = insight.post ?? availablePosts.find((candidate) => candidate.id === insight.postId); return <div key={insight.id ?? insight.postId} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/20 p-3"><span className="text-sm text-gray-200">{post?.title ?? "Post tidak ditemukan"}</span><button type="button" onClick={() => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, insights: (entry.insights ?? []).filter((_, childIndex) => childIndex !== insightIndex) } : entry))} className="rounded-lg p-2 text-red-400 hover:bg-red-500/10" aria-label="Remove insight"><Trash2 className="h-4 w-4" /></button></div>; })}
                            <select value="" onChange={(event) => { const post = availablePosts.find((candidate) => candidate.id === event.target.value); if (!post) return; setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, insights: [...(entry.insights ?? []), { postId: post.id, post }] } : entry)); }} className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white"><option value="">Pilih published blog post...</option>{availablePosts.filter((post) => !(item.insights ?? []).some((insight) => insight.postId === post.id)).map((post) => <option key={post.id} value={post.id}>{post.title}</option>)}</select>
                          </div>
                          <div className="rounded-xl border border-white/10 bg-black/20 p-3 space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Product Final CTA</p>
                            <FieldPair label="CTA Badge" valueEn={item.ctaBadgeEn ?? ""} valueId={item.ctaBadgeId ?? ""} onChangeEn={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, ctaBadgeEn: value } : entry))} onChangeId={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, ctaBadgeId: value } : entry))} />
                            <FieldPair label="CTA Title (e.g. Your city,)" valueEn={item.ctaTitleEn ?? ""} valueId={item.ctaTitleId ?? ""} onChangeEn={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, ctaTitleEn: value } : entry))} onChangeId={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, ctaTitleId: value } : entry))} />
                            <FieldPair label="CTA Emphasis (e.g. our stage.)" valueEn={item.ctaEmphasisEn ?? ""} valueId={item.ctaEmphasisId ?? ""} onChangeEn={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, ctaEmphasisEn: value } : entry))} onChangeId={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, ctaEmphasisId: value } : entry))} />
                            <FieldPair multiline label="CTA Description" valueEn={item.ctaDescriptionEn ?? ""} valueId={item.ctaDescriptionId ?? ""} onChangeEn={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, ctaDescriptionEn: value } : entry))} onChangeId={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, ctaDescriptionId: value } : entry))} />
                            <FieldPair label="CTA Button Label" valueEn={item.ctaButtonLabelEn ?? ""} valueId={item.ctaButtonLabelId ?? ""} onChangeEn={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, ctaButtonLabelEn: value } : entry))} onChangeId={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, ctaButtonLabelId: value } : entry))} />
                            <div className="grid gap-3 md:grid-cols-2"><TextField label="CTA Button URL" value={item.ctaButtonHref ?? "/#contact"} onChange={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, ctaButtonHref: value } : entry))} /><TextField label="CTA Image URL (Opsional)" value={item.ctaImage ?? ""} onChange={(value) => setField("products", page.products.map((entry, itemIndex) => itemIndex === index ? { ...entry, ctaImage: value } : entry))} /></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <button type="button" onClick={() => setField("products", [...page.products, { nameEn: "New Item", nameId: "Item Baru", imageUrl: page.heroImage, imageAltEn: "New media item", imageAltId: "Item media baru", tagLabelEn: "Media", tagLabelId: "Media", filterKeys: "", href: "/#contact", isActive: true } satisfies SolutionProductInput])} className="inline-flex items-center gap-2 rounded-xl border border-dashed border-white/20 px-4 py-2.5 text-sm text-gray-300 hover:border-brand hover:text-brand"><Plus className="h-4 w-4" /> Tambah Item</button>
              </Panel>
            </div>
          )}

          {activeTab === "faq" && (
            <Panel title="FAQ">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-[#00b2be]/30 bg-[#00b2be]/10 p-3.5">
                <div>
                  <p className="text-xs font-semibold text-white">Kelola Terpusat di FAQ Manager</p>
                  <p className="text-[11px] text-zinc-300">
                    Buka menu FAQ Manager dengan filter otomatis terkunci untuk solusi <span className="font-bold text-[#ffcf00]">{page.badgeText}</span>.
                  </p>
                </div>
                <a
                  href={`/dashboard/faq?scope=SOLUTION&solutionId=${page.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#00b2be] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#009aa5] transition-colors self-start sm:self-auto flex-shrink-0"
                >
                  Buka FAQ Manager
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <FieldPair label="Judul Section" valueEn={page.faqTitleEn} valueId={page.faqTitleId} onChangeEn={(value) => setField("faqTitleEn", value)} onChangeId={(value) => setField("faqTitleId", value)} />
              {page.faqCategories.map((category, categoryIndex) => (
                <div key={category.id ?? `category-${categoryIndex}`} className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <div className="mb-4 flex items-center justify-between"><h3 className="font-semibold">Kategori {categoryIndex + 1}</h3><ItemActions index={categoryIndex} total={page.faqCategories.length} onMove={(from, to) => setField("faqCategories", moveItem(page.faqCategories, from, to))} onRemove={() => setField("faqCategories", page.faqCategories.filter((_, index) => index !== categoryIndex))} /></div>
                  <div className="grid gap-4 md:grid-cols-3"><TextField label="Key" value={category.key} onChange={(value) => setField("faqCategories", page.faqCategories.map((entry, index) => index === categoryIndex ? { ...entry, key: value } : entry))} /><TextField label="Label EN" value={category.labelEn} onChange={(value) => setField("faqCategories", page.faqCategories.map((entry, index) => index === categoryIndex ? { ...entry, labelEn: value } : entry))} /><TextField label="Label ID" value={category.labelId} onChange={(value) => setField("faqCategories", page.faqCategories.map((entry, index) => index === categoryIndex ? { ...entry, labelId: value } : entry))} /></div>
                  <div className="mt-4 space-y-4">
                    {category.items.map((item, itemIndex) => (
                      <div key={item.id ?? `faq-${itemIndex}`} className="rounded-xl border border-white/10 bg-zinc-900 p-4">
                        <div className="mb-3 flex justify-end"><ItemActions index={itemIndex} total={category.items.length} onMove={(from, to) => setField("faqCategories", page.faqCategories.map((entry, index) => index === categoryIndex ? { ...entry, items: moveItem(entry.items, from, to) } : entry))} onRemove={() => setField("faqCategories", page.faqCategories.map((entry, index) => index === categoryIndex ? { ...entry, items: entry.items.filter((_, faqIndex) => faqIndex !== itemIndex) } : entry))} /></div>
                        <div className="space-y-4"><FieldPair label="Pertanyaan" valueEn={item.questionEn} valueId={item.questionId} onChangeEn={(value) => setField("faqCategories", page.faqCategories.map((entry, index) => index === categoryIndex ? { ...entry, items: entry.items.map((faq, faqIndex) => faqIndex === itemIndex ? { ...faq, questionEn: value } : faq) } : entry))} onChangeId={(value) => setField("faqCategories", page.faqCategories.map((entry, index) => index === categoryIndex ? { ...entry, items: entry.items.map((faq, faqIndex) => faqIndex === itemIndex ? { ...faq, questionId: value } : faq) } : entry))} /><FieldPair multiline label="Jawaban" valueEn={item.answerEn} valueId={item.answerId} onChangeEn={(value) => setField("faqCategories", page.faqCategories.map((entry, index) => index === categoryIndex ? { ...entry, items: entry.items.map((faq, faqIndex) => faqIndex === itemIndex ? { ...faq, answerEn: value } : faq) } : entry))} onChangeId={(value) => setField("faqCategories", page.faqCategories.map((entry, index) => index === categoryIndex ? { ...entry, items: entry.items.map((faq, faqIndex) => faqIndex === itemIndex ? { ...faq, answerId: value } : faq) } : entry))} /></div>
                      </div>
                    ))}
                    <button type="button" onClick={() => setField("faqCategories", page.faqCategories.map((entry, index) => index === categoryIndex ? { ...entry, items: [...entry.items, { questionEn: "New question?", questionId: "Pertanyaan baru?", answerEn: "Add the answer.", answerId: "Tambahkan jawaban." }] } : entry))} className="inline-flex items-center gap-2 rounded-xl border border-dashed border-white/20 px-3 py-2 text-xs text-gray-300 hover:border-brand hover:text-brand"><Plus className="h-3 w-3" /> Tambah Pertanyaan</button>
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => setField("faqCategories", [...page.faqCategories, { key: "new-category", labelEn: "New Category", labelId: "Kategori Baru", items: [] } satisfies SolutionFaqCategoryInput])} className="inline-flex items-center gap-2 rounded-xl border border-dashed border-white/20 px-4 py-2.5 text-sm text-gray-300 hover:border-brand hover:text-brand"><Plus className="h-4 w-4" /> Tambah Kategori</button>
            </Panel>
          )}

          {activeTab === "cta" && (
            <Panel title="Final CTA">
              <FieldPair label="Judul" valueEn={page.ctaTitleEn} valueId={page.ctaTitleId} onChangeEn={(value) => setField("ctaTitleEn", value)} onChangeId={(value) => setField("ctaTitleId", value)} />
              <FieldPair label="Teks Emphasis" valueEn={page.ctaEmphasisEn} valueId={page.ctaEmphasisId} onChangeEn={(value) => setField("ctaEmphasisEn", value)} onChangeId={(value) => setField("ctaEmphasisId", value)} />
              <FieldPair multiline label="Deskripsi" valueEn={page.ctaDescriptionEn} valueId={page.ctaDescriptionId} onChangeEn={(value) => setField("ctaDescriptionEn", value)} onChangeId={(value) => setField("ctaDescriptionId", value)} />
              <FieldPair label="Label Tombol" valueEn={page.ctaButtonLabelEn} valueId={page.ctaButtonLabelId} onChangeEn={(value) => setField("ctaButtonLabelEn", value)} onChangeId={(value) => setField("ctaButtonLabelId", value)} />
              <TextField label="Target URL" value={page.ctaButtonHref} onChange={(value) => setField("ctaButtonHref", value)} />
            </Panel>
          )}

          <div className="sticky bottom-4 flex justify-end rounded-2xl border border-white/10 bg-zinc-950/90 p-3 shadow-2xl backdrop-blur">
            <button type="button" onClick={handleSave} disabled={saving} className="inline-flex min-w-36 items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-black disabled:opacity-50">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Simpan Perubahan</button>
          </div>
        </div>
      </div>
    </div>
  );
}
