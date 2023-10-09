import { getContract } from "wagmi/actions";
import { write } from "./utils";
import { INK_ABI } from "@/utils/abi";
import { Abi } from "viem";
import { SEAPORT_CONTRACT_ADDRESS } from "@/utils/constants";
import { OrderComponents } from "@/utils/types";

export function useInkubate() {
  //   const chain = useNetwork();
  //   const signer = useAccount();

  const count = async (address: string) => {
    try {
      const contract: any = getContract({
        address: SEAPORT_CONTRACT_ADDRESS as `0x${string}`,
        abi: INK_ABI as Abi,
      });
      const res = await contract.read.getCounter({ args: [address] });
      return res;
    } catch (error) {
      return { isError: true, msg: error };
    }
  };

  const cancelListing = async (orders: OrderComponents[]) => {
    return await write({
      address: SEAPORT_CONTRACT_ADDRESS as `0x${string}`,
      abi: INK_ABI as Abi,
      functionName: "cancel",
      args: [orders],
      gas: BigInt("3000000"),
      gasPrice: BigInt("20000000000"),
    });
  };

  return {
    count,
    cancelListing,
  };
}
