"use server"
import { z } from "zod"
import bcrypt from "bcrypt"
import { getUserByUsername, createUser } from "@/service/dbService"
import { createSession } from "@/service/session"
import { redirect } from "next/navigation"

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
}

const LoginSchema = z.object({
  username: z.string().trim().min(1).min(3).max(20),
  password: z.string().trim().min(1),
})

export const login = async (state: LoginActionState, payload: FormData) => {
  const validation = LoginSchema.safeParse({
    password: payload.get("password"),
    username: payload.get("username"),
  })

  if (!validation.success) {
    return { message: "Incorrect password or Username" }
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
