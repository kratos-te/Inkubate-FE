import { PeriodType } from "@/utils/types";
import { FC, Dispatch, SetStateAction } from "react";
import Typography from "./Typography";

interface DateTabProps {
  current: string;
  setTab: Dispatch<SetStateAction<string>>;
  className?: string;
}

const tabs = [
  {
    title: "1H",
    value: PeriodType.HOUR,
  },
  {
    title: "6H",
    value: PeriodType.SIX_HOURS,
  },
  {
    title: "24H",
    value: PeriodType.DAY,
  },
  {
    title: "7D",
    value: PeriodType.WEEK,
  },
];

const DateTab: FC<DateTabProps> = ({ current, setTab, className }) => {
  return (
    <div
      className={`inline-flex gap-2.5 xl:gap-[18px] xl:py-2.5 px-2.5 py-1 rounded-[13px] bg-[#2c2c2c] ${
        className ? className : ""
      }`}
    >
      {tabs.map((tab, index) => (
        <div
          className={`rounded-lg cursor-pointer py-[5px] px-2 xl:px-[11px] text-center hover:bg-dark-600 ${
            current === tab.value ? "bg-dark-600" : ""
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
  );
};

export default DateTab;
