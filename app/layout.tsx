import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans, Poppins } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-family",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jakartaSans.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

