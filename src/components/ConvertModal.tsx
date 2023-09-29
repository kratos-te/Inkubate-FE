import { FC, useState } from "react";
import { BnbIcon, CloseCircleIcon, EthIcon, SwapIcon } from "./SvgIcons";
import { CoinButton } from "./CoinButton";
import { LoadingPad } from "./LoadingPad";
import { TokenButton } from "@/utils/types";

interface ConvertModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const ConvertModal: FC<ConvertModalProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState("eth");
  const [isConvert, setIsConvert] = useState(false);
  const [isSwap, setIsSwap] = useState(false);
  const [payToken, setPayToken] = useState<TokenButton>({
    icon: "/assets/icons/eth.png",
    symbol: "ETH",
  });
  const [receiveToken, setReceiveToken] = useState<TokenButton>({
    icon: "/assets/icons/weth.png",
    symbol: "WETH",
  });

  const handelSetEther = () => {
    setTab("eth");
  };

  const handleSetBnb = () => {
    setTab("bnb");
  };

  const handleSwap = () => {
    const temp = receiveToken;
    setReceiveToken(payToken);
    setPayToken(temp);
    setIsSwap(!isSwap);
  };

  const handleConvert = () => {
    setIsConvert(!isConvert);
  };

  if (!isOpen) return null;
  return (
    <div className="absolute right-2 top-32 bg-dark-200  w-[529px] rounded-2xl overflow-hidden p-6 max-lg:w-[369px] max-lg:-right-4">
      <button
        className="group md:rounded-x l absolute right-0 md:right-4 top-2 md:top-4 z-10"
        onClick={onClose}
      >
        <CloseCircleIcon className="group-hover:rotate-90 duration-300" />
      </button>
      <div className="modal_header">
        <div className="text-white text-[24px] mb-[26px] max-w-[280px] text-left leading-7  font-bold">
          Convert Tokens
        </div>
      </div>
      <div className="modal_body text-center flex-col gap-8">
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
        <div className="flex-col">
          <div className="flex text-[16px] text-[#B3B3B3]">
            Max amount is 0 wETH
          </div>
          <div className="flex-col mt-2 relative">
            <div className="flex justify-between p-3 rounded-lg bg-dark-400">
              <div className="flex-col gap-2">
                <p className="text-[14px] text-[#666666] leading-[20px]">
                  You Pay
                </p>
                <p className="text-[24px] leading-[32px] text-[#666666]">
                  0.00
                </p>
              </div>
              <CoinButton
                icon={payToken.icon}
                symbol={payToken.symbol}
                className=""
              />
            </div>
            <button
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-200 rounded-full p-2 w-10 h-10"
              onClick={handleSwap}
            >
              <SwapIcon />
            </button>
            <div className="flex justify-between p-3 rounded-lg bg-dark-400 mt-2">
              <div className="flex-col gap-2">
                <p className="text-[14px] text-[#666666] leading-[20px]">
                  You Received
                </p>
                <p className="text-[24px] leading-[32px] text-[#666666] text-left">
                  0.00
                </p>
              </div>
              <CoinButton
                icon={receiveToken.icon}
                symbol={receiveToken.symbol}
                className=""
              />
            </div>
          </div>
        </div>
        {isConvert && (
          <LoadingPad
            title="Converting"
            description="Wrapping your ETH to WETH for ERC-20 compatibility. Please be
          patient."
          />
        )}
        <button
          className="w-full h-12 font-semibold bg-white text-black text-[16px] rounded-xl cursor-pointer mt-12"
          onClick={handleConvert}
        >
          Convert
        </button>
      </div>
    </div>
  );
};
