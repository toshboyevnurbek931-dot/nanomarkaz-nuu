export const dynamic = 'force-dynamic';

import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { NewsForm } from "@/components/admin/NewsForm";

export default async function EditNewsPage({ params }: { params: { id: string } }) {
  const article = await prisma.news.findUnique({ where: { id: params.id } });
  if (!article) notFound();

  return (
    <div>
      <Link href="/admin" className="text-sm text-navy-700 hover:underline">
        ← Back
      </Link>
      <h1 className="mt-3 text-2xl font-bold text-navy-950">Edit article</h1>
      <NewsForm article={article} />
    </div>
  );
}
