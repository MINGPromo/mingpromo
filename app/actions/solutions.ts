"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireDashboardUser } from "@/lib/dashboard-auth";
import type {
  SolutionBenefitInput,
  SolutionFaqCategoryInput,
  SolutionFaqItemInput,
  SolutionFilterInput,
  SolutionPageInput,
  SolutionProductInput,
} from "@/lib/solution-types";

const pageFields = [
  "badgeText",
  "navLabelEn",
  "heroTitleEn",
  "heroDescriptionEn",
  "heroImage",
  "introTitleEn",
  "introBodyEn",
  "introImage",
  "benefitsTitleEn",
  "productsTitleEn",
  "seoTitleEn",
  "seoDescriptionEn",
] as const;

function normalizeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeFilterKey(value: string) {
  return normalizeSlug(value);
}

function validatePage(input: SolutionPageInput) {
  const slug = normalizeSlug(input.slug);
  if (!slug) throw new Error("Slug wajib diisi.");

  for (const field of pageFields) {
    if (!String(input[field] ?? "").trim()) {
      throw new Error(`Field ${field} wajib diisi.`);
    }
  }

  const filterKeys = input.filters.map((item) => normalizeFilterKey(item.key));
  if (filterKeys.some((key) => !key)) throw new Error("Semua filter harus memiliki key.");
  if (new Set(filterKeys).size !== filterKeys.length) throw new Error("Key filter tidak boleh duplikat.");

  const faqKeys = input.faqCategories.map((item) => normalizeFilterKey(item.key));
  if (faqKeys.some((key) => !key)) throw new Error("Semua kategori FAQ harus memiliki key.");
  if (new Set(faqKeys).size !== faqKeys.length) throw new Error("Key kategori FAQ tidak boleh duplikat.");

  return slug;
}

function scalarPageData(input: SolutionPageInput, slug: string) {
  return {
    slug,
    badgeText: input.badgeText.trim(),
    navLabelEn: input.navLabelEn.trim(),
    navLabelId: input.navLabelId.trim(),
    heroTitleEn: input.heroTitleEn.trim(),
    heroTitleId: input.heroTitleId.trim(),
    heroDescriptionEn: input.heroDescriptionEn.trim(),
    heroDescriptionId: input.heroDescriptionId.trim(),
    heroImage: input.heroImage.trim(),
    primaryCtaLabelEn: input.primaryCtaLabelEn.trim(),
    primaryCtaLabelId: input.primaryCtaLabelId.trim(),
    primaryCtaHref: input.primaryCtaHref.trim(),
    secondaryCtaLabelEn: input.secondaryCtaLabelEn.trim(),
    secondaryCtaLabelId: input.secondaryCtaLabelId.trim(),
    secondaryCtaHref: input.secondaryCtaHref.trim(),
    introEyebrowEn: input.introEyebrowEn.trim(),
    introEyebrowId: input.introEyebrowId.trim(),
    introTitleEn: input.introTitleEn.trim(),
    introTitleId: input.introTitleId.trim(),
    introBodyEn: input.introBodyEn.trim(),
    introBodyId: input.introBodyId.trim(),
    introImage: input.introImage.trim(),
    benefitsTitleEn: input.benefitsTitleEn.trim(),
    benefitsTitleId: input.benefitsTitleId.trim(),
    benefitsDescriptionEn: input.benefitsDescriptionEn.trim(),
    benefitsDescriptionId: input.benefitsDescriptionId.trim(),
    productsTitleEn: input.productsTitleEn.trim(),
    productsTitleId: input.productsTitleId.trim(),
    productsDescriptionEn: input.productsDescriptionEn.trim(),
    productsDescriptionId: input.productsDescriptionId.trim(),
    faqTitleEn: input.faqTitleEn.trim(),
    faqTitleId: input.faqTitleId.trim(),
    ctaTitleEn: input.ctaTitleEn.trim(),
    ctaTitleId: input.ctaTitleId.trim(),
    ctaEmphasisEn: input.ctaEmphasisEn.trim(),
    ctaEmphasisId: input.ctaEmphasisId.trim(),
    ctaDescriptionEn: input.ctaDescriptionEn.trim(),
    ctaDescriptionId: input.ctaDescriptionId.trim(),
    ctaButtonLabelEn: input.ctaButtonLabelEn.trim(),
    ctaButtonLabelId: input.ctaButtonLabelId.trim(),
    ctaButtonHref: input.ctaButtonHref.trim(),
    seoTitleEn: input.seoTitleEn.trim(),
    seoTitleId: input.seoTitleId.trim(),
    seoDescriptionEn: input.seoDescriptionEn.trim(),
    seoDescriptionId: input.seoDescriptionId.trim(),
    published: Boolean(input.published),
    order: Number(input.order) || 0,
  };
}

