"use server";

import { writeFile, mkdir, readdir, stat, unlink } from "fs/promises";
import { basename, join, resolve, sep } from "path";
import { revalidatePath } from "next/cache";
import sharp from "sharp";
import { requireDashboardUser } from "@/lib/dashboard-auth";

export interface MediaFile {
    name: string;
    url: string;
    size: number;
    createdAt: string;
}

const ALLOWED_MIME_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg+xml",
];

const MAX_FILE_SIZE = 15 * 1024 * 1024; // Diperbesar ke 15MB karena nantinya dikompres otomatis

function getUploadDir(): string {
    return join(process.cwd(), "public/uploads");
}

/**
 * Upload and automatically compress image using sharp
 */
export async function uploadImage(formData: FormData): Promise<string> {
    await requireDashboardUser();
    const file = formData.get("file") as File;
    const customName = (formData.get("customName") as string || "").trim();

    if (!file) {
        throw new Error("No file uploaded");
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        throw new Error("Invalid file type. Only JPG, PNG, WEBP, GIF, and SVG are allowed.");
    }

    if (file.size > MAX_FILE_SIZE) {
        throw new Error("File size exceeds 15MB limit.");
    }

    const bytes = await file.arrayBuffer();
    const rawBuffer = Buffer.from(bytes);

    const uploadDir = getUploadDir();
    await mkdir(uploadDir, { recursive: true });

    const timestamp = Date.now();
    // Ambil nama dasar tanpa ekstensi, prioritaskan customName jika diisi admin
    const baseToSanitize = customName || (
        file.name.substring(0, file.name.lastIndexOf(".")) || file.name
    );
    const sanitizedBase = baseToSanitize
        .toLowerCase()
        .replace(/[^a-z0-9.-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, ""); // trim hyphens

    let finalBuffer: Buffer;
    let filename: string;

    // SVG atau GIF animasi dibiarkan sesuai aslinya
    if (file.type === "image/svg+xml" || file.type === "image/gif") {
        const ext = file.name.split(".").pop() || "svg";
        filename = `${timestamp}-${sanitizedBase || "file"}.${ext}`;
        finalBuffer = rawBuffer;
    } else {
        // Konversi dan kompresi otomatis ke WebP dengan sharp
        // - Resize max width 1920px (cocok untuk banner/layar besar), aspect ratio tetap
        // - Kualitas WebP 80% (sangat tajam & hemat memori s.d 70-85%)
        filename = `${timestamp}-${sanitizedBase || "image"}.webp`;
        finalBuffer = await sharp(rawBuffer)
            .resize({
                width: 1920,
                withoutEnlargement: true, // Jangan perbesar jika gambar aslinya kecil
                fit: "inside",
            })
            .webp({ quality: 80, effort: 4 })
            .toBuffer();
    }

    const filePath = join(uploadDir, filename);
    await writeFile(filePath, finalBuffer);

    revalidatePath("/dashboard/media");
    return `/uploads/${filename}`;
}

/**
 * Get all media files from public/uploads
 */
export async function getMediaFiles(): Promise<MediaFile[]> {
    await requireDashboardUser();
    const uploadDir = getUploadDir();

    try {
        await mkdir(uploadDir, { recursive: true });
        const filenames = await readdir(uploadDir);

        const filesData: MediaFile[] = [];

        for (const name of filenames) {
            // Ignore hidden files / gitkeep
            if (name.startsWith(".")) continue;

            const filePath = join(uploadDir, name);
            const fileStat = await stat(filePath);

            if (fileStat.isFile()) {
                filesData.push({
                    name,
                    url: `/uploads/${name}`,
                    size: fileStat.size,
                    createdAt: fileStat.birthtime.toISOString(),
                });
            }
        }

        // Sort descending by date (newest first)
        filesData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return filesData;
    } catch (error) {
        console.error("Error reading media files:", error);
        return [];
    }
}

/**
 * Delete a media file by filename
 */
export async function deleteMediaFile(filename: string): Promise<{ success: boolean; error?: string }> {
    await requireDashboardUser();
    try {
        const uploadRoot = resolve(getUploadDir());
        if (!filename || basename(filename) !== filename) {
            throw new Error("Invalid filename");
        }
        const filePath = resolve(uploadRoot, filename);
        if (!filePath.startsWith(`${uploadRoot}${sep}`)) {
            throw new Error("Invalid file path");
        }

        await unlink(filePath);
        revalidatePath("/dashboard/media");
        return { success: true };
    } catch (error: unknown) {
        console.error("Failed to delete file:", error);
        return { success: false, error: error instanceof Error ? error.message : "Failed to delete file" };
    }
}
