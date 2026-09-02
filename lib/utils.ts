import { NextResponse } from "next/server";
import { auth } from "./auth";

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export function formatDate(value: Date | string, locale: string) {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat(locale === "uz" ? "uz-UZ" : locale === "ru" ? "ru-RU" : "en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}
