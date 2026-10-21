export const dynamic = "force-dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { CategoryGrid } from "@/components/CategoryGrid";
import { LabsSection } from "@/components/LabsSection";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import {
  MapPin, Phone, Mail, Clock, Atom, Microscope, Cpu, Layers,
  FlaskConical, Database, ChevronRight, BrainCircuit, ArrowRight, Radio, Sparkles
} from "lucide-react";
import type { ReactNode } from "react";

const FALLBACK_IMG = "https://i.postimg.cc/zG3j4DTC/photo-2026-09-17-14-08-37.jpg";
const IMG_SIZES = "(min-width:1280px) 24vw, (min-width:640px) 40vw, 92vw";

// Zamonaviy Sarlavha komponenti
function SectionTitle({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-transform duration-300 hover:scale-110 hover:rotate-3">
        {icon}
      </div>
      <h2 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 sm:text-3xl">
        {children}
      </h2>
      <div className="hidden h-[2px] flex-1 bg-gradient-to-r from-blue-500/20 to-transparent sm:block" />
    </div>
  );
}

export default async function HomePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations();

  const [news, labs] = await Promise.all([
    prisma.news.findMany({ where: { language: params.locale }, orderBy: { date: "desc" } }),
    prisma.lab.findMany({ orderBy: { nameEn: "asc" } }),
  ]);

  const wrap = "mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8";
  
  // Asosiy kartalar uslubi (Hover va 3D effektlar bilan)
  const aiCardStyle = "relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-200/40 transition-all duration-400 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/20 hover:bg-white";

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24 text-slate-800 antialiased selection:bg-blue-500 selection:text-white">
      
      {/* 1. HERO — AI va Kvant texnologiyalari muhiti */}
      <section className="relative isolate overflow-hidden border-b border-blue-100 bg-gradient-to-b from-white via-sky-50/50 to-[#f8fafc]">
        {/* Orqa fon to'r va yorug'lik effektlari */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-70 [mask-image:radial-gradient(ellipse_60%_80%_at_50%_30%,#000_50%,transparent_100%)]" />
        <div className="absolute -top-24 left-1/4 -z-10 h-96 w-96 rounded-full bg-blue-400/20 blur-[100px] animate-pulse" />
        <div className="absolute -right-10 top-20 -z-10 h-80 w-80 rounded-full bg-indigo-400/15 blur-[100px]" />

        <div className={`${wrap} grid items-center gap-12 py-16 lg:grid-cols-[1.4fr_1fr] lg:py-24`}>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 backdrop-blur-md shadow-sm transition hover:scale-105 cursor-default">
              <Sparkles className="h-4 w-4 text-blue-600" /> Sun&apos;iy intellekt va kvant texnologiya
            </div>
            <h1 className="mt-6 text-5xl font-black leading-[1.1] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl drop-shadow-sm">
              Nanotexnologiyalarni <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                rivojlantirish markazi
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-600">
              O&apos;zbekiston Milliy universiteti qoshidagi ilmiy-tadqiqot markazi: kvant materiallar, nanotexnologiya
              va zamonaviy laboratoriyalar bir raqamli portalda jamlangan.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#news" className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50 active:scale-95">
                So&apos;nggi yangiliklar <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#staff" className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white/50 px-7 py-3.5 font-bold text-slate-700 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-blue-500 hover:text-blue-700 hover:bg-white hover:shadow-lg active:scale-95">
                Laboratoriyalar
              </a>
            </div>
          </div>

          {/* O'ng tomon: Katta raqamli bloklar (Hover effekti bilan) */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1 relative z-10">
            {[
              { n: labs.length, l: "Laboratoriya", i: <Microscope className="h-6 w-6" /> },
              { n: news.length, l: "Yangilik va voqea", i: <Radio className="h-6 w-6" /> },
              { n: 3, l: "Til: UZ · RU · EN", i: <Layers className="h-6 w-6" /> },
            ].map((s) => (
              <div key={s.l} className="group flex items-center gap-5 rounded-2xl border border-white/60 bg-white/60 p-5 shadow-lg shadow-slate-200/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:bg-white hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/15">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-sky-50 text-blue-600 shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  {s.i}
                </div>
                <div>
                  <div className="text-3xl font-black text-slate-900">{s.n}</div>
                  <div className="text-sm font-bold text-slate-500">{s.l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. YANGILIKLAR */}
      <section id="news" className={`${wrap} scroll-mt-28 pt-20`}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <SectionTitle icon={<Atom className="h-7 w-7" />}>Yangiliklar va voqealar</SectionTitle>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {news.map((item) => (
                <article key={item.id} className={`${aiCardStyle} group flex flex-col`}>
                  <div className="relative h-56 w-full border-b border-slate-100 bg-slate-50 overflow-hidden">
                    <div className="absolute inset-0 bg-blue-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                    <Image
                      src={item.imageUrl || FALLBACK_IMG}
                      alt={item.title}
                      fill
                      sizes={IMG_SIZES}
                      quality={90}
                      className="object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <time className="w-fit rounded-full bg-orange-100/80 px-3 py-1 text-xs font-bold text-orange-700 ring-1 ring-orange-200/50">
                      {new Date(item.date).toLocaleDateString()}
                    </time>
                    <h3 className="mt-4 line-clamp-2 min-h-[3.2rem] text-lg font-extrabold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-blue-700">
                      {item.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm font-medium leading-relaxed text-slate-600">
                      {item.content}
                    </p>
                    <Link href={`/news/${item.id}`} className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold text-blue-600 transition-colors hover:text-blue-800">
                      Batafsil <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start pt-[88px]">
            <div className={`${aiCardStyle} p-6`}>
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <Cpu className="h-6 w-6 text-blue-600" />
                <h3 className="font-extrabold text-slate-900 text-lg">Markaz axboroti</h3>
              </div>
              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-600">
                Kvant va nanotexnologiyalar, ilmiy laboratoriyalar va xalqaro hujjatlar yagona raqamli portalda doimiy yangilanib boriladi.
              </p>
            </div>

            <div className={`${aiCardStyle} p-6`}>
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-70" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-orange-500" />
                </span>
                <h3 className="font-extrabold text-slate-900 text-lg">So&apos;nggi qo&apos;shilgan</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {news.slice(0, 5).map((item) => (
                  <Link key={item.id} href={`/news/${item.id}`} className="group block py-3.5 transition-colors hover:bg-slate-50 -mx-6 px-6">
                    <p className="line-clamp-2 text-sm font-bold leading-snug text-slate-800 transition-colors group-hover:text-blue-700">{item.title}</p>
                    <span className="mt-1.5 block text-[11px] font-bold text-slate-400">{new Date(item.date).toLocaleDateString()}</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* 3. KATEGORIYA VA LABORATORIYALAR */}
      <div className={`${wrap} mt-20`}>
        <CategoryGrid />
        <div className="mt-10">
          <LabsSection labs={labs} locale={params.locale} />
        </div>
      </div>

      {/* 4. RAHBARIYAT */}
      <section id="leadership" className={`${wrap} mt-20 scroll-mt-28`}>
        <SectionTitle icon={<FlaskConical className="h-7 w-7" />}>Markaz rahbariyati</SectionTitle>
        <div className={`${aiCardStyle} flex flex-col items-center gap-8 p-6 sm:p-10 md:flex-row md:items-start group`}>
          <div className="relative h-72 w-56 shrink-0 overflow-hidden rounded-2xl border-4 border-white shadow-xl sm:h-80 sm:w-64 transition-transform duration-500 group-hover:scale-105">
            <Image
              src="https://i.postimg.cc/y6m4KnvP/HD-Uzbek-News-Broadcast-with-Elderly-Speaker.png"
              alt="Akademik Komil Muqimovich Muqimov"
              fill sizes="256px" quality={90}
              className="object-cover object-top"
            />
          </div>
          <div className="flex-1 space-y-5">
            <div>
              <span className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-blue-700 ring-1 ring-blue-200/60">
                Markaz rahbari
              </span>
              <h3 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">Komil Muqimovich Muqimov</h3>
              <p className="mt-2 text-base font-bold text-blue-700">
                Fizika-matematika fanlari doktori, professor, O&apos;zbekiston Fanlar akademiyasi akademigi
              </p>
            </div>
            <div className="space-y-4 border-t border-slate-100 pt-6 text-sm font-medium leading-relaxed text-slate-600">
              <p><strong className="text-slate-900 font-extrabold">Faoliyati:</strong> O&apos;zbekiston Milliy universiteti qoshidagi Nanotexnologiyalarni rivojlantirish markazi rahbari. Magnetizm, optika, magnetooptika hamda nanomateriallar va spintronika sohalarida yirik ilmiy maktab yaratgan yetakchi olim.</p>
              <p><strong className="text-slate-900 font-extrabold">Mukofotlari:</strong> &quot;Do&apos;stlik&quot; ordeni (2024-yil) va &quot;Mehnat Faxriysi&quot; ko&apos;krak nishoni (2023-yil) sohibi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LABORATORIYA RAHBARLARI */}
      <section id="staff" className={`${wrap} mt-20 scroll-mt-28`}>
        <SectionTitle icon={<Microscope className="h-7 w-7" />}>Laboratoriya va yo&apos;nalishlar</SectionTitle>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {labs.map((lab: any) => {
            const L = params.locale;
            const labName = L === "uz" ? lab.nameUz : L === "ru" ? lab.nameRu : lab.nameEn;
            const headName = (L === "uz" ? lab.headUz : L === "ru" ? lab.headRu : lab.headEn) || lab.head || "Laboratoriya mudiri";
            const direction =
              (L === "uz" ? lab.directionUz || lab.descriptionUz
                : L === "ru" ? lab.directionRu || lab.descriptionRu
                : lab.directionEn || lab.descriptionEn) || "Ilmiy-tadqiqot va amaliy ishlanmalar yo'nalishi";
            const initials = headName.split(" ").filter(Boolean).slice(0, 2).map((w: string) => w[0].toUpperCase()).join(".");

            return (
              <div key={lab.id} className={`${aiCardStyle} p-6 group`}>
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-base font-black text-blue-700 shadow-inner transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-6 group-hover:scale-110">
                    {initials || "L.R."}
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold leading-snug text-slate-900">{headName}</h3>
                    <p className="mt-1 text-sm font-bold text-orange-600">{labName}</p>
                  </div>
                </div>
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <span className="mb-2 block text-[11px] font-black uppercase tracking-wider text-slate-400">Ilmiy yo&apos;nalishi</span>
                  <p className="line-clamp-3 text-sm font-medium leading-relaxed text-slate-600">{direction}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. ALOQA */}
      <section id="contact" className={`${wrap} mt-20 scroll-mt-28`}>
        <SectionTitle icon={<Database className="h-7 w-7" />}>Aloqa ma&apos;lumotlari</SectionTitle>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
            {[
              { i: <MapPin className="h-6 w-6" />, h: "Manzil", p: ["100174, Toshkent shahri, Olmazor tumani, Universitet ko'chasi, 4-uy (O'zMU Bosh binosi)"] },
              { i: <Phone className="h-6 w-6" />, h: "Telefon va faks", p: ["Ofis: +998 71 246 54 17", "Faks: +998 71 246 02 24"] },
              { i: <Mail className="h-6 w-6" />, h: "Elektron pochta", p: ["nano-center@nuu.uz"] },
              { i: <Clock className="h-6 w-6" />, h: "Ish tartibi", p: ["Dushanba – Shanba: 09:00 – 18:00", "Yakshanba: dam olish kuni"] },
            ].map((c) => (
              <div key={c.h} className={`${aiCardStyle} flex items-start gap-5 p-6 group`}>
                <div className="rounded-2xl bg-blue-50 p-3.5 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
                  {c.i}
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-slate-900">{c.h}</h4>
                  {c.p.map((line) => (
                    <p key={line} className="mt-1.5 text-sm font-medium text-slate-600">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 p-8 text-white shadow-xl shadow-blue-600/30 transition-transform duration-500 hover:scale-[1.02]">
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl animate-pulse" />
            <div className="relative z-10">
              <h3 className="text-2xl font-black">Markaz axborot xizmati</h3>
              <p className="mt-4 text-sm font-medium leading-relaxed text-blue-50">
                Ilmiy hamkorlik, laboratoriya xizmatlari yoki tadqiqotlar bo&apos;yicha savollaringiz bo&apos;lsa, ko&apos;rsatilgan aloqa kanallari orqali markazimiz ma'muriyati bilan bog&apos;lanishingiz mumkin.
              </p>
            </div>
            <p className="relative z-10 mt-8 border-t border-white/20 pt-5 text-[11px] font-black uppercase tracking-wider text-blue-100">
              O&apos;zbekiston Milliy universiteti qoshidagi Nanotexnologiyalarni rivojlantirish markazi
            </p>
          </div>
        </div>
      </section>

      {/* 7. BIZ HAQIMIZDA */}
      <section className={`${wrap} mt-20`}>
        <div className={`${aiCardStyle} p-8 sm:p-12 relative group`}>
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-blue-50/50 blur-3xl transition-transform duration-700 group-hover:scale-150" />
          <div className="relative z-10">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-blue-100/50 p-2 text-blue-600">
                <Layers className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-black text-slate-900">{t("about.title")}</h2>
            </div>
            <div className="mt-5 h-1.5 w-24 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500" />
            <p className="mt-6 max-w-5xl text-base font-medium leading-relaxed text-slate-600">{t("about.body")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}