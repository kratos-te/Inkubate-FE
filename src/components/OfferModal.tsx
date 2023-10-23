/* eslint-disable @next/next/no-img-element */
import { FC, useState, useRef, Dispatch, SetStateAction } from "react";
import { useAccount } from "wagmi";
import { ZeroAddress, ZeroHash } from "ethers";

import { createOffer } from "@/actions";
import { SALT } from "@/config";
import { useModal } from "@/contexts/ModalContext";
import { useErc20 } from "@/hooks/useErc20";
import { useInkubate } from "@/hooks/useInkubate";
import { useSignSeaportOrder } from "@/hooks/useSignSeaportOrder";
import {
  GOERLI_WETH_ADDRESS,
  INK_CONDUIT_ADDRESS,
  INK_CONDUIT_KEY,
  OrderType,
} from "@/utils/constants";
import { ListingTypes, NftTypes } from "@/utils/types";
import { date2UTC, numToWei } from "@/utils/util";
import { CoinButton } from "./CoinButton";
import { LoadingPad } from "./LoadingPad";
import { SetDuration } from "./SetDuratoin";
import { CloseCircleIcon, VerifiedIcon } from "./SvgIcons";
import Typography from "./Typography";
import { useUser } from "@/contexts/UserContext";
import { successAlert } from "./ToastGroup";

