import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { requireAdmin } from "@/lib/utils";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // service_role key ishlating (anon key emas!)
);

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

const MAX_SIZE = 50 * 1024 * 1024; // 50 MB

export async function POST(request: NextRequest) {
  // Admin tekshiruvi
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "general"; // news, labs, documents...

    if (!file) {
      return NextResponse.json({ error: "Fayl topilmadi" }, { status: 400 });
    }

    // Format tekshiruvi
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Ruxsat etilmagan fayl turi. Faqat rasm, PDF, Word va video yuklash mumkin." },
        { status: 400 }
      );
    }

    // Hajm tekshiruvi
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Fayl hajmi 50 MB dan oshmasligi kerak" },
        { status: 400 }
      );
    }

    // Fayl nomi xavfsiz qilish
    const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
    const safeName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`;

    // Buffer ga aylantirish
    const buffer = Buffer.from(await file.arrayBuffer());

    // Supabase Storage ga yuklash
    const { data, error } = await supabase.storage
      .from("nanomarkaz") // ← bucket nomi (o‘zingiz yaratgan)
      .upload(safeName, buffer, {
        contentType: file.type,
        upsert: false,
        cacheControl: "3600",
      });

    if (error) {
      console.error("Supabase upload xatosi:", error);
      return NextResponse.json(
        { error: "Faylni yuklashda xatolik: " + error.message },
        { status: 500 }
      );
    }

    // Public URL olish
    const { data: publicData } = supabase.storage
      .from("nanomarkaz")
      .getPublicUrl(safeName);

    return NextResponse.json({
      url: publicData.publicUrl,
      path: safeName,
      type: file.type,
      size: file.size,
      name: file.name,
    });
  } catch (error: any) {
    console.error("Upload route xatosi:", error);
    return NextResponse.json(
      { error: "Server xatosi: " + (error.message || "Noma’lum xato") },
      { status: 500 }
    );
  }
}