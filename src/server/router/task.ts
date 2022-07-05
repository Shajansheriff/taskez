import { createRouter } from "./context";
import { z } from "zod";

export const taskRouter = createRouter()
  .query("getAll", {
    resolve({ ctx }) {
      return ctx.prisma.task.findMany()
    },
  })
