"use client";
import { useEffect, useMemo, useState } from "react";
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
import { Listings } from "@/components/Listings";
import { Offer } from "@/components/Offer";
import { DEMO_NFTS } from "@/config";
import { AcceptModal } from "@/components/AcceptModal";

export default function CollectionPage() {
  const router = useRouter();
  const query = useSearchParams();
  const [sort, setSort] = useState("p-l-h");
  const [isDense, setIsDense] = useState(true);
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
  return (
    <>
      <MainLayout
        className="!bg-dark-300 min-h-screen"
        meta={
          <PageHead
            title={collectionName}
            description="Lorem ipsum dolor sit amet."
          />
        }
      >
        <CoverBanner src="/assets/images/cover-demo.png" />
        <CollectionOverview />
        <div className="max-w-[1600px] mx-5 2xl:mx-auto relative">
          <div className="border-b-[0.5px] py-9  border-light-400 relative z-10">
            <div className="flex gap-3">
              <button
                onClick={() => router.push(`${collectionId}?tab=1`)}
                className={`text-[15px] font-semibold py-[10px] px-[14px] bg-dark-400 rounded-[12px] text-white ${tab === "1"
                  ? " border-secondary bg-secondary"
                  : "border-transparent"
                  }`}
              >
                Items
              </button>
              <button
                onClick={() => router.push(`${collectionId}?tab=2`)}
                className={`text-[15px] font-semibold py-[10px] px-[14px] bg-dark-400 rounded-[12px] text-white ${tab === "2"
                  ? " border-secondary bg-secondary"
                  : "border-transparent"
                  }`}
              >
                Activity
              </button>
              <button
                onClick={() => router.push(`${collectionId}?tab=3`)}
                className={`text-[15px] font-semibold py-[10px] px-[14px] bg-dark-400 rounded-[12px] text-white ${tab === "3"
                  ? " border-secondary bg-secondary"
                  : "border-transparent"
                  }`}
              >
                Listings
              </button>
              <button
                onClick={() => router.push(`${collectionId}?tab=4`)}
                className={`text-[15px] font-semibold py-[10px] px-[14px] bg-dark-400 rounded-[12px] text-white ${tab === "4"
                  ? " border-secondary bg-secondary"
                  : "border-transparent"
                  }`}
              >
                Offer
              </button>
            </div>
          </div>
          <div className={`flex gap-3 mt-6 lg:mt-12  relative z-20 ${(tab === "1" || tab === "2") ? "show" : "hidden"}`}>
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
              />
            </div>
            <div className="hidden lg:block">
              <SortDropdown value={sort} setValue={setSort} />
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
          <div className={`mt-[28px] lg:mt-[38px] flex relative z-10 ${(tab === "1" || tab === "2") ? "show" : "hidden"}`}>
            <div className="hidden lg:block w-[300px]">
              <CollectionFilter />
            </div>
            <div className="w-full lg:w-[calc(100%-350px)] lg:ml-[50px]">
              {tab === "1" && (
                <NftGrid collectionId="opbunnies" isDense={isDense} />
              )}
              {tab === "2" && <ActivityDetail />}
            </div>
          </div>
          {tab === "3" && (
            <div className="flex gap-3 mt-9 lg:mt-12  relative z-20">
              <Listings />
            </div>
          )}
          {tab === "4" && (
            <div className="flex gap-3 mt-9 lg:mt-12  relative z-20">
              <Offer />
            </div>
          )}
        </div>
        {!loading && (
          <img
            src="/assets/images/bg-explorer.png"
            className="absolute -translate-x-1/2 left-1/2 top-0 pointer-events-none w-[3131px] h-[3158px] object-cover opacity-80 lg:opacity-100"
            alt=""
          />
        )}
      </MainLayout>
      {DEMO_NFTS[0] && <AcceptModal nft={DEMO_NFTS[0]} />}
    </>
  );
}
