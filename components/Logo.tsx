// components/Logo.tsx
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="relative w-12 h-12 md:w-14 md:h-14 shrink-0">
        <Image
          src="/logo.png" // yoki Supabase public URL
          alt="Nanotexnologiyalarni rivojlantirish markazi"
          fill
          className="object-contain drop-shadow-md group-hover:scale-105 transition-transform"
          priority
          sizes="(max-width: 768px) 48px, 56px"
        />
      </div>
      <div className="hidden sm:block">
        <p className="text-sm md:text-base font-bold text-white leading-tight">
          O‘ZMU

        </p>
        <p className="text-xs md:text-sm font-semibold text-blue-100 leading-tight">
          NANOTEXNOLOGIYALARNI RIVOJLANTIRISH MARKAZI
        </p>
      </div>
    </Link>
  );
  export function Logo() {
  // ...
}
}