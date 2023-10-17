import { FC } from "react";
import { ListingTypes } from "@/utils/types";
import { Listing } from "./Listing";

interface ListingProps {
  listData: ListingTypes[];
}

export const Listings: FC<ListingProps> = ({ listData }) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="text-[24px] text-white font-semibold justify-between">
          <th align="left" className="w-1/2">
            Item
          </th>
          <th align="left">Price</th>
          <th align="left" className="max-md:hidden">
            Floor
          </th>
          <th align="right" className="max-xl:hidden">
            Expiration
          </th>
        </tr>
      </thead>
      <tbody>
        {listData &&
          listData.map((item, key) => <Listing key={key} listing={item} />)}
      </tbody>
    </table>
  );
};
