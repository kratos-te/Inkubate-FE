import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatNumberToK } from "@/utils/util";
import { CollectionParam } from "@/utils/types";
import Typography from "./Typography";
import { VerifiedIcon } from "./SvgIcons";
import { ethers } from "ethers";

interface ItemProps {
  collection: CollectionParam;
  num: number;
  className?: string;
}

const CollectionItemLine: FC<ItemProps> = ({ num, className, collection }) => {
  return (
    <Link href={`/collection/${collection.id}`}>
      <div
        className={`flex justify-between items-center ${
          className ? className : ""
        }`}
      >
        <div className="flex items-center gap-5 max-w-[266px]">
          <div className="w-4 text-center">
            <Typography className="font-readex font-semibold leading-[1.5] text-[15px]">
              {num}
            </Typography>
          </div>
          <Image
            src={collection?.avatar?.url || ""}
            width={50}
            height={50}
            objectFit="cover"
            className="rounded-full"
            alt={collection.name}
          />
          <div className="flex flex-col justify-between w-[calc(100%-66px)]">
            <Typography className="font-bold leading-[1.5] flex items-center text-[14px] lg:text-[20px]">
              {collection?.name}{" "}
              {collection?.verified && <VerifiedIcon className="ml-1" />}
            </Typography>
            <Typography className="text-[12px] leading-[18px] mt-1.5">
              {formatNumberToK(collection.supply)} Items
            </Typography>
          </div>
        </div>
        <div className="flex justify-between items-center gap-20">
          <div className="flex-col justify-between hidden gap-2 md:flex">
            <Typography className="text-[12px] leading-[18px] mt-1.5 opacity-50">
              Floor Price
            </Typography>
            <Typography className="font-bold text-[14px] lg:text-[20px]">
              {ethers.formatEther(collection.stats[0]?.floorPrice || 0)} ETH
            </Typography>
          </div>
          <div className="flex flex-col justify-between gap-2">
            <Typography className="text-[12px] leading-[18px] mt-1.5 opacity-50">
              Volume
            </Typography>

            <Typography className="font-bold text-[14px] lg:text-[20px]">
              {ethers.formatEther(collection.stats[0]?.volume || 0)} ETH
            </Typography>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CollectionItemLine;
