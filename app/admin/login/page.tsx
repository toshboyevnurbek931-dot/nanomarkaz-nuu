"use client";
export const dynamic = 'force-dynamic';


import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      username: String(form.get("username") || ""),
      password: String(form.get("password") || ""),
      redirect: false,
    });
    setLoading(false);
    if (res?.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Invalid credentials");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-xl border border-white/10 bg-white p-6 shadow-xl"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Restricted</p>
        <h1 className="mt-2 text-lg font-semibold text-navy-950">Sign in</h1>
        <label className="mt-6 block text-sm font-medium text-slate-600">
          Username
          <input
            name="username"
            autoComplete="username"
            required
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-navy-700"
          />
        </label>
        <label className="mt-4 block text-sm font-medium text-slate-600">
          Password
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-navy-700"
          />
        </label>
        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-md bg-navy-950 py-2.5 text-sm font-semibold text-white hover:bg-navy-800 disabled:opacity-60"
        >
          {loading ? "..." : "Enter"}
        </button>
      </form>
    </div>
  );
}
