import { createRouter } from "./context";
import { signupSchema } from "../../schemas/signup";
const bcrypt = require("bcrypt");

export const authRouter = createRouter()
  .query("getSession", {
    resolve({ ctx }) {
      return ctx.session;
    },
  })
  .mutation("signup", {
    input: signupSchema,
    resolve: async ({ input, ctx }) => {
      const hash = await bcrypt.hash(input.password, 0);
      const { password, ...user } = await ctx.prisma.user.create({
        data: { email: input.email, name: input.name, password: hash },
      });
      return user;
    },
  });
