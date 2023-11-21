"use client";
import { useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { usePathname } from "next/navigation";

import AssetDetailBox from "@/components/AssetDetailBox";
import { PublicIcon, StarIcon } from "@/components/SvgIcons";
import Typography from "@/components/Typography";
import MintDetail from "@/components/MintDetail";
import MintOverviewLoader from "@/components/Common/MintOverviewLoader";
import { MintModal } from "@/components/MintModal";

import { Meta } from "@/layouts/Meta";
import MainLayout from "@/layouts/MainLayout";
import { getLaunchpadById } from "@/actions";
import { LaunchpadParam } from "@/utils/types";
import { weiToNum } from "@/utils/util";
import { LaunchpadEditModal } from "@/components/LaunchpadEditModal";

export default function MintPage() {
  const pathname = usePathname();

  const [launchpadById, setLaunchPadById] = useState<LaunchpadParam>();
  const [remainTime, setRemainTime] = useState<number>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  const launchpadId = useMemo(() => {
    let path = "";
    if (pathname) {
      path = pathname.split("/")[2] as string;
    }
    return path;
  }, [pathname]);

  useEffect(() => {
    console.log("path", pathname.split("/")[1] as string, launchpadId);

    const getCollection = async () => {
      if ((pathname.split("/")[1] as string) === "mint" && launchpadId) {
        const launchpad = await getLaunchpadById(launchpadId);
        setLaunchPadById(launchpad);
        const getTime = () => {
          const remainingTime = Math.floor(
            (new Date(launchpad.startDate).getTime() - Date.now()) / 1000
          );
          setRemainTime(remainingTime);
          setTimeout(getTime, 1000)
        }
        getTime();
      }
    };
    getCollection();
  }, [launchpadId, pathname]);

  return (
    <>
      <MainLayout
        className="!bg-dark-200"
        pageLoading={loading}
        bgSrc="/assets/images/bg-explorer.png"
        bgClass="absolute -translate-x-1/2 left-1/2 top-0 pointer-events-none w-[3131px] h-[3158px] object-cover opacity-80 lg:opacity-100"
        meta={
          <Meta
            title={`${launchpadId ? launchpadId : ""}`}
            description="Lorem ipsum dolor sit amet."
          />
        }
      >
        <div className="max-w-[1200px] mx-5 xl:mx-auto pt-[130px] xl:pt-[152px] relative z-10">
          {!loading ? (
            launchpadById &&
            remainTime && (
              <MintDetail
                launchpad={launchpadById}
                setLaunchPadById={setLaunchPadById}
                remainingTime={remainTime}
              />
            )
          ) : (
            <MintOverviewLoader />
          )}
          {!loading && launchpadById ? (
            <div className="flex flex-col mt-6 sm:mt-5 md:flex-row">
              <div className="w-full md:w-[calc(50%-20px)] xl:w-[504px] flex flex-col gap-5 mr-0 md:mr-5 lg:mr-8 xl:mr-10">
                <AssetDetailBox
                  icon={<StarIcon color="#fff" />}
                  title={
                    <div className="flex gap-2.5 items-center">
                      <span>Allowlist Mint</span>
                      {remainTime && remainTime > 0 ? (
                        <div className="rounded-lg bg-[#666666] px-2.5 py-[6px] text-[12px] leading-[18px] font-sans">
                          Inactive
                        </div>
                      ) : (
                        <div className="rounded-lg bg-secondary px-2.5 py-[6px] text-[12px] leading-[18px] font-sans">
                          active
                        </div>
                      )}
                    </div>
                  }
                  defaultCollapsed={true}
                >
                  <div className="flex flex-col gap-[14px]">
                    <div className="flex justify-between items-center">
                      <Typography className="!text-third font-semibold text-[14px]">
                        Price
                      </Typography>
                      <Typography className="!text-secondary font-semibold text-[14px]">
                        {weiToNum(launchpadById?.mintPrice)}
                      </Typography>
                    </div>
                    <div className="flex justify-between items-center">
                      <Typography className="!text-third font-semibold text-[14px]">
                        Eligible addresses
                      </Typography>
                      <Typography className="!text-secondary font-semibold text-[14px]">
                        1680
                      </Typography>
                    </div>
                    <div className="flex justify-between items-center">
                      <Typography className="!text-third font-semibold text-[14px]">
                        Max tokens per address
                      </Typography>
                      <Typography className="!text-secondary font-semibold text-[14px]">
                        {launchpadById.maxPerWallet}
                      </Typography>
                    </div>
                  </div>
                </AssetDetailBox>
                <AssetDetailBox
                  icon={<PublicIcon />}
                  title={
                    <div className="flex gap-2.5 items-center">
                      <span>Public Mint</span>
                      {remainTime && remainTime > 0 ? (
                        <div className="rounded-lg bg-[#666666] px-2.5 py-[6px] text-[12px] leading-[18px] font-sans">
                          Inactive
                        </div>
                      ) : (
                        <div className="rounded-lg bg-secondary px-2.5 py-[6px] text-[12px] leading-[18px] font-sans">
                          active
                        </div>
                      )}
                    </div>
                  }
                  defaultCollapsed={true}
                >
                  <div className="flex flex-col gap-[14px]">
                    <div className="flex justify-between items-center">
                      <Typography className="!text-third font-semibold text-[14px]">
                        Price
                      </Typography>
                      <Typography className="!text-secondary font-semibold text-[14px]">
                        {weiToNum(launchpadById?.mintPrice)}
                      </Typography>
                    </div>
                    <div className="flex justify-between items-center">
                      <Typography className="!text-third font-semibold text-[14px]">
                        Max tokens per address
                      </Typography>
                      <Typography className="!text-secondary font-semibold text-[14px]">
                        {launchpadById.maxPerWallet}
                      </Typography>
                    </div>
                  </div>
                </AssetDetailBox>
              </div>
              <div className="w-full md:w-1/2 xl:w-[calc(100%-544px)] flex flex-col gap-5 mt-5 md:mt-0"></div>
            </div>
          ) : (
            <div className="flex flex-col mt-6 sm:mt-5 md:flex-row">
              <div className="w-full md:w-1/2 flex flex-col gap-5 mt-5 md:mt-0">
                <Skeleton
                  height={70}
                  width={"100%"}
                  baseColor="#333"
                  highlightColor="#444"
                />
                <Skeleton
                  height={70}
                  width={"100%"}
                  baseColor="#333"
                  highlightColor="#444"
                />
              </div>
            </div>
          )}
        </div>
      </MainLayout>
      {launchpadById && <MintModal launchpad={launchpadById} setLaunchPadById={setLaunchPadById} />}
      {launchpadById && <LaunchpadEditModal launchpad={launchpadById} />}
    </>
  );
}
