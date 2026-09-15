import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Barcha laboratoriyalarni olish (Frontend uchun)
export async function GET() {
  try {
    const labs = await prisma.lab.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(labs);
  } catch (error) {
    return NextResponse.json({ error: "Laboratoriyalarni yuklashda xatolik" }, { status: 500 });
  }
}

// Yangi laboratoriya qo'shish (Admin panel uchun)
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newLab = await prisma.lab.create({
      data: {
        slug: body.slug,
        imageUrl: body.imageUrl,
        nameUz: body.nameUz,
        nameRu: body.nameRu,
        nameEn: body.nameEn,
        headUz: body.headUz,
        headRu: body.headRu,
        headEn: body.headEn,
        descriptionUz: body.descriptionUz,
        descriptionRu: body.descriptionRu,
        descriptionEn: body.descriptionEn,
      },
    });

    return NextResponse.json({ message: "Laboratoriya muvaffaqiyatli saqlandi!", data: newLab }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Ma'lumot saqlashda xatolik yuz berdi" }, { status: 500 });
  }
}