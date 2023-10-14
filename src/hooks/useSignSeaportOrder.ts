import { useCallback } from "react";
import { SignTypedDataArgs } from "@wagmi/core";
import { useNetwork, useAccount, useSignTypedData } from "wagmi";

import { getTypedDataDomain } from "@/utils/helper";
import { EIP_712_ORDER_TYPE } from "@/utils/constants";
import { OrderComponents, OrderParameters } from "@/utils/types";

export function useSignSeaportOrder() {
  const { chain } = useNetwork();
  const { signTypedDataAsync } = useSignTypedData();
  const signer = useAccount();

  const signOrder = useCallback(
    async (orderParameters: OrderParameters, counter: string) => {
      if (!signer) {
        console.log("No Signer connected");
        return { signature: "", data: "" };
      }
      // "EIP712Domain"
      const data: SignTypedDataArgs = {
        primaryType: "OrderComponents",
        domain: getTypedDataDomain(chain?.id ?? 1),
        types: EIP_712_ORDER_TYPE,
        message: {
          ...orderParameters,
          counter,
        } as OrderComponents,
      };

      const signature: string | null = await signTypedDataAsync(data).catch(
        () => {
          // user rejected signature request
          return null;
        }
      );

      if (signature == null) {
        return { signature: "", data: data.message };
      }
      return { signature, data: data.message };
    },
    [chain?.id, signTypedDataAsync, signer]
  );

  return signOrder;
}
