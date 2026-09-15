import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, imageUrl, lang, labSlug } = body;

    const db = prisma as any;
    const targetModel = db.newsArticle || db.news || db.labPost;

    if (!targetModel) {
      return NextResponse.json(
        { error: "Baza modeli topilmadi" },
        { status: 500 }
      );
    }

    const article = await targetModel.create({
      data: {
        title,
        content,
        imageUrl: imageUrl || null,
        lang: lang || "uz",
        labSlug: labSlug || null,
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Saqlashda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}