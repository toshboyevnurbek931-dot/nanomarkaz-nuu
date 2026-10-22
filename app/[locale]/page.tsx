export const dynamic = "force-dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { CategoryGrid } from "@/components/CategoryGrid";
import { LabsSection } from "@/components/LabsSection";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import {
  MapPin, Phone, Mail, Clock, Atom, Microscope, Cpu, Layers,
  FlaskConical, Database, ChevronRight, ArrowRight, Radio, Sparkles
} from "lucide-react";
import type { ReactNode } from "react";

const FALLBACK_IMG = "https://i.postimg.cc/zG3j4DTC/photo-2026-09-17-14-08-37.jpg";
const FALLBACK_HERO_POSTER = "https://i.postimg.cc/QtxmK44y/nano-tech-bg.jpg";
const FALLBACK_HERO_VIDEO = "https://cdn.pixabay.com/video/2020/09/14/49880-459196556_large.mp4";
const IMG_SIZES = "(min-width:1280px) 24vw, (min-width:640px) 40vw, 92vw";

// AI uslubidagi zamonaviy Sarlavha komponenti
function SectionTitle({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.35)] transition-transform duration-300 hover:scale-110 hover:rotate-3">
        {icon}
      </div>
      <h2 className="text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-950 to-slate-800 sm:text-2xl lg:text-3xl">
        {children}
      </h2>
      <div className="hidden h-[2px] flex-1 bg-gradient-to-r from-blue-500/20 via-sky-300/10 to-transparent sm:block" />
    </div>
  );
}

