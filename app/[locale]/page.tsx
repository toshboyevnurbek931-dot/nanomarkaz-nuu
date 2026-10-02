export const dynamic = "force-dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { CategoryGrid } from "@/components/CategoryGrid";
import { LabsSection } from "@/components/LabsSection";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { MapPin, Phone, Mail, Clock, Beaker } from "lucide-react";

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
    <div className="min-h-screen bg-slate-50/50 space-y-12 pb-16">
      {/* 1. YANGILIKLAR BO'LIMI */}
      <section id="news" className="mx-auto max-w-[95%] px-2 sm:px-4 lg:px-6 pt-6 scroll-mt-24">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          
          {/* Chap tomon: Barcha yangiliklar to'ri (3 ustun) */}
          <div className="lg:col-span-3">
            <h2 className="mb-4 text-xl font-bold text-navy-950 uppercase tracking-wide border-l-4 border-orange-500 pl-3">
              {t("YANGILIKLAR VA VOQEALAR") || "YANGILIKLAR VA VOQEALAR"}
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="relative h-44 w-full bg-slate-100">
                    <Image
                      src={item.imageUrl || "https://i.postimg.cc/zG3j4DTC/photo-2026-09-17-14-08-37.jpg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-4">
                    <div>
                      <span className="text-[10px] font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                      <h3 className="mt-2 line-clamp-2 text-sm font-bold text-slate-900 leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-xs text-slate-600">
                        {item.content}
                      </p>
                    </div>
                    <div className="mt-4 border-t border-slate-100 pt-3">
                      <Link
                        href={`/news/${item.id}`}
                        className="text-xs font-bold text-navy-900 hover:text-orange-500"
                      >
                        Batafsil →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* O'ng tomon: Sidebar */}
          <div className="space-y-6 lg:col-span-1">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="border-b border-slate-100 pb-2 text-sm font-bold text-navy-950">
                Markaz axborot tizimi
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Ilmiy yangiliklar, laboratoriyalar va hujjatlar yagona portalda. So'nggi ma'lumotlarni kuzatib boring.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="border-b border-slate-100 pb-2 text-sm font-bold text-navy-950">
                ⚡ SO'NGGI MA'LUMOTLAR
              </h3>
              <div className="mt-3 divide-y divide-slate-100">
                {news.slice(0, 5).map((item) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.id}`}
                    className="block py-2.5 text-xs font-medium text-slate-700 hover:text-orange-500 transition-colors"
                  >
                    <p className="line-clamp-2 leading-snug">{item.title}</p>
                    <span className="mt-1 block text-[10px] text-slate-400">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. KATEGORIYA VA LABORATORIYALAR BO'LIMI */}
      <div className="mx-auto max-w-[95%] px-2 sm:px-4 lg:px-6">
        <CategoryGrid />
        <LabsSection labs={labs} locale={params.locale} />
      </div>

      {/* 3. RAHBARIYAT BO'LIMI (id="leadership") */}
      <section id="leadership" className="mx-auto max-w-[95%] px-2 sm:px-4 lg:px-6 scroll-mt-24">
        <h2 className="mb-6 text-xl font-bold text-navy-950 uppercase tracking-wide border-l-4 border-orange-500 pl-3">
          Markaz Rahbariyati
        </h2>
        
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="relative w-48 h-60 sm:w-56 sm:h-72 shrink-0 rounded-xl overflow-hidden border-2 border-slate-200 bg-slate-100 shadow-sm">
            <Image
              src="https://i.postimg.cc/y6m4KnvP/HD-Uzbek-News-Broadcast-with-Elderly-Speaker.png"
              alt="Akademik Komil Muqimovich Muqimov"
              fill
              className="object-cover object-top"
            />
          </div>
          
          <div className="space-y-4 text-slate-800 flex-1">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-600 mb-2">
                Markaz Rahbari
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-navy-950">
                Komil Muqimovich Muqimov
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                Fizika-matematika fanlari doktori, professor, O'zbekiston Fanlar akademiyasi akademigi
              </p>
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
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

      {/* 4. XODIMLAR VA LABORATORIYA RAHBARLARI BO'LIMI (id="staff") */}
      <section id="staff" className="mx-auto max-w-[95%] px-2 sm:px-4 lg:px-6 scroll-mt-24">
        <h2 className="mb-6 text-xl font-bold text-navy-950 uppercase tracking-wide border-l-4 border-orange-500 pl-3">
          Laboratoriya rahbarlari va ilmiy yo'nalishlar
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {labs.map((lab: any) => {
            // Til bo'yicha ma'lumotlarni tanlash
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

            // Ismdan bosh harflarni yaratish (Monogramma)
            const initials = headName
              .split(" ")
              .filter(Boolean)
              .slice(0, 2)
              .map((word: string) => word[0].toUpperCase())
              .join(".");

            return (
              <div
                key={lab.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-navy-950 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                    {initials || "L.R."}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-navy-950 text-base leading-snug">
                      {headName}
                    </h3>
                    <p className="text-xs font-semibold text-orange-600">
                      {labName}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Ilmiy yo'nalishi:
                  </span>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {direction}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. ALOQA BO'LIMI (id="contact") */}
      <section id="contact" className="mx-auto max-w-[95%] px-2 sm:px-4 lg:px-6 scroll-mt-24">
        <h2 className="mb-6 text-xl font-bold text-navy-950 uppercase tracking-wide border-l-4 border-orange-500 pl-3">
          Aloqa Ma'lumotlari
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-start gap-4">
              <div className="p-3 rounded-lg bg-slate-100 text-navy-950 shrink-0">
                <MapPin className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <h4 className="font-bold text-navy-950 text-sm">Manzil</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  100174, Toshkent shahri, Olmazor tumani, Universitet ko'chasi, 4-uy (O'zMU Bosh binosi)
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-start gap-4">
              <div className="p-3 rounded-lg bg-slate-100 text-navy-950 shrink-0">
                <Phone className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <h4 className="font-bold text-navy-950 text-sm">Telefon va Faks</h4>
                <p className="text-xs text-slate-600 mt-1">Ofis: +998 71 246 54 17</p>
                <p className="text-xs text-slate-600">Faks: +998 71 246 02 24</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-start gap-4">
              <div className="p-3 rounded-lg bg-slate-100 text-navy-950 shrink-0">
                <Mail className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <h4 className="font-bold text-navy-950 text-sm">Elektron pochta</h4>
                <p className="text-xs text-slate-600 mt-1">nano-center@nuu.uz</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-start gap-4">
              <div className="p-3 rounded-lg bg-slate-100 text-navy-950 shrink-0">
                <Clock className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <h4 className="font-bold text-navy-950 text-sm">Ish tartibi</h4>
                <p className="text-xs text-slate-600 mt-1">Dushanba - Shanba: 09:00 - 18:00</p>
                <p className="text-xs text-slate-600">Yakshanba: Dam olish kuni</p>
              </div>
            </div>

          </div>

          <div className="bg-navy-950 text-white rounded-xl p-6 flex flex-col justify-between shadow-sm">
            <div>
              <h3 className="text-lg font-bold text-orange-400 mb-2">Markaz Axborot Xizmati</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ilmiy hamkorlik, laboratoriya xizmatlari yoki tadqiqotlar bo'yicha savollaringiz bo'lsa, ko'rsatilgan aloqa kanallari orqali bog'lanishingiz mumkin.
              </p>
            </div>
            <div className="mt-6 border-t border-white/10 pt-4 text-[11px] text-slate-400">
              O'zbekiston Milliy Universiteti qoshidagi Nanotexnologiyalarni rivojlantirish markazi
            </div>
          </div>
        </div>
      </section>

      {/* 6. BIZ HAQIMIZDA BO'LIMI */}
      <section className="mx-auto max-w-[95%] px-2 sm:px-4 lg:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-navy-950">{t("about.title")}</h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-orange-500" />
          <p className="mt-5 leading-7 text-slate-600 text-sm sm:text-base">{t("about.body")}</p>
        </div>
      </section>
    </div>
  );
}