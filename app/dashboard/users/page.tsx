import { prisma } from "@/lib/db";
import { UserManager } from "@/components/dashboard/user-manager";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' }
    });

    // In a real app, verifying the session token would yield the user info.
    // Here we will try to read a hypothetical 'ming_user_email' cookie 
    // which we will add in the next step to auth.ts
    const userEmail = (await cookies()).get("ming_user_email")?.value;

    return <UserManager initialUsers={users} currentUserEmail={userEmail} />;
}
