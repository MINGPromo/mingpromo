"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireDashboardUser } from "@/lib/dashboard-auth";

export type SolutionOverviewInput = {
  heroEyebrowEn: string; heroEyebrowId: string; heroTitleEn: string; heroTitleId: string;
  heroDescriptionEn: string; heroDescriptionId: string; heroImage: string;
  heroPrimaryCtaLabelEn: string; heroPrimaryCtaLabelId: string; heroPrimaryCtaHref: string;
  heroSecondaryCtaLabelEn: string; heroSecondaryCtaLabelId: string; heroSecondaryCtaHref: string;
  heroSupportingLineEn: string; heroSupportingLineId: string;
  introEyebrowEn: string; introEyebrowId: string; introTitleEn: string; introTitleId: string;
  introBodyEn: string; introBodyId: string; ctaTitleEn: string; ctaTitleId: string;
  layersEyebrowEn: string; layersEyebrowId: string; layersTitleEn: string; layersTitleId: string;
  layersDescriptionEn: string; layersDescriptionId: string;
  ctaEmphasisEn: string; ctaEmphasisId: string; ctaDescriptionEn: string; ctaDescriptionId: string;
  ctaButtonLabelEn: string; ctaButtonLabelId: string; ctaButtonHref: string;
  ctaSecondaryButtonLabelEn: string; ctaSecondaryButtonLabelId: string; ctaSecondaryButtonHref: string;
  ctaReassuranceEn: string; ctaReassuranceId: string;
  seoTitleEn: string; seoTitleId: string; seoDescriptionEn: string; seoDescriptionId: string;
};

export async function saveSolutionOverview(input: SolutionOverviewInput) {
  await requireDashboardUser();
  const required = ["heroTitleEn", "heroTitleId", "heroDescriptionEn", "heroDescriptionId", "heroImage", "heroPrimaryCtaLabelEn", "heroPrimaryCtaLabelId", "heroPrimaryCtaHref", "heroSecondaryCtaLabelEn", "heroSecondaryCtaLabelId", "heroSecondaryCtaHref", "introTitleEn", "introTitleId", "introBodyEn", "introBodyId", "layersTitleEn", "layersTitleId", "layersDescriptionEn", "layersDescriptionId", "ctaTitleEn", "ctaTitleId", "ctaButtonLabelEn", "ctaButtonLabelId", "ctaButtonHref", "ctaSecondaryButtonLabelEn", "ctaSecondaryButtonLabelId", "ctaSecondaryButtonHref", "seoTitleEn", "seoTitleId", "seoDescriptionEn", "seoDescriptionId"] as const;
  for (const field of required) {
    if (!input[field]?.trim()) return { success: false as const, error: `${field} wajib diisi.` };
  }

  try {
    const data: SolutionOverviewInput = {
      heroEyebrowEn: input.heroEyebrowEn.trim(), heroEyebrowId: input.heroEyebrowId.trim(), heroTitleEn: input.heroTitleEn.trim(), heroTitleId: input.heroTitleId.trim(),
      heroDescriptionEn: input.heroDescriptionEn.trim(), heroDescriptionId: input.heroDescriptionId.trim(), heroImage: input.heroImage.trim(),
      heroPrimaryCtaLabelEn: input.heroPrimaryCtaLabelEn.trim(), heroPrimaryCtaLabelId: input.heroPrimaryCtaLabelId.trim(), heroPrimaryCtaHref: input.heroPrimaryCtaHref.trim(),
      heroSecondaryCtaLabelEn: input.heroSecondaryCtaLabelEn.trim(), heroSecondaryCtaLabelId: input.heroSecondaryCtaLabelId.trim(), heroSecondaryCtaHref: input.heroSecondaryCtaHref.trim(), heroSupportingLineEn: input.heroSupportingLineEn.trim(), heroSupportingLineId: input.heroSupportingLineId.trim(),
      introEyebrowEn: input.introEyebrowEn.trim(), introEyebrowId: input.introEyebrowId.trim(), introTitleEn: input.introTitleEn.trim(), introTitleId: input.introTitleId.trim(), introBodyEn: input.introBodyEn.trim(), introBodyId: input.introBodyId.trim(),
      layersEyebrowEn: input.layersEyebrowEn.trim(), layersEyebrowId: input.layersEyebrowId.trim(), layersTitleEn: input.layersTitleEn.trim(), layersTitleId: input.layersTitleId.trim(), layersDescriptionEn: input.layersDescriptionEn.trim(), layersDescriptionId: input.layersDescriptionId.trim(),
      ctaTitleEn: input.ctaTitleEn.trim(), ctaTitleId: input.ctaTitleId.trim(), ctaEmphasisEn: input.ctaEmphasisEn.trim(), ctaEmphasisId: input.ctaEmphasisId.trim(), ctaDescriptionEn: input.ctaDescriptionEn.trim(), ctaDescriptionId: input.ctaDescriptionId.trim(), ctaButtonLabelEn: input.ctaButtonLabelEn.trim(), ctaButtonLabelId: input.ctaButtonLabelId.trim(), ctaButtonHref: input.ctaButtonHref.trim(),
      ctaSecondaryButtonLabelEn: input.ctaSecondaryButtonLabelEn.trim(), ctaSecondaryButtonLabelId: input.ctaSecondaryButtonLabelId.trim(), ctaSecondaryButtonHref: input.ctaSecondaryButtonHref.trim(), ctaReassuranceEn: input.ctaReassuranceEn.trim(), ctaReassuranceId: input.ctaReassuranceId.trim(),
      seoTitleEn: input.seoTitleEn.trim(), seoTitleId: input.seoTitleId.trim(), seoDescriptionEn: input.seoDescriptionEn.trim(), seoDescriptionId: input.seoDescriptionId.trim(),
    };
    const overview = await prisma.solutionOverview.upsert({ where: { id: "default" }, update: data, create: { id: "default", ...data } });
    revalidatePath("/solutions");
    revalidatePath("/dashboard/solution-overview");
    return { success: true as const, id: overview.id };
  } catch (error) {
    return { success: false as const, error: error instanceof Error ? error.message : "Gagal menyimpan overview solution." };
  }
}
