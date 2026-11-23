import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getPublishedSolutionLinks } from "@/lib/solutions";
import type { SolutionPageInput } from "@/lib/solution-types";
import { SolutionPageView } from "@/components/public/solutions/SolutionPageView";

interface SolutionRouteProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}

async function getSolution(slug: string) {
  return prisma.solutionPage.findUnique({
    where: { slug },
    include: {
      benefits: { orderBy: { order: "asc" } },
      filters: { orderBy: { order: "asc" } },
      products: { where: { isActive: true }, orderBy: { order: "asc" } },
      faqCategories: {
        orderBy: { order: "asc" },
        include: { items: { orderBy: { order: "asc" } } },
      },
    },
  });
}

export async function generateMetadata({ params }: Pick<SolutionRouteProps, "params">): Promise<Metadata> {
  const { slug } = await params;
  const page = await prisma.solutionPage.findUnique({ where: { slug } });
  if (!page || !page.published) return {};

  return {
    title: page.seoTitleEn,
    description: page.seoDescriptionEn,
    openGraph: {
      title: page.seoTitleEn,
      description: page.seoDescriptionEn,
      images: page.heroImage ? [page.heroImage] : undefined,
    },
  };
}

export default async function SolutionRoute({ params, searchParams }: SolutionRouteProps) {
  const [{ slug }, query, cookieStore] = await Promise.all([params, searchParams, cookies()]);
  const page = await getSolution(slug);
  const isPreview = query.preview === "1" && cookieStore.get("ming_session")?.value === "true";

  if (!page || (!page.published && !isPreview)) notFound();

  const solutionLinks = await getPublishedSolutionLinks();
  const serializedPage = JSON.parse(JSON.stringify(page)) as SolutionPageInput;

  return <SolutionPageView page={serializedPage} solutionLinks={solutionLinks} preview={isPreview && !page.published} />;
}
