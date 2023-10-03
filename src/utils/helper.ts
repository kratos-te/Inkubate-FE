import {
  SEAPORT_CONTRACT_ADDRESS,
  SEAPORT_CONTRACT_NAME,
  SEAPORT_CONTRACT_VERSION,
} from "@/utils/constants";

export function getTypedDataDomain(chainId: number) {
  return {
    name: SEAPORT_CONTRACT_NAME,
    version: SEAPORT_CONTRACT_VERSION,
    chainId,
    verifyingContract: SEAPORT_CONTRACT_ADDRESS as `0x${string}`,
  };
}
