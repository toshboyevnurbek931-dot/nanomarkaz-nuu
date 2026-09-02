"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { News } from "@prisma/client";

export function NewsTable({ items }: { items: News[] }) {
  const router = useRouter();

  async function onDelete(id: string) {
    if (!confirm("Delete this article?")) return;
    const res = await fetch(`/api/news/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
  }

  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Lang</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t border-slate-100">
              <td className="px-4 py-3 font-medium text-navy-950">{item.title}</td>
              <td className="px-4 py-3 uppercase">{item.language}</td>
              <td className="px-4 py-3 text-slate-500">
                {new Date(item.date).toISOString().slice(0, 10)}
              </td>
              <td className="px-4 py-3 text-right">
                <Link href={`/admin/news/${item.id}`} className="mr-3 text-navy-700 hover:underline">
                  Edit
                </Link>
                <button type="button" onClick={() => onDelete(item.id)} className="text-red-600 hover:underline">
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {items.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-4 py-10 text-center text-slate-400">
                No articles yet.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
