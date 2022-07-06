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
