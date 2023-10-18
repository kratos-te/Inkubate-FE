import { FC, useEffect, useState } from "react";
import { EditSmIcon, OfferSmIcon, OfferSmTwoIcon } from "./SvgIcons";
import UserAvatar from "./UserAvatar";
import { ActivityTypes } from "@/utils/types";
import { getActivityByNft } from "@/actions";
import { weiToNum } from "@/utils/util";
import moment from "moment";

interface ActivityTableProps {
  collectionId: string;
  contract: string;
  nftId: string;
}

const AssetActivityTable: FC<ActivityTableProps> = ({ nftId }) => {

  const [activity, setActivity] = useState<ActivityTypes[]>([]);

  useEffect(() => {
    const getActs = async () => {
      const activities = await getActivityByNft(nftId)
      setActivity(activities?.data)
    }
    getActs();
  }, [nftId])


  return (
    <table className="w-full">
      <thead>
        <tr className="text-light-100 text-[15px] font-bold font-readex">
          <th align="left" className="pb-3">
            Event
          </th>
          <th align="left" className="pb-3">
            Price
          </th>
          <th align="left" className="pb-3">
            From
          </th>
          <th align="left" className="pb-3">
            To
          </th>
          <th align="left" className="pb-3">
            Time
          </th>
        </tr>
      </thead>
      <tbody>
        {activity.map((item, key) => (
          <tr key={key}>
            <td className="h-[54px] flex items-center gap-[5px] text-[14px] font-medium text-light-100 w-1/5">
              {(item.actionType === "LISTED" || item.actionType === "UNLISTED") &&
                <div className="flex gap-[5px] items-center">
                  <OfferSmIcon /> {item.actionType}
                </div>
              }
              {item.actionType === "CREATED_OFFER" &&
                <div className="flex gap-[5px] items-center">
                  <EditSmIcon /> {item.actionType}
                </div>
              }
              {item.actionType === "MINTED" &&
                <div className="flex gap-[5px] items-center">
                  <OfferSmTwoIcon /> {item.actionType}
                </div>
              }
            </td>
            <td className="h-[54px] text-[14px] font-medium text-light-100 w-1/5">
              {weiToNum(item.price)} ETH
            </td>
            <td className="h-[54px] text-[14px] font-medium text-secondary items-center w-1/5">
              {item.seller &&
                <div className="flex gap-[5px] items-center">
                  <UserAvatar
                    gradientFrom="red"
                    gradientTo="blue"
                    src={item.seller?.profile?.avatar?.url}
                  />
                  {item.seller.username}
                </div>
              }
            </td>
            <td className="h-[54px] text-[14px] font-medium text-light-100 w-1/5">
              {item.buyer ?
                <div className="flex gap-[5px] items-center">
                  <UserAvatar
                    gradientFrom="red"
                    gradientTo="blue"
                    src={item.buyer.profile.avatar.url}
                  />
                  {item.buyer.username}
                </div> : "—"}
            </td>
            <td className="h-[54px] text-[14px] font-medium text-light-100 w-1/5">
              {moment(new Date(item.createdAt)).fromNow()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AssetActivityTable;
