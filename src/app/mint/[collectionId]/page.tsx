"use client";
import { DEMO_COLLECTIONS } from "@/config";
import AssetDetailBox from "@/components/AssetDetailBox";
import { PublicIcon, StarIcon } from "@/components/SvgIcons";
import Typography from "@/components/Typography";
import MintDetail from "@/components/MintDetail";
import { Meta } from "@/layouts/Meta";
import MainLayout from "@/layouts/MainLayout";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MintOverviewLoader from "@/components/Common/MintOverviewLoader";
import Skeleton from "react-loading-skeleton";

export default function CollectionPage() {
  const contract = "0x2f05e799C61b600c65238a9DF060cABA63Db8E78";
  const query = useSearchParams();
  const collectionId = query?.get("collectionId");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);
  return (
    <>
      <MainLayout
        className="!bg-dark-200"
        meta={
          <Meta
            title={`${collectionId ? collectionId : ""} ${contract}`}
            description="Lorem ipsum dolor sit amet."
          />
        }
      >
        <div className="max-w-[1200px] mx-5 xl:mx-auto pt-[130px] xl:pt-[152px] relative z-10">
          {!loading ? (
            DEMO_COLLECTIONS[0] && (
              <MintDetail collection={DEMO_COLLECTIONS[0]} />
            )
          ) : (
            <MintOverviewLoader />
          )}
          {!loading ? (
            <div className="flex flex-col mt-6 sm:mt-5 md:flex-row">
              <div className="w-full md:w-[calc(50%-20px)] xl:w-[504px] flex flex-col gap-5 mr-0 md:mr-5 lg:mr-8 xl:mr-10">
                <AssetDetailBox
                  icon={<StarIcon color="#fff" />}
                  title={
                    <div className="flex gap-2.5 items-center">
                      <span>Allowlist Mint</span>
                      <div className="rounded-lg bg-secondary px-2.5 py-[6px] text-[12px] leading-[18px] font-sans">
                        Inactive
                      </div>
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
                        Free
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
                        10000
                      </Typography>
                    </div>
                  </div>
                </AssetDetailBox>
                <AssetDetailBox
                  icon={<PublicIcon />}
                  title={
                    <div className="flex gap-2.5 items-center">
                      <span>Public Mint</span>
                      <div className="rounded-lg bg-secondary px-2.5 py-[6px] text-[12px] leading-[18px] font-sans">
                        Inactive
                      </div>
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
                        Free
                      </Typography>
                    </div>
                    <div className="flex justify-between items-center">
                      <Typography className="!text-third font-semibold text-[14px]">
                        Max tokens per address
                      </Typography>
                      <Typography className="!text-secondary font-semibold text-[14px]">
                        10000
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
        {!loading && (
          <img
            src="/assets/images/bg-explorer.png"
            className="absolute -translate-x-1/2 left-1/2 top-0 pointer-events-none w-[3131px] h-[3158px] object-cover opacity-80 lg:opacity-100"
            alt=""
          />
        )}
      </MainLayout>
    </>
  );
}
