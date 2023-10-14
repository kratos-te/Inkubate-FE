import {
  INK_CONTRACT_ADDRESS,
  INK_CONTRACT_NAME,
  INK_CONTRACT_VERSION,
} from "@/utils/constants";

export function getTypedDataDomain(chainId: number) {
  return {
    name: INK_CONTRACT_NAME,
    version: INK_CONTRACT_VERSION,
    chainId,
    verifyingContract: INK_CONTRACT_ADDRESS as `0x${string}`,
  };
}
