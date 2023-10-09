import { FC } from "react";
import { OfferTypes } from "@/utils/types";
import { Offer } from "./Offer";

interface OfferProps {
  offerData: OfferTypes[];
}

export const Offers: FC<OfferProps> = ({ offerData }) => {

  return (
    <table className="w-full">
      <thead>
        <tr className="text-[24px] text-white font-semibold justify-between">
          <th align="left" className="w-1/3 max-[970px]:w-1/2">
            Item
          </th>
          <th align="left">Price</th>
          <th align="left" className="max-md:hidden">
            Floor
          </th>
          <th align="left" className="max-[970px]:hidden">
            Quantity
          </th>
          <th align="left" className="max-lg:hidden">
            Expiration
          </th>
          <th align="left" className="max-xl:hidden">
            Received
          </th>
        </tr>
      </thead>
      <tbody>
        {offerData && offerData.map((item, key) => (
          <Offer key={key} offer={item} />
        ))}
      </tbody>
    </table>
  );
};
