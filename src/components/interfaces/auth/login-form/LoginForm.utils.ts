import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  password: z.string().trim().min(1, "Password is required"),
});

export type LoginSchema = z.infer<typeof LoginSchema>;
