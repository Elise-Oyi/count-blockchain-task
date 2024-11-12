"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `
 type User 
   {
        id:ID!
        name: String
        email: String
        walletAddress: String
        createdAt: String!
    }

   type BlockchainStats
   {
        count: Int!
        contractAddress: String!
    }

     type Query 
     {
        getBlockchainCount: BlockchainStats!
        getAllUsers: [User!]!
    }

     type Mutation {
        createUser(name: String!, email: String!, walletAddress: String): User!
        incrementBlockchainCounter: BlockchainStats!
    }
`;
