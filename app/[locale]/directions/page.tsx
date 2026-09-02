import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { Link } from "@/i18n/routing";
import { Microscope } from "lucide-react";

export default async function DirectionsPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const t = await getTranslations();
  const labs = await prisma.lab.findMany({ orderBy: { nameEn: "asc" } });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-navy-950">{t("directionsPage.title")}</h1>
      <p className="mt-3 max-w-3xl text-slate-600">{t("directionsPage.intro")}</p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {labs.map((lab) => {
          const name =
            params.locale === "ru" ? lab.nameRu : params.locale === "en" ? lab.nameEn : lab.nameUz;
          const head =
            params.locale === "ru" ? lab.headRu : params.locale === "en" ? lab.headEn : lab.headUz;
          const description =
            params.locale === "ru"
              ? lab.descriptionRu
              : params.locale === "en"
                ? lab.descriptionEn
                : lab.descriptionUz;
          return (
            <Link
              key={lab.id}
              href={`/labs/${lab.slug}`}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy-950 text-gold-400">
                <Microscope className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-bold text-navy-950">{name}</h2>
              <p className="mt-2 text-sm font-medium text-navy-700">
                {t("labs.head")}: {head}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
