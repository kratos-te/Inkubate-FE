import { getContract } from "wagmi/actions";
import { Abi } from "viem";

import { ERC721A_ABI } from "@/utils/abi";
import { DEFAULT_MERKLE_ROOT, INK_CONDUIT_ADDRESS } from "@/utils/constants";
import {
  DEFAULT_GAS,
  DEFAULT_GAS_PRICE,
  MIN_GAS,
  MIN_GAS_PRICE,
} from "@/config";
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

  const changeTotalSupply = async (address: string, supply: number) => {
    try {
      return await write({
        address: address as `0x${string}`,
        abi: ERC721A_ABI as Abi,
        functionName: "changeMaxTotalSupply",
        args: [supply],
        gas: DEFAULT_GAS,
        gasPrice: DEFAULT_GAS_PRICE,
      });
    } catch (e) {
      console.error("error", e);
      return null;
    }
  };

  const changeMintAmount = async (address: string, amount: number) => {
    try {
      return await write({
        address: address as `0x${string}`,
        abi: ERC721A_ABI as Abi,
        functionName: "setMaxMintAmount",
        args: [amount],
        gas: DEFAULT_GAS,
        gasPrice: DEFAULT_GAS_PRICE,
      });
    } catch (e) {
      console.error("error", e);
      return null;
    }
  };

  const changeMaxWallet = async (address: string, amount: number) => {
    try {
      return await write({
        address: address as `0x${string}`,
        abi: ERC721A_ABI as Abi,
        functionName: "setMaxWalletAmount",
        args: [amount],
        gas: DEFAULT_GAS,
        gasPrice: DEFAULT_GAS_PRICE,
      });
    } catch (e) {
      console.error("error", e);
      return null;
    }
  };

  const changeBaseUri = async (address: string, uri: string) => {
    try {
      return await write({
        address: address as `0x${string}`,
        abi: ERC721A_ABI as Abi,
        functionName: "setBaseUri",
        args: [uri],
        gas: DEFAULT_GAS,
        gasPrice: DEFAULT_GAS_PRICE,
      });
    } catch (e) {
      console.error("error", e);
      return null;
    }
  };

  const changeStartTime = async (address: string, startTime: number) => {
    try {
      return await write({
        address: address as `0x${string}`,
        abi: ERC721A_ABI as Abi,
        functionName: "changeStartTime",
        args: [startTime],
        gas: DEFAULT_GAS,
        gasPrice: DEFAULT_GAS_PRICE,
      });
    } catch (e) {
      console.error("error", e);
      return null;
    }
  };

  const changeEndTime = async (address: string, endTime: number) => {
    try {
      return await write({
        address: address as `0x${string}`,
        abi: ERC721A_ABI as Abi,
        functionName: "changeEndTime",
        args: [endTime],
        gas: DEFAULT_GAS,
        gasPrice: DEFAULT_GAS_PRICE,
      });
    } catch (e) {
      console.error("error", e);
      return null;
    }
  };

  const endMinting = async (address: string) => {
    try {
      return await write({
        address: address as `0x${string}`,
        abi: ERC721A_ABI as Abi,
        functionName: "forceFinishMinting",
        gas: DEFAULT_GAS,
        gasPrice: DEFAULT_GAS_PRICE,
      });
    } catch (e) {
      console.error("error", e);
      return null;
    }
  };

  const changeWhiteListMode = async (address: string, enable: boolean) => {
    try {
      return await write({
        address: address as `0x${string}`,
        abi: ERC721A_ABI as Abi,
        functionName: "enableWhitelistMode",
        args: [enable],
        gas: DEFAULT_GAS,
        gasPrice: DEFAULT_GAS_PRICE,
      });
    } catch (e) {
      console.error("error", e);
      return null;
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
    changeTotalSupply,
    changeMintAmount,
    changeMaxWallet,
    changeBaseUri,
    changeStartTime,
    changeEndTime,
    endMinting,
    changeWhiteListMode,
  };
}
