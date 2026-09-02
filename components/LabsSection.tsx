"use client";

import { motion } from "framer-motion";
import { FlaskConical } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import type { Lab } from "@prisma/client";

export function LabsSection({ labs, locale }: { labs: Lab[]; locale: string }) {
  const t = useTranslations("labs");

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-extrabold text-navy-950 sm:text-3xl">{t("title")}</h2>
      <p className="mt-2 text-slate-500">{t("subtitle")}</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {labs.map((lab, i) => {
          const name = locale === "ru" ? lab.nameRu : locale === "en" ? lab.nameEn : lab.nameUz;
          const head = locale === "ru" ? lab.headRu : locale === "en" ? lab.headEn : lab.headUz;
          const description =
            locale === "ru" ? lab.descriptionRu : locale === "en" ? lab.descriptionEn : lab.descriptionUz;
          return (
            <motion.div
              key={lab.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <Link
                href={`/labs/${lab.slug}`}
                className="block h-full rounded-2xl border border-navy-950/10 bg-white p-6 shadow-card hover:border-gold-500/50"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-navy-950 text-gold-400">
                  <FlaskConical className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-navy-950">{name}</h3>
                <p className="mt-2 text-sm font-medium text-navy-700">
                  {t("head")}: {head}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
