import Image from "next/image";

interface ConnectButtonProps {
  name: string;
  onClick: Function;
  logo?: string;
}

export const ConnectButton = ({
  name,
  onClick,
  logo = "./assets/icons/MetaMask.svg",
}: ConnectButtonProps) => {
  return (
    <button
      className="p-6 backdrop-filter-[10px] text-left flex text-white/90 items-center mb-[20px] justify-start hover:bg-[#464646]"
      onClick={() => onClick()}
    >
      <Image src={logo} width={28} height={28} alt="" />
      <div className="text-start  text-[30px] ml-[14px] font-semibold max-lg:text-[24px]">
        {name}
      </div>
    </button>
  );
};