async function syncBenefits(tx: Prisma.TransactionClient, pageId: string, items: SolutionBenefitInput[]) {
  const retained = items.flatMap((item) => (item.id ? [item.id] : []));
  await tx.solutionBenefit.deleteMany({
    where: { solutionPageId: pageId, ...(retained.length ? { id: { notIn: retained } } : {}) },
  });

  for (let order = 0; order < items.length; order += 1) {
    const item = items[order];
    const data = { titleEn: item.titleEn, titleId: item.titleId, descriptionEn: item.descriptionEn, descriptionId: item.descriptionId, order };
    const existing = item.id ? await tx.solutionBenefit.findFirst({ where: { id: item.id, solutionPageId: pageId }, select: { id: true } }) : null;
    if (existing) await tx.solutionBenefit.update({ where: { id: existing.id }, data });
    else await tx.solutionBenefit.create({ data: { ...data, solutionPageId: pageId } });
  }
}

async function syncFilters(tx: Prisma.TransactionClient, pageId: string, items: SolutionFilterInput[]) {
  const retained = items.flatMap((item) => (item.id ? [item.id] : []));
  await tx.solutionFilter.deleteMany({
    where: { solutionPageId: pageId, ...(retained.length ? { id: { notIn: retained } } : {}) },
  });

  for (let order = 0; order < items.length; order += 1) {
    const item = items[order];
    const data = { key: normalizeFilterKey(item.key), labelEn: item.labelEn, labelId: item.labelId, order };
    const existing = item.id ? await tx.solutionFilter.findFirst({ where: { id: item.id, solutionPageId: pageId }, select: { id: true } }) : null;
    if (existing) await tx.solutionFilter.update({ where: { id: existing.id }, data });
    else await tx.solutionFilter.create({ data: { ...data, solutionPageId: pageId } });
  }
}

async function syncProducts(tx: Prisma.TransactionClient, pageId: string, items: SolutionProductInput[]) {
  const retained = items.flatMap((item) => (item.id ? [item.id] : []));
  await tx.solutionProduct.deleteMany({
    where: { solutionPageId: pageId, ...(retained.length ? { id: { notIn: retained } } : {}) },
  });

  for (let order = 0; order < items.length; order += 1) {
    const item = items[order];
    const data = {
      nameEn: item.nameEn,
      nameId: item.nameId,
      imageUrl: item.imageUrl,
      imageAltEn: item.imageAltEn,
      imageAltId: item.imageAltId,
      tagLabelEn: item.tagLabelEn,
      tagLabelId: item.tagLabelId,
      filterKeys: item.filterKeys.split(/[\s,]+/).map(normalizeFilterKey).filter(Boolean).join(" "),
      href: item.href,
      isActive: Boolean(item.isActive),
      order,
    };
    const existing = item.id ? await tx.solutionProduct.findFirst({ where: { id: item.id, solutionPageId: pageId }, select: { id: true } }) : null;
    if (existing) await tx.solutionProduct.update({ where: { id: existing.id }, data });
    else await tx.solutionProduct.create({ data: { ...data, solutionPageId: pageId } });
  }
}

