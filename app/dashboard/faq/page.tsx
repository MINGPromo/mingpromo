import { Suspense } from "react";
import { getFaqCategories, getFaqContextOptions } from "@/app/actions/faq";
import { FaqManager } from "@/components/dashboard/faq-manager";

export const dynamic = "force-dynamic";

export default async function FaqDashboardPage() {
  const [categories, { solutions, products }] = await Promise.all([
    getFaqCategories(),
    getFaqContextOptions(),
  ]);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <Suspense fallback={<div className="text-zinc-400 text-sm">Memuat FAQ Manager...</div>}>
        <FaqManager
          initialCategories={categories}
          solutions={solutions}
          products={products}
        />
      </Suspense>
    </div>
  );
}
