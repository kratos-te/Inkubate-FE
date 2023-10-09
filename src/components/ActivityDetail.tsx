"use client";
import { FC, useEffect, useState } from "react";
import { CloseIcon, ExtendIcon, SalesIcon } from "./SvgIcons";
import Typography from "./Typography";
import UserAvatar from "./UserAvatar";
import moment from "moment";
import ActivityChart from "./ActivityChart";
import Link from "next/link";
import ActivityMobileCard from "./ActivityMobileCard";
import Skeleton from "react-loading-skeleton";
import ActivityMobileCardLoader from "./Common/ActivityMobileCardLoader";
import { ActivityTypes } from "@/utils/types";
import { weiToNum } from "@/utils/util";

interface DetailProps {
  actData: ActivityTypes[];
}

const ActivityDetail: FC<DetailProps> = ({ actData }) => {
  const tags = [
    {
      title: "sale",
      icon: <SalesIcon />,
      value: "sale",
    },
  ];

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);
  return (
    <>
      <div className="">
        {tags.map((tag, key) => (
          <button
            key={key}
            className="flex gap-1.5 px-2.5 py-3 text-light-300 items-center bg-dark-400 rounded-lg capitalize hover:bg-dark-500 duration-300"
          >
            {tag.icon} {tag.title} <CloseIcon />
          </button>
        ))}
        <div className="">
          <ActivityChart />
        </div>
        <table className="w-full mt-6 hidden lg:inline-table">
          <thead>
            <tr>
              <th
                align="left"
                className="py-[14px] font-semibold leading-[1.5] text-light-300 px-2.5"
              >
                Event
              </th>
              <th
                align="left"
                className="py-[14px] font-semibold leading-[1.5] text-light-300 px-2.5"
              >
                Item
              </th>
              <th
                align="left"
                className="py-[14px] font-semibold leading-[1.5] text-light-300"
              >
                Price
              </th>
              <th
                align="left"
                className="py-[14px] font-semibold leading-[1.5] text-light-300"
              >
                From
              </th>
              <th
                align="left"
                className="py-[14px] font-semibold leading-[1.5] text-light-300"
              >
                To
              </th>
              <th
                align="left"
                className="py-[14px] font-semibold leading-[1.5] text-light-300 w-[120px]"
              >
                Date
              </th>
            </tr>
          </thead>
          {!loading && (
            <tbody>
              {actData &&
                actData.map(
                  (row, key) => 
                    row && (
                      <tr
                        className="border-t-[0.5px] border-[687681]"
                        key={key}
                      >
                        <td>
                          <div className="flex items-center text-secondary font-readex text-[14px] font-medium capitalize">
                            <SalesIcon color="#EA4492" className="mr-1" />
                            {row.actionType}
                          </div>
                        </td>
                        <td>
                          <div className="py-[17px] flex items-center">
                            <image
                              xlinkHref={row.nft.imgUrl}
                              className="rounded-md mr-2.5 w-[40px] h-[40px]"
                            />
                            <div className="">
                              <Typography className="font-semibold leading-[1.5]">
                                {`${row.nft.name}#${row.nft.nftId}`}
                              </Typography>
                              <Typography className="text-[14px] font-medium leading-[1.5] !text-dark-700 mt-0.5">
                                {row.nft.name}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className="">
                          <Typography className="text-[14px] font-bold">
                            ETH{weiToNum(row.price)}
                          </Typography>
                        </td>
                        <td>
                          <div className="flex items-center">
                            <UserAvatar
                              src={row.seller.profile.avatar?.url || "/assets/images/default-avatar.svg"}
                              gradientFrom="red"
                              gradientTo="blue"
                              className="hidden xl:block mr-2"
                            />
                            <Typography className="text-[14px] font-bold ml-2">
                              {row.seller.username}
                            </Typography>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center">
                            <UserAvatar
                              src={row.buyer.profile.avatar?.url || "/assets/images/default-avatar.svg"}
                              gradientFrom="yellow"
                              gradientTo="blue"
                              className="hidden xl:block mr-2"
                            />
                            <Typography className="text-[14px] font-bold">
                              {row.buyer.username}
                            </Typography>
                          </div>
                        </td>
                        <td>
                          <Link
                            href={`https://Goerli.etherscan.io/tx/${row.txHash}`}
                            target="_blank"
                          >
                            <div className="flex items-center justify-start">
                              <Typography className="text-[14px] font-bold ml-2">
                                {moment(new Date(row.createdAt)).fromNow()}
                              </Typography>
                              <ExtendIcon className="ml-1" />
                            </div>
                          </Link>
                        </td>
                      </tr>
                    )
                )}
            </tbody>
          )}
          {loading && (
            <tbody>
              {actData && actData.map(
                (row, key) =>
                  row && (
                    <tr className="border-t-[0.5px] border-[687681]" key={key}>
                      <td>
                        <Skeleton
                          width={40}
                          height={20}
                          baseColor="#333"
                          highlightColor="#444"
                        />
                      </td>
                      <td>
                        <div className="py-[17px] flex items-center">
                          <Skeleton
                            width={40}
                            height={40}
                            baseColor="#333"
                            highlightColor="#444"
                          />
                          <div className="ml-3">
                            <Skeleton
                              width={60}
                              height={20}
                              baseColor="#333"
                              highlightColor="#444"
                            />
                            <Skeleton
                              width={50}
                              height={18}
                              baseColor="#333"
                              highlightColor="#444"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="">
                        <Skeleton
                          width={60}
                          height={20}
                          baseColor="#333"
                          highlightColor="#444"
                        />
                      </td>
                      <td>
                        <div className="flex items-center">
                          <Skeleton
                            width={30}
                            height={30}
                            baseColor="#333"
                            highlightColor="#444"
                          />
                          <div className="ml-3">
                            <Skeleton
                              width={60}
                              height={20}
                              baseColor="#333"
                              highlightColor="#444"
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center">
                          <Skeleton
                            width={30}
                            height={30}
                            baseColor="#333"
                            highlightColor="#444"
                          />
                          <div className="ml-3">
                            <Skeleton
                              width={60}
                              height={20}
                              baseColor="#333"
                              highlightColor="#444"
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <Skeleton
                          width={60}
                          height={20}
                          baseColor="#333"
                          highlightColor="#444"
                        />
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          )}
        </table>
        <div className="flex flex-col gap-3 lg:hidden mt-[30px]">
          {!loading &&
            actData.map((_, key) => <ActivityMobileCard key={key} />)}
          {loading &&
            actData.map((_, key) => <ActivityMobileCardLoader key={key} />)}
        </div>
      </div>
    </>
  );
};

export default ActivityDetail;
