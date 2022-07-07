import { Status, Task } from "@prisma/client";
import {
  CreateTaskPayload,
  createTaskSchema,
  statuses,
} from "../../schemas/task";
import { createRouter } from "./context";

export const taskRouter = createRouter()
  .query("getAll", {
    resolve({ ctx }) {
      return ctx.prisma.task.findMany();
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
  });
