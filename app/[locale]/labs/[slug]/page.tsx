import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { Link } from "@/i18n/routing";

export default async function LabDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(params.locale);
  const t = await getTranslations();
  const lab = await prisma.lab.findUnique({ where: { slug: params.slug } });
  if (!lab) notFound();

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
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Link href="/directions" className="text-sm font-semibold text-navy-700 hover:text-gold-600">
        ← {t("news.back")}
      </Link>
      <h1 className="mt-6 text-3xl font-bold text-navy-950">{name}</h1>
      <p className="mt-3 text-navy-700">
        {t("labs.head")}: <span className="font-semibold">{head}</span>
      </p>
      <p className="mt-6 leading-7 text-slate-700">{description}</p>
    </article>
  );
}
