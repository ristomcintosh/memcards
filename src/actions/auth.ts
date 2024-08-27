"use server"
import { z } from "zod"
import bcrypt from "bcrypt"
import { createUser as saveUser } from "@/service/dbService"

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
    await saveUser(username, hashedPassword)
    return { message: "User created" }
  } catch (error) {
    return { message: "Error creating user" }
  }
}

export type LoginActionState = {
  message: string
}

const LoginSchema = z.object({
  password: z.string({ required_error: "Password is required" }),
})

export const login = async (state: LoginActionState, payload: FormData) => {
  const validation = LoginSchema.safeParse({
    password: payload.get("password"),
  })
}
