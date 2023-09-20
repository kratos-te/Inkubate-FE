"use client";
import { useEffect, useState } from "react";
import LaunchpadCollectionList from "@/components/LaunchpadCollectionList";
import LaunchpadCover from "@/components/LaunchpadCover";
import LaunchpadDrops from "@/components/LaunchpadDrops";
import { DEMO_COLLECTIONS } from "@/config";
import MainLayout from "@/layouts/MainLayout";
import { Meta } from "@/layouts/Meta";
import Skeleton from "react-loading-skeleton";
import LaunchpadContentLoader from "@/components/Common/LaunchpadContentLoader";

export default function LaunchpadPage() {
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
          <Meta title="Launchpad" description="Lorem ipsum dolor sit amet." />
        }
      >
        <div className="max-w-[1630px] mx-auto">
          <div className="h-[136px] lg-[160px] xl:h-[200px] 2xl:h-[247px]" />
          {!loading ? (
            <LaunchpadCover />
          ) : (
            <div className="!mx-6">
              <Skeleton
                className="!h-[330px] lg:!h-[400px] xl:!h-[540px] 2xl:!h-[724px]"
                baseColor="#333"
                highlightColor="#444"
              />
            </div>
          )}
          {!loading ? (
            <>
              <div className="h-[60px] 2xl:h-[120px]" />
              <LaunchpadCollectionList
                title="Launchpads"
                description="Qorem ipsum dolor sit amet, consectetur adipiscing elit."
                collections={DEMO_COLLECTIONS}
              />
              <div className="h-[40px] 2xl:h-[72px]" />
              <LaunchpadCollectionList
                title="Resources"
                description="Qorem ipsum dolor sit amet, consectetur adipiscing elit."
                collections={DEMO_COLLECTIONS}
              />
              <div className="h-[40px] 2xl:h-[72px]" />
              <LaunchpadDrops
                title="Drops"
                description="Qorem ipsum dolor sit amet, consectetur adipiscing elit."
                collections={DEMO_COLLECTIONS}
              />
            </>
          ) : (
            <LaunchpadContentLoader />
          )}
        </div>
        {!loading && (
          <img
            src="/assets/images/bg-stats.png"
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[2470px] h-[2096px] pointer-events-none object-cover opacity-60 lg:opacity-100"
            alt=""
          />
        )}
      </MainLayout>
    </>
  );
}
