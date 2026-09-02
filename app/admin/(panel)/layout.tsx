import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { AdminChrome } from "@/components/admin/AdminChrome";

export default async function AdminPanelLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  return <AdminChrome>{children}</AdminChrome>;
}
