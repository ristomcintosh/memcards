"use server";

import { redirect } from "next/navigation";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import bcrypt from "bcrypt";
import {
  copyTutorialDeckToUser,
  createUser,
} from "@/service/database/db-service";
import { createSession } from "@/service/session";
import { ensureError } from "@/utils/errors";
import { CreateUserSchema } from "./SignupForm.utils";

export type CreateAccountResult = {
  message: string;
  errors?: {
    username?: string[];
    password?: string[];
    email?: string[];
  };
};

export const createAccount = async (
  payload: CreateUserSchema,
): Promise<CreateAccountResult | undefined> => {
  const validation = CreateUserSchema.safeParse(payload);

  if (!validation.success) {
    const numberOfErrors = Object.keys(
      validation.error.formErrors.fieldErrors,
    ).length;
    return {
      message: `Failed to save because of ${numberOfErrors} invalid field(s).`,
      errors: validation.error.formErrors.fieldErrors,
    };
  }

  const { username, password, email } = validation.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await createUser(username, email, hashedPassword);
    await copyTutorialDeckToUser(user.id);
    await createSession(user.id);
  } catch (err: unknown) {
    const error = ensureError(err);
    if (isUniqueConstraintError(error)) {
      const target = error.meta?.target;
      if (!Array.isArray(target)) {
        return { message: "The email or username is already taken." };
      }

      const field = target.includes("email") ? "email" : "username";

      return {
        message: `User with this ${field} already exists.`,
        errors: { [field]: ["Already taken"] },
      };
    }
    return { message: "Error creating user" };
  }

  redirect("/");
};

function isUniqueConstraintError(
  error: Error,
): error is PrismaClientKnownRequestError {
  return (
    error instanceof PrismaClientKnownRequestError && error.code === "P2002"
  );
}
