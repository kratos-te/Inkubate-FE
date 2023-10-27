"use client";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import {
  DiscordIcon,
  EthscanIcon,
  TwitterIcon,
  VerifiedIcon,
  WebsiteIcon,
} from "../SvgIcons";
import Typography from "../Typography";
import Image from "next/image";
import Loader from "./Loader";
import { CollectionParam, NftTypes, StatTypes } from "@/utils/types";
import { weiToNum } from "@/utils/util";

interface CollectionProps {
  stat: StatTypes;
  nfts: NftTypes[];
}

const CollectionOverview: FC<CollectionProps> = ({ stat, nfts }) => {
  const { collection } = stat;
  const [showMoreDec, setShowMoreDec] = useState(false);

  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, []);

  return !loading ? (
    <div className="max-w-[1600px] mx-6 relative 2xl:mx-auto z-10">
      <div className="pt-8 xl:pt-12 mb-[60px] lg:mb-[100px] flex gap-[22px] lg:gap-10 xl:gap-[68px] flex-col lg:flex-row">
        <div
          className="p-[1px] xl:p-[3px] rounded-lg xl:rounded-[20px] inline-flex h-[188px] w-[188px] xl:h-[292px] xl:w-[292px] -mt-[156px] lg:-mt-[72px] xl:-mt-[110px] z-10"
          style={{
            background: "linear-gradient(90deg, #428CD4, #FF9CDA)",
          }}
        >
          <div className="relative w-[186px] xl:w-[286px] h-[186px] xl:h-[286px] rounded-lg xl:rounded-[19px] overflow-hidden">
            <Image src={collection?.avatar?.url} fill objectFit="cover" priority alt="" />
          </div>
        </div>
        <div className="">
          <Typography
            component="h2"
            className="text-[28px] lg:text-[30px] font-bold font-poppins flex gap-2 items-center leading-[1]"
          >
            <span>{collection?.name}</span>
            <VerifiedIcon color="#EA4492" className="w-7 h-7" />
          </Typography>

          <div className="flex gap-4 mt-5 xl:gap-6 lg:hidden">
            {collection.website &&
              <Link href={collection.website} className="w-5 h-5">
                <WebsiteIcon className="w-4 h-4" />
              </Link>
            }
            {collection.twitter &&
              <Link href={collection.twitter} className="w-5 h-5">
                <TwitterIcon className="w-4 h-4" />
              </Link>
            }
            {collection.discord &&
              <Link href={collection.discord} className="w-5 h-5">
                <DiscordIcon className="w-4 h-4" />
              </Link>
            }
            <Link href={`https://goerli.etherscan.io/address/${collection.address}`} className="w-5 h-5">
              <EthscanIcon className="w-4 h-4" />
            </Link>
          </div>
          <Typography
            component="p"
            className="text-[14px] leading-5 text-light-200 max-w-[600px] xl:max-w-[700px] mt-[18px]"
          >
            {showMoreDec
              ? `${collection && collection.desc} `
              : `${collection && collection.desc.slice(0, 180)} ... `}
            <span
              className="cursor-pointer text-secondary"
              onClick={() => setShowMoreDec(!showMoreDec)}
            >
              {!showMoreDec ? "more" : "less"}
            </span>
          </Typography>
          <div className="grid grid-cols-3 lg:flex gap-5 lg:gap-9 mt-[30px]">
            <div className="flex flex-col-reverse lg:flex-col">
              <Typography className="font-medium text-[14px] leading-[1]">
                Items
              </Typography>
              <Typography className="font-bold text-[20px] lg:text-[24px] mt-[5px] leading-[1.5]">
                {nfts.length}
              </Typography>
            </div>
            <div className="flex flex-col-reverse lg:flex-col">
              <Typography className="font-medium text-[14px] leading-[1]">
                Owners
              </Typography>
              <Typography className="font-bold text-[20px] lg:text-[24px] mt-[5px] leading-[1.5]">
                {stat?.owners}
              </Typography>
            </div>

            <div className="flex flex-col-reverse lg:flex-col">
              <Typography className="font-medium text-[14px] leading-[1]">
                Listed
              </Typography>
              <Typography className="font-bold text-[20px] lg:text-[24px] mt-[5px] leading-[1.5]">
                {stat?.listedItems}
              </Typography>
            </div>

            <div className="flex flex-col-reverse lg:flex-col">
              <Typography className="font-medium text-[14px] leading-[1]">
                Sales
              </Typography>
              <Typography className="font-bold text-[20px] lg:text-[24px] mt-[5px] leading-[1.5]">
                {stat?.salesItems}
              </Typography>
            </div>
            <div className="flex flex-col-reverse lg:flex-col">
              <Typography className="font-medium text-[14px] leading-[1]">
                Floor price
              </Typography>
              <Typography className="font-bold text-[20px] lg:text-[24px] mt-[5px] leading-[1.5] whitespace-nowrap">
                {weiToNum(stat?.floorPrice).toFixed(2)} ETH
              </Typography>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 z-[2] hidden lg:block">
            <div className="flex gap-4 xl:gap-6">
              <Link href={"#"} className="w-8 h-8 xl:w-11 xl:h-11">
                <WebsiteIcon />
              </Link>
              <Link href={"#"} className="w-8 h-8 xl:w-11 xl:h-11">
                <TwitterIcon />
              </Link>
              <Link href={"#"} className="w-8 h-8 xl:w-11 xl:h-11">
                <DiscordIcon />
              </Link>
              <Link href={"#"} className="w-8 h-8 xl:w-11 xl:h-11">
                <EthscanIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default CollectionOverview;
