import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").trim(),
  email: z.string().email(),
  password: z.string().min(6).max(20),
});
