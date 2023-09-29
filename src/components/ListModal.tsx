import { FC, useState, useRef } from "react";
import Image from "next/image";
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  BnbIcon,
  CalendarIcon,
  CloseCircleIcon,
  EthIcon,
  VerifiedIcon,
} from "./SvgIcons";
import { useModal } from "@/contexts/ModalContext";
import { ModalItem } from "@/utils/types";
import Typography from "./Typography";
import { CoinButton } from "./CoinButton";
import { DATE_RANGE } from "@/config";
import { LoadingPad } from "./LoadingPad";
import { DatePicker } from "./DatePicker";

interface DateRangeType {
  title: string;
  type: string;
  range: number;
}

export const ListModal: FC<ModalItem> = ({ nft }) => {
  const { closeListModal, isOpenedListModal } = useModal();
  const { image, name } = nft;
  const [isShowCal, setIsShowCal] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [dateRange, setDateRange] = useState<DateRangeType>({
    title: "",
    type: "",
    range: 0,
  });
  const [makeList, setMakeList] = useState(false);
  const [tab, setTab] = useState("eth");

  const modalRef = useRef<HTMLDivElement>(null);

  const handleOpenCalendar = () => {
    console.log("isShowCal", isShowCal);
    setIsShowCal(!isShowCal);
  };

  const handleSetDate = (date: DateRangeType) => {
    setDateRange(date);
    setIsCollapsed(false);
  };

  const handleList = () => {
    setMakeList(!makeList);
  };

  const handelSetEther = () => {
    setTab("eth");
  };

  const handleSetBnb = () => {
    setTab("bnb");
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
              Make an List
            </div>
          </div>
          <div className="modal_body text-center">
            <div className="flex gap-[24px] items-center">
              <Image
                src={image}
                className="relative z-0 rounded-xl w-[120px] h-[120px] max-sm:w-[90px] max-sm:h-[90px]"
                alt=""
                width={120}
                height={120}
                objectFit="cover"
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
            <div className="flex justify-between border border-white rounded-3xl my-12 overflow-hidden">
              <div
                className={`flex h-12 space-x-1 justify-center border-white py-2 w-1/2 rounded-r-full items-center cursor-pointer ${
                  tab === "eth"
                    ? "bg-white text-black"
                    : "bg-transparent text-white"
                }`}
                onClick={handelSetEther}
              >
                <EthIcon color={`${tab === "eth" ? "black" : "white"}`} />
                <p className="text-[24px] font-bold"> ETH</p>
              </div>
              <div
                className={`flex h-12 space-x-1 justify-center w-1/2 border-white py-2 px-4 rounded-l-full items-center cursor-pointer ${
                  tab === "bnb"
                    ? "bg-white text-black"
                    : "bg-transparent text-white"
                }`}
                onClick={handleSetBnb}
              >
                <BnbIcon color={`${tab === "bnb" ? "black" : "white"}`} />
                <p className="text-[24px] font-bold"> BNB</p>
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
            <div className="flex-col items-left mt-6">
              <Typography className="text-[24px] font-semibold text-left max-sm:text-[18px]">
                Duration
              </Typography>
              <div className="flex-col rounded-[8px] bg-dark-400 px-3 py-4 items-center mt-2 max-sm:py-2 relative">
                <div
                  className="flex cursor-pointer items-center"
                  onClick={handleOpenCalendar}
                >
                  <CalendarIcon />
                  <Typography className="flex text-[14px] ml-1">
                    {" "}
                    Set Duration
                  </Typography>
                </div>
                {isShowCal && (
                  <div className="w-[490px] flex-col bg-dark-400 rounded-b-[16px] px-[14px] py-[34px] absolute right-5 z-50  max-sm:w-full left-0 top-[30px] md:top-[50px]">
                    <div className="flex-col">
                      <Typography className="text-left text-lg text-white font-semibold max-sm:text-[16px]">
                        Data Range
                      </Typography>
                      <div
                        className="flex justify-between px-3 py-[14px] rounded-[8px] bg-[#616161] mt-2 cursor-pointer items-center"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                      >
                        <div className="text-white text-[14px] font-normal ">
                          {dateRange.title ? dateRange.title : "3 Months"}
                        </div>
                        {!isCollapsed ? <ArrowLeftIcon /> : <ArrowDownIcon />}
                      </div>
                      {isCollapsed && (
                        <div className="flex-col -mt-[20px] p-[14px] bg-[#616161] text-[14px] rounded-b-[8px]">
                          {DATE_RANGE.map((item, key) => (
                            <div
                              className="flex pt-[14px] text-white text-[14px] font-normal justify-start cursor-pointer"
                              key={key}
                              onClick={() => handleSetDate(item)}
                            >
                              {item.title}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <DatePicker type={dateRange.type} range={dateRange.range} />
                    <button
                      className="w-full rounded-lg bg-white text-black text-[16px] font-semibold py-3 mt-10"
                      onClick={() => setIsShowCal(false)}
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
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
              className="w-full rounded-lg bg-white text-[16px] font-semibold py-3 mt-6"
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
