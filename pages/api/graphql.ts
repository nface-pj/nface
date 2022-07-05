import "reflect-metadata";
import { ApolloServer } from "apollo-server-micro";
import { buildSchema } from "type-graphql";
import type { NextApiRequest, NextApiResponse } from "next";
import { DogsResolver } from "../../src/schema/dogs.resolver";
import { Connection, createConnection, createConnections } from "typeorm";
import connection from "../../src/typeorm/db";

const schema = await buildSchema({
  resolvers: [DogsResolver],
});

const server = new ApolloServer({
  schema,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = server.start();

connection.createDatabase();
connection.create();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await startServer;
  await server.createHandler({ path: "/api/graphql" })(req, res);
}
