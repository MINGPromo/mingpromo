import { prisma } from "@/lib/db";
import { SolutionPageManager } from "@/components/dashboard/solution-page-manager";
import type { SolutionPageInput } from "@/lib/solution-types";

export const dynamic = "force-dynamic";

export default async function SolutionPagesDashboard() {
  const pages = await prisma.solutionPage.findMany({
    orderBy: [{ order: "asc" }, { badgeText: "asc" }],
    include: {
      benefits: { orderBy: { order: "asc" } },
      filters: { orderBy: { order: "asc" } },
      products: { orderBy: { order: "asc" } },
      faqCategories: {
        orderBy: { order: "asc" },
        include: { items: { orderBy: { order: "asc" } } },
      },
    },
  });

  const initialPages = JSON.parse(JSON.stringify(pages)) as SolutionPageInput[];
  return <SolutionPageManager initialPages={initialPages} />;
}
