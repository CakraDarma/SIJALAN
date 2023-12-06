import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  // session: {
  // 	strategy: 'jwt',
  // },
  // pages: {
  // 	signIn: '/sign-in',
  // },
  providers: [
    CredentialsProvider({
      name: "my-project",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const payload = {
          email: credentials?.email,
          password: credentials?.password,
        };

        const res = await fetch("https://gisapis.manpits.xyz/api/login", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const user = await res.json();

        if (!res.ok) {
          throw new Error(user.message);
        }
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          // @ts-ignore
          accessToken: user.token,
          // @ts-ignore
          refreshToken: user.refreshToken,
        };
      }

      return token;
    },

    async session({ session, token }) {
      // @ts-ignore
      session.user.accessToken = token.accessToken;
      // @ts-ignore
      session.user.refreshToken = token.refreshToken;
      // @ts-ignore
      session.user.accessTokenExpires = token.accessTokenExpires;

      return session;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
