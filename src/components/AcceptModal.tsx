import { FC } from "react";
import Image from "next/image";
import { useModal } from "@/contexts/ModalContext";
import { CloseCircleIcon, InfoIcon, VerifiedIcon } from "./SvgIcons";
import { ModalItem } from "@/utils/types";
import Typography from "./Typography";
import ClickAwayComponent from "./ClickAwayComponent";

export const AcceptModal: FC<ModalItem> = ({ nft }) => {
  const { imgUrl, name } = nft;

  const { closeAcceptModal, isOpenedAcceptModal } = useModal();

  if (!isOpenedAcceptModal) return null;

  return (
    <div
      className={`fixed z-50 w-full h-full min-h-screen top-0  bg-black/90 transition-opacity`}
    >
      <div className="w-full h-full flex justify-center items-center overflow-auto">
        <ClickAwayComponent
          onClickAway={closeAcceptModal}
          className="bg-[#171C21] w-[805px] rounded-2xl  relative  bg-no-repeat bg-center bg-cover p-6 "
        >
          <button
            className="group md:rounded-xl absolute right-0 md:right-4 top-13 md:top-12 z-10"
            onClick={closeAcceptModal}
          >
            <CloseCircleIcon className="group-hover:rotate-90 duration-300" />
          </button>
          <div className="modal_header">
            <div className="text-white text-[30px] mt-7 max-w-[805px] text-left leading-7  font-bold">
              Accept this offer
            </div>
          </div>
          <div className="modal_body text-center">
            <div className="flex justify-between items-center my-7">
              <div className="flex gap-[24px] items-center">
                <Image
                  src={imgUrl}
                  className="relative z-0 rounded-xl"
                  alt=""
                  width={120}
                  height={120}
                  objectFit="cover"
                />
                <div className="flex-col space-y-2">
                  <div className="flex items-center">
                    <p className="text-[24px] leading-[15px] font-bold lg:text-[24px] lg:leading-[1.5] text-[#B3B3B3]">
                      {"OG Dread Zero"}
                    </p>
                    <VerifiedIcon color="#EA4492" />
                  </div>
                  <Typography
                    component="h1"
                    className="lg:font-readex font-poppins text-[36px] leading-[44px] lg:text-[36px] lg:leading-[35px] font-bold"
                  >
                    {name}
                  </Typography>
                </div>
              </div>
              {/* <div className="flex-col gap-1">
                                <p className="text-[20px] font-semibold text-white">{price} ETH</p>
                                <p className="text-[16px] font-semibold text-[#666666]">($100.00)</p>
                            </div> */}
            </div>
            <div className="flex-col gap-6 py-7 border-b-[1px] border-[#666666]">
              <div className="flex gap-1 items-center">
                <p className="text-[24px] font-semibold text-left text-white">
                  Fees{" "}
                </p>
                <InfoIcon />
              </div>
              <div className="flex justify-between mt-6">
                <p className=" text-[16px] text-[#B3B3B3] font-normal">
                  Creator Royalty
                </p>
                <p className=" text-[16px] text-[#B3B3B3] font-normal"> 2.5%</p>
              </div>
            </div>
            <div className="flex justify-between py-[28px]">
              <p className="text-[20px] font-semibold text-left text-white">
                Total Earnings{" "}
              </p>
              <div className="flex-col">
                <p className="text-[24px] font-semibold text-right  text-secondary">
                  0.05 ETH
                </p>
                <p className="text-[16px] font-semibold text-right text-[#666666]">
                  ($100.00)
                </p>
              </div>
            </div>
            <button className="w-full rounded-[12px] bg-white text-[16px] font-semibold py-3 mb-7 mt-9">
              Accept
            </button>
          </div>
        </ClickAwayComponent>
      </div>
    </div>
  );
};
