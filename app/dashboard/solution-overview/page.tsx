import { prisma } from "@/lib/db";
import { SolutionOverviewEditor } from "@/components/dashboard/solution-overview-editor";
import type { SolutionOverviewInput } from "@/app/actions/solution-overview";
import { solutionOverviewDefaults } from "@/lib/solution-overview-defaults";

export const dynamic = "force-dynamic";

const fallback: SolutionOverviewInput = solutionOverviewDefaults;

export default async function SolutionOverviewDashboardPage() {
  const overview = await prisma.solutionOverview.findUnique({ where: { id: "default" } });
  return <SolutionOverviewEditor initial={(overview ? JSON.parse(JSON.stringify(overview)) : fallback) as SolutionOverviewInput} />;
}
