import { MongoClient, Db, Collection } from "mongodb";
import { config } from "../config";



export const DatabaseService = {

  client: new MongoClient(config.mongodb.uri as string),
  db: null as Db | null,
  
  init: async function () {
    if (!this.db) {
      await this.client.connect();
      this.db = this.client.db(config.mongodb.dbName);
    }
  },

  getUsers: async function () {
    await this.init();
    return await this.db?.collection("users").find({}).toArray();
  },

  createUser: async function (user: { name: string; email: string; walletAddress?: string }) {
    await this.init();
    const result = await this.db?.collection("users").insertOne({ ...user, createdAt: new Date().toISOString() });
    return { id: result?.insertedId, ...user };
  }
};