async function syncFaqItems(tx: Prisma.TransactionClient, categoryId: string, items: SolutionFaqItemInput[]) {
  const retained = items.flatMap((item) => (item.id ? [item.id] : []));
  await tx.solutionFaqItem.deleteMany({
    where: { categoryId, ...(retained.length ? { id: { notIn: retained } } : {}) },
  });

  for (let order = 0; order < items.length; order += 1) {
    const item = items[order];
    const data = { questionEn: item.questionEn, questionId: item.questionId, answerEn: item.answerEn, answerId: item.answerId, order };
    const existing = item.id ? await tx.solutionFaqItem.findFirst({ where: { id: item.id, categoryId }, select: { id: true } }) : null;
    if (existing) await tx.solutionFaqItem.update({ where: { id: existing.id }, data });
    else await tx.solutionFaqItem.create({ data: { ...data, categoryId } });
  }
}

async function syncFaqCategories(tx: Prisma.TransactionClient, pageId: string, categories: SolutionFaqCategoryInput[]) {
  const retained = categories.flatMap((item) => (item.id ? [item.id] : []));
  await tx.solutionFaqCategory.deleteMany({
    where: { solutionPageId: pageId, ...(retained.length ? { id: { notIn: retained } } : {}) },
  });

  for (let order = 0; order < categories.length; order += 1) {
    const item = categories[order];
    const data = { key: normalizeFilterKey(item.key), labelEn: item.labelEn, labelId: item.labelId, order };
    const existing = item.id ? await tx.solutionFaqCategory.findFirst({ where: { id: item.id, solutionPageId: pageId }, select: { id: true } }) : null;
    const category = existing
      ? await tx.solutionFaqCategory.update({ where: { id: existing.id }, data, select: { id: true } })
      : await tx.solutionFaqCategory.create({ data: { ...data, solutionPageId: pageId }, select: { id: true } });
    await syncFaqItems(tx, category.id, item.items);
  }
}

export async function saveSolutionPage(input: SolutionPageInput) {
  await requireDashboardUser();
  const slug = validatePage(input);

  try {
    const result = await prisma.$transaction(async (tx) => {
      const scalar = scalarPageData(input, slug);
      const page = input.id
        ? await tx.solutionPage.update({ where: { id: input.id }, data: scalar, select: { id: true, slug: true } })
        : await tx.solutionPage.create({ data: scalar, select: { id: true, slug: true } });

      await syncBenefits(tx, page.id, input.benefits);
      await syncFilters(tx, page.id, input.filters);
      await syncProducts(tx, page.id, input.products);
      await syncFaqCategories(tx, page.id, input.faqCategories);
      return page;
    });

    revalidatePath("/");
    revalidatePath("/dashboard/solutions");
    revalidatePath(`/solutions/${result.slug}`);
    return { success: true as const, ...result };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Gagal menyimpan solution page.";
    return { success: false as const, error: message };
  }
}

