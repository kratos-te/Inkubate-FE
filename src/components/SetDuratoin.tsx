import { FC, useState } from "react";
import { DatePicker } from "./DatePicker";
import { DATE_RANGE } from "@/config";
import { ArrowDownIcon, ArrowLeftIcon, CalendarIcon } from "./SvgIcons";
import Typography from "./Typography";
import { useModal } from "@/contexts/ModalContext";
import { useUser } from "@/contexts/UserContext";
import { format } from "date-fns";

interface DateRangeType {
  title: string;
  type: string;
  range: number;
}

export const SetDuration: FC = () => {
  const { isOpenedCreateModal, isOpenedLaunchpadEdit } = useModal();
  const { startDate, endDate, startTime, endTime } = useUser();
  const [isShowCal, setIsShowCal] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [dateRange, setDateRange] = useState<DateRangeType>({
    title: "",
    type: "",
    range: 0,
  });

  const handleOpenCalendar = () => {
    setIsShowCal(!isShowCal);
  };

  const handleSetDate = (date: DateRangeType) => {
    setDateRange(date);
    setIsCollapsed(false);
  };

  return (
    <>
      <div className="flex-col items-left">
        <Typography
          className={` font-semibold text-left  ${
            isOpenedCreateModal || isOpenedLaunchpadEdit
              ? "text-[16px]"
              : "text-[24px] max-sm:text-[18px]"
          }`}
        >
          Duration
        </Typography>
        <div className="flex-col rounded-[8px] bg-dark-400 px-3 py-4 items-center mt-2 max-sm:py-2 relative">
          <div
            className="flex cursor-pointer items-center"
            onClick={handleOpenCalendar}
          >
            <CalendarIcon />
            <Typography className="flex text-[14px] ml-1">
              {startDate && endDate
                ? `${format(startDate, "MM/dd/yyyy") + ", " + startTime} - ${
                    format(endDate, "MM/dd/yyyy") + ", " + endTime
                  }`
                : "Set Duration"}
            </Typography>
          </div>
          {isShowCal && (
            <div className="w-full flex flex-col bg-dark-400 rounded-b-[16px] px-[14px] py-[34px] absolute right-5 z-50  max-sm:w-full left-0 top-[30px] md:top-[50px]">
              <div className="flex-col">
                <Typography className="text-left text-lg text-white font-semibold max-sm:text-[16px]">
                  Date Range
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
    </>
  );
};
