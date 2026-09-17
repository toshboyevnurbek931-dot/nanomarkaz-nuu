"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, User } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useSession } from "next-auth/react";

export function Header() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  let session = null;
  let status = "unauthenticated";

  try {
    const sessionResult = useSession();
    session = sessionResult?.data ?? null;
    status = sessionResult?.status ?? "unauthenticated";
  } catch (e) {
    // Auth context mavjud bo'lmaganda xatosiz o'tish
  }

  const isAdmin =
    status === "authenticated" &&
    (session?.user?.role === "ADMIN" ||
      session?.user?.email === "admin@nanomarkaz.uz" ||
      session?.user?.name === "NurbekDev");

  // Navigatsiya bo'limlari ro'yxati
  const navItems = [
    { href: "/", label: "BOSH SAHIFA" },
    { href: "/directions", label: "YO'NALISHLAR" },
    { href: "/labs/funktsional-nanomateriallar", label: "LABORATORIYALAR" },
    { href: "/#news", label: "YANGILIKLAR" },
    { href: "/#staff", label: "XODIMLAR" },
    { href: "/#leadership", label: "RAHBARIYAT" },
    { href: "/#contact", label: "ALOQA" },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Yuqori kichik axborot paneli */}
      <div className="bg-navy-950 text-white border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-1.5 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="truncate opacity-90">
            {t("header.address") || "Bosh bino manzili: 100174, Toshkent shahar, Olmazor tumani, Universitet ko'chasi, 4-uy"}
          </p>
          <div className="flex items-center gap-4">
            <a href="tel:+998712465417" className="whitespace-nowrap hover:text-gold-400">
              +998 71 246 54 17
            </a>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Asosiy navigatsiya va Logotip qismi */}
      <div className="bg-navy-900 text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
          
          {/* Logo va Markaz nomi (Sarlavha hamda ostki qisqacha yozuv) */}
          <Link href="/" className="flex min-w-0 items-center gap-3 shrink-0">
            <Logo />
            <span className="min-w-0">
              <span className="block text-xs font-black uppercase tracking-wider text-white sm:text-sm lg:text-base leading-tight">
                O'ZMU NANOTEXNOLOGIYALARNI RIVOJLANTIRISH MARKAZI
              </span>
              <span className="mt-0.5 block text-[10px] font-medium text-gold-400 sm:text-xs">
                O'zbekiston Milliy Universiteti qoshidagi ilmiy-tadqiqot markazi
              </span>
            </span>
          </Link>

          {/* Desktop navigatsiya menyusi */}
          <nav className="hidden items-center gap-4 xl:gap-6 lg:flex flex-wrap justify-end">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs xl:text-sm font-bold uppercase tracking-wide text-gold-400 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}

            {/* Admin tugmasi */}
            {isAdmin && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-3 py-1.5 text-xs font-bold text-white shadow hover:bg-orange-400 transition"
              >
                <User className="h-3.5 w-3.5" />
                ADMIN
              </Link>
            )}
          </nav>

          {/* Mobil menyu tugmasi */}
          <button
            type="button"
            className="rounded-md p-2 lg:hidden text-gold-400 hover:text-white"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobil menyu ochilgandagi ro'yxat */}
        {open && (
          <div className="space-y-2 border-t border-white/10 px-4 py-4 lg:hidden bg-navy-950">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-1 text-sm font-bold uppercase text-gold-400 hover:text-white"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {isAdmin && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 rounded-md bg-orange-500 px-3 py-2 text-sm font-bold text-white mt-2"
                onClick={() => setOpen(false)}
              >
                <User className="h-4 w-4" />
                ADMIN PANEL
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}