export const OfferModal: FC<{
  nft: NftTypes;
  listing?: ListingTypes;
  className?: string;
  setIsOffer: Dispatch<SetStateAction<boolean>>;
}> = ({ nft, listing, setIsOffer }) => {
  const { address: walletAddress } = useAccount();
  const { closeOfferModal, isOpenedOfferModal } = useModal();
  const { approve } = useErc20();
  const { count } = useInkubate();
  const signOrder = useSignSeaportOrder();
  const { image, name, tokenId } = nft;

  const [makeOffer, setMakeOffer] = useState(false);
  const [amount, setAmount] = useState<string>("");
  const { endDate, endTime } = useUser();
  const modalRef = useRef<HTMLDivElement>(null);

  // const startDay = (
  //   new Date(date2UTC(startDate, startTime)).getTime() / 1000
  // ).toString();
  const endDay = (
    new Date(date2UTC(endDate, endTime)).getTime() / 1000
  ).toString();

  const handleSign = async () => {
    if (!walletAddress) return { signature: "", data: "" };
    console.log("endaday", endDay);
    const startAmount = numToWei(parseFloat(amount));
    const consideration = [
      {
        itemType: 2,
        token: nft.tokenAddress,
        identifierOrCriteria: tokenId,
        startAmount: "1",
        endAmount: "1",
        recipient: walletAddress,
      },
      // {
      //   itemType: 0,
      //   token: ZERO_ADDRESS,
      //   identifierOrCriteria: '0',
      //   startAmount: feeAmount.toString(), // 5% of amount -> fee
      //   endAmount: feeAmount.toString(),
      //   recipient: address, // fee receiver -> platform trasury wallet
      // },
    ];

    const orderParameters = {
      offerer: walletAddress,
      offer: [
        {
          itemType: 1,
          token: GOERLI_WETH_ADDRESS,
          identifierOrCriteria: "0",
          startAmount: startAmount,
          endAmount: startAmount,
        },
      ],
      consideration,
      startTime: "0", // 1970-01-01T00:00:00.000Z
      endTime: endDay, // TODO:Set end time from input // 2038-01-19T03:14:07.000Z
      orderType: OrderType.FULL_OPEN,
      zone: ZeroAddress,
      zoneHash: ZeroHash,
      salt: SALT,
      conduitKey: INK_CONDUIT_KEY,
      totalOriginalConsiderationItems: consideration.length.toString(),
    };
    const counter = await count(walletAddress);
    const { signature, data } = await signOrder(
      orderParameters,
      counter as string
    );
    if (signature === "") {
      return { signature: "", data };
    } else {
      return { signature, data };
    }
  };

  const handleOffer = async () => {
    if (!listing || !walletAddress) return;

    setMakeOffer(true);
    const startAmount = numToWei(parseFloat(amount));
    // TODO: notify insuffcient wETH Balance
    // const balance = await balanceOf(GOERLI_WETH_ADDRESS, walletAddress!);
    // console.log(balance);
    const res = await approve(
      GOERLI_WETH_ADDRESS,
      INK_CONDUIT_ADDRESS,
      BigInt(startAmount)
    );
    if (res.status === "success") {
      const { signature, data } = await handleSign();
      if (signature) {
        const res = await createOffer(
          listing.id,
          signature,
          JSON.stringify(data),
          nft.collection.network
        );
        console.log(res);
      }
      setMakeOffer(false);
      closeOfferModal();
      successAlert("Offered successfully!")
      setIsOffer(true);
    }
  };

  const handleChangeAmount = (event: any) => {
    setAmount(event.target.value);
  };

  if (!isOpenedOfferModal) return null;
  return (
    <div
      className={`fixed z-50 w-full h-full min-h-screen top-0  bg-black/90 transition-opacity`}
    >
      <div className="w-full h-full flex justify-center items-center overflow-auto">
        <div
          ref={modalRef}
          className="bg-[#171C21] w-[530px] max-sm:w-[348px] rounded-2xl  relative  bg-no-repeat bg-center bg-cover p-5"
        >
          <button
            className="group md:rounded-xl absolute right-0 md:right-4 top-2 md:top-4 z-10"
            onClick={closeOfferModal}
          >
            <CloseCircleIcon className="group-hover:rotate-90 duration-300" />
          </button>
          <div className="modal_header">
            <div className="text-white text-[30px] mb-[26px] max-w-[280px] text-left leading-7  font-bold  max-sm:text-[20px]  ">
              Make an Offer
            </div>
          </div>
          <div className="modal_body text-center">
            <div className="flex gap-[24px] items-center">
              <img
                src={image}
                className="relative z-0 rounded-xl object-cover w-[120px] h-[120xp]"
                alt="nft Image for Buy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "/assets/images/shit.jpg";
                }}
              />
              <div className="flex-col space-y-2">
                <div className="flex items-left">
                  <p className="text-[24px] leading-[15px] font-bold lg:text-[24px] lg:leading-[1.5] text-[#B3B3B3] max-sm:text-[20px]">
                    {"OG Dread Zero"}
                  </p>
                  <VerifiedIcon color="#EA4492" />
                </div>
                <Typography
                  component="h1"
                  className="items-left lg:font-readex font-poppins text-[36px] leading-[44px] lg:text-[36px] lg:leading-[35px] font-bold max-sm:text-[24px]"
                >
                  {name}
                </Typography>
              </div>
            </div>
            <div className="flex-col items-left mt-12 ">
              <Typography className="text-[24px] font-semibold text-left max-sm:text-[18px]">
                {"Price"}
              </Typography>
              <div className="flex justify-between rounded-[8px] bg-dark-400 px-3 items-center mt-2 max-sm:py-2">
                <input
                  className="bg-dark-400 rounded-[8px] text-[14px] text-white w-full py-[14px] placeholder:text-white outline-none"
                  placeholder="Amount"
                  onChange={handleChangeAmount}
                  value={amount}
                />
                <CoinButton
                  icon="/assets/icons/eth.png"
                  symbol="ETH"
                  className={""}
                />
              </div>
              <p className="text-[16px] text-[#B3B3B3] mt-2 text-left max-sm:text-[14px]">
                Balance: 0.0600 wETH
              </p>
            </div>
            <SetDuration />
            <div className="flex-col mt-6">
              <Typography className="text-[24px] font-semibold text-left max-sm:text-[18px ]">
                {"Fees"}
              </Typography>
              <div className="flex justify-between mt-2">
                <p className="text-[16px] text-[#B3B3B3]">Marketplace Fee</p>
                <p className="text-[16px] text-[#B3B3B3]">2.5%</p>
              </div>
            </div>
            {makeOffer && (
              <LoadingPad
                title="Processing"
                description="Confirm the transaction in your wallet to make a offer"
              />
            )}
            <button
              className="w-full rounded-lg bg-white text-[16px] font-semibold py-3 mt-6"
              onClick={handleOffer}
            >
              Make Offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
