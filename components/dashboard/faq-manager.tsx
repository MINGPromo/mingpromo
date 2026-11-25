"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  HelpCircle,
  Plus,
  Trash2,
  Edit2,
  ChevronDown,
  ChevronRight,
  Globe,
  Compass,
  Box,
  CheckCircle2,
  X,
  Search,
  ExternalLink,
} from "lucide-react";
import {
  createFaqCategory,
  updateFaqCategory,
  deleteFaqCategory,
  createFaqItem,
  updateFaqItem,
  deleteFaqItem,
} from "@/app/actions/faq";
import { FaqScope } from "@/lib/solution-types";

type SolutionOption = { id: string; slug: string; badgeText: string; navLabelEn: string };
type ProductOption = { id: string; nameEn: string; slug: string | null; solutionPageId: string };

type FaqItem = {
  id: string;
  categoryId: string;
  questionEn: string;
  questionId: string;
  answerEn: string;
  answerId: string;
  order: number;
  isActive: boolean;
};

type FaqCategory = {
  id: string;
  scope: string;
  solutionPageId: string | null;
  productId: string | null;
  key: string;
  labelEn: string;
  labelId: string;
  order: number;
  items: FaqItem[];
  solutionPage: { id: string; slug: string; badgeText: string } | null;
  product: { id: string; nameEn: string; slug: string | null } | null;
};

interface FaqManagerProps {
  initialCategories: FaqCategory[];
  solutions: SolutionOption[];
  products: ProductOption[];
}

