"use server"
import bcrypt from "bcrypt"
import { getUserByUsernameOrEmail, createUser } from "@/service/dbService"
import { createSession } from "@/service/session"
import { redirect } from "next/navigation"
import { CreateUserSchema, loginSchema } from "./auth.schma"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { ensureError } from "@/utils/errors"

export type CreateAccountResult = {
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

  const { username, password, email } = validation.data
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await createUser(username, email, hashedPassword)
    await createSession(user.id)
  } catch (err: unknown) {
    const error = ensureError(err)
    if (isUniqueConstraintError(error)) {
      const target = error.meta?.target
      if (!Array.isArray(target)) {
        return { message: "The email or username is already taken." }
      }

      const field = target.includes("email") ? "email" : "username"

      return {
        message: `User with this ${field} already exists.`,
        errors: { [field]: ["Already taken"] },
      }
    }
    return { message: "Error creating user" }
  }

  redirect("/")
}

function isUniqueConstraintError(
  error: Error
): error is PrismaClientKnownRequestError {
  return (
    error instanceof PrismaClientKnownRequestError && error.code === "P2002"
  )
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

  const user = await getUserByUsernameOrEmail(username)

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
