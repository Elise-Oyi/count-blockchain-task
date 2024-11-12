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
exports.BlockchainService = void 0;
const providers_1 = require("@ethersproject/providers");
const config_1 = require("../config");
const wallet_1 = require("@ethersproject/wallet");
const contracts_1 = require("@ethersproject/contracts");
const provider = new providers_1.JsonRpcProvider(config_1.config.ethereum.provider, "sepolia");
const wallet = new wallet_1.Wallet(config_1.config.ethereum.privateKey, provider);
const contractABI = [
    {
        inputs: [],
        name: "decrement",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "increment",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "getCount",
        outputs: [
            { internalType: "uint256", name: "", type: "uint256" }
        ],
        stateMutability: "view",
        type: "function",
    },
];
const contract = new contracts_1.Contract(config_1.config.ethereum.contractAddress, contractABI, wallet);
exports.BlockchainService = {
    getCount: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield contract.getCount();
            return result.toNumber();
        }
        catch (error) {
            console.error("GetCount error:", error);
            throw error;
        }
    }),
    incrementCounter: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const tx = yield contract.increment();
            yield tx.wait(); // Await transaction confirmation
            return yield exports.BlockchainService.getCount();
        }
        catch (error) {
            console.error("IncrementCounter error:", error);
            throw error;
        }
    }),
};
