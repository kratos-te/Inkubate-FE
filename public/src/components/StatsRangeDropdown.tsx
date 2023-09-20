"use client";
import { Dispatch, FC, SetStateAction } from "react";
import Typography from "./Typography";
import { ArrowDownRoundIcon } from "./SvgIcons";

interface DropdownProps {
  range: number;
  setTab: Dispatch<SetStateAction<number>>;
}

const StatsRangeDropdown: FC<DropdownProps> = ({ range, setTab }) => {
  return (
    <>
      <div className="hidden md:order-2 order-1 md:inline-flex gap-[18px] px-2.5 py-[3px] rounded-xl bg-dark-600">
        {ranges.map((tab, index) => (
          <div
            className={`rounded-md cursor-pointer py-[6px] xl:px-[11px] leading-1.5 text-center flex items-center hover:bg-dark-600 ${
              range === tab.value ? "bg-[#2C2C2C] px-2" : ""
            }`}
            key={index}
            onClick={() => setTab(tab.value)}
          >
            <Typography className="leading-[1.5] font-bold text-[12px] xl:text-[16px]">
              {tab.title}
            </Typography>
          </div>
        ))}
      </div>
      <div className="block md:order-2 order-2 md:hidden w-20 h-11 group bg-dark-400 rounded-lg relative z-20 text-[14px]">
        <div className="flex items-center px-[14px] text-left text-white h-11 font-bold">
          {ranges.find((item) => item.value === range)?.title}
          <span className="absolute right-3 w-6 h-6 md:w-4 md:h-4 mt-0">
            <ArrowDownRoundIcon className="w-6 h-6 md:w-4 md:h-4" />
          </span>
        </div>

        <div className="group-hover:flex absolute text-white hidden top-[42px] w-20 z-10 rounded-b-lg overflow-hidden">
          <div className="text-white bg-dark-400 flex-col justify-start rounded-lg mt-1 duration-300">
            {ranges.map(
              (tab, key) =>
                tab.value !== range && (
                  <button
                    onClick={() => setTab(tab.value)}
                    key={key}
                    className="px-3 text-left hover:bg-dark-500 h-11 flex items-center gap-1 font-bold w-20 first:rounded-t-lg"
                  >
                    {tab.title}
                  </button>
                )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsRangeDropdown;

const ranges = [
  {
    title: "1H",
    value: 1,
  },
  {
    title: "6H",
    value: 6,
  },
  {
    title: "24H",
    value: 24,
  },
  {
    title: "7D",
    value: 168,
  },
];
