"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, User } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useSession } from "next-auth/react"; // next-auth ishlatilayotgan bo‘lsa

export function Header() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();

  // Admin ekanligini tekshirish
  const isAdmin =
    status === "authenticated" &&
    (session?.user?.role === "ADMIN" || session?.user?.email === "admin@nanomarkaz.uz"); // o‘zingizning admin email/role ni yozing

  return (
    <header className="sticky top-0 z-50">
      {/* Yuqori qism - manzil va telefon */}
      <div className="bg-navy-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-2 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="truncate opacity-90">{t("header.address")}</p>
          <div className="flex items-center gap-4">
            <a href="tel:+998712465417" className="whitespace-nowrap hover:text-gold-400">
              {t("header.phone")}
            </a>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Asosiy navigatsiya */}
      <div className="bg-navy-900 text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo + nom */}
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <Logo />
            <span className="min-w-0">
              <span className="block text-[11px] font-extrabold leading-snug tracking-wide sm:text-xs">
                {t("brand.name")}
              </span>
              <span className="mt-0.5 block text-[10px] text-white/70 sm:text-xs">
                {t("brand.subtitle")}
              </span>
            </span>
          </Link>

          {/* Desktop navigatsiya */}
          <nav className="hidden items-center gap-6 lg:flex">
            <Link href="/" className="text-sm font-semibold uppercase tracking-wide text-gold-400">
              {t("nav.home")}
            </Link>
            <Link
              href="/directions"
              className="text-sm font-semibold uppercase tracking-wide text-gold-400 hover:text-white"
            >
              {t("nav.directions")}
            </Link>

            {/* Faqat admin uchun */}
            {isAdmin && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-white shadow hover:bg-orange-400 transition"
              >
                <User className="h-4 w-4" />
                {t("nav.admin")}
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="rounded-md p-2 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="space-y-3 border-t border-white/10 px-4 py-4 lg:hidden">
            <Link
              href="/"
              className="block font-semibold uppercase text-gold-400"
              onClick={() => setOpen(false)}
            >
              {t("nav.home")}
            </Link>
            <Link
              href="/directions"
              className="block font-semibold uppercase text-gold-400"
              onClick={() => setOpen(false)}
            >
              {t("nav.directions")}
            </Link>

            {/* Faqat admin uchun mobile */}
            {isAdmin && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 font-bold"
                onClick={() => setOpen(false)}
              >
                <User className="h-4 w-4" />
                {t("nav.admin")}
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}