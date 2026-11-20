"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Locale = "en" | "id";

interface LanguageContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (en: string, id?: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
    locale: "id",
    setLocale: () => {},
    t: (en) => en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>("id");

    useEffect(() => {
        const saved = localStorage.getItem("ming_lang") as Locale | null;
        if (saved === "en" || saved === "id") {
            setLocaleState(saved);
        }
    }, []);

    const setLocale = (l: Locale) => {
        setLocaleState(l);
        try {
            localStorage.setItem("ming_lang", l);
        } catch (_) {}
    };

    const t = (en: string, id?: string) => {
        if (locale === "id" && id) return id;
        return en;
    };

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}

