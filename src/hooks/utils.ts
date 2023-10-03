import {
  writeContract,
  waitForTransaction,
  prepareWriteContract,
  PrepareWriteContractConfig,
} from "@wagmi/core";
// import { useSignSeaportOrder } from "./useSignSeaportOrder";

// import { OPENSEA_CONDUIT_ADDRESS } from "@/utils/constants";

export const write = async (config: PrepareWriteContractConfig) => {
  const { request } = await prepareWriteContract(config);
  const { hash } = await writeContract(request);
  return await waitForTransaction({ hash });
};

