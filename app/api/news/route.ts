import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const language = searchParams.get("language");

  const news = await prisma.news.findMany({
    where: language ? { language } : undefined,
    orderBy: { date: "desc" },
  });

  return NextResponse.json(news);
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = await request.json();
  const { title, content, imageUrl, date, language } = body as {
    title?: string;
    content?: string;
    imageUrl?: string | null;
    date?: string;
    language?: string;
  };

  if (!title?.trim() || !content?.trim() || !language) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const item = await prisma.news.create({
    data: {
      title: title.trim(),
      content: content.trim(),
      imageUrl: imageUrl || null,
      language,
      date: date ? new Date(date) : new Date(),
    },
  });

  return NextResponse.json(item, { status: 201 });
}
