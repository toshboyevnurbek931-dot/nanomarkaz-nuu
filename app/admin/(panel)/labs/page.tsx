"use client";

import { useState } from "react";

const LABORATORIES = [
  { id: "funksional-nanomateriallar", name: "Funksional nanomateriallar laboratoriyasi" },
  { id: "murakkab-tuzilmalar", name: "Murakkab tuzilmalar nanofizikasi laboratoriyasi" },
  { id: "nanotermoelektrik", name: "Nanotermoelektrik laboratoriyasi" },
  { id: "kvant-fotonikasi", name: "Kvant fotonikasi laboratoriyasi" },
];

export default function AdminLabPostsPage() {
  const [formData, setFormData] = useState({
    labSlug: "funksional-nanomateriallar",
    imageUrl: "",
    titleUz: "",
    titleRu: "",
    titleEn: "",
    contentUz: "",
    contentRu: "",
    contentEn: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/lab-posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Laboratoriya posti muvaffaqiyatli saqlandi!");
        setFormData({
          labSlug: "funksional-nanomateriallar",
          imageUrl: "",
          titleUz: "",
          titleRu: "",
          titleEn: "",
          contentUz: "",
          contentRu: "",
          contentEn: "",
        });
      } else {
        alert("Xatolik yuz berdi!");
      }
    } catch (error) {
      alert("Server bilan aloqa uzildi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg my-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Laboratoriyaga Yangi Post / Ma'lumot Joylash
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Laboratoriyani tanlang:
          </label>
          <select
            name="labSlug"
            value={formData.labSlug}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50 font-medium"
          >
            {LABORATORIES.map((lab) => (
              <option key={lab.id} value={lab.id}>
                {lab.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Rasm havolasi (URL):
          </label>
          <input
            type="text"
            name="imageUrl"
            placeholder="https://example.com/rasm.jpg"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <hr className="my-4" />

        <div className="space-y-3">
          <h3 className="font-bold text-blue-600">O'zbek tilida</h3>
          <input
            type="text"
            name="titleUz"
            placeholder="Post sarlavhasi (UZ)"
            value={formData.titleUz}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />
          <textarea
            name="contentUz"
            rows={4}
            placeholder="Post mazmuni va to'liq ma'lumot (UZ)"
            value={formData.contentUz}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-blue-600">Rus tilida (ixtiyoriy)</h3>
          <input
            type="text"
            name="titleRu"
            placeholder="Заголовок (RU)"
            value={formData.titleRu}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
          <textarea
            name="contentRu"
            rows={3}
            placeholder="Описание (RU)"
            value={formData.contentRu}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-blue-600">Ingliz tilida (ixtiyoriy)</h3>
          <input
            type="text"
            name="titleEn"
            placeholder="Title (EN)"
            value={formData.titleEn}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
          <textarea
            name="contentEn"
            rows={3}
            placeholder="Content (EN)"
            value={formData.contentEn}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-200"
        >
          {loading ? "Saqlanmoqda..." : "Postni Joylash"}
        </button>
      </form>
    </div>
  );
}