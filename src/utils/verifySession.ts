import "server-only"
import { decrypt, SESSION_COOKIE } from "@/service/session"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const verifySession = async () => {
  const cookie = cookies().get(SESSION_COOKIE)?.value
  const session = await decrypt(cookie)

  if (!session?.userId) {
    redirect("/login")
  }

  return { isAuth: true, userId: session.userId }
}
