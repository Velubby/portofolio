import type { Metadata, Viewport } from "next";
import "./globals.css";
import AmbientSignals from "@/components/AmbientSignals";
import CommandPalette from "@/components/CommandPalette";
import ViewTransitions from "@/components/ViewTransitions";

const siteUrl = "https://portofolio-velubbys-projects.vercel.app";

export const viewport: Viewport = {
  themeColor: "#fafafa",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "velubby — enthusiast",
  description: "I build things and publish the source. Repositories, stack, and contact.",
  openGraph: {
    title: "velubby — enthusiast",
    description: "I build things and publish the source.",
    type: "website",
    url: siteUrl,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "velubby — enthusiast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "velubby — enthusiast",
    description: "I build things and publish the source.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-canvas text-ink antialiased">
        <noscript>
          <style>{`
            .reveal-pending { opacity: 1 !important; transform: none !important; }
          `}</style>
        </noscript>
        <AmbientSignals />
        <ViewTransitions />
        <div className="relative z-10 flex flex-1 flex-col">{children}</div>
        <CommandPalette />
      </body>
    </html>
  );
}
