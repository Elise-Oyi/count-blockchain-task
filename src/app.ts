import express from "express";
import { ApolloServer } from "apollo-server-express";
import { DatabaseService } from "./services/database";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";

const startServer = async () => {
  const app = express();

  await DatabaseService.init();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db: DatabaseService.db }),
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  app.use(express.json());

  return app;
};

export default startServer;
