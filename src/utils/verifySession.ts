import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "server-only";
import { SESSION_COOKIE, decrypt } from "@/service/session";

export const verifySession = async () => {
  const cookie = cookies().get(SESSION_COOKIE)?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/login");
  }

  return { isAuth: true, userId: session.userId };
};
