export const dynamic = "force-dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { CategoryGrid } from "@/components/CategoryGrid";
import { LabsSection } from "@/components/LabsSection";
import Image from "next/image";
import { Link } from "@/i18n/routing";

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
    <div className="min-h-screen bg-slate-50/50">
      {/* 1. Ekran kengligini to'liq (95%) egallovchi Yangiliklar to'ri */}
      <section className="mx-auto max-w-[95%] px-2 sm:px-4 lg:px-6 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          
          {/* Chap tomon: Barcha yangiliklar to'ri (3 ustun) */}
          <div className="lg:col-span-3">
            <h2 className="mb-4 text-xl font-bold text-navy-950 uppercase tracking-wide">
              {t("YANGILIKLAR VA VOQEALAR") || "YANGILIKLAR VA VOQEALAR"}
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="relative h-44 w-full bg-slate-100">
                    <Image
                      src={item.imageUrl || "https://i.postimg.cc/zG3j4DTC/photo-2026-09-17-14-08-37.jpg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-4">
                    <div>
                      <span className="text-[10px] font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                      <h3 className="mt-2 line-clamp-2 text-sm font-bold text-slate-900 leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-xs text-slate-600">
                        {item.content}
                      </p>
                    </div>
                    <div className="mt-4 border-t border-slate-100 pt-3">
                      <Link
                        href={`/news/${item.id}`}
                        className="text-xs font-bold text-navy-900 hover:text-orange-500"
                      >
                        Batafsil →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* O'ng tomon: Sidebar (Foydali manbalar va Oxirgi xabarlar) */}
          <div className="space-y-6 lg:col-span-1">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="border-b border-slate-100 pb-2 text-sm font-bold text-navy-950">
                Markaz axborot tizimi
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Ilmiy yangiliklar, laboratoriyalar va hujjatlar yagona portalda. So'nggi ma'lumotlarni kuzatib boring.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="border-b border-slate-100 pb-2 text-sm font-bold text-navy-950">
                ⚡ SO'NGGI MA'LUMOTLAR
              </h3>
              <div className="mt-3 divide-y divide-slate-100">
                {news.slice(0, 5).map((item) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.id}`}
                    className="block py-2.5 text-xs font-medium text-slate-700 hover:text-orange-500 transition-colors"
                  >
                    <p className="line-clamp-2 leading-snug">{item.title}</p>
                    <span className="mt-1 block text-[10px] text-slate-400">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Kategoriya va Laboratoriyalar qismi */}
      <div className="mx-auto max-w-[95%] px-2 sm:px-4 lg:px-6">
        <CategoryGrid />
        <LabsSection labs={labs} locale={params.locale} />
      </div>

      {/* 3. Biz haqimizda bo'limi */}
      <section className="mx-auto max-w-[95%] px-2 sm:px-4 lg:px-6 pb-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-navy-950">{t("about.title")}</h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-orange-500" />
          <p className="mt-5 leading-7 text-slate-600 text-sm sm:text-base">{t("about.body")}</p>
        </div>
      </section>
    </div>
  );
}