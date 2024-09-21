"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import {
  copyTutorialDeckToUser,
  createUser,
} from "@/service/database/db-service";
import { ONE_DAY, createSession } from "@/service/session";
import { ensureError } from "@/utils/errors";

export const createDemoAccount = async () => {
  const unique = generateRandomNumber();
  const username = `memcards_demo_${unique}`;
  const email = `${username}@demo.com`;
  const password = generateRandomChars(16);

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await createUser(username, email, hashedPassword);
    await copyTutorialDeckToUser(user.id);
    await createSession(user.id, ONE_DAY);
  } catch (err: unknown) {
    const error = ensureError(err);
    console.error(error);
    return;
  }

  redirect("/");
};

function generateRandomChars(length: number) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";
  let randomChars = "";
  for (let i = 0; i < length; i++) {
    randomChars += chars.charAt(generateRandomNumber() % chars.length);
  }
  return randomChars;
}

function generateRandomNumber() {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0];
}
