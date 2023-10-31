/* eslint-disable @next/next/no-img-element */
import { FC, useState } from "react";
import { useAccount } from "wagmi";
import { buyNow } from "@/actions";
import { SALT, ZERO_ADDRESS, ZERO_HASH } from "@/config";
import { useModal } from "@/contexts/ModalContext";
import { useInkubate } from "@/hooks/useInkubate";
import { INK_CONDUIT_KEY } from "@/utils/constants";
import { ListingTypes, NftTypes } from "@/utils/types";
import { date2Timestamp, weiToNum } from "@/utils/util";
import ClickAwayComponent from "./ClickAwayComponent";
import { LoadingPad } from "./LoadingPad";
import { CloseCircleIcon, VerifiedIcon } from "./SvgIcons";
import Typography from "./Typography";
import { successAlert } from "./ToastGroup";

interface BuyModalProps {
  nft: NftTypes;
  listing?: ListingTypes;
  className?: string;
}

export const BuyModal: FC<BuyModalProps> = ({ nft, listing }) => {
  const { closeBuyModal, isOpenedBuyModal } = useModal();
  const { image, tokenId, tokenAddress, collection } = nft;
  const { address: walletAddress } = useAccount();
  const [isBuyStatus, setIsBuyStatus] = useState(false);
  const { buyListing } = useInkubate();
  const handleBuy = async () => {
    if (!walletAddress || !listing) return;
    setIsBuyStatus(true);
    const orders = {
      considerationToken: ZERO_ADDRESS,
      considerationIdentifier: "0",
      considerationAmount: listing.price.toString(),
      offerer: listing.seller.walletAddress,
      zone: ZERO_ADDRESS,
      offerToken: tokenAddress,
      offerIdentifier: tokenId,
      offerAmount: "1",
      basicOrderType: 0,
      startTime: date2Timestamp(listing.startTime).toString(),
      endTime: date2Timestamp(listing.endTime).toString(),
      zoneHash: ZERO_HASH,
      salt: SALT,
      offererConduitKey: INK_CONDUIT_KEY,
      fulfillerConduitKey: INK_CONDUIT_KEY,
      totalOriginalAdditionalRecipients: "0",
      additionalRecipients: [],
      signature: listing.signature,
    };
    console.log("orders", orders);
    const res = await buyListing(orders);
    const buy = await buyNow(
      listing.id,
      nft.id,
      res?.transactionHash as `0x${string}`,
      listing.network
    );
    console.log("buy", buy);
    successAlert("Bought successfully!");
    setIsBuyStatus(false);
  };

  if (!isOpenedBuyModal) return null;
  return (
    <div
      className={`fixed z-50 w-full h-full min-h-screen top-0  bg-black/90 transition-opacity`}
    >
      <div className="w-full h-full flex justify-center items-center overflow-auto">
        <ClickAwayComponent
          onClickAway={closeBuyModal}
          className="bg-[#171C21] w-[530px] rounded-2xl max-sm:w-[369px] relative  bg-no-repeat bg-center bg-cover p-5"
        >
          <button
            className="group md:rounded-xl absolute right-0 md:right-4 top-2 md:top-4 z-10"
            onClick={closeBuyModal}
          >
            <CloseCircleIcon className="group-hover:rotate-90 duration-300" />
          </button>
          <div className="modal_header">
            <div className="text-white text-[24px]  max-w-[280px] text-left leading-7  font-bold">
              Buy this NFT
            </div>
          </div>
          <div className="modal_body text-center">
            <div className="flex gap-[24px] items-center mt-[34px] pb-[14px]">
              <img
                src={image}
                className="relative z-0 rounded-xl object-cover w-[120px] h-[120xp]"
                alt="nft Image for Buy"
              />
              <div className="flex-col space-y-1">
                <div className="flex items-center">
                  <p className="text-[24px] leading-[15px] font-semibold max-sm:text-[18px] lg:leading-[1.5] text-[#B3B3B3] font-poppins">
                    {collection?.name}
                  </p>
                  {collection?.verified && <VerifiedIcon color="#EA4492" />}
                </div>
                <Typography
                  component="h1"
                  className="lg:font-readex font-poppins text-[36px] leading-[44px] max-sm:text-[24px] lg:leading-[35px] font-bold"
                >
                  { }
                </Typography>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-6 border-t-[1px] border-[#666666] py-6">
              <p className="text-[24px] font-semibold text-left text-white">
                Fees{" "}
              </p>
              <div className="flex justify-between ">
                <p className="text-[16px] text-[#B3B3B3] font-norma">
                  Marketplace Fee
                </p>
                <p className="text-[16px] text-[#B3B3B3] font-norma">2.5% </p>
              </div>
            </div>
            <div className="flex justify-between mt-6 border-t-[1px] border-[#666666] pt-6">
              <p className="text-[20px] font-semibold text-left text-white">
                Total Amount{" "}
              </p>
              <p className="text-[24px] font-semibold text-secondary font-poppins">
                {weiToNum(listing?.price || "0")} ETH
              </p>
            </div>
            {isBuyStatus && (
              <LoadingPad
                title="Complete Purchase"
                description="Confirm the transaction in your wallet to purchase the NFT."
              />
            )}
            <button
              className="w-full rounded-[12px] bg-white text-[16px] font-semibold py-3 mb-4 mt-11"
              onClick={handleBuy}
            >
              Purchase NFT
            </button>
          </div>
        </ClickAwayComponent>
      </div>
    </div>
  );
};
