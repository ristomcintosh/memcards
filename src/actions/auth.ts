"use server"
import { z } from "zod"
import bcrypt from "bcrypt"
import { getUserByUsername, createUser } from "@/service/dbService"
import { createSession } from "@/service/session"
import { redirect } from "next/navigation"
import { loginSchema } from "./auth.schma"

const CreateUserSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(8).max(40),
})

export type ActionState = {
  message: string
}

export const createAccount = async (
  state: ActionState,
  payload: FormData
): Promise<ActionState> => {
  const validation = CreateUserSchema.safeParse({
    username: payload.get("username"),
    password: payload.get("password"),
  })

  if (!validation.success) {
    return { message: "Invalid input" }
  }

  const { username, password } = validation.data
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await createUser(username, hashedPassword)
    await createSession(user.id)

    redirect("/")
  } catch (error) {
    return { message: "Error creating user" }
  }
}

export type LoginActionState = {
  message: string
  formErrors?: {
    username?: string[]
    password?: string[]
  }
}

export type LoginPayload = {
  username: string
  password: string
}

export const login = async (
  payload: LoginPayload
): Promise<LoginActionState> => {
  const validation = loginSchema.safeParse(payload)

  if (!validation.success) {
    const numberOfErrors = Object.keys(
      validation.error.formErrors.fieldErrors
    ).length
    return {
      message: `Failed to save because of ${numberOfErrors} invalid field(s).`,
      formErrors: validation.error.formErrors.fieldErrors,
    }
  }

  const { username, password } = validation.data

  const user = await getUserByUsername(username)

  if (!user) {
    return { message: "Incorrect password or Username" }
  }

  const isValidPassword = await bcrypt.compare(password, user.password)

  if (!isValidPassword) {
    return { message: "Incorrect password or Username" }
  }

  await createSession(user.id)

  redirect("/")
}
