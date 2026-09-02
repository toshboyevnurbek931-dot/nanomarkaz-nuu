import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const labs = await prisma.lab.findMany({ orderBy: { nameEn: "asc" } });
  return NextResponse.json(labs);
}
