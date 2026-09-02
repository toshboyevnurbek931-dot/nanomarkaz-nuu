import Link from "next/link";
import { NewsForm } from "@/components/admin/NewsForm";

export default function NewNewsPage() {
  return (
    <div>
      <Link href="/admin" className="text-sm text-navy-700 hover:underline">
        ← Back
      </Link>
      <h1 className="mt-3 text-2xl font-bold text-navy-950">Create article</h1>
      <NewsForm />
    </div>
  );
}
