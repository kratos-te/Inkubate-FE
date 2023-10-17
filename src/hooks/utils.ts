import {
  writeContract,
  waitForTransaction,
  prepareWriteContract,
  PrepareWriteContractConfig,
  readContract,
  ReadContractConfig,
} from "@wagmi/core";

export const write = async (config: PrepareWriteContractConfig) => {
  const { request } = await prepareWriteContract(config);
  const { hash } = await writeContract(request);
  return await waitForTransaction({ hash });
};

export const read = async (config: ReadContractConfig) => {
  const result = await readContract(config);
  return result;
};
