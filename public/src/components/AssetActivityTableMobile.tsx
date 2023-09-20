import { FC } from "react";
import { OfferSmIcon, OfferSmTwoIcon, VerifiedIcon } from "./SvgIcons";
import Image from "next/image";
import Typography from "./Typography";

interface ActivityTableProps {
  collectionId: string;
  contract: string;
  nftId: number;
}

const AssetActivityTableMobile: FC<ActivityTableProps> = ({}) => {
  return (
    <div className="grid gap-5 max-h-[200px] overflow-auto">
      <div className="rounded-lg shadow-card border-[0.5px] border-light-200 p-[15px]">
        <div className="flex items-center gap-1">
          <OfferSmIcon className="w-3 h-3" />
          <Typography className="font-medium text-[12px] font-readex">
            List
          </Typography>
        </div>
        <div className="flex justify-between mt-5">
          <div className="flex items-center">
            <Image
              src="/assets/images/pfp-demo.gif"
              width={40}
              height={40}
              className="rounded-md"
              alt=""
            />
            <div className="ml-2.5">
              <Typography className="!text-third text-[12px] flex gap-1 items-center">
                Optimistic Bunnies <VerifiedIcon color="#EA4492" />
              </Typography>
              <Typography className="text-[13px] font-semibold">
                Bunny#3358
              </Typography>
            </div>
          </div>
          <Typography className="text-[14px] font-medium">0.024ETH</Typography>
        </div>
        <div className="flex justify-between mt-5">
          <div className="">
            <Typography className="text-[12px] !text-third">From</Typography>
            <Typography className="text-[13px] font-medium !text-secondary">
              jfietv
            </Typography>
          </div>
          <div className="">
            <Typography className="text-[12px] !text-third">To</Typography>
            <Typography className="text-[13px] font-medium">—</Typography>
          </div>
          <div className="text-right">
            <Typography className="text-[12px] !text-third">Date</Typography>
            <Typography className="text-[13px] font-medium">
              9 days ago
            </Typography>
          </div>
        </div>
      </div>
      <div className="rounded-lg shadow-card border-[0.5px] border-light-200 p-[15px]">
        <div className="flex items-center gap-1">
          <OfferSmTwoIcon className="w-3 h-3" />
          <Typography className="font-medium text-[12px]">
            Offer{" "}
            <span className="text-secondary text-[12px] ml-2 font-400">
              Cancelled
            </span>
          </Typography>
        </div>
        <div className="flex justify-between mt-5">
          <div className="flex items-center">
            <Image
              src="/assets/images/pfp-demo.gif"
              width={40}
              height={40}
              className="rounded-md"
              alt=""
            />
            <div className="ml-2.5">
              <Typography className="!text-third text-[12px] flex gap-1 items-center">
                Optimistic Bunnies <VerifiedIcon color="#EA4492" />
              </Typography>
              <Typography className="text-[13px] font-semibold">
                Bunny#3358
              </Typography>
            </div>
          </div>
          <Typography className="text-[14px] font-medium">0.024ETH</Typography>
        </div>
        <div className="flex justify-between mt-5">
          <div className="">
            <Typography className="text-[12px] !text-third">From</Typography>
            <Typography className="text-[13px] font-medium !text-secondary">
              jfietv
            </Typography>
          </div>
          <div className="">
            <Typography className="text-[12px] !text-third">To</Typography>
            <Typography className="text-[13px] font-medium">—</Typography>
          </div>
          <div className="text-right">
            <Typography className="text-[12px] !text-third">Date</Typography>
            <Typography className="text-[13px] font-medium">
              9 days ago
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetActivityTableMobile;
