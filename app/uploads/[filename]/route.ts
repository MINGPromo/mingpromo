import { readFile } from "fs/promises";
import { basename, extname, join } from "path";

export const dynamic = "force-dynamic";

const contentTypes: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

async function serveUpload(filename: string) {
  const safeName = basename(filename);
  const extension = extname(safeName).toLowerCase();

  if (safeName !== filename || !contentTypes[extension]) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const file = await readFile(join(process.cwd(), "public", "uploads", safeName));
    return new Response(new Uint8Array(file), {
      headers: {
        "Content-Type": contentTypes[extension],
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}

export async function GET(_request: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;
  return serveUpload(filename);
}

export async function HEAD(_request: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;
  const response = await serveUpload(filename);
  return new Response(null, { status: response.status, headers: response.headers });
}
