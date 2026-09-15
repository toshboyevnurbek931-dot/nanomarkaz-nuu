export const dynamic = "force-dynamic";

import { PrismaClient } from "@prisma/client";

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
    const targetModel = db.newsArticle || db.news || db.labPost;

    if (targetModel) {
      posts = await targetModel.findMany({
        where: { labSlug },
        orderBy: { createdAt: "desc" },
      });
    }
  } catch (error) {
    console.error("Baza bilan bog'lanishda xatolik:", error);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-slate-900 capitalize">
        Laboratoriya Ilmiy Yangiliklari va Postlari
      </h1>

      {posts.length === 0 ? (
        <div className="p-8 text-center bg-gray-50 rounded-xl border">
          <p className="text-gray-500 font-medium">
            Ushbu laboratoriya uchun hozircha hech qanday post kiritilmagan.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title || "Laboratoriya rasmi"}
                  className="w-full h-56 object-cover"
                />
              )}
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 whitespace-pre-line">
                  {post.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}