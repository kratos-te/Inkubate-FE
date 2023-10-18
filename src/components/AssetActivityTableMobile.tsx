/* eslint-disable @next/next/no-img-element */
import { FC, useEffect, useState } from "react";
import { EditSmIcon, OfferSmIcon, OfferSmTwoIcon, VerifiedIcon } from "./SvgIcons";
import Typography from "./Typography";
import { ActivityTypes } from "@/utils/types";
import { getActivityByNft } from "@/actions";
import moment from "moment";

interface ActivityTableProps {
  collectionId: string;
  contract: string;
  nftId: string;
}

const AssetActivityTableMobile: FC<ActivityTableProps> = ({ nftId }) => {

  const [activity, setActivity] = useState<ActivityTypes[]>([]);

  useEffect(() => {
    const getActs = async () => {
      const activities = await getActivityByNft(nftId)
      setActivity(activities?.data)
    }
    getActs();
  }, [nftId])
  return (
    <div className="grid gap-5 max-h-[200px] overflow-auto">
      {activity.map((item, key) => (
        <div key={key} className="rounded-lg shadow-card border-[0.5px] border-light-200 p-[15px]">
          <div className="flex items-center gap-1">
            {(item.actionType === "LISTED" || item.actionType === "UNLISTED") &&
              (
                <>
                <OfferSmIcon className="w-3 h-3" />
                <Typography className="font-medium text-[12px] font-readex">
                  {item.actionType}
                </Typography>
                </>
              )
            }
            {item.actionType === "CREATED_OFFER" &&
              (
                <>
                  <EditSmIcon className="w-3 h-3" />
                  <Typography className="font-medium text-[12px] font-readex">
                    {item.actionType}
                  </Typography>
                </>
              )
            }
            {item.actionType === "MINTED" &&
              (
                <>
                  <OfferSmTwoIcon className="w-3 h-3" />
                <Typography className="font-medium text-[12px] font-readex">
                  {item.actionType}
                </Typography>
                </>
              )
            }
          </div>
          <div className="flex justify-between mt-5">
            <div className="flex items-center">
              <img
                src={item.nft?.image || "/assets/images/pfp-demo.gif"}
                className="rounded-md w-[40px] h-[40px]"
                alt=""
              />
              <div className="ml-2.5">
                <Typography className="!text-third text-[12px] flex gap-1 items-center">
                  {item.nft.collection} <VerifiedIcon color="#EA4492" />
                </Typography>
                <Typography className="text-[13px] font-semibold">
                  {item.nft.name}
                </Typography>
              </div>
            </div>
            <Typography className="text-[14px] font-medium">0.024ETH</Typography>
          </div>
          <div className="flex justify-between mt-5">
            <div className="">
              <Typography className="text-[12px] !text-third">From</Typography>
              {item.seller && 
                <Typography className="text-[13px] font-medium !text-secondary">
                  {item.seller.username}
                </Typography>
              }
            </div>
            <div className="">
              <Typography className="text-[12px] !text-third">To</Typography>
              {item.buyer ?
                <Typography className="text-[13px] font-medium">{item.buyer.username}</Typography>
                :
                <Typography className="text-[13px] font-medium">—</Typography>
              }
            </div>
            <div className="text-right">
              <Typography className="text-[12px] !text-third">Date</Typography>
              <Typography className="text-[13px] font-medium">
                {moment(new Date(item.createdAt)).fromNow()}
              </Typography>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AssetActivityTableMobile;
