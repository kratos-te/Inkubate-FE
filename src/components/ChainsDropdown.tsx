import { Dispatch, FC, SetStateAction } from "react";
import {
  ArrowDownRoundIcon,
  // AvalancheIcon,
  // BaseIcon,
  BnbIcon,
  EthereumWhiteIcon,
  // OptimismIcon,
  // PolygonIcon,
  // SolanaIcon,
} from "./SvgIcons";

interface DropdownProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  className?: string;
}
const ChainsDropdown: FC<DropdownProps> = ({ value, setValue, className }) => {
  return (
    <div
      className={`${className} w-[112px] md:w-[136px] h-11 group bg-dark-400 rounded-lg relative z-20 text-[14px]`}
    >
      <div className="w-[112px] md:w-[136px] text-[12px] md:text-[16px] flex items-center px-[14px] text-left text-white h-11 font-bold">
        {chains.find((item) => item.value === value)?.title}
        <span className="absolute right-3 w-6 h-6 mt-0">
          <ArrowDownRoundIcon className="w-[16px] h-[16px] md:w-5 md:h-5" />
        </span>
      </div>

      <div className="group-hover:flex absolute text-white hidden top-[42px] w-[112px] md:w-[136px] z-10 rounded-b-lg overflow-hidden">
        <div className="text-white bg-dark-400 flex-col justify-start rounded-lg mt-1 duration-300 w-[136px]">
          {chains.map(
            (item, key) =>
              item.value !== value && (
                <button
                  onClick={() => setValue(item.value)}
                  key={key}
                  className="text-[12px] md:text-[16px] px-3 text-left hover:bg-dark-500 h-11 w-full flex items-center gap-1 font-bold first:rounded-t-lg"
                >
                  {item.icon}
                  {item.title}
                </button>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default ChainsDropdown;

const chains = [
  {
    title: "All Chains",
    value: "all",
    icon: <></>,
  },
  // {
  //   title: "Avalanche",
  //   value: "43114",
  //   icon: <AvalancheIcon />,
  // },
  // {
  //   title: "Base",
  //   value: "8453",
  //   icon: <BaseIcon />,
  // },
  {
    title: "BNB Chain",
    value: "56",
    icon: <BnbIcon />,
  },
  {
    title: "Ethereum",
    value: "1",
    icon: <EthereumWhiteIcon />,
  },
  // {
  //   title: "Optimism",
  //   value: "op",
  //   icon: <OptimismIcon />,
  // },
  // {
  //   title: "Polygon",
  //   value: "137",
  //   icon: <PolygonIcon />,
  // },
  // {
  //   title: "Solana",
  //   value: "sol",
  //   icon: <SolanaIcon />,
  // },
];
