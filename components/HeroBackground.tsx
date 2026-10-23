"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ChevronRight, Radio } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { News } from "@prisma/client";

interface HeroBackgroundProps {
  newsItems: News[];
  defaultVideo: string;
  defaultPoster: string;
}

export function HeroBackground({ newsItems, defaultVideo, defaultPoster }: HeroBackgroundProps) {
  const [index, setIndex] = useState(0);

  // Faqat oxirgi 5 ta yangilikni slayder uchun olamiz
  const slides = newsItems.length > 0 ? newsItems.slice(0, 5) : [];

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000); // Har 4 sekundda almashadi
    return () => clearInterval(timer);
  }, [slides.length]);

  const activeSlide = slides[index];

  // Video fayl ekanligini aniqlash funksiyasi
  const isVideo = (url?: string | null) => {
    if (!url) return false;
    return url.endsWith(".mp4") || url.endsWith(".webm") || url.includes("supabase.co/storage/v1/object/public/videos");
  };

  // Agar yangiliklar bo'lmasa, standart videoni aylantiramiz
  if (slides.length === 0) {
    return (
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline poster={defaultPoster} className="h-full w-full object-cover opacity-90">
          <source src={defaultVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/40 to-slate-900/10" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
      {/* 1. Dinamik Media Slayderi (Rasm yoki Video) */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeSlide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {isVideo(activeSlide.imageUrl) ? (
            <video autoPlay loop muted playsInline className="h-full w-full object-cover opacity-90">
              <source src={activeSlide.imageUrl!} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={activeSlide.imageUrl || defaultPoster}
              alt={activeSlide.title}
              fill
              priority
              className="object-cover opacity-90"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* 2. Matnlar aniq ko'rinishi uchun gradient va Kvant Grid effekti */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/50 to-slate-900/20" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

      {/* 3. Ayni damda ekranda aylanayotgan yangilikning sarlavhasi (Pastda) */}
      <div className="absolute bottom-16 sm:bottom-12 left-0 w-full z-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1440px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${activeSlide.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-4 sm:p-5 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Radio className="h-4 w-4 text-blue-400 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300">
                    Ayni damda ekranda
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-white line-clamp-2 drop-shadow-md">
                  {activeSlide.title}
                </h3>
                <Link href={`/news/${activeSlide.id}`} className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors">
                  Batafsil o&apos;qish <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}