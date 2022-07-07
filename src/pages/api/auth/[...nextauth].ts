import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const bcrypt = require("bcrypt");

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { LoginFormValues } from "../../../schemas/login";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    // ...add more providers here
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
      return token;
    },
  },
  pages: {
    signIn: "/signup",
  },
};

export default NextAuth(authOptions);
