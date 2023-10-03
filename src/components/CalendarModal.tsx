import { FC, useState } from "react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isToday,
  parse,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { ArrowDownLineIcon, NextIcon, PrevIcon } from "./SvgIcons";
import { useModal } from "@/contexts/ModalContext";

export const CalendarModal: FC = () => {
  const { closeCalendarModal, isOpenedCalendarModal } = useModal();
  const today = startOfToday();
  const HOURS = new Array(12)
    .fill(0)
    .map((_, i) => ({ value: i + 1, label: `${i + 1}` }));
  const MINS = new Array(60)
    .fill(0)
    .map((_, i) => ({ value: i + 1, label: `${i + 1}` }));
  const NOONS = ["AM", "PM"];

  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];

  const [currMonth, setCurrMonth] = useState(() => format(today, "MMM-yyyy"));
  const [hour, setHour] = useState(() => format(new Date(), "hh"));
  const [minutes, setMinutes] = useState(() => format(new Date(), "mm"));
  const [noon, setNoon] = useState(() => format(new Date(), "aa"));
  const [seletedDay, setSeletedDay] = useState("");
  const [isHour, setIsHour] = useState(false);
  const [isMinutes, setIsMinutes] = useState(false);
  const [isNoon, setIsNoon] = useState(false);

  let firstDayOfMonth = parse(currMonth, "MMM-yyyy", new Date());

  const capitalizeFirstLetter = (query: string): string => {
    return query.charAt(0).toUpperCase() + query.substring(1);
  };

  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(firstDayOfMonth),
    end: endOfWeek(endOfMonth(firstDayOfMonth)),
  });

  const getPrevMonth = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const firstDayOfPrevMonth = add(firstDayOfMonth, { months: -1 });
    setCurrMonth(format(firstDayOfPrevMonth, "MMM-yyyy"));
  };

  const getNextMonth = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const firstDayOfNextMonth = add(firstDayOfMonth, { months: 1 });
    setCurrMonth(format(firstDayOfNextMonth, "MMM-yyyy"));
  };

  const handleSetDay = (day: Date) => {
    setSeletedDay(format(day, "MM/dd/yyyy"));
    console.log("day", day);
  };

  const handleShowHours = () => {
    setIsHour(!isHour);
  };

  const handleShowMins = () => {
    setIsMinutes(!isMinutes);
  };

  const handleShowNoon = () => {
    setIsNoon(!isNoon);
  };
  const handleSetHour = (hour: string) => {
    if (hour.length < 2) {
      setHour("0" + hour);
    } else {
      setHour(hour);
    }
  };
  const handleSetMin = (min: string) => {
    if (min.length < 2) {
      setMinutes("0" + min);
    } else {
      setMinutes(min);
    }
  };
  const handleSetNoon = (noon: string) => {
    setNoon(noon);
  };

  const handleSetDate = () => {
    // setDate(seletedDay + ", " + hour + ":" + minutes);
    closeCalendarModal();
  };

  if (!isOpenedCalendarModal) return null;
  return (
    <div className={`fixed z-50 w-full h-full min-h-screen top-0 `}>
      <div className="w-full h-full flex justify-center items-center overflow-auto">
        <div className="flex flex-col w-[408px] gap-[14px] p-3 mt-[40px] rounded-[12px] bg-black">
          <div className="flex justify-between pt-3">
            <button onClick={getPrevMonth}>
              <PrevIcon color="#666666" />
            </button>
            <div>
              <p className="font-semibold text-xl text-white text-[20px]">
                {format(firstDayOfMonth, "MMMM yyyy")}
              </p>
            </div>
            <button onClick={getNextMonth}>
              <NextIcon />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-[19px] py-6 place-items-center">
            {days.map((day, idx) => {
              return (
                <div
                  key={idx}
                  className="font-semibold text-[14px] text-[#8E8C9A]"
                >
                  {capitalizeFirstLetter(day)}
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-7 gap-[19px]  mt-[14px] place-items-center">
            {daysInMonth.map((day, idx) => {
              return (
                <div key={idx} className={colStartClasses[getDay(day)]}>
                  <button
                    className={`cursor-pointer disabled:cursor-not-allowed flex items-center justify-center text-[14px]  font-semibold h-12 w-12 rounded-[12px] ${
                      isToday(day)
                        ? " bg-secondary text-white"
                        : "text-[#CAC7C7] hover:bg-[#666666] hover:text-white active:bg-[#666666]"
                    }  ${
                      format(day, "MMM") !== currMonth.slice(0, 3)
                        ? "hidden"
                        : ""
                    } ${
                      seletedDay === format(day, "MM/dd/yyyy")
                        ? "bg-[#666666] text-white"
                        : ""
                    }`}
                    onClick={() => handleSetDay(day)}
                    disabled={day < today}
                  >
                    {format(day, "d")}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between px-[15px] my-6">
            <p className="text-[16px] text-white font-semibold">Select Time</p>
            <div className="flex gap-[3px]">
              <div
                className="flex items-center gap-2 px-[10px] py-2 bg-dark-400 cursor-pointer rounded-[4px] relative"
                onClick={handleShowHours}
              >
                <div className="text-white text-[12px] font-semibold">
                  {hour}
                </div>
                <ArrowDownLineIcon />
                {isHour && (
                  <div className="flex flex-col  w-full bg-dark-400 px-3 rounded-[4px] absolute h-[212px] top-[25px] right-0 overflow-auto">
                    {HOURS.map((hour, key) => (
                      <div
                        className="flex bg-dark-400 mt-[12px] mb-[4px] text-[12px] font-semibold text-white"
                        key={`${key}`}
                        onClick={() => handleSetHour(hour.label)}
                      >
                        {hour.label.length < 2 ? "0" + hour.label : hour.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-b border-dark-400 h-1/2 w-[8px] mt-4"></div>
              <div
                className="flex items-center gap-2 px-[10px] py-2 bg-dark-400 cursor-pointer rounded-[4px] relative"
                onClick={handleShowMins}
              >
                <div className="text-white text-[12px] font-semibold">
                  {minutes}
                </div>
                <ArrowDownLineIcon />
                {isMinutes && (
                  <div className="flex flex-col  w-full bg-dark-400 px-3 rounded-[4px] absolute h-[212px] top-[25px] right-0 overflow-auto">
                    {MINS.map((min, key) => (
                      <div
                        className="flex bg-dark-400 mt-[12px] mb-[4px] text-[12px] font-semibold text-white"
                        key={key}
                        onClick={() => handleSetMin(min.label)}
                      >
                        {min.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="border-b border-dark-400 h-1/2 w-[8px] mt-4"></div>
              <div
                className="flex items-center gap-2 px-[10px] py-2 bg-dark-400 cursor-pointer rounded-[4px] relative"
                onClick={handleShowNoon}
              >
                <div className="text-white text-[12px] font-semibold">
                  {noon}
                </div>
                <ArrowDownLineIcon />
                {isNoon && (
                  <div className="flex flex-col  w-full bg-dark-400 px-3 rounded-[4px] absolute top-[25px] right-0">
                    {NOONS.map((noon, key) => (
                      <div
                        className="flex bg-dark-400 mt-[12px] mb-[4px] text-[12px] font-semibold text-white"
                        key={key}
                        onClick={() => handleSetNoon}
                      >
                        {noon}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <button
            className="w-full rounded-[12px] bg-white text-[16px] font-semibold py-3 mb-3"
            onClick={handleSetDate}
          >
            Set
          </button>
        </div>
      </div>
    </div>
  );
};
