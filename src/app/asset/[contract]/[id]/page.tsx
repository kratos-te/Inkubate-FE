"use client";
import Link from "next/link";
import AssetOverview from "@/components/AssetOverview";
import AssetDetailBox from "@/components/AssetDetailBox";
import {
  ActivityIcon,
  DescriptionIcon,
  DetailIcon,
  DiscordIcon,
  EthscanIcon,
  HistoryIcon,
  ListIcon,
  OfferSmIcon,
  PropertiesIcon,
  TwitterIcon,
  WebsiteIcon,
} from "@/components/SvgIcons";
import Typography from "@/components/Typography";
import AssetActivityTable from "@/components/AssetActivityTable";
import AssetActivityTableMobile from "@/components/AssetActivityTableMobile";
import Button from "@/components/Button";
import MainLayout from "@/layouts/MainLayout";
import { Meta } from "@/layouts/Meta";
import { useEffect, useMemo, useState } from "react";
import AssetOverviewLoader from "@/components/AssetOverview/Loader";
import AssetContentLoader from "@/components/Common/AssetContentLoader";
import { OfferModal } from "@/components/OfferModal";
import { BuyModal } from "@/components/BuyModal";
import { usePathname } from "next/navigation";
import { getNftByOne, getNft } from "@/actions/nft";
import { ListingTypes, NftTypes } from "@/utils/types";
import { ListModal } from "@/components/ListModal";
import NftCard from "@/components/NftCard";
import { getListByNft } from "@/actions";

