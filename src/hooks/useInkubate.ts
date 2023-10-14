import { getContract } from "wagmi/actions";
import { Abi } from "viem";

import { DEFAULT_GAS, DEFAULT_GAS_PRICE } from "@/config";
import { INK_ABI } from "@/utils/abi";
import { INK_CONTRACT_ADDRESS } from "@/utils/constants";
import { BasicOrderParameters, OrderComponents } from "@/utils/types";
import { write } from "./utils";

export function useInkubate() {
  //   const chain = useNetwork();
  //   const signer = useAccount();

  const count = async (address: string) => {
    try {
      const contract: any = getContract({
        address: INK_CONTRACT_ADDRESS as `0x${string}`,
        abi: INK_ABI as Abi,
      });
      const res = await contract.read.getCounter({ args: [address] });
      return res;
    } catch (error) {
      return { isError: true, msg: error };
    }
  };

  const getOrderHash = async (orderComponents: OrderComponents) => {
    try {
      const contract: any = getContract({
        address: INK_CONTRACT_ADDRESS as `0x${string}`,
        abi: INK_ABI as Abi,
      });
      const res = await contract.read.getOrderHash({ args: [orderComponents] });
      return res;
    } catch (error) {
      return { isError: true, msg: error };
    }
  };

  const cancelListing = async (orders: OrderComponents[]) => {
    try {
      return await write({
        address: INK_CONTRACT_ADDRESS,
        abi: INK_ABI as Abi,
        functionName: "cancel",
        args: [orders],
        gas: DEFAULT_GAS,
        gasPrice: DEFAULT_GAS_PRICE,
      });
    } catch (e) {
      console.log("error", e);
      return null;
    }
  };

  const buyListing = async (orders: BasicOrderParameters) => {
    try {
      return await write({
        address: INK_CONTRACT_ADDRESS,
        abi: INK_ABI as Abi,
        functionName: "fulfillBasicOrder",
        args: [orders],
        gas: DEFAULT_GAS,
        gasPrice: DEFAULT_GAS_PRICE,
        value: BigInt(orders.considerationAmount),
      });
    } catch (e) {
      console.log("error", e);
      return null;
    }
  };

  return {
    buyListing,
    count,
    cancelListing,
    getOrderHash,
  };
}
