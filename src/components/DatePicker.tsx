import { FC, useState } from "react";
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    getDay,
    isSameMonth,
    isToday,
    parse,
    startOfToday,
    startOfWeek,
    startOfMonth
} from "date-fns";
import Typography from "./Typography";
import { NextIcon, PrevIcon } from "./SvgIcons";

export const DatePicker: FC = () => {
    const today = startOfToday();
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
    const [startDay, setStartDay] = useState(() => format(today, "MM/dd/yyyy"))
    const [endDay, setEndDay] = useState(() => format(today, "MM/dd/yyyy"))
    const [seletedDay, setSeletedDay] = useState("")
    const [isSeletedDay, setIsSelectedDay] = useState(false)
    let firstDayOfMonth = parse(currMonth, "MMM-yyyy", new Date());

    const capitalizeFirstLetter = (query: string): string => {
        return query.charAt(0).toUpperCase() + query.substring(1);
    };

    const daysInMonth = eachDayOfInterval({
        start: startOfWeek(firstDayOfMonth),
        end: endOfWeek(endOfMonth(firstDayOfMonth)),
    });

    const getPrevMonth = (event: React.MouseEvent<SVGSVGElement>) => {
        event.preventDefault();
        const firstDayOfPrevMonth = add(firstDayOfMonth, { months: -1 });
        setCurrMonth(format(firstDayOfPrevMonth, "MMM-yyyy"));
    };

    const getNextMonth = (event: React.MouseEvent<SVGSVGElement>) => {
        event.preventDefault();
        const firstDayOfNextMonth = add(firstDayOfMonth, { months: 1 });
        setCurrMonth(format(firstDayOfNextMonth, "MMM-yyyy"));
    };

    const handleSetDate = (day: Date) => {
        setStartDay(format(day, "MM/dd/yyyy"))
        setSeletedDay(format(day, "MM/dd/yyyy"))
        setIsSelectedDay(true)
    }

    return (
        <>
            <div className="flex mt-5 justify-between items-center">
                <div className="flex-col gap-2 w-[209px]">
                    <Typography className="text-left text-lg text-white font-semibold">
                        Starting
                    </Typography>
                    <div className="flex justify-between px-3 py-[14px] rounded-[8px] bg-[#616161] mt-2">
                        <div className="text-white text-[14px] font-normal">{startDay}</div>
                    </div>
                </div>
                <div className="border-b border-white h-1/2 w-[15px] mt-10"></div>
                <div>
                    <Typography className="text-left text-lg text-white w-[209px] font-semibold">
                        Ending
                    </Typography>
                    <div className="flex justify-between px-3 py-[14px] rounded-[8px] bg-[#616161] mt-2">
                        <div className="text-white text-[14px] font-normal">{endDay}</div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-[14px] px-[10px] mt-[40px]">
                <div className="flex justify-between">
                    <button onClick={() => getPrevMonth}>
                        <PrevIcon color="#666666" />
                    </button>
                    <div>
                        <p className="font-semibold text-xl text-white">
                            {format(firstDayOfMonth, "MMMM yyyy")}
                        </p>
                    </div>
                    <button onClick={() => getNextMonth}>
                        <NextIcon />
                    </button>

                </div>
                <div className="grid grid-cols-7 gap-[19px]  place-items-center">
                    {days.map((day, idx) => {
                        return (
                            <div key={idx} className="font-semibold text-[20px] text-[#8E8C9A]">
                                {capitalizeFirstLetter(day)}
                            </div>
                        );
                    })}
                </div>
                <div className="grid grid-cols-7 gap-[19px]  mt-[14px] place-items-center">
                    {daysInMonth.map((day, idx) => {
                        return (
                            <div key={idx} className={colStartClasses[getDay(day)]}>
                                <p
                                    className={`cursor-pointer flex items-center justify-center text-[20px]  font-semibold h-12 w-12 rounded-[12px] ${isToday(day) ? "bg-[#666666] text-white" : "text-[#CAC7C7] hover:bg-[#666666] hover:text-white active:bg-[#666666]"}  ${format(day, "MMM") !== currMonth.slice(0, 3) ? "hidden" : ""}`}
                                    onClick={() => handleSetDate(day)}
                                >
                                    {format(day, "d")}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    )
}