import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  password: z.string().trim().min(1, "Password is required"),
});

export type LoginSchema = z.infer<typeof LoginSchema>;

export const CreateUserSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long." })
    .max(40, { message: "Username must be less than 40 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Must be at least 8 characters long" })
    .max(64, { message: "Password must be less than 64 characters long" })
    .regex(/[a-zA-Z]/, { message: "Should contain at least one letter." })
    .regex(/[0-9]/, { message: "Should contain at least one number." })
    .trim(),
});

export type CreateUserSchema = z.infer<typeof CreateUserSchema>;
