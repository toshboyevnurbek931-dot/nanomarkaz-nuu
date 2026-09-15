export const dynamic = "force-dynamic";

import { PrismaClient } from "@prisma/client";
import LabPostList from "@/components/LabPostList";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default async function LabDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const labSlug = params.slug;
  let posts: any[] = [];

  try {
    const db = prisma as any;
    
    // News hamda LabPost jadvallaridan postlarni olish
    const newsPosts = await db.news?.findMany({
      where: { labSlug },
      orderBy: { createdAt: "desc" },
    }).catch(() => []);

    const labPosts = await db.labPost?.findMany({
      where: { labSlug },
      orderBy: { createdAt: "desc" },
    }).catch(() => []);

    const combined = [...(newsPosts || []), ...(labPosts || [])];
    posts = combined.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error("Baza bilan bog'lanishda xatolik:", error);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-slate-900 capitalize">
        Laboratoriya Ilmiy Yangiliklari va Postlari
      </h1>

      <LabPostList posts={posts} />
    </div>
  );
}