import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "velubby — Mobile & Web Developer",
  description: "Flutter apps and web tools that work. Repositories, stack, and contact.",
  openGraph: {
    title: "velubby — Mobile & Web Developer",
    description: "Flutter apps and web tools that work.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-canvas text-ink antialiased">{children}</body>
    </html>
  );
}
