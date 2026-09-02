"use client";

import { motion } from "framer-motion";
import { Users, Microscope, FileText, FolderOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const items = [
  { key: "staff", href: "/directions", icon: Users },
  { key: "labs", href: "/directions", icon: Microscope },
  { key: "articles", href: "/directions", icon: FileText },
  { key: "docs", href: "/directions", icon: FolderOpen },
] as const;

export function CategoryGrid() {
  const t = useTranslations("categories");

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-2xl font-extrabold text-navy-950 sm:text-3xl">{t("title")}</h2>
        <p className="mt-2 text-slate-500">{t("subtitle")}</p>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-orange-500" />
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                href={item.href}
                className="flex h-full gap-4 rounded-2xl bg-slate-100/80 p-6 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-card"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-950 text-gold-400">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy-950">{t(`${item.key}.title`)}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{t(`${item.key}.desc`)}</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
