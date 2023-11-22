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
        email: { label: "email", type: "text" },
        password: {
          label: "password",
          type: "password",
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
    async jwt({ token, user }) {
      if (user) token = { ...token, ...user };
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token._doc.role;
        session.user.email = token.email;
        session.user.id = token._doc._id;
        session.user.name = token._doc.fullname;
      }
      return session;
    },
  },
  pages: {
    signIn: "/pages/Login",
  },
});

export { handler as GET, handler as POST };
