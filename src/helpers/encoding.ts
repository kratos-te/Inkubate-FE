import { ConsiderationItem, OfferItem } from "@/utils/types";
import { BigNumberish, ethers, ZeroAddress } from "ethers";

export const toBN = (n: BigNumberish) => ethers.toBeHex(n);

export const getOfferOrConsiderationItem = <
  RecipientType extends string | undefined = undefined
>(
  itemType: number = 0,
  token: string = ZeroAddress,
  identifierOrCriteria: BigNumberish = 0,
  startAmount: BigNumberish = 1,
  endAmount: BigNumberish = 1,
  recipient?: RecipientType
): RecipientType extends string ? ConsiderationItem : OfferItem => {
  const offerItem: OfferItem = {
    itemType,
    token,
    identifierOrCriteria: toBN(identifierOrCriteria),
    startAmount: toBN(startAmount),
    endAmount: toBN(endAmount),
  };
  if (typeof recipient === "string") {
    return {
      ...offerItem,
      recipient: recipient as string,
    } as ConsiderationItem;
  }
  return offerItem as any;
};

export const buildOrderStatus = (
  ...arr: Array<BigNumberish | number | boolean>
) => {
  const values = arr.map((v) => (typeof v === "number" ? toBN(v) : v));
  return ["isValidated", "isCancelled", "totalFilled", "totalSize"].reduce(
    (obj, key, i) => ({
      ...obj,
      [key]: values[i],
      [i]: values[i],
    }),
    {}
  );
};
