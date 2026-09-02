import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export async function Footer() {
  const t = await getTranslations();
  const phones = t.raw("footer.phones") as string[];

  return (
    <footer className="bg-navy-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-gold-400">
            {t("footer.about")}
          </h3>
          <p className="mt-4 text-sm leading-6 text-white/75">{t("about.body")}</p>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-gold-400">
            {t("footer.quick")}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <Link href="/directions" className="hover:text-gold-400">
                {t("nav.directions")}
              </Link>
            </li>
            <li>Laser spectroscopy methods</li>
            <li>Faraday effect</li>
            <li>Scanning electron microscopy</li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-gold-400">
            {t("footer.contact")}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>{t("footer.address")}</li>
            <li>
              {t("footer.office")}: {phones[0]}
            </li>
            <li>
              {t("footer.fax")}: {phones[1]}
            </li>
            <li>
              {t("footer.mail")}:{" "}
              <a className="hover:text-gold-400" href={`mailto:${t("footer.email")}`}>
                {t("footer.email")}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p className="text-xs text-white/60">{t("footer.copyright")}</p>
          <div className="terminal-credit rounded-md border border-white/15 bg-black/40 px-3 py-1.5 text-xs text-white/80">
            <span className="text-emerald-400">&gt;_</span> Developer:{" "}
            <span className="font-semibold text-orange-400">Nurbek Toshboyev</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
