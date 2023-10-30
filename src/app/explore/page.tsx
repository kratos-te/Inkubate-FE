"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import CollectionCard from "@/components/CollectionCard";
import CollecionCardLoader from "@/components/Common/CollecionCardLoader";
import ExploreCover from "@/components/ExploreCover";
import ExploreItems from "@/components/ExploreItems";
import MainLayout from "@/layouts/MainLayout";
import { Meta } from "@/layouts/Meta";
import { getAllCollections } from "@/actions/collection";
import { StatTypes } from "@/utils/types";
import { getStatByCollectionId } from "@/actions";

export default function ExplorePage() {
  const router = useRouter();
  const query = useSearchParams();
  const tab = query?.get("tab");
  const [stats, setStats] = useState<StatTypes[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      const statData: StatTypes[] = [];
      const collections = await getAllCollections();
      const stat = await getStatByCollectionId(collections.data.id)
      statData.push(stat?.data)
      setStats(statData)
    }
    getData();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  return (
    <>
      <MainLayout
        className="!bg-dark-300"
        bgSrc="/assets/images/bg-explorer.png"
        bgClass="absolute -translate-x-1/2 left-1/2 top-0 pointer-events-none w-[3131px] h-[3158px] object-cover opacity-80 lg:opacity-100"
        pageLoading={loading}
        meta={
          <Meta
            title="Explore NFTs"
            description="Lorem ipsum dolor sit amet."
          />
        }
      >
        <div className="max-w-[1600px] mx-5 2xl:mx-auto relative pt-[94px] lg:pt-[160px] xl:pt-[250px] z-10">
          {!loading ? (
            <ExploreCover />
          ) : (
            <div className="mb-[64px] xl:mb-[145px]">
              <Skeleton
                width={"100%"}
                className="!h-[307px] lg:!h-[392px] xl:!h-[454px]"
                baseColor="#333"
                highlightColor="#444"
              />
            </div>
          )}
          <div className="border-b-[0.5px] border-light-400 relative z-10">
            <button
              onClick={() => router.push(`/explore?tab=1`)}
              className={`text-[15px] font-semibold py-2 border-b-2 ${
                tab !== "2" && tab !== "3"
                  ? "text-secondary border-secondary"
                  : "text-light-200 border-transparent"
              }`}
            >
              Collections
            </button>
            <button
              onClick={() => router.push(`/explore?tab=2`)}
              className={`text-[15px] font-semibold py-2 border-b-2 ml-[30px] ${
                tab === "2"
                  ? "text-secondary border-secondary"
                  : "text-light-200 border-transparent"
              }`}
            >
              Items
            </button>
          </div>
          {tab !== "2" && (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4 gap-x-[30px] gap-y-3 xl:gap-y-10 mt-[34px]">
              {!loading ? (
                <>
                  {stats.map((item, key) => (
                    <CollectionCard item={item} collection={item.collection} key={key} />
                  ))}
                </>
              ) : (
                Array.from({ length: 8 }).map((_, key) => (
                  <CollecionCardLoader key={key} />
                ))
              )}
            </div>
          )}
          {tab === "2" && <ExploreItems />}
        </div>
      </MainLayout>
    </>
  );
}
