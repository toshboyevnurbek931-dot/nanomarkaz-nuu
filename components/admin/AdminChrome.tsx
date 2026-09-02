"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export function AdminChrome({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="bg-navy-950 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/admin" className="text-sm font-bold tracking-wide">
            NANO MARKAZ · CMS
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/uz" className="text-white/70 hover:text-white">
              View site
            </Link>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="rounded-md bg-white/10 px-3 py-1.5 hover:bg-white/20"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
    </div>
  );
}
