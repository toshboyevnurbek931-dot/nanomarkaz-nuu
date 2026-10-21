export const dynamic = "force-dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { CategoryGrid } from "@/components/CategoryGrid";
import { LabsSection } from "@/components/LabsSection";
import { NeuralCanvas } from "@/components/NeuralCanvas";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import {
  MapPin, Phone, Mail, Clock, Atom, Microscope, Cpu, Layers,
  FlaskConical, Database, ChevronRight, BrainCircuit, ArrowRight, Radio,
} from "lucide-react";
import type { ReactNode } from "react";

const FALLBACK_IMG = "https://i.postimg.cc/zG3j4DTC/photo-2026-09-17-14-08-37.jpg";
const IMG_SIZES = "(min-width:1280px) 24vw, (min-width:640px) 40vw, 92vw";

function SectionTitle({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25">
        {icon}
      </div>
      <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">{children}</h2>
      <div className="hidden h-px flex-1 bg-gradient-to-r from-sky-300 to-transparent sm:block" />
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
  const card = "rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/60";

  return (
    <div className="min-h-screen bg-[#f4f8fc] pb-24 text-slate-800 antialiased">
      {/* HERO — AI neyron tarmoq muhiti */}
      <section className="relative isolate overflow-hidden border-b border-sky-100 bg-gradient-to-b from-white via-sky-50 to-[#f4f8fc]">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#dbeafe_1px,transparent_1px),linear-gradient(to_bottom,#dbeafe_1px,transparent_1px)] bg-[size:48px_48px] opacity-60 [mask-image:radial-gradient(ellipse_70%_80%_at_50%_30%,#000_40%,transparent_100%)]" />
        <NeuralCanvas className="absolute inset-0 -z-10 h-full w-full" />
        <div className="absolute -top-24 left-1/4 -z-10 h-80 w-80 rounded-full bg-sky-300/30 blur-3xl" />
        <div className="absolute -right-10 top-10 -z-10 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />

        <div className={`${wrap} grid items-center gap-10 py-16 lg:grid-cols-[1.4fr_1fr] lg:py-24`}>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-1.5 text-sm font-semibold text-sky-700 backdrop-blur">
              <BrainCircuit className="h-4 w-4" /> Sun&apos;iy intellekt bilan boyitilgan ilmiy muhit
            </span>
            <h1 className="mt-5 text-4xl font-black leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Nanotexnologiyalarni rivojlantirish markazi
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              O&apos;zbekiston Milliy universiteti qoshidagi ilmiy-tadqiqot markazi: kvant materiallar, nanotexnologiya
              va zamonaviy laboratoriyalar bir raqamli portalda.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#news" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700">
                So&apos;nggi yangiliklar <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#staff" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-bold text-slate-800 transition hover:border-blue-500 hover:text-blue-700">
                Laboratoriyalar
              </a>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
            {[
              { n: labs.length, l: "Laboratoriya", i: <Microscope className="h-5 w-5" /> },
              { n: news.length, l: "Yangilik va voqea", i: <Radio className="h-5 w-5" /> },
              { n: 3, l: "Til: UZ · RU · EN", i: <Layers className="h-5 w-5" /> },
            ].map((s) => (
              <div key={s.l} className="flex items-center gap-4 rounded-2xl border border-white/80 bg-white/75 p-4 shadow-lg shadow-sky-200/40 backdrop-blur-md lg:p-5">
                <div className="hidden h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-700 sm:flex">{s.i}</div>
                <div>
                  <div className="text-3xl font-black text-slate-900">{s.n}</div>
                  <div className="text-sm font-medium text-slate-600">{s.l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 1. YANGILIKLAR */}
      <section id="news" className={`${wrap} scroll-mt-28 pt-14`}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <SectionTitle icon={<Atom className="h-6 w-6" />}>Yangiliklar va voqealar</SectionTitle>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {news.map((item) => (
                <article key={item.id} className={`${card} group flex flex-col overflow-hidden transition hover:-translate-y-1 hover:border-sky-400 hover:shadow-xl hover:shadow-sky-200/60`}>
                  <div className="relative h-56 w-full border-b border-slate-100 bg-slate-50">
                    <Image
                      src={item.imageUrl || FALLBACK_IMG}
                      alt={item.title}
                      fill
                      sizes={IMG_SIZES}
                      quality={90}
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <time className="w-fit rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700 ring-1 ring-orange-200">
                      {new Date(item.date).toLocaleDateString()}
                    </time>
                    <h3 className="mt-3 line-clamp-2 min-h-[3.2rem] text-lg font-bold leading-snug text-slate-900 transition group-hover:text-blue-700">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{item.content}</p>
                    <Link href={`/news/${item.id}`} className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-bold text-blue-700 hover:text-blue-900">
                      Batafsil <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className={`${card} p-5`}>
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Cpu className="h-5 w-5 text-blue-600" />
                <h3 className="font-bold text-slate-900">Markaz axborot tizimi</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Kvant va nanotexnologiyalar, ilmiy laboratoriyalar va xalqaro hujjatlar yagona raqamli portalda.
              </p>
            </div>

            <div className={`${card} p-5`}>
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange-500" />
                </span>
                <h3 className="font-bold text-slate-900">So&apos;nggi ma&apos;lumotlar</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {news.slice(0, 5).map((item) => (
                  <Link key={item.id} href={`/news/${item.id}`} className="group block py-3">
                    <p className="line-clamp-2 text-sm font-semibold leading-snug text-slate-800 group-hover:text-blue-700">{item.title}</p>
                    <span className="mt-1 block text-xs text-slate-500">{new Date(item.date).toLocaleDateString()}</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* 2. KATEGORIYA VA LABORATORIYALAR */}
      <div className={`${wrap} mt-16`}>
        <CategoryGrid />
        <LabsSection labs={labs} locale={params.locale} />
      </div>

      {/* 3. RAHBARIYAT */}
      <section id="leadership" className={`${wrap} mt-16 scroll-mt-28`}>
        <SectionTitle icon={<FlaskConical className="h-6 w-6" />}>Markaz rahbariyati</SectionTitle>
        <div className={`${card} flex flex-col items-center gap-8 p-6 sm:p-8 md:flex-row md:items-start`}>
          <div className="relative h-72 w-56 shrink-0 overflow-hidden rounded-2xl border border-slate-200 shadow-md sm:h-80 sm:w-64">
            <Image
              src="https://i.postimg.cc/y6m4KnvP/HD-Uzbek-News-Broadcast-with-Elderly-Speaker.png"
              alt="Akademik Komil Muqimovich Muqimov"
              fill sizes="256px" quality={90}
              className="object-cover object-top"
            />
          </div>
          <div className="flex-1 space-y-5">
            <div>
              <span className="inline-block rounded-full bg-orange-50 px-3 py-1 text-sm font-bold text-orange-700 ring-1 ring-orange-200">Markaz rahbari</span>
              <h3 className="mt-3 text-3xl font-black text-slate-900">Komil Muqimovich Muqimov</h3>
              <p className="mt-1 font-semibold text-sky-700">
                Fizika-matematika fanlari doktori, professor, O&apos;zbekiston Fanlar akademiyasi akademigi
              </p>
            </div>
            <div className="space-y-3 border-t border-slate-100 pt-5 leading-7 text-slate-700">
              <p><strong className="text-slate-900">Faoliyati:</strong> O&apos;zbekiston Milliy universiteti qoshidagi Nanotexnologiyalarni rivojlantirish markazi rahbari. Magnetizm, optika, magnetooptika hamda nanomateriallar va spintronika sohalarida yirik ilmiy maktab yaratgan yetakchi olim.</p>
              <p><strong className="text-slate-900">Mukofotlari:</strong> &quot;Do&apos;stlik&quot; ordeni (2024-yil) va &quot;Mehnat Faxriysi&quot; ko&apos;krak nishoni (2023-yil) sohibi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LABORATORIYA RAHBARLARI */}
      <section id="staff" className={`${wrap} mt-16 scroll-mt-28`}>
        <SectionTitle icon={<Microscope className="h-6 w-6" />}>Laboratoriya rahbarlari va ilmiy yo&apos;nalishlar</SectionTitle>
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
              <div key={lab.id} className={`${card} group space-y-4 p-6 transition hover:border-sky-400 hover:shadow-lg`}>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sm font-extrabold text-sky-800 transition group-hover:bg-blue-600 group-hover:text-white">
                    {initials || "L.R."}
                  </div>
                  <div>
                    <h3 className="text-base font-bold leading-snug text-slate-900">{headName}</h3>
                    <p className="mt-1 text-sm font-semibold text-orange-700">{labName}</p>
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-3">
                  <span className="mb-1 block text-xs font-bold text-slate-500">Ilmiy yo&apos;nalishi</span>
                  <p className="line-clamp-3 text-sm leading-6 text-slate-600">{direction}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. ALOQA */}
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
              <div key={c.h} className={`${card} flex items-start gap-4 p-5`}>
                <div className="rounded-xl bg-sky-100 p-3 text-sky-700">{c.i}</div>
                <div>
                  <h4 className="font-bold text-slate-900">{c.h}</h4>
                  {c.p.map((line) => (
                    <p key={line} className="mt-1 text-sm leading-6 text-slate-600">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 to-sky-600 p-6 text-white shadow-lg shadow-blue-600/25">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
            <div className="relative">
              <h3 className="text-xl font-extrabold">Markaz axborot xizmati</h3>
              <p className="mt-2 text-sm leading-6 text-sky-50">
                Ilmiy hamkorlik, laboratoriya xizmatlari yoki tadqiqotlar bo&apos;yicha savollaringiz bo&apos;lsa, ko&apos;rsatilgan aloqa kanallari orqali bog&apos;lanishingiz mumkin.
              </p>
            </div>
            <p className="relative mt-6 border-t border-white/25 pt-4 text-sm font-semibold text-white">
              O&apos;zbekiston Milliy universiteti qoshidagi Nanotexnologiyalarni rivojlantirish markazi
            </p>
          </div>
        </div>
      </section>

      {/* 6. BIZ HAQIMIZDA */}
      <section className={`${wrap} mt-16`}>
        <div className={`${card} p-6 sm:p-8`}>
          <div className="flex items-center gap-3">
            <Layers className="h-7 w-7 text-blue-600" />
            <h2 className="text-2xl font-extrabold text-slate-900">{t("about.title")}</h2>
          </div>
          <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-orange-500 to-amber-400" />
          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-700">{t("about.body")}</p>
        </div>
      </section>
    </div>
  );
}
