import "server-only"
import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export const SESSION_COOKIE = "session"

type SessionPayload = {
  userId: string
  expiresAt: Date
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify<SessionPayload>(session, encodedKey, {
      algorithms: ["HS256"],
    })
    return payload
  } catch (error) {
    console.log("Failed to verify session")
  }
}

export async function createSession(userId: string) {
  const sevenDays = Date.now() + 7 * 24 * 60 * 60 * 1000
  const expiresAt = new Date(sevenDays)
  const session = await encrypt({ userId, expiresAt })

  cookies().set(SESSION_COOKIE, session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  })
}

export function deleteSession() {
  cookies().delete(SESSION_COOKIE)
}
