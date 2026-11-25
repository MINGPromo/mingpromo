"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Loader2, Save } from "lucide-react";
import { saveSolutionOverview, type SolutionOverviewInput } from "@/app/actions/solution-overview";
import { uploadImage } from "@/app/actions/upload";

function Field({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean }) {
  return <label className="block space-y-2"><span className="text-sm font-medium text-gray-300">{label}</span>{multiline ? <textarea value={value} rows={4} onChange={(event) => onChange(event.target.value)} className="w-full resize-y rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm leading-6 text-white outline-none focus:border-brand" /> : <input value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-brand" />}</label>;
}

function Pair({ label, data, setData, keyEn, keyId, multiline = false }: { label: string; data: SolutionOverviewInput; setData: (next: SolutionOverviewInput) => void; keyEn: keyof SolutionOverviewInput; keyId: keyof SolutionOverviewInput; multiline?: boolean }) {
  return <div className="grid gap-4 md:grid-cols-2"><Field label={`${label} — EN`} value={String(data[keyEn] ?? "")} onChange={(value) => setData({ ...data, [keyEn]: value })} multiline={multiline} /><Field label={`${label} — ID`} value={String(data[keyId] ?? "")} onChange={(value) => setData({ ...data, [keyId]: value })} multiline={multiline} /></div>;
}

function Panel({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return <section className="space-y-5 rounded-2xl border border-white/10 bg-zinc-900 p-6"><div><h2 className="text-xl font-semibold text-white">{title}</h2>{description && <p className="mt-1 text-sm text-gray-400">{description}</p>}</div>{children}</section>;
}

export function SolutionOverviewEditor({ initial }: { initial: SolutionOverviewInput }) {
  const router = useRouter();
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const uploadHero = async (file: File) => {
    setUploading(true); setNotice(null);
    try { const form = new FormData(); form.append("file", file); form.append("customName", "solution-overview-hero"); setData({ ...data, heroImage: await uploadImage(form) }); }
    catch (error) { setNotice({ type: "error", message: error instanceof Error ? error.message : "Upload gagal." }); }
    finally { setUploading(false); }
  };

  const save = async () => {
    setSaving(true); setNotice(null);
    const result = await saveSolutionOverview(data);
    setSaving(false);
    if (!result.success) return setNotice({ type: "error", message: result.error });
    setNotice({ type: "success", message: "Overview solution berhasil disimpan." });
    router.refresh();
  };

  return <div className="mx-auto max-w-5xl space-y-6 pb-10">
    <header className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-zinc-900 p-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">CMS Solution</p><h1 className="mt-1 text-2xl font-bold text-white">Solution Overview</h1><p className="mt-1 text-sm text-gray-400">Kelola konten /solutions. Kartu carousel tetap berasal dari CMS kategori product.</p></div><button type="button" onClick={save} disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-black disabled:opacity-50">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Simpan Overview</button></header>
    {notice && <div className={`rounded-xl border px-4 py-3 text-sm ${notice.type === "success" ? "border-green-500/30 bg-green-500/10 text-green-300" : "border-red-500/30 bg-red-500/10 text-red-300"}`}>{notice.message}</div>}

    <Panel title="Hero Overview" description="Judul, deskripsi, CTA, supporting line, dan background pembuka.">
      <Pair label="Judul" data={data} setData={setData} keyEn="heroTitleEn" keyId="heroTitleId" />
      <Pair label="Deskripsi" data={data} setData={setData} keyEn="heroDescriptionEn" keyId="heroDescriptionId" multiline />
      <Pair label="Primary CTA Label" data={data} setData={setData} keyEn="heroPrimaryCtaLabelEn" keyId="heroPrimaryCtaLabelId" />
      <Field label="Primary CTA URL" value={data.heroPrimaryCtaHref} onChange={(value) => setData({ ...data, heroPrimaryCtaHref: value })} />
      <Pair label="Secondary CTA Label" data={data} setData={setData} keyEn="heroSecondaryCtaLabelEn" keyId="heroSecondaryCtaLabelId" />
      <Field label="Secondary CTA URL" value={data.heroSecondaryCtaHref} onChange={(value) => setData({ ...data, heroSecondaryCtaHref: value })} />
      <Pair label="Supporting Line" data={data} setData={setData} keyEn="heroSupportingLineEn" keyId="heroSupportingLineId" />
      <Field label="Hero Image URL" value={data.heroImage} onChange={(value) => setData({ ...data, heroImage: value })} />
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-gray-200 hover:bg-white/10"><ImagePlus className="h-4 w-4" />{uploading ? "Mengunggah..." : "Upload Hero Image"}<input type="file" accept="image/*" className="hidden" onChange={(event) => event.target.files?.[0] && uploadHero(event.target.files[0])} /></label>
    </Panel>

    <Panel title="Introduction" description="Gunakan satu baris per bagian judul. Dua baris terakhir otomatis memakai pill kuning. Pisahkan paragraf isi dengan satu baris kosong.">
      <Pair label="Section Label" data={data} setData={setData} keyEn="introEyebrowEn" keyId="introEyebrowId" />
      <Pair label="Judul Multiline" data={data} setData={setData} keyEn="introTitleEn" keyId="introTitleId" multiline />
      <Pair label="Isi" data={data} setData={setData} keyEn="introBodyEn" keyId="introBodyId" multiline />
    </Panel>

    <Panel title="Five Connection Layers" description="Konten pembuka carousel. Gambar dan H3 kartu diedit dari Solution Pages.">
      <Pair label="Section Label" data={data} setData={setData} keyEn="layersEyebrowEn" keyId="layersEyebrowId" />
      <Pair label="Judul" data={data} setData={setData} keyEn="layersTitleEn" keyId="layersTitleId" multiline />
      <Pair label="Subheading" data={data} setData={setData} keyEn="layersDescriptionEn" keyId="layersDescriptionId" multiline />
    </Panel>

    <Panel title="Closing CTA" description="Pisahkan paragraf deskripsi dengan satu baris kosong.">
      <Pair label="Judul" data={data} setData={setData} keyEn="ctaTitleEn" keyId="ctaTitleId" />
      <Pair label="Kata Terakhir / Emphasis" data={data} setData={setData} keyEn="ctaEmphasisEn" keyId="ctaEmphasisId" />
      <Pair label="Deskripsi" data={data} setData={setData} keyEn="ctaDescriptionEn" keyId="ctaDescriptionId" multiline />
      <Pair label="Primary CTA Label" data={data} setData={setData} keyEn="ctaButtonLabelEn" keyId="ctaButtonLabelId" />
      <Field label="Primary CTA URL" value={data.ctaButtonHref} onChange={(value) => setData({ ...data, ctaButtonHref: value })} />
      <Pair label="Secondary CTA Label" data={data} setData={setData} keyEn="ctaSecondaryButtonLabelEn" keyId="ctaSecondaryButtonLabelId" />
      <Field label="Secondary CTA URL" value={data.ctaSecondaryButtonHref} onChange={(value) => setData({ ...data, ctaSecondaryButtonHref: value })} />
      <Pair label="Reassurance Line" data={data} setData={setData} keyEn="ctaReassuranceEn" keyId="ctaReassuranceId" />
    </Panel>

    <Panel title="SEO">
      <Pair label="SEO Title" data={data} setData={setData} keyEn="seoTitleEn" keyId="seoTitleId" />
      <Pair label="SEO Description" data={data} setData={setData} keyEn="seoDescriptionEn" keyId="seoDescriptionId" multiline />
    </Panel>
    <div className="sticky bottom-4 flex justify-end"><button type="button" onClick={save} disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-black shadow-xl disabled:opacity-50">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Simpan Perubahan</button></div>
  </div>;
}
