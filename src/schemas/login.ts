import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required " })
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required"),
  remember: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
