import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, imageUrl, lang, language, labSlug, date } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Sarlavha va matn bo'sh bo'lmasligi kerak" },
        { status: 400 }
      );
    }

    const article = await prisma.news.create({
      data: {
        title: title.trim(),
        content: content.trim(),
        language: language || lang || "uz",
        imageUrl: imageUrl && imageUrl.trim() !== "" ? imageUrl.trim() : null,
        labSlug: labSlug && labSlug.trim() !== "" ? labSlug.trim() : null,
        ...(date ? { date: new Date(date) } : {}),
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error: any) {
    console.error("API POST Error:", error);
    return NextResponse.json(
      { error: error?.message || "Bazada saqlashda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}