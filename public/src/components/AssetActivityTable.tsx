import { FC } from "react";
import { EditSmIcon, OfferSmIcon, OfferSmTwoIcon } from "./SvgIcons";
import UserAvatar from "./UserAvatar";

interface ActivityTableProps {
  collectionId: string;
  contract: string;
  nftId: number;
}

const AssetActivityTable: FC<ActivityTableProps> = ({}) => {
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
        <tr>
          <td className="h-[54px] flex items-center gap-[5px] text-[14px] font-medium text-light-100 w-1/5">
            <div className="flex gap-[5px] items-center">
              <OfferSmIcon /> List
            </div>
          </td>
          <td className="h-[54px] text-[14px] font-medium text-light-100 w-1/5">
            0.024 ETH
          </td>
          <td className="h-[54px] text-[14px] font-medium text-secondary items-center w-1/5">
            <div className="flex gap-[5px] items-center">
              <UserAvatar
                gradientFrom="red"
                gradientTo="blue"
                src="/assets/images/avatar-demo.png"
              />
              Qorem
            </div>
          </td>
          <td className="h-[54px] text-[14px] font-medium text-light-100 w-1/5">
            —
          </td>
          <td className="h-[54px] text-[14px] font-medium text-light-100 w-1/5">
            9 days ago
          </td>
        </tr>
        <tr>
          <td className="h-[54px] flex items-center gap-[5px] text-[14px] font-medium text-light-100 w-1/5">
            <div className="flex gap-[5px] items-center">
              <OfferSmTwoIcon /> Offer{" "}
              <span className="text-secondary text-[12px]">Cancelled</span>
            </div>
          </td>
          <td className="h-[54px] text-[14px] font-medium text-light-100 w-1/5">
            0.024 ETH
          </td>
          <td className="h-[54px] text-[14px] font-medium text-secondary items-center w-1/5">
            <div className="flex gap-[5px] items-center">
              <UserAvatar gradientFrom="red" gradientTo="blue" />
              Qorem
            </div>
          </td>
          <td className="h-[54px] text-[14px] font-medium text-light-100 w-1/5">
            —
          </td>
          <td className="h-[54px] text-[14px] font-medium text-light-100 w-1/5">
            9 days ago
          </td>
        </tr>
        <tr>
          <td className="h-[54px] flex items-center gap-[5px] text-[14px] font-medium text-light-100 w-1/5">
            <div className="flex gap-[5px] items-center">
              <EditSmIcon /> Mint
            </div>
          </td>
          <td className="h-[54px] text-[14px] font-medium text-light-100 w-1/5">
            —
          </td>
          <td className="h-[54px] text-[14px] font-medium text-secondary items-center w-1/5">
            <div className="flex gap-[5px] items-center">
              <UserAvatar gradientFrom="yellow" gradientTo="blue" />
              Qorem
            </div>
          </td>
          <td className="h-[54px] text-[14px] font-medium text-light-100 w-1/5">
            <div className="flex gap-[5px] items-center">
              <UserAvatar gradientFrom="red" gradientTo="blue" />
              Qorem
            </div>
          </td>
          <td className="h-[54px] text-[14px] font-medium text-light-100 w-1/5">
            9 days ago
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default AssetActivityTable;
