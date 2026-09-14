import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nanotexnologiyalarni rivojlantirish markazi",
  description: "O‘zMU Nanotexnologiyalarni rivojlantirish markazi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
