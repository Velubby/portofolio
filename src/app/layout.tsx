import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "velubby — enthusiast",
  description: "I build things and publish the source. Repositories, stack, and contact.",
  openGraph: {
    title: "velubby — enthusiast",
    description: "I build things and publish the source.",
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
