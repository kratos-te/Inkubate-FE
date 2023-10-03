"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LaunchpadCollectionList from "@/components/LaunchpadCollectionList";
import LaunchpadCover from "@/components/LaunchpadCover";
import MainLayout from "@/layouts/MainLayout";
import { Meta } from "@/layouts/Meta";
import Skeleton from "react-loading-skeleton";
import LaunchpadContentLoader from "@/components/Common/LaunchpadContentLoader";
import { getAllCollections, getLaunchpad } from "@/actions";
import { CollectionParam, LaunchpadParam } from "@/utils/types";

export default function LaunchpadPage() {
  const [loading, setLoading] = useState(true);
  const [launchpads, setLaunchPads] = useState<LaunchpadParam[]>([]);
  const [collections, setCollections] = useState<CollectionParam[]>([]);

  const pathname = usePathname();

  useEffect(() => {
    const launchPad = async () => {
      if (pathname === "/launchpad") {
        const launchpadData = await getLaunchpad();
        const collectionData = await getAllCollections();
        if (launchpadData) {
          setLaunchPads(launchpadData.data);
          setCollections(collectionData);
        }
      }
    };
    launchPad();
  }, [pathname]);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  return (
    <>
      <MainLayout
        className="!bg-dark-300"
        bgSrc="/assets/images/bg-stats.png"
        bgClass="absolute left-1/2 -translate-x-1/2 top-0 w-[2470px] h-[2096px] pointer-events-none object-cover opacity-60 lg:opacity-100"
        pageLoading={loading}
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
                launchpads={launchpads}
                collections={collections}
              />
              <div className="h-[40px] 2xl:h-[72px]" />
              {/* <LaunchpadCollectionList
                title="Resources"
                description="Qorem ipsum dolor sit amet, consectetur adipiscing elit."
                collections={DEMO_COLLECTIONS}
              />
              <div className="h-[40px] 2xl:h-[72px]" />
              <LaunchpadDrops
                title="Drops"
                description="Qorem ipsum dolor sit amet, consectetur adipiscing elit."
                collections={DEMO_COLLECTIONS}
              /> */}
            </>
          ) : (
            <LaunchpadContentLoader />
          )}
        </div>
      </MainLayout>
    </>
  );
}
