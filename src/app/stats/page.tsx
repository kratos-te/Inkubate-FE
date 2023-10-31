/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { getAllStats } from "@/actions";
import ChainsDropdown from "@/components/ChainsDropdown";
import RowStatsItemLoader from "@/components/Common/RowStateItemLoader";
import RowStatsItem from "@/components/RowStatsItem";
import StatsRangeDropdown from "@/components/StatsRangeDropdown";
import {
  ArrowDownLineIcon,
  ArrowUpDownIcon,
  SearchIcon,
} from "@/components/SvgIcons";
import Typography from "@/components/Typography";
import MainLayout from "@/layouts/MainLayout";
import { Meta } from "@/layouts/Meta";
import useWindowSize from "@/utils/useWindowSize";
import {
  CollectionStats,
  PeriodType,
  SortType,
  StatsSortBy,
} from "@/utils/types";
import useScroll from "@/utils/useScroll";
import { DEFAULT_LIST_ITEMS_COUNT } from "@/config";

export default function StatPage() {
  const [range, setRange] = useState<PeriodType>(PeriodType.DAY);
  const [search, setSearch] = useState("");
  const [chainId, setChainId] = useState("all");
  const [sortBy, setSortBy] = useState(StatsSortBy.VOLUME);
  const [orderBy, setOrderBy] = useState<SortType>(SortType.DESC);
  const [loading, setLoading] = useState(false);
  const [endPageLoading, setEndPageLoading] = useState(false);
  const [collections, setCollections] = useState<CollectionStats[]>([]);

  const { width } = useWindowSize();
  const { top, height } = useScroll();
  const tableRef = useRef<HTMLTableElement | null>(null);

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
    setOrderBy(SortType.DESC);
  }, [sortBy]);

  useEffect(() => {
    if (loading) return;
    handleFetchStatsData(true);
  }, [range, search, sortBy, orderBy]);

  // Fetch initial data when reloading
  useEffect(() => {
    handleFetchStatsData(true);
  }, []);

  useEffect(() => {
    if (loading) return;
    if (top > 80 * collections.length - height) {
      handleFetchStatsData(false);
    }
  }, [top]);

  const handleFetchStatsData = useCallback(
    (withClear: boolean) => {
      if (withClear) setEndPageLoading(false);
      if (!withClear && endPageLoading) return;
      const lastSroll = top;
      setLoading(true);
      getAllStats({
        filter: search || undefined,
        period: range,
        sortBy,
        sortType: orderBy,
        pageId: withClear
          ? 1
          : Math.floor(collections.length / DEFAULT_LIST_ITEMS_COUNT) + 1,
        offset: DEFAULT_LIST_ITEMS_COUNT,
        limit: DEFAULT_LIST_ITEMS_COUNT,
      })
        .then((res) => {
          setEndPageLoading(
            !res.length || res.length % DEFAULT_LIST_ITEMS_COUNT != 0
          );
          if (withClear) {
            setCollections(res);
          } else {
            const oldData: CollectionStats[] = Object.assign(collections);
            oldData.push(...res);
            setCollections(oldData);
            window.scrollTo(0, lastSroll);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [collections, search, range, orderBy, sortBy, top, endPageLoading]
  );

  const SortAbleHeadCell = ({
    title,
    align,
    sort,
    className,
  }: {
    title: string;
    sort: StatsSortBy;
    align: "center" | "start" | "end";
    className: string;
  }) => {
    if (sort !== StatsSortBy.VOLUME) {
      return (
        <th
          className={className}
          onClick={() => {
            setSortBy(sort);
            setOrderBy((prev) =>
              prev === SortType.DESC ? SortType.ASC : SortType.DESC
            );
          }}
        >
          <div
            className={`text-[14px] md:text-[16px] flex items-center justify-${align}`}
          >
            {title}
            {sortBy === sort ? (
              <ArrowDownLineIcon
                className={`ml-0.5 rotate-${
                  orderBy === SortType.DESC ? 0 : 180
                }`}
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
            setSortBy(StatsSortBy.VOLUME);
            setOrderBy((prev) =>
              prev === SortType.DESC ? SortType.ASC : SortType.DESC
            );
          }}
        >
          <div
            className={`text-[14px] md:text-[16px] flex items-center justify-end md:justify-center`}
          >
            {width < 480 ? "Total Volume" : "Volume"}
            {sortBy === sort ? (
              <ArrowDownLineIcon
                className={`ml-0.5 rotate-${
                  orderBy === SortType.DESC ? 0 : 180
                }`}
              />
            ) : (
              <ArrowUpDownIcon className="ml-0.5" />
            )}
          </div>
        </th>
      );
    }
  };

  return (
    <>
      <MainLayout
        className="!bg-dark-300"
        meta={
          <Meta
            title="Collection Stats"
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
                  placeholder="Search collection"
                  value={search}
                  onChange={(e) => setSearch(e.target.value || "")}
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
            <table className="w-full" ref={tableRef}>
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
                    sort={StatsSortBy.VOLUME}
                    className="py-2.5 md:py-[30px] w-[100px] md:w-[124px] cursor-pointer"
                  />
                  <SortAbleHeadCell
                    title="%"
                    align="center"
                    sort={StatsSortBy.LIQUIDITY}
                    className="py-[30px] w-[124px] cursor-pointer hidden xld:table-cell"
                  />
                  <SortAbleHeadCell
                    title="Floor"
                    align="center"
                    sort={StatsSortBy.FLOOR}
                    className="py-2.5 md:py-[30px] w-[100px] md:w-[124px] cursor-pointer hidden sm:table-cell"
                  />
                  <SortAbleHeadCell
                    title="Sales"
                    align="center"
                    sort={StatsSortBy.SALES}
                    className="py-[30px] w-[124px] cursor-pointer hidden md:table-cell"
                  />
                  <SortAbleHeadCell
                    title="Items"
                    align="center"
                    sort={StatsSortBy.ITEMS}
                    className="py-[30px] w-[124px] cursor-pointer hidden md:table-cell"
                  />
                  <SortAbleHeadCell
                    title="Listed"
                    align="center"
                    sort={StatsSortBy.LISTED}
                    className="py-[30px] w-[124px] cursor-pointer hidden lg:table-cell"
                  />
                  <SortAbleHeadCell
                    title="Owners"
                    align="end"
                    sort={StatsSortBy.OWNERS}
                    className="py-[30px] w-[124px] cursor-pointer hidden lg:table-cell "
                  />
                  <th style={{ width: cellInterval }} />
                </tr>
              </thead>
              {!loading ? (
                <tbody>
                  {collections &&
                    collections.map((item, key) => (
                      <RowStatsItem
                        collection={{
                          ...item,
                          index: key + 1,
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
