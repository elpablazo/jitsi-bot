import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token }) {
      if (token?.access_token) {
        session.accessToken = token?.access_token;
        user.accessToken = token?.access_token;
      }

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account?.access_token) {
        token.accessToken = account?.access_token;
        user.accessToken = account?.access_token;
      }

      return token;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
};

export default NextAuth(authOptions);
