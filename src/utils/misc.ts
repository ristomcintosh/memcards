import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomChars(length: number) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";
  let randomChars = "";
  for (let i = 0; i < length; i++) {
    randomChars += chars.charAt(generateRandomNumber() % chars.length);
  }
  return randomChars;
}

export function generateRandomNumber() {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0];
}