export default function CollectionPage() {
  // const name = "Galxe#1344";
  // const contract = "0x2f05e799C61b600c65238a9DF060cABA63Db8E78";
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [nftByOne, setNftByOne] = useState<NftTypes>();
  const [nftByCollection, setNftByCollection] = useState<NftTypes[]>([])
  const [listByNft, setListByNft] = useState<ListingTypes>()

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  const contract = useMemo(() => {
    let path = "";
    if (pathname) {
      path = pathname.split("/")[2] as string;
    }
    return path;
  }, [pathname]);

  const nftId = useMemo(() => {
    let path = "";
    if (pathname) {
      path = pathname.split("/")[3] as string;
    }
    return path;
  }, [pathname]);

  useEffect(() => {
    const getNftData = async () => {
      const nft = await getNftByOne(nftId, contract);
      const nfts = await getNft(nft?.data.collectionId)
      const listing = await getListByNft(nft?.data.id)
      setNftByOne(nft?.data);
      setNftByCollection(nfts?.data)
      setListByNft(listing?.data)
    };
    getNftData();
  }, [nftId, contract]);

  return (
    <>
      <MainLayout
        className="!bg-dark-200"
        bgClass="absolute -translate-x-1/2 left-1/2 top-0 pointer-events-none w-[2282px] h-[2320px] object-cover opacity-60 lg:opacity-100"
        bgSrc="/assets/images/bg-asset.png"
        pageLoading={loading}
        meta={
          <Meta
            title={`${name} ${contract}`}
            description="Lorem ipsum dolor sit amet."
          />
        }
      >
        <div className="max-w-[1200px] mx-5 xl:mx-auto pt-[130px] xl:pt-[152px] relative z-10">
          {!loading ? (
            nftByOne && <AssetOverview nft={nftByOne} listing={listByNft} />
          ) : (
            <AssetOverviewLoader />
          )}
          {!loading ? (
            <>
              <div className="flex flex-col mt-5 md:flex-row">
                <div className="w-full md:w-[calc(50%-20px)] xl:w-[504px] flex flex-col gap-5 mr-0 md:mr-5 lg:mr-8 xl:mr-10">
                  <AssetDetailBox
                    icon={<DescriptionIcon />}
                    title="Description"
                    defaultCollapsed={true}
                  >
                    <Typography className="text-[14px] !text-light-200 font-[400] font-readex leading-[17.5px]">
                      Torem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nunc vulputate libero et velit interdum, ac aliquet odio
                      mattis. Torem ipsum dolor sit amet, consectetur adipiscing
                      elit. Nunc vulputate libero et velit interdum, ac aliquet
                      odio mattis.
                    </Typography>
                    <div className="flex gap-[15px] mt-5">
                      <Link href={"#"} className="w-5 h-5">
                        <WebsiteIcon className="w-4 h-4" />
                      </Link>
                      <Link href={"#"} className="w-5 h-5">
                        <TwitterIcon className="w-4 h-4" />
                      </Link>
                      <Link href={"#"} className="w-5 h-5">
                        <DiscordIcon className="w-4 h-4" />
                      </Link>
                      <Link href={"#"} className="w-5 h-5">
                        <EthscanIcon className="w-4 h-4" />
                      </Link>
                    </div>
                  </AssetDetailBox>
                  <AssetDetailBox
                    icon={<PropertiesIcon />}
                    title="Properties"
                    defaultCollapsed={true}
                  >
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-2.5">
                      {nftByOne?.attributes.map((item, key) => (
                        <div
                          key={key}
                          className="rounded-md p-[15px] border-[0.5px] border-light-200"
                        >
                          <div className="font-readex text-[12px] font-medium text-secondary">
                            {item.trait_type}
                          </div>
                          <Typography className="text-[14px] leading-[17.5px] font-bold font-readex mt-[5px]">
                            {item.value}
                          </Typography>
                          {/* <span className="text-dark-700 font-readex leading-[16.25px] text-[13px]">
                            {item.description}
                          </span> */}
                        </div>
                      ))}
                    </div>
                  </AssetDetailBox>
                  <AssetDetailBox
                    icon={<DetailIcon />}
                    title="Details"
                  ></AssetDetailBox>
                </div>
                <div className="w-full md:w-1/2 xl:w-[calc(100%-544px)] flex flex-col gap-5 mt-5 md:mt-0">
                  <AssetDetailBox
                    icon={<HistoryIcon />}
                    title="Price History"
                  ></AssetDetailBox>
                  <AssetDetailBox
                    icon={<OfferSmIcon />}
                    title="Offers"
                    defaultCollapsed={true}
                  >
                    <div className="h-20 grid place-content-center text-light-100 text-[15px] font-readex !font-400">
                      No offers yet
                    </div>
                  </AssetDetailBox>
                </div>
              </div>
              <div className="mt-5">
                <AssetDetailBox
                  icon={<ActivityIcon />}
                  title="Activity"
                  defaultCollapsed={true}
                >
                  <div className="hidden md:block">
                    <AssetActivityTable
                      collectionId={""}
                      contract=""
                      nftId={0}
                    />
                  </div>
                  <div className="block md:hidden">
                    <AssetActivityTableMobile
                      collectionId={""}
                      contract=""
                      nftId={0}
                    />
                  </div>
                </AssetDetailBox>
              </div>
              <div className="max-w-[1080px] mx-auto mt-[30px]">
                <div className="p-5 flex gap-2.5 items-center">
                  <ListIcon />{" "}
                  <Typography className="text-[16px] font-semibold font-readex">
                    More from {nftByOne?.collectionId}
                  </Typography>
                </div>
                <div className="flex justify-center gap-[25px] min-h-[390px] flex-wrap">
                  {/* {DEMO_NFTS[0] && (
                    <>
                      <NftCard nft={DEMO_NFTS[0]} width={240} />
                      <NftCard nft={DEMO_NFTS[0]} width={240} />
                      <NftCard nft={DEMO_NFTS[0]} width={240} />
                      <NftCard nft={DEMO_NFTS[0]} width={240} />
                    </>
                  )} */}
                  {nftByCollection.map((item, index) => (
                    <NftCard key={index} nft={item} width={240} />
                  ))}
                </div>
                <div className="text-center mt-[30px] lg:mt-5">
                  <Link href={`/collection/${nftByOne?.collectionId}`}>
                    <Button className="!font-readex !rounded-full">
                      View Collection
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <AssetContentLoader />
          )}
        </div>
      </MainLayout>
      {nftByOne && <OfferModal nft={nftByOne} />}
      {nftByOne && <BuyModal nft={nftByOne} />}
      {nftByOne && <ListModal nft={nftByOne} />}
    </>
  );
}
