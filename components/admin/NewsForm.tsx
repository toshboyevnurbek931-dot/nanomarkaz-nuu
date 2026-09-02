"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { News } from "@prisma/client";

export function NewsForm({ article }: { article?: News }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(article?.imageUrl ?? "");
  const [uploading, setUploading] = useState(false);

  async function uploadFile(file: File) {
    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: data });
    const json = await res.json();
    setUploading(false);
    if (res.ok && json.url) {
      setImageUrl(json.url);
    } else {
      setError("Image upload failed");
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const payload = {
      title: String(form.get("title") || ""),
      content: String(form.get("content") || ""),
      language: String(form.get("language") || "uz"),
      date: String(form.get("date") || ""),
      imageUrl: imageUrl || null,
    };

    const url = article ? `/api/news/${article.id}` : "/api/news";
    const method = article ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const json = await res.json().catch(() => ({}));
      setError(json.error || "Save failed");
    }
  }

  const dateValue = article
    ? new Date(article.date).toISOString().slice(0, 10)
    : new Date().toISOString().slice(0, 10);

  return (
    <form onSubmit={onSubmit} className="mt-8 max-w-3xl space-y-5 rounded-xl border border-slate-200 bg-white p-6">
      <label className="block text-sm font-medium">
        Title
        <input
          name="title"
          required
          defaultValue={article?.title}
          className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2"
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Language
          <select
            name="language"
            defaultValue={article?.language ?? "uz"}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2"
          >
            <option value="uz">O‘zbekcha</option>
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </select>
        </label>
        <label className="block text-sm font-medium">
          Date
          <input
            name="date"
            type="date"
            required
            defaultValue={dateValue}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2"
          />
        </label>
      </div>
      <label className="block text-sm font-medium">
        Image file
        <input
          type="file"
          accept="image/*"
          className="mt-1 block w-full text-sm"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void uploadFile(file);
          }}
        />
      </label>
      {uploading ? <p className="text-sm text-slate-500">Uploading…</p> : null}
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt="" className="h-40 w-auto rounded-lg object-cover" />
      ) : null}
      <label className="block text-sm font-medium">
        Image URL (optional)
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="/uploads/photo.jpg"
          className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2"
        />
      </label>
      <label className="block text-sm font-medium">
        Content
        <textarea
          name="content"
          required
          rows={12}
          defaultValue={article?.content}
          className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2"
        />
      </label>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-navy-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-800 disabled:opacity-60"
      >
        {loading ? "Saving…" : article ? "Update" : "Publish"}
      </button>
    </form>
  );
}
