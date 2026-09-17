"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, User } from "lucide-react";
import { Link, usePathname } from "@/i18n/routing";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useSession } from "next-auth/react";

export function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  let session = null;
  let status = "unauthenticated";

  try {
    const sessionResult = useSession();
    session = sessionResult?.data ?? null;
    status = sessionResult?.status ?? "unauthenticated";
  } catch (e) {
    // Auth context bo'lmaganda xatosiz o'tish
  }

  const isAdmin =
    status === "authenticated" &&
    (session?.user?.role === "ADMIN" ||
      session?.user?.email === "admin@nanomarkaz.uz" ||
      session?.user?.name === "NurbekDev");

  const navItems = [
    { href: "/", label: "Bosh sahifa" },
    { href: "/directions", label: "Yo'nalishlar" },
    { href: "/labs/funktsional-nanomateriallar", label: "Laboratoriyalar" },
    { href: "/#news", label: "Yangiliklar" },
    { href: "/#staff", label: "Xodimlar" },
    { href: "/#leadership", label: "Rahbariyat" },
    { href: "/#contact", label: "Aloqa" },
  ];

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Yuqori axborot paneli */}
      <div className="bg-navy-950 text-white border-b border-white/10">
        <div className="mx-auto flex max-w-[95%] items-center justify-between px-4 py-1.5 text-xs">
          <p className="truncate opacity-90">
            {t("header.address") || "Bosh bino manzili: 100174, Toshkent shahar, Olmazor tumani, Universitet ko'chasi, 4-uy"}
          </p>
          <div className="flex items-center gap-4">
            <a href="tel:+998712465417" className="whitespace-nowrap hover:text-gold-400 transition">
              +998 71 246 54 17
            </a>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Asosiy Header va Tartibli Menyu */}
      <div className="bg-navy-900 text-white">
        <div className="mx-auto flex max-w-[95%] items-center justify-between gap-4 px-4 py-3">
          
          {/* Logo va Sarlavha */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Logo />
            <div className="min-w-0">
              <span className="block text-xs font-black uppercase tracking-wide text-white sm:text-sm xl:text-base leading-tight">
                O'ZMU NANOTEXNOLOGIYALARNI RIVOJLANTIRISH MARKAZI
              </span>
              <span className="mt-0.5 block text-[10px] font-medium text-gold-400 sm:text-xs">
                O'zbekiston Milliy Universiteti qoshidagi ilmiy-tadqiqot markazi
              </span>
            </div>
          </Link>

          {/* Bir qatorli, tartibli va Animatsiyali Navigatsiya */}
          <nav className="hidden items-center gap-1 xl:gap-2 lg:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-lg px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide transition-all duration-200 transform hover:scale-105 ${
                    isActive
                      ? "bg-gold-500/20 text-gold-400 font-bold border border-gold-500/30"
                      : "text-slate-200 hover:bg-white/10 hover:text-white hover:shadow-sm"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {isAdmin && (
              <Link
                href="/admin"
                className="ml-2 inline-flex items-center gap-1.5 rounded-lg bg-orange-500 px-3 py-2 text-xs font-bold text-white shadow hover:bg-orange-400 hover:scale-105 transition"
              >
                <User className="h-3.5 w-3.5" />
                ADMIN
              </Link>
            )}
          </nav>

          {/* Mobil Menyu Tugmasi */}
          <button
            type="button"
            className="rounded-md p-2 lg:hidden text-gold-400 hover:text-white"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobil Menyu */}
        {open && (
          <div className="space-y-1 border-t border-white/10 px-4 py-3 lg:hidden bg-navy-950">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-gold-400"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}