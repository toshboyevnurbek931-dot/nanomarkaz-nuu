"use client";

import { useState } from "react";

export interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl?: string | null;
  createdAt?: string | Date;
}

export default function LabPostList({ posts }: { posts: Post[] }) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  if (posts.length === 0) {
    return (
      <div className="p-8 text-center bg-gray-50 rounded-xl border border-gray-200">
        <p className="text-gray-500 font-medium">
          Ushbu laboratoriya uchun hozircha hech qanday post kiritilmagan.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Postlar ro'yxati grid ko'rinishida */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
          >
            <div>
              {post.imageUrl && (
                <div className="w-full h-56 overflow-hidden bg-gray-100">
                  <img
                    src={post.imageUrl}
                    alt={post.title || "Laboratoriya rasmi"}
                    className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
              )}
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 line-clamp-3 whitespace-pre-line text-sm">
                  {post.content}
                </p>
              </div>
            </div>
            <div className="px-5 pb-4 pt-0">
              <span className="text-xs font-semibold text-blue-600 group-hover:underline">
                Batafsil ko'rish →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Postni to'liq ekranda ochuvchi Modal oyna */}
      {selectedPost && (
        <div
          onClick={() => setSelectedPost(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl cursor-default"
          >
            {/* Yopish tugmasi */}
            <button
              type="button"
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-700 w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg transition"
            >
              ✕
            </button>

            {/* Modal ichidagi rasm */}
            {selectedPost.imageUrl && (
              <div className="w-full max-h-[60vh] overflow-hidden rounded-xl mb-6 bg-gray-100 flex items-center justify-center">
                <img
                  src={selectedPost.imageUrl}
                  alt={selectedPost.title}
                  className="w-full h-auto max-h-[60vh] object-contain rounded-xl"
                />
              </div>
            )}

            {/* Modal ichidagi sarlavha va matn */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pr-10">
              {selectedPost.title}
            </h2>
            <div className="text-gray-700 whitespace-pre-line leading-relaxed text-base border-t pt-4 border-gray-100">
              {selectedPost.content}
            </div>
          </div>
        </div>
      )}
    </>
  );
}