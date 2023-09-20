"use client";
import { FC, useEffect, useState } from "react";
import { CloseIcon, ExtendIcon, SalesIcon } from "./SvgIcons";
import { DEMO_ACTIVITY } from "@/config";
import Image from "next/image";
import Typography from "./Typography";
import UserAvatar from "./UserAvatar";
import moment from "moment";
import ActivityChart from "./ActivityChart";
import Link from "next/link";
import ActivityMobileCard from "./ActivityMobileCard";
import Skeleton from "react-loading-skeleton";
import ActivityMobileCardLoader from "./Common/ActivityMobileCardLoader";

const ActivityDetail: FC = ({}) => {
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
              {DEMO_ACTIVITY[0] &&
                Array.from({ length: 12 }, () => DEMO_ACTIVITY[0]).map(
                  (row, key) =>
                    row && (
                      <tr
                        className="border-t-[0.5px] border-[687681]"
                        key={key}
                      >
                        <td>
                          <div className="flex items-center text-secondary font-readex text-[14px] font-medium capitalize">
                            <SalesIcon color="#EA4492" className="mr-1" />
                            {row.event}
                          </div>
                        </td>
                        <td>
                          <div className="py-[17px] flex items-center">
                            <Image
                              src={row.item.image}
                              width={40}
                              height={40}
                              className="rounded-md mr-2.5"
                              alt=""
                            />
                            <div className="">
                              <Typography className="font-semibold leading-[1.5]">
                                {row.item.name}
                              </Typography>
                              <Typography className="text-[14px] font-medium leading-[1.5] !text-dark-700 mt-0.5">
                                OG Dread Zero
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className="">
                          <Typography className="text-[14px] font-bold">
                            ETH {row.price}
                          </Typography>
                        </td>
                        <td>
                          <div className="flex items-center">
                            <UserAvatar
                              gradientFrom="red"
                              gradientTo="blue"
                              className="hidden xl:block mr-2"
                            />
                            <Typography className="text-[14px] font-bold ml-2">
                              0x5124
                            </Typography>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center">
                            <UserAvatar
                              gradientFrom="yellow"
                              gradientTo="blue"
                              className="hidden xl:block mr-2"
                            />
                            <Typography className="text-[14px] font-bold">
                              0x5124
                            </Typography>
                          </div>
                        </td>
                        <td>
                          <Link
                            href={
                              "https://optimistic.etherscan.io/tx/0xbc6a03694e8e412833e9a7f03018446570fadfe5cb4f89e31fa66fe39dda922a"
                            }
                            target="_blank"
                          >
                            <div className="flex items-center justify-end">
                              <Typography className="text-[14px] font-bold ml-2">
                                {moment(row.timeStamp * 1000).fromNow()}
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
              {Array.from({ length: 12 }, () => DEMO_ACTIVITY[0]).map(
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
            Array.from({ length: 10 }).map((_, key) => (
              <ActivityMobileCard key={key} />
            ))}
          {loading &&
            Array.from({ length: 10 }).map((_, key) => (
              <ActivityMobileCardLoader key={key} />
            ))}
        </div>
      </div>
    </>
  );
};

export default ActivityDetail;
