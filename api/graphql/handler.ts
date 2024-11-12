import { ApolloServer } from "apollo-server-express";
import express from "express";
import { DatabaseService } from "../../src/services/database";
import { typeDefs } from "../../src/graphql/schema";
import { resolvers } from "../../src/graphql/resolvers";

const startServer = async () => {
  const app = express();

  await DatabaseService.init();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db: DatabaseService.db }),
  });

  await server.start();
  server.applyMiddleware({ app, path: "/api/graphql" });

  return app;
};

let serverPromise = startServer();

export default async function handler(req: any, res: any) {
  const app = await serverPromise;
  app(req, res);
}
