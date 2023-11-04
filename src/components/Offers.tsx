/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useCallback, useEffect, useState } from "react";
import { getOfferByBuy, getOfferBySell } from "@/actions";
import { NftTypes, OfferTypes } from "@/utils/types";
import { Offer } from "./Offer";
import useScroll from "@/utils/useScroll";
import { DEFAULT_LIST_ITEMS_COUNT } from "@/config";

interface OfferProps {
  loading: boolean;
  tab: string;
  setLoading: (state: boolean) => void;
}

export const Offers: FC<OfferProps> = ({ loading, tab, setLoading }) => {

  const [offerData, setOfferData] = useState<OfferTypes[]>([]);
  const [endPageLoading, setEndPageLoading] = useState(false);

  const { top, height } = useScroll();

  useEffect(() => {
    if (loading || !offerData) return;
    if (offerData && top > 400 * offerData.length - height) {
      handleFetchStatsData(false);
    }
  }, [top]);

  const handleFetchStatsData = useCallback(
    (withClear: boolean) => {
      if (withClear) setEndPageLoading(false);
      if (!withClear && endPageLoading) return;
      const lastSroll = top;
      setLoading(true);
      if (tab === "8") {
        getOfferByBuy({
          startId: withClear
            ? 0
            : Math.floor(offerData.length / DEFAULT_LIST_ITEMS_COUNT) + 1,
          offset: DEFAULT_LIST_ITEMS_COUNT,
          limit: DEFAULT_LIST_ITEMS_COUNT,
        })
          .then((res) => {
            setEndPageLoading(
              !res?.length || res.length % DEFAULT_LIST_ITEMS_COUNT != 0
            );
            if (withClear) {
              setOfferData(res)
            } else {
              const oldData: NftTypes[] = Object.assign(offerData);
              oldData.push(...res);
              setOfferData(res)
              window.scrollTo(0, lastSroll);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      } else if (tab === "9") {
        getOfferBySell({
          startId: withClear
            ? 0
            : Math.floor(offerData.length / DEFAULT_LIST_ITEMS_COUNT) + 1,
          offset: DEFAULT_LIST_ITEMS_COUNT,
          limit: DEFAULT_LIST_ITEMS_COUNT,
        })
          .then((res) => {
            setEndPageLoading(
              !res?.length || res.length % DEFAULT_LIST_ITEMS_COUNT != 0
            );
            if (withClear) {
              setOfferData(res)
            } else {
              const oldData: NftTypes[] = Object.assign(offerData);
              oldData.push(...res);
              setOfferData(res)
              window.scrollTo(0, lastSroll);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }

    },
    [offerData, top, endPageLoading]
  );

  // useEffect(() => {
  //   if (!setLoading) return;
  //   setLoading(true);
  //   const getNftData = async () => {
  //     if (tab === "8") {
  //       const data = await getOfferByBuy();
  //       setOfferData(data?.data);
  //     } else if (tab === "9") {
  //       const data = await getOfferBySell();
  //       setOfferData(data?.data);
  //     }
  //     setLoading(false);
  //   }
  //   getNftData();
  // }, [userData, tab, setLoading]);

  return (
    <table className="w-full">
      <thead>
        <tr className="text-[24px] text-white font-semibold justify-between">
          <th align="left" className="w-1/3 max-[970px]:w-1/2">
            Item
          </th>
          <th align="left">Price</th>
          <th align="left" className="max-md:hidden">
            Floor
          </th>
          <th align="left" className="max-[970px]:hidden">
            Quantity
          </th>
          <th align="left" className="max-lg:hidden">
            Expiration
          </th>
          <th align="left" className="max-xl:hidden">
            Received
          </th>
        </tr>
      </thead>
      <tbody>
        {offerData &&
          offerData.map((item, key) => <Offer key={key} offer={item} />)}
      </tbody>
    </table>
  );
};
