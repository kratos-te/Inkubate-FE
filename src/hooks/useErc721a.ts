import { getContract } from "wagmi/actions";
import { write } from "./utils";
import { Abi } from "viem";
import { ERC721A_ABI } from "@/utils/abi";
// import { ethers } from "ethers";

export function useErc721a() {
  const approve = async (
    tokenAddress: string,
    tokenId: number,
    spender: string
  ) => {
    return await write({
      address: tokenAddress as `0x${string}`,
      abi: ERC721A_ABI as Abi,
      functionName: "approve",
      args: [spender, tokenId],
    });
  };

  const mint = async (amount: number, value: string, address: string) => {
    return await write({
      address: address as `0x${string}`, //tokenAddress as `0x${string}`,
      abi: ERC721A_ABI as Abi,
      functionName: "mintNFT",
      args: [
        BigInt(amount),
        ["0x473287f8298dba7163a897908958f7c0eae733e25d2e027992ea2edc9bed2fa8"],
        // ethers.utils.formatBytes32String(
        //   "Hello world"
        // ),
      ],
      gas: BigInt("3000000"),
      gasPrice: BigInt("20000000000"),
      value: BigInt(value),
    });
  };

  const enableWhitelistMode = async () => {
    // only creator function
    return await write({
      address: "0x9AC3b5616B37543d88aC539994e36F6b7974c744", //tokenAddress as `0x${string}`,
      abi: ERC721A_ABI as Abi,
      functionName: "enableWhitelistMode",
      args: [true],
      gas: BigInt("3000000"),
      gasPrice: BigInt(20),
    });
  };

  const getWhitelistMode = async () => {
    try {
      const contract = getContract({
        address: "0x9AC3b5616B37543d88aC539994e36F6b7974c744",
        abi: ERC721A_ABI as Abi,
      });
      const res = await contract.read.whitelistMode();
      return { isError: false, res };
    } catch (error) {
      return { isError: true, msg: error };
    }
  };

  return {
    approve,
    mint,
    enableWhitelistMode,
    getWhitelistMode,
  };
}
