import { config } from "../config";
import { BlockchainService } from "../services/blockchain";
import { DatabaseService } from "../services/database";

export const resolvers = {
  Query: {
    getBlockchainCount: async () => {
      try {
        const count = await BlockchainService.getCount();
        return {
          count,
          contractAddress: config.ethereum.contractAddress,
        };
      } catch (error: any) {
        console.error('GraphQL getCount error:', error);
        throw new Error(`Failed to get count: ${error.message}`);
      }
    },
    getAllUsers: async () => {
      return await DatabaseService.getUsers();
    }
  },

  Mutation: {
    createUser: async (_: any, { name, email, walletAddress }: { name: string, email: string, walletAddress?: string }) => {
      return await DatabaseService.createUser({ name, email, walletAddress });
    },
    
    incrementBlockchainCounter: async () => {
      try {
        const count = await BlockchainService.incrementCounter();
        return {
          count,
          contractAddress: config.ethereum.contractAddress
        };
      } catch (error: any) {
        console.error('GraphQL increment error:', error);
        throw new Error(`Incrementing blockchain counter: ${error.message}`);
      }
    },
  },
};
