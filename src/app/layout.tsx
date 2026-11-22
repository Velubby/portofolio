import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Achmad Ichwani | Web & Mobile Developer",
  description: "Portfolio of Achmad Ichwani, a 7th-semester Informatics Engineering student at Universitas Duta Bangsa Surakarta. Builds Flutter apps and responsive web tools.",
  keywords: ["portfolio", "Achmad Ichwani", "Flutter Developer", "Web Developer", "Universitas Duta Bangsa", "Surakarta"],
  openGraph: {
    title: "Achmad Ichwani | Web & Mobile Developer",
    description: "Flutter apps and responsive web tools by Achmad Ichwani — Universitas Duta Bangsa Surakarta.",
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
      <body className="min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
