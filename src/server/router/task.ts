import { Status, Task } from "@prisma/client";
import {
  createTaskSchema,
  updateTaskSchema,
  statuses,
} from "../../schemas/task";
import z from "zod";
import { createRouter } from "./context";

export const taskRouter = createRouter()
  .query("getAll", {
    resolve({ ctx }) {
      return ctx.prisma.task.findMany();
    },
  })
  .query("get", {
    input: z.object({
      id: z.string(),
    }),
    resolve({ input, ctx }) {
      return ctx.prisma.task.findFirstOrThrow({
        where: { id: input.id },
        include: { createdBy: true },
      });
    },
  })
  .query("board", {
    resolve: async ({ ctx }) => {
      const tasks = await ctx.prisma.task.findMany();

      return {
        columns: statuses.reduce((obj, status) => {
          return {
            ...obj,
            [status]: {
              id: status,
              name: status,
              items: tasks.filter((task) => {
                return task.status === status;
              }),
            },
          };
        }, {} as Record<Status, { id: Status; name: string; items: Task[] }>),
        columnOrder: statuses,
      };
    },
  })
  .mutation("create", {
    input: createTaskSchema,
    resolve: async ({ input, ctx }) => {
      const task = ctx.prisma.task.create({
        data: {
          name: input.name,
          status: input.status,
          userId: ctx.session!.user.id,
        },
      });
      return task;
    },
  })
  .mutation("update", {
    input: updateTaskSchema,
    resolve: async ({ input: { id, ...data }, ctx }) => {
      const task = ctx.prisma.task.update({
        where: {
          id,
        },
        data,
      });
      return task;
    },
  })
  .mutation("delete", {
    input: z.string(),
    resolve: async ({ input, ctx }) => {
      return ctx.prisma.task.delete({
        where: {
          id: input,
        },
      });
    },
  });
