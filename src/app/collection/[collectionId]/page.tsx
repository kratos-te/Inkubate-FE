/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import CollectionOverview from "@/components/CollectionOverview";
import CoverBanner from "@/components/CoverBanner";
import PageHead from "@/components/PageHead";
import MainLayout from "@/layouts/MainLayout";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ActivityDetail from "@/components/ActivityDetail";
import {
  FilterIcon,
  ListIcon,
  ListSmIcon,
  SearchIcon,
} from "@/components/SvgIcons";
import Typography from "@/components/Typography";
import SortDropdown from "@/components/SortDropdown";
import CollectionFilter from "@/components/CollectionFilter";
import NftGrid from "@/components/NftGrid";
import { getNft, getNftByOne } from "@/actions/nft";
import {
  ActivityTypes,
  CollectionParam,
  ListingTypes,
  NftTypes,
  StatTypes,
} from "@/utils/types";
import { getCollectionById, getListByNft } from "@/actions";
import { getActivityByCollection } from "@/actions/activity";
import { BuyModal } from "@/components/BuyModal";
import { getStatByCollectionId } from "@/actions/stat";
import { DEFAULT_LIST_ITEMS_COUNT } from "@/config";
import useScroll from "@/utils/useScroll";

export default function CollectionPage() {
  const router = useRouter();
  const query = useSearchParams();
  const [sortBy, setSortBy] = useState("");
  const [search, setSearch] = useState("");
  const [sortAscending, setSortAscending] = useState<string>("asc");
  const [isDense, setIsDense] = useState(true);
  const [nftByCollection, setNftByCollection] = useState<NftTypes[]>([]);
  const [nftOne, setNftOne] = useState<NftTypes>();
  const [listByNft, setListByNft] = useState<ListingTypes>();
  const [collectionById, setCollectionById] = useState<CollectionParam>();
  const [stat, setStat] = useState<StatTypes>();
  const [actByCollection, setActByCollection] = useState<ActivityTypes[]>([]);
  const [activeBuy, setActiveBuy] = useState<NftTypes | undefined>(undefined);

  const [endPageLoading, setEndPageLoading] = useState(false);

  const { top, height } = useScroll();

  const tab = useMemo(() => {
    let t = "1";
    if (query && query?.get("tab")) {
      t = query?.get("tab") as string;
    }
    return t;
  }, [query]);

  const pathname = usePathname();

  const collectionId = useMemo(() => {
    let path = "";
    if (pathname) {
      path = pathname.split("/")[2] as string;
    }
    return path;
  }, [pathname]);

  const collectionName = "Opbunnies";

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  useEffect(() => {
    if (loading) return;
    handleFetchStatsData(true);
  }, [sortAscending]);

  // Fetch initial data when reloading
  useEffect(() => {
    handleFetchStatsData(true);
  }, []);

  useEffect(() => {
    if (loading || !nftByCollection) return;
    if (nftByCollection && top > 400 * nftByCollection.length - height) {
      handleFetchStatsData(false);
    }
  }, [top]);

  const handleFetchStatsData = useCallback(
    (withClear: boolean) => {
      if (withClear) setEndPageLoading(false);
      if (!withClear && endPageLoading) return;
      const lastSroll = top;
      setLoading(true);
      getNft({
        collectionId,
        sortAscending,
        search: search || undefined,
        sortBy,
        startId: withClear
          ? 1
          : Math.floor(nftByCollection.length / DEFAULT_LIST_ITEMS_COUNT) + 1,
        offset: DEFAULT_LIST_ITEMS_COUNT,
        limit: DEFAULT_LIST_ITEMS_COUNT,
      })
        .then((res) => {
          setEndPageLoading(
            !res?.length || res.length % DEFAULT_LIST_ITEMS_COUNT != 0
          );
          if (withClear) {
            const getData = async () => {
              const collection = await getCollectionById(collectionId);
              const activity = await getActivityByCollection(collectionId);
              const getStat = await getStatByCollectionId(collectionId);
              const nft = await getNftByOne("0", collection?.data?.address);
              setNftByCollection(res);
              setCollectionById(collection?.data);
              setActByCollection(activity?.data);
              setNftOne(nft);
              setStat(getStat?.data);
            };
            getData();
          } else {
            const oldData: NftTypes[] = Object.assign(nftByCollection);
            oldData.push(...res);
            const getData = async () => {
              const collection = await getCollectionById(collectionId);
              const activity = await getActivityByCollection(collectionId);
              const getStat = await getStatByCollectionId(collectionId);
              const nft = await getNftByOne("0", collection?.data?.address);
              setNftByCollection(oldData);
              setCollectionById(collection?.data);
              setActByCollection(activity?.data);
              setNftOne(nft);
              setStat(getStat?.data);
            };
            getData();
            window.scrollTo(0, lastSroll);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [nftByCollection, sortBy, sortAscending, top, endPageLoading]
  );

  // useEffect(() => {
  //   const getNftByCollection = async () => {
  //     const nfts = await getNft({ collectionId, sortAscending, sortBy });
  //     const collection = await getCollectionById(collectionId);
  //     const activity = await getActivityByCollection(collectionId);
  //     const getStat = await getStatByCollectionId(collectionId);
  //     const nft = await getNftByOne("0", collection?.data?.address);
  //     setNftByCollection(nfts);
  //     setCollectionById(collection?.data);
  //     setActByCollection(activity?.data);
  //     setNftOne(nft?.data);
  //     setStat(getStat?.data);
  //   };
  //   getNftByCollection();
  // }, [sortAscending, collectionId, sortBy]);

  // useEffect(() => {
  //   const getNfts = async () => {
  //     const nfts = await getNft({ collectionId, sortAscending, sortBy });
  //     setNftByCollection(nfts?.data);
  //   };
  //   getNfts();
  // }, [sortAscending, collectionId, sortBy]);

  useEffect(() => {
    const getLisiting = async () => {
      if (activeBuy) {
        const listing = await getListByNft(activeBuy?.id);
        setListByNft(listing?.data);
      }
    };
    getLisiting();
  }, [activeBuy]);

  return (
    <>
      <MainLayout
        className="!bg-dark-300 min-h-screen"
        bgSrc="/assets/images/bg-explorer.png"
        bgClass="absolute -translate-x-1/2 left-1/2 top-0 pointer-events-none w-[3131px] h-[3158px] object-cover opacity-80 lg:opacity-100"
        pageLoading={loading}
        meta={
          <PageHead
            title={collectionName}
            description="Lorem ipsum dolor sit amet."
          />
        }
      >
        <CoverBanner
          src={collectionById?.banner?.url || "/assets/images/cover-demo.png"}
        />
        {collectionById && stat && (
          <CollectionOverview stat={stat} nfts={nftByCollection || []} />
        )}
        <div className="max-w-[1600px] mx-5 2xl:mx-auto relative">
          <div className="border-b-[0.5px] py-9  border-light-400 relative z-10">
            <div className="flex gap-3">
              <button
                onClick={() => router.push(`${collectionId}?tab=1`)}
                className={`text-[15px] font-semibold py-[10px] px-[14px] bg-dark-400 rounded-[12px] text-white ${
                  tab === "1"
                    ? " border-secondary bg-secondary"
                    : "border-transparent"
                }`}
              >
                Items
              </button>
              <button
                onClick={() => router.push(`${collectionId}?tab=2`)}
                className={`text-[15px] font-semibold py-[10px] px-[14px] bg-dark-400 rounded-[12px] text-white ${
                  tab === "2"
                    ? " border-secondary bg-secondary"
                    : "border-transparent"
                }`}
              >
                Activity
              </button>
            </div>
          </div>
          <div
            className={`flex gap-3 mt-6 lg:mt-12  relative z-20 ${
              tab === "1" || tab === "2" ? "show" : "hidden"
            }`}
          >
            <button className="flex py-3 px-2.5 w-11 lg:w-auto justify-center rounded-lg bg-dark-400 items-center h-11">
              <FilterIcon />
              <Typography className="ml-2.5 text-[14px] leading-[20px] hidden lg:block">
                Filters
              </Typography>
            </button>
            <div className="items-center w-[calc(100%-150px)] lg:w-[calc(100%-400px)] relative">
              <SearchIcon className="absolute left-3 top-4" />
              <input
                className="font-readex text-[14px] text-light-100 bg-dark-400 rounded-lg w-full h-11 pl-9"
                placeholder="Search items"
                value={search}
                onChange={(e) => setSearch(e.target.value || "")}
              />
            </div>
            <div className="hidden lg:block">
              <SortDropdown
                value={sortBy}
                setValue={setSortBy}
                setSortAscending={setSortAscending}
              />
            </div>
            <div className="flex rounded-lg bg-dark-400 items-center h-11 overflow-hidden">
              <button
                className="grid w-11 h-11 place-content-center hover:bg-dark-500 duration-300"
                onClick={() => setIsDense(false)}
              >
                <ListIcon color={`${!isDense ? "#EA4492" : "#F2F3F4"}`} />
              </button>
              <button
                className="grid w-11 h-11 place-content-center hover:bg-dark-500 duration-300"
                onClick={() => setIsDense(true)}
              >
                <ListSmIcon color={`${isDense ? "#EA4492" : "#F2F3F4"}`} />
              </button>
            </div>
          </div>
          <div
            className={`mt-[28px] lg:mt-[38px] flex relative z-10 ${
              tab === "1" || tab === "2" ? "show" : "hidden"
            }`}
          >
            <div className="hidden lg:block w-[300px]">
              {nftOne && <CollectionFilter nft={nftOne} />}
            </div>
            <div className="w-full lg:w-[calc(100%-350px)] lg:ml-[50px]">
              {tab === "1" && (
                <NftGrid
                  nftData={nftByCollection}
                  collectionId={collectionId}
                  isDense={isDense}
                  setActiveItem={(item) =>
                    setActiveBuy(item as unknown as NftTypes)
                  }
                />
              )}
              {tab === "2" && <ActivityDetail actData={actByCollection} />}
            </div>
          </div>
        </div>
      </MainLayout>
      {activeBuy && <BuyModal nft={activeBuy} listing={listByNft} />}
    </>
  );
}
