import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { CollectionParam } from "@/utils/types";
import Typography from "./Typography";
import { VerifiedIcon } from "./SvgIcons";
// import { getLaunchpadById } from "@/actions";
import { weiToNum } from "@/utils/util";

interface ItemProps {
  collection: CollectionParam;
  className?: string;
}

const CollectionCard: FC<ItemProps> = ({ collection, className }) => {
  const { stats } = collection;

  return (
    <Link
      href={`/collection/${collection?.id}`}
      className="inline-block min-w-[240px] xl:min-w-[360px]"
    >
      {collection && (
        <div
          className={`bg-dark-200 rounded-xl shadow-card relative ${
            className ? className : ""
          }`}
        >
          <div className="relative overflow-hidden rounded-t-xl h-[124px] xl:h-[235px]">
            {collection?.banner ? (
              <Image
                src={collection?.banner?.url}
                alt={collection?.banner?.fileEntityId}
                fill
                objectFit="cover"
                priority
              />
            ) : (
              <div className="bg-[#222] absolute left-0 top-0 w-full h-full text-gray-400 grid place-content-center capitalize">
                no image
              </div>
            )}
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
                  {collection?.avatar && (
                    <div className="relative w-[66px] xl:w-[112px] h-[66px] xl:h-[112px] rounded-lg xl:rounded-[19px] overflow-hidden">
                      <Image
                        src={collection?.avatar?.url}
                        fill
                        objectFit="cover"
                        priority
                        alt=""
                      />
                    </div>
                  )}
                </div>
                <div className="w-[calc(100%-84px)] xl:w-[calc(100%-150px)]">
                  <Typography className="font-bold font-secondary flex items-center text-[16px] xl:text-[24px] leading-[1.5]">
                    <span>{collection?.name}</span>
                    {collection?.verified && (
                      <VerifiedIcon color="#428CD4" className="ml-1" />
                    )}{" "}
                  </Typography>
                  <Typography className="font-[400] text-[12px] leading-[18px] mt-[3px] hidden xl:block">
                    {collection?.desc.slice(0, 50)}...
                  </Typography>
                  <div className="flex justify-between mt-4">
                    <div className="w-1/2">
                      <Typography className="font-[400] leading-[1.5] text-[8px] xl:text-[12px]">
                        Floor
                      </Typography>
                      {stats[0]?.floorPrice !== undefined && (
                        <Typography className="font-bold leading-[1.5] text-[12px] xl:text-[14px] text-white">
                          {weiToNum(stats[0]?.floorPrice)} ETH
                        </Typography>
                      )}
                    </div>
                    <div className="w-1/2">
                      <Typography className="font-[400] leading-[1.5] text-[8px] xl:text-[12px]">
                        Total Volume
                      </Typography>
                      {stats[0]?.floorPrice !== undefined && (
                        <Typography className="font-bold leading-[1.5] text-[12px] xl:text-[14px]">
                          {weiToNum(stats[0]?.volume).toFixed(2)} ETH
                        </Typography>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
};

export default CollectionCard;
