import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = process.env.ADMIN_USER;
        const pass = process.env.ADMIN_PASSWORD;
        if (
          credentials?.username &&
          credentials?.password &&
          user &&
          pass &&
          credentials.username === user &&
          credentials.password === pass
        ) {
          return { id: "admin", name: "Administrator", email: "admin@local" };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  secret: process.env.NEXTAUTH_SECRET,
};

export function auth() {
  return getServerSession(authOptions);
}
