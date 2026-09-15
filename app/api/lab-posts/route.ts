import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { labSlug, imageUrl, titleUz, titleRu, titleEn, contentUz, contentRu, contentEn } = body;

    const newPost = await prisma.labPost.create({
      data: {
        labSlug,
        imageUrl,
        titleUz,
        titleRu,
        titleEn,
        contentUz,
        contentRu,
        contentEn,
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Post yaratishda xatolik yuz berdi" }, { status: 500 });
  }
}