/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useCallback, useEffect, useState } from "react";

import { getListByUser } from "@/actions";
import { ListingTypes, NftTypes } from "@/utils/types";
import { Listing } from "./Listing";
import useScroll from "@/utils/useScroll";
import { DEFAULT_LIST_ITEMS_COUNT } from "@/config";

interface ListingProps {
  loading: boolean;
  setLoading: (state: boolean) => void;
}

export const Listings: FC<ListingProps> = ({ loading, setLoading }) => {
  // const { userData } = useUser();

  const [listData, setListData] = useState<ListingTypes[]>([]);
  const [endPageLoading, setEndPageLoading] = useState(false);

  const { top, height } = useScroll();

  useEffect(() => {
    if (loading || !listData) return;
    if (listData && top > 400 * listData.length - height) {
      handleFetchStatsData(false);
    }
  }, [top]);

  const handleFetchStatsData = useCallback(
    (withClear: boolean) => {
      if (withClear) setEndPageLoading(false);
      if (!withClear && endPageLoading) return;
      const lastSroll = top;
      setLoading(true);
      getListByUser({
        startId: withClear
          ? 0
          : Math.floor(listData.length / DEFAULT_LIST_ITEMS_COUNT) + 1,
        offset: DEFAULT_LIST_ITEMS_COUNT,
        limit: DEFAULT_LIST_ITEMS_COUNT,
      })
        .then((res) => {
          setEndPageLoading(
            !res?.length || res.length % DEFAULT_LIST_ITEMS_COUNT != 0
          );
          if (withClear) {
            setListData(res)
          } else {
            const oldData: NftTypes[] = Object.assign(listData);
            oldData.push(...res);
            setListData(res)
            window.scrollTo(0, lastSroll);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [listData, top, endPageLoading]
  );

  // useEffect(() => {
  //   if (!setLoading) return;
  //   setLoading(true);
  //   const getNftData = async () => {
  //     const listingData = await getListByUser();
  //     setListData(listingData?.data);
  //     setLoading(false);
  //   }
  //   getNftData();
  // }, [userData, setLoading]);

  return (
    <table className="w-full">
      <thead>
        <tr className="text-[24px] text-white font-semibold justify-between">
          <th align="left" className="w-1/2">
            Item
          </th>
          <th align="left">Price</th>
          <th align="left" className="max-md:hidden">
            Floor
          </th>
          <th align="right" className="max-xl:hidden">
            Expiration
          </th>
        </tr>
      </thead>
      <tbody>
        {listData &&
          listData.map((item, key) => <Listing key={key} listing={item} />)}
      </tbody>
    </table>
  );
};
