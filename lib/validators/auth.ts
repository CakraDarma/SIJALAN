import { z } from "zod";

export const SignInValidator = z.object({
  email: z.string().min(2).max(32),
  password: z.string().min(2).max(32),
});
export const SignUpValidator = z.object({
  name: z
    .string()
    .min(2)
    .max(32)
    .regex(/^[a-zA-Z0-9_]+$/),
  email: z.string().min(2).max(32),
  password: z.string().min(2).max(32),
});
