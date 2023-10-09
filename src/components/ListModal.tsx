"use client";
import { FC, useState, useRef } from "react";
import {
  ArrowLeftIcon,
  BnbIcon,
  CloseCircleIcon,
  EthIcon,
  VerifiedIcon,
} from "./SvgIcons";
import { useModal } from "@/contexts/ModalContext";
import { ModalItem } from "@/utils/types";
import Typography from "./Typography";
import { LoadingPad } from "./LoadingPad";
import { SetDuration } from "./SetDuratoin";
import { OPENSEA_CONDUIT_KEY } from "@/utils/constants";
import { useSignSeaportOrder } from "@/hooks/useSignSeaportOrder";
import { useAccount } from "wagmi";
import { listingNft } from "@/actions/listing";
import { SALT, TOKEN, ZERO_ADDRESS, ZERO_HASH } from "@/config";
import { bytes20ToBytes32, date2UTC, numToWei } from "@/utils/util";
import { useUser } from "@/contexts/UserContext";
import { useErc721a } from "@/hooks/useErc721a";
import { useInkubate } from "@/hooks/useInkubate";

export const ListModal: FC<ModalItem> = ({ nft }) => {
  const { closeListModal, isOpenedListModal } = useModal();
  const { setApprove } = useErc721a();
  const { count } = useInkubate();
  const signOrder = useSignSeaportOrder();
  const { address } = useAccount();

  const { id, imgUrl, name, nftId } = nft;
  const { startDate, endDate, startTime, endTime } = useUser();
  const [makeList, setMakeList] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [dateRange, setDateRange] = useState("");
  const [tab, setTab] = useState("eth");
  const [amount, setAmount] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);

  const handleSign = async () => {
    if (!address) return { signature: "", data: "" };
    const startAmount = numToWei((parseFloat(amount) / 100) * 95);
    const feeAmount = numToWei(parseFloat(amount) / 20);
    const startDay = (
      new Date(date2UTC(startDate, startTime)).getTime() / 1000
    ).toString();
    const endDay = (
      new Date(date2UTC(endDate, endTime)).getTime() / 1000
    ).toString();

    const orderParameters = {
      offerer: address,
      orderType: 0,
      offer: [
        {
          itemType: 2,
          token: bytes20ToBytes32(nft.address),
          identifierOrCriteria: nftId,
          startAmount: startAmount,
          endAmount: startAmount,
        },
      ],
      totalOriginalConsiderationItems: "2",
      consideration: [
        {
          itemType: 0,
          token: ZERO_ADDRESS,
          identifierOrCriteria: "0",
          startAmount: startAmount, // 95% of amount -> price
          endAmount: startAmount,
          recipient: address, // price receiver -> token owner
        },
        {
          itemType: 0,
          token: ZERO_ADDRESS,
          identifierOrCriteria: "0",
          startAmount: feeAmount.toString(), // 5% of amount -> fee
          endAmount: feeAmount.toString(),
          recipient: address, // fee receiver -> platform trasury wallet
        },
      ],
      startTime: startDay,
      endTime: endDay,
      zone: ZERO_ADDRESS, // always this is a null address in listing
      zoneHash: ZERO_HASH,
      salt: SALT,
      conduitKey: OPENSEA_CONDUIT_KEY,
    };
    const counter = await count(address)
    const { signature, data } = await signOrder(orderParameters, counter as string);
    if (signature === "") {
      return { signature: "", data };
    } else {
      console.log("signature", signature);
      return { signature, data };
    }
    // const signature = useSignSeaportOrder();


  };

  const handleList = async () => {
    setMakeList(true);
    // if (address) {
    //   const counter = await count(address as `0x${string}`)
    //   console.log("count", weiToNum(counter))
    // }
    const res = await setApprove(nft.address)
    console.log("res", res)
    if (res.status === "success") {
      const { signature, data } = await handleSign();
      if (signature) {
        const listing = await listingNft(id, signature, JSON.stringify(data), nft.collection.network);
        console.log(listing);
      }
      setMakeList(false);
    }
  };


  const handelSetEther = () => {
    setTab("eth");
  };

  const handleSetBnb = () => {
    setTab("bnb");
  };

  const handleSetToken = (date: string) => {
    setDateRange(date);
    setIsCollapsed(false);
  };

  const handleChangeAmount = (event: any) => {
    setAmount(event.target.value);
  };


  if (!isOpenedListModal) return null;
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
            onClick={closeListModal}
          >
            <CloseCircleIcon className="group-hover:rotate-90 duration-300" />
          </button>
          <div className="modal_header">
            <div className="text-white text-[30px] mb-[26px] max-w-[280px] text-left leading-7  font-bold  max-sm:text-[20px]  ">
              List NFT for Sale
            </div>
          </div>
          <div className="modal_body text-center">
            <div className="flex gap-[24px] items-center">
              <image
                xlinkHref={imgUrl}
                className="relative z-0 rounded-xl w-[120px] h-[120px] max-sm:w-[90px] max-sm:h-[90px] object-cover"
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
                  {`${name}#${nftId}`}
                </Typography>
              </div>
            </div>
            <div className="flex justify-between border border-white rounded-3xl mt-12 overflow-hidden">
              <div
                className={`flex h-12 space-x-1 justify-center border-white py-2 w-1/2 rounded-r-full items-center cursor-pointer ${tab === "eth"
                  ? "bg-white text-black"
                  : "bg-transparent text-white"
                  }`}
                onClick={handelSetEther}
              >
                <EthIcon color={`${tab === "eth" ? "black" : "white"}`} />
                <p className="text-[24px] font-bold"> ETH</p>
              </div>
              <div
                className={`flex h-12 space-x-1 justify-center w-1/2 border-white py-2 px-4 rounded-l-full items-center cursor-pointer ${tab === "bnb"
                  ? "bg-white text-black"
                  : "bg-transparent text-white"
                  }`}
                onClick={handleSetBnb}
              >
                <BnbIcon color={`${tab === "bnb" ? "black" : "white"}`} />
                <p className="text-[24px] font-bold"> BNB</p>
              </div>
            </div>
            <div className="flex-col items-left mt-6 ">
              <Typography className="text-[24px] font-semibold text-left max-sm:text-[18px]">
                {"Price"}
              </Typography>
              <div className="flex gap-[5px] justify-between items-center mt-2 max-sm:py-2">
                {/* <input className="text-[14px] text-white" placeholder="Amount" /> */}
                <input
                  className="bg-dark-400 rounded-[8px] text-[14px] text-white w-full p-[14px]  mt-2 placeholder:text-white"
                  placeholder="Amount"
                  onChange={handleChangeAmount}
                  value={amount}
                />
                <div
                  className="flex justify-between bg-dark-400 text-[14px] text-white w-[15%] rounded-[8px] mt-2 p-[14px] cursor-pointer items-center relative"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                >
                  <div className="text-white text-[14px] font-normal ">
                    {dateRange ? dateRange : "ETH"}
                  </div>
                  <ArrowLeftIcon />
                </div>
                {isCollapsed && (
                  <div className="flex-col -mt-[20px] p-[14px] bg-[#616161] text-[14px] rounded-b-[8px] absolute right-0">
                    {TOKEN.map((item, key) => (
                      <div
                        className="flex pt-[14px] text-white text-[14px] font-normal justify-start cursor-pointer"
                        key={key}
                        onClick={() => handleSetToken(item)}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
                {/* <CoinButton
                  icon="/assets/icons/eth.png"
                  symbol="ETH"
                  className={""}
                /> */}
              </div>
              <p className="text-[16px] text-[#B3B3B3] mt-2 text-left max-sm:text-[14px]">
                Floor price: 0.0600 ETH
              </p>
            </div>
            <div className="flex-col mt-6">
              <SetDuration />
            </div>
            <div className="flex-col mt-6">
              <Typography className="text-[24px] font-semibold text-left max-sm:text-[18px ]">
                {"Fees"}
              </Typography>
              <div className="flex justify-between mt-2">
                <p className="text-[16px] text-[#B3B3B3]">Marketplace Fee</p>
                <p className="text-[16px] text-[#B3B3B3]">2.5%</p>
              </div>
            </div>
            {makeList && (
              <LoadingPad
                title="Processing"
                description="Confirm the transaction in your wallet to list your NFT"
              />
            )}
            <button
              className="w-full rounded-lg bg-white text-[16px] font-semibold py-3 mt-12"
              onClick={handleList}
            >
              List Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
