export const dynamic = 'force-dynamic';

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { NewsTable } from "@/components/admin/NewsTable";

export default async function AdminHomePage() {
  const news = await prisma.news.findMany({ orderBy: { date: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-950">News articles</h1>
          <p className="mt-1 text-sm text-slate-500">Create, edit and delete multilingual news.</p>
        </div>
        <Link
          href="/admin/news/new"
          className="rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-400"
        >
          New article
        </Link>
      </div>
      <NewsTable items={news} />
    </div>
  );
}
