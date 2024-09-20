"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { getUserByUsernameOrEmail } from "@/service/database/db-service";
import { createSession } from "@/service/session";
import { LoginSchema } from "./auth.schema";

export type LoginResult = {
  message: string;
  formErrors?: {
    username?: string[];
    password?: string[];
  };
};

export const login = async (
  payload: LoginSchema,
): Promise<LoginResult | undefined> => {
  const validation = LoginSchema.safeParse(payload);

  if (!validation.success) {
    const numberOfErrors = Object.keys(
      validation.error.formErrors.fieldErrors,
    ).length;
    return {
      message: `Failed because of ${numberOfErrors} invalid field(s).`,
      formErrors: validation.error.formErrors.fieldErrors,
    };
  }

  const { username, password } = validation.data;

  const user = await getUserByUsernameOrEmail(username);

  if (!user) {
    return { message: "Incorrect password or Username" };
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return { message: "Incorrect password or Username" };
  }

  await createSession(user.id);

  redirect("/");
};
