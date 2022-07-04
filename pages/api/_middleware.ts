import jwt from "jsonwebtoken";
import type { JWT } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

const secret = process.env.NEXTAUTH_SECRET;
console.log("secret", secret);
export default async function middleware(
  req: NextRequest & { token: string },
  event: NextFetchEvent
) {
  console.log("start");
  const session = await getToken({ req, secret });
  console.log("session: ", session);
  console.log("end");
  req.token = "test";
  NextResponse.next();
}

// export default withAuth({
//   jwt: {
//     decode: async ({ secret, token }) => {
//       console.log("asdf");
//       console.log("middleware", secret, token);
//       // return jwt.verify(token as string, secret) as any;
//       console.log(typeof jwt.verify(token as string, secret) as any);
//       return jwt.verify(token as string, secret) as any;
//     },
//   },
//   callbacks: {
//     authorized: (token) => {
//       console.log("****token", token);
//       return !!token;
//     },
//   },
// });

// export default withAuth(
//   function middleware(req: NextRequest) {
//     console.log(req);
//     console.log("Middleware token", req.nextauth.token);
//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => {
//         console.log("Middleware token", token);
//         return true;
//       },
//     },
//   }
// );
