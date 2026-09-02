"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { locales } from "@/i18n/routing";

const labels: Record<string, string> = {
  uz: "O‘zbekcha",
  ru: "Русский",
  en: "English",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <label className="inline-flex items-center gap-2 text-xs font-medium text-white/90">
      <span className="sr-only">Language</span>
      <select
        value={locale}
        onChange={(e) => router.replace(pathname, { locale: e.target.value as "uz" | "ru" | "en" })}
        className="rounded-md border border-white/20 bg-white/10 px-2 py-1 text-xs text-white outline-none"
      >
        {locales.map((code) => (
          <option key={code} value={code} className="text-navy-950">
            {labels[code]}
          </option>
        ))}
      </select>
    </label>
  );
}
