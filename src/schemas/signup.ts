import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").trim(),
  email: z.string({ required_error: "Email is required" }).email(),
  password: z.string().min(6, "Password must be at least 6 characters").max(20),
});

export type SignupFormValues = z.infer<typeof signupSchema>;
