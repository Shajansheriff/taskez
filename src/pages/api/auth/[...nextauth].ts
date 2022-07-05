import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    // ...add more providers here
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials: Record<string, string> | undefined, _req) {
        if (
          !credentials ||
          Array.isArray(credentials) ||
          typeof credentials !== "object"
        ) {
          return null;
        }
        const user = prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        return user;
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
};

export default NextAuth(authOptions);
