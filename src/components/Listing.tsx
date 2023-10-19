import { FC, useEffect, useState } from "react";
import Typography from "./Typography";
import { ListingTypes } from "@/utils/types";
import { weiToNum } from "@/utils/util";
import { getDayOfYear, getYear } from "date-fns";

interface ListingProps {
  listing: ListingTypes;
}

export const Listing: FC<ListingProps> = ({ listing }) => {
  const { endTime } = listing;
  const [duration, setDuration] = useState<number>();
  useEffect(() => {
    if (getYear(new Date(endTime)) === getYear(new Date())) {
      const durationDay =
        getDayOfYear(new Date(endTime)) - getDayOfYear(new Date());
      setDuration(durationDay);
    } else {
      const durationDay =
        getDayOfYear(new Date(endTime)) + getDayOfYear(new Date());
      setDuration(durationDay);
    }
  }, [endTime]);
  return (
    <>
      <tr className="cursor-pointer group border-t-[0.5px] border-[#687681]">
        <td className="py-[38px]">
          <div className="flex items-center relative z-10">
            <div className="w-[70px] h-[70px] max-[640px]:w-[50px] max-[640px]:h-[50px]  relative">
              <image
                xlinkHref={listing.nft.image}
                className="rounded-[10px] mr-[11px] w-[70px] h-[70px] object-fill"
              />
            </div>
            <div className="flex-col gap-[2px]">
              <Typography className="flex items-center gap-2  ml-2 text-[30px] font-semibold max-[640px]:text-[20px] max-sm:text-[16px]">
                {`${listing.nft.name}#${listing.nft.tokenId}`}
              </Typography>
              <p className="flex items-center gap-2  ml-2 text-[30px] font-semibold text-[#555555] max-[640px]:text-[20px] max-sm:text-[16px]">
                {listing.nft.name}
              </p>
            </div>
          </div>
        </td>
        <td>
          <div className="flex items-center">
            <p className="text-[24px] font-semibold text-white max-[640px]:text-[16px] max-sm:text-[12px]">
              {weiToNum(listing.price)}ETH
            </p>
          </div>
        </td>
        <td className="max-md:hidden">
          <div className="flex items-center">
            <p className="text-[24px] font-semibold text-white">+10%</p>
          </div>
        </td>
        <td className="max-xl:hidden">
          <div className="flex items-center justify-end">
            <p className="text-[24px] font-semibold text-white">
              {`in ${duration} days`}
            </p>
          </div>
        </td>
        <td className="">
          <div className="flex items-center justify-end">
            <button className=" bg-secondary rounded-xl text-white text-[20px] font-semibold px-6 py-3 max-[640px]:text-[12px] max-sm:text-[8px]">
              Cancel
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};
