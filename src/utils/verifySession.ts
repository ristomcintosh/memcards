import "server-only"
import { decrypt } from "@/service/session"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const verifySession = async () => {
  const cookie = cookies().get("session")?.value
  const session = await decrypt(cookie)

  if (!session?.userId) {
    redirect("/login")
  }

  return { isAuth: true, userId: session.userId }
}
