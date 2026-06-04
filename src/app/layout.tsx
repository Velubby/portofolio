import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Achmad Ichwani | Web & Mobile Developer",
  description: "Portfolio of Achmad Ichwani, a 6th-semester Informatics Engineering student at Universitas Duta Bangsa Surakarta, specializing in Web and Mobile development.",
  keywords: ["portfolio", "Achmad Ichwani", "Flutter Developer", "Web Developer", "Universitas Duta Bangsa", "Surakarta", "purple theme"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-bg-primary text-text-primary antialiased selection:bg-accent-purple/30 selection:text-text-secondary">
        {children}
      </body>
    </html>
  );
}
