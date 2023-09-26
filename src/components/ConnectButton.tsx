import { ReactNode } from "react";

interface ConnectButtonProps {
  name: string;
  onClick: Function;
  logo?: ReactNode;
}

export const ConnectButton = ({ name, onClick, logo }: ConnectButtonProps) => {
  return (
    <button
      className="p-6 backdrop-filter-[10px] text-left flex text-white/90 items-center mb-[20px] justify-start hover:bg-[#464646]"
      onClick={() => onClick()}
    >
      {logo && <div>{logo}</div>}
      <div className="text-start  text-[30px] ml-[14px] font-semibold max-lg:text-[24px]">
        {name}
      </div>
    </button>
  );
};
