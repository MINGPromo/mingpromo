"use server";

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { headers } from "next/headers";

export async function uploadImage(formData: FormData) {
    const file = formData.get("file") as File;

    if (!file) {
        throw new Error("No file uploaded");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name.replace(/\s+/g, "-")}`;

    // Ensure uploads directory exists
    const uploadDir = join(process.cwd(), "public/uploads");
    await mkdir(uploadDir, { recursive: true });

    const path = join(uploadDir, filename);

    await writeFile(path, buffer);

    return `/uploads/${filename}`;
}