export async function createSolutionDraft() {
  await requireDashboardUser();
  let counter = 1;
  let slug = "new-solution";
  while (await prisma.solutionPage.findUnique({ where: { slug }, select: { id: true } })) {
    counter += 1;
    slug = `new-solution-${counter}`;
  }

  const page = await prisma.solutionPage.create({
    data: {
      slug,
      badgeText: "NEW SOLUTION",
      navLabelEn: "New Solution",
      navLabelId: "Solusi Baru",
      heroTitleEn: "NEW SOLUTION",
      heroTitleId: "SOLUSI BARU",
      heroDescriptionEn: "Describe the solution and the audience it reaches.",
      heroDescriptionId: "Jelaskan solusi dan audiens yang dijangkaunya.",
      heroImage: "/assets/media/eco-the-movement.webp",
      introTitleEn: "Introduce the Solution",
      introTitleId: "Perkenalkan Solusi",
      introBodyEn: "Add the solution introduction here.",
      introBodyId: "Tambahkan pengantar solusi di sini.",
      introImage: "/assets/media/eco-the-movement.webp",
      benefitsTitleEn: "Why Choose This Solution?",
      benefitsTitleId: "Mengapa Memilih Solusi Ini?",
      benefitsDescriptionEn: "Explain the most important value of this solution.",
      benefitsDescriptionId: "Jelaskan nilai terpenting dari solusi ini.",
      productsTitleEn: "Explore Our Media",
      productsTitleId: "Jelajahi Media Kami",
      productsDescriptionEn: "Add relevant products, inventory, or placements.",
      productsDescriptionId: "Tambahkan produk, inventori, atau penempatan yang relevan.",
      ctaTitleEn: "Your brand,",
      ctaTitleId: "Brand Anda,",
      ctaEmphasisEn: "our stage.",
      ctaEmphasisId: "panggung kami.",
      ctaDescriptionEn: "Tell us about your campaign goals.",
      ctaDescriptionId: "Ceritakan tujuan kampanye Anda.",
      seoTitleEn: "New Solution | MING Promotion",
      seoTitleId: "Solusi Baru | MING Promotion",
      seoDescriptionEn: "Explore this solution from MING Promotion.",
      seoDescriptionId: "Jelajahi solusi dari MING Promotion.",
    },
    select: { id: true },
  });

  revalidatePath("/dashboard/solutions");
  return { success: true as const, id: page.id };
}

export async function duplicateSolutionPage(id: string) {
  await requireDashboardUser();
  const source = await prisma.solutionPage.findUnique({
    where: { id },
    include: { benefits: true, filters: true, products: true, faqCategories: { include: { items: true } } },
  });
  if (!source) return { success: false as const, error: "Solution page tidak ditemukan." };

  let counter = 1;
  let slug = `${source.slug}-copy`;
  while (await prisma.solutionPage.findUnique({ where: { slug }, select: { id: true } })) {
    counter += 1;
    slug = `${source.slug}-copy-${counter}`;
  }

  const sourceData = scalarPageData(source as SolutionPageInput, slug);
  const duplicate = await prisma.solutionPage.create({
    data: {
      ...sourceData,
      slug,
      badgeText: `${source.badgeText} COPY`,
      published: false,
      benefits: { create: source.benefits.map((item) => ({ titleEn: item.titleEn, titleId: item.titleId, descriptionEn: item.descriptionEn, descriptionId: item.descriptionId, order: item.order })) },
      filters: { create: source.filters.map((item) => ({ key: item.key, labelEn: item.labelEn, labelId: item.labelId, order: item.order })) },
      products: { create: source.products.map((item) => ({ nameEn: item.nameEn, nameId: item.nameId, imageUrl: item.imageUrl, imageAltEn: item.imageAltEn, imageAltId: item.imageAltId, tagLabelEn: item.tagLabelEn, tagLabelId: item.tagLabelId, filterKeys: item.filterKeys, href: item.href, order: item.order, isActive: item.isActive })) },
      faqCategories: {
        create: source.faqCategories.map((category) => ({
          key: category.key,
          labelEn: category.labelEn,
          labelId: category.labelId,
          order: category.order,
          items: { create: category.items.map((item) => ({ questionEn: item.questionEn, questionId: item.questionId, answerEn: item.answerEn, answerId: item.answerId, order: item.order })) },
        })),
      },
    },
    select: { id: true },
  });

  revalidatePath("/dashboard/solutions");
  return { success: true as const, id: duplicate.id };
}

export async function deleteSolutionPage(id: string) {
  await requireDashboardUser();
  const page = await prisma.solutionPage.findUnique({ where: { id }, select: { slug: true } });
  if (!page) return { success: false as const, error: "Solution page tidak ditemukan." };
  await prisma.solutionPage.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/dashboard/solutions");
  revalidatePath(`/solutions/${page.slug}`);
  return { success: true as const };
}
