import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://mingpromo.com"),
  title: "MING Promotion | OOH Media Solutions",
  description: "PT Mitra Inovasi Gemilang - Leading Out-of-Home (OOH) advertising company in Indonesia. Videotron, Mobile LED, Billboard, and more.",
  keywords: ["OOH", "Advertising", "Videotron", "Mobile LED", "Billboard", "Indonesia", "MING Promotion"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}

