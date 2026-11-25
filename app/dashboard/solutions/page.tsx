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
      products: {
        orderBy: { order: "asc" },
        include: {
          gallery: { orderBy: { order: "asc" } },
          features: { orderBy: { order: "asc" } },
          locations: { orderBy: { order: "asc" } },
          caseStudies: { orderBy: { order: "asc" } },
          insights: {
            orderBy: { order: "asc" },
            include: { post: { select: { id: true, title: true, slug: true, excerpt: true, coverImage: true } } },
          },
        },
      },
      faqCategories: {
        orderBy: { order: "asc" },
        include: { items: { orderBy: { order: "asc" } } },
      },
    },
  });

  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, slug: true, excerpt: true, coverImage: true },
  });

  const initialPages = JSON.parse(JSON.stringify(pages)) as SolutionPageInput[];
  return <SolutionPageManager initialPages={initialPages} availablePosts={JSON.parse(JSON.stringify(posts))} />;
}
