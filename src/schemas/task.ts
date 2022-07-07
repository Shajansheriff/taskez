import { Status } from "@prisma/client";
import { z } from "zod";

export const statuses = Object.values(Status);

export const createTaskSchema = z.object({
  name: z.string().min(1),
  status: z.nativeEnum(Status),
});

export const updateTaskSchema = z.object({
  name: z.string().min(1).optional(),
  status: z.nativeEnum(Status).optional(),
  description: z.string().optional(),
  id: z.string(),
});

export type CreateTaskPayload = z.infer<typeof createTaskSchema>;
