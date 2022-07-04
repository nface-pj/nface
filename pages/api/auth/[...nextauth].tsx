import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  // jwt: {
  //   async encode({
  //     token,
  //     secret,
  //     maxAge,
  //   }: {
  //     token?: JWT;
  //     secret: string | Buffer;
  //     maxAge?: number;
  //   }): Promise<string> {
  //     return jwt.sign(token as any, secret);
  //   },
  //   async decode({
  //     token,
  //     secret,
  //   }: {
  //     token?: string;
  //     secret: string | Buffer;
  //   }): Promise<JWT | null> {
  //     // return a `JWT` object, or `null` if decoding failed
  //     if (token === undefined) {
  //       return null;
  //     } else {
  //       return jwt.verify(token as string, secret) as JWT;
  //     }
  //   },
  // },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account) {
        // console.log("jwt token : ", token);
        // console.log("jwt user : ", user);
        // console.log("jwt account : ", account);
        // console.log("jwt profile : ", profile);
        // console.log("jwt  isNewUser: ", isNewUser);
        token.accessToken = account.access_token;
      }
      return token;
    },
    // async session({ session, token, user }) {
    //   // Send properties to the client, like an access_token from a provider.
    //   console.log("jwt : ", session, token, user);
    //   session.accessToken = token.accessToken;
    //   return session;
    // },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
