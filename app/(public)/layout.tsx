import React from "react";
import "@/styles/base.css";
import "@/styles/header.css";
import "@/styles/footer.css";
import "@/styles/intro.css";
import "@/styles/pages/landing-hero.css";
import { LanguageProvider } from "@/components/public/LanguageContext";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <LanguageProvider>
            {children}
        </LanguageProvider>
    );
}

