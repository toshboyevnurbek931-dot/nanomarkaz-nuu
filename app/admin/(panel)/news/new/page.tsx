"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateArticlePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    lang: "uz",
    date: new Date().toISOString().split("T")[0],
    imageUrl: "",
    content: "",
    labSlug: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Muvaffaqiyatli saqlandi!");
        router.push("/admin/news");
        router.refresh();
      } else {
        alert("Xatolik yuz berdi!");
      }
    } catch (error) {
      alert("Server bilan aloqa xatosi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md my-8">
      <button
        type="button"
        onClick={() => router.back()}
        className="text-sm text-gray-500 hover:text-gray-800 mb-4 inline-block"
      >
        ← Ortga
      </button>

      <h1 className="text-2xl font-bold mb-6 text-gray-900">
        Yangilik yaratish
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sarlavha (Title)
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Til (Language)
            </label>
            <select
              name="lang"
              value={formData.lang}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white"
            >
              <option value="uz">O'zbekcha</option>
              <option value="ru">Русский</option>
              <option value="en">English</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sana (Date)
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Laboratoriya yo'nalishi (Ixtiyoriy)
          </label>
          <select
            name="labSlug"
            value={formData.labSlug}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white"
          >
            <option value="">-- Markazning Umumiy Yangiligi --</option>
            <option value="functional-nanomaterials">
              Funksional nanomateriallar laboratoriyasi
            </option>
            <option value="complex-structures">
              Murakkab tuzilmalar nanofizikasi laboratoriyasi
            </option>
            <option value="nanothermoelectrics">
              Nanotermoelektrika laboratoriyasi
            </option>
            <option value="quantum-photonics">
              Kvant fotonikasi laboratoriyasi
            </option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rasm havolasi (Image URL)
          </label>
          <input
            type="text"
            name="imageUrl"
            placeholder="https://..."
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Matn (Content)
          </label>
          <textarea
            name="content"
            rows={6}
            value={formData.content}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition"
        >
          {loading ? "Saqlanmoqda..." : "Chop etish"}
        </button>
      </form>
    </div>
  );
}