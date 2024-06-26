import axios from "axios";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDb } from "../../../../../lib/mongodb";
import User from "@/app/models/User";
import bcrypt from "bcrypt";

export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_KEY,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectMongoDb();
          const user = await User.findOne({ email });
          if (!user) {
            return null;
          }
          const isPasswordMatch = await bcrypt.compare(password, user.password);
          if (!isPasswordMatch) {
            return null;
          }
          return user;
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async session({ session, user }) {
      return session;
    },
    async jwt({ token, account, profile, user }) {
      // const data = await verify(token.accessToken,"X2TR6D54NIUMX")
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
      }

      return { ...token, ...user };
    },
    async signIn({ user, account, token, session }) {
      try {
        if (account.provider === "google") {
          const { name, email } = user;
          if (!name || !email) {
            return "/error";
          }

          const [firstName, lastName] = name.split(" ");
          const body = {
            firstName,
            lastName,
            email,
            password: "ppietnnmk@123@123",
            phoneNumber: "NULL",
            provider: "google",
          };
          console.log("ENVIRONEMNT", process.env.ENV);
          const apiUrl =
            process.env.ENV === "local" ? "http://localhost:3000" : "";
          const res = await axios.post(
            `${apiUrl}/api/user`,
            body, // Request body
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (res.ok) {
            session.user = token;
            return session;
          }
        }
      } catch (err) {
        return "/error";
      }
      return user;
    },
  },
};
