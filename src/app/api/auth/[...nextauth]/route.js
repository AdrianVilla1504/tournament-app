import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/utils/mongoose";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "cat@gmail.com" },
        password: {
          label: "password",
          type: "password",
          placeholder: "******",
        },
      },

      async authorize(credentials) {
        await connectDB();
        const user_found = await User.findOne({
          email: credentials?.email,
        }).select("+password");
        if (!user_found) throw new Error("Invalid credentials");
        const password_match = await bcrypt.compare(
          credentials.password,
          user_found.password
        );
        if (!password_match) throw new Error("Invalid credentials");
        return user_found;
      },
    }),
  ],
  callbacks: {
    jwt({ account, token, user, profile, session }) {
      return token;
    },
    session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/pages/Login",
  },
});

export { handler as GET, handler as POST };
