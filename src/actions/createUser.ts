import { z } from "zod"

const CreateUserSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(8).max(40),
})

export type ActionState = {
  message: string
}

export const createUser = (
  state: ActionState,
  payload: FormData
): ActionState => {
  const validation = CreateUserSchema.safeParse({
    username: payload.get("username"),
    password: payload.get("password"),
  })

  if (!validation.success) {
    return { message: "Invalid input" }
  }

  return { message: "User created" }
}
