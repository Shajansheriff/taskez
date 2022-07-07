// src/server/router/context.ts
import { User } from "@prisma/client";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import {
  Session,
  unstable_getServerSession as getServerSession,
} from "next-auth";

import { authOptions as nextAuthOptions } from "../../pages/api/auth/[...nextauth]";
import { prisma } from "../db/client";

type UserSession =
  | (Session & {
      user: Omit<User, "password">;
    })
  | null
  | undefined;

export const createContext = async (
  opts?: trpcNext.CreateNextContextOptions
) => {
  const req = opts?.req;
  const res = opts?.res;

  const session =
    req &&
    res &&
    ((await getServerSession(req, res, nextAuthOptions)) as UserSession);

  return {
    req,
    res,
    session,
    prisma,
  };
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
