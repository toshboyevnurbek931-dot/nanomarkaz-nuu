import Image from "next/image";
import { Link } from "@/i18n/routing";

export function Logo() {
  return (
    <div className="relative h-10 w-10 shrink-0 sm:h-12 sm:w-12">
      <Image
        src="/logo.png"          // logo rasmi public/logo.png da bo‘lishi kerak
        alt="Nanotexnologiyalarni rivojlantirish markazi"
        fill
        className="object-contain drop-shadow-md"
        priority
        sizes="(max-width: 640px) 40px, 48px"
      />
    </div>
  );
}