/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Typography from "./Typography";
import IconButton from "./IconButton";
import { AddIcon, FavoriteIcon } from "./SvgIcons";
import { cancelList, createHide, removeHide } from "@/actions";
import { getListByNft } from "@/actions";
import { useModal } from "@/contexts/ModalContext";
import { InactiveNftTypes, ListingTypes, NftTypes } from "@/utils/types";
import { date2Timestamp, weiToNum } from "@/utils/util";
import { useInkubate } from "@/hooks/useInkubate";
import { SALT, ZERO_ADDRESS, ZERO_HASH } from "@/config";
import { INK_CONDUIT_KEY } from "@/utils/constants";
import { successAlert } from "./ToastGroup";

interface ItemProps {
  nft: NftTypes | InactiveNftTypes;
  width: number;
  isInactive?: boolean;
  setActiveItem: () => void;
  setIsNoticed?: Function;
}

const NftCard: FC<ItemProps> = ({
  nft,
  width,
  isInactive,
  setActiveItem,
  setIsNoticed,
}) => {
  const { id, image, name, owner, tokenId, tokenAddress } = nft;
  const favorited = false;
  const pathname = usePathname();
  const { openBuyModal, openListModal } = useModal();
  const { count, cancelListing } = useInkubate();
  const { address: walletAddress } = useAccount();
  const [listByNft, setListByNft] = useState<ListingTypes>();
  const [hide, setHide] = useState(false)
  useEffect(() => {
    const getListing = async () => {
      const listing = await getListByNft(id);
      setListByNft(listing?.data);
    };
    getListing();
  }, [id]);

  const handleFavorite = () => {
    setActiveItem();
  };

  const handleBuy = () => {
    setActiveItem();
    openBuyModal();
  };

  const handleHide = async (hide: boolean) => {
    if (!hide) {
      const hidden = await createHide(id);
      if (hidden) {
        setHide(true)
      }
    } else {
      const hidden = await removeHide(id);
      if (hidden) {
        setHide(false)
      }
    }
  }

  const handleSell = async () => {
    console.log(listByNft)
    if (listByNft?.nftId === id) {
      console.log(2)
      if (!walletAddress) return;
      console.log(3)
      if (listByNft) {
        // const startAmount = (weiToNum(listing.price) / 100) * 95;
        const startDay = date2Timestamp(listByNft.startTime).toString();
        const endDay = date2Timestamp(listByNft.endTime).toString();
        const counters = await count(walletAddress as `0x${string}`);
        const orders = {
          offerer: walletAddress,
          zone: ZERO_ADDRESS, // always this is a null address in listing
          offer: [
            {
              itemType: 2,
              token: nft.tokenAddress,
              identifierOrCriteria: tokenId,
              startAmount: listByNft.price.toString(),
              endAmount: listByNft.price.toString(),
            },
          ],
          totalOriginalConsiderationItems: "1",
          consideration: [
            {
              itemType: 2,
              token: ZERO_ADDRESS,
              identifierOrCriteria: tokenId,
              startAmount: listByNft.price.toString(), // 95% of amount -> price
              endAmount: listByNft.price.toString(),
              recipient: tokenAddress, // price receiver -> token owner
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
        if (res === null) {
          return;
        } else {
          const cancel = await cancelList(
            listByNft.id,
            nft.id,
            res?.transactionHash as `0x${string}`,
            listByNft.network
          );
          successAlert("Canceled List");

          if (cancel && setIsNoticed) {
            setIsNoticed(false);
          }
          console.log("cancel", cancel);
        }
      }
    } else {
      setActiveItem();
      openListModal();
    }
  };

  return (
    <div className="group">
      <Link href={`/asset/${tokenAddress}/${tokenId}`}>
        <div
          className="rounded-xl shadow-card relative"
          style={{
            width: width,
          }}
        >
          <img
            src={image}
            className="object-cover"
            alt="nft Image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "/assets/images/shit.jpg";
            }}
          />
          <div className="absolute bottom-2 bg-[#00000040] rounded-md py-1 px-2 right-2">
            <Typography className="font-[500] text-[12px]">
              #{tokenId}
            </Typography>
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
          isInactive ? (
            <>
              <button
                className="text-[12px] lg:text-[16px] h-[50px] bg-[#EA4492] hover:bg-[#c84683] rounded-bl-xl font-bold text-white w-full duration-300"
                onClick={handleFavorite}
              >
                Remove
              </button>
            </>
          ) : (
              <>
                <button
                  className="text-[12px] lg:text-[16px] h-[50px] bg-[#EA4492] hover:bg-[#c84683] rounded-bl-xl font-bold text-white w-[calc(100%-61px)] duration-300"
                  onClick={handleSell}
                >
                  {listByNft?.nftId === id ? "Cancel List" : "Sell Now"}
                </button>
                <button
                  className="text-[12px] lg:text-[16px] h-[50px] bg-[#EA4492] hover:bg-[#c84683] rounded-br-xl w-[60px] grid place-content-center duration-300"
                  onClick={() => handleHide(hide)}
                >
                  {!hide ? <AiOutlineEye color="white" /> : <AiOutlineEyeInvisible color="white" />}
                  {/* <AddIcon /> */}
                </button>
              </>
            )
        ) : (
          <>
            {owner.walletAddress === walletAddress ? (
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
