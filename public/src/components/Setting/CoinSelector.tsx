import Image from "next/image";
import { FC } from "react";
import { ArrowDownSmIcon } from "../SvgIcons";

interface SelectorProps {
  className?: string;
}

const CoinSelector: FC<SelectorProps> = ({ className }) => {
  return (
    <div
      className={`rounded-full w-20 h-8 bg-[#5A5A5A] p-[6px] cursor-pointer ${
        className ? className : ""
      }`}
    >
      <div className="flex items-center">
        <div className="text-[14px] flex items-center !font-[400] text-white">
          <Image
            width={18}
            height={18}
            src={"/assets/images/icons/eth.png"}
            alt=""
          />
          <span className="mx-1">ETH</span>
          <ArrowDownSmIcon />
        </div>
      </div>
    </div>
  );
};

export default CoinSelector;
