/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import Typography from "./Typography";
import { ExtendIcon, VerifiedIcon } from "./SvgIcons";
import Link from "next/link";
import { ActivityTypes } from "@/utils/types";
import { weiToNum } from "@/utils/util";

const ActivityMobileCard: FC<{ actData: ActivityTypes }> = ({ actData }) => {
  return (
    <div className="rounded-xl shadow-card bg-dark-200 py-[18px] px-7">
      <div className="flex gap-7 items-center">
        <div
          className="p-[1px] xl:p-[3px] rounded-lg xl:rounded-[20px] inline-flex h-[68px] w-[68px] xl:h-[118px] xl:w-[118px]"
          style={{
            background: "linear-gradient(90deg, #428CD4, #FF9CDA)",
          }}
        >
          <div className="relative w-[66px] xl:w-[112px] h-[66px] xl:h-[112px] rounded-lg xl:rounded-[19px] overflow-hidden">
            <img
              src={actData.nft.image || "/assets/images/pfp-demo.gif"}
              className=" object-cover"
              alt=""
            />
          </div>
        </div>
        <div className="w-[calc(100%-94px)]">
          <div className="flex items-center justify-between">
            <Typography className="text-[20px] font-bold flex items-center gap-2">
              OptiDrake <VerifiedIcon color="#EA4492" />
            </Typography>
            <div className="bg-secondary px-6 rounded-lg py-[3px]">
              <Typography className="text-[14px] leading-5 font-semibold">
                Sale
              </Typography>
            </div>
          </div>
          <Typography className="text-[24px] leading-8 font-poppins mt-3">
            ETH
          </Typography>
          <Typography className="text-[24px] leading-8 font-poppins !text-secondary font-bold">
            {weiToNum(actData.price)}
          </Typography>
        </div>
      </div>
      <div className="flex justify-between mt-[14px]">
        <div className="">
          <Typography className="text-[12px] leading-[18px]">From</Typography>
          <Typography className="text-[14px] leading-[20px] font-bold">
            {actData.seller?.username}
          </Typography>
        </div>
        <div className="">
          <Typography className="text-[12px] leading-[18px]">To</Typography>
          <Typography className="text-[14px] leading-[20px] font-bold">
            {actData.buyer?.username ? actData.buyer?.username : "—"}
          </Typography>
        </div>
        <div className="">
          <Typography className="text-[12px] leading-[18px]">Date</Typography>
          <Link
            href={
              "https://optimistic.etherscan.io/tx/0xbc6a03694e8e412833e9a7f03018446570fadfe5cb4f89e31fa66fe39dda922a"
            }
            target="_blank"
          >
            <Typography className="text-[14px] leading-[20px] font-bold flex items-center">
              0x5123 <ExtendIcon className="ml-2" />
            </Typography>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ActivityMobileCard;
