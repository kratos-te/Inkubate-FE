import { FC, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ListingTypes, NftTypes, PhotoItem } from "@/utils/types";
import Typography from "../Typography";
import {
  AddCartIcon,
  CheckIcon,
  ClockIcon,
  CloseCircleIcon,
  EditIcon,
  ExplorerIcon,
  FavoriteSmIcon,
  MoreSmIcon,
  OfferIcon,
  RefreshIcon,
  ShareIcon,
  VerifiedIcon,
  WalletIcon,
} from "../SvgIcons";
import useWindowSize from "@/utils/useWindowSize";
import { useModal } from "@/contexts/ModalContext";
import { useAccount } from "wagmi";
import { cancelList, getPhoto } from "@/actions";
import { format } from "date-fns";
import { weiToNum } from "@/utils/util";
import { useInkubate } from "@/hooks/useInkubate";
import { SALT, ZERO_ADDRESS, ZERO_HASH } from "@/config";
import { OPENSEA_CONDUIT_KEY } from "@/utils/constants";

interface OverviewProps {
  nft: NftTypes;
  listing?: ListingTypes;
  className?: string;
}

const AssetOverview: FC<OverviewProps> = ({ nft, listing }) => {
  const { openOfferModal, openBuyModal, openListModal } = useModal();
  const { count, cancelListing } = useInkubate();
  const { address } = useAccount();
  const { id, imgUrl, name, owner, nftId, collection } = nft;
  // const { price } = listing
  const [nftAvatar, setNftAvatar] = useState<PhotoItem>()

  const handleCancelList = async () => {
    if (!address) return;
    if (listing) {
      // const startAmount = (weiToNum(listing.price) / 100) * 95;
      const startDay = (
        Math.round(new Date(listing.createdAt).getTime() / 1000)
      ).toString();
      const endDay = (
        Math.round(new Date(listing.expiresAt).getTime() / 1000)
      ).toString();
      const counters = await count(address as `0x${string}`)
      // const counter = weiToNum(counters)

      const orders = {
        offerer: address,
        zone: ZERO_ADDRESS, // always this is a null address in listing
        offer:
          [{
            itemType: 2,
            token: nft.address,
            identifierOrCriteria: nftId,
            startAmount: listing.price.toString(),
            endAmount: listing.price.toString(),
          }],
        totalOriginalConsiderationItems: "1",
        consideration:
          [{
            itemType: 0,
            token: ZERO_ADDRESS,
            identifierOrCriteria: "0",
            startAmount: listing.price.toString(), // 95% of amount -> price
            endAmount: listing.price.toString(),
            recipient: address, // price receiver -> token owner
          }],
        orderType: 0,
        startTime: startDay,
        endTime: endDay,
        zoneHash: ZERO_HASH,
        salt: SALT,
        conduitKey: OPENSEA_CONDUIT_KEY,
        counter: counters
      };
      console.log("orders", orders)

      const res = await cancelListing([orders])

      const cancel = await cancelList(id, res?.transactionHash as `0x${string}`, JSON.stringify(orders), listing.network)

      console.log("cancel", cancel)
    }
  }

  useEffect(() => {
    const getAvatar = async () => {
      const avatar = await getPhoto(collection.avatarId)
      setNftAvatar(avatar?.data)
    }
    getAvatar()
  }, [collection])

  const { width } = useWindowSize();
  return (
    <div className="flex flex-col lg:flex-row">
      <div
        className="w-full sm:!w-[400px] xl:!w-[504px] h-full sm:!h-[400px] xl:!h-[504px] relative overflow-hidden rounded-xl mr-0 lg:mr-8 xl:mr-10"
        style={{
          width: width - 60,
          height: width - 60,
        }}
      >
        <image xlinkHref={imgUrl} className="relative z-0 object-cover" />
        <div className="absolute bottom-2 bg-[#00000040] rounded-md py-1 px-2 right-2">
          <Typography className="font-semibold text-[15px] !text-white">
            #{nftId}
          </Typography>
        </div>
      </div>
      <div className="mt-7 lg:mt-[60px] xl:mt-[106px] w-full lg:w-[calc(100%-440px)] xl:w-[calc(100%-544px)]">
        <div className="flex justify-between">
          <div className="flex items-center bg-dark-200 rounded-full p-[3px] pr-2 lg:min-w-[200px]">
            {nftAvatar &&
              <div className="w-[33px] h-[33px] border-[1.5px] border-light-100 rounded-full relative">
                <Image
                  src={nftAvatar.url}
                  fill
                  objectFit="cover"
                  className="rounded-full"
                  alt=""
                />
              </div>
            }
            <Typography className="text-[12px] leading-[15px] font-bold lg:text-[16px] lg:leading-[1.5] mx-2">
              {collection.name}
            </Typography>
            {collection.verified &&
              <VerifiedIcon color="#EA4492" />
            }
          </div>
          <div className="rounded-full bg-[#666] flex gap-5 py-[11.5px] px-[15px]">
            <Link href={"#"}>
              <AddCartIcon className="fill-hover" />
            </Link>
            <Link href={"#"} className="hidden lg:block">
              <ExplorerIcon className="fill-hover" />
            </Link>
            <Link href={"#"}>
              <FavoriteSmIcon className="fill-hover" />
            </Link>
            <Link href={"#"} className="hidden lg:block">
              <RefreshIcon className="fill-hover" />
            </Link>
            <Link href={"#"} className="hidden lg:block">
              <ShareIcon className="fill-hover" />
            </Link>
            <Link href={"#"} className="block lg:hidden">
              <MoreSmIcon className="fill-hover" />
            </Link>
          </div>
        </div>
        <div className="mt-5">
          <Typography
            component="h1"
            className="lg:font-readex font-poppins text-[36px] leading-[44px] lg:text-[28px] lg:leading-[35px] font-bold"
          >
            {`${name}#${nftId}`}
          </Typography>
          <Typography
            component="p"
            className="text-[16px] lg:text-[14px] !font-[400] lg:font-medium mt-2"
          >
            Owned by
            <span className="ml-2 text-secondary">{owner.username}</span>
          </Typography>
          {listing &&
            <>
            <Typography className="text-[14px] font-medium mt-5">
              Price
            </Typography>
            <Typography className="text-[30px] lg:text-[28px] leading-[35px] font-bold mt-[5px]">
              {weiToNum(listing.price)} ETH
            </Typography>
            <Typography className="text-[15px] mt-2.5 flex items-center text-light-200">
              <ClockIcon className="mr-[5px]" />
              <span className="text-light-200">
                Sale ened {format(new Date(listing.expiresAt), "MMM dd, yyyy, hh:mm b")}
              </span>
            </Typography>
            </>
          }

          {address === owner.walletAddress ? (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col mt-5 md:flex-row">
                {listing?.status === "ACTIVE" ?
                  <button
                    className="px-10 py-[11px] text-dark-200 font-readex flex !rounded-full items-center text-[16px] !font-bold bg-light-100 md:mr-2.5 justify-center hover:bg-[#bbb] duration-300"
                    onClick={handleCancelList}
                  >
                    <CloseCircleIcon className="mr-2 w-[18px] h-[18px]" color="#161616" />
                    Cancel Listing
                  </button> :
                  <button
                    className="px-10 py-[11px] text-dark-200 font-readex flex !rounded-full items-center text-[16px] !font-bold bg-light-100 md:mr-2.5 justify-center hover:bg-[#bbb] duration-300"
                    onClick={openListModal}
                  >
                    <WalletIcon className="mr-2 mt-[1px]" color="#161616" />
                    Sell NFT
                  </button>
                }

                {listing?.status === "ACTIVE" &&
                  <button
                    className="px-10 py-[11p x] text-light-100 font-readex flex !rounded-full items-center !font-bold bg-dark-200 justify-center mt-[14px] md:mt-0 hover:bg-[#222] duration-300"
                    onClick={openOfferModal}
                  >
                    <EditIcon className="mr-2 mt-[1px] w-[16px] h-[16px]" color="#F2F3F4" />
                    Edit
                  </button>
                }
                {/* <button
                className="px-10 py-[11px] text-light-100 flex !rounded-full items-center !font-bold bg-dark-200 justify-center mt-[14px] md:mt-0 hover:bg-[#222] duration-300"
                onClick={openOfferModal}
              >
                <OfferIcon className="mr-2 mt-[1px]" color="#F2F3F4" />
                Make Offer
              </button> */}
              </div>
              {listing?.status === "ACTIVE" &&
                <div className="flex w-[314px] gap-[14px] items-center p-[14px] bg-[#161616] rounded-xl text-[16px] font-semibold font-readex text-white">
                  <CheckIcon />
                  Your Item is successfully listed

                </div>
              }
            </div>
          ) : (
            <div className="flex flex-col mt-5 md:flex-row">
              <button
                className="px-10 py-[11px] text-dark-200 flex !rounded-full items-center !font-bold bg-light-100 md:mr-2.5 justify-center hover:bg-[#bbb] duration-300"
                onClick={openBuyModal}
              >
                <WalletIcon className="mr-2 mt-[1px]" color="#161616" />
                Buy Now
              </button>
              <button
                className="px-10 py-[11px] text-light-100 flex !rounded-full items-center !font-bold bg-dark-200 justify-center mt-[14px] md:mt-0 hover:bg-[#222] duration-300"
                onClick={openOfferModal}
              >
                <OfferIcon className="mr-2 mt-[1px]" color="#F2F3F4" />
                Make Offer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssetOverview;
