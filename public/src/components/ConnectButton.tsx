interface ConnectButtonProps {
  name: string;
  onClick: Function;
  logo?: string;
}

export const ConnectButton = ({ name, onClick, logo }: ConnectButtonProps) => {
  return (
    <button
      className="bg-[#ffffff0d] px-[30px] py-[15px] backdrop-filter-[10px] text-left flex text-white/90 items-center mb-[20px] justify-between"
      onClick={() => onClick()}
    >
      {logo && <img src={logo} alt={name} />}
      <div className="text-start w-[180px]">{name}</div>
      {/* <div className="text-xl">
          <ArrowLeftIcon />
        </div> */}
    </button>
  );
};
