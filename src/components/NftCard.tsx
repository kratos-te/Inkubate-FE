/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useAccount } from "wagmi";

import Typography from "./Typography";
import IconButton from "./IconButton";
import { AddIcon, FavoriteIcon } from "./SvgIcons";
import { cancelList } from "@/actions";
import { getListByNft } from "@/actions";
import { useModal } from "@/contexts/ModalContext";
import { ListingTypes, NftTypes } from "@/utils/types";
import { date2Timestamp, ipfsToLink, weiToNum } from "@/utils/util";
import { useInkubate } from "@/hooks/useInkubate";
import { SALT, ZERO_ADDRESS, ZERO_HASH } from "@/config";
import { INK_CONDUIT_KEY } from "@/utils/constants";

interface ItemProps {
  nft: NftTypes;
  width: number;
  setActiveListing: () => void;
  setActiveBuy: () => void;
  setIsNoticed?: Function;
}

const NftCard: FC<ItemProps> = ({
  nft,
  width,
  setActiveListing,
  setActiveBuy,
  setIsNoticed,
}) => {
  const { id, imgUrl, name, owner, nftId, address } = nft;
  const favorited = false;
  const pathname = usePathname();
  const { openBuyModal, openListModal } = useModal();
  const { count, cancelListing } = useInkubate();
  const { address: walletAddress } = useAccount();
  const [listByNft, setListByNft] = useState<ListingTypes>();

  useEffect(() => {
    const getListing = async () => {
      const listing = await getListByNft(id);
      setListByNft(listing?.data);
    };
    getListing();
  }, [id]);

  const handleFavorite = () => {
    console.log("favorite");
    console.log("owner", owner);
  };

  const handleBuy = () => {
    setActiveBuy();
    openBuyModal();
  };

  const handleSell = async () => {
    if (listByNft?.nftId === id) {
      if (!address) return;
      if (listByNft) {
        // const startAmount = (weiToNum(listing.price) / 100) * 95;
        const startDay = date2Timestamp(listByNft.startTime).toString();
        const endDay = date2Timestamp(listByNft.endTime).toString();
        const counters = await count(address as `0x${string}`);
        const orders = {
          offerer: address,
          zone: ZERO_ADDRESS, // always this is a null address in listing
          offer: [
            {
              itemType: 2,
              token: nft.address,
              identifierOrCriteria: nftId,
              startAmount: listByNft.price.toString(),
              endAmount: listByNft.price.toString(),
            },
          ],
          totalOriginalConsiderationItems: "1",
          consideration: [
            {
              itemType: 2,
              token: ZERO_ADDRESS,
              identifierOrCriteria: nftId,
              startAmount: listByNft.price.toString(), // 95% of amount -> price
              endAmount: listByNft.price.toString(),
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
        console.log("orders", orders);

        const res = await cancelListing([orders]);

        const cancel = await cancelList(
          listByNft.id,
          nft.id,
          res?.transactionHash as `0x${string}`,
          listByNft.network
        );

        if (cancel && setIsNoticed) {
          setIsNoticed(false);
        }
        console.log("cancel", cancel);
      }
    } else {
      setActiveListing();
      openListModal();
    }
  };

  return (
    <div className="group">
      <Link href={`/asset/${address}/${nftId}`}>
        <div
          className="rounded-xl shadow-card relative"
          style={{
            width: width,
          }}
        >
          <img
            src={ipfsToLink(imgUrl)}
            className="object-cover"
            alt="nft Image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "/assets/images/shit.jpg";
            }}
          />
          <div className="absolute bottom-2 bg-[#00000040] rounded-md py-1 px-2 right-2">
            <Typography className="font-[500] text-[12px]">#{nftId}</Typography>
          </div>
        </div>
        <div className="px-[18px] pt-3 pb-[18px] bg-dark-200 rounded-b-xl group-hover:rounded-b-none">
          <div className="flex items-center justify-between">
            <Typography className="font-bold text-[15px]">{name}</Typography>
            {!favorited && (
              <IconButton onClick={handleFavorite}>
                <FavoriteIcon />
              </IconButton>
            )}
          </div>
          <div className="flex justify-between">
            <div className="w-1/2">
              <Typography className="text-[10px] lg:text-[12px] text-light-200 font-[400] mb-[5px]">
                Price:
              </Typography>
              {listByNft?.price ? (
                <Typography className="text-[12px] leading-[18px] text-[#666666] font-readex">
                  {weiToNum(listByNft?.price)} ETH
                </Typography>
              ) : (
                ""
              )}
            </div>{" "}
            <div className="w-1/2">
              <Typography className="text-[10px] lg:text-[12px] text-light-200 font-[400] mb-[5px]">
                Owned by
              </Typography>
              <Typography className="text-[12px] leading-[18px] text-[#666666] font-readex">
                {owner?.username}
              </Typography>
            </div>
          </div>
        </div>
      </Link>
      <div className="h-0 group-hover:h-[50px] flex gap-[1px] group-hover:-mt-2 overflow-hidden duration-300  bg-dark-200 rounded-b-xl">
        {pathname === "/profile" ? (
          <>
            <button
              className="text-[12px] lg:text-[16px] h-[50px] bg-[#EA4492] hover:bg-[#c84683] rounded-bl-xl font-bold text-white w-[calc(100%-61px)] duration-300"
              onClick={handleSell}
            >
              {listByNft?.nftId === id ? "Cancel List" : "Sell Now"}
            </button>
            <button
              className="text-[12px] lg:text-[16px] h-[50px] bg-[#EA4492] hover:bg-[#c84683] rounded-br-xl w-[60px] grid place-content-center duration-300"
              onClick={handleSell}
            >
              <AddIcon />
            </button>
          </>
        ) : (
          <>
            {owner.walletAddress === walletAddress ? (
              <>
                <button
                  className="text-[12px] lg:text-[16px] h-[50px] bg-[#EA4492] hover:bg-[#c84683] rounded-bl-xl font-bold text-white w-[calc(100%-61px)] duration-300"
                  onClick={handleBuy}
                >
                  {listByNft?.nftId === id ? "Cancel List" : "Sell Now"}
                </button>
                <button
                  className="text-[12px] lg:text-[16px] h-[50px] bg-[#EA4492] hover:bg-[#c84683] rounded-br-xl w-[60px] grid place-content-center duration-300"
                  onClick={handleBuy}
                >
                  <AddIcon />
                </button>
              </>
            ) : (
              <>
                <button
                  className={`text-[12px] lg:text-[16px] h-[50px] bg-[#EA4492] hover:bg-[#c84683] rounded-bl-xl font-bold text-white w-[calc(100%-61px)] duration-300 ${
                    listByNft?.nftId === id ? "show" : "hidden"
                  }`}
                  onClick={handleBuy}
                >
                  {listByNft?.nftId === id ? "Buy Now" : "Make Offer"}
                </button>
                <button
                  className={`text-[12px] lg:text-[16px] h-[50px] bg-[#EA4492] hover:bg-[#c84683] rounded-br-xl w-[60px] grid place-content-center duration-300 ${
                    listByNft?.nftId === id ? "show" : "hidden"
                  }`}
                  onClick={handleBuy}
                >
                  <AddIcon />
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NftCard;
