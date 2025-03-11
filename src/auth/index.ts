import NextAuth from "next-auth";
import { credentialsProvider } from "./providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [credentialsProvider],
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async session({ session, token }){
      const tokenUser = token['user'] as
        | {
            id: string;
            email: string;
            name: string;
            emailVerified?: Date | null;
            image?: string | null;
          }
        | undefined;

      if (tokenUser) {
        session.user = {
          id: tokenUser.id,
          name: tokenUser.name,
          email: tokenUser.email,
          emailVerified: tokenUser.emailVerified ?? null,
          image: tokenUser.image ?? null,
        };
      }
      return session;
    },
    async jwt({ token, user, trigger }) {
      if (trigger === "signIn" && user) {
        token["user"] = user;
      }
      return token;
    },
  },
});