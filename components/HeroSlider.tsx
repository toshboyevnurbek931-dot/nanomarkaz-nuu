"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Megaphone, Zap, Sparkles, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { formatDate } from "@/lib/utils";
import type { News } from "@prisma/client";

const FALLBACK_IMG = "https://i.postimg.cc/zG3j4DTC/photo-2026-09-17-14-08-37.jpg";

export function HeroSlider({ news, locale }: { news: News[]; locale: string }) {
  const t = useTranslations();
  const [index, setIndex] = useState(0);

  const newsList = news.length > 0 ? news : [];
  const featured = newsList[index] ?? null;
  const sidebar = newsList.slice(0, 5);

  // Keyingi postga o'tish funksiyasi
  const nextSlide = useCallback(() => {
    if (newsList.length < 2) return;
    setIndex((prev) => (prev + 1) % newsList.length);
  }, [newsList.length]);

  // Har 3.5 sekundda avtomatik almashtirish (3500 ms)
  useEffect(() => {
    if (newsList.length < 2) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 3500);

    return () => clearInterval(timer);
  }, [nextSlide, newsList.length]);

  // Media (Video yoki Rasm) ekanligini aniqlash
  const isVideo = (url?: string | null) => {
    if (!url) return false;
    return url.endsWith(".mp4") || url.endsWith(".webm") || url.includes("supabase.co/storage");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3 items-start">
      {/* Chap tomondagi Asosiy Slider Karta */}
      <div className="lg:col-span-2">
        {featured ? (
          <AnimatePresence mode="wait">
            <motion.article
              key={featured.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-xl shadow-xl shadow-slate-200/50 transition-all"
            >
              {/* Media Konteyneri (Video / Rasm + Soft Blur Fon) */}
              <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-900">
                {isVideo(featured.imageUrl) ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    key={featured.imageUrl!}
                    className="h-full w-full object-cover"
                  >
                    <source src={featured.imageUrl!} type="video/mp4" />
                  </video>
                ) : (
                  <>
                    {/* Orqa fon: Yorqin, blur qilingan va to'liq egallovchi rasm */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={featured.imageUrl || FALLBACK_IMG}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover blur-md opacity-60 scale-110 transition-transform duration-700"
                    />
                    
                    {/* Oqish yumshatuvchi qatlam */}
                    <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />

                    {/* Asosiy Rasm */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={featured.imageUrl || FALLBACK_IMG}
                      alt={featured.title}
                      className="relative z-10 h-full w-full object-contain drop-shadow-md"
                    />
                  </>
                )}

                {/* Sana Belgisi (Badge) */}
                <div className="absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-slate-900/75 backdrop-blur-md px-3.5 py-1 text-xs font-bold text-white shadow-lg border border-white/20">
                  <Sparkles className="h-3.5 w-3.5 text-blue-400" />
                  {formatDate(featured.date, locale)}
                </div>
              </div>

              {/* Matnlar Bo'limi */}
              <div className="p-6 sm:p-8">
                <h1 className="text-xl font-black leading-snug text-slate-900 sm:text-2xl lg:text-3xl line-clamp-2">
                  {featured.title}
                </h1>
                <p className="mt-3 line-clamp-3 text-xs sm:text-sm font-medium leading-relaxed text-slate-600">
                  {featured.content}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <Link
                    href={`/news/${featured.id}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 transition-colors hover:text-blue-800"
                  >
                    {t("hero.readMore")} <ChevronRight className="h-4 w-4" />
                  </Link>

                  {/* Slayder Progress Indikatori (Nuqtalar) */}
                  <div className="flex items-center gap-1.5">
                    {newsList.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === index ? "w-6 bg-blue-600" : "w-2 bg-slate-300 hover:bg-slate-400"
                        }`}
                        aria-label={`Slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-card">
            {t("news.empty")}
          </div>
        )}
      </div>

      {/* O'ng tomondagi Sidebar */}
      <aside className="space-y-6">
        <div className="rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 p-6 text-white shadow-xl shadow-blue-600/20 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          <div className="relative z-10">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white">
              <Megaphone className="h-5 w-5" />
            </div>
            <h2 className="text-base font-extrabold">{t("hero.infoTitle")}</h2>
            <p className="mt-2 text-xs font-medium leading-relaxed text-blue-100">{t("hero.infoBody")}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-xl p-6 shadow-lg shadow-slate-200/40">
          <div className="mb-4 flex items-center gap-2 text-slate-900 border-b border-slate-100 pb-3">
            <Zap className="h-5 w-5 text-orange-500" />
            <h2 className="text-xs font-black uppercase tracking-wider">{t("hero.latest")}</h2>
          </div>
          
          <ul className="divide-y divide-slate-100">
            {sidebar.map((item, i) => (
              <li key={item.id}>
                <button
                  onClick={() => setIndex(i)}
                  className={`w-full text-left py-3 px-2 rounded-xl transition-all duration-200 ${
                    i === index ? "bg-blue-50/80 border-l-4 border-blue-600 pl-3" : "hover:bg-slate-50"
                  }`}
                >
                  <p className="text-[10px] font-bold text-slate-400">{formatDate(item.date, locale)}</p>
                  <p className={`mt-1 text-xs font-extrabold line-clamp-2 ${i === index ? "text-blue-600" : "text-slate-800"}`}>
                    {item.title}
                  </p>
                </button>
              </li>
            ))}
          </ul>

          <Link
            href="/directions"
            className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800"
          >
            {t("hero.viewAll")} ↓
          </Link>
        </div>
      </aside>
    </div>
  );
}