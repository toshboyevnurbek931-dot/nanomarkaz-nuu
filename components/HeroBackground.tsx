"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ChevronRight, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { News } from "@prisma/client";

interface HeroBackgroundProps {
  newsItems: News[];
  defaultVideo: string;
  defaultPoster: string;
}

export function HeroBackground({ newsItems, defaultVideo, defaultPoster }: HeroBackgroundProps) {
  const [index, setIndex] = useState(0);
  const slides = newsItems.length > 0 ? newsItems.slice(0, 5) : [];

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const activeSlide = slides[index];

  const isVideo = (url?: string | null) => {
    if (!url) return false;
    return url.endsWith(".mp4") || url.endsWith(".webm") || url.includes("supabase.co/storage");
  };

  if (slides.length === 0) return null;

  return (
    // Asosiy konteyner: flex-col orqali rasm va bannerni ekranga chiroyli taqsimlaymiz
    <div className="absolute inset-0 z-0 flex flex-col overflow-hidden bg-[#020617]">
      
      {/* ======================================= */}
      {/* 1. SLAYDER QISMI (Tepa va Markaz)        */}
      {/* ======================================= */}
      <div className="relative flex-1 w-full flex items-center justify-center p-4 sm:p-10 z-0">
        
        {/* Yon tomonlardagi bo'shliqni to'ldiruvchi Kiber-Grid fon */}
        <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#06b6d4_1px,transparent_1px),linear-gradient(to_bottom,#06b6d4_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] z-0" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center p-4 sm:p-8"
          >
            {/* Rasm atrofidagi "Aura" (rangli yorug'lik) effekti - yonlarni boyitadi */}
            {!isVideo(activeSlide.imageUrl) && (
              <div className="absolute inset-0 z-0">
                <Image 
                  src={activeSlide.imageUrl || defaultPoster} 
                  alt="" 
                  fill 
                  className="object-cover blur-[100px] opacity-40 scale-125 saturate-200" 
                />
              </div>
            )}

            {/* Asosiy Rasm/Video: qirqilib ketmasligi uchun "object-contain" ishlatildi */}
            <div className="relative w-full h-full max-w-[90%] lg:max-w-[75%] z-10 mx-auto">
              {isVideo(activeSlide.imageUrl) ? (
                <video autoPlay loop muted playsInline className="h-full w-full object-contain drop-shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                  <source src={activeSlide.imageUrl!} type="video/mp4" />
                </video>
              ) : (
                <Image 
                  src={activeSlide.imageUrl || defaultPoster} 
                  alt={activeSlide.title} 
                  fill 
                  priority 
                  className="object-contain drop-shadow-[0_0_40px_rgba(6,182,212,0.3)]" 
                />
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Asosiy sahifa yozuvlari yaxshi o'qilishi uchun nozik qorong'ilashtirish */}
        <div className="absolute inset-0 bg-slate-950/50 z-20 pointer-events-none" />
      </div>

      {/* ======================================= */}
      {/* 2. KATTA BANNER (Eng pastda, ichkarida) */}
      {/* ======================================= */}
      <div className="relative z-30 w-full shrink-0 bg-slate-950/80 backdrop-blur-2xl border-t border-cyan-500/40 pb-6 pt-6 shadow-[0_-15px_50px_rgba(6,182,212,0.15)]">
        
        {/* Banner tepasidagi yonib turuvchi lazer chiziq */}
        <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,1)]" />

        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${activeSlide.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-5 w-5 text-cyan-400 animate-pulse" />
                  <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
                    Markaz Yangiliklari
                  </span>
                </div>
                {/* Katta va Zamonaviy yozuv stili */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-blue-200 to-white line-clamp-1 sm:line-clamp-2 drop-shadow-md">
                  {activeSlide.title}
                </h3>
              </div>
              
              <Link href={`/news/${activeSlide.id}`} className="shrink-0 inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-400 hover:text-slate-950 hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-all duration-300 text-sm font-extrabold group">
                Batafsil o&apos;qish <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}