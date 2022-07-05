import type { NextApiRequest, NextApiResponse } from "next";
import AppDataSource from "../../../src/typeorm/db";
import { User } from "../../../src/typeorm/entity/User";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await AppDataSource.manager.find(User);
  res.send(JSON.stringify(result, null, 2));
};
