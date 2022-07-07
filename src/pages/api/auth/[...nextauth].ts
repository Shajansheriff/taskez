import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const bcrypt = require("bcrypt");

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { LoginFormValues } from "../../../schemas/login";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      authorize: async (values: unknown, _req) => {
        const credentials = values as LoginFormValues | undefined;
        if (
          !credentials ||
          Array.isArray(credentials) ||
          typeof credentials !== "object"
        ) {
          return null;
        }
        try {
          const record = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
          });

          if (!record || !credentials.password) {
            return null;
          }

          const { password, ...user } = record;
          const isMatch = await bcrypt.compare(credentials.password, password);

          return isMatch ? user : null;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("Signin", { user, account, profile, email, credentials });

      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log("redirect", { url, baseUrl });

      return baseUrl;
    },
    async session({ session, user, token }) {
      console.log("session", { session, user, token });

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("jwt", { token, user, account, profile, isNewUser });
      if (typeof user !== typeof undefined) {
        token.user = user;
      }
      return token;
    },
  },
  pages: {
    signIn: "/signup",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
};

export default NextAuth(authOptions);
