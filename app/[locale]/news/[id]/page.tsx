import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { Link } from "@/i18n/routing";
import { formatDate } from "@/lib/utils";

export default async function NewsDetailPage({
  params,
}: {
  params: { locale: string; id: string };
}) {
  setRequestLocale(params.locale);
  const t = await getTranslations();
  const item = await prisma.news.findUnique({ where: { id: params.id } });
  if (!item) notFound();

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Link href="/" className="text-sm font-semibold text-navy-700 hover:text-gold-600">
        ← {t("news.back")}
      </Link>
      <p className="mt-6 inline-flex rounded-full bg-gold-400 px-3 py-1 text-xs font-bold text-navy-950">
        {formatDate(item.date, params.locale)}
      </p>
      <h1 className="mt-4 text-3xl font-bold leading-tight text-navy-950">{item.title}</h1>
      {item.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.imageUrl}
          alt={item.title}
          className="mt-8 h-auto w-full rounded-2xl object-cover shadow-card"
        />
      ) : null}
      <div className="prose mt-8 max-w-none whitespace-pre-wrap leading-7 text-slate-700">
        {item.content}
      </div>
    </article>
  );
}
