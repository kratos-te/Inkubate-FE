/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ListingTypes, NftTypes, OfferTypes, PhotoItem } from "@/utils/types";
import Typography from "../Typography";
import {
  AddCartIcon,
  CheckIcon,
  ClockIcon,
  CloseCircleIcon,
  EditIcon,
  ExplorerIcon,
  FavoriteSmIcon,
  FavouriteFullIcon,
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
import copy from "copy-to-clipboard";
import { cancelList, cancelOffer, createLikes, getLikeByNft, getPhoto, removeLike } from "@/actions";
import { format } from "date-fns";
import { date2Timestamp, weiToNum } from "@/utils/util";
import { useInkubate } from "@/hooks/useInkubate";
import { SALT, ZERO_ADDRESS, ZERO_HASH } from "@/config";
import { INK_CONDUIT_KEY } from "@/utils/constants";
import { successAlert } from "../ToastGroup";

interface OverviewProps {
  nft: NftTypes;
  listing?: ListingTypes;
  className?: string;
  isListed?: boolean;
  isNoticed?: boolean;
  setIsNoticed: Function;
  isOffer?: boolean;
  setIsOffer: Function;
  offer?: OfferTypes;
  setReload: Dispatch<SetStateAction<boolean>>
}

const AssetOverview: FC<OverviewProps> = ({
  nft,
  listing,
  setIsNoticed,
  isListed = false,
  isNoticed = false,
  isOffer,
  setIsOffer,
  offer,
  setReload
}) => {
  const { openOfferModal, openBuyModal, openListModal } = useModal();

  const { count, cancelListing } = useInkubate();
  const { address } = useAccount();
  const { id, image, name, owner, tokenId, collection } = nft;
  const [nftAvatar, setNftAvatar] = useState<PhotoItem>();
  const [copied, setCopied] = useState(false);
  const [like, setLike] = useState(false);

  const router = useRouter();
  const handleCancelList = async () => {
    if (!address) return;
    if (listing) {
      // const startAmount = (weiToNum(listing.price) / 100) * 95;
      const startDay = date2Timestamp(listing.startTime).toString();
      const endDay = date2Timestamp(listing.endTime).toString();
      const counters = await count(address as `0x${string}`);
      const orders = {
        offerer: address,
        zone: ZERO_ADDRESS, // always this is a null address in listing
        offer: [
          {
            itemType: 2,
            token: nft.tokenAddress,
            identifierOrCriteria: tokenId,
            startAmount: listing.price.toString(),
            endAmount: listing.price.toString(),
          },
        ],
        totalOriginalConsiderationItems: "1",
        consideration: [
          {
            itemType: 2,
            token: ZERO_ADDRESS,
            identifierOrCriteria: tokenId,
            startAmount: listing.price.toString(), // 95% of amount -> price
            endAmount: listing.price.toString(),
            recipient: address, // price receiver -> token owner
          },
        ],
        orderType: 0,
        startTime: startDay,
        endTime: endDay,
        zoneHash: ZERO_HASH,
        salt: SALT,
        conduitKey: INK_CONDUIT_KEY,
        counter: counters,
      };

      const res = await cancelListing([orders]);

      if (res === null) {
        return;
      } else {
        const cancel = await cancelList(
          listing.id,
          nft.id,
          res?.transactionHash as `0x${string}`,
          listing.network
        );

        successAlert("Canceled List")

        if (cancel) {
          setIsNoticed(false);
        }
      }
    }
  };

  const handleCancelOffer = async () => {
    if (offer && listing) {
      const res = await cancelOffer(offer.id, listing.network);
      if (res.status === "success") {
        setIsOffer(false);
      }
    }
  };

  const handleSetLike = async () => {
    // setLike(!like)
    if (!like) {
      await createLikes(id)
      await getLikeByNft(id)
      setLike(true)
    } else {
      await removeLike(id)
      await getLikeByNft(id)
      setLike(false)
    }
  }

  const handleCopy = (link: string) => {
    setCopied(true);
    copy(link);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  // const handleRefresh = async () => {
  //   const refresh = await getNftByOne(tokenId, tokenAddress)
  //   setNftByOne(refresh)
  // }

  const handleRefresh = () => {
    setReload(prev => !prev)
  }


  useEffect(() => {
    const getAvatar = async () => {
      const avatar = await getPhoto(collection.avatarId);
      setNftAvatar(avatar?.data);
    };
    getAvatar();
  }, [collection]);

  useEffect(() => {
    const getLike = async () => {
      const likes = await getLikeByNft(id)
      if (likes) {
        setLike(true)
      } else {
        setLike(false)
      }
    }
    getLike()
  }, [id, like])

  useEffect(() => {
    if (copied === true) {
      successAlert("Link copied successfully!")
    }
  }, [copied])

  // useEffect(() => {
  //   if (like) {
  //     successAlert("Liked successfully!")
  //   } else {
  //     errorAlert("Unliked successfully!")
  //   }
  // }, [like])

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
        <img
          src={image}
          className="relative z-0 object-cover"
          alt="nft Image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "/assets/images/shit.jpg";
          }}
        />
        <div className="absolute bottom-2 bg-[#00000040] rounded-md py-1 px-2 right-2">
          <Typography className="font-semibold text-[15px] !text-white">
            #{tokenId}
          </Typography>
        </div>
      </div>
      <div className="mt-7 lg:mt-[60px] xl:mt-[106px] w-full lg:w-[calc(100%-440px)] xl:w-[calc(100%-544px)]">
        <div className="flex justify-between">
          <div className="flex items-center bg-dark-200 rounded-full p-[3px] pr-2 lg:min-w-[200px]">
            {nftAvatar && (
              <div className="w-[33px] h-[33px] border-[1.5px] border-light-100 rounded-full relative">
                <Image
                  src={nftAvatar?.url}
                  fill
                  objectFit="cover"
                  className="rounded-full"
                  alt=""
                />
              </div>
            )}
            <Typography className="text-[12px] leading-[15px] font-bold lg:text-[16px] lg:leading-[1.5] mx-2">
              {collection.name}
            </Typography>
            {collection.verified && <VerifiedIcon color="#EA4492" />}
          </div>
          <div className="rounded-full bg-[#666] flex gap-5 py-[11.5px] px-[15px]">
            <Link href={"#"}>
              <AddCartIcon className="fill-hover" />
            </Link>
            <Link href={"#"} className="hidden lg:block">
              <ExplorerIcon className="fill-hover" />
            </Link>
            <button onClick={handleSetLike}>
              {like ? <FavouriteFullIcon /> : <FavoriteSmIcon className="fill-hover" />}
            </button>
            <button className="hidden lg:block" onClick={handleRefresh}>
              <RefreshIcon className="fill-hover" />
            </button>
            <button className="hidden lg:block" onClick={() => handleCopy(`${router}`)}>
              <ShareIcon className="fill-hover" />
            </button>
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
            {name}
          </Typography>
          <Typography
            component="p"
            className="text-[16px] lg:text-[14px] !font-[400] lg:font-medium mt-2"
          >
            Owned by
            <span className="ml-2 text-secondary">{owner.username}</span>
          </Typography>
          {(isNoticed || listing) && (
            <>
              <Typography className="text-[14px] font-medium mt-5">
                Price
              </Typography>
              <Typography className="text-[30px] lg:text-[28px] leading-[35px] font-bold mt-[5px]">
                {listing && weiToNum(listing.price)} ETH
              </Typography>
              <Typography className="text-[15px] mt-2.5 flex items-center text-light-200">
                <ClockIcon className="mr-[5px]" />
                <span className="text-light-200">
                  Sale ened{" "}
                  {listing &&
                    format(new Date(listing.endTime), "MMM dd, yyyy, hh:mm b")}
                </span>
              </Typography>
            </>
          )}

          {address === owner.walletAddress && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col mt-5 md:flex-row">
                {isNoticed || listing ? (
                  <button
                    className="px-10 py-[11px] text-dark-200 font-readex flex !rounded-full items-center text-[16px] !font-bold bg-light-100 md:mr-2.5 justify-center hover:bg-[#bbb] duration-300"
                    onClick={handleCancelList}
                  >
                    <CloseCircleIcon
                      className="mr-2 w-[18px] h-[18px]"
                      color="#161616"
                    />
                    Cancel Listing
                  </button>
                ) : (
                  <button
                    className="px-10 py-[11px] text-dark-200 font-readex flex !rounded-full items-center text-[16px] !font-bold bg-light-100 md:mr-2.5 justify-center hover:bg-[#bbb] duration-300"
                    onClick={openListModal}
                  >
                    <WalletIcon className="mr-2 mt-[1px]" color="#161616" />
                    Sell NFT
                  </button>
                )}

                {(isNoticed || listing) && (
                  <button
                    className="px-10 py-[11px] text-light-100 font-readex flex !rounded-full items-center !font-bold bg-dark-200 justify-center mt-[14px] md:mt-0 hover:bg-[#222] duration-300"
                    onClick={openOfferModal}
                  >
                    <EditIcon
                      className="mr-2 mt-[1px] w-[16px] h-[16px]"
                      color="#F2F3F4"
                    />
                    Edit
                  </button>
                )}
              </div>
            </div>
          )}
          {isListed && (
            <div className="inline-flex gap-[14px] items-center p-[14px] bg-[#161616] rounded-xl text-[16px] mt-6 font-semibold font-readex text-white">
              <CheckIcon />
              Your Item is successfully listed
            </div>
          )}
          {address !== owner.walletAddress && (
            <>
              {listing ? (
                <div className="flex flex-col mt-5 md:flex-row">
                  <button
                    className="px-10 py-[11px] text-dark-200 flex !rounded-full items-center !font-bold bg-light-100 md:mr-2.5 justify-center hover:bg-[#bbb] duration-300"
                    onClick={openBuyModal}
                  >
                    <WalletIcon className="mr-2 mt-[1px]" color="#161616" />
                    Buy Now
                  </button>
                  {isOffer || offer ? (
                    <button
                      className="px-10 py-[11px] text-light-100 flex !rounded-full items-center !font-bold bg-dark-200 justify-center mt-[14px] md:mt-0 hover:bg-[#222] duration-300"
                      onClick={handleCancelOffer}
                    >
                      <OfferIcon className="mr-2 mt-[1px]" color="#F2F3F4" />
                      Cancel Offer
                    </button>
                  ) : (
                    <button
                      className="px-10 py-[11px] text-light-100 flex !rounded-full items-center !font-bold bg-dark-200 justify-center mt-[14px] md:mt-0 hover:bg-[#222] duration-300"
                      onClick={openOfferModal}
                    >
                      <OfferIcon className="mr-2 mt-[1px]" color="#F2F3F4" />
                      Make Offer
                    </button>
                  )}
                  {/* <button
                    className="px-10 py-[11px] text-light-100 flex !rounded-full items-center !font-bold bg-dark-200 justify-center mt-[14px] md:mt-0 hover:bg-[#222] duration-300"
                    onClick={openOfferModal}
                  >
                    <OfferIcon className="mr-2 mt-[1px]" color="#F2F3F4" />
                    Make Offer
                  </button> */}
                </div>
              ) : (
                <div className="flex flex-col mt-5 md:flex-row">
                  <button
                    className="px-10 py-[11px] text-light-100 flex !rounded-full items-center !font-bold bg-dark-200 justify-center mt-[14px] md:mt-0 hover:bg-[#222] duration-300"
                    onClick={openOfferModal}
                  >
                    <OfferIcon className="mr-2 mt-[1px]" color="#F2F3F4" />
                    Make Offer
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssetOverview;
