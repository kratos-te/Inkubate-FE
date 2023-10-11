/* eslint-disable @next/next/no-img-element */
import { FC, useState, useRef } from "react";
import Image from "next/image";
import { CloseCircleIcon, VerifiedIcon } from "./SvgIcons";
import { useModal } from "@/contexts/ModalContext";
import { ModalItem } from "@/utils/types";
import Typography from "./Typography";
import { CoinButton } from "./CoinButton";
import { LoadingPad } from "./LoadingPad";
import { SetDuration } from "./SetDuratoin";
import { ipfsToLink } from "@/utils/util";

export const OfferModal: FC<ModalItem> = ({ nft }) => {
  const { closeOfferModal, isOpenedOfferModal } = useModal();
  const { imgUrl, name } = nft;

  const [makeOffer, setMakeOffer] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleOffer = () => {
    setMakeOffer(!makeOffer);
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
                src={ipfsToLink(imgUrl)}
                className="relative z-0 rounded-xl object-cover w-[120px] h-[120xp]"
                alt="nft Image for Buy"
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
              <div className="flex justify-between rounded-[8px] bg-dark-400 px-3 py-4 items-center mt-2 max-sm:py-2">
                <p className="text-[14px] text-white">34</p>
                <CoinButton
                  icon="/assets/icons/eth.png"
                  symbol="ETH"
                  className={""}
                />
              </div>
              <p className="text-[16px] text-[#B3B3B3] mt-2 text-left max-sm:text-[14px]">
                Balance: 0.0600 ETH
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
