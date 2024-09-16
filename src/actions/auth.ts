"use server"
import bcrypt from "bcrypt"
import {
  getUserByUsernameOrEmail,
  createUser,
  copyTutorialDeckToUser,
} from "@/service/dbService"
import { createSession, deleteSession, ONE_DAY } from "@/service/session"
import { redirect } from "next/navigation"
import { CreateUserSchema, LoginSchema } from "./auth.schema"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { ensureError } from "@/utils/errors"
import { generateRandomChars, generateRandomNumber } from "@/utils/misc"

export type CreateAccountResult = {
  message: string
  errors?: {
    username?: string[]
    password?: string[]
    email?: string[]
  }
}

export const createAccount = async (
  payload: CreateUserSchema,
): Promise<CreateAccountResult | undefined> => {
  const validation = CreateUserSchema.safeParse(payload)

  if (!validation.success) {
    const numberOfErrors = Object.keys(
      validation.error.formErrors.fieldErrors,
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
    await copyTutorialDeckToUser(user.id)
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
  error: Error,
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

export const login = async (
  payload: LoginSchema,
): Promise<LoginResult | undefined> => {
  const validation = LoginSchema.safeParse(payload)

  if (!validation.success) {
    const numberOfErrors = Object.keys(
      validation.error.formErrors.fieldErrors,
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

export const logout = async () => {
  deleteSession()
  redirect("/login")
}

export const createDemoAccount = async () => {
  const unique = generateRandomNumber()
  const username = `memcards_demo_${unique}`
  const email = `${username}@demo.com`
  const password = generateRandomChars(16)

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await createUser(username, email, hashedPassword)
    await copyTutorialDeckToUser(user.id)
    await createSession(user.id, ONE_DAY)
  } catch (err: unknown) {
    const error = ensureError(err)
    console.error(error)
    return
  }

  redirect("/")
}
