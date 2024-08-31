"use server"
import bcrypt from "bcrypt"
import { getUserByUsername, createUser } from "@/service/dbService"
import { createSession } from "@/service/session"
import { redirect } from "next/navigation"
import { CreateUserSchema, loginSchema } from "./auth.schma"

type CreateAccountResult = {
  message: string
  errors?: {
    username?: string[]
    password?: string[]
    email?: string[]
  }
}

export type CreateAccountPayload = {
  email: string
  username: string
  password: string
}

export const createAccount = async (
  payload: CreateAccountPayload
): Promise<CreateAccountResult> => {
  const validation = CreateUserSchema.safeParse(payload)

  if (!validation.success) {
    const numberOfErrors = Object.keys(
      validation.error.formErrors.fieldErrors
    ).length
    return {
      message: `Failed to save because of ${numberOfErrors} invalid field(s).`,
      errors: validation.error.formErrors.fieldErrors,
    }
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

type LoginResult = {
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

export const login = async (payload: LoginPayload): Promise<LoginResult> => {
  const validation = loginSchema.safeParse(payload)

  if (!validation.success) {
    const numberOfErrors = Object.keys(
      validation.error.formErrors.fieldErrors
    ).length
    return {
      message: `Failed because of ${numberOfErrors} invalid field(s).`,
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
