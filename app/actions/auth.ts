"use server";

import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

export async function login(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const user = await prisma.user.findUnique({
        where: { email },
    });

    // In a real app, verify password hash here (e.g., bcrypt.compare)
    // For this demo and consistent 'admin' seed, we do direct comparison
    if (!user || user.password !== password) {
        return { error: "Invalid credentials" };
    }

    // Set session cookie
    (await cookies()).set("ming_session", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
    });

    // Store email for ident (not secure auth, just for UI consistency in this simple demo)
    (await cookies()).set("ming_user_email", email, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
    });

    return { success: true };
}

export async function logout() {
    (await cookies()).delete("ming_session");
    (await cookies()).delete("ming_user_email");
    return { success: true };
}