export default async function HomePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations();

  // Bazadan parallel ma'lumotlarni o'qib olish
  const [news, labs, settings] = await Promise.all([
    prisma.news.findMany({ where: { language: params.locale }, orderBy: { date: "desc" } }),
    prisma.lab.findMany({ orderBy: { nameEn: "asc" } }),
    prisma.siteSettings.findFirst(),
  ]);

  // Admin paneldan kiritilgan media havolalari
  const heroVideo = settings?.heroVideoUrl || FALLBACK_HERO_VIDEO;
  const heroPoster = settings?.heroPosterUrl || FALLBACK_HERO_POSTER;

  const wrap = "mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8";
  
  // Interaktiv AI Karta Uslubi
  const aiCardStyle = "relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-200/40 transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.015] hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/15 hover:bg-white";

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24 text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      
      {/* 1. HERO BO'LIMI */}
      <section className="relative flex min-h-[88vh] w-full items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline key={heroVideo} poster={heroPoster} className="h-full w-full object-cover opacity-90 transition-opacity duration-1000">
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/40 to-slate-900/10" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.3),transparent_50%)] mix-blend-screen" />
        </div>

        <div className={`${wrap} relative z-10 grid items-center gap-10 py-16 lg:grid-cols-[1.35fr_1fr] lg:py-24`}>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/20 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-200 backdrop-blur-md shadow-lg">
              <Sparkles className="h-4 w-4 text-blue-400" /> Sun&apos;iy Intellekt va Kvant Muhiti
            </div>
            <h1 className="mt-5 text-3xl font-black leading-[1.2] tracking-tight text-white sm:text-4xl lg:text-5xl drop-shadow-[0_4px_4px_rgba(0,0,0,0.6)]">
              Nanotexnologiyalarni <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300 drop-shadow-sm">
                Rivojlantirish Markazi
              </span>
            </h1>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-200 sm:text-base lg:text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              O&apos;zbekiston Milliy universiteti qoshidagi ilmiy-tadqiqot markazi: kvant materiallar, nanotexnologiya va zamonaviy laboratoriyalar bir raqamli portalda jamlangan.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#news" className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] active:scale-95">
                So&apos;nggi yangiliklar <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#staff" className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-black/20 px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:border-white/50 active:scale-95 shadow-lg">
                Laboratoriyalar
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1 relative z-10">
            {[
              { n: labs.length, l: "Laboratoriyalar", i: <Microscope className="h-6 w-6" /> },
              { n: news.length, l: "Yangilik va voqealar", i: <Radio className="h-6 w-6" /> },
              { n: 3, l: "Til: UZ · RU · EN", i: <Layers className="h-6 w-6" /> },
            ].map((s) => (
              <div key={s.l} className="group flex items-center gap-5 rounded-2xl border border-white/20 bg-slate-900/40 p-4.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-slate-800/50 hover:border-blue-400/50">
                <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  {s.i}
                </div>
                <div>
                  <div className="text-2xl font-black text-white drop-shadow-md">{s.n}</div>
                  <div className="text-xs font-bold text-slate-300">{s.l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 lg:h-48 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/90 to-transparent z-10 pointer-events-none" />
      </section>

      {/* 2. YANGILIKLAR BO'LIMI - YORQIN VA MOSLASHTIRILGAN BLUR FON */}
      <section id="news" className={`${wrap} scroll-mt-28 pt-8`}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <SectionTitle icon={<Atom className="h-6 w-6" />}>Yangiliklar va voqealar</SectionTitle>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {news.map((item) => (
                <article key={item.id} className={`${aiCardStyle} group flex flex-col`}>
                  
                  {/* Yangilangan Rasm Konteyneri - Yorqin fon va chetda ochiq joylarsiz */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-50">
                    
                    {/* Orqa fon: Yorqinroq, biroz xiralashtirilgan (blur-md) va to'liq qoplovchi */}
                    <Image
                      src={item.imageUrl || FALLBACK_IMG}
                      alt=""
                      fill
                      quality={20}
                      className="object-cover blur-md opacity-60 scale-110 transition-transform duration-700 ease-out group-hover:scale-125"
                    />
                    
                    {/* Oqish qatlam (Overlay) - fonni postning oq rangiga mos qilib yumshatish uchun */}
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-20" />
                    
                    {/* Asosiy Rasm: Padding olib tashlandi, markazda aniq ko'rinadi va fonga singib ketadi */}
                    <Image
                      src={item.imageUrl || FALLBACK_IMG}
                      alt={item.title}
                      fill
                      sizes={IMG_SIZES}
                      quality={90}
                      className="relative z-10 object-contain drop-shadow-md transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <time className="w-fit rounded-full bg-orange-100/80 px-2.5 py-0.5 text-[11px] font-bold text-orange-700 ring-1 ring-orange-200/60">
                      {new Date(item.date).toLocaleDateString()}
                    </time>
                    <h3 className="mt-3 line-clamp-2 min-h-[2.8rem] text-base font-extrabold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-blue-600">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-xs font-medium leading-relaxed text-slate-600">
                      {item.content}
                    </p>
                    <Link href={`/news/${item.id}`} className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-bold text-blue-600 transition-colors hover:text-blue-800">
                      Batafsil <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start pt-[72px]">
            <div className={`${aiCardStyle} p-5`}>
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                <Cpu className="h-5 w-5 text-blue-600" />
                <h3 className="font-extrabold text-slate-900 text-base">Markaz axboroti</h3>
              </div>
              <p className="mt-3 text-xs font-medium leading-relaxed text-slate-600">
                Kvant va nanotexnologiyalar, ilmiy laboratoriyalar va xalqaro hujjatlar yagona raqamli portalda doimiy yangilanib boriladi.
              </p>
            </div>

            <div className={`${aiCardStyle} p-5`}>
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange-500" />
                </span>
                <h3 className="font-extrabold text-slate-900 text-base">So&apos;nggi qo&apos;shilgan</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {news.slice(0, 5).map((item) => (
                  <Link key={item.id} href={`/news/${item.id}`} className="group block py-3 transition-colors hover:bg-slate-50 -mx-5 px-5">
                    <p className="line-clamp-2 text-xs font-bold leading-snug text-slate-800 transition-colors group-hover:text-blue-600">{item.title}</p>
                    <span className="mt-1 block text-[10px] font-bold text-slate-400">{new Date(item.date).toLocaleDateString()}</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* QOLGAN BO'LIMLAR... */}
      {/* 3. KATEGORIYA VA LABORATORIYA GRIDLARI */}
      <div className={`${wrap} mt-16`}>
        <CategoryGrid />
        <div className="mt-8">
          <LabsSection labs={labs} locale={params.locale} />
        </div>
      </div>

      {/* 4. RAHBARIYAT BO'LIMI */}
      <section id="leadership" className={`${wrap} mt-16 scroll-mt-28`}>
        <SectionTitle icon={<FlaskConical className="h-6 w-6" />}>Markaz rahbariyati</SectionTitle>
        <div className={`${aiCardStyle} flex flex-col items-center gap-8 p-6 sm:p-8 md:flex-row md:items-start group`}>
          <div className="relative h-64 w-52 shrink-0 overflow-hidden rounded-2xl border-2 border-white shadow-lg sm:h-72 sm:w-60 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="https://i.postimg.cc/y6m4KnvP/HD-Uzbek-News-Broadcast-with-Elderly-Speaker.png"
              alt="Akademik Komil Muqimovich Muqimov"
              fill sizes="240px" quality={90}
              className="object-cover object-top"
            />
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-blue-700 ring-1 ring-blue-200/60">
                Markaz rahbari
              </span>
              <h3 className="mt-3 text-2xl font-black text-slate-900 sm:text-3xl">Komil Muqimovich Muqimov</h3>
              <p className="mt-1 text-xs font-bold text-blue-600 sm:text-sm">
                Fizika-matematika fanlari doktori, professor, O&apos;zbekiston Fanlar akademiyasi akademigi
              </p>
            </div>
            <div className="space-y-3 border-t border-slate-100 pt-4 text-xs font-medium leading-relaxed text-slate-600 sm:text-sm">
              <p><strong className="text-slate-900 font-extrabold">Faoliyati:</strong> O&apos;zbekiston Milliy universiteti qoshidagi Nanotexnologiyalarni rivojlantirish markazi rahbari. Magnetizm, optika, magnetooptika hamda nanomateriallar va spintronika sohalarida yirik ilmiy maktab yaratgan yetakchi olim.</p>
              <p><strong className="text-slate-900 font-extrabold">Mukofotlari:</strong> &quot;Do&apos;stlik&quot; ordeni (2024-yil) va &quot;Mehnat Faxriysi&quot; ko&apos;krak nishoni (2023-yil) sohibi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LABORATORIYA RAHBARLARI */}
      <section id="staff" className={`${wrap} mt-16 scroll-mt-28`}>
        <SectionTitle icon={<Microscope className="h-6 w-6" />}>Laboratoriyalar va yo&apos;nalishlar</SectionTitle>
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
              <div key={lab.id} className={`${aiCardStyle} p-5 group`}>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-sm font-black text-blue-700 shadow-inner transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-6">
                    {initials || "L.R."}
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold leading-snug text-slate-900">{headName}</h3>
                    <p className="mt-1 text-xs font-bold text-orange-600">{labName}</p>
                  </div>
                </div>
                <div className="mt-4 border-t border-slate-100 pt-3">
                  <span className="mb-1 block text-[10px] font-black uppercase tracking-wider text-slate-400">Ilmiy yo&apos;nalishi</span>
                  <p className="line-clamp-3 text-xs font-medium leading-relaxed text-slate-600">{direction}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. ALOQA BO'LIMI */}
      <section id="contact" className={`${wrap} mt-16 scroll-mt-28`}>
        <SectionTitle icon={<Database className="h-6 w-6" />}>Aloqa ma&apos;lumotlari</SectionTitle>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
            {[
              { i: <MapPin className="h-5 w-5" />, h: "Manzil", p: ["100174, Toshkent shahri, Olmazor tumani, Universitet ko'chasi, 4-uy (O'zMU Bosh binosi)"] },
              { i: <Phone className="h-5 w-5" />, h: "Telefon va faks", p: ["Ofis: +998 71 246 54 17", "Faks: +998 71 246 02 24"] },
              { i: <Mail className="h-5 w-5" />, h: "Elektron pochta", p: ["nano-center@nuu.uz"] },
              { i: <Clock className="h-5 w-5" />, h: "Ish tartibi", p: ["Dushanba – Shanba: 09:00 – 18:00", "Yakshanba: dam olish kuni"] },
            ].map((c) => (
              <div key={c.h} className={`${aiCardStyle} flex items-start gap-4 p-5 group`}>
                <div className="rounded-xl bg-blue-50 p-3 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
                  {c.i}
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">{c.h}</h4>
                  {c.p.map((line) => (
                    <p key={line} className="mt-1 text-xs font-medium text-slate-600 leading-relaxed">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 p-6 text-white shadow-xl shadow-blue-600/25">
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl animate-pulse" />
            <div className="relative z-10">
              <h3 className="text-xl font-black">Markaz axborot xizmati</h3>
              <p className="mt-3 text-xs font-medium leading-relaxed text-blue-50">
                Ilmiy hamkorlik, laboratoriya xizmatlari yoki tadqiqotlar bo&apos;yicha savollaringiz bo&apos;lsa, ko&apos;rsatilgan aloqa kanallari orqali markazimiz ma&apos;muriyati bilan bog&apos;lanishingiz mumkin.
              </p>
            </div>
            <p className="relative z-10 mt-6 border-t border-white/20 pt-4 text-[10px] font-black uppercase tracking-wider text-blue-100">
              O&apos;zbekiston Milliy universiteti qoshidagi Nanotexnologiyalarni rivojlantirish markazi
            </p>
          </div>
        </div>
      </section>

      {/* 7. BIZ HAQIMIZDA */}
      <section className={`${wrap} mt-16`}>
        <div className={`${aiCardStyle} p-6 sm:p-10 relative group`}>
          <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-blue-50/50 blur-3xl transition-transform duration-700 group-hover:scale-150" />
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-100/60 p-2 text-blue-600">
                <Layers className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">{t("about.title")}</h2>
            </div>
            <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500" />
            <p className="mt-5 max-w-5xl text-xs sm:text-sm font-medium leading-relaxed text-slate-600">{t("about.body")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}