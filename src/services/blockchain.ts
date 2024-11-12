import { JsonRpcProvider } from "@ethersproject/providers";
import { config } from "../config";
import { Wallet } from "@ethersproject/wallet";
import { Contract } from "@ethersproject/contracts";


const provider = new JsonRpcProvider(config.ethereum.provider, "sepolia");
const wallet = new Wallet(config.ethereum.privateKey as string, provider);

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

const contract = new Contract(config.ethereum.contractAddress as string, contractABI, wallet);

export const BlockchainService = {
  getCount: async (): Promise<number> => {
    try {
      const result = await contract.getCount();
      return result.toNumber();
    } catch (error) {
      console.error("GetCount error:", error);
      throw error;
    }
  },

  incrementCounter: async (): Promise<number> => {
    try {
      const tx = await contract.increment();
      await tx.wait(); // Await transaction confirmation
      return await BlockchainService.getCount();
    } catch (error) {
      console.error("IncrementCounter error:", error);
      throw error;
    }
  },
};
