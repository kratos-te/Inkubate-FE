import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { CollectionItem } from "@/utils/types";
import Typography from "./Typography";
import { VerifiedIcon } from "./SvgIcons";

interface ItemProps {
  collection: CollectionItem;
  className?: string;
}

const CollectionCard: FC<ItemProps> = ({ collection, className }) => {
  const { title, cover, pfp, collectionId, description, verified } = collection;
  return (
    <Link
      href={`/collection/${collectionId}`}
      className="inline-block min-w-[240px]"
    >
      <div
        className={`bg-dark-200 rounded-xl shadow-card relative ${
          className ? className : ""
        }`}
      >
        <div className="relative overflow-hidden rounded-t-xl h-[124px] xl:h-[235px]">
          <Image src={cover} alt={title} fill objectFit="cover" priority />
        </div>
        <div className="px-4 xl:px-[30px] pt-[14px] pb-[18px]">
          <div className="py-0 xl:py-2">
            <div className="flex gap-4 xl:gap-8">
              <div
                className="p-[1px] xl:p-[3px] rounded-lg xl:rounded-[20px] inline-flex h-[68px] w-[68px] xl:h-[118px] xl:w-[118px]"
                style={{
                  background: "linear-gradient(90deg, #428CD4, #FF9CDA)",
                }}
              >
                <div className="relative w-[66px] xl:w-[112px] h-[66px] xl:h-[112px] rounded-lg xl:rounded-[19px] overflow-hidden">
                  <Image src={pfp} fill objectFit="cover" priority alt="" />
                </div>
              </div>
              <div className="w-[calc(100%-84px)] xl:w-[calc(100%-150px)]">
                <Typography className="font-bold font-secondary flex items-center text-[16px] xl:text-[24px] leading-[1.5]">
                  <span>{title}</span>
                  {verified && (
                    <VerifiedIcon color="#428CD4" className="ml-1" />
                  )}{" "}
                </Typography>
                <Typography className="font-[400] text-[12px] leading-[18px] mt-[3px] hidden xl:block">
                  {description.slice(0, 50)}...
                </Typography>
                <div className="flex justify-between mt-4">
                  <div className="w-1/2">
                    <Typography className="font-[400] leading-[1.5] text-[8px] xl:text-[12px]">
                      Floor
                    </Typography>
                    <Typography className="font-bold leading-[1.5] text-[12px] xl:text-[14px]">
                      0.12 ETH
                    </Typography>
                  </div>
                  <div className="w-1/2">
                    <Typography className="font-[400] leading-[1.5] text-[8px] xl:text-[12px]">
                      Total Volume
                    </Typography>
                    <Typography className="font-bold leading-[1.5] text-[12px] xl:text-[14px]">
                      227 ETH
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
