"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Megaphone, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { formatDate } from "@/lib/utils";
import type { News } from "@prisma/client";

export function HeroSlider({ news, locale }: { news: News[]; locale: string }) {
  const t = useTranslations();
  const [index, setIndex] = useState(0);
  const featured = news[index] ?? null;
  const sidebar = news.slice(0, 5);

  useEffect(() => {
    if (news.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % news.length);
    }, 7000);
    return () => clearInterval(id);
  }, [news.length]);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        {featured ? (
          <AnimatePresence mode="wait">
            <motion.article
              key={featured.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45 }}
              className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card"
            >
              <div className="p-6 sm:p-8">
                <span className="inline-flex rounded-full bg-gold-400 px-3 py-1 text-xs font-bold text-navy-950">
                  {formatDate(featured.date, locale)}
                </span>
                <h1 className="mt-4 text-2xl font-extrabold leading-snug text-navy-950 sm:text-3xl">
                  {featured.title}
                </h1>
                <p className="mt-4 line-clamp-5 text-sm leading-7 text-slate-600 sm:text-base">
                  {featured.content}
                </p>
                <Link
                  href={`/news/${featured.id}`}
                  className="mt-5 inline-block text-sm font-bold text-navy-700 hover:text-gold-600"
                >
                  {t("hero.readMore")} →
                </Link>
              </div>
              {featured.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={featured.imageUrl}
                  alt={featured.title}
                  className="h-64 w-full object-cover sm:h-80"
                />
              ) : null}
            </motion.article>
          </AnimatePresence>
        ) : (
          <div className="rounded-2xl bg-white p-10 text-slate-500 shadow-card">{t("news.empty")}</div>
        )}
      </div>

      <aside className="space-y-6">
        <div className="rounded-2xl bg-navy-900 p-6 text-white shadow-card">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gold-400 text-navy-950">
            <Megaphone className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-bold">{t("hero.infoTitle")}</h2>
          <p className="mt-2 text-sm leading-6 text-white/75">{t("hero.infoBody")}</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
          <div className="mb-4 flex items-center gap-2 text-navy-950">
            <Zap className="h-5 w-5 text-gold-500" />
            <h2 className="text-sm font-extrabold uppercase tracking-wide">{t("hero.latest")}</h2>
          </div>
          <ul className="divide-y divide-slate-100">
            {sidebar.map((item, i) => (
              <li key={item.id}>
                <Link href={`/news/${item.id}`} className="block py-3 hover:bg-slate-50">
                  <p className="text-xs text-slate-400">{formatDate(item.date, locale)}</p>
                  <p className={`mt-1 text-sm font-semibold ${i === index ? "text-navy-900" : "text-slate-700"}`}>
                    {item.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/directions"
            className="mt-4 inline-flex items-center text-sm font-semibold text-navy-700 hover:text-gold-600"
          >
            {t("hero.viewAll")} ↓
          </Link>
        </div>
      </aside>
    </div>
  );
}
