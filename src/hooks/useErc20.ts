import { Abi, getContract } from "viem";

import { ERC20_ABI } from "@/utils/abi";

import { write } from "./utils";

export function useErc20() {
  const approve = async (
    tokenAddress: string,
    spender: string,
    amount: bigint
  ) => {
    return await write({
      address: tokenAddress as `0x${string}`,
      abi: ERC20_ABI as Abi,
      functionName: "approve",
      args: [spender, amount],
    });
  };

  const balanceOf = async (contractAddress: string, accountAddress: string) => {
    try {
      const contract: any = getContract({
        address: contractAddress as `0x${string}`,
        abi: ERC20_ABI as Abi,
      });
      const res = await contract.read.balanceOf({ args: [accountAddress] });
      return res;
    } catch (error) {
      return { isError: true, msg: error };
    }
  };

  return {
    approve,
    balanceOf,
  };
}
