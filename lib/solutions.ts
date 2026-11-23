import { prisma } from "@/lib/db";
import type { SolutionNavLink } from "@/lib/solution-types";

export async function getPublishedSolutionLinks(): Promise<SolutionNavLink[]> {
  return prisma.solutionPage.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { badgeText: "asc" }],
    select: { slug: true, badgeText: true, navLabelEn: true, navLabelId: true },
  });
}
