import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

export async function requireDashboardUser() {
  const cookieStore = await cookies();
  const hasSession = cookieStore.get("ming_session")?.value === "true";
  const email = cookieStore.get("ming_user_email")?.value;

  if (!hasSession || !email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, name: true },
  });

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}
