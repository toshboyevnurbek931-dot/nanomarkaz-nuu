import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/utils";

type Params = { params: { id: string } };

export async function GET(_request: Request, { params }: Params) {
  const item = await prisma.news.findUnique({ where: { id: params.id } });
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(item);
}

export async function PUT(request: Request, { params }: Params) {
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

  const existing = await prisma.news.findUnique({ where: { id: params.id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const item = await prisma.news.update({
    where: { id: params.id },
    data: {
      title: title?.trim() ?? existing.title,
      content: content?.trim() ?? existing.content,
      imageUrl: imageUrl === undefined ? existing.imageUrl : imageUrl,
      language: language ?? existing.language,
      date: date ? new Date(date) : existing.date,
    },
  });

  return NextResponse.json(item);
}

export async function DELETE(_request: Request, { params }: Params) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  await prisma.news.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
