import { verify } from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt";
import type { NextApiRequest, NextApiResponse } from "next";

const secret = process.env.NEXTAUTH_SECRET;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req, secret });
  // const token = req.headers.cookie
  //   ?.split("; ")
  //   .map((v) => v.split("="))
  //   .filter((v) => v[0] === "next-auth.session-token")[0][1];
  // console.log(
  //   "token??????",
  //   req.headers.cookie
  //     ?.split("; ")
  //     .map((v) => v.split("="))
  //     .filter((v) => v[0] === "next-auth.session-token")[0][1]
  // );
  // const result = verify(token as string, "secret" as string) as JWT;
  res.send(JSON.stringify(token, null, 2));
};
