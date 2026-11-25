"use server";

import { prisma } from "@/lib/db";
import { requireDashboardUser } from "@/lib/dashboard-auth";
import { revalidatePath } from "next/cache";
import { FaqCategoryInput, FaqItemInput, FaqScope } from "@/lib/solution-types";

function normalizeKey(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "") || "general";
}

export async function getFaqContextOptions() {
  await requireDashboardUser();
  const [solutions, products] = await Promise.all([
    prisma.solutionPage.findMany({
      select: { id: true, slug: true, badgeText: true, navLabelEn: true },
      orderBy: { order: "asc" },
    }),
    prisma.solutionProduct.findMany({
      select: { id: true, nameEn: true, slug: true, solutionPageId: true },
      orderBy: { order: "asc" },
    }),
  ]);

  return { solutions, products };
}

export async function getFaqCategories(filter?: {
  scope?: FaqScope | "ALL";
  solutionPageId?: string;
  productId?: string;
}) {
  const where: Record<string, unknown> = {};

  if (filter?.scope && filter.scope !== "ALL") {
    where.scope = filter.scope;
  }
  if (filter?.solutionPageId) {
    where.solutionPageId = filter.solutionPageId;
  }
  if (filter?.productId) {
    where.productId = filter.productId;
  }

  const categories = await prisma.faqCategory.findMany({
    where,
    include: {
      items: {
        orderBy: { order: "asc" },
      },
      solutionPage: {
        select: { id: true, slug: true, badgeText: true },
      },
      product: {
        select: { id: true, nameEn: true, slug: true },
      },
    },
    orderBy: { order: "asc" },
  });

  return categories;
}

export async function createFaqCategory(input: {
  scope: FaqScope;
  solutionPageId?: string | null;
  productId?: string | null;
  key: string;
  labelEn: string;
  labelId: string;
}) {
  await requireDashboardUser();

  const key = normalizeKey(input.key);
  const highestOrder = await prisma.faqCategory.aggregate({
    _max: { order: true },
    where: {
      scope: input.scope,
      solutionPageId: input.solutionPageId || null,
      productId: input.productId || null,
    },
  });

  const nextOrder = (highestOrder._max.order ?? -1) + 1;

  const category = await prisma.faqCategory.create({
    data: {
      scope: input.scope,
      solutionPageId: input.scope === "SOLUTION" ? input.solutionPageId : null,
      productId: input.scope === "PRODUCT" ? input.productId : null,
      key,
      labelEn: input.labelEn.trim(),
      labelId: input.labelId.trim(),
      order: nextOrder,
    },
  });

  revalidateFaqPaths(input.solutionPageId);
  return { success: true as const, category };
}

export async function updateFaqCategory(
  id: string,
  input: {
    scope?: FaqScope;
    solutionPageId?: string | null;
    productId?: string | null;
    key?: string;
    labelEn?: string;
    labelId?: string;
  }
) {
  await requireDashboardUser();

  const existing = await prisma.faqCategory.findUnique({
    where: { id },
    select: { solutionPageId: true },
  });

  const updateData: Record<string, unknown> = {};
  if (input.scope !== undefined) updateData.scope = input.scope;
  if (input.solutionPageId !== undefined) {
    updateData.solutionPageId = input.scope === "SOLUTION" ? input.solutionPageId : null;
  }
  if (input.productId !== undefined) {
    updateData.productId = input.scope === "PRODUCT" ? input.productId : null;
  }
  if (input.key !== undefined) updateData.key = normalizeKey(input.key);
  if (input.labelEn !== undefined) updateData.labelEn = input.labelEn.trim();
  if (input.labelId !== undefined) updateData.labelId = input.labelId.trim();

  const category = await prisma.faqCategory.update({
    where: { id },
    data: updateData,
  });

  revalidateFaqPaths(existing?.solutionPageId || input.solutionPageId);
  return { success: true as const, category };
}

export async function deleteFaqCategory(id: string) {
  await requireDashboardUser();

  const existing = await prisma.faqCategory.findUnique({
    where: { id },
    select: { solutionPageId: true },
  });

  await prisma.faqCategory.delete({ where: { id } });

  revalidateFaqPaths(existing?.solutionPageId);
  return { success: true as const };
}

export async function createFaqItem(input: {
  categoryId: string;
  questionEn: string;
  questionId: string;
  answerEn: string;
  answerId: string;
}) {
  await requireDashboardUser();

  const highestOrder = await prisma.faqItem.aggregate({
    _max: { order: true },
    where: { categoryId: input.categoryId },
  });
  const nextOrder = (highestOrder._max.order ?? -1) + 1;

  const item = await prisma.faqItem.create({
    data: {
      categoryId: input.categoryId,
      questionEn: input.questionEn.trim(),
      questionId: input.questionId.trim(),
      answerEn: input.answerEn.trim(),
      answerId: input.answerId.trim(),
      order: nextOrder,
      isActive: true,
    },
  });

  const cat = await prisma.faqCategory.findUnique({
    where: { id: input.categoryId },
    select: { solutionPageId: true },
  });
  revalidateFaqPaths(cat?.solutionPageId);

  return { success: true as const, item };
}

export async function updateFaqItem(
  id: string,
  input: {
    questionEn?: string;
    questionId?: string;
    answerEn?: string;
    answerId?: string;
    isActive?: boolean;
  }
) {
  await requireDashboardUser();

  const item = await prisma.faqItem.update({
    where: { id },
    data: {
      ...(input.questionEn !== undefined && { questionEn: input.questionEn.trim() }),
      ...(input.questionId !== undefined && { questionId: input.questionId.trim() }),
      ...(input.answerEn !== undefined && { answerEn: input.answerEn.trim() }),
      ...(input.answerId !== undefined && { answerId: input.answerId.trim() }),
      ...(input.isActive !== undefined && { isActive: Boolean(input.isActive) }),
    },
    include: {
      category: { select: { solutionPageId: true } },
    },
  });

  revalidateFaqPaths(item.category.solutionPageId);
  return { success: true as const, item };
}

export async function deleteFaqItem(id: string) {
  await requireDashboardUser();

  const item = await prisma.faqItem.findUnique({
    where: { id },
    include: { category: { select: { solutionPageId: true } } },
  });

  await prisma.faqItem.delete({ where: { id } });

  revalidateFaqPaths(item?.category.solutionPageId);
  return { success: true as const };
}

async function revalidateFaqPaths(solutionPageId?: string | null) {
  revalidatePath("/dashboard/faq");
  revalidatePath("/dashboard/solutions");
  revalidatePath("/");

  if (solutionPageId) {
    const page = await prisma.solutionPage.findUnique({
      where: { id: solutionPageId },
      select: { slug: true },
    });
    if (page?.slug) {
      revalidatePath(`/solutions/${page.slug}`);
    }
  }
}
