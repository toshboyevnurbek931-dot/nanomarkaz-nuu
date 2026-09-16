import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/utils";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const item = await prisma.news.findUnique({
      where: { id },
    });

    if (!item) {
      return NextResponse.json({ error: "Yangilik topilmadi" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error("GET /api/news/[id] xatosi:", error);
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  // Admin tekshiruvi
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const body = await request.json();

    const {
      title,
      content,
      imageUrl,
      date,
      language,
      slug, // agar slug ham tahrirlanadigan bo‘lsa
    } = body as {
      title?: string;
      content?: string;
      imageUrl?: string | null;
      date?: string;
      language?: string;
      slug?: string;
    };

    // Mavjud yozuvni tekshirish
    const existing = await prisma.news.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Yangilik topilmadi" }, { status: 404 });
    }

    // Yangilash
    const updated = await prisma.news.update({
      where: { id },
      data: {
        title: title !== undefined ? title.trim() : existing.title,
        content: content !== undefined ? content.trim() : existing.content,
        imageUrl: imageUrl !== undefined ? imageUrl : existing.imageUrl,
        language: language !== undefined ? language : existing.language,
        date: date ? new Date(date) : existing.date,
        ...(slug !== undefined && { slug: slug.trim() }),
        updatedAt: new Date(), // agar schema da updatedAt bo‘lsa
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("PUT /api/news/[id] xatosi:", error);

    // Prisma unique constraint xatosi (masalan slug takrorlangan)
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Bunday slug allaqachon mavjud" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Yangilikni yangilashda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;

    const existing = await prisma.news.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Yangilik topilmadi" }, { status: 404 });
    }

    await prisma.news.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true, message: "Muvaffaqiyatli o‘chirildi" });
  } catch (error) {
    console.error("DELETE /api/news/[id] xatosi:", error);
    return NextResponse.json(
      { error: "O‘chirishda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}