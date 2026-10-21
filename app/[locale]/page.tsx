export const dynamic = "force-dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { CategoryGrid } from "@/components/CategoryGrid";
import { LabsSection } from "@/components/LabsSection";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { 
  MapPin, Phone, Mail, Clock, 
  Atom, Microscope, Cpu, Compass, Layers, 
  Sparkles, FlaskConical, Dna, Database, Network, ChevronRight
} from "lucide-react";

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const t = await getTranslations();

  const [news, labs] = await Promise.all([
    prisma.news.findMany({
      where: { language: params.locale },
      orderBy: { date: "desc" },
    }),
    prisma.lab.findMany({ orderBy: { nameEn: "asc" } }),
  ]);

  return (
    // Ko'zga juda yoqimli, och havorrang va ko'k nanotexnologik ilmiy-amaliy laboratoriya muhiti
    <div className="min-h-screen bg-[#f3f7fa] text-slate-800 space-y-16 pb-20 relative overflow-hidden">
      
      {/* Nanotexnologik laboratoriya to'r va zarrachalar effekti (Och fon uchun) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2edf6_1px,transparent_1px),linear-gradient(to_bottom,#e2edf6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_65%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none" />
      
      {/* Lab muhitini aks ettiruvchi mayin havorrang va neon nur tarqalishlari (Glow effect) */}
      <div className="absolute top-0 left-10 w-[500px] h-[500px] bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-5 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[600px] h-[600px] bg-indigo-50/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-amber-100/20 rounded-full blur-3xl pointer-events-none" />

      {/* 1. YANGILIKLAR BO'LIMI */}
      <section id="news" className="mx-auto max-w-[95%] px-2 sm:px-4 lg:px-6 pt-8 scroll-mt-24 relative z-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          
          {/* Chap tomon: Yangiliklar to'ri (3 ustun) */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-sky-100 rounded-2xl border border-sky-200 shadow-sm shadow-sky-100/50">
                <Atom className="w-8 h-8 text-[#0066cc] animate-spin-slow" />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-wide bg-gradient-to-r from-[#003366] via-[#004d99] to-[#ff6600] bg-clip-text text-transparent border-l-4 border-[#ff6600] pl-3">
                {t("YANGILIKLAR VA VOQEALAR") || "YANGILIKLAR VA VOQEALAR"}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-[#e2eaf1] bg-white shadow-md shadow-sky-100/45 hover:shadow-xl hover:shadow-sky-150/40 transition-all duration-350 hover:border-[#0066cc]/40 h-[460px] group"
                >
                  {/* Rasm qismi (To'liq va original nisbatda, kesilmasdan) */}
                  <div className="relative h-48 w-full bg-[#f8fafc] p-3 overflow-hidden flex items-center justify-center border-b border-[#eef3f7]">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-100/30 to-transparent opacity-20 z-10" />
                    <Image
                      src={item.imageUrl || "https://i.postimg.cc/zG3j4DTC/photo-2026-09-17-14-08-37.jpg"}
                      alt={item.title}
                      fill
                      className="object-contain p-2 z-0 transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Matnlar va batafsil qismi */}
                  <div className="flex flex-1 flex-col justify-between p-5 bg-gradient-to-b from-white to-[#fcfdfe]">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-[10px] font-extrabold text-[#ff6600] bg-[#fff2e6] border border-[#ffe0cc]/70 px-2.5 py-0.5 rounded-full">
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                      </div>
                      
                      {/* Sarlavha: Maksimal 2 qator */}
                      <h3 className="line-clamp-2 text-base font-extrabold text-[#003366] leading-snug min-h-[44px] group-hover:text-[#0052a3] transition-colors">
                        {item.title}
                      </h3>
                      
                      {/* Tavsif (matni): 3 qator */}
                      <p className="line-clamp-3 text-xs text-slate-500 leading-relaxed min-h-[54px]">
                        {item.content}
                      </p>
                    </div>

                    {/* Pastki qism: Batafsil tugmasi */}
                    <div className="border-t border-[#eef3f7] pt-4 flex items-center justify-between">
                      <Link
                        href={`/news/${item.id}`}
                        className="text-xs font-bold text-[#ff6600] hover:text-[#e65c00] inline-flex items-center gap-1 transition-colors"
                      >
                        Batafsil <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <Network className="w-4 h-4 text-[#bfd4e5] group-hover:text-[#0066cc]/50 transition-colors" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* O'ng tomon: Sidebar (Ma'lumot qutilari) */}
          <div className="space-y-6 lg:col-span-1">
            <div className="rounded-2xl border border-[#e2eaf1] bg-white p-5 shadow-md shadow-sky-100/35 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-100/20 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-2 border-b border-[#eef3f7] pb-3">
                <Cpu className="w-5 h-5 text-[#0066cc]" />
                <h3 className="text-sm font-black text-[#003366] uppercase tracking-wide">
                  Markaz axborot tizimi
                </h3>
              </div>
              <p className="mt-3 text-xs text-slate-500 leading-relaxed">
                Kvant va nanotexnologiyalar, ilmiy laboratoriyalar va xalqaro hujjatlar yagona raqamli portalda. So'nggi ilmiy o'zgarishlarni bevosita kuzating.
              </p>
            </div>

            <div className="rounded-2xl border border-[#e2eaf1] bg-white p-5 shadow-md shadow-sky-100/35">
              <div className="flex items-center gap-2 border-b border-[#eef3f7] pb-3">
                <Dna className="w-5 h-5 text-sky-600 animate-pulse" />
                <h3 className="text-sm font-black text-[#003366] uppercase tracking-wide">
                  ⚡ SO'NGGI MA'LUMOTLAR
                </h3>
              </div>
              <div className="mt-4 divide-y divide-[#f2f6f9]">
                {news.slice(0, 5).map((item) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.id}`}
                    className="block py-3 text-xs font-bold text-slate-600 hover:text-[#0066cc] transition-all group flex items-start gap-2"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#ff6600] shrink-0" />
                    <div>
                      <p className="line-clamp-2 leading-snug group-hover:underline">{item.title}</p>
                      <span className="mt-1 block text-[10px] text-slate-450">
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. KATEGORIYA VA LABORATORIYALAR BO'LIMI */}
      <div className="mx-auto max-w-[95%] px-2 sm:px-4 lg:px-6 relative z-10">
        <CategoryGrid />
        <LabsSection labs={labs} locale={params.locale} />
      </div>

      {/* 3. RAHBARIYAT BO'LIMI */}
      <section id="leadership" className="mx-auto max-w-[95%] px-2 sm:px-4 lg:px-6 scroll-mt-24 relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-sky-100 rounded-2xl border border-sky-200">
            <FlaskConical className="w-7 h-7 text-[#0066cc]" />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-wide bg-gradient-to-r from-[#003366] via-[#004d99] to-[#ff6600] bg-clip-text text-transparent border-l-4 border-[#ff6600] pl-3">
            Markaz Rahbariyati
          </h2>
        </div>
        
        <div className="rounded-3xl border border-[#e2eaf1] bg-white shadow-lg p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-sky-100/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative w-48 h-60 sm:w-56 sm:h-72 shrink-0 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-md">
            <Image
              src="https://i.postimg.cc/y6m4KnvP/HD-Uzbek-News-Broadcast-with-Elderly-Speaker.png"
              alt="Akademik Komil Muqimovich Muqimov"
              fill
              className="object-cover object-top"
            />
          </div>
          
          <div className="space-y-5 text-slate-600 flex-1">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-black bg-orange-50 border border-[#ffe0cc]/70 text-[#ff6600] mb-3 uppercase tracking-wider">
                Markaz Rahbari
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#003366]">
                Komil Muqimovich Muqimov
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-sky-700 mt-1">
                Fizika-matematika fanlari doktori, professor, O'zbekiston Fanlar akademiyasi akademigi
              </p>
            </div>

            <div className="border-t border-[#eef3f7] pt-5 space-y-3 text-xs sm:text-sm text-slate-500 leading-relaxed">
              <p>
                <strong>Faoliyati:</strong> O'zbekiston Milliy universiteti qoshidagi Nanotexnologiyalarni rivojlantirish markazi rahbari. Magnetizm, optika, magnetooptika hamda nanomateriallar va spintronika sohalarida yirik ilmiy maktab yaratgan yetakchi olim.
              </p>
              <p>
                <strong>Mukofotlari:</strong> "Do'stlik" ordeni (2024-yil) va "Mehnat Faxriysi" ko'krak nishoni (2023-yil) sohibi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. XODIMLAR VA LABORATORIYA RAHBARLARI BO'LIMI */}
      <section id="staff" className="mx-auto max-w-[95%] px-2 sm:px-4 lg:px-6 scroll-mt-24 relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-sky-100 rounded-2xl border border-sky-200">
            <Microscope className="w-7 h-7 text-[#0066cc]" />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-wide bg-gradient-to-r from-[#003366] via-[#004d99] to-[#ff6600] bg-clip-text text-transparent border-l-4 border-[#ff6600] pl-3">
            Laboratoriya rahbarlari va ilmiy yo'nalishlar
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {labs.map((lab: any) => {
            const labName =
              params.locale === "uz" ? lab.nameUz : params.locale === "ru" ? lab.nameRu : lab.nameEn;
            const headName =
              (params.locale === "uz" ? lab.headUz : params.locale === "ru" ? lab.headRu : lab.headEn) ||
              lab.head ||
              "Laboratoriya mudiri";
            const direction =
              (params.locale === "uz"
                ? lab.directionUz || lab.descriptionUz
                : params.locale === "ru"
                ? lab.directionRu || lab.descriptionRu
                : lab.directionEn || lab.descriptionEn) || "Ilmiy-tadqiqot va amaliy ishlanmalar yo'nalishi";

            const initials = headName
              .split(" ")
              .filter(Boolean)
              .slice(0, 2)
              .map((word: string) => word[0].toUpperCase())
              .join(".");

            return (
              <div
                key={lab.id}
                className="bg-white border border-[#e2eaf1] rounded-2xl p-6 shadow-md shadow-sky-100/35 hover:shadow-lg transition duration-300 hover:border-[#0066cc]/30 flex flex-col justify-between space-y-4 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 group-hover:bg-[#0066cc] text-[#0066cc] group-hover:text-white font-extrabold text-sm flex items-center justify-center shrink-0 border border-sky-100 group-hover:border-[#0066cc] shadow-sm transition duration-300">
                    {initials || "L.R."}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-[#003366] text-base leading-snug">
                      {headName}
                    </h3>
                    <p className="text-xs font-bold text-[#ff6600]">
                      {labName}
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#eef3f7] pt-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Ilmiy yo'nalishi:
                  </span>
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {direction}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. ALOQA BO'LIMI */}
      <section id="contact" className="mx-auto max-w-[95%] px-2 sm:px-4 lg:px-6 scroll-mt-24 relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-sky-100 rounded-2xl border border-sky-200">
            <Database className="w-7 h-7 text-[#0066cc]" />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-wide bg-gradient-to-r from-[#003366] via-[#004d99] to-[#ff6600] bg-clip-text text-transparent border-l-4 border-[#ff6600] pl-3">
            Aloqa Ma'lumotlari
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="bg-white border border-[#e2eaf1] rounded-2xl p-5 shadow-md shadow-sky-100/35 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-sky-50 text-[#0066cc] shrink-0 border border-sky-100 shadow-inner">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-[#003366] text-sm">Manzil</h4>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  100174, Toshkent shahri, Olmazor tumani, Universitet ko'chasi, 4-uy (O'zMU Bosh binosi)
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#e2eaf1] rounded-2xl p-5 shadow-md shadow-sky-100/35 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-sky-50 text-[#0066cc] shrink-0 border border-sky-100 shadow-inner">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-[#003366] text-sm">Telefon va Faks</h4>
                <p className="text-xs text-slate-500 mt-1.5">Ofis: +998 71 246 54 17</p>
                <p className="text-xs text-slate-500">Faks: +998 71 246 02 24</p>
              </div>
            </div>

            <div className="bg-white border border-[#e2eaf1] rounded-2xl p-5 shadow-md shadow-sky-100/35 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-sky-50 text-[#0066cc] shrink-0 border border-sky-100 shadow-inner">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-[#003366] text-sm">Elektron pochta</h4>
                <p className="text-xs text-slate-500 mt-1.5">nano-center@nuu.uz</p>
              </div>
            </div>

            <div className="bg-white border border-[#e2eaf1] rounded-2xl p-5 shadow-md shadow-sky-100/35 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-sky-50 text-[#0066cc] shrink-0 border border-sky-100 shadow-inner">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-[#003366] text-sm">Ish tartibi</h4>
                <p className="text-xs text-slate-500 mt-1.5">Dushanba - Shanba: 09:00 - 18:00</p>
                <p className="text-xs text-slate-500">Yakshanba: Dam olish kuni</p>
              </div>
            </div>

          </div>

          <div className="bg-gradient-to-br from-[#003366] to-[#001f3f] border border-[#001f3f] text-white rounded-2xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl" />
            <div>
              <h3 className="text-lg font-black text-amber-400 mb-2">Markaz Axborot Xizmati</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ilmiy hamkorlik, laboratoriya xizmatlari yoki tadqiqotlar bo'yicha savollaringiz bo'lsa, ko'rsatilgan aloqa kanallari orqali bog'lanishingiz mumkin.
              </p>
            </div>
            <div className="mt-6 border-t border-sky-950 pt-4 text-[10px] font-bold text-sky-300/60 uppercase">
              O'zbekiston Milliy Universiteti qoshidagi Nanotexnologiyalarni rivojlantirish markazi
            </div>
          </div>
        </div>
      </section>

      {/* 6. BIZ HAQIMIZDA BO'LIMI */}
      <section className="mx-auto max-w-[95%] px-2 sm:px-4 lg:px-6 relative z-10">
        <div className="rounded-3xl border border-[#e2eaf1] bg-white p-6 sm:p-8 shadow-lg relative overflow-hidden">
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center gap-2">
            <div className="p-2 bg-sky-100 rounded-2xl border border-sky-200">
              <Layers className="w-6 h-6 text-[#0066cc]" />
            </div>
            <h2 className="text-2xl font-black text-[#003366]">{t("about.title")}</h2>
          </div>
          <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-[#ff6600] to-amber-500" />
          <p className="mt-5 leading-8 text-slate-500 text-sm sm:text-base">{t("about.body")}</p>
        </div>
      </section>
    </div>
  );
}