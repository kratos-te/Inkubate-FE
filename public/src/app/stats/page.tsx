"use client";
import { useEffect, useMemo, useState } from "react";
import RowStatsItem from "@/components/RowStatsItem";
import {
  ArrowDownLineIcon,
  ArrowUpDownIcon,
  SearchIcon,
} from "@/components/SvgIcons";
import Typography from "@/components/Typography";
import { DEMO_COLLECTIONS } from "@/config";
import ChainsDropdown from "@/components/ChainsDropdown";
import { Meta } from "@/layouts/Meta";
import MainLayout from "@/layouts/MainLayout";
import useWindowSize from "@/utils/useWindowSize";
import StatsRangeDropdown from "@/components/StatsRangeDropdown";
import RowStatsItemLoader from "@/components/Common/RowStateItemLoader";

export default function Home() {
  const [range, setRange] = useState<number>(24);
  const collections = Array(12).fill(DEMO_COLLECTIONS[0]);
  const [chainId, setChainId] = useState("all");
  const [sortBy, setSortBy] = useState("volume");
  const [orderBy, setOrderBy] = useState<"desc" | "asc">("desc");

  // set width of emplty corner cells
  const { width } = useWindowSize();
  const cellInterval = useMemo(() => {
    let val = 0;
    if (width > 1628) {
      val = width - 1628;
    } else {
      val = 60;
    }
    return val / 2;
  }, [width]);

  useEffect(() => {
    setOrderBy("desc");
  }, [sortBy]);

  const SortAbleHeadCell = ({
    title,
    align,
    sort,
    className,
  }: {
    title: string;
    sort: string;
    align: "center" | "start" | "end";
    className: string;
  }) => {
    if (sort !== "volume") {
      return (
        <th
          className={className}
          onClick={() => {
            setSortBy(sort);
            setOrderBy((prev) => (prev === "desc" ? "asc" : "desc"));
          }}
        >
          <div
            className={`text-[14px] md:text-[16px] flex items-center justify-${align}`}
          >
            {title}
            {sortBy === sort ? (
              <ArrowDownLineIcon
                className={`ml-0.5 rotate-${orderBy === "desc" ? 0 : 180}`}
              />
            ) : (
              <ArrowUpDownIcon className="ml-0.5" />
            )}
          </div>
        </th>
      );
    } else {
      return (
        <th
          className="py-2.5 md:py-[30px] w-auto sm:w-[124px] cursor-pointer whitespace-nowrap"
          onClick={() => {
            setSortBy("volume");
            setOrderBy((prev) => (prev === "desc" ? "asc" : "desc"));
          }}
        >
          <div
            className={`text-[14px] md:text-[16px] flex items-center justify-end md:justify-center`}
          >
            {width < 480 ? "Total Volume" : "Volume"}
            {sortBy === sort ? (
              <ArrowDownLineIcon
                className={`ml-0.5 rotate-${orderBy === "desc" ? 0 : 180}`}
              />
            ) : (
              <ArrowUpDownIcon className="ml-0.5" />
            )}
          </div>
        </th>
      );
    }
  };

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  return (
    <>
      <MainLayout
        className="!bg-dark-300"
        meta={
          <Meta
            title="Trending Collections"
            description="Lorem ipsum dolor sit amet."
          />
        }
      >
        <div className="max-w-[1628px] mx-5 2xl:mx-auto pt-[112px] md:pt-[167px] relative z-20">
          <div className="flex flex-col lg:flex-row">
            <Typography
              component="h2"
              className="text-[18px] lg:text-[24px] leading-[1.5] font-poppins font-bold mr-4 mb-2.5 lg:mb-0"
            >
              Collection Stats
            </Typography>
            <div className="lg:w-[calc(100%-220px)] flex gap-2 md:gap-[14px]">
              <div className="order-3 md:order-1 w-[calc(100%-212px)] md:w-[calc(100%-244px)] rounded-xl overflow-hidden relative backdrop-blur-[2px] bg-dark-600">
                <SearchIcon className="absolute left-3 top-[14px]" />
                <input
                  className="bg-transparent w-full h-[42px] pl-9 text-[14px] font-readex text-light-100 relative z-10 outline-none"
                  placeholder="Search items"
                />
              </div>
              <ChainsDropdown
                value={chainId}
                setValue={setChainId}
                className="md:order-2 order-2"
              />
              <StatsRangeDropdown range={range} setTab={setRange} />
            </div>
          </div>
        </div>
        <div className="mx-auto mt-[18px] relative z-10">
          <div className="py-[22px]">
            <table className="w-full">
              <thead>
                <tr className="text-[14px] font-bold leading-[20px] text-light-100">
                  <th style={{ width: cellInterval }} />
                  <th className="py-2.5 md:py-[30px] w-8 text-center">#</th>
                  <th
                    align="left"
                    className="py-2.5 md:py-[30px] text-[14px] md:text-[16px]"
                  >
                    Collection
                  </th>
                  <SortAbleHeadCell
                    title="Volume"
                    align="center"
                    sort="volume"
                    className="py-2.5 md:py-[30px] w-[100px] md:w-[124px] cursor-pointer"
                  />
                  <SortAbleHeadCell
                    title="24h %"
                    align="center"
                    sort="24h"
                    className="py-[30px] w-[124px] cursor-pointer hidden xld:table-cell"
                  />
                  <SortAbleHeadCell
                    title="7d %"
                    align="center"
                    sort="7d"
                    className="py-[30px] w-[124px] cursor-pointer hidden xld:table-cell"
                  />
                  <SortAbleHeadCell
                    title="Floor"
                    align="center"
                    sort="floor"
                    className="py-2.5 md:py-[30px] w-[100px] md:w-[124px] cursor-pointer hidden sm:table-cell"
                  />
                  <SortAbleHeadCell
                    title="Sales"
                    align="center"
                    sort="sales"
                    className="py-[30px] w-[124px] cursor-pointer hidden md:table-cell"
                  />
                  <SortAbleHeadCell
                    title="Items"
                    align="center"
                    sort="items"
                    className="py-[30px] w-[124px] cursor-pointer hidden md:table-cell"
                  />
                  <SortAbleHeadCell
                    title="Listed"
                    align="center"
                    sort="listed"
                    className="py-[30px] w-[124px] cursor-pointer hidden lg:table-cell"
                  />
                  <SortAbleHeadCell
                    title="Owners"
                    align="end"
                    sort="owners"
                    className="py-[30px] w-[124px] cursor-pointer hidden lg:table-cell "
                  />
                  <th style={{ width: cellInterval }} />
                </tr>
              </thead>
              {!loading ? (
                <tbody>
                  {collections.map((item, key) => (
                    <RowStatsItem
                      collection={{
                        collection: item,
                        rank: key + 1,
                        volumeD7: -2.5,
                        volumeH24: 4,
                      }}
                      key={key}
                    />
                  ))}
                </tbody>
              ) : (
                <tbody>
                  {Array.from({ length: 20 }).map((_, key) => (
                    <RowStatsItemLoader key={key} />
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
