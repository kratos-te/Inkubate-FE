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
import {
  ActivityTypes,
  AdvancedOrder,
  CriteriaResolver,
  Fulfillment,
  ListingTypes,
  NftTypes,
  OfferItem,
  OfferTypes,
  OrderComponents,
} from "@/utils/types";
import { ListModal } from "@/components/ListModal";
import NftCard from "@/components/NftCard";
import { acceptListingOffer, getActivityByNft, getListByNft, getOffersByNftId } from "@/actions";
import { shortenAddress, weiToNum } from "@/utils/util";
import { useInkubate } from "@/hooks/useInkubate";
import { useAccount } from "wagmi";
import { INK_CONDUIT_KEY } from "@/utils/constants";
import { SALT } from "@/config";
import { ZeroAddress, ZeroHash } from "ethers";
import { useUser } from "@/contexts/UserContext";

export default function NftPage() {
  const pathname = usePathname();
  const { address: walletAddress } = useAccount();
  const { userData } = useUser();
  const { acceptOffer } = useInkubate();
  const [loading, setLoading] = useState(true);
  const [nftByOne, setNftByOne] = useState<NftTypes>();
  const [nftByCollection, setNftByCollection] = useState<NftTypes[]>([]);
  const [activity, setActivity] = useState<ActivityTypes[]>([]);
  const [listByNft, setListByNft] = useState<ListingTypes>();
  const [offers, setOffers] = useState<OfferTypes[]>([]);
  const [offer, setOffer] = useState<OfferTypes>();
  const [isListed, setIsListed] = useState(false);
  const [isNoticed, setIsNoticed] = useState(false);
  const [isOffer, setIsOffer] = useState(false);
  const [_activeListing, setActiveListing] = useState<NftTypes | undefined>(
    undefined
  );
  const [_activeBuy, setActiveBuy] = useState<NftTypes | undefined>(undefined);

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

  const tokenId = useMemo(() => {
    let path = "";
    if (pathname) {
      path = pathname.split("/")[3] as string;
    }
    return path;
  }, [pathname]);

  const handleAccept = async (offer: OfferTypes) => {
    if (!walletAddress || !listByNft) return;
    const parameters: OrderComponents = JSON.parse(offer.parameters);
    const orders: AdvancedOrder[] = [
      {
        parameters,
        numerator: "1",
        denominator: "1",
        signature: offer.signature,
        extraData: "0x",
      },
      {
        parameters: {
          offerer: walletAddress,
          offer: parameters.consideration as OfferItem[],
          consideration: parameters.offer.map((item) => ({
            ...item,
            recipient: walletAddress,
          })),
          orderType: 0,
          startTime: parameters.startTime,
          endTime: parameters.endTime,
          zone: ZeroAddress,
          zoneHash: ZeroHash,
          salt: SALT,
          conduitKey: INK_CONDUIT_KEY,
          totalOriginalConsiderationItems: "1",
        },
        numerator: "1",
        denominator: "1",
        signature: "0x",
        extraData: "0x",
      },
    ];
    const criteriaResolvers: CriteriaResolver[] = [];

    const fulfillments: Fulfillment[] = [
      {
        offerComponents: [
          {
            orderIndex: "1",
            itemIndex: "0",
          },
        ],
        considerationComponents: [
          {
            orderIndex: "0",
            itemIndex: "0",
          },
        ],
      },
      {
        offerComponents: [
          {
            orderIndex: "0",
            itemIndex: "0",
          },
        ],
        considerationComponents: [
          {
            orderIndex: "1",
            itemIndex: "0",
          },
        ],
      },
    ];

    const recipient: string = walletAddress;
    console.log(orders);

    const res = await acceptOffer(
      orders,
      criteriaResolvers,
      fulfillments,
      recipient
    );
    console.log(res);

    if (res?.status !== "success") return;

    await acceptListingOffer(
      offer.id,
      res?.transactionHash,
      listByNft?.network
    );
  };

  useEffect(() => {
    const getNftData = async () => {
      const nft = await getNftByOne(tokenId, contract);
      console.log("nft", nft);
      const nfts = await getNft(nft?.collectionId);
      const listing = await getListByNft(nft?.id);
      const activities = await getActivityByNft(nft?.id)
      setNftByOne(nft);
      setNftByCollection(nfts?.data);
      setListByNft(listing?.data);
      setActivity(activities?.data)

      console.log("NFT", nft);
      console.log("Listing", listing);

      // ********* Get offers by nft id ************ //
      const newOffers = await getOffersByNftId(nft?.id);
      setOffers(newOffers);
    };
    getNftData();
  }, [tokenId, contract]);

  useEffect(() => {
    const getOffer = async () => {
      if (listByNft) {
        offers.map((offer) => {
          if (offer.listingId === listByNft.id) {
            setOffer(offer);
          }
        });
      }
    };
    getOffer();
  }, [listByNft, offers]);

  const selectActiveNftIdx = (nft: NftTypes) => {
    setActiveListing(nft);
  };

  const selectBuyNftIdx = (nft: NftTypes) => {
    setActiveBuy(nft);
  };

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
            nftByOne && (
              <AssetOverview
                nft={nftByOne}
                listing={listByNft}
                isListed={isListed}
                isNoticed={isNoticed}
                setIsNoticed={setIsNoticed}
                setIsOffer={setIsOffer}
                isOffer={isOffer}
                offer={offer}
              />
            )
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
                      {nftByOne?.collection.desc}
                    </Typography>
                    <div className="flex gap-[15px] mt-5">
                      {nftByOne?.collection.website && (
                        <Link
                          href={nftByOne?.collection.website}
                          className="w-5 h-5"
                        >
                          <WebsiteIcon className="w-4 h-4" />
                        </Link>
                      )}
                      {nftByOne?.collection.twitter && (
                        <Link
                          href={nftByOne?.collection.twitter}
                          className="w-5 h-5"
                        >
                          <TwitterIcon className="w-4 h-4" />
                        </Link>
                      )}
                      {nftByOne?.collection.discord && (
                        <Link
                          href={nftByOne?.collection.discord}
                          className="w-5 h-5"
                        >
                          <DiscordIcon className="w-4 h-4" />
                        </Link>
                      )}
                      <Link
                        href={`https://goerli.etherscan.io/address/${nftByOne?.tokenAddress}`}
                        className="w-5 h-5"
                      >
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
                      {nftByOne &&
                        nftByOne?.attributes.map((item, key) => (
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
                  <AssetDetailBox icon={<DetailIcon />} title="Details">
                    <div className="p-[15px] flex justify-between items-center">
                      <div className="font-readex text-[12px] font-medium text-secondary">
                        Contract Address
                      </div>
                      <Typography className="text-[14px] leading-[17.5px] font-bold font-readex">
                        <Link
                          href={`https://etherscan.io/address/${nftByOne?.tokenAddress}`}
                          target="_blank"
                          className="text-blue-300 hover:text-blue-600"
                        >
                          {shortenAddress(nftByOne?.tokenAddress)}
                        </Link>
                      </Typography>
                    </div>
                    <div className="p-[15px] flex justify-between items-center">
                      <div className="font-readex text-[12px] font-medium text-secondary">
                        Token ID
                      </div>
                      <Typography className="text-[14px] leading-[17.5px] font-bold font-readex">
                        {nftByOne?.tokenId}
                      </Typography>
                    </div>
                    <div className="p-[15px] flex justify-between items-center">
                      <div className="font-readex text-[12px] font-medium text-secondary">
                        Token Standard
                      </div>
                      <Typography className="text-[14px] leading-[17.5px] font-bold font-readex">
                        {nftByOne?.contractType}
                      </Typography>
                    </div>
                    <div className="p-[15px] flex justify-between items-center">
                      <div className="font-readex text-[12px] font-medium text-secondary">
                        Chain
                      </div>
                      <Typography className="text-[14px] leading-[17.5px] font-bold font-readex">
                        {nftByOne?.collection.network}
                      </Typography>
                    </div>
                    <div className="p-[15px] flex justify-between items-center">
                      <div className="font-readex text-[12px] font-medium text-secondary">
                        Last Updated
                      </div>
                      <Typography className="text-[14px] leading-[17.5px] font-bold font-readex">
                        {nftByOne?.updatedAt}
                      </Typography>
                    </div>
                    <div className="p-[15px] flex justify-between items-center">
                      <div className="font-readex text-[12px] font-medium text-secondary">
                        Creator Earnings
                      </div>
                      <Typography className="text-[14px] leading-[17.5px] font-bold font-readex">
                        0
                      </Typography>
                    </div>
                  </AssetDetailBox>
                </div>
                <div className="w-full md:w-1/2 xl:w-[calc(100%-544px)] flex flex-col gap-5 mt-5 md:mt-0">
                  <AssetDetailBox
                    icon={<HistoryIcon />}
                    title="Price History"
                  >
                    {activity && (
                      <div>

                      </div>
                    )}
                  </AssetDetailBox>
                  <AssetDetailBox
                    icon={<OfferSmIcon />}
                    title="Offers"
                    defaultCollapsed={true}
                  >
                    {offers.length > 0 ? (
                      <table className="w-full text-light-100">
                        <thead className="">
                          <th className=" text-secondary text-left">offerer</th>
                          <th className=" text-secondary text-left">price</th>
                          <th
                            className={` text-secondary text-left ${offer?.sellerId !== userData?.id
                              ? "hidden"
                              : "show"
                              }`}
                          >
                            action
                          </th>
                        </thead>
                        <tbody>
                          {offers.map((offer) => (
                            <tr key={offer.id}>
                              <td>{offer.buyer?.username}</td>
                              <td>
                                {weiToNum(offer.offerPrice.toString())} eth
                              </td>
                              <td className="w-[20%] cursor-pointer hover:text-light-400">
                                <button
                                  className={`bg-secondary px-4 py-2 rounded-[8px] ${offer.sellerId !== userData?.id
                                    ? "hidden"
                                    : "show"
                                    }`}
                                  onClick={() => handleAccept(offer)}
                                >
                                  Accept
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="h-20 grid place-content-center text-light-100 text-[15px] font-readex !font-400">
                        No offers yet
                      </div>
                    )}
                  </AssetDetailBox>
                </div>
              </div>
              <div className="mt-5">
                {nftByOne && (
                  <AssetDetailBox
                    icon={<ActivityIcon />}
                    title="Activity"
                    defaultCollapsed={true}
                  >
                    <div className="hidden md:block">
                      <AssetActivityTable
                        collectionId={nftByOne?.collectionId}
                        contract={contract}
                        nftId={nftByOne?.id}
                      />
                    </div>
                    <div className="block md:hidden">
                      <AssetActivityTableMobile
                        collectionId={nftByOne?.collectionId}
                        contract={contract}
                        nftId={nftByOne?.id}
                      />
                    </div>
                  </AssetDetailBox>
                )}
              </div>
              <div className="max-w-[1080px] mx-auto mt-[30px]">
                <div className="p-5 flex gap-2.5 items-center">
                  <ListIcon />{" "}
                  <Typography className="text-[16px] font-semibold font-readex">
                    More from {nftByOne?.collection.name}
                  </Typography>
                </div>
                <div className="flex justify-center gap-[25px] min-h-[390px] flex-wrap">
                  {nftByCollection &&
                    nftByCollection.map((item, index) => (
                      <NftCard
                        key={index}
                        nft={item}
                        width={240}
                        setActiveListing={() => selectActiveNftIdx(item)}
                        setActiveBuy={() => selectBuyNftIdx(item)}
                        setIsNoticed={setIsNoticed}
                      />
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
      {nftByOne && (
        <OfferModal
          nft={nftByOne}
          listing={listByNft}
          setIsOffer={setIsOffer}
        />
      )}
      {nftByOne && <BuyModal nft={nftByOne} listing={listByNft} />}
      {nftByOne && (
        <ListModal
          nft={nftByOne}
          setIsListed={setIsListed}
          setIsNoticed={setIsNoticed}
        />
      )}
    </>
  );
}
