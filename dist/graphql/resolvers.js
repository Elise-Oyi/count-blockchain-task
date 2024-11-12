"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const config_1 = require("../config");
const blockchain_1 = require("../services/blockchain");
const database_1 = require("../services/database");
exports.resolvers = {
    Query: {
        getBlockchainCount: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const count = yield blockchain_1.BlockchainService.getCount();
                return {
                    count,
                    contractAddress: config_1.config.ethereum.contractAddress,
                };
            }
            catch (error) {
                console.error('GraphQL getCount error:', error);
                throw new Error(`Failed to get count: ${error.message}`);
            }
        }),
        getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield database_1.DatabaseService.getUsers();
        })
    },
    Mutation: {
        createUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { name, email, walletAddress }) {
            return yield database_1.DatabaseService.createUser({ name, email, walletAddress });
        }),
        incrementBlockchainCounter: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const count = yield blockchain_1.BlockchainService.incrementCounter();
                return {
                    count,
                    contractAddress: config_1.config.ethereum.contractAddress
                };
            }
            catch (error) {
                console.error('GraphQL increment error:', error);
                throw new Error(`Incrementing blockchain counter: ${error.message}`);
            }
        }),
    },
};