export function FaqManager({ initialCategories, solutions, products }: FaqManagerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // URL Query param auto-fill
  const defaultScopeParam = searchParams.get("scope") as FaqScope | null;
  const defaultSolutionParam = searchParams.get("solutionId");
  const defaultProductParam = searchParams.get("productId");

  const [scopeFilter, setScopeFilter] = useState<string>(defaultScopeParam || "ALL");
  const [solutionFilter, setSolutionFilter] = useState<string>(defaultSolutionParam || "ALL");
  const [productFilter, setProductFilter] = useState<string>(defaultProductParam || "ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(() => {
    // Expand the first two by default
    const map: Record<string, boolean> = {};
    if (initialCategories[0]) map[initialCategories[0].id] = true;
    if (initialCategories[1]) map[initialCategories[1].id] = true;
    return map;
  });

  // Modal State: Category
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<FaqCategory | null>(null);
  const [catScope, setCatScope] = useState<FaqScope>(defaultScopeParam || "GLOBAL");
  const [catSolutionId, setCatSolutionId] = useState<string>(defaultSolutionParam || (solutions[0]?.id ?? ""));
  const [catProductId, setCatProductId] = useState<string>(defaultProductParam || (products[0]?.id ?? ""));
  const [catKey, setCatKey] = useState("");
  const [catLabelEn, setCatLabelEn] = useState("");
  const [catLabelId, setCatLabelId] = useState("");

  // Modal State: Item
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [itemTargetCategoryId, setItemTargetCategoryId] = useState<string>("");
  const [editingItem, setEditingItem] = useState<FaqItem | null>(null);
  const [itemQuestionEn, setItemQuestionEn] = useState("");
  const [itemQuestionId, setItemQuestionId] = useState("");
  const [itemAnswerEn, setItemAnswerEn] = useState("");
  const [itemAnswerId, setItemAnswerId] = useState("");

  // Notification / toast feedback
  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 3000);
  };

  const toggleCategoryExpand = (catId: string) => {
    setExpandedCategories((prev) => ({ ...prev, [catId]: !prev[catId] }));
  };

  // Open Create Category Modal
  const openCreateCategory = (prefillScope?: FaqScope, prefillSolutionId?: string) => {
    setEditingCategory(null);
    setCatScope(prefillScope || (scopeFilter !== "ALL" ? (scopeFilter as FaqScope) : "SOLUTION"));
    setCatSolutionId(prefillSolutionId || (solutionFilter !== "ALL" ? solutionFilter : (solutions[0]?.id ?? "")));
    setCatProductId(productFilter !== "ALL" ? productFilter : (products[0]?.id ?? ""));
    setCatKey("");
    setCatLabelEn("");
    setCatLabelId("");
    setIsCategoryModalOpen(true);
  };

  // Open Edit Category Modal
  const openEditCategory = (cat: FaqCategory) => {
    setEditingCategory(cat);
    setCatScope(cat.scope as FaqScope);
    setCatSolutionId(cat.solutionPageId || (solutions[0]?.id ?? ""));
    setCatProductId(cat.productId || (products[0]?.id ?? ""));
    setCatKey(cat.key);
    setCatLabelEn(cat.labelEn);
    setCatLabelId(cat.labelId);
    setIsCategoryModalOpen(true);
  };

  // Open Create Item Modal
  const openCreateItem = (categoryId: string) => {
    setEditingItem(null);
    setItemTargetCategoryId(categoryId);
    setItemQuestionEn("");
    setItemQuestionId("");
    setItemAnswerEn("");
    setItemAnswerId("");
    setIsItemModalOpen(true);
  };

  // Open Edit Item Modal
  const openEditItem = (categoryId: string, item: FaqItem) => {
    setEditingItem(item);
    setItemTargetCategoryId(categoryId);
    setItemQuestionEn(item.questionEn);
    setItemQuestionId(item.questionId);
    setItemAnswerEn(item.answerEn);
    setItemAnswerId(item.answerId);
    setIsItemModalOpen(true);
  };

  // Save Category
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catLabelEn.trim() || !catLabelId.trim()) {
      showToast("Label bahasa Inggris & Indonesia wajib diisi", "error");
      return;
    }

    startTransition(async () => {
      try {
        if (editingCategory) {
          await updateFaqCategory(editingCategory.id, {
            scope: catScope,
            solutionPageId: catScope === "SOLUTION" ? catSolutionId : null,
            productId: catScope === "PRODUCT" ? catProductId : null,
            key: catKey || catLabelEn.toLowerCase().replace(/\s+/g, "-"),
            labelEn: catLabelEn,
            labelId: catLabelId,
          });
          showToast("Kategori berhasil diperbarui");
        } else {
          await createFaqCategory({
            scope: catScope,
            solutionPageId: catScope === "SOLUTION" ? catSolutionId : null,
            productId: catScope === "PRODUCT" ? catProductId : null,
            key: catKey || catLabelEn.toLowerCase().replace(/\s+/g, "-"),
            labelEn: catLabelEn,
            labelId: catLabelId,
          });
          showToast("Kategori baru berhasil ditambahkan");
        }
        setIsCategoryModalOpen(false);
        router.refresh();
      } catch (err) {
        showToast(err instanceof Error ? err.message : "Gagal menyimpan kategori", "error");
      }
    });
  };

  // Delete Category
  const handleDeleteCategory = async (cat: FaqCategory) => {
    if (!confirm(`Hapus kategori "${cat.labelEn}" beserta semua pertanyaannya?`)) return;

    startTransition(async () => {
      try {
        await deleteFaqCategory(cat.id);
        showToast("Kategori berhasil dihapus");
        router.refresh();
      } catch (err) {
        showToast("Gagal menghapus kategori", "error");
      }
    });
  };

  // Save Item
  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemQuestionEn.trim() || !itemAnswerEn.trim()) {
      showToast("Pertanyaan & jawaban bahasa Inggris wajib diisi", "error");
      return;
    }

    startTransition(async () => {
      try {
        if (editingItem) {
          await updateFaqItem(editingItem.id, {
            questionEn: itemQuestionEn,
            questionId: itemQuestionId || itemQuestionEn,
            answerEn: itemAnswerEn,
            answerId: itemAnswerId || itemAnswerEn,
          });
          showToast("Pertanyaan FAQ berhasil diperbarui");
        } else {
          await createFaqItem({
            categoryId: itemTargetCategoryId,
            questionEn: itemQuestionEn,
            questionId: itemQuestionId || itemQuestionEn,
            answerEn: itemAnswerEn,
            answerId: itemAnswerId || itemAnswerEn,
          });
          showToast("Pertanyaan baru berhasil ditambahkan");
        }
        setIsItemModalOpen(false);
        router.refresh();
      } catch (err) {
        showToast("Gagal menyimpan pertanyaan FAQ", "error");
      }
    });
  };

  // Delete Item
  const handleDeleteItem = async (itemId: string) => {
    if (!confirm("Hapus pertanyaan FAQ ini?")) return;

    startTransition(async () => {
      try {
        await deleteFaqItem(itemId);
        showToast("Pertanyaan berhasil dihapus");
        router.refresh();
      } catch (err) {
        showToast("Gagal menghapus item", "error");
      }
    });
  };

  // Filter Categories
  const filteredCategories = initialCategories.filter((cat) => {
    if (scopeFilter !== "ALL" && cat.scope !== scopeFilter) return false;
    if (scopeFilter === "SOLUTION" && solutionFilter !== "ALL" && cat.solutionPageId !== solutionFilter) {
      return false;
    }
    if (scopeFilter === "PRODUCT" && productFilter !== "ALL" && cat.productId !== productFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchCat = cat.labelEn.toLowerCase().includes(q) || cat.labelId.toLowerCase().includes(q);
      const matchItem = cat.items.some(
        (i) =>
          i.questionEn.toLowerCase().includes(q) ||
          i.questionId.toLowerCase().includes(q) ||
          i.answerEn.toLowerCase().includes(q)
      );
      if (!matchCat && !matchItem) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {feedback && (
        <div
          className={`fixed right-6 top-6 z-50 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium shadow-2xl transition-all ${
            feedback.type === "success" ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
          }`}
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Header bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <HelpCircle className="h-6 w-6 text-[#00b2be]" />
            FAQ Manager
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Kelola pertanyaan yang sering diajukan untuk skala Global, per Kategori Solusi, atau per Produk.
          </p>
        </div>

        <button
          type="button"
          onClick={() => openCreateCategory()}
          className="inline-flex items-center gap-2 rounded-xl bg-[#ffcf00] px-4 py-2.5 text-sm font-bold text-black transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-yellow-500/10"
        >
          <Plus className="h-4 w-4 stroke-[3]" />
          Tambah Kategori FAQ
        </button>
      </div>

      {/* Filters & Search Row */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/80 p-4 backdrop-blur">
        {/* Scope Pill Filters */}
        <div className="flex items-center gap-1 rounded-xl bg-black/40 p-1 border border-white/5">
          <button
            type="button"
            onClick={() => setScopeFilter("ALL")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              scopeFilter === "ALL" ? "bg-[#00b2be] text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            Semua ({initialCategories.length})
          </button>
          <button
            type="button"
            onClick={() => setScopeFilter("GLOBAL")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              scopeFilter === "GLOBAL" ? "bg-[#00b2be] text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Globe className="h-3 w-3" />
            Global ({initialCategories.filter((c) => c.scope === "GLOBAL").length})
          </button>
          <button
            type="button"
            onClick={() => setScopeFilter("SOLUTION")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              scopeFilter === "SOLUTION" ? "bg-[#00b2be] text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Compass className="h-3 w-3" />
            Solusi ({initialCategories.filter((c) => c.scope === "SOLUTION").length})
          </button>
          <button
            type="button"
            onClick={() => setScopeFilter("PRODUCT")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              scopeFilter === "PRODUCT" ? "bg-[#00b2be] text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Box className="h-3 w-3" />
            Produk ({initialCategories.filter((c) => c.scope === "PRODUCT").length})
          </button>
        </div>

        {/* Specific Solution Selector when SOLUTION scope active */}
        {scopeFilter === "SOLUTION" && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">Pilih Solusi:</span>
            <select
              value={solutionFilter}
              onChange={(e) => setSolutionFilter(e.target.value)}
              className="rounded-xl border border-white/10 bg-black/50 px-3 py-1.5 text-xs text-white outline-none focus:border-[#00b2be]"
            >
              <option value="ALL">Semua Solusi</option>
              {solutions.map((sol) => (
                <option key={sol.id} value={sol.id}>
                  {sol.badgeText} ({sol.navLabelEn})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Specific Product Selector when PRODUCT scope active */}
        {scopeFilter === "PRODUCT" && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">Pilih Produk:</span>
            <select
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value)}
              className="rounded-xl border border-white/10 bg-black/50 px-3 py-1.5 text-xs text-white outline-none focus:border-[#00b2be]"
            >
              <option value="ALL">Semua Produk</option>
              {products.map((prod) => (
                <option key={prod.id} value={prod.id}>
                  {prod.nameEn}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Search */}
        <div className="relative ml-auto min-w-[240px] flex-1 sm:flex-initial">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Cari FAQ atau pertanyaan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/40 pl-9 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-[#00b2be]"
          />
        </div>
      </div>

      {/* Categories & Items Accordion List */}
      <div className="space-y-4">
        {filteredCategories.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-zinc-900/40 p-12 text-center">
            <HelpCircle className="mx-auto h-10 w-10 text-zinc-600 mb-3" />
            <h3 className="text-base font-semibold text-white">Belum ada Kategori FAQ untuk filter ini</h3>
            <p className="mt-1 text-xs text-zinc-400">
              Buat kategori pertama untuk melengkapi FAQ halaman website Anda.
            </p>
            <button
              type="button"
              onClick={() => openCreateCategory()}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#00b2be] px-4 py-2 text-xs font-bold text-white hover:bg-[#009aa5]"
            >
              <Plus className="h-3.5 w-3.5" />
              Tambah Kategori Sekarang
            </button>
          </div>
        ) : (
          filteredCategories.map((cat) => {
            const isExpanded = expandedCategories[cat.id] ?? false;
            return (
              <div
                key={cat.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/90 transition-all shadow-md"
              >
                {/* Category Header Card */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 hover:bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => toggleCategoryExpand(cat.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-zinc-300 hover:bg-white/10"
                    >
                      {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </button>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-base">{cat.labelEn}</span>
                        <span className="text-xs text-zinc-400">/ {cat.labelId}</span>

                        {/* Scope badge */}
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            cat.scope === "GLOBAL"
                              ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                              : cat.scope === "SOLUTION"
                              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                              : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          }`}
                        >
                          {cat.scope}
                        </span>

                        {cat.solutionPage && (
                          <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-300 border border-white/10 flex items-center gap-1">
                            <Compass className="h-2.5 w-2.5 text-[#00b2be]" />
                            {cat.solutionPage.badgeText}
                          </span>
                        )}
                        {cat.product && (
                          <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-300 border border-white/10 flex items-center gap-1">
                            <Box className="h-2.5 w-2.5 text-emerald-400" />
                            {cat.product.nameEn}
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-zinc-500">
                        Slug Key: <code className="text-zinc-400">{cat.key}</code> • {cat.items.length} pertanyaan
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openCreateItem(cat.id)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 px-3 py-1.5 text-xs font-semibold text-zinc-200 hover:bg-[#00b2be] hover:text-white transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Tambah Pertanyaan
                    </button>
                    <button
                      type="button"
                      onClick={() => openEditCategory(cat)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                      title="Edit Kategori"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(cat)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-rose-400 hover:bg-rose-500/20"
                      title="Hapus Kategori"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Items Accordion Body */}
                {isExpanded && (
                  <div className="border-t border-white/10 bg-black/30 p-4 space-y-3">
                    {cat.items.length === 0 ? (
                      <p className="py-4 text-center text-xs text-zinc-500">
                        Belum ada pertanyaan di kategori ini. Klik "Tambah Pertanyaan" di kanan atas.
                      </p>
                    ) : (
                      cat.items.map((item, itemIdx) => (
                        <div
                          key={item.id}
                          className="flex flex-col gap-2 rounded-xl border border-white/5 bg-zinc-900/60 p-3.5 hover:border-white/15 transition-all"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-[#ffcf00] text-xs">Q{itemIdx + 1}:</span>
                                <h4 className="font-semibold text-sm text-zinc-100">{item.questionEn}</h4>
                              </div>
                              <p className="text-xs text-zinc-400 italic">ID: {item.questionId}</p>
                              <div className="mt-2 text-xs text-zinc-300 leading-relaxed bg-black/30 rounded-lg p-2.5 border border-white/5">
                                <p className="text-zinc-200">{item.answerEn}</p>
                                {item.answerId !== item.answerEn && (
                                  <p className="mt-1 text-zinc-400 border-t border-white/5 pt-1">
                                    <span className="text-[10px] text-zinc-500">ID:</span> {item.answerId}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <button
                                type="button"
                                onClick={() => openEditItem(cat.id, item)}
                                className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                                title="Edit Pertanyaan"
                              >
                                <Edit2 className="h-3 w-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteItem(item.id)}
                                className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-rose-400 hover:bg-rose-500/20"
                                title="Hapus Pertanyaan"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* CATEGORY MODAL */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white">
                {editingCategory ? "Edit Kategori FAQ" : "Tambah Kategori FAQ Baru"}
              </h3>
              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(false)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="mt-4 space-y-4">
              {/* Target Scope */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Target Scope (Konteks Tampilan)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setCatScope("GLOBAL")}
                    className={`rounded-xl border p-2.5 text-xs font-bold text-center transition-all ${
                      catScope === "GLOBAL"
                        ? "border-[#00b2be] bg-[#00b2be]/20 text-[#00b2be]"
                        : "border-white/10 bg-black/40 text-zinc-400 hover:text-white"
                    }`}
                  >
                    Global (Umum)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCatScope("SOLUTION")}
                    className={`rounded-xl border p-2.5 text-xs font-bold text-center transition-all ${
                      catScope === "SOLUTION"
                        ? "border-[#00b2be] bg-[#00b2be]/20 text-[#00b2be]"
                        : "border-white/10 bg-black/40 text-zinc-400 hover:text-white"
                    }`}
                  >
                    Halaman Solusi
                  </button>
                  <button
                    type="button"
                    onClick={() => setCatScope("PRODUCT")}
                    className={`rounded-xl border p-2.5 text-xs font-bold text-center transition-all ${
                      catScope === "PRODUCT"
                        ? "border-[#00b2be] bg-[#00b2be]/20 text-[#00b2be]"
                        : "border-white/10 bg-black/40 text-zinc-400 hover:text-white"
                    }`}
                  >
                    Halaman Produk
                  </button>
                </div>
              </div>

              {/* Dynamic Solution Selector */}
              {catScope === "SOLUTION" && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Pilih Target Solusi
                  </label>
                  <select
                    value={catSolutionId}
                    onChange={(e) => setCatSolutionId(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-[#00b2be]"
                  >
                    {solutions.map((sol) => (
                      <option key={sol.id} value={sol.id}>
                        {sol.badgeText} — {sol.navLabelEn} ({sol.slug})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Dynamic Product Selector */}
              {catScope === "PRODUCT" && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Pilih Target Produk
                  </label>
                  <select
                    value={catProductId}
                    onChange={(e) => setCatProductId(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-[#00b2be]"
                  >
                    {products.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.nameEn}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Label EN */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  Nama Kategori (English)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. About MING Promotion"
                  value={catLabelEn}
                  onChange={(e) => setCatLabelEn(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-[#00b2be]"
                />
              </div>

              {/* Label ID */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  Nama Kategori (Bahasa Indonesia)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tentang MING Promotion"
                  value={catLabelId}
                  onChange={(e) => setCatLabelId(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-[#00b2be]"
                />
              </div>

              {/* Key */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  Slug Key (Opsional / Otomatis)
                </label>
                <input
                  type="text"
                  placeholder="e.g. about-ming"
                  value={catKey}
                  onChange={(e) => setCatKey(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm text-zinc-300 outline-none focus:border-[#00b2be]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-xl bg-[#00b2be] px-5 py-2 text-xs font-bold text-white hover:bg-[#009aa5] disabled:opacity-50"
                >
                  {isPending ? "Menyimpan..." : "Simpan Kategori"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FAQ ITEM MODAL */}
      {isItemModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white">
                {editingItem ? "Edit Pertanyaan FAQ" : "Tambah Pertanyaan FAQ"}
              </h3>
              <button
                type="button"
                onClick={() => setIsItemModalOpen(false)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  Pertanyaan (English)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. What is MING Promotion?"
                  value={itemQuestionEn}
                  onChange={(e) => setItemQuestionEn(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-[#00b2be]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  Pertanyaan (Bahasa Indonesia)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Apa itu MING Promotion?"
                  value={itemQuestionId}
                  onChange={(e) => setItemQuestionId(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-[#00b2be]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  Jawaban (English)
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tuliskan jawaban lengkap dalam bahasa Inggris..."
                  value={itemAnswerEn}
                  onChange={(e) => setItemAnswerEn(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-[#00b2be]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  Jawaban (Bahasa Indonesia)
                </label>
                <textarea
                  rows={4}
                  placeholder="Tuliskan jawaban lengkap dalam bahasa Indonesia..."
                  value={itemAnswerId}
                  onChange={(e) => setItemAnswerId(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-[#00b2be]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsItemModalOpen(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-xl bg-[#00b2be] px-5 py-2 text-xs font-bold text-white hover:bg-[#009aa5] disabled:opacity-50"
                >
                  {isPending ? "Menyimpan..." : "Simpan Pertanyaan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
