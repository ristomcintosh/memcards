import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import "server-only";
import { SESSION_COOKIE } from "./constants";
import { type DurationInMilliseconds, SEVEN_DAYS } from "./utils";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
  userId: string;
  expiresAt: Date;
};

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify<SessionPayload>(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session", error);
  }
}

async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(payload.expiresAt)
    .sign(encodedKey);
}

export async function createSession(
  userId: string,
  durationInMilliseconds: DurationInMilliseconds = SEVEN_DAYS,
) {
  const expiresAt = new Date(Date.now() + durationInMilliseconds);
  const session = await encrypt({ userId, expiresAt });

  (await cookies()).set(SESSION_COOKIE, session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  (await cookies()).delete(SESSION_COOKIE);
}
