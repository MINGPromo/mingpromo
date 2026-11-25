import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { getPublishedSolutionLinks } from "@/lib/solutions";
import { solutionOverviewDefaults } from "@/lib/solution-overview-defaults";
import { SolutionOverviewView } from "@/components/public/solutions/SolutionOverviewView";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const overview = await prisma.solutionOverview.findUnique({ where: { id: "default" } });
  return {
    title: overview?.seoTitleEn ?? "Our Solution | MING Promotion",
    description: overview?.seoDescriptionEn ?? solutionOverviewDefaults.seoDescriptionEn,
  };
}

export default async function OurSolutionPage() {
  const [overview, pages, solutionLinks, settings] = await Promise.all([
    prisma.solutionOverview.findUnique({ where: { id: "default" } }),
    prisma.solutionPage.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { badgeText: "asc" }],
      select: {
        slug: true,
        badgeText: true,
        navLabelEn: true,
        navLabelId: true,
        overviewHeadlineEn: true,
        overviewHeadlineId: true,
        heroImage: true,
      },
    }),
    getPublishedSolutionLinks(),
    prisma.setting.findMany({ where: { key: { in: ["footer_career_url", "footer_sitemap_url"] } }, select: { key: true, value: true } }),
  ]);
  const setting = Object.fromEntries(settings.map((item) => [item.key, item.value.trim()]));
  return (
    <SolutionOverviewView
      overview={overview ?? solutionOverviewDefaults}
      cards={pages}
      solutionLinks={solutionLinks}
      footerLinks={{ careerUrl: setting.footer_career_url, sitemapUrl: setting.footer_sitemap_url }}
    />
  );
}
