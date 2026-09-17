import Image from "next/image";

export function Logo() {
  return (
    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full sm:h-12 sm:w-12">
      <Image
        src="https://i.postimg.cc/zG3j4DTC/photo-2026-09-17-14-08-37.jpg"
        alt="O'zMU Nanotexnologiyalar Markazi Logo"
        fill
        className="object-contain"
        sizes="(max-width: 640px) 40px, 48px"
        priority
      />
    </div>
  );
}