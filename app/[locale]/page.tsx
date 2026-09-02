import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { HeroSlider } from "@/components/HeroSlider";
import { CategoryGrid } from "@/components/CategoryGrid";
import { LabsSection } from "@/components/LabsSection";

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const t = await getTranslations();

  const [news, labs] = await Promise.all([
    prisma.news.findMany({
      where: { language: params.locale },
      orderBy: { date: "desc" },
    }),
    prisma.lab.findMany({ orderBy: { nameEn: "asc" } }),
  ]);

  return (
    <div className="hex-grid">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <HeroSlider news={news} locale={params.locale} />
      </section>
      <CategoryGrid />
      <LabsSection labs={labs} locale={params.locale} />
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-card">
          <h2 className="text-2xl font-bold text-navy-950">{t("about.title")}</h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-orange-500" />
          <p className="mt-5 max-w-4xl leading-7 text-slate-600">{t("about.body")}</p>
        </div>
      </section>
    </div>
  );
}
