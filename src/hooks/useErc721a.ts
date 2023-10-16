import { getContract } from "wagmi/actions";
import { Abi } from "viem";

import { ERC721A_ABI } from "@/utils/abi";
import { DEFAULT_MERKLE_ROOT, INK_CONDUIT_ADDRESS } from "@/utils/constants";
import { DEFAULT_GAS, MIN_GAS, MIN_GAS_PRICE } from "@/config";
import { write } from "./utils";

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

  const mintNFT = async (amount: number, value: string, address: string) => {
    return await write({
      address: address as `0x${string}`,
      abi: ERC721A_ABI as Abi,
      functionName: "mintNFT",
      args: [BigInt(amount), [DEFAULT_MERKLE_ROOT]],
      gas: MIN_GAS,
      gasPrice: MIN_GAS_PRICE,
      value: BigInt(value),
    });
  };

  const setApprovalForAll = async (address: string) => {
    return await write({
      address: address as `0x${string}`,
      abi: ERC721A_ABI as Abi,
      functionName: "setApprovalForAll",
      args: [INK_CONDUIT_ADDRESS as `0x${string}`, true],
    });
  };

  const getTokenUri = async (address: string, tokenId: string) => {
    try {
      const contract: any = getContract({
        address: address as `0x${string}`,
        abi: ERC721A_ABI as Abi,
      });
      const res = await contract.read.tokenURI({ args: [BigInt(tokenId)] });
      return res;
    } catch (error) {
      return { isError: true, msg: error };
    }
  };

  const getTotalSupply = async (address: string) => {
    const contract: any = getContract({
      address: address as `0x${string}`,
      abi: ERC721A_ABI as Abi,
    });
    return await contract.read.tokenURI();
  };

  const getEnableWhitelistMode = async (tokenAddress: string) => {
    return await write({
      address: tokenAddress as `0x${string}`,
      abi: ERC721A_ABI as Abi,
      functionName: "enableWhitelistMode",
      args: [true],
      gas: DEFAULT_GAS,
      gasPrice: BigInt(20),
    });
  };

  const getWhitelistMode = async (tokenAddress: string) => {
    try {
      const contract: any = getContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC721A_ABI as Abi,
      });
      const res = await contract.read.whitelistMode();
      return { isError: false, res };
    } catch (error) {
      return { isError: true, msg: error };
    }
  };

  const getMintingStartTime = async (address: string) => {
    try {
      const contract: any = getContract({
        address: address as `0x${string}`,
        abi: ERC721A_ABI as Abi,
      });
      const res = await contract.read.mintingStartTime();
      return { isError: false, res };
    } catch (error) {
      return { isError: true, msg: error };
    }
  };

  return {
    approve,
    mintNFT,
    setApprovalForAll,
    getEnableWhitelistMode,
    getWhitelistMode,
    getMintingStartTime,
    getTokenUri,
    getTotalSupply,
  };
}
