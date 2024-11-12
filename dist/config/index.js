"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { MONGODB_URI, PRIVATE_KEY, CONTRACT_ADDRESS, INFURA_API_KEY, PORT } = process.env;
exports.config = {
    mongodb: {
        uri: MONGODB_URI,
        options: {
            retryWrites: true,
            w: 1
        },
        dbName: "test"
    },
    ethereum: {
        privateKey: PRIVATE_KEY,
        contractAddress: CONTRACT_ADDRESS,
        provider: `https://sepolia.infura.io/v3/${INFURA_API_KEY}` || 'https://sepolia.infura.io/v3/YOUR-PROJECT-ID'
    },
    server: {
        port: PORT
    },
    edge: {
        runtime: 'edge', // Ensure it runs as an edge function
    }
};